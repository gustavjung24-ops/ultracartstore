import { cache } from "react";
import { createClient } from "@sanity/client";
import groq from "groq";

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

interface SanityProductDocument {
  slug?: string;
  title?: string;
  category?: string;
  categoryLabel?: string;
  price?: string;
  unit?: string;
  sku?: string;
  shortDescription?: string;
  longDescription?: string;
  contactNote?: string;
  whatsappUrl?: string;
  zaloUrl?: string;
  phoneNumber?: string;
  images?: string[];
  relatedSlugs?: string[];
}

interface SanityNormalizedProduct extends Product {
  relatedSlugs: string[];
}

const SANITY_REVALIDATE_SECONDS = Number.parseInt(
  process.env.SANITY_REVALIDATE_SECONDS ?? "300",
  10,
);
const REVALIDATE_SECONDS = Number.isFinite(SANITY_REVALIDATE_SECONDS)
  ? Math.max(SANITY_REVALIDATE_SECONDS, 60)
  : 300;

const SANITY_API_VERSION = process.env.SANITY_API_VERSION ?? "2024-08-01";
const SANITY_PRODUCTS_QUERY = groq`*[_type == "product" && coalesce(published, true)] | order(_updatedAt desc) {
  "slug": slug.current,
  title,
  "category": coalesce(category->slug.current, categorySlug, category),
  "categoryLabel": coalesce(category->title, categoryLabel),
  price,
  unit,
  sku,
  shortDescription,
  longDescription,
  contactNote,
  whatsappUrl,
  zaloUrl,
  phoneNumber,
  "images": images[].asset->url,
  "relatedSlugs": relatedProducts[]->slug.current
}`;

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

function parseRelatedSlugs(relatedSlugs?: string | string[]) {
  if (!relatedSlugs) {
    return [];
  }

  if (Array.isArray(relatedSlugs)) {
    return relatedSlugs.map((value) => value.trim()).filter(Boolean);
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

function normalizeSanityProduct(record: SanityProductDocument) {
  const slug = record.slug?.trim();
  const title = record.title?.trim();
  const category = record.category?.trim();

  if (!slug || !title || !category) {
    return null;
  }

  const images = (record.images ?? [])
    .map((image) => image?.trim())
    .filter((url): url is string => Boolean(url));

  const normalizedProduct: SanityNormalizedProduct = {
    slug,
    category,
    categoryLabel: normalizeCategoryLabel(category, record.categoryLabel),
    title,
    price: record.price?.trim() || "$0.00",
    unit: record.unit?.trim() || "/ sản phẩm",
    sku: record.sku?.trim() || slug.toUpperCase(),
    shortDescription:
      record.shortDescription?.trim() ||
      "Mô tả ngắn sẽ được cập nhật bởi quản trị viên.",
    longDescription:
      record.longDescription?.trim() ||
      record.shortDescription?.trim() ||
      "Nội dung chi tiết đang được cập nhật.",
    contactNote:
      record.contactNote?.trim() ||
      "Liên hệ để nhận tư vấn và báo giá chi tiết.",
    whatsappUrl: record.whatsappUrl?.trim() || "https://wa.me/12025277306",
    zaloUrl: record.zaloUrl?.trim() || "https://zalo.me/12025277306",
    phoneNumber: normalizePhoneHref(record.phoneNumber),
    images: images.length > 0 ? images : ["/images/placeholder-main.svg"],
    relatedResources: [],
    relatedSlugs: parseRelatedSlugs(record.relatedSlugs),
  };

  return normalizedProduct;
}

async function fetchSanityProducts(
  projectId: string,
  dataset: string,
  token?: string,
): Promise<SanityProductDocument[]> {
  const client = createClient({
    projectId,
    dataset,
    apiVersion: SANITY_API_VERSION,
    token,
    useCdn: !token,
    perspective: "published",
  });

  return client.fetch<SanityProductDocument[]>(SANITY_PRODUCTS_QUERY, {}, {
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
  });
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
  const projectId = process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_TOKEN;

  if (!projectId || !dataset) {
    return FALLBACK_STORE_DATA;
  }

  try {
    const sanityProducts = await fetchSanityProducts(projectId, dataset, token);

    const normalizedProducts = sanityProducts
      .map((record) => normalizeSanityProduct(record))
      .filter((product): product is SanityNormalizedProduct => Boolean(product));

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
    console.error("Sanity sync failed, using static fallback:", error);
    return FALLBACK_STORE_DATA;
  }
});
