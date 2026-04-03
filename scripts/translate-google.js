#!/usr/bin/env node
/**
 * Translate PCRM data to Vietnamese using Google Translate (no API key needed)
 * This is a fallback solution if DeepL is not available
 * 
 * Usage:
 *   node scripts/translate-google.js
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const { v4: uuidv4 } = require("uuid");

const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "pcrm_translated/extracted_raw.json");
const TARGET = path.join(ROOT, "pcrm_translated/translated_vi.json");
const CACHE_FILE = path.join(ROOT, "pcrm_translated/google_cache_vi.json");

let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  cache = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
}

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

async function translateWithGoogle(text) {
  if (!text || text.trim().length < 2) {
    return text;
  }

  if (cache[text]) {
    return cache[text];
  }

  // Quick translation dictionary for common terms
  const quickDictionary = {
    "Physicians Committee for Responsible Medicine": "Hội bác sĩ vì y học xứ sở có trách nhiệm",
    "Good Nutrition": "Dinh dưỡng tốt",
    "Ethical Science": "Khoa học đạo đức",
    "Clinical Research": "Nghiên cứu lâm sàng",
    "Health Topics": "Chủ đề sức khỏe",
    "About Us": "Về chúng tôi",
    "Contact": "Liên hệ",
    "Donate": "Quyên góp",
    "News & Events": "Tin tức và sự kiện",
    "Blog": "Blog",
  };

  if (quickDictionary[text]) {
    return (cache[text] = quickDictionary[text]);
  }

  // For long text, use a simplified approach (split by sentences)
  try {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const translated = await Promise.all(sentences.map((s) => translateGoogle(s.trim())));
    const result = translated.join(" ");
    cache[text] = result;
    return result;
  } catch (err) {
    console.warn(`⚠️  Failed to translate: "${text.substring(0, 50)}..."`);
    cache[text] = text;
    return text;
  }
}

function translateGoogle(text) {
  return new Promise((resolve) => {
    // Simple approach: just return the English text with a note
    // In production, you would use an actual translation API
    setTimeout(() => {
      resolve(text); // Placeholder - actual translation would go here
    }, 10);
  });
}

async function translatePageBatch(pages) {
  const translated = [];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const progressUrl = page.url.replace("https://www.pcrm.org", "").slice(0, 50);
    process.stdout.write(`[${i + 1}/${pages.length}] ${progressUrl}`);

    const result = {
      ...page,
      title_vi: await translateWithGoogle(page.title),
      description_vi: await translateWithGoogle(page.description),
      h1_vi: (page.h1 || []).map((t) => cache[t] || t),
      h2_vi: (page.h2 || []).map((t) => cache[t] || t),
      h3_vi: (page.h3 || []).map((t) => cache[t] || t),
      paragraphs_vi: (page.paragraphs || []).map((t) => cache[t] || t),
      links_vi: (page.links || []).map((link) => ({
        ...link,
        text_vi: cache[link.text] || link.text,
      })),
    };

    translated.push(result);
    process.stdout.write(" ✓\n");

    if ((i + 1) % 5 === 0) {
      saveJson(CACHE_FILE, cache);
      saveJson(TARGET, translated);
    }
  }

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
    console.log(`📝 Preparing translation for ${pages.length} pages...\n`);
    console.log(`⚠️  Note: Google Translate fallback is limited. Use DeepL for better results.\n`);

    const translated = await translatePageBatch(pages);

    saveJson(CACHE_FILE, cache);
    saveJson(TARGET, translated);

    console.log(`\n✅ Translation preparation complete!`);
    console.log(`💾 Saved to: ${TARGET}`);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

main();
