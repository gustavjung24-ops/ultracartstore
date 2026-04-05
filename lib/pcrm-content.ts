import translatedAll from "@/pcrm_translated/translated_all.json";
import generatedSourcePages from "@/pcrm_translated/generated_source_pages.json";
import { manualPages } from "@/lib/manual-pages";

export interface PcrmMedia {
  src: string;
  alt: string;
}

export interface PcrmLink {
  text: string;
  url: string;
}

export interface PcrmPage {
  url: string;
  title: string;
  title_en?: string;
  title_vi?: string;
  description: string;
  description_en?: string;
  description_vi?: string;
  h1: string[];
  h1_en?: string[];
  h1_vi?: string[];
  h2: string[];
  h2_en?: string[];
  h2_vi?: string[];
  h3: string[];
  h3_en?: string[];
  h3_vi?: string[];
  paragraphs: string[];
  paragraphs_en?: string[];
  paragraphs_vi?: string[];
  images: PcrmMedia[];
  links: PcrmLink[];
  links_vi?: (PcrmLink & { text_vi?: string })[];
}

export type ContentLanguage = "en" | "vi";
export type PcrmContentSource = "generated_source_pages" | "translated_all" | "manual_pages";

export interface PcrmResolvedPage extends PcrmPage {
  path: string;
  source_en: PcrmContentSource;
  source_vi: PcrmContentSource;
}

export interface PcrmPageSourceResolution {
  path: string;
  source_en: PcrmContentSource;
  source_vi: PcrmContentSource;
  has_manual_entry: boolean;
}

export interface LocalizedPcrmPageContent {
  title: string;
  description: string;
  h1: string[];
  h2: string[];
  h3: string[];
  paragraphs: string[];
  links: PcrmLink[];
}

const BASE = "https://www.pcrm.org";
const PATH_ALIASES: Record<string, string> = {
  "/contact-us": "/contact",
};

const QA_TARGET_HUBS = new Set(["/about-us", "/good-nutrition"]);
const MEMBERSHIP_CTA_EN = "Make your 2026 membership gift today!";
const MEMBERSHIP_CTA_VI = "Hãy tặng quà thành viên năm 2026 ngay hôm nay!";

const QA_LINK_EXCLUDE_BY_PATH: Record<string, Set<string>> = {
  "/about-us": new Set([
    "/#main-content",
    "/",
    "/good-nutrition/nutrition-for-clinicians",
    "/good-nutrition/nutrition-for-clinicians/medical-students",
    "/term/scientists",
    "/about-us",
  ]),
  "/good-nutrition": new Set([
    "/#main-content",
    "/",
    "/good-nutrition/nutrition-for-clinicians",
    "/good-nutrition/nutrition-for-clinicians/medical-students",
    "/term/scientists",
    "/about-us",
    "/about-us#leadership",
    "/about-us/our-victories",
    "/about-us/careers",
    "/about-us/careers/internships",
    "/events",
    "/about-us/financial-report",
    "/barnard-medical-center",
    "/contact-us",
  ]),
};

const QA_VI_LINK_TEXT_REPLACEMENTS: Record<string, string> = {
  "Khả năng lãnh đạo": "Ban lãnh đạo",
  "Nghề nghiệp": "Tuyển dụng",
  "Cách cho đi": "Các cách ủng hộ",
  "Chủ tịch Hội đồng Tổng thống": "Chủ tịch Hội đồng Chủ tịch",
  "Đánh dấu Hammond, MD": "Mark Hammond, MD",
  "Ca sĩ Mikalah, JD, LLM": "Mikalah Singer, JD, LLM",
  "Nhà xuất bản Deborah Dubow, Esq.": "Deborah Dubow Press, Esq.",
  "Nô-ê Praamsma, MS, RDN": "Noah Praamsma, MS, RDN",
};

// Source-of-truth resolution for each normalized path.
// EN reference: generated_source_pages -> translated_all -> manual_pages.
// VI layer: translated_all -> generated_source_pages -> manual_pages.
const SOURCE_PRIORITY = {
  en: ["generated_source_pages", "translated_all", "manual_pages"],
  vi: ["translated_all", "generated_source_pages", "manual_pages"],
} as const;

type PcrmInputPage = PcrmPage & { path?: string };
type SourcedPcrmPage = PcrmPage & {
  path: string;
  contentSource: PcrmContentSource;
};

function normalizePath(path: string): string {
  const clean = path.replace(/\/+$/g, "").replace(/^\/+/, "");
  if (!clean || clean === "home") return "/";
  return `/${clean}`;
}

function pathFromUrl(url: string): string {
  if (!url.startsWith(BASE)) return "/";
  const pathname = new URL(url).pathname;
  return normalizePath(pathname);
}

function likelyTrackingImage(src: string): boolean {
  return /pixel|tracking|p\.gif/i.test(src);
}

function isNonEmptyString(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function firstNonEmptyString(...values: Array<string | undefined | null>): string {
  for (const value of values) {
    if (isNonEmptyString(value)) {
      return value;
    }
  }
  return "";
}

function firstNonEmptyArray(...values: Array<string[] | undefined>): string[] {
  for (const value of values) {
    if (Array.isArray(value) && value.length > 0) {
      return value.filter(isNonEmptyString);
    }
  }
  return [];
}

function normalizeLinks(links: PcrmLink[] | undefined): PcrmLink[] {
  if (!Array.isArray(links)) {
    return [];
  }

  return links
    .filter((link): link is PcrmLink => Boolean(link?.url))
    .map((link) => ({
      text: isNonEmptyString(link.text) ? link.text : link.url,
      url: link.url,
    }));
}

function normalizeLinksVi(
  links: (PcrmLink & { text_vi?: string })[] | undefined,
): (PcrmLink & { text_vi?: string })[] {
  if (!Array.isArray(links)) {
    return [];
  }

  return links
    .filter((link): link is PcrmLink & { text_vi?: string } => Boolean(link?.url))
    .map((link) => ({
      text: isNonEmptyString(link.text) ? link.text : link.url,
      text_vi: isNonEmptyString(link.text_vi) ? link.text_vi : undefined,
      url: link.url,
    }));
}

function normalizePcrmLinkKey(url: string): string {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();

    if (hostname === "www.pcrm.org" || hostname === "pcrm.org") {
      const pathname = normalizePath(parsed.pathname);
      return `${pathname}${parsed.hash}`;
    }

    return parsed.href;
  } catch {
    return url;
  }
}

function trimMembershipCtaParagraphs(paragraphs: string[], cta: string): string[] {
  if (paragraphs.length === 0) {
    return paragraphs;
  }

  return paragraphs[0] === cta ? paragraphs.slice(1) : paragraphs;
}

function applyHubPageQaFixes(page: PcrmResolvedPage): PcrmResolvedPage {
  if (!QA_TARGET_HUBS.has(page.path)) {
    return page;
  }

  const excludedLinkKeys = QA_LINK_EXCLUDE_BY_PATH[page.path] ?? new Set<string>();
  const seenLinkKeys = new Set<string>();

  const filteredLinks = page.links.filter((link) => {
    const key = normalizePcrmLinkKey(link.url);
    if (excludedLinkKeys.has(key)) {
      return false;
    }

    const dedupeKey = `${key}::${link.text}`;
    if (seenLinkKeys.has(dedupeKey)) {
      return false;
    }

    seenLinkKeys.add(dedupeKey);
    return true;
  });

  const filteredLinksVi = page.links_vi
    ?.filter((link) => {
      const key = normalizePcrmLinkKey(link.url);
      if (excludedLinkKeys.has(key)) {
        return false;
      }

      const dedupeKey = `${key}::${link.text}`;
      return seenLinkKeys.has(dedupeKey);
    })
    .map((link) => {
      const sourceText = link.text_vi || link.text;
      const correctedText = QA_VI_LINK_TEXT_REPLACEMENTS[sourceText] ?? sourceText;

      return {
        ...link,
        text_vi: correctedText,
      };
    });

  const paragraphsEn = trimMembershipCtaParagraphs(page.paragraphs_en ?? page.paragraphs, MEMBERSHIP_CTA_EN);
  const paragraphsVi = trimMembershipCtaParagraphs(page.paragraphs_vi ?? page.paragraphs, MEMBERSHIP_CTA_VI);

  return {
    ...page,
    paragraphs: paragraphsEn,
    paragraphs_en: paragraphsEn,
    paragraphs_vi: paragraphsVi,
    links: filteredLinks,
    links_vi: filteredLinksVi,
  };
}

function pickLocalizedValue<T>(
  lang: ContentLanguage,
  values: { vi?: T; en?: T; fallback: T },
): T {
  if (lang === "vi") {
    return values.vi ?? values.en ?? values.fallback;
  }

  return values.en ?? values.fallback;
}

function getLocalizedLinks(page: PcrmPage, lang: ContentLanguage): PcrmLink[] {
  if (lang === "vi" && page.links_vi?.length) {
    return page.links_vi.map((link) => ({
      text: link.text_vi || link.text,
      url: link.url,
    }));
  }

  return page.links;
}

export function getLocalizedPcrmPageContent(
  page: PcrmPage,
  lang: ContentLanguage,
): LocalizedPcrmPageContent {
  const title = pickLocalizedValue(lang, {
    vi: firstNonEmptyString(page.h1_vi?.[0], page.title_vi),
    en: firstNonEmptyString(page.h1_en?.[0], page.title_en),
    fallback: firstNonEmptyString(page.h1[0], page.title),
  });

  return {
    title,
    description: pickLocalizedValue(lang, {
      vi: page.description_vi,
      en: page.description_en,
      fallback: page.description,
    }),
    h1: pickLocalizedValue(lang, {
      vi: page.h1_vi,
      en: page.h1_en,
      fallback: page.h1,
    }),
    h2: pickLocalizedValue(lang, {
      vi: page.h2_vi,
      en: page.h2_en,
      fallback: page.h2,
    }),
    h3: pickLocalizedValue(lang, {
      vi: page.h3_vi,
      en: page.h3_en,
      fallback: page.h3,
    }),
    paragraphs: pickLocalizedValue(lang, {
      vi: page.paragraphs_vi,
      en: page.paragraphs_en,
      fallback: page.paragraphs,
    }),
    links: getLocalizedLinks(page, lang),
  };
}

function normalizeInputPage(page: PcrmInputPage, source: PcrmContentSource): SourcedPcrmPage {
  const path = page.path ? normalizePath(page.path) : pathFromUrl(page.url);

  return {
    ...page,
    path,
    contentSource: source,
    title: page.title ?? "",
    description: page.description ?? "",
    h1: firstNonEmptyArray(page.h1),
    h2: firstNonEmptyArray(page.h2),
    h3: firstNonEmptyArray(page.h3),
    paragraphs: firstNonEmptyArray(page.paragraphs),
    h1_en: firstNonEmptyArray(page.h1_en),
    h1_vi: firstNonEmptyArray(page.h1_vi),
    h2_en: firstNonEmptyArray(page.h2_en),
    h2_vi: firstNonEmptyArray(page.h2_vi),
    h3_en: firstNonEmptyArray(page.h3_en),
    h3_vi: firstNonEmptyArray(page.h3_vi),
    paragraphs_en: firstNonEmptyArray(page.paragraphs_en),
    paragraphs_vi: firstNonEmptyArray(page.paragraphs_vi),
    images: (page.images ?? []).filter(
      (img): img is PcrmMedia => Boolean(img?.src) && !likelyTrackingImage(img.src),
    ),
    links: normalizeLinks(page.links),
    links_vi: normalizeLinksVi(page.links_vi),
  };
}

function buildSourceMap(rawPages: PcrmInputPage[], source: PcrmContentSource) {
  return new Map<string, SourcedPcrmPage>(
    rawPages.map((page) => {
      const normalizedPage = normalizeInputPage(page, source);
      return [normalizedPage.path, normalizedPage] as const;
    }),
  );
}

const pagesBySource: Record<PcrmContentSource, Map<string, SourcedPcrmPage>> = {
  generated_source_pages: buildSourceMap(
    generatedSourcePages as PcrmInputPage[],
    "generated_source_pages",
  ),
  translated_all: buildSourceMap(translatedAll as PcrmInputPage[], "translated_all"),
  manual_pages: buildSourceMap(manualPages as PcrmInputPage[], "manual_pages"),
};

function pickSourcePage(path: string, lang: ContentLanguage): SourcedPcrmPage | undefined {
  const normalizedPath = normalizePath(path);

  for (const source of SOURCE_PRIORITY[lang]) {
    const page = pagesBySource[source].get(normalizedPath);
    if (page) {
      return page;
    }
  }

  return undefined;
}

function toLinksVi(
  viLayer: SourcedPcrmPage | undefined,
  englishLinks: PcrmLink[],
): (PcrmLink & { text_vi?: string })[] {
  if (viLayer?.links_vi?.length) {
    return viLayer.links_vi;
  }

  if (viLayer?.links?.length) {
    return viLayer.links.map((link) => ({
      ...link,
      text_vi: link.text,
    }));
  }

  return englishLinks.map((link) => ({
    ...link,
    text_vi: link.text,
  }));
}

function composeResolvedPage(
  path: string,
  enReference: SourcedPcrmPage,
  viLayer: SourcedPcrmPage,
  sourceEn: PcrmContentSource,
  sourceVi: PcrmContentSource,
): PcrmResolvedPage {
  const titleEn = firstNonEmptyString(
    enReference.title_en,
    enReference.title,
    enReference.h1_en?.[0],
    enReference.h1[0],
  );
  const titleVi = firstNonEmptyString(
    viLayer.title_vi,
    viLayer.title,
    viLayer.h1_vi?.[0],
    viLayer.h1[0],
    enReference.title_vi,
    titleEn,
  );

  const descriptionEn = firstNonEmptyString(
    enReference.description_en,
    enReference.description,
  );
  const descriptionVi = firstNonEmptyString(
    viLayer.description_vi,
    viLayer.description,
    enReference.description_vi,
    descriptionEn,
  );

  const h1En = firstNonEmptyArray(enReference.h1_en, enReference.h1, titleEn ? [titleEn] : undefined);
  const h1Vi = firstNonEmptyArray(viLayer.h1_vi, viLayer.h1, enReference.h1_vi, h1En);
  const h2En = firstNonEmptyArray(enReference.h2_en, enReference.h2);
  const h2Vi = firstNonEmptyArray(viLayer.h2_vi, viLayer.h2, enReference.h2_vi, h2En);
  const h3En = firstNonEmptyArray(enReference.h3_en, enReference.h3);
  const h3Vi = firstNonEmptyArray(viLayer.h3_vi, viLayer.h3, enReference.h3_vi, h3En);
  const paragraphsEn = firstNonEmptyArray(enReference.paragraphs_en, enReference.paragraphs);
  const paragraphsVi = firstNonEmptyArray(
    viLayer.paragraphs_vi,
    viLayer.paragraphs,
    enReference.paragraphs_vi,
    paragraphsEn,
  );

  const links = normalizeLinks(enReference.links);
  const linksVi = toLinksVi(viLayer, links);
  const images = enReference.images.length > 0 ? enReference.images : viLayer.images;
  const canonicalUrl = firstNonEmptyString(
    enReference.url,
    viLayer.url,
    `${BASE}${path === "/" ? "/home" : path}`,
  );

  return {
    path,
    source_en: sourceEn,
    source_vi: sourceVi,
    url: canonicalUrl,
    title: titleEn,
    title_en: titleEn,
    title_vi: titleVi,
    description: descriptionEn,
    description_en: descriptionEn,
    description_vi: descriptionVi,
    h1: h1En,
    h1_en: h1En,
    h1_vi: h1Vi,
    h2: h2En,
    h2_en: h2En,
    h2_vi: h2Vi,
    h3: h3En,
    h3_en: h3En,
    h3_vi: h3Vi,
    paragraphs: paragraphsEn,
    paragraphs_en: paragraphsEn,
    paragraphs_vi: paragraphsVi,
    images,
    links,
    links_vi: linksVi,
  };
}

const allKnownPaths = Array.from(
  new Set([
    ...pagesBySource.generated_source_pages.keys(),
    ...pagesBySource.translated_all.keys(),
    ...pagesBySource.manual_pages.keys(),
  ]),
);

const resolvedPages: PcrmResolvedPage[] = allKnownPaths
  .map((path) => {
    const enPage = pickSourcePage(path, "en");
    const viPage = pickSourcePage(path, "vi");
    const fallbackPage = enPage ?? viPage;

    if (!fallbackPage) {
      return null;
    }

    const enReference = enPage ?? fallbackPage;
    const viLayer = viPage ?? fallbackPage;

    return applyHubPageQaFixes(
      composeResolvedPage(
      path,
      enReference,
      viLayer,
      enReference.contentSource,
      viLayer.contentSource,
      ),
    );
  })
  .filter((page): page is PcrmResolvedPage => Boolean(page));

const byPath = new Map<string, PcrmResolvedPage>(resolvedPages.map((page) => [page.path, page]));

const sourceResolutionByPath = new Map<string, PcrmPageSourceResolution>(
  resolvedPages.map((page) => [
    page.path,
    {
      path: page.path,
      source_en: page.source_en,
      source_vi: page.source_vi,
      has_manual_entry: pagesBySource.manual_pages.has(page.path),
    },
  ]),
);

const blogPathOrder = [
  ...pagesBySource.translated_all.keys(),
  ...pagesBySource.generated_source_pages.keys(),
];

export function getAllPcrmPages() {
  return resolvedPages;
}

export function getPcrmPageByPath(path: string) {
  return byPath.get(normalizePath(path));
}

export function getPcrmPageBySegments(segments: string[] = []) {
  const path = segments.length ? `/${segments.join("/")}` : "/";
  return getPcrmPageByPath(path);
}

export function getMainNavigation() {
  const preferred = [
    "/",
    "/about-us",
    "/good-nutrition",
    "/ethical-science",
    "/clinical-research",
    "/health-topics",
    "/news/blog",
    "/contact",
    "/donate",
  ];

  return preferred
    .map((path) => getPcrmPageByPath(path))
    .filter((page): page is PcrmResolvedPage => Boolean(page))
    .map((page) => ({
      href: page.path,
      label: page.h1[0] || page.title,
    }));
}

export function getBlogPages() {
  const dedupedPath = new Set<string>();
  const blogPages: PcrmResolvedPage[] = [];

  for (const path of blogPathOrder) {
    if (dedupedPath.has(path)) {
      continue;
    }

    dedupedPath.add(path);

    if (!path.startsWith("/news/") || path === "/news/blog") {
      continue;
    }

    const page = byPath.get(path);
    if (page) {
      blogPages.push(page);
    }
  }

  return blogPages;
}

export function getPcrmPageSourceResolution(path: string) {
  return sourceResolutionByPath.get(normalizePath(path));
}

export function getAllPcrmPageSourceResolutions() {
  return [...sourceResolutionByPath.values()];
}

export function sanitizeExternalLink(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.href;
  } catch {
    return BASE;
  }
}

function closestKnownPath(path: string): string {
  const normalized = normalizePath(path);
  const aliased = PATH_ALIASES[normalized] || normalized;

  if (byPath.has(aliased)) {
    return aliased;
  }

  const segments = aliased.split("/").filter(Boolean);
  while (segments.length > 0) {
    segments.pop();
    const candidate = segments.length ? `/${segments.join("/")}` : "/";
    if (byPath.has(candidate)) {
      return candidate;
    }
  }

  return "/";
}

export function toInternalPcrmHref(url: string): { href: string; internal: boolean } {
  const trimmed = url.trim();

  if (!trimmed) {
    return { href: "/", internal: true };
  }

  if (trimmed.startsWith("/")) {
    return { href: closestKnownPath(trimmed), internal: true };
  }

  try {
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.toLowerCase();

    if (hostname === "www.pcrm.org" || hostname === "pcrm.org") {
      const pathname = closestKnownPath(parsed.pathname);
      return { href: `${pathname}${parsed.search}${parsed.hash}`, internal: true };
    }

    return { href: parsed.href, internal: false };
  } catch {
    return { href: sanitizeExternalLink(trimmed), internal: false };
  }
}
