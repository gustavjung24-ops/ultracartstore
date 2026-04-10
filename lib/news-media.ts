import type { PcrmMedia } from "@/lib/pcrm-content";

export type NewsImageCategory = "health" | "science" | "event" | "general";

const TRUST_BADGE_IMAGE_PATTERN =
  /candid-seal|animal_charities_america|\/bbb\.png|bia_seal|charity-watch/i;

const TRACKING_IMAGE_PATTERN = /p\.gif|pixel|tracking/i;

const NEWS_IMAGE_OVERRIDES_BY_PATH: Record<string, string> = {
  "/news/exam-room-podcast/can-your-gut-predict-parkinsons-alzheimers-dr-trisha-pasricha":
    "https://www.pcrm.org/sites/default/files/2026-04/ERP-Alzheimer-Parkinson-Your-Gut.jpeg",
  "/events/power-foods-diet":
    "https://www.pcrm.org/sites/default/files/2026-02/Doc-and-Chef-Program.jpeg",
  "/news/health-nutrition/plant-based-diets-reduce-risk-cancer":
    "https://www.pcrm.org/sites/default/files/plant-based-diet.jpg",
  "/news/health-nutrition/american-heart-association-recommends-plant-based-protein-over-meat":
    "https://www.pcrm.org/sites/default/files/2020-12/plant-based-protein.jpg",
  "/news/news-releases/physicians-committee-offering-grants-farmers-who-are-growing-health-promoting":
    "https://www.pcrm.org/sites/default/files/2024-11/farmer-tangerines.jpg",
  "/news/news-releases/doctors-group-files-legal-petition-urging-usda-require-colorectal-cancer-warning":
    "https://www.pcrm.org/sites/default/files/2026-04/Processed-Meat-Warning-Label.jpg",
  "/news/news-releases/swapping-meat-and-dairy-plant-based-foods-cuts-climate-pollution-35-randomized":
    "https://www.pcrm.org/sites/default/files/2021-04/doctors-climate-change.jpg",
  "/news/innovative-science/patient-derived-brain-organoids-provide-new-insights-autism-spectrum":
    "https://www.pcrm.org/sites/default/files/2026-03/brain-illustration.jpg",
  "/icnm":
    "https://www.pcrm.org/sites/default/files/2023-12/Neal-Barnard-ICNM-2023-Podium.jpg",
  "/events/mission-critical":
    "https://www.pcrm.org/sites/default/files/2023-05/mission-critical.jpeg",
  "/ethical-science/summer-immersion":
    "https://www.pcrm.org/sites/default/files/2025-12/2026-Summer-Immersion.jpg",
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
  const pathOverride = NEWS_IMAGE_OVERRIDES_BY_PATH[path];
  if (pathOverride && isRenderableNewsImage(pathOverride)) {
    return { src: pathOverride, fromSource: true };
  }

  const fromPage = getFirstRenderableNewsImage(images);
  if (fromPage) {
    return { src: fromPage.src, fromSource: true };
  }

  if (externalFallbackImage && isRenderableNewsImage(externalFallbackImage)) {
    return { src: externalFallbackImage, fromSource: true };
  }

  return { src: getNewsPlaceholderImage(path), fromSource: false };
}
