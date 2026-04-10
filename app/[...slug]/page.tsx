import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AuthorAboutBox from "@/components/AuthorAboutBox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsImage from "@/components/NewsImage";
import { getAuthorForArticlePath } from "@/lib/authors";
import { getNewsPlaceholderImage, resolveNewsImage } from "@/lib/news-media";
import {
  getAllPcrmPages,
  getLocalizedPcrmPageContent,
  getPcrmPageBySegments,
  toInternalPcrmHref,
} from "@/lib/pcrm-content";
import { isNewsArticlePath } from "@/lib/news-summary";
import { buildPageMetadata, resolveSeoImage } from "@/lib/seo";
import { getCommonLocale, getSiteLanguageFromCookie } from "@/lib/site-locale";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const TRUST_BADGES = [
  {
    src: "/images/trust-badges/candid-seal-platinum-2025.png",
    alt: "Candid Platinum Transparency 2025",
    width: 100,
    height: 100,
  },
  {
    src: "/images/trust-badges/animal-charities-of-america.png",
    alt: "Animal Charities of America",
    width: 300,
    height: 300,
  },
  {
    src: "/images/trust-badges/bbb-accredited-charity.png",
    alt: "BBB Accredited Charity",
    width: 300,
    height: 300,
  },
  {
    src: "/images/trust-badges/best-in-america.png",
    alt: "Best in America",
    width: 300,
    height: 300,
  },
  {
    src: "/images/trust-badges/charitywatch-top-rated.png",
    alt: "Charity Watch Top-Rated",
    width: 300,
    height: 231,
  },
];

export async function generateStaticParams() {
  return getAllPcrmPages()
    .filter((page) => page.path !== "/")
    .map((page) => ({ slug: page.path.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPcrmPageBySegments(slug);

  if (!page || page.path === "/") {
    return {};
  }

  const lang = await getSiteLanguageFromCookie();
  const localizedPage = getLocalizedPcrmPageContent(page, lang);
  const resolvedNewsImage = resolveNewsImage(page.path, page.images);
  const seoImage = resolveSeoImage(
    page.path,
    page.images,
    resolvedNewsImage.fromSource ? resolvedNewsImage.src : undefined,
  );

  return buildPageMetadata({
    path: page.path,
    title: localizedPage.title,
    description: localizedPage.description,
    paragraphs: localizedPage.paragraphs,
    image: seoImage,
    type: isNewsArticlePath(page.path) ? "article" : "website",
    language: lang,
  });
}

export default async function DynamicPcrmPage({ params }: Props) {
  const { slug } = await params;
  const lang = await getSiteLanguageFromCookie();
  const locale = getCommonLocale(lang);
  const page = getPcrmPageBySegments(slug);

  if (!page || page.path === "/") {
    notFound();
  }

  const localizedPage = getLocalizedPcrmPageContent(page, lang);
  const { title, description, h2, h3, paragraphs, links } = localizedPage;
  const seenNormalizedLinkTargets = new Set<string>();
  const normalizedLinks = links
    .map((link) => {
      const mapped = toInternalPcrmHref(link.url);
      return {
        text: link.text,
        href: mapped.href,
        internal: mapped.internal,
      };
    })
    .filter((link) => {
      const dedupeKey = `${link.internal ? "internal" : "external"}:${link.href}`;
      if (seenNormalizedLinkTargets.has(dedupeKey)) {
        return false;
      }

      seenNormalizedLinkTargets.add(dedupeKey);
      return true;
    });
  const showTrustBadges = page.path === "/about-us/financial-report";
  const articleAuthor = isNewsArticlePath(page.path) ? getAuthorForArticlePath(page.path) : undefined;
  const heroImage = resolveNewsImage(page.path, page.images);
  const shouldRenderHeroImage = page.path.startsWith("/news/") ? true : heroImage.fromSource;

  return (
    <>
      <Header initialLanguage={lang} />
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-4 text-sm text-slate-500">
          <span>{locale.common.home}</span>
          <span className="mx-2">/</span>
          <span>{title}</span>
        </div>

        <article className="page-surface overflow-hidden p-6 md:p-10">
          <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{title}</h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-700 md:text-lg">{description}</p>

          {shouldRenderHeroImage ? (
            <div className="mt-8 flex justify-center">
              <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-sm bg-slate-100">
                <NewsImage
                  src={heroImage.src}
                  alt={title}
                  fallbackSrc={getNewsPlaceholderImage(page.path)}
                  className="object-contain"
                />
              </div>
            </div>
          ) : null}

          <section className="prose mt-8 max-w-none">
            {h2.map((heading, index) => (
              <h2 key={`${heading}-${index}`} className="text-2xl font-bold text-slate-900">
                {heading}
              </h2>
            ))}

            {h3.map((heading, index) => (
              <h3 key={`${heading}-${index}`} className="text-xl font-semibold text-slate-800">
                {heading}
              </h3>
            ))}

            {paragraphs.map((paragraph, index) => (
              <p key={`${page.path}-p-${index}`}>{paragraph}</p>
            ))}
          </section>

          {normalizedLinks.length ? (
            <section className="mt-10 border-t border-slate-200 pt-8">
              <h3 className="text-lg font-bold text-slate-900">{locale.common.relatedLinks}</h3>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                {normalizedLinks.slice(0, 24).map((link, index) => (
                  <li key={`${link.href}-${index}`}>
                    {link.internal ? (
                      <Link href={link.href} className="text-[#006c96] hover:underline">
                        {link.text}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-[#006c96] hover:underline" target="_blank" rel="noreferrer">
                        {link.text}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {showTrustBadges ? (
            <section className="mt-10 rounded-sm bg-[#0b485a] p-5 md:p-8">
              <div className="flex flex-wrap items-start gap-6 md:gap-8">
                {TRUST_BADGES.slice(0, 3).map((badge) => (
                  <div key={badge.src} className="flex h-[108px] w-[108px] items-center justify-center">
                    <Image
                      src={badge.src}
                      alt={badge.alt}
                      width={badge.width}
                      height={badge.height}
                      className="h-auto w-auto max-h-[108px] max-w-[108px] object-contain"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-start gap-6 md:mt-7 md:gap-8">
                {TRUST_BADGES.slice(3).map((badge) => (
                  <div key={badge.src} className="flex h-[108px] w-[108px] items-center justify-center">
                    <Image
                      src={badge.src}
                      alt={badge.alt}
                      width={badge.width}
                      height={badge.height}
                      className="h-auto w-auto max-h-[108px] max-w-[108px] object-contain"
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {articleAuthor ? <AuthorAboutBox author={articleAuthor} /> : null}
        </article>
      </main>
      <Footer initialLanguage={lang} />
    </>
  );
}
