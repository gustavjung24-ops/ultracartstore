import type { PcrmMedia } from "@/lib/pcrm-content";

export type NewsImageCategory = "health" | "science" | "event" | "general";

const TRUST_BADGE_IMAGE_PATTERN =
  /candid-seal|animal_charities_america|\/bbb\.png|bia_seal|charity-watch/i;

const TRACKING_IMAGE_PATTERN = /p\.gif|pixel|tracking/i;

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

  if (externalFallbackImage && isRenderableNewsImage(externalFallbackImage)) {
    return { src: externalFallbackImage, fromSource: true };
  }

  return { src: getNewsPlaceholderImage(path), fromSource: false };
}
