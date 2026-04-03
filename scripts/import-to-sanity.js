#!/usr/bin/env node
/**
 * Import PCRM crawled data into Sanity CMS
 * Usage: node scripts/import-to-sanity.js
 */

const fs = require("fs");
const path = require("path");
const { createClient } = require("sanity");

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing SANITY_PROJECT_ID or SANITY_API_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: "2024-01-01",
});

const rawDataPath = path.join(__dirname, "../pcrm_translated/extracted_raw.json");
const viDataPath = path.join(__dirname, "../pcrm_translated/translated_vi.json");

async function loadData() {
  const raw = JSON.parse(fs.readFileSync(rawDataPath, "utf8"));
  const vi = fs.existsSync(viDataPath) ? JSON.parse(fs.readFileSync(viDataPath, "utf8")) : [];
  const viMap = new Map(vi.map((page) => [page.url, page]));
  return { raw, viMap };
}

function slugify(text) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isArticlePage(url) {
  return url.includes("/news/");
}

async function importPages(raw, viMap) {
  const pages = raw.filter((p) => !isArticlePage(p.url));
  console.log(`📄 Importing ${pages.length} pages...`);

  for (const page of pages) {
    const viPage = viMap.get(page.url);
    const slug = slugify(page.url.replace("https://www.pcrm.org", ""));

    const doc = {
      _type: "page",
      _id: `page-${slug}`,
      title: page.title,
      slug: { current: slug },
      description: page.description,
      titleVi: viPage?.title_vi || page.title,
      descriptionVi: viPage?.description_vi || page.description,
      content: page.paragraphs.map((p) => ({
        _type: "block",
        _key: Math.random().toString(36),
        children: [{ _type: "span", _key: Math.random().toString(36), text: p }],
        style: "normal",
      })),
      contentVi: (viPage?.paragraphs_vi || page.paragraphs).map((p) => ({
        _type: "block",
        _key: Math.random().toString(36),
        children: [{ _type: "span", _key: Math.random().toString(36), text: p }],
        style: "normal",
      })),
      publishedAt: new Date().toISOString(),
    };

    try {
      await client.createOrReplace(doc);
      console.log(`✓ ${slug}`);
    } catch (err) {
      console.error(`✗ ${slug}: ${err.message}`);
    }
  }
}

async function importArticles(raw, viMap) {
  const articles = raw.filter((p) => isArticlePage(p.url));
  console.log(`\n📰 Importing ${articles.length} articles...`);

  for (const article of articles) {
    const viArticle = viMap.get(article.url);
    const slug = slugify(article.url.replace("https://www.pcrm.org/news/", ""));

    const doc = {
      _type: "article",
      _id: `article-${slug}`,
      title: article.title,
      slug: { current: slug },
      excerpt: article.paragraphs[0] || article.description,
      titleVi: viArticle?.title_vi || article.title,
      excerptVi: (viArticle?.paragraphs_vi?.[0] || article.paragraphs[0]) || article.description,
      content: article.paragraphs.map((p) => ({
        _type: "block",
        _key: Math.random().toString(36),
        children: [{ _type: "span", _key: Math.random().toString(36), text: p }],
        style: "normal",
      })),
      contentVi: (viArticle?.paragraphs_vi || article.paragraphs).map((p) => ({
        _type: "block",
        _key: Math.random().toString(36),
        children: [{ _type: "span", _key: Math.random().toString(36), text: p }],
        style: "normal",
      })),
      publishedAt: new Date().toISOString(),
    };

    try {
      await client.createOrReplace(doc);
      console.log(`✓ ${slug}`);
    } catch (err) {
      console.error(`✗ ${slug}: ${err.message}`);
    }
  }
}

async function main() {
  try {
    const { raw, viMap } = await loadData();
    console.log(`📥 Loaded ${raw.length} pages`);
    console.log(`🌐 Loaded ${viMap.size} Vietnamese translations\n`);

    await importPages(raw, viMap);
    await importArticles(raw, viMap);

    console.log("\n✅ Import completed!");
  } catch (err) {
    console.error("❌ Import failed:", err.message);
    process.exit(1);
  }
}

main();
