#!/usr/bin/env python3
"""
Merge Vietnamese translations back into import drafts after rebuilding.
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from scripts.pcrm.common import save_json, load_json, now_iso, normalize_url
from scripts.pcrm.config import MIRROR_DIR

IN_TRANSLATED = MIRROR_DIR / "translate_vi_cache.json"
IN_DRAFTS = MIRROR_DIR / "import_drafts.json"
OUT_DRAFTS = MIRROR_DIR / "import_drafts.json"


def run() -> None:
    cache = load_json(IN_TRANSLATED, {})
    payload = load_json(IN_DRAFTS, {})
    items = payload.get("items", []) if isinstance(payload, dict) else []

    merged_count = 0
    for item in items:
        if not isinstance(item, dict):
            continue

        source_title_en = str(item.get("sourceTitleEn", "")).strip()
        excerpt_en = str(item.get("excerptEn", "")).strip()

        if source_title_en in cache and not item.get("titleVi"):
            item["titleVi"] = cache[source_title_en]
            merged_count += 1

        if excerpt_en in cache and not item.get("excerptVi"):
            item["excerptVi"] = cache[excerpt_en]
            item["summaryVi"] = cache[excerpt_en]
            merged_count += 1

    payload["items"] = items
    payload["mergedTranslationsAt"] = now_iso()
    save_json(OUT_DRAFTS, payload)

    print(f"[ok] merged {merged_count} VI translations into drafts")
    print(f"[ok] wrote {OUT_DRAFTS}")


if __name__ == "__main__":
    run()
