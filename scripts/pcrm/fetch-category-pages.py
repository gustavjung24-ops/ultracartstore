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
    article_slug_from_url,
    categorize_from_path,
    clean_text,
    extract_published_at_from_soup,
    fetch_html,
    load_json,
    normalize_path,
    normalize_url,
    now_iso,
    save_json,
)
from scripts.pcrm.config import CATEGORY_URLS, MIRROR_DIR, SOURCE_JSON_FILES

OUT_FILE = MIRROR_DIR / "category_cards.json"
RAW_SNAPSHOTS_DIR = MIRROR_DIR / "raw_category_html"


def iter_article_links_from_soup(soup: BeautifulSoup) -> list[str]:
    links: list[str] = []
    seen: set[str] = set()
    for tag in soup.find_all("a", href=True):
        href = normalize_url(tag.get("href", ""))
        path = normalize_path(urlparse(href).path)
        category = categorize_from_path(path)
        if not category:
            continue
        if path.count("/") < 3:
            continue
        if href in seen:
            continue
        seen.add(href)
        links.append(href)
    return links


def parse_card_from_article_url(soup: BeautifulSoup, article_url: str, category_name: str) -> dict[str, Any]:
    title = ""
    teaser = ""
    published_at = extract_published_at_from_soup(soup)
    source_image_url = ""

    article_path = normalize_path(urlparse(article_url).path)
    article_anchor = None
    for tag in soup.find_all("a", href=True):
        href = normalize_url(tag.get("href", ""))
        if normalize_path(urlparse(href).path) == article_path:
            article_anchor = tag
            break

    if article_anchor:
        title = clean_text(article_anchor.get_text(" ", strip=True))
        parent = article_anchor.parent
        if parent:
            paragraph = parent.find("p")
            if paragraph:
                teaser = clean_text(paragraph.get_text(" ", strip=True))
            image = parent.find("img")
            if image and image.get("src"):
                source_image_url = normalize_url(image.get("src"))

    return {
        "id": article_slug_from_url(article_url),
        "title": title,
        "url": article_url,
        "sourceCategory": category_name,
        "publishedAt": published_at,
        "cardImageUrl": source_image_url,
        "teaserEn": teaser,
    }


def build_from_html(category_name: str, category_url: str, html: str) -> list[dict[str, Any]]:
    soup = BeautifulSoup(html, "html.parser")
    article_urls = iter_article_links_from_soup(soup)
    cards = [parse_card_from_article_url(soup, article_url, category_name) for article_url in article_urls]
    return cards


def build_from_local_fallback(category_name: str, category_url: str) -> list[dict[str, Any]]:
    fallback_cards: list[dict[str, Any]] = []
    seen: set[str] = set()

    for source_file in SOURCE_JSON_FILES:
        data = load_json(source_file, [])
        if not isinstance(data, list):
            continue

        for item in data:
            if not isinstance(item, dict):
                continue
            url = normalize_url(str(item.get("url", "")))
            path = normalize_path(urlparse(url).path)
            if categorize_from_path(path) != category_name:
                continue
            if path.count("/") < 3:
                continue
            if url in seen:
                continue
            seen.add(url)

            images = item.get("images") if isinstance(item.get("images"), list) else []
            first_image = ""
            if images:
                first = images[0]
                if isinstance(first, dict):
                    first_image = normalize_url(str(first.get("src", "")))

            paragraphs = item.get("paragraphs") if isinstance(item.get("paragraphs"), list) else []
            teaser = clean_text(paragraphs[0]) if paragraphs else ""

            fallback_cards.append(
                {
                    "id": article_slug_from_url(url),
                    "title": clean_text(str(item.get("title", ""))),
                    "url": url,
                    "sourceCategory": category_name,
                    "publishedAt": None,
                    "cardImageUrl": first_image,
                    "teaserEn": teaser,
                }
            )

    return fallback_cards


def run() -> None:
    RAW_SNAPSHOTS_DIR.mkdir(parents=True, exist_ok=True)

    all_cards: list[dict[str, Any]] = []
    for category_name, category_url in CATEGORY_URLS.items():
        html = fetch_html(category_url)
        cards: list[dict[str, Any]]
        mode = "live"

        if html:
            cards = build_from_html(category_name, category_url, html)
            snapshot = RAW_SNAPSHOTS_DIR / f"{category_name.lower().replace(' ', '_')}.html"
            snapshot.write_text(html, encoding="utf-8")
        else:
            cards = build_from_local_fallback(category_name, category_url)
            mode = "fallback"

        for card in cards:
            card["fetchMode"] = mode
            card["categoryUrl"] = category_url
            card["fetchedAt"] = now_iso()
            all_cards.append(card)

    payload = {
        "generatedAt": now_iso(),
        "categoryCount": len(CATEGORY_URLS),
        "articleCount": len(all_cards),
        "items": all_cards,
    }
    save_json(OUT_FILE, payload)
    print(f"[ok] wrote {OUT_FILE} with {len(all_cards)} card items")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch PCRM category pages and parse article cards")
    parser.parse_args()
    run()
