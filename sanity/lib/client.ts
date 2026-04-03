import { createClient } from "sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function getPages() {
  return client.fetch(`*[_type == "page"] | order(publishedAt desc)`);
}

export async function getPageBySlug(slug: string) {
  return client.fetch(`*[_type == "page" && slug.current == $slug][0]`, { slug });
}

export async function getArticles() {
  return client.fetch(`*[_type == "article"] | order(publishedAt desc)`);
}

export async function getArticleBySlug(slug: string) {
  return client.fetch(`*[_type == "article" && slug.current == $slug][0]`, { slug });
}

export async function getArticlesByCategory(category: string) {
  return client.fetch(
    `*[_type == "article" && category->slug.current == $category] | order(publishedAt desc)`,
    { category }
  );
}

export async function getCategories() {
  return client.fetch(`*[_type == "category"] | order(title)`);
}
