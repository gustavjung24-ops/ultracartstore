#!/usr/bin/env node
/**
 * Translate PCRM data to Vietnamese using DeepL API
 * 
 * Setup:
 *   1. Sign up at https://www.deepl.com (free plan available)
 *   2. Get your API key from https://www.deepl.com/account
 *   3. Set DEEPL_API_KEY environment variable
 *
 * Usage:
 *   DEEPL_API_KEY=your_key node scripts/translate-deepl.js
 */

const fs = require("fs");
const path = require("path");
const { Translator } = require("deepl-node");

const apiKey = process.env.DEEPL_API_KEY;

if (!apiKey) {
  console.error("❌ DEEPL_API_KEY not set!");
  console.error("   Get your key from: https://www.deepl.com/account");
  process.exit(1);
}

const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "pcrm_translated/extracted_raw.json");
const TARGET = path.join(ROOT, "pcrm_translated/translated_vi.json");
const CACHE_FILE = path.join(ROOT, "pcrm_translated/deepl_cache_vi.json");

const translator = new Translator(apiKey);
const cache = fs.existsSync(CACHE_FILE) ? JSON.parse(fs.readFileSync(CACHE_FILE)) : {};

function loadJson(filePath) {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  }
  return [];
}

function saveJson(filePath, data) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

async function translateText(text) {
  if (!text || text.trim().length < 2) {
    return text;
  }

  // Check cache
  if (cache[text]) {
    return cache[text];
  }

  try {
    const result = await translator.translateText(text, "en", "VI");
    const translated = typeof result === "string" ? result : result.text;
    cache[text] = translated;
    return translated;
  } catch (err) {
    console.warn(`⚠️  Failed to translate: "${text.substring(0, 50)}..."`);
    cache[text] = text;
    return text;
  }
}

async function translatePage(page, index, total) {
  const progressUrl = page.url.replace("https://www.pcrm.org", "").slice(0, 50);
  process.stdout.write(`[${index}/${total}] ${progressUrl}`);

  const translated = {
    ...page,
    title_vi: await translateText(page.title),
    description_vi: await translateText(page.description),
    h1_vi: await Promise.all((page.h1 || []).map(translateText)),
    h2_vi: await Promise.all((page.h2 || []).map(translateText)),
    h3_vi: await Promise.all((page.h3 || []).map(translateText)),
    paragraphs_vi: await Promise.all((page.paragraphs || []).map(translateText)),
    links_vi: await Promise.all(
      (page.links || []).map(async (link) => ({
        ...link,
        text_vi: await translateText(link.text),
      }))
    ),
  };

  process.stdout.write(" ✓\n");
  return translated;
}

async function main() {
  try {
    const pages = loadJson(SOURCE);
    if (pages.length === 0) {
      console.error("❌ No pages found in", SOURCE);
      process.exit(1);
    }

    console.log(`📊 Cache size: ${Object.keys(cache).length} entries`);
    console.log(`📝 Translating ${pages.length} pages to Vietnamese...\n`);

    const translated = [];
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const result = await translatePage(page, i + 1, pages.length);
      translated.push(result);

      // Save every 5 pages
      if ((i + 1) % 5 === 0) {
        saveJson(CACHE_FILE, cache);
        saveJson(TARGET, translated);
      }
    }

    // Save final results
    saveJson(CACHE_FILE, cache);
    saveJson(TARGET, translated);

    console.log(`\n✅ Translation complete!`);
    console.log(`💾 Saved to: ${TARGET}`);
    console.log(`📦 Cache: ${path.basename(CACHE_FILE)}`);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

main();
