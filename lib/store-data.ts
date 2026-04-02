import { cache } from "react";

import {
  categories as staticCategories,
  footerInfo as staticFooterInfo,
  helpMenu as staticHelpMenu,
  mainMenu as staticMainMenu,
  products as staticProducts,
  type Product,
  type RelatedResource,
} from "@/data/product";

type MenuItem = { label: string; href: string };
type FooterInfo = typeof staticFooterInfo;
type Category = (typeof staticCategories)[number];

interface StoreData {
  products: Product[];
  categories: Category[];
  mainMenu: MenuItem[];
  helpMenu: MenuItem[];
  footerInfo: FooterInfo;
}

interface AirtableAttachment {
  url?: string;
}

interface AirtableRecord<TFields> {
  id: string;
  fields: TFields;
}

interface AirtableProductFields {
  Slug?: string;
  Title?: string;
  Category?: string;
  CategoryLabel?: string;
  Price?: string;
  Unit?: string;
  SKU?: string;
  ShortDescription?: string;
  LongDescription?: string;
  ContactNote?: string;
  WhatsAppUrl?: string;
  ZaloUrl?: string;
  PhoneNumber?: string;
  Images?: AirtableAttachment[];
  RelatedSlugs?: string;
  Published?: boolean;
}

interface AirtableNormalizedProduct extends Product {
  relatedSlugs: string[];
}

const AIRTABLE_REVALIDATE_SECONDS = Number.parseInt(
  process.env.AIRTABLE_REVALIDATE_SECONDS ?? "300",
  10,
);
const REVALIDATE_SECONDS = Number.isFinite(AIRTABLE_REVALIDATE_SECONDS)
  ? Math.max(AIRTABLE_REVALIDATE_SECONDS, 60)
  : 300;

const FALLBACK_STORE_DATA: StoreData = {
  products: staticProducts,
  categories: staticCategories,
  mainMenu: staticMainMenu,
  helpMenu: staticHelpMenu,
  footerInfo: staticFooterInfo,
};

function normalizeCategoryLabel(categorySlug: string, categoryLabel?: string) {
  if (categoryLabel && categoryLabel.trim()) {
    return categoryLabel.trim();
  }

  const matchedStatic = staticCategories.find((category) => category.slug === categorySlug);
  if (matchedStatic) {
    return matchedStatic.label;
  }

  const text = categorySlug.replace(/-/g, " ").trim();
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : "Danh mục";
}

function normalizeCategoryDescription(categorySlug: string) {
  const matchedStatic = staticCategories.find((category) => category.slug === categorySlug);
  if (matchedStatic) {
    return matchedStatic.description;
  }
  return "Tài liệu và sản phẩm sức khỏe cộng đồng";
}

function normalizePhoneHref(phoneNumber?: string) {
  if (!phoneNumber || !phoneNumber.trim()) {
    return "tel:+12025277306";
  }

  if (phoneNumber.startsWith("tel:")) {
    return phoneNumber;
  }

  return `tel:${phoneNumber}`;
}

function parseRelatedSlugs(relatedSlugs?: string) {
  if (!relatedSlugs) {
    return [];
  }

  return relatedSlugs
    .split(/[\n,]/g)
    .map((value) => value.trim())
    .filter(Boolean);
}

function shortDescriptionForResource(product: Product) {
  const trimmed = product.shortDescription.replace(/\s+/g, " ").trim();
  if (trimmed.length <= 130) {
    return trimmed;
  }
  return `${trimmed.slice(0, 127)}...`;
}

function toRelatedResource(product: Product): RelatedResource {
  return {
    id: product.slug,
    title: product.title,
    description: shortDescriptionForResource(product),
    image: product.images[0] ?? "/images/placeholder-main.svg",
    href: `/product/${product.slug}`,
  };
}

function buildRelatedResources(
  product: Product,
  allProductsBySlug: Map<string, Product>,
  relatedSlugs: string[],
) {
  const uniqueRelatedSlugs = Array.from(
    new Set(relatedSlugs.filter((slug) => slug && slug !== product.slug)),
  );

  const resourcesFromSlugs = uniqueRelatedSlugs
    .map((slug) => allProductsBySlug.get(slug))
    .filter((relatedProduct): relatedProduct is Product => Boolean(relatedProduct))
    .slice(0, 3)
    .map((relatedProduct) => toRelatedResource(relatedProduct));

  if (resourcesFromSlugs.length > 0) {
    return resourcesFromSlugs;
  }

  const fallbackResources = Array.from(allProductsBySlug.values())
    .filter((candidate) => candidate.slug !== product.slug)
    .slice(0, 3)
    .map((candidate) => toRelatedResource(candidate));

  return fallbackResources;
}

function normalizeAirtableProduct(record: AirtableRecord<AirtableProductFields>) {
  const fields = record.fields;
  const slug = fields.Slug?.trim();
  const title = fields.Title?.trim();
  const category = fields.Category?.trim();

  if (!slug || !title || !category) {
    return null;
  }

  if (fields.Published === false) {
    return null;
  }

  const images = (fields.Images ?? [])
    .map((image) => image.url?.trim())
    .filter((url): url is string => Boolean(url));

  const normalizedProduct: AirtableNormalizedProduct = {
    slug,
    category,
    categoryLabel: normalizeCategoryLabel(category, fields.CategoryLabel),
    title,
    price: fields.Price?.trim() || "$0.00",
    unit: fields.Unit?.trim() || "/ sản phẩm",
    sku: fields.SKU?.trim() || slug.toUpperCase(),
    shortDescription:
      fields.ShortDescription?.trim() ||
      "Mô tả ngắn sẽ được cập nhật bởi quản trị viên.",
    longDescription:
      fields.LongDescription?.trim() ||
      fields.ShortDescription?.trim() ||
      "Nội dung chi tiết đang được cập nhật.",
    contactNote:
      fields.ContactNote?.trim() ||
      "Liên hệ để nhận tư vấn và báo giá chi tiết.",
    whatsappUrl: fields.WhatsAppUrl?.trim() || "https://wa.me/12025277306",
    zaloUrl: fields.ZaloUrl?.trim() || "https://zalo.me/12025277306",
    phoneNumber: normalizePhoneHref(fields.PhoneNumber),
    images: images.length > 0 ? images : ["/images/placeholder-main.svg"],
    relatedResources: [],
    relatedSlugs: parseRelatedSlugs(fields.RelatedSlugs),
  };

  return normalizedProduct;
}

async function fetchAirtableRecords<TFields>(
  baseId: string,
  tableName: string,
  token: string,
): Promise<Array<AirtableRecord<TFields>>> {
  const records: Array<AirtableRecord<TFields>> = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams({ pageSize: "100" });
    if (offset) {
      params.set("offset", offset);
    }

    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: REVALIDATE_SECONDS,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Airtable request failed (${response.status})`);
    }

    const json = (await response.json()) as {
      records: Array<AirtableRecord<TFields>>;
      offset?: string;
    };

    records.push(...json.records);
    offset = json.offset;
  } while (offset);

  return records;
}

function getCategoriesForProducts(products: Product[]) {
  const staticCategoryMap = new Map(
    staticCategories.map((category) => [category.slug, category]),
  );

  const additionalCategories: Category[] = [];
  const seenAdditional = new Set(staticCategories.map((category) => category.slug));

  for (const product of products) {
    if (!seenAdditional.has(product.category)) {
      seenAdditional.add(product.category);
      additionalCategories.push({
        slug: product.category,
        label: product.categoryLabel,
        description: normalizeCategoryDescription(product.category),
      });
    }
  }

  const mergedCategories = staticCategories.map((category) => {
    if (staticCategoryMap.has(category.slug)) {
      return category;
    }
    return {
      slug: category.slug,
      label: category.label,
      description: category.description,
    };
  });

  return [...mergedCategories, ...additionalCategories];
}

export function getProductsByCategoryFromData(products: Product[], category: string) {
  if (category === "posters") {
    return products.filter(
      (product) =>
        product.category === "literature" ||
        product.category === "posters" ||
        /poster|ap-phich/i.test(product.title),
    );
  }

  if (category === "product-spotlight") {
    const preferredSlugs = [
      "bep-khong-pho-mai",
      "xay-dung-cong-dong-khoe-manh-to-roi",
      "cam-nang-dinh-duong-lam-sang",
      "bo-slide-hoi-thao-thuc-vat",
      "can-bang-noi-tiet-to-tu-thuc-vat",
      "huong-dan-huyet-ap-on-dinh",
      "quy-trinh-tu-van-15-phut",
    ];

    const spotlightProducts = products.filter((product) =>
      preferredSlugs.includes(product.slug),
    );

    if (spotlightProducts.length > 0) {
      return spotlightProducts;
    }

    return products.slice(0, 8);
  }

  if (category === "new") {
    return [...products].slice(-8).reverse();
  }

  return products.filter((product) => product.category === category);
}

export const getStoreData = cache(async (): Promise<StoreData> => {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const productsTableName = process.env.AIRTABLE_PRODUCTS_TABLE ?? "Products";

  if (!token || !baseId) {
    return FALLBACK_STORE_DATA;
  }

  try {
    const airtableRecords = await fetchAirtableRecords<AirtableProductFields>(
      baseId,
      productsTableName,
      token,
    );

    const normalizedProducts = airtableRecords
      .map((record) => normalizeAirtableProduct(record))
      .filter((product): product is AirtableNormalizedProduct => Boolean(product));

    if (normalizedProducts.length === 0) {
      return FALLBACK_STORE_DATA;
    }

    const productsWithoutRelations: Product[] = normalizedProducts.map((normalizedProduct) => {
      const { relatedSlugs, ...product } = normalizedProduct;
      void relatedSlugs;
      return product;
    });

    const productBySlug = new Map(
      productsWithoutRelations.map((product) => [product.slug, product]),
    );

    const products = normalizedProducts.map(({ relatedSlugs, ...product }) => ({
      ...product,
      relatedResources: buildRelatedResources(product, productBySlug, relatedSlugs),
    }));

    return {
      products,
      categories: getCategoriesForProducts(products),
      mainMenu: staticMainMenu,
      helpMenu: staticHelpMenu,
      footerInfo: staticFooterInfo,
    };
  } catch (error) {
    console.error("Airtable sync failed, using static fallback:", error);
    return FALLBACK_STORE_DATA;
  }
});
