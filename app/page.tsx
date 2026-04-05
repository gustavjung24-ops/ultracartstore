import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getBlogPages,
  getLocalizedPcrmPageContent,
  getPcrmPageByPath,
  type PcrmPage,
} from "@/lib/pcrm-content";
import {
  getCleanNewsSummary,
  isNewsArticlePath,
  isNoisyNewsSummaryLine,
} from "@/lib/news-summary";
import { getCommonLocale, getSiteLanguageFromCookie } from "@/lib/site-locale";

type BlogPost = PcrmPage & { path: string };

function getPostTitle(post: BlogPost, lang: "en" | "vi") {
  return getLocalizedPcrmPageContent(post, lang).title;
}

function getPostSummary(post: BlogPost, lang: "en" | "vi") {
  return getCleanNewsSummary(getLocalizedPcrmPageContent(post, lang), lang);
}

function getSectionSummary(
  candidates: Array<string | undefined>,
  posts: BlogPost[],
  sectionTitle: string,
  lang: "en" | "vi",
) {
  const postSummary = posts
    .map((post) => getPostSummary(post, lang))
    .find((summary) => !isNoisyNewsSummaryLine(summary, lang) && summary.trim() !== sectionTitle.trim());

  if (postSummary) {
    return postSummary;
  }

  const candidateSummary = candidates.find((candidate) => {
    if (!candidate || isNoisyNewsSummaryLine(candidate, lang)) {
      return false;
    }

    return candidate.trim() !== sectionTitle.trim();
  });

  if (candidateSummary) {
    return candidateSummary;
  }

  return sectionTitle;
}

export default async function HomePage() {
  const lang = await getSiteLanguageFromCookie();
  const locale = getCommonLocale(lang);
  const homeUi = locale.repoUi.home;
  const home = getPcrmPageByPath("/");

  if (!home) return null;

  const localizedHome = getLocalizedPcrmPageContent(home, lang);
  const newsPosts = getBlogPages().filter((post) => isNewsArticlePath(post.path)) as BlogPost[];
  const featuredPosts = newsPosts.slice(0, 3);
  const latestPosts = newsPosts.slice(0, 6);

  const healthAndNutritionPosts = newsPosts.filter((post) => post.path.includes("/news/health-nutrition/")).slice(0, 2);
  const innovativeSciencePosts = newsPosts.filter((post) => post.path.includes("/news/innovative-science/")).slice(0, 2);
  const scienceDigestPosts = newsPosts.filter((post) => post.path.includes("/news/good-science-digest/")).slice(0, 2);

  const sectionHighlights = [
    {
      href: "/news/health-nutrition",
      title: locale.news.healthNutrition,
      summary: getSectionSummary(
        [localizedHome.paragraphs[6], localizedHome.paragraphs[7]],
        healthAndNutritionPosts,
        locale.news.healthNutrition,
        lang,
      ),
      posts: healthAndNutritionPosts,
    },
    {
      href: "/news/innovative-science-news",
      title: homeUi.innovativeScienceNews,
      summary: getSectionSummary(
        [homeUi.innovativeScienceSummary, localizedHome.paragraphs[8], localizedHome.paragraphs[9]],
        innovativeSciencePosts,
        homeUi.innovativeScienceNews,
        lang,
      ),
      posts: innovativeSciencePosts,
    },
    {
      href: "/news/good-science-digest",
      title: homeUi.goodScienceDigest,
      summary: getSectionSummary(
        [homeUi.goodScienceDigestSummary],
        scienceDigestPosts,
        homeUi.goodScienceDigest,
        lang,
      ),
      posts: scienceDigestPosts,
    },
  ];

  return (
    <>
      <Header initialLanguage={lang} />
      <main className="pb-12 md:pb-16">
        <section className="mx-auto max-w-7xl px-4 pt-3 md:px-6 md:pt-5">
          <div className="overflow-hidden rounded-[34px] border border-[#cad8df] bg-white shadow-[0_18px_44px_rgba(15,35,45,0.16)]">
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-[260px] bg-[#dce8ee] md:min-h-[500px]">
                <Image
                  src="/images/pig-in-grass.jpg"
                  alt={homeUi.heroImageAlt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex items-center bg-[radial-gradient(circle_at_top_left,#1f7390_0%,#0f5c73_58%,#0c4a5e_100%)] px-5 py-8 text-white md:px-10 md:py-14">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ddbb83]">
                    {homeUi.victory}
                  </p>
                  <h1 className="home-hero-title mt-2.5 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:mt-3 md:text-5xl">
                    {homeUi.heroTitle}
                  </h1>
                  <p className="home-hero-copy mt-4 max-w-xl text-base leading-8 text-slate-100 md:mt-5 md:text-lg">
                    {homeUi.heroSummary}
                  </p>
                  <div className="mt-6 md:mt-8">
                    <Link
                      href="https://act.pcrm.org/a/victory-brown-university"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/45 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white no-underline transition hover:bg-white/10 md:px-7 md:py-3 md:text-sm"
                    >
                      {locale.common.learnMore}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl px-4 md:mt-12 md:px-6">
          <h2 className="home-section-title mb-5 text-3xl font-bold text-[#0f5c73] md:mb-6 md:text-4xl">
            {locale.common.newsAndEvents}
          </h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <article key={post.path} className="smooth-card rounded-2xl">
                {post.images[0]?.src ? (
                  <div className="relative h-48 w-full overflow-hidden rounded-t-2xl md:h-52">
                    <Image src={post.images[0].src} alt={getPostTitle(post, lang)} fill className="object-cover" unoptimized />
                  </div>
                ) : null}
                <div className="p-4 md:p-5">
                  <h3 className="home-card-title line-clamp-2 text-xl font-bold leading-tight text-slate-900">
                    {getPostTitle(post, lang)}
                  </h3>
                  <p className="home-card-copy mt-2.5 line-clamp-3 text-sm leading-7 text-slate-600 md:mt-3">
                    {getPostSummary(post, lang)}
                  </p>
                  <Link href={post.path} className="mt-4 inline-block text-sm font-bold uppercase tracking-[0.08em] text-[#0f5c73] no-underline hover:underline">
                    {locale.common.readMore}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl px-4 md:mt-14 md:px-6">
          <h2 className="home-section-title mb-5 text-3xl font-bold text-[#0f5c73] md:mb-6 md:text-4xl">
            {homeUi.topicHighlights}
          </h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-3">
            {sectionHighlights.map((section) => (
              <article key={section.href} className="smooth-card rounded-2xl p-4 md:p-6">
                <h3 className="home-card-title text-xl font-bold text-slate-900">{section.title}</h3>
                <p className="home-card-copy mt-2.5 text-sm leading-7 text-slate-600 md:mt-3">{section.summary}</p>
                <div className="mt-3.5 space-y-2 md:mt-4">
                  {section.posts.map((post) => (
                    <Link key={post.path} href={post.path} className="block text-sm font-semibold text-[#0f5c73] no-underline hover:underline">
                      {getPostTitle(post, lang)}
                    </Link>
                  ))}
                </div>
                <Link href={section.href} className="mt-4 inline-block text-sm font-bold uppercase tracking-[0.08em] text-[#0f5c73] no-underline hover:underline">
                  {homeUi.openSection}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl px-4 md:mt-14 md:px-6">
          <div className="smooth-surface grid items-center gap-6 rounded-3xl p-5 md:gap-8 md:p-10 md:grid-cols-2">
            <div>
              <h2 className="home-section-title text-3xl font-bold text-[#0f5c73] md:text-4xl">
                {homeUi.impactTitle}
              </h2>
              <p className="home-hero-copy mt-3 text-base leading-8 text-slate-700 md:mt-4 md:text-lg">
                {localizedHome.paragraphs[3] || homeUi.impactFallbackSummary}
              </p>
              <Link
                href="/about-us"
                className="mt-5 inline-block rounded-full bg-[#0f5c73] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white no-underline hover:opacity-90 md:mt-6 md:py-3 md:text-sm"
              >
                {locale.common.learnMore}
              </Link>
            </div>
            {home.images[1]?.src ? (
              <div className="relative h-72 overflow-hidden rounded-2xl bg-slate-100 md:h-80">
                <Image src={home.images[1].src} alt={homeUi.impactImageAlt} fill className="object-cover" unoptimized />
              </div>
            ) : null}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl px-4 md:mt-14 md:px-6">
          <h2 className="home-section-title mb-5 text-3xl font-bold text-[#0f5c73] md:mb-6 md:text-4xl">
            {homeUi.latestStories}
          </h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <article key={post.path} className="smooth-card rounded-2xl">
                {post.images[0]?.src ? (
                  <div className="relative h-44 w-full overflow-hidden rounded-t-2xl">
                    <Image src={post.images[0].src} alt={getPostTitle(post, lang)} fill className="object-cover" unoptimized />
                  </div>
                ) : null}
                <div className="p-4">
                  <h3 className="home-card-title line-clamp-2 text-base font-bold text-gray-900">
                    {getPostTitle(post, lang)}
                  </h3>
                  <p className="home-card-copy mt-2 line-clamp-3 text-sm text-gray-600">
                    {getPostSummary(post, lang)}
                  </p>
                  <Link href={post.path} className="mt-3 inline-block text-sm font-semibold text-[#0f5c73] hover:underline">
                    {locale.common.readMore}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl px-4 md:mt-14 md:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-[#0f5c73] to-[#123847] px-5 py-8 text-center text-white md:px-12 md:py-10">
            <h2 className="home-section-title text-3xl font-bold md:text-4xl">
              {locale.common.supportOurMission}
            </h2>
            <p className="home-hero-copy mx-auto mt-3 max-w-3xl text-slate-200 md:mt-4">
              {localizedHome.paragraphs[4] || homeUi.supportFallbackSummary}
            </p>
            <div className="mt-5 md:mt-6">
              <Link href="/about-us/our-victories" className="inline-block rounded-full border border-white/40 px-7 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-white/10 no-underline md:px-8 md:py-3 md:text-sm">
                {homeUi.seeOurVictories}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer initialLanguage={lang} />
    </>
  );
}
