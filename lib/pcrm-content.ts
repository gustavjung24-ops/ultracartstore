import translatedAll from "@/pcrm_translated/translated_all.json";
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

const RAW = translatedAll as PcrmPage[];
const BASE = "https://www.pcrm.org";

function normalizePath(path: string): string {
  const clean = path.replace(/\/+$|^\/+/, "");
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

const pages = RAW.map((page) => ({
  ...page,
  path: pathFromUrl(page.url),
  images: page.images.filter((img) => !likelyTrackingImage(img.src)),
}));

const mergedPages = [...pages, ...manualPages];

const byPath = new Map<string, (PcrmPage & { path: string })>(mergedPages.map((page) => [page.path, page]));

export function getAllPcrmPages() {
  return mergedPages;
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
    .filter((page): page is PcrmPage & { path: string } => Boolean(page))
    .map((page) => ({
      href: page.path,
      label: page.h1[0] || page.title,
    }));
}

export function getBlogPages() {
  return pages.filter((page) => page.path.startsWith("/news/") && page.path !== "/news/blog");
}

export function sanitizeExternalLink(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.href;
  } catch {
    return BASE;
  }
}
