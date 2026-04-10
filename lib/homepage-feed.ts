import {
  getBlogPages,
  getLocalizedPcrmPageContent,
  getPcrmPageByPath,
  type PcrmResolvedPage,
} from "@/lib/pcrm-content";
import { getCleanNewsSummary, isNewsArticlePath, isNoisyNewsSummaryLine } from "@/lib/news-summary";
import { resolveNewsImage, isRenderableNewsImage } from "@/lib/news-media";

type Language = "en" | "vi";

export interface HomepageStory {
  id: string;
  path: string;
  title: string;
  summary: string;
  label: string;
  href: string;
  internal: boolean;
  imageSrc: string;
  sourceHasImage: boolean;
  sourceAvailableLocally: boolean;
}

export interface HomepageTopicHighlight {
  id: string;
  href: string;
  title: string;
  summary: string;
  stories: HomepageStory[];
}

export interface HomepageFeed {
  featuredNews: HomepageStory[];
  newsEventsLead: HomepageStory | null;
  topPromotedStories: HomepageStory[];
  topicHighlights: HomepageTopicHighlight[];
  latestNews: HomepageStory[];
}

interface HomepageStorySpec {
  id: string;
  path: string;
  label: string;
  fallbackTitle: string;
  fallbackSummary?: string;
  imageIndex?: number;
}

interface BuildHomepageFeedOptions {
  lang: Language;
  healthNutritionTitle: string;
  innovativeScienceTitle: string;
  innovativeScienceSummary: string;
  goodScienceTitle: string;
  goodScienceSummary: string;
}

const BASE_URL = "https://www.pcrm.org";

const FEATURED_NEWS_SPECS: HomepageStorySpec[] = [
  {
    id: "featured-farmer-grants",
    path: "/news/news-releases/physicians-committee-offering-grants-farmers-who-are-growing-health-promoting",
    label: "News Release",
    fallbackTitle:
      "Physicians Committee Is Offering Grants to Farmers Who Are Growing Health-Promoting Fruits and Veggies While Phasing Out Animal Agriculture",
    imageIndex: 0,
  },
  {
    id: "featured-exam-room-gut",
    path: "/news/exam-room-podcast/can-your-gut-predict-parkinsons-alzheimers-dr-trisha-pasricha",
    label: "Exam Room Podcast",
    fallbackTitle: "Can Your Gut Predict Parkinson’s & Alzheimer’s? | Dr. Trisha Pasricha",
    imageIndex: 1,
  },
  {
    id: "featured-processed-meat-warning",
    path: "/news/news-releases/doctors-group-files-legal-petition-urging-usda-require-colorectal-cancer-warning",
    label: "News Release",
    fallbackTitle:
      "Doctors Group Files Legal Petition Urging USDA to Require Colorectal Cancer Warning Labels on Processed Meat",
    imageIndex: 2,
  },
];

const NEWS_EVENTS_LEAD_SPEC: HomepageStorySpec = {
  id: "lead-power-foods-diet",
  path: "/events/power-foods-diet",
  label: "Event",
  fallbackTitle: "Doc and Chef Presents The Power Foods Diet",
  fallbackSummary:
    "Transform the way you eat with evidence-based medical guidance and practical kitchen skills.",
  imageIndex: 3,
};

const TOP_PROMOTED_STORY_SPECS: HomepageStorySpec[] = [
  {
    id: "promoted-cancer-risk",
    path: "/news/health-nutrition/plant-based-diets-reduce-risk-cancer",
    label: "Health and Nutrition News",
    fallbackTitle: "Plant-Based Diets Reduce the Risk of Cancer",
    imageIndex: 4,
  },
  {
    id: "promoted-heart-association",
    path: "/news/health-nutrition/american-heart-association-recommends-plant-based-protein-over-meat",
    label: "Health and Nutrition News",
    fallbackTitle: "American Heart Association Recommends Plant-Based Protein Over Meat",
    imageIndex: 5,
  },
  {
    id: "promoted-brain-organoids",
    path: "/news/innovative-science/patient-derived-brain-organoids-provide-new-insights-autism-spectrum",
    label: "Innovative Science News",
    fallbackTitle: "Patient-Derived Brain Organoids Provide New Insights Into Autism Spectrum Disorders",
    imageIndex: 6,
  },
  {
    id: "promoted-icnm",
    path: "/icnm",
    label: "Resource",
    fallbackTitle: "International Conference on Nutrition in Medicine August 13-15, 2026",
    imageIndex: 7,
  },
  {
    id: "promoted-mission-critical",
    path: "/events/mission-critical",
    label: "Event",
    fallbackTitle: "Mission Critical With Neal Barnard, MD",
    imageIndex: 8,
  },
  {
    id: "promoted-summer-immersion",
    path: "/ethical-science/summer-immersion",
    label: "Resource",
    fallbackTitle: "2026 Summer Immersion on Innovative Approaches in Science",
    imageIndex: 9,
  },
];

function toAbsolutePcrmUrl(path: string): string {
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function isMeaningfulSummary(summary: string, title: string, lang: Language): boolean {
  const normalizedSummary = summary.trim();
  const normalizedTitle = title.trim();

  if (!normalizedSummary || normalizedSummary === normalizedTitle) {
    return false;
  }

  return !isNoisyNewsSummaryLine(normalizedSummary, lang);
}

function getHomepageFallbackImages(): string[] {
  const home = getPcrmPageByPath("/");
  if (!home) {
    return [];
  }

  return home.images.filter((image) => isRenderableNewsImage(image.src)).map((image) => image.src);
}

function buildStoryFromSpec(
  spec: HomepageStorySpec,
  lang: Language,
  fallbackImages: string[],
): HomepageStory {
  const page = getPcrmPageByPath(spec.path);
  const localized = page ? getLocalizedPcrmPageContent(page, lang) : undefined;
  const fallbackImage = typeof spec.imageIndex === "number" ? fallbackImages[spec.imageIndex] : undefined;
  const resolvedImage = resolveNewsImage(spec.path, page?.images ?? [], fallbackImage);
  const localizedTitle = localized?.title;
  const localizedSummary = localized ? getCleanNewsSummary(localized, lang) : undefined;

  const title = localizedTitle && localizedTitle.trim() ? localizedTitle : spec.fallbackTitle;
  const summary =
    localizedSummary && isMeaningfulSummary(localizedSummary, title, lang)
      ? localizedSummary
      : spec.fallbackSummary || spec.fallbackTitle;

  return {
    id: spec.id,
    path: spec.path,
    title,
    summary,
    label: spec.label,
    href: page ? page.path : toAbsolutePcrmUrl(spec.path),
    internal: Boolean(page),
    imageSrc: resolvedImage.src,
    sourceHasImage: resolvedImage.fromSource,
    sourceAvailableLocally: Boolean(page),
  };
}

function getDigestStories(lang: Language): HomepageStory[] {
  const digestHub = getPcrmPageByPath("/news/good-science-digest");
  if (!digestHub) {
    return [];
  }

  const digestLinks = digestHub.links
    .map((link) => {
      try {
        const parsed = new URL(link.url);
        return {
          path: parsed.pathname,
          text: link.text,
        };
      } catch {
        return {
          path: "",
          text: link.text,
        };
      }
    })
    .filter((item, index, arr) => {
      if (!item.path.startsWith("/news/good-science-digest/")) {
        return false;
      }

      return arr.findIndex((candidate) => candidate.path === item.path) === index;
    })
    .slice(0, 2);

  const digestFallbackImages = digestHub.images
    .filter((image) => isRenderableNewsImage(image.src))
    .map((image) => image.src);

  return digestLinks.map((item, index) =>
    buildStoryFromSpec(
      {
        id: `digest-${index}`,
        path: item.path,
        label: "Good Science Digest",
        fallbackTitle: item.text || "Good Science Digest",
        imageIndex: index,
      },
      lang,
      digestFallbackImages,
    ),
  );
}

function toLatestNewsStories(lang: Language): HomepageStory[] {
  const posts = getBlogPages().filter((post) => isNewsArticlePath(post.path)).slice(0, 6) as PcrmResolvedPage[];

  return posts.map((post, index) => {
    const localized = getLocalizedPcrmPageContent(post, lang);
    const resolvedImage = resolveNewsImage(post.path, post.images);

    return {
      id: `latest-${index}-${post.path}`,
      path: post.path,
      title: localized.title,
      summary: getCleanNewsSummary(localized, lang),
      label: post.path.includes("/news/news-releases/")
        ? "News Release"
        : post.path.includes("/news/health-nutrition/")
          ? "Health and Nutrition News"
          : "News",
      href: post.path,
      internal: true,
      imageSrc: resolvedImage.src,
      sourceHasImage: resolvedImage.fromSource,
      sourceAvailableLocally: true,
    };
  });
}

export function buildHomepageFeed(options: BuildHomepageFeedOptions): HomepageFeed {
  const { lang } = options;
  const fallbackImages = getHomepageFallbackImages();
  const featuredNews = FEATURED_NEWS_SPECS.map((spec) => buildStoryFromSpec(spec, lang, fallbackImages));
  const newsEventsLead = buildStoryFromSpec(NEWS_EVENTS_LEAD_SPEC, lang, fallbackImages);
  const topPromotedStories = TOP_PROMOTED_STORY_SPECS.map((spec) =>
    buildStoryFromSpec(spec, lang, fallbackImages),
  );

  const healthStories = topPromotedStories.filter((story) =>
    story.path.includes("/news/health-nutrition/"),
  );
  const innovativeStories = topPromotedStories.filter((story) =>
    story.path.includes("/news/innovative-science/"),
  );
  const digestStories = getDigestStories(lang);

  const topicHighlights: HomepageTopicHighlight[] = [
    {
      id: "health-nutrition",
      href: "/news/health-nutrition",
      title: options.healthNutritionTitle,
      summary: healthStories[0]?.summary || options.healthNutritionTitle,
      stories: healthStories.slice(0, 2),
    },
    {
      id: "innovative-science",
      href: "/news/innovative-science-news",
      title: options.innovativeScienceTitle,
      summary: innovativeStories[0]?.summary || options.innovativeScienceSummary,
      stories: innovativeStories.slice(0, 2),
    },
    {
      id: "good-science-digest",
      href: "/news/good-science-digest",
      title: options.goodScienceTitle,
      summary: digestStories[0]?.summary || options.goodScienceSummary,
      stories: digestStories,
    },
  ];

  return {
    featuredNews,
    newsEventsLead,
    topPromotedStories,
    topicHighlights,
    latestNews: toLatestNewsStories(lang),
  };
}
