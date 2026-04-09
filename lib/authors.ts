export type AuthorStatus = "draft" | "review" | "published";

export type AuthorExternalLink = {
  label: string;
  url: string;
};

export type AuthorSocialLink = {
  platform: string;
  url: string;
};

export type AuthorProfile = {
  id: string;
  slug: string;
  fullName: string;
  displayName: string;
  avatar: string | null;
  coverImage: string | null;
  headline: string;
  shortBio: string;
  degrees: string[];
  specialty: string[];
  currentRole: string;
  currentOrganization: string;
  professionalFocus: string[];
  researchInterests: string[];
  education: string[];
  certifications: string[];
  awards: string[];
  keyCareerMilestones: string[];
  notableWorks: string[];
  books: string[];
  podcasts: string[];
  talks: string[];
  majorActivities: string[];
  publicationList: string[];
  authorThemes: string[];
  whyThisAuthorWritesThisTopic: string;
  relatedArticleSlugs: string[];
  profileSourceLinks: AuthorExternalLink[];
  externalLinks: AuthorExternalLink[];
  socialLinks: AuthorSocialLink[];
  featured: boolean;
  sortOrder: number;
  status: AuthorStatus;
  lastReviewedAt: string | null;
};

// Editorial source of truth. Keep empty until profiles are manually verified and entered.
export const AUTHOR_PROFILES: AuthorProfile[] = [];

function normalizeKey(value: string): string {
  return value.trim().toLowerCase();
}

function normalizeArticlePath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed) {
    return "";
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeadingSlash.replace(/\/+$/g, "");
}

function toArticleKeys(rawValue: string): string[] {
  const value = rawValue.trim();
  if (!value) {
    return [];
  }

  const normalized = normalizeArticlePath(value);
  const keys = new Set<string>();

  if (normalized) {
    keys.add(normalizeKey(normalized));

    const segments = normalized.split("/").filter(Boolean);
    if (segments.length > 0) {
      keys.add(normalizeKey(segments[segments.length - 1]));
    }
  }

  if (!normalized.startsWith("/news/") && normalized) {
    keys.add(normalizeKey(`/news/${normalized.replace(/^\/+/, "")}`));
  }

  return [...keys];
}

function sortAuthors(authors: AuthorProfile[]): AuthorProfile[] {
  return [...authors].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }

    if (a.sortOrder !== b.sortOrder) {
      return a.sortOrder - b.sortOrder;
    }

    return a.displayName.localeCompare(b.displayName);
  });
}

function buildArticleAuthorMap(authors: AuthorProfile[]): Map<string, AuthorProfile> {
  const map = new Map<string, AuthorProfile>();

  for (const author of authors) {
    for (const relatedSlug of author.relatedArticleSlugs) {
      for (const key of toArticleKeys(relatedSlug)) {
        if (!map.has(key)) {
          map.set(key, author);
        }
      }
    }
  }

  return map;
}

function isPublished(author: AuthorProfile): boolean {
  return author.status === "published";
}

const publishedAuthors = sortAuthors(AUTHOR_PROFILES.filter(isPublished));
const publishedAuthorBySlug = new Map<string, AuthorProfile>(
  publishedAuthors.map((author) => [author.slug, author]),
);
const articleAuthorMap = buildArticleAuthorMap(publishedAuthors);

export function getPublishedAuthors(): AuthorProfile[] {
  return publishedAuthors;
}

export function getPublishedAuthorBySlug(slug: string): AuthorProfile | undefined {
  return publishedAuthorBySlug.get(slug);
}

export function getAuthorByArticlePath(articlePath: string): AuthorProfile | undefined {
  const normalizedPath = normalizeArticlePath(articlePath);
  const keyCandidates = new Set<string>();

  keyCandidates.add(normalizeKey(normalizedPath));

  const pathSegments = normalizedPath.split("/").filter(Boolean);
  if (pathSegments.length > 0) {
    keyCandidates.add(normalizeKey(pathSegments[pathSegments.length - 1]));
  }

  for (const key of keyCandidates) {
    const author = articleAuthorMap.get(key);
    if (author) {
      return author;
    }
  }

  return undefined;
}
