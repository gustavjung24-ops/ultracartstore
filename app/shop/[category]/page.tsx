import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SidebarMenu from "@/components/SidebarMenu";
import { getProductsByCategoryFromData, getStoreData } from "@/lib/store-data";
import { buildPageMetadata } from "@/lib/seo";
import { getCommonLocale, getSiteLanguageFromCookie } from "@/lib/site-locale";

const healthTopicHighlights = [
  {
    title: "Ung thÆ° vÃ  phá»¥c há»“i thá»ƒ tráº¡ng",
    summary: "Táº­p trung vÃ o thá»±c Ä‘Æ¡n dá»… Äƒn, giÃ u dÆ°á»¡ng cháº¥t vÃ  há»— trá»£ ngÆ°á»i Ä‘ang Ä‘iá»u trá»‹ hoáº·c há»“i phá»¥c.",
  },
  {
    title: "Tiá»ƒu Ä‘Æ°á»ng vÃ  kiá»ƒm soÃ¡t Ä‘Æ°á»ng huyáº¿t",
    summary: "Nháº¥n máº¡nh cÃ¡c bá»¯a Äƒn thá»±c váº­t cÃ¢n báº±ng, Ä‘Æ¡n giáº£n, phÃ¹ há»£p Ä‘á»ƒ Ã¡p dá»¥ng hÃ ng ngÃ y.",
  },
  {
    title: "Tim máº¡ch vÃ  cholesterol",
    summary: "Æ¯u tiÃªn kiáº¿n thá»©c ná»n táº£ng, káº¿ hoáº¡ch 7 ngÃ y vÃ  nhÃ³m thá»±c pháº©m nÃªn sá»­ dá»¥ng thÆ°á»ng xuyÃªn.",
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
  const { categories, products } = await getStoreData();
  const cat = categories.find((c) => c.slug === category);

  if (!cat) {
    return {};
  }

  const categoryProducts = getProductsByCategoryFromData(products, category);
  const previewImage = categoryProducts[0]?.images?.[0];

  return buildPageMetadata({
    path: `/shop/${category}`,
    title: cat.label,
    description: cat.description,
    image: previewImage,
    type: "website",
    language: "vi",
  });
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
    { label: "Trang chá»§", href: "/" },
    { label: "TÃ i nguyÃªn", href: "/shop" },
    { label: cat.label },
  ];

  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Ná»™i dung chÃ­nh */}
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
                <p className="text-lg">ChÆ°a cÃ³ sáº£n pháº©m trong danh má»¥c nÃ y.</p>
                <Link href="/shop" className="mt-4 inline-block text-brand-teal hover:underline text-sm">
                  â† Quay láº¡i tÃ i nguyÃªn
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
                        Xem chi tiáº¿t
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

