import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SidebarMenu from "@/components/SidebarMenu";
import { getStoreData } from "@/lib/store-data";

export const metadata: Metadata = {
  title: "Cửa hàng - Physicians Committee Shop",
  description: "Tài liệu giáo dục sức khỏe, sách và công cụ truyền thông từ Physicians Committee.",
};

const breadcrumbs = [
  { label: "Trang chủ", href: "/" },
  { label: "Cửa hàng" },
];

export default async function ShopPage() {
  const { products, categories, mainMenu, helpMenu } = await getStoreData();
  const healthTopicProducts = products.filter((product) => product.category === "health-topics");

  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Nội dung chính */}
          <div className="flex-1 min-w-0">

            {/* Tiêu đề trang */}
            <h1 className="text-brand-teal font-bold text-2xl pb-3 mb-6 border-b border-gray-200 uppercase tracking-wide">
              Cửa hàng
            </h1>

            {/* Danh mục */}
            <section className="mb-10">
              <h2 className="text-gray-700 font-semibold text-base mb-4">Duyệt theo danh mục</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/shop/${cat.slug}`}
                    className="flex flex-col items-center text-center p-4 border border-gray-200 bg-white hover:border-brand-teal hover:bg-brand-teal/5 transition-colors rounded"
                  >
                    <span className="font-semibold text-sm text-brand-dark leading-snug">{cat.label}</span>
                    <span className="text-xs text-gray-400 mt-1 leading-tight line-clamp-2">{cat.description}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mb-10 rounded-2xl border border-brand-teal/20 bg-brand-teal/5 p-5 sm:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-brand-dark font-bold text-lg uppercase tracking-wide">
                    Theo chủ đề sức khỏe
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-600">
                    Đây là nhóm nội dung đang còn thiếu độ sâu so với website mẫu, nên tôi đã bổ sung thêm các tài liệu theo bệnh lý và nhu cầu chăm sóc cụ thể để trang shop có cấu trúc rõ hơn.
                  </p>
                </div>
                <Link href="/shop/health-topics" className="text-sm font-semibold text-brand-teal hover:underline">
                  Xem toàn bộ chủ đề
                </Link>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                {healthTopicProducts.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/product/${product.slug}`}
                    className="rounded-xl border border-white bg-white p-4 shadow-sm transition-colors hover:border-brand-teal/40"
                  >
                    <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-lg bg-gray-50">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">{product.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-500 line-clamp-3">
                      {product.shortDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Tất cả sản phẩm */}
            <section>
              <h2 className="text-gray-700 font-semibold text-base mb-4 pb-2 border-b border-gray-100">
                Tất cả sản phẩm
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <article
                    key={p.slug}
                    className="bg-white border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="relative w-full aspect-[4/3] bg-gray-50">
                      <Image
                        src={p.images[0]}
                        alt={p.title}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 640px) 100vw, 33vw"
                        unoptimized
                      />
                    </div>
                    <div className="p-4 flex flex-col gap-2 flex-1">
                      <span className="text-xs text-brand-teal font-medium uppercase tracking-wide">
                        {p.categoryLabel}
                      </span>
                      <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
                        {p.title}
                      </h3>
                      <p className="text-brand-teal font-bold">
                        {p.price}
                        {p.unit && <span className="text-xs text-gray-400 ml-1">{p.unit}</span>}
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">
                        {p.shortDescription}
                      </p>
                      <Link
                        href={`/product/${p.slug}`}
                        className="mt-2 inline-block text-center bg-brand-teal hover:bg-brand-mid text-white text-sm font-semibold py-2 px-4 transition-colors"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-64 xl:w-72 flex-shrink-0">
            <SidebarMenu mainMenu={mainMenu} helpMenu={helpMenu} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
