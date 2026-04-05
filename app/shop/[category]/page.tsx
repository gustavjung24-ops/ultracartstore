import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SidebarMenu from "@/components/SidebarMenu";
import { getProductsByCategoryFromData, getStoreData } from "@/lib/store-data";
import { getCommonLocale, getSiteLanguageFromCookie } from "@/lib/site-locale";

const healthTopicHighlights = [
  {
    title: "Ung thư và phục hồi thể trạng",
    summary: "Tập trung vào thực đơn dễ ăn, giàu dưỡng chất và hỗ trợ người đang điều trị hoặc hồi phục.",
  },
  {
    title: "Tiểu đường và kiểm soát đường huyết",
    summary: "Nhấn mạnh các bữa ăn thực vật cân bằng, đơn giản, phù hợp để áp dụng hàng ngày.",
  },
  {
    title: "Tim mạch và cholesterol",
    summary: "Ưu tiên kiến thức nền tảng, kế hoạch 7 ngày và nhóm thực phẩm nên sử dụng thường xuyên.",
  },
];

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const { categories } = await getStoreData();
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const { categories } = await getStoreData();
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: `${cat.label} - Physicians Committee Shop`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const lang = await getSiteLanguageFromCookie();
  const locale = getCommonLocale(lang);
  const { category } = await params;
  const { products, categories, mainMenu, helpMenu } = await getStoreData();
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const categoryProducts = getProductsByCategoryFromData(products, category);

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Cửa hàng", href: "/shop" },
    { label: cat.label },
  ];

  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Nội dung chính */}
          <div className="flex-1 min-w-0">
            <h1 className="text-brand-teal font-bold text-2xl pb-3 mb-2 border-b border-gray-200 uppercase tracking-wide">
              {cat.label}
            </h1>
            <p className="text-gray-500 text-sm mb-6">{cat.description}</p>

            {category === "health-topics" && (
              <section className="mb-8 grid gap-4 md:grid-cols-3">
                {healthTopicHighlights.map((item) => (
                  <article key={item.title} className="rounded-xl border border-gray-200 bg-white p-5">
                    <h2 className="text-sm font-semibold text-brand-dark">{item.title}</h2>
                    <p className="mt-2 text-xs leading-relaxed text-gray-500">{item.summary}</p>
                  </article>
                ))}
              </section>
            )}

            {categoryProducts.length === 0 ? (
              <div className="py-16 text-center text-gray-400">
                <p className="text-lg">Chưa có sản phẩm trong danh mục này.</p>
                <Link href="/shop" className="mt-4 inline-block text-brand-teal hover:underline text-sm">
                  ← Quay lại cửa hàng
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((p) => (
                  <article key={p.slug} className="bg-white border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
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
                      <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">{p.title}</h3>
                      <p className="text-brand-teal font-bold">
                        {p.price}
                        {p.unit && <span className="text-xs text-gray-400 ml-1">{p.unit}</span>}
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">{p.shortDescription}</p>
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
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-64 xl:w-72 flex-shrink-0">
            <SidebarMenu
              mainMenu={mainMenu}
              helpMenu={helpMenu}
              mainMenuHeading={locale.sidebar.mainMenuHeading}
              helpMenuHeading={locale.sidebar.helpMenuHeading}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
