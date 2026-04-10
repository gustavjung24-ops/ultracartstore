import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsImage from "@/components/NewsImage";
import { buildHomepageFeed, type HomepageStory } from "@/lib/homepage-feed";
import { getNewsPlaceholderImage } from "@/lib/news-media";
import { buildPageMetadata } from "@/lib/seo";
import { getCommonLocale, getSiteLanguageFromCookie } from "@/lib/site-locale";

type StoryLinkProps = {
  story: HomepageStory;
  className: string;
  children: ReactNode;
};

const HOMEPAGE_HERO_IMAGE_SRC = "/55.png";
const HOMEPAGE_SEO_TITLE = "Y học lành mạnh | Dinh dưỡng thực vật và y học dự phòng";
const HOMEPAGE_SEO_DESCRIPTION =
  "Kiến thức y học dự phòng và dinh dưỡng thực vật dựa trên bằng chứng, dành cho sinh viên y khoa và người làm chuyên môn y tế.";

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  title: HOMEPAGE_SEO_TITLE,
  description: HOMEPAGE_SEO_DESCRIPTION,
  image: HOMEPAGE_HERO_IMAGE_SRC,
  type: "website",
  language: "vi",
});

function StoryLink({ story, className, children }: StoryLinkProps) {
  if (story.internal) {
    return (
      <Link href={story.href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={story.href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

const compactArticleCardTitleClass =
  "home-card-title mt-2 line-clamp-2 text-base font-semibold leading-tight text-slate-900";
const compactArticleCardCopyClass =
  "home-card-copy mt-2.5 line-clamp-3 text-sm leading-7 text-slate-600";
const compactArticleCardLinkClass =
  "mt-3 inline-block text-sm font-semibold tracking-[0.01em] text-[#0f5c73] no-underline hover:underline";

export default async function HomePage() {
  const lang = await getSiteLanguageFromCookie();
  const locale = getCommonLocale(lang);
  const homeUi = locale.repoUi.home;

  const feed = buildHomepageFeed({
    lang,
    healthNutritionTitle: locale.news.healthNutrition,
    innovativeScienceTitle: homeUi.innovativeScienceNews,
    innovativeScienceSummary: homeUi.innovativeScienceSummary,
    goodScienceTitle: homeUi.goodScienceDigest,
    goodScienceSummary: homeUi.goodScienceDigestSummary,
  });

  const heroCtaHref = feed.featuredNews[0]?.internal ? feed.featuredNews[0].href : "/news/blog";
  const topPromotedTitle = homeUi.topPromotedStories;
  const featuredTitle = homeUi.victory || locale.common.featured;

  return (
    <>
      <Header initialLanguage={lang} />
      <main className="pb-12 md:pb-16">
        <section className="mx-auto max-w-7xl px-4 pt-3 md:px-6 md:pt-5">
          <div className="overflow-hidden rounded-[34px] border border-[#cad8df] bg-white shadow-[0_18px_44px_rgba(15,35,45,0.16)]">
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-[260px] bg-[#dce8ee] md:min-h-[500px]">
                <Image
                  src={HOMEPAGE_HERO_IMAGE_SRC}
                  alt={homeUi.heroImageAlt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex items-center bg-[radial-gradient(circle_at_top_left,#1f7390_0%,#0f5c73_58%,#0c4a5e_100%)] px-5 py-8 text-white md:px-10 md:py-14">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.01em] text-[#ddbb83] md:text-xs">{homeUi.victory}</p>
                  <h1 className="home-hero-title mt-2.5 text-3xl font-bold leading-tight text-white sm:text-4xl md:mt-3 md:text-5xl">
                    {homeUi.heroTitle}
                  </h1>
                  <p className="home-hero-copy mt-4 max-w-xl text-base leading-8 text-slate-100 md:mt-5 md:text-lg">
                    {homeUi.heroSummary}
                  </p>
                  <div className="mt-6 md:mt-8">
                    <Link
                      href={heroCtaHref}
                      className="rounded-full border border-white/45 px-6 py-2.5 text-sm font-semibold tracking-[0.01em] text-white no-underline transition hover:bg-white/10 md:px-7 md:py-3"
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
          <h2 className="home-section-title mb-5 text-3xl font-bold text-[#0f5c73] md:mb-6 md:text-4xl">{featuredTitle}</h2>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {feed.featuredNews.map((story) => (
              <article key={story.id} className="smooth-card overflow-hidden rounded-2xl">
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <NewsImage
                    src={story.imageSrc}
                    alt={story.title}
                    fallbackSrc={getNewsPlaceholderImage(story.path)}
                    className="object-cover"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <p className="text-xs font-semibold tracking-[0.01em] text-[#0f5c73]">{story.label}</p>
                  <h3 className="home-card-title mt-2 line-clamp-2 text-xl font-semibold leading-tight text-slate-900">{story.title}</h3>
                  <p className="home-card-copy mt-2.5 line-clamp-3 text-sm leading-7 text-slate-600 md:mt-3">{story.summary}</p>
                  <StoryLink
                    story={story}
                    className="mt-4 inline-block text-sm font-semibold tracking-[0.01em] text-[#0f5c73] no-underline hover:underline"
                  >
                    {locale.common.readMore}
                  </StoryLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl px-4 md:mt-14 md:px-6">
          <h2 className="home-section-title mb-5 text-3xl font-bold text-[#0f5c73] md:mb-6 md:text-4xl">
            {locale.common.newsAndEvents}
          </h2>

          {feed.newsEventsLead ? (
            <article className="smooth-card overflow-hidden rounded-2xl">
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-video w-full bg-slate-100 md:aspect-auto md:min-h-[280px]">
                  <NewsImage
                    src={feed.newsEventsLead.imageSrc}
                    alt={feed.newsEventsLead.title}
                    fallbackSrc={getNewsPlaceholderImage(feed.newsEventsLead.path)}
                    className="object-cover"
                  />
                </div>
                <div className="p-5 md:p-7">
                  <p className="text-xs font-semibold tracking-[0.01em] text-[#0f5c73]">{feed.newsEventsLead.label}</p>
                  <h3 className="home-card-title mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">{feed.newsEventsLead.title}</h3>
                  <p className="home-card-copy mt-3 text-sm leading-7 text-slate-600">{feed.newsEventsLead.summary}</p>
                  <StoryLink
                    story={feed.newsEventsLead}
                    className="mt-4 inline-block text-sm font-semibold tracking-[0.01em] text-[#0f5c73] no-underline hover:underline"
                  >
                    {locale.common.readMore}
                  </StoryLink>
                </div>
              </div>
            </article>
          ) : null}

          <h3 className="mt-8 text-xl font-bold text-slate-900 md:mt-9">{topPromotedTitle}</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3 md:gap-6">
            {feed.topPromotedStories.map((story) => (
              <article key={story.id} className="smooth-card overflow-hidden rounded-2xl">
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <NewsImage
                    src={story.imageSrc}
                    alt={story.title}
                    fallbackSrc={getNewsPlaceholderImage(story.path)}
                    className="object-cover"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <p className="text-xs font-semibold tracking-[0.01em] text-[#0f5c73]">{story.label}</p>
                  <h4 className={compactArticleCardTitleClass}>{story.title}</h4>
                  <p className={compactArticleCardCopyClass}>{story.summary}</p>
                  <StoryLink story={story} className={compactArticleCardLinkClass}>
                    {locale.common.readMore}
                  </StoryLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl px-4 md:mt-14 md:px-6">
          <h2 className="home-section-title mb-5 text-3xl font-bold text-[#0f5c73] md:mb-6 md:text-4xl">{homeUi.topicHighlights}</h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-3">
            {feed.topicHighlights.map((section) => (
              <article key={section.id} className="smooth-card overflow-hidden rounded-2xl">
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <NewsImage
                    src={section.stories[0]?.imageSrc || "/images/placeholder-main.svg"}
                    alt={section.stories[0]?.title || section.title}
                    fallbackSrc={getNewsPlaceholderImage(section.stories[0]?.path || section.href)}
                    className="object-cover"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="home-card-title text-xl font-semibold text-slate-900">{section.title}</h3>
                  <p className="home-card-copy mt-2.5 text-sm leading-7 text-slate-600 md:mt-3">{section.summary}</p>
                  <div className="mt-3.5 space-y-3 md:mt-4">
                    {section.stories.map((story) => (
                      <StoryLink
                        key={`${section.id}-${story.id}`}
                        story={story}
                        className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-2 text-sm font-semibold text-[#0f5c73] no-underline transition hover:border-[#0f5c73]/50"
                      >
                        <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded bg-slate-100">
                          <NewsImage
                            src={story.imageSrc}
                            alt={story.title}
                            fallbackSrc={getNewsPlaceholderImage(story.path)}
                            className="object-cover"
                          />
                        </span>
                        <span className="line-clamp-2">{story.title}</span>
                      </StoryLink>
                    ))}
                  </div>
                  <Link href={section.href} className="mt-4 inline-block text-sm font-semibold tracking-[0.01em] text-[#0f5c73] no-underline hover:underline">
                    {homeUi.openSection}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl px-4 md:mt-14 md:px-6">
          <div className="smooth-surface grid items-center gap-6 rounded-3xl p-5 md:gap-8 md:p-10 md:grid-cols-2">
            <div>
              <h2 className="home-section-title text-3xl font-bold text-[#0f5c73] md:text-4xl">{homeUi.impactTitle}</h2>
              <p className="home-hero-copy mt-3 text-base leading-8 text-slate-700 md:mt-4 md:text-lg">{homeUi.impactFallbackSummary}</p>
              <Link
                href="/about-us"
                className="mt-5 inline-block rounded-full bg-[#0f5c73] px-6 py-2.5 text-sm font-semibold tracking-[0.01em] text-white no-underline hover:opacity-90 md:mt-6 md:py-3"
              >
                {locale.common.learnMore}
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[420px] overflow-hidden rounded-2xl bg-slate-100 p-2">
                <div className="relative aspect-video w-full">
                  <Image
                    src="https://img.youtube.com/vi/lKq8-2G0kjo/hqdefault.jpg"
                    alt={homeUi.impactImageAlt}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl px-4 md:mt-14 md:px-6">
          <h2 className="home-section-title mb-5 text-3xl font-bold text-[#0f5c73] md:mb-6 md:text-4xl">{homeUi.latestStories}</h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-3">
            {feed.latestNews.map((story) => (
              <article key={story.id} className="smooth-card rounded-2xl overflow-hidden">
                <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-slate-100">
                  <NewsImage
                    src={story.imageSrc}
                    alt={story.title}
                    fallbackSrc={getNewsPlaceholderImage(story.path)}
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className={compactArticleCardTitleClass}>{story.title}</h3>
                  <p className={compactArticleCardCopyClass}>{story.summary}</p>
                  <StoryLink story={story} className={compactArticleCardLinkClass}>
                    {locale.common.readMore}
                  </StoryLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl px-4 md:mt-14 md:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-[#0f5c73] to-[#123847] px-5 py-8 text-center text-white md:px-12 md:py-10">
            <h2 className="home-section-title text-3xl font-bold md:text-4xl">{locale.common.supportOurMission}</h2>
            <p className="home-hero-copy mx-auto mt-3 max-w-3xl text-slate-200 md:mt-4">{homeUi.supportFallbackSummary}</p>
            <div className="mt-5 md:mt-6">
              <Link href="/about-us/our-victories" className="inline-block rounded-full border border-white/40 px-7 py-2.5 text-sm font-semibold tracking-[0.01em] text-white transition hover:bg-white/10 no-underline md:px-8 md:py-3">
                {homeUi.exploreHighlights}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer initialLanguage={lang} />
    </>
  );
}
