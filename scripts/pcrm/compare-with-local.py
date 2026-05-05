#!/usr/bin/env python3
from __future__ import annotations

import argparse
import sys
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from bs4 import BeautifulSoup  # type: ignore[import-not-found]

from scripts.pcrm.common import (
    categorize_from_path,
    clean_text,
    fetch_html,
    load_json,
    normalize_path,
    normalize_title,
    normalize_url,
    now_iso,
    save_json,
)
from scripts.pcrm.config import BASE_SITE_VI, MIRROR_DIR

IN_DETAILS = MIRROR_DIR / "article_details.json"
OUT_COMPARE = MIRROR_DIR / "compare_report.json"

LOCAL_FILES = [
    Path(__file__).resolve().parents[2] / "pcrm_translated" / "generated_source_pages.json",
    Path(__file__).resolve().parents[2] / "pcrm_translated" / "translated_all.json",
]

LIVE_URLS = [
    f"{BASE_SITE_VI}/",
    f"{BASE_SITE_VI}/news/blog",
    f"{BASE_SITE_VI}/news/health-nutrition",
    f"{BASE_SITE_VI}/news/innovative-science-news",
    f"{BASE_SITE_VI}/news/good-science-digest",
    f"{BASE_SITE_VI}/news/news-releases",
    f"{BASE_SITE_VI}/news/good-medicine",
]


def load_local_existing() -> tuple[set[str], set[str], dict[str, str], dict[str, str]]:
    source_urls: set[str] = set()
    normalized_titles: set[str] = set()
    url_to_category: dict[str, str] = {}
    url_to_image: dict[str, str] = {}

    for file_path in LOCAL_FILES:
        data = load_json(file_path, [])
        if not isinstance(data, list):
            continue

        for item in data:
            if not isinstance(item, dict):
                continue

            source_url = normalize_url(str(item.get("url", "")))
            if not source_url:
                continue

            source_urls.add(source_url)
            title = clean_text(str(item.get("title", "")))
            if title:
                normalized_titles.add(normalize_title(title))

            category = categorize_from_path(urlparse(source_url).path)
            if category:
                url_to_category[source_url] = category

            images = item.get("images") if isinstance(item.get("images"), list) else []
            if images:
                first = images[0]
                if isinstance(first, dict) and first.get("src"):
                    url_to_image[source_url] = normalize_url(str(first.get("src")))

    return source_urls, normalized_titles, url_to_category, url_to_image


def load_live_existing() -> tuple[set[str], dict[str, str], dict[str, str]]:
    links: set[str] = set()
    url_to_category: dict[str, str] = {}
    url_to_image: dict[str, str] = {}

    for live_url in LIVE_URLS:
        html = fetch_html(live_url)
        if not html:
            continue

        soup = BeautifulSoup(html, "html.parser")
        current_image = ""
        for node in soup.find_all(["img", "a"]):
            if node.name == "img":
                src = node.get("src")
                if src:
                    current_image = normalize_url(src, base=BASE_SITE_VI)
                continue

            href = node.get("href")
            if not href:
                continue
            normalized = normalize_url(href, base=BASE_SITE_VI)
            path = normalize_path(urlparse(normalized).path)
            if not path.startswith("/news/"):
                continue
            if path.count("/") < 3:
                continue

            source_url_guess = normalize_url(path)
            links.add(source_url_guess)
            category = categorize_from_path(path)
            if category:
                url_to_category[source_url_guess] = category
            if current_image:
                url_to_image[source_url_guess] = current_image

    return links, url_to_category, url_to_image


def run() -> None:
    details_payload = load_json(IN_DETAILS, {})
    details_items = details_payload.get("items", []) if isinstance(details_payload, dict) else []

    local_urls, local_titles, local_category_map, local_image_map = load_local_existing()
    live_urls, live_category_map, live_image_map = load_live_existing()

    already_exists: list[dict[str, Any]] = []
    missing_on_site: list[dict[str, Any]] = []
    wrong_category_mapping: list[dict[str, Any]] = []
    wrong_image_mapping: list[dict[str, Any]] = []
    ready_to_import: list[dict[str, Any]] = []

    for item in details_items:
        if not isinstance(item, dict):
            continue

        source_url = normalize_url(str(item.get("sourceUrl", "")))
        source_title = clean_text(str(item.get("sourceTitleEn", "")))
        source_title_norm = normalize_title(source_title)
        source_category = clean_text(str(item.get("sourceCategory", "")))
        source_image = normalize_url(str(item.get("sourceImageUrl", ""))) if item.get("sourceImageUrl") else ""

        exists_by_local_url = source_url in local_urls
        exists_by_local_title = source_title_norm in local_titles if source_title_norm else False
        exists_by_live_url = source_url in live_urls

        exists = exists_by_local_url or exists_by_local_title or exists_by_live_url
        if exists:
            already_exists.append(item)
        else:
            missing_on_site.append(item)

        observed_category = local_category_map.get(source_url) or live_category_map.get(source_url)
        if observed_category and source_category and observed_category != source_category:
            wrong_category_mapping.append(
                {
                    "sourceUrl": source_url,
                    "sourceCategory": source_category,
                    "observedCategory": observed_category,
                    "sourceTitleEn": source_title,
                }
            )

        observed_image = local_image_map.get(source_url) or live_image_map.get(source_url)
        if source_image and observed_image:
            source_path = normalize_path(urlparse(source_image).path)
            observed_path = normalize_path(urlparse(observed_image).path)
            if source_path != observed_path:
                wrong_image_mapping.append(
                    {
                        "sourceUrl": source_url,
                        "sourceImageUrl": source_image,
                        "observedImageUrl": observed_image,
                        "sourceTitleEn": source_title,
                    }
                )

        raw_published = item.get("publishedAt")
        published_at = clean_text(raw_published if isinstance(raw_published, str) else "")
        has_required = bool(source_url and source_category and published_at and source_image)
        if not exists and has_required:
            ready_to_import.append(item)

    payload = {
        "generatedAt": now_iso(),
        "counts": {
            "already_exists": len(already_exists),
            "missing_on_site": len(missing_on_site),
            "wrong_category_mapping": len(wrong_category_mapping),
            "wrong_image_mapping": len(wrong_image_mapping),
            "ready_to_import": len(ready_to_import),
        },
        "already_exists": already_exists,
        "missing_on_site": missing_on_site,
        "wrong_category_mapping": wrong_category_mapping,
        "wrong_image_mapping": wrong_image_mapping,
        "ready_to_import": ready_to_import,
    }

    save_json(OUT_COMPARE, payload)
    print(f"[ok] wrote {OUT_COMPARE}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Compare PCRM mirror set with local/live site")
    parser.parse_args()
    run()
