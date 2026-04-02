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
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [{ slug: product.slug }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== product.slug) return {};
  return {
    title: `${product.title} - Cửa hàng Physicians Committee`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug !== product.slug) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Cửa hàng", href: "/shop" },
    { label: "Cộng đồng khỏe mạnh", href: "/shop/healthy-communities" },
    {
      label: "Tài liệu cho trưởng nhóm cộng đồng khỏe mạnh",
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
            <div className="flex flex-col md:flex-row gap-8 bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
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
            <section className="mt-8 bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
              <h2 className="text-lg font-bold text-zinc-100 mb-4 pb-2 border-b border-zinc-800">
                Giới thiệu tài liệu
              </h2>
              <div className="prose prose-sm max-w-none text-zinc-300 space-y-3">
                <p>
                  Chương trình <strong>Xây dựng Cộng đồng Khỏe mạnh (BHC)</strong>
                  giúp người lãnh đạo địa phương triển khai giáo dục dinh dưỡng
                  dựa trên bằng chứng ngay tại khu dân cư. Tờ rơi được thiết kế
                  để in số lượng lớn và phát tại sự kiện, phòng khám, trường học
                  và các địa điểm sinh hoạt cộng đồng.
                </p>
                <p>
                  Mỗi bản tờ rơi trình bày tổng quan sáng kiến BHC, các lợi ích
                  khi tham gia vai trò trưởng nhóm, và hướng dẫn từng bước để
                  bắt đầu. Nội dung được viết đơn giản, dễ hiểu cho nhiều đối
                  tượng khác nhau.
                </p>
                <p>
                  Tài liệu phù hợp cho giáo viên sức khỏe, người tổ chức cộng đồng,
                  trưởng nhóm tôn giáo và bất kỳ ai quan tâm đến việc nâng cao sức
                  khỏe cộng đồng thông qua dinh dưỡng có nguồn gốc thực vật.
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
