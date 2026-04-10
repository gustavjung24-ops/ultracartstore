import { articleAuthorMap, type ArticleAuthorReference } from "@/data/article-author-map";
import { authors, type AuthorProfile } from "@/data/authors";

function normalizeArticleKey(value: string): string {
  return value.trim().replace(/\/+$/g, "");
}

function articleSlugFromPath(path: string): string {
  return normalizeArticleKey(path)
    .split("/")
    .filter(Boolean)
    .pop() || "";
}

export function getAuthorProfileHref(author: Pick<AuthorProfile, "slug">): string {
  return `/authors/${author.slug}`;
}

export function getAuthors(): AuthorProfile[] {
  return [...authors].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }

    if (a.sortOrder !== b.sortOrder) {
      return a.sortOrder - b.sortOrder;
    }

    return a.displayName.localeCompare(b.displayName, "en");
  });
}

export function getAuthorBySlug(slug: string): AuthorProfile | undefined {
  const key = slug.trim().toLowerCase();
  return authors.find((author) => author.slug.toLowerCase() === key);
}

export function getAuthorById(id: string): AuthorProfile | undefined {
  const key = id.trim().toLowerCase();
  return authors.find((author) => author.id.toLowerCase() === key);
}

function resolveAuthorReference(reference: ArticleAuthorReference): AuthorProfile | undefined {
  if (reference.authorSlug) {
    const bySlug = getAuthorBySlug(reference.authorSlug);
    if (bySlug) {
      return bySlug;
    }
  }

  if (reference.authorId) {
    return getAuthorById(reference.authorId);
  }

  return undefined;
}

export function getAuthorForArticlePath(path: string): AuthorProfile | undefined {
  const normalizedPath = normalizeArticleKey(path);
  const articleSlug = articleSlugFromPath(normalizedPath);

  const pathReference = articleAuthorMap[normalizedPath];
  if (pathReference) {
    const byPath = resolveAuthorReference(pathReference);
    if (byPath) {
      return byPath;
    }
  }

  const slugReference = articleAuthorMap[articleSlug];
  if (slugReference) {
    const bySlugMap = resolveAuthorReference(slugReference);
    if (bySlugMap) {
      return bySlugMap;
    }
  }

  return authors.find((author) => author.relatedArticleSlugs.includes(articleSlug));
}

export function getAuthorInitials(displayName: string): string {
  const words = displayName
    .split(" ")
    .map((word) => word.trim())
    .filter(Boolean);

  if (words.length === 0) {
    return "AU";
  }

  const initials = words.slice(0, 2).map((word) => word[0]?.toUpperCase() || "");
  return initials.join("");
}
