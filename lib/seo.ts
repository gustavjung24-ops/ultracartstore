import type { Metadata } from "next";
import type { PcrmMedia } from "@/lib/pcrm-content";
import { getFirstRenderableNewsImage, getNewsImageCategory, isRenderableNewsImage } from "@/lib/news-media";
import { isNoisyNewsSummaryLine } from "@/lib/news-summary";

export const SITE_URL = "https://www.yhoclanhmanh.com";
export const SITE_NAME = "Y học lành mạnh";
export const DEFAULT_SITE_TITLE = "Y học lành mạnh | Dinh dưỡng thực vật và y học dự phòng";
export const DEFAULT_SITE_DESCRIPTION =
  "Y học lành mạnh chia sẻ kiến thức y học dự phòng, dinh dưỡng dựa trên thực vật và cập nhật khoa học y khoa có trách nhiệm.";
export const DEFAULT_SOCIAL_IMAGE =
  "https://www.pcrm.org/sites/default/files/styles/teaser_1200x630/public/2020-12/plant-based-protein.jpg?h=d1cb525d&itok=DY73HvsH";

const CATEGORY_SOCIAL_IMAGE_BY_NEWS_CATEGORY: Record<string, string> = {
  health:
    "https://www.pcrm.org/sites/default/files/styles/teaser_1200x630/public/2020-12/plant-based-protein.jpg?h=d1cb525d&itok=DY73HvsH",
  science:
    "https://www.pcrm.org/sites/default/files/styles/teaser_1200x630/public/2026-03/brain-illustration.jpg?h=d1cb525d&itok=4aNXp8aE",
  event:
    "https://www.pcrm.org/sites/default/files/styles/teaser_1200x630/public/2023-05/mission-critical.jpeg?h=06df2dbb&itok=V7SZkyUf",
  general: DEFAULT_SOCIAL_IMAGE,
};

type SeoLanguage = "en" | "vi";

type SeoDescriptionOptions = {
  description?: string;
  paragraphs?: string[];
  language?: SeoLanguage;
  fallback?: string;
  maxLength?: number;
};

type BuildPageMetadataOptions = {
  path: string;
  title?: string;
  description?: string;
  paragraphs?: string[];
  image?: string;
  type?: "website" | "article" | "profile";
  language?: SeoLanguage;
  noIndex?: boolean;
};

function normalizeWhitespace(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function trimToLength(value: string, maxLength = 170): string {
  if (value.length <= maxLength) {
    return value;
  }

  const candidate = value.slice(0, maxLength);
  const lastSpace = candidate.lastIndexOf(" ");
  return `${candidate.slice(0, lastSpace > 90 ? lastSpace : maxLength).trim()}...`;
}

export function toCanonicalPath(path: string): string {
  const normalized = path.trim().replace(/\/+$/g, "");
  if (!normalized || normalized === "/") {
    return "/";
  }

  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

export function toAbsoluteUrl(urlOrPath: string): string {
  const value = urlOrPath.trim();

  if (!value) {
    return SITE_URL;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith("//")) {
    return `https:${value}`;
  }

  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

export function toSocialImageUrl(imageUrl: string): string {
  const absolute = toAbsoluteUrl(imageUrl);

  try {
    const parsed = new URL(absolute);
    parsed.pathname = parsed.pathname.replace(/\/styles\/teaser_[^/]+\//, "/styles/teaser_1200x630/");

    if (!parsed.pathname.includes("/styles/") && parsed.pathname.startsWith("/sites/default/files/")) {
      const rawFilePath = parsed.pathname.replace("/sites/default/files/", "");
      parsed.pathname = `/sites/default/files/styles/teaser_1200x630/public/${rawFilePath}`;
    }

    return parsed.toString();
  } catch {
    return absolute.replace(/\/styles\/teaser_[^/]+\//, "/styles/teaser_1200x630/");
  }
}

export function getSeoFallbackImage(path: string): string {
  const category = getNewsImageCategory(path);
  return CATEGORY_SOCIAL_IMAGE_BY_NEWS_CATEGORY[category] || CATEGORY_SOCIAL_IMAGE_BY_NEWS_CATEGORY.general;
}

export function resolveSeoImage(path: string, images: PcrmMedia[], fallbackImage?: string): string {
  const mainImage = getFirstRenderableNewsImage(images);
  if (mainImage?.src) {
    return toSocialImageUrl(mainImage.src);
  }

  if (fallbackImage && isRenderableNewsImage(fallbackImage)) {
    return toSocialImageUrl(fallbackImage);
  }

  return getSeoFallbackImage(path);
}

function isMeaningfulText(value: string, language: SeoLanguage): boolean {
  if (!value) {
    return false;
  }

  if (isNoisyNewsSummaryLine(value, language)) {
    return false;
  }

  return value.length > 24;
}

export function buildSeoDescription({
  description,
  paragraphs = [],
  language = "vi",
  fallback = DEFAULT_SITE_DESCRIPTION,
  maxLength = 170,
}: SeoDescriptionOptions): string {
  const cleanDescription = normalizeWhitespace(description || "");
  if (isMeaningfulText(cleanDescription, language)) {
    return trimToLength(cleanDescription, maxLength);
  }

  const paragraphSummary = paragraphs
    .map((paragraph) => normalizeWhitespace(paragraph))
    .find((paragraph) => isMeaningfulText(paragraph, language));

  if (paragraphSummary) {
    return trimToLength(paragraphSummary, maxLength);
  }

  return trimToLength(normalizeWhitespace(fallback), maxLength);
}

export function buildPageTitle(title?: string): string {
  const cleanTitle = normalizeWhitespace(title || "");
  if (!cleanTitle) {
    return DEFAULT_SITE_TITLE;
  }

  if (cleanTitle.toLowerCase().includes(SITE_NAME.toLowerCase())) {
    return cleanTitle;
  }

  return `${cleanTitle} | ${SITE_NAME}`;
}

export function createOgImage(url: string, alt: string) {
  return {
    url: toAbsoluteUrl(url),
    width: 1200,
    height: 630,
    alt,
  };
}

export function buildPageMetadata({
  path,
  title,
  description,
  paragraphs = [],
  image,
  type = "website",
  language = "vi",
  noIndex = false,
}: BuildPageMetadataOptions): Metadata {
  const canonicalPath = toCanonicalPath(path);
  const canonicalUrl = toAbsoluteUrl(canonicalPath);
  const resolvedTitle = buildPageTitle(title);
  const resolvedDescription = buildSeoDescription({
    description,
    paragraphs,
    language,
  });
  const resolvedImage = image ? toSocialImageUrl(image) : getSeoFallbackImage(canonicalPath);
  const ogImage = createOgImage(resolvedImage, resolvedTitle);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : undefined,
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonicalUrl,
      type,
      siteName: SITE_NAME,
      locale: language === "vi" ? "vi_VN" : "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [ogImage.url],
    },
  };
}
