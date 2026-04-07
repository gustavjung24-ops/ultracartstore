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
import { getCleanNewsSummary, isNewsArticlePath } from "@/lib/news-summary";
import { getCommonLocale, getSiteLanguageFromCookie } from "@/lib/site-locale";

function getPostTitle(post: PcrmResolvedPage, lang: "en" | "vi") {
  return getLocalizedPcrmPageContent(post, lang).title;
}

function getPostSummary(post: PcrmResolvedPage, lang: "en" | "vi") {
  return getCleanNewsSummary(getLocalizedPcrmPageContent(post, lang), lang);
}

export default async function BlogIndexPage() {
  const lang = await getSiteLanguageFromCookie();
  const locale = getCommonLocale(lang);
  const hubPage = getPcrmPageByPath("/news/blog");
  const localizedHub = hubPage ? getLocalizedPcrmPageContent(hubPage, lang) : null;

  const posts = getBlogPages().filter((post) => isNewsArticlePath(post.path));
  const pageTitle = localizedHub?.title || "Blog";
  const pageIntro =
    localizedHub?.description ||
    (lang === "vi"
      ? "Danh sách bài viết được đồng bộ từ dữ liệu pcrm.org."
      : "Article index synchronized from pcrm.org data.");

  return (
    <>
      <Header initialLanguage={lang} />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-4 text-sm text-slate-500">
          <span>{locale.common.home}</span>
          <span className="mx-2">/</span>
          <span>{pageTitle}</span>
        </div>

        <div className="page-surface p-6 md:p-8">
          <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">{pageTitle}</h1>
          <p className="mt-3 max-w-3xl text-slate-700">{pageIntro}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <article key={post.path} className="article-card">
                {post.images[0]?.src ? (
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <Image
                      src={post.images[0].src}
                      alt={getPostTitle(post, lang)}
                      fill
                      className="object-contain"
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
      <Footer initialLanguage={lang} />
    </>
  );
}
