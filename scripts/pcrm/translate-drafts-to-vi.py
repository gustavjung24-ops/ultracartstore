#!/usr/bin/env python3
"""
Translate PCRM mirror draft titles and excerpts from EN to VI using Google Translate API.
"""

import json
import sys
import time
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import requests

from scripts.pcrm.config import MIRROR_DIR
from scripts.pcrm.common import save_json, load_json, clean_text, now_iso

IN_DRAFTS = MIRROR_DIR / "import_drafts.json"
OUT_DRAFTS = MIRROR_DIR / "import_drafts.json"
CACHE_FILE = MIRROR_DIR / "translate_vi_cache.json"

SESSION = requests.Session()
TIMEOUT = 20
SLEEP_SEC = 0.08


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
        
        translated = ""
        if payload and isinstance(payload, list) and len(payload) > 0:
            translated_parts = []
            for part in payload[0]:
                if isinstance(part, list) and len(part) > 0:
                    translated_parts.append(str(part[0]))
            translated = "".join(translated_parts)
        
        if translated:
            cache[key] = translated
            return translated
        return text
    except Exception as e:
        print(f"[warn] translate error for '{key[:40]}...': {e}")
        return text
    finally:
        time.sleep(SLEEP_SEC)


def run() -> None:
    cache = load_json(CACHE_FILE, {})
    payload = load_json(IN_DRAFTS, {})
    items = payload.get("items", []) if isinstance(payload, dict) else []

    print(f"[info] translating {len(items)} items...")
    translated_count = 0
    
    for item in items:
        if not isinstance(item, dict):
            continue
        
        source_title_en = clean_text(str(item.get("sourceTitleEn", "")))
        excerpt_en = clean_text(str(item.get("excerptEn", "")))
        
        if source_title_en and not item.get("titleVi"):
            title_vi = translate_text(source_title_en, cache)
            item["titleVi"] = title_vi
            translated_count += 1
        
        if excerpt_en and not item.get("excerptVi"):
            excerpt_vi = translate_text(excerpt_en, cache)
            item["excerptVi"] = excerpt_vi
            item["summaryVi"] = excerpt_vi
            translated_count += 1
    
    save_json(CACHE_FILE, cache)
    
    payload["items"] = items
    payload["translatedAt"] = now_iso()
    save_json(OUT_DRAFTS, payload)
    
    print(f"[ok] translated {translated_count} fields")
    print(f"[ok] wrote {OUT_DRAFTS}")
    print(f"[ok] cache saved to {CACHE_FILE}")


if __name__ == "__main__":
    run()
