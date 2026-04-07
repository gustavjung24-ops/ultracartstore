import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import SidebarMenu from "@/components/SidebarMenu";
import RelatedResources from "@/components/RelatedResources";
import Footer from "@/components/Footer";

import { getStoreData } from "@/lib/store-data";
import { getCommonLocale, getSiteLanguageFromCookie } from "@/lib/site-locale";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { products } = await getStoreData();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { products } = await getStoreData();
  const product = products.find((item) => item.slug === slug);
  if (!product) return {};
  return {
    title: `${product.title} | Y học lành mạnh`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const lang = await getSiteLanguageFromCookie();
  const locale = getCommonLocale(lang);
  const { slug } = await params;
  const { products, mainMenu, helpMenu } = await getStoreData();
  const product = products.find((item) => item.slug === slug);
  if (!product) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Tài nguyên", href: "/shop" },
    { label: product.categoryLabel, href: `/shop/${product.category}` },
    { label: product.title },
  ];

  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main product area + sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product detail (left 3/4) */}
          <div className="flex-1 min-w-0">
            {/* Two-column product layout: gallery + info */}
            <div className="flex flex-col md:flex-row gap-8 bg-white rounded-2xl border border-gray-200 p-6">
              {/* Gallery */}
              <div className="w-full md:w-2/5">
                <ProductGallery images={product.images} title={product.title} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <ProductInfo product={product} />
              </div>
            </div>

            {/* Extended description */}
            <section className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Giới thiệu về sản phẩm
              </h2>
              <div className="prose prose-sm max-w-none text-gray-600 space-y-3 whitespace-pre-line">
                {product.longDescription}
              </div>
            </section>

            {/* Related resources */}
            <RelatedResources resources={product.relatedResources} />
          </div>

          {/* Sidebar (right 1/4 on desktop) */}
          <div className="w-full lg:w-64 xl:w-72 flex-shrink-0">
            <SidebarMenu
              mainMenu={mainMenu}
              helpMenu={helpMenu}
              mainMenuHeading={locale.common.mainMenu}
              helpMenuHeading={locale.common.support}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
