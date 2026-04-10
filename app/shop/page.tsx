import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SidebarMenu from "@/components/SidebarMenu";
import { getStoreData } from "@/lib/store-data";
import { buildPageMetadata } from "@/lib/seo";
import { getCommonLocale, getSiteLanguageFromCookie } from "@/lib/site-locale";

export const metadata: Metadata = buildPageMetadata({
  path: "/shop",
  title: "Tài nguyên sức khỏe",
  description: "Tổng hợp tài liệu giáo dục sức khỏe, sách và công cụ truyền thông dựa trên bằng chứng.",
  type: "website",
  language: "vi",
});

const breadcrumbs = [
  { label: "Trang chá»§", href: "/" },
  { label: "TÃ i nguyÃªn" },
];

export default async function ShopPage() {
  const lang = await getSiteLanguageFromCookie();
  const locale = getCommonLocale(lang);
  const { products, categories, mainMenu, helpMenu } = await getStoreData();
  const healthTopicProducts = products.filter((product) => product.category === "health-topics");

  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Ná»™i dung chÃ­nh */}
          <div className="flex-1 min-w-0">

            {/* TiÃªu Ä‘á» trang */}
            <h1 className="text-brand-teal text-3xl font-semibold leading-tight pb-3 mb-6 border-b border-gray-200">
              TÃ i nguyÃªn
            </h1>

            {/* Danh má»¥c */}
            <section className="mb-10">
              <h2 className="text-gray-700 font-semibold text-base mb-4">Duyá»‡t theo danh má»¥c</h2>
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
                  <h2 className="text-brand-dark text-lg font-semibold tracking-[0.01em]">
                    Theo chá»§ Ä‘á» sá»©c khá»e
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-600">
                    ÄÃ¢y lÃ  nhÃ³m ná»™i dung Ä‘ang cÃ²n thiáº¿u Ä‘á»™ sÃ¢u so vá»›i website máº«u, nÃªn tÃ´i Ä‘Ã£ bá»• sung thÃªm cÃ¡c tÃ i liá»‡u theo bá»‡nh lÃ½ vÃ  nhu cáº§u chÄƒm sÃ³c cá»¥ thá»ƒ Ä‘á»ƒ chuyÃªn má»¥c tÃ i nguyÃªn cÃ³ cáº¥u trÃºc rÃµ hÆ¡n.
                  </p>
                </div>
                <Link href="/shop/health-topics" className="text-sm font-semibold text-brand-teal hover:underline">
                  Xem toÃ n bá»™ chá»§ Ä‘á»
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

            {/* Táº¥t cáº£ sáº£n pháº©m */}
            <section>
              <h2 className="text-gray-700 font-semibold text-base mb-4 pb-2 border-b border-gray-100">
                Táº¥t cáº£ sáº£n pháº©m
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
                      <span className="text-xs text-brand-teal font-medium tracking-[0.01em]">
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
                        Xem chi tiáº¿t
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
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

