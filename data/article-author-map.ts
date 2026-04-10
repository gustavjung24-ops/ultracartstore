export interface ArticleAuthorReference {
  authorSlug?: string;
  authorId?: string;
}

// Manual mapping for article -> author.
// Key can be article path ("/news/...") or article slug ("plant-based-diets-reduce-risk-cancer").
// Editors can add entries gradually without changing component code.
export const articleAuthorMap: Record<string, ArticleAuthorReference> = {};
