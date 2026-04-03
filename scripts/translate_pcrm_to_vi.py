#!/usr/bin/env python3
"""Translate extracted PCRM pages to Vietnamese with cache.

Usage:
  python3 scripts/translate_pcrm_to_vi.py
"""

from __future__ import annotations

import json
import os
import time
from pathlib import Path

from googletrans import Translator

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "pcrm_translated" / "extracted_raw.json"
TARGET = ROOT / "pcrm_translated" / "translated_vi.json"
CACHE_PATH = ROOT / "pcrm_translated" / "translate_cache_vi.json"

translator = Translator()


def load_json(path: Path, default):
    if path.exists():
        with path.open("r", encoding="utf-8") as f:
            return json.load(f)
    return default


def save_json(path: Path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def tr(text: str, cache: dict[str, str]) -> str:
    s = (text or "").strip()
    if not s:
        return text
    if s in cache:
        return cache[s]

    # keep short tokens and urls untouched
    if len(s) <= 2 or s.startswith("http"):
        cache[s] = s
        return s

    for _ in range(3):
        try:
            translated = translator.translate(s, dest="vi").text
            cache[s] = translated
            return translated
        except Exception:
            time.sleep(0.7)

    cache[s] = s
    return s


def translate_page(page: dict, cache: dict[str, str]) -> dict:
    return {
        **page,
        "title_vi": tr(page.get("title", ""), cache),
        "description_vi": tr(page.get("description", ""), cache),
        "h1_vi": [tr(x, cache) for x in page.get("h1", [])],
        "h2_vi": [tr(x, cache) for x in page.get("h2", [])],
        "h3_vi": [tr(x, cache) for x in page.get("h3", [])],
        "paragraphs_vi": [tr(x, cache) for x in page.get("paragraphs", [])],
        "links_vi": [
            {
                **link,
                "text_vi": tr(link.get("text", ""), cache),
            }
            for link in page.get("links", [])
        ],
    }


def main() -> None:
    pages = load_json(SOURCE, [])
    cache = load_json(CACHE_PATH, {})

    translated_pages = []
    total = len(pages)

    for index, page in enumerate(pages, start=1):
        print(f"[{index}/{total}] {page.get('url', '')}")
        translated_pages.append(translate_page(page, cache))
        if index % 5 == 0:
            save_json(CACHE_PATH, cache)
            save_json(TARGET, translated_pages)

    save_json(CACHE_PATH, cache)
    save_json(TARGET, translated_pages)

    print("Done:", TARGET)
    print("Cache size:", len(cache))


if __name__ == "__main__":
    main()
