import { articleAuthorMap, type ArticleAuthorReference } from "@/data/article-author-map";
import { authors, type AuthorProfile } from "@/data/authors";
import { type Language } from "@/lib/translations";

type AuthorLocalizedOverrides = Partial<
  Pick<
    AuthorProfile,
    "headline" | "shortBio" | "specialty" | "professionalFocus" | "keyCareerMilestones"
  >
>;

const AUTHOR_EN_OVERRIDES_BY_SLUG: Record<string, AuthorLocalizedOverrides> = {
  "neal-barnard": {
    headline: "Internist, nutrition researcher, and PCRM president",
    shortBio:
      "Neal Barnard is a physician and nutrition researcher, serving as President of the Physicians Committee for Responsible Medicine and Adjunct Professor of Medicine at the George Washington University School of Medicine. His work focuses on preventive medicine, plant-based nutrition, and higher ethical standards in research.",
    specialty: "Internal medicine, clinical nutrition, preventive medicine",
    professionalFocus:
      "Preventive medicine, plant-based nutrition, medical policy, and ethical research standards",
    keyCareerMilestones: [
      "Practiced at St. Vincent's Hospital in New York",
      "Founded the Physicians Committee",
      "Founded Barnard Medical Center in Washington, DC, in 2016",
    ],
  },
  "hana-kahleova": {
    headline: "Physician and clinical researcher in nutrition and metabolism",
    shortBio:
      "Hana Kahleova is the Director of Clinical Research at PCRM. Her work focuses on how food choices influence insulin resistance, metabolic health, and healthy weight regulation.",
    specialty: "Clinical research, nutrition, diabetes, metabolism",
    professionalFocus:
      "Clinical research on plant-based diets, metabolism, insulin, and healthy weight management",
    keyCareerMilestones: [
      "Analyzed data from 50,000 participants in Adventist Health Study-2 at Loma Linda University",
      "Published more than a dozen nutrition studies",
    ],
  },
  "amy-lanou": {
    headline: "Nutrition scientist and professor of health and wellness",
    shortBio:
      "Amy Lanou is a Senior Nutrition Scientist at PCRM, a professor of health and wellness at UNC Asheville, and editor in chief of PlantPure Magazine. She studies the relationship between plant-based diets and chronic disease risk.",
    specialty: "Nutrition, bone health, health communication, nutrition policy",
    professionalFocus:
      "Plant-based nutrition, chronic disease risk reduction, and nutrition education",
    keyCareerMilestones: [
      "Former nutrition director at PCRM for five years",
      "Professor at UNC Asheville",
      "Previously taught at Ithaca College and Cornell University",
    ],
  },
  "janine-mccarthy": {
    headline: "Research policy specialist and ethical science advocate",
    shortBio:
      "Janine McCarthy is Acting Director of Research Policy at PCRM. She focuses on research integrity, policy transition away from animal experimentation, and human-specific, nonanimal research methods.",
  },
  "roxanne-becker": {
    headline: "Medical editor and lifestyle medicine educator",
    shortBio:
      "Roxanne Becker is a Medical Editor and Educator at PCRM. She earned her medical degree at the University of Cape Town and holds a diploma in Lifestyle Medicine and certification in plant-based nutrition.",
    specialty: "Medicine, lifestyle medicine, nutrition education, medical editing",
    professionalFocus:
      "Medical education on plant-based nutrition and lifestyle medicine, plus medical content editing",
    keyCareerMilestones: [
      "Worked in South Africa's public healthcare sector for three years",
      "Completed a medical elective at Barnard Medical Center during final-year medical training",
      "Returned later to help educate the next generation of medical students",
    ],
  },
  "anna-herby": {
    headline: "Nutrition education specialist focused on chronic disease prevention",
    shortBio:
      "Anna Herby is a Nutrition Education Specialist at PCRM. She focuses on plant-based nutrition education, public health communication, and practical guidance for people living with chronic conditions.",
    specialty: "Nutrition education, diabetes care, applied plant-based nutrition",
    professionalFocus:
      "Developing and communicating evidence-based nutrition content and supporting healthy dietary behavior change",
    keyCareerMilestones: [
      "Joined PCRM's nutrition education team",
      "Co-led webinars in the National Diabetes Program",
    ],
  },
  "xavier-toledo": {
    headline: "Practical nutrition specialist and health educator",
    shortBio:
      "Xavier Toledo is a nutrition educator at PCRM, contributing practical plant-based nutrition guidance and public-facing health education content.",
    specialty: "Practical clinical nutrition, health education, plant-based nutrition",
    professionalFocus:
      "Guiding plant-based food choices, improving meal quality, and supporting dietary behavior change",
    keyCareerMilestones: [
      "Joined PCRM's nutrition team",
      "Contributed content to health and nutrition news features",
    ],
  },
  "john-pippin": {
    headline: "Cardiologist and academic leader in human-relevant science",
    shortBio:
      "John Pippin is a cardiologist and Director of Academic Affairs at PCRM. His work centers on ethical science, reducing reliance on animal models, and advancing human-relevant research methods.",
    specialty: "Cardiology, ethical science, research policy, human-based research",
    professionalFocus:
      "Advancing human-relevant research methods, improving biomedical evidence quality, and academic education",
    keyCareerMilestones: [
      "Served as Director of Academic Affairs at PCRM",
      "Co-authored book-chapter work on limitations of animal-based Alzheimer's research and the need for human-relevant methods",
    ],
  },
  "catharine-e-krebs": {
    headline: "Scientist focused on human-relevant biomedical research",
    shortBio:
      "Catharine E. Krebs is part of PCRM's science team, focusing on human-based research approaches, ethical science, and improving the real-world applicability of biomedical evidence.",
    specialty: "Life sciences, ethical science, human-based research",
    professionalFocus:
      "Analyzing and communicating human-relevant research approaches across biomedical and public health topics",
    keyCareerMilestones: [
      "Joined PCRM's innovative science team",
      "Contributed topic content across Good Science Digest and ethical science themes",
    ],
  },
};

function localizeAuthor(author: AuthorProfile, language: Language): AuthorProfile {
  if (language !== "en") {
    return author;
  }

  const overrides = AUTHOR_EN_OVERRIDES_BY_SLUG[author.slug];
  if (!overrides) {
    return author;
  }

  return {
    ...author,
    ...overrides,
  };
}

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

export function getAuthors(language: Language = "vi"): AuthorProfile[] {
  return authors.map((author) => localizeAuthor(author, language)).sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }

    if (a.sortOrder !== b.sortOrder) {
      return a.sortOrder - b.sortOrder;
    }

    return a.displayName.localeCompare(b.displayName, "en");
  });
}

export function getAuthorBySlug(slug: string, language: Language = "vi"): AuthorProfile | undefined {
  const key = slug.trim().toLowerCase();
  const author = authors.find((item) => item.slug.toLowerCase() === key);
  return author ? localizeAuthor(author, language) : undefined;
}

export function getAuthorById(id: string, language: Language = "vi"): AuthorProfile | undefined {
  const key = id.trim().toLowerCase();
  const author = authors.find((item) => item.id.toLowerCase() === key);
  return author ? localizeAuthor(author, language) : undefined;
}

function resolveAuthorReference(reference: ArticleAuthorReference, language: Language): AuthorProfile | undefined {
  if (reference.authorSlug) {
    const bySlug = getAuthorBySlug(reference.authorSlug, language);
    if (bySlug) {
      return bySlug;
    }
  }

  if (reference.authorId) {
    return getAuthorById(reference.authorId, language);
  }

  return undefined;
}

export function getAuthorForArticlePath(path: string, language: Language = "vi"): AuthorProfile | undefined {
  const normalizedPath = normalizeArticleKey(path);
  const articleSlug = articleSlugFromPath(normalizedPath);

  const pathReference = articleAuthorMap[normalizedPath];
  if (pathReference) {
    const byPath = resolveAuthorReference(pathReference, language);
    if (byPath) {
      return byPath;
    }
  }

  const slugReference = articleAuthorMap[articleSlug];
  if (slugReference) {
    const bySlugMap = resolveAuthorReference(slugReference, language);
    if (bySlugMap) {
      return bySlugMap;
    }
  }

  const matched = authors.find((author) => author.relatedArticleSlugs.includes(articleSlug));
  return matched ? localizeAuthor(matched, language) : undefined;
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
