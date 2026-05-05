#!/usr/bin/env python3
"""
Fix compare report: identify tracking pixel vs real image mismatch, reclassify wrong_image_mapping.
Scripts keeps sourceImageUrl from PCRM (the source of truth) and marks pixel-based detections as noise.
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from scripts.pcrm.common import save_json, load_json, now_iso
from scripts.pcrm.config import MIRROR_DIR

IN_COMPARE = MIRROR_DIR / "compare_report.json"
OUT_COMPARE = MIRROR_DIR / "compare_report.json"

TRACKING_PIXEL_PATTERNS = [
    "p.alocdn.com",
    "google-analytics",
    "doubleclick.net",
    "facebook.com/tr",
    "analytics",
    "tracking",
    "pixel",
]


def is_tracking_pixel(url: str) -> bool:
    if not url:
        return False
    url_lower = url.lower()
    return any(pattern in url_lower for pattern in TRACKING_PIXEL_PATTERNS)


def reclassify_image_mismatches(payload: dict) -> dict:
    wrong_img_list = payload.get("wrong_image_mapping", [])
    real_mismatch: list = []
    pixel_noise: list = []

    for item in wrong_img_list:
        if not isinstance(item, dict):
            continue
        observed = item.get("observedImageUrl", "")
        if is_tracking_pixel(observed):
            item["classification"] = "observed_image_is_tracking_pixel"
            pixel_noise.append(item)
        else:
            real_mismatch.append(item)

    payload["wrong_image_mapping"] = real_mismatch
    payload["image_mismatch_classified_as_tracking_pixel"] = pixel_noise

    payload["counts"]["wrong_image_mapping"] = len(real_mismatch)
    payload["counts"]["tracking_pixel_noise_count"] = len(pixel_noise)

    ready_to_import = payload.get("ready_to_import", [])
    already_exists = payload.get("already_exists", [])

    all_items = {item.get("sourceUrl"): item for item in ready_to_import}
    for item in already_exists:
        if item.get("sourceUrl") not in all_items:
            all_items[item.get("sourceUrl")] = item

    reclassified_ready = []
    for item in ready_to_import:
        source_url = item.get("sourceUrl")
        has_real_mismatch = any(
            m.get("sourceUrl") == source_url for m in real_mismatch
        )
        if not has_real_mismatch:
            reclassified_ready.append(item)

    payload["ready_to_import"] = reclassified_ready
    payload["counts"]["ready_to_import"] = len(reclassified_ready)

    return payload


def run() -> None:
    compare = load_json(IN_COMPARE, {})

    if not isinstance(compare, dict):
        print("[error] compare report is not a dict")
        return

    compare = reclassify_image_mismatches(compare)
    compare["reclassifiedAt"] = now_iso()

    save_json(OUT_COMPARE, compare)

    print(f"[ok] reclassified image mismatches")
    print(f"  - real_mismatch: {compare['counts'].get('wrong_image_mapping', 0)}")
    print(f"  - tracking_pixel_noise: {compare['counts'].get('tracking_pixel_noise_count', 0)}")
    print(f"  - ready_to_import (adjusted): {compare['counts'].get('ready_to_import', 0)}")
    print(f"[ok] wrote {OUT_COMPARE}")


if __name__ == "__main__":
    run()
