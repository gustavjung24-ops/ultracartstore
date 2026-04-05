import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getBlogPages,
  getLocalizedPcrmPageContent,
  getPcrmPageByPath,
  type PcrmResolvedPage,
} from "@/lib/pcrm-content";
import { getCommonLocale, getSiteLanguageFromCookie } from "@/lib/site-locale";

const BLOG_LISTING_EXCLUDED_PATHS = new Set([
  "/news",
  "/news/health-nutrition",
  "/news/innovative-science-news",
  "/news/media-center",
]);

const BLOG_SUMMARY_NOISE_EN = new Set([
  "Make your 2026 membership gift today!",
  "Prevention starts today. Join the 21-Day Vegan Kickstart.",
  "Get Healthy With Good Nutrition",
  "Blog | Impact & Advocacy",
  "Xavier Toledo, MS, RD, LDN",
]);

const BLOG_SUMMARY_NOISE_VI = new Set([
  "Hãy tặng quà thành viên năm 2026 ngay hôm nay!",
  "Phòng ngừa bắt đầu từ hôm nay. Tham gia Khởi động thuần chay 21 ngày.",
  "Khỏe mạnh nhờ dinh dưỡng tốt",
  "Blog | Tác động & Vận động",
  "Xavier Toledo, MS, RD, LDN",
]);

function isNoisySummaryLine(value: string, lang: "en" | "vi") {
  const trimmed = value.trim();
  if (!trimmed) {
    return true;
  }

  const noise = lang === "vi" ? BLOG_SUMMARY_NOISE_VI : BLOG_SUMMARY_NOISE_EN;
  return noise.has(trimmed);
}

function getPostTitle(post: PcrmResolvedPage, lang: "en" | "vi") {
  return getLocalizedPcrmPageContent(post, lang).title;
}

function getPostSummary(post: PcrmResolvedPage, lang: "en" | "vi") {
  const localized = getLocalizedPcrmPageContent(post, lang);

  const summaryFromParagraph = localized.paragraphs.find(
    (paragraph) => !isNoisySummaryLine(paragraph, lang),
  );
  if (summaryFromParagraph) {
    return summaryFromParagraph;
  }

  if (!isNoisySummaryLine(localized.description, lang)) {
    return localized.description;
  }

  return localized.paragraphs[0] || localized.description;
}

export default async function BlogIndexPage() {
  const lang = await getSiteLanguageFromCookie();
  const locale = getCommonLocale(lang);
  const hubPage = getPcrmPageByPath("/news/blog");
  const localizedHub = hubPage ? getLocalizedPcrmPageContent(hubPage, lang) : null;

  const posts = getBlogPages().filter((post) => !BLOG_LISTING_EXCLUDED_PATHS.has(post.path));
  const pageTitle = localizedHub?.title || "Blog";
  const pageIntro =
    localizedHub?.description ||
    (lang === "vi"
      ? "Danh sách bài viết được đồng bộ từ dữ liệu pcrm.org."
      : "Article index synchronized from pcrm.org data.");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="page-surface p-6 md:p-8">
          <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">{pageTitle}</h1>
          <p className="mt-3 max-w-3xl text-slate-700">{pageIntro}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <article key={post.path} className="article-card">
                {post.images[0]?.src ? (
                  <div className="relative h-44 w-full">
                    <Image
                      src={post.images[0].src}
                      alt={getPostTitle(post, lang)}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : null}
                <div className="p-4">
                    <h2 className="line-clamp-2 text-base font-semibold text-slate-900">
                      {getPostTitle(post, lang)}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                      {getPostSummary(post, lang)}
                    </p>
                  <Link href={post.path} className="mt-4 inline-block text-sm font-semibold text-[#006c96] hover:underline">
                    {locale.common.readMore}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
