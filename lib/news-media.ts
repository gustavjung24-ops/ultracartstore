import type { PcrmMedia } from "@/lib/pcrm-content";

export type NewsImageCategory = "health" | "science" | "event" | "general";

const TRUST_BADGE_IMAGE_PATTERN =
  /candid-seal|animal_charities_america|\/bbb\.png|bia_seal|charity-watch/i;

const TRACKING_IMAGE_PATTERN = /p\.gif|pixel|tracking/i;

const NEWS_IMAGE_OVERRIDES_BY_PATH: Record<string, string> = {
  "/news/news-releases/physicians-committee-offering-grants-farmers-who-are-growing-health-promoting":
    "https://www.pcrm.org/sites/default/files/2024-11/farmer-tangerines.jpg",
  "/news/news-releases/doctors-group-files-legal-petition-urging-usda-require-colorectal-cancer-warning":
    "https://www.pcrm.org/sites/default/files/2026-04/Processed-Meat-Warning-Label.jpg",
  "/news/news-releases/swapping-meat-and-dairy-plant-based-foods-cuts-climate-pollution-35-randomized":
    "https://www.pcrm.org/sites/default/files/styles/teaser_400x225/public/2021-04/doctors-climate-change.jpg?h=d1cb525d&itok=Xtj42DRr",
};

export function isRenderableNewsImage(src: string): boolean {
  const normalized = src.trim();
  if (!normalized) {
    return false;
  }

  if (TRACKING_IMAGE_PATTERN.test(normalized)) {
    return false;
  }

  if (TRUST_BADGE_IMAGE_PATTERN.test(normalized)) {
    return false;
  }

  return true;
}

export function getFirstRenderableNewsImage(images: PcrmMedia[]): PcrmMedia | undefined {
  return images.find((image) => isRenderableNewsImage(image.src));
}

export function getNewsImageCategory(path: string): NewsImageCategory {
  if (path.includes("/health-nutrition/")) {
    return "health";
  }

  if (
    path.includes("/innovative-science/") ||
    path.includes("/good-science-digest/") ||
    path.includes("/ethical-science/")
  ) {
    return "science";
  }

  if (path.includes("/events/")) {
    return "event";
  }

  return "general";
}

export function getNewsPlaceholderImage(path: string): string {
  const category = getNewsImageCategory(path);

  switch (category) {
    case "health":
      return "/images/placeholder-main.svg";
    case "science":
      return "/images/placeholder-guide.svg";
    case "event":
      return "/images/placeholder-kit.svg";
    default:
      return "/images/placeholder-front.svg";
  }
}

export function resolveNewsImage(
  path: string,
  images: PcrmMedia[],
  externalFallbackImage?: string,
): { src: string; fromSource: boolean } {
  const fromPage = getFirstRenderableNewsImage(images);
  if (fromPage) {
    return { src: fromPage.src, fromSource: true };
  }

  const pathOverride = NEWS_IMAGE_OVERRIDES_BY_PATH[path];
  if (pathOverride && isRenderableNewsImage(pathOverride)) {
    return { src: pathOverride, fromSource: true };
  }

  if (externalFallbackImage && isRenderableNewsImage(externalFallbackImage)) {
    return { src: externalFallbackImage, fromSource: true };
  }

  return { src: getNewsPlaceholderImage(path), fromSource: false };
}
