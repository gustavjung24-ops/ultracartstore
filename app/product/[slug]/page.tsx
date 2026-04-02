import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import SidebarMenu from "@/components/SidebarMenu";
import RelatedResources from "@/components/RelatedResources";
import Footer from "@/components/Footer";

import { product, mainMenu, helpMenu, footerInfo } from "@/data/product";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return [{ slug: product.slug }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (params.slug !== product.slug) return {};
  return {
    title: `${product.title} — Physicians Committee Shop`,
    description: product.shortDescription,
  };
}

export default function ProductPage({ params }: PageProps) {
  if (params.slug !== product.slug) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Healthy Communities", href: "/shop/healthy-communities" },
    {
      label: "Resources for Building Healthy Communities Pod Leaders",
      href: "/shop/healthy-communities/pod-leaders",
    },
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
                About This Resource
              </h2>
              <div className="prose prose-sm max-w-none text-gray-600 space-y-3">
                <p>
                  The <strong>Building Healthy Communities (BHC)</strong> program
                  empowers community leaders to bring evidence-based nutrition
                  education directly to their neighborhoods. The brochure is
                  designed to be printed in bulk and distributed at events,
                  clinics, schools, and places of worship.
                </p>
                <p>
                  Each brochure features an overview of the BHC initiative,
                  key benefits of joining as a Pod Leader, and step-by-step
                  instructions on how to get started. It is written in plain
                  language, making it accessible to a wide audience.
                </p>
                <p>
                  This resource is ideal for health educators, community
                  organizers, faith leaders, and anyone passionate about
                  improving the health of their community through plant-based
                  nutrition.
                </p>
              </div>
            </section>

            {/* Related resources */}
            <RelatedResources resources={product.relatedResources} />
          </div>

          {/* Sidebar (right 1/4 on desktop) */}
          <div className="w-full lg:w-64 xl:w-72 flex-shrink-0">
            <SidebarMenu mainMenu={mainMenu} helpMenu={helpMenu} />
          </div>
        </div>
      </div>

      <Footer info={footerInfo} />
    </>
  );
}
