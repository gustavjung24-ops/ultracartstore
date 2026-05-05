#!/usr/bin/env python3
from __future__ import annotations

import argparse
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from scripts.pcrm.common import clean_text, load_json, now_iso, save_json
from scripts.pcrm.config import CATEGORY_TO_VI, MIRROR_DIR, get_flags

IN_COMPARE = MIRROR_DIR / "compare_report.json"
OUT_DRAFTS = MIRROR_DIR / "import_drafts.json"
AUDIT_MD = Path(__file__).resolve().parents[2] / "docs" / "pcrm-mirror-audit.md"
REPORT_MD = Path(__file__).resolve().parents[2] / "docs" / "pcrm-mirror-import-report.md"


def to_markdown_list(items: list[str], limit: int = 80) -> str:
    if not items:
        return "- (none)"
    lines = []
    for value in items[:limit]:
        lines.append(f"- {value}")
    if len(items) > limit:
        lines.append(f"- ... and {len(items) - limit} more")
    return "\n".join(lines)


def build_draft(item: dict[str, Any]) -> dict[str, Any]:
    source_category = clean_text(str(item.get("sourceCategory", "")))
    return {
        "sourceTitleEn": clean_text(str(item.get("sourceTitleEn", ""))),
        "sourceUrl": clean_text(str(item.get("sourceUrl", ""))),
        "sourceCategory": source_category,
        "publishedAt": clean_text(str(item.get("publishedAt", ""))),
        "sourceImageUrl": clean_text(str(item.get("sourceImageUrl", ""))),
        "sourceImageAlt": clean_text(str(item.get("sourceImageAlt", ""))),
        "sourceImageCaption": clean_text(str(item.get("sourceImageCaption", ""))),
        "sourceImageCredit": clean_text(str(item.get("sourceImageCredit", ""))),
        "excerptEn": clean_text(str(item.get("excerptEn", ""))),
        "titleVi": clean_text(str(item.get("titleVi", ""))),
        "excerptVi": clean_text(str(item.get("excerptVi", ""))),
        "summaryVi": clean_text(str(item.get("summaryVi", ""))),
        "attributionVi": clean_text(str(item.get("attributionVi", ""))),
        "localCategoryVi": CATEGORY_TO_VI.get(source_category, clean_text(str(item.get("localCategoryVi", "")))),
        "canonicalUrl": clean_text(str(item.get("canonicalUrl", ""))),
        "status": "draft",
        "needsEditorialReview": bool(item.get("needsEditorialReview", True)),
    }


def write_audit_markdown(compare_payload: dict[str, Any], flags: Any) -> None:
    counts = compare_payload.get("counts", {})

    wrong_category = compare_payload.get("wrong_category_mapping", [])
    wrong_image = compare_payload.get("wrong_image_mapping", [])

    wrong_category_lines = [
        f"{row.get('sourceUrl', '')} | source={row.get('sourceCategory', '')} | observed={row.get('observedCategory', '')}"
        for row in wrong_category
    ]
    wrong_image_lines = [
        f"{row.get('sourceUrl', '')} | sourceImage={row.get('sourceImageUrl', '')} | observedImage={row.get('observedImageUrl', '')}"
        for row in wrong_image
    ]

    content = f"""# PCRM Mirror Audit

Generated at: {now_iso()}

## 1. Final category map
- Health and Nutrition News -> Tin sức khỏe và dinh dưỡng
- Innovative Science News -> Tin khoa học đổi mới
- Good Science Digest -> Bản tin khoa học
- Good Medicine -> Y học tốt
- News Releases -> Thông cáo báo chí

## 2. Summary counts
- already_exists: {counts.get('already_exists', 0)}
- missing_on_site: {counts.get('missing_on_site', 0)}
- wrong_category_mapping: {counts.get('wrong_category_mapping', 0)}
- wrong_image_mapping: {counts.get('wrong_image_mapping', 0)}
- ready_to_import: {counts.get('ready_to_import', 0)}

## 3. Wrong category mapping
{to_markdown_list(wrong_category_lines)}

## 4. Wrong image mapping
{to_markdown_list(wrong_image_lines)}

## 5. Mode state
- SAFE_MODE: {flags.safe_mode}
- ALLOW_FULL_BODY_MIRROR: {flags.allow_full_body_mirror}
- ENABLE_IMAGE_DOWNLOAD: {flags.enable_image_download}

## 6. Files updated by pipeline
- scripts/pcrm/config.py
- scripts/pcrm/common.py
- scripts/pcrm/fetch-category-pages.py
- scripts/pcrm/fetch-article-details.py
- scripts/pcrm/compare-with-local.py
- scripts/pcrm/build-import-drafts.py
- scripts/pcrm/sync-images.py
- scripts/pcrm/run-pipeline.py
- docs/pcrm-mirror-audit.md
- docs/pcrm-mirror-import-report.md
"""
    AUDIT_MD.write_text(content, encoding="utf-8")


def write_import_report_markdown(compare_payload: dict[str, Any], drafts: list[dict[str, Any]]) -> None:
    already = compare_payload.get("already_exists", [])
    missing = compare_payload.get("missing_on_site", [])
    ready = compare_payload.get("ready_to_import", [])

    already_lines = [f"{item.get('sourceTitleEn', '')} | {item.get('sourceUrl', '')}" for item in already]
    missing_lines = [f"{item.get('sourceTitleEn', '')} | {item.get('sourceUrl', '')}" for item in missing]
    ready_lines = [f"{item.get('sourceTitleEn', '')} | {item.get('sourceUrl', '')}" for item in ready]

    content = f"""# PCRM Mirror Import Report

Generated at: {now_iso()}

## 1. already_exists
{to_markdown_list(already_lines)}

## 2. missing_on_site
{to_markdown_list(missing_lines)}

## 3. ready_to_import
{to_markdown_list(ready_lines)}

## 4. Draft entries generated
- total drafts: {len(drafts)}

## 5. Manual next steps
- Review all items with needsEditorialReview=true and polish Vietnamese wording by context.
- Spot-check source image, source category, and published date for at least 2 items per category.
- Import only records in ready_to_import after review approval.
"""
    REPORT_MD.write_text(content, encoding="utf-8")


def run() -> None:
    flags = get_flags()
    compare_payload = load_json(IN_COMPARE, {})

    ready_items = compare_payload.get("ready_to_import", []) if isinstance(compare_payload, dict) else []
    drafts = [build_draft(item) for item in ready_items if isinstance(item, dict)]

    payload = {
        "generatedAt": now_iso(),
        "safeMode": flags.safe_mode,
        "allowFullBodyMirror": flags.allow_full_body_mirror,
        "enableImageDownload": flags.enable_image_download,
        "count": len(drafts),
        "items": drafts,
    }
    save_json(OUT_DRAFTS, payload)

    write_audit_markdown(compare_payload, flags)
    write_import_report_markdown(compare_payload, drafts)

    print(f"[ok] wrote {OUT_DRAFTS}")
    print(f"[ok] wrote {AUDIT_MD}")
    print(f"[ok] wrote {REPORT_MD}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Build import drafts and markdown reports")
    parser.parse_args()
    run()
