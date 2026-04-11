export interface ArticleAuthorReference {
  authorSlug?: string;
  authorId?: string;
}

// Manual mapping for article -> author.
// Key can be article path ("/news/...") or article slug ("plant-based-diets-reduce-risk-cancer").
// Editors can add entries gradually without changing component code.
export const articleAuthorMap: Record<string, ArticleAuthorReference> = {
  "/news/health-nutrition/american-heart-association-recommends-plant-based-protein-over-meat": {
    authorSlug: "anna-herby",
  },
  "/news/health-nutrition/plant-based-diets-reduce-risk-cancer": {
    authorSlug: "xavier-toledo",
  },
  "/news/innovative-science/patient-derived-brain-organoids-provide-new-insights-autism-spectrum": {
    authorSlug: "john-pippin",
  },
  "/news/good-science-digest/human-health-human-science-how-physicians-committee-improving-public": {
    authorSlug: "catharine-e-krebs",
  },
};
