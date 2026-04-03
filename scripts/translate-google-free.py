#!/usr/bin/env python3
"""
Translate extracted PCRM data to Vietnamese using public Google Translate endpoint.
Output keeps both EN and VI fields so app can switch language for full content.
"""

import json
import time
from pathlib import Path
from urllib.parse import quote

import requests

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "pcrm_translated" / "extracted_raw.json"
TARGET = ROOT / "pcrm_translated" / "translated_all.json"
CACHE_FILE = ROOT / "pcrm_translated" / "google_free_cache_vi.json"

SESSION = requests.Session()
TIMEOUT = 20
SLEEP_SEC = 0.08


def load_json(path: Path, default):
    if path.exists():
        return json.loads(path.read_text(encoding="utf-8"))
    return default


def save_json(path: Path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def translate_text(text: str, cache: dict) -> str:
    if not text or len(text.strip()) < 2:
        return text

    key = text.strip()
    if key in cache:
        return cache[key]

    try:
        url = (
            "https://translate.googleapis.com/translate_a/single"
            f"?client=gtx&sl=en&tl=vi&dt=t&q={quote(key)}"
        )
        resp = SESSION.get(url, timeout=TIMEOUT)
        resp.raise_for_status()
        payload = resp.json()
        translated = "".join(part[0] for part in payload[0] if part and part[0])
        if not translated:
            translated = key
        cache[key] = translated
        time.sleep(SLEEP_SEC)
        return translated
    except Exception:
        cache[key] = key
        return key


def translate_list(values, cache):
    return [translate_text(v, cache) for v in (values or [])]


def main():
    pages = load_json(SOURCE, [])
    if not pages:
        raise SystemExit(f"No source data found: {SOURCE}")

    cache = load_json(CACHE_FILE, {})

    translated_pages = []
    total = len(pages)

    for idx, page in enumerate(pages, start=1):
        url = page.get("url", "")
        print(f"[{idx}/{total}] Translating {url}")

        translated_page = {
            **page,
            "title_en": page.get("title", ""),
            "title_vi": translate_text(page.get("title", ""), cache),
            "description_en": page.get("description", ""),
            "description_vi": translate_text(page.get("description", ""), cache),
            "h1_en": page.get("h1", []),
            "h1_vi": translate_list(page.get("h1", []), cache),
            "h2_en": page.get("h2", []),
            "h2_vi": translate_list(page.get("h2", []), cache),
            "h3_en": page.get("h3", []),
            "h3_vi": translate_list(page.get("h3", []), cache),
            "paragraphs_en": page.get("paragraphs", []),
            "paragraphs_vi": translate_list(page.get("paragraphs", []), cache),
            "links_vi": [
                {
                    **link,
                    "text_vi": translate_text(link.get("text", ""), cache),
                }
                for link in page.get("links", [])
            ],
        }

        translated_pages.append(translated_page)

        if idx % 5 == 0:
            save_json(CACHE_FILE, cache)
            save_json(TARGET, translated_pages)

    save_json(CACHE_FILE, cache)
    save_json(TARGET, translated_pages)

    print("\nDone")
    print(f"Pages: {len(translated_pages)}")
    print(f"Cache entries: {len(cache)}")
    print(f"Saved: {TARGET}")


if __name__ == "__main__":
    main()
