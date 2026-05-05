#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
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
    extract_published_at_from_soup,
    fetch_html,
    load_json,
    normalize_path,
    normalize_url,
    now_iso,
    save_json,
)
from scripts.pcrm.config import CATEGORY_TO_VI, MIRROR_DIR, get_flags, validate_flags

IN_CARDS = MIRROR_DIR / "category_cards.json"
OUT_DETAILS = MIRROR_DIR / "article_details.json"
TRANSLATED_ALL = Path(__file__).resolve().parents[2] / "pcrm_translated" / "translated_all.json"


def build_translation_map() -> dict[str, dict[str, Any]]:
    items = load_json(TRANSLATED_ALL, [])
    mapped: dict[str, dict[str, Any]] = {}
    for item in items:
        if not isinstance(item, dict):
            continue
        source_url = normalize_url(str(item.get("url", "")))
        if source_url:
            mapped[source_url] = item
    return mapped


def extract_hero_image(soup: BeautifulSoup) -> tuple[str, str, str, str]:
    og_image = soup.find("meta", attrs={"property": "og:image"})
    if og_image and og_image.get("content"):
        return normalize_url(og_image.get("content")), "", "", ""

    figure = soup.find("figure")
    if figure:
        img = figure.find("img")
        if img and img.get("src"):
            src = normalize_url(img.get("src"))
            alt = clean_text(img.get("alt", ""))
            caption = ""
            credit = ""
            figcaption = figure.find("figcaption")
            if figcaption:
                caption = clean_text(figcaption.get_text(" ", strip=True))
                credit_match = re.search(r"(credit|photo by)\s*:?\s*(.+)$", caption, re.IGNORECASE)
                if credit_match:
                    credit = clean_text(credit_match.group(2))
            return src, alt, caption, credit

    main = soup.select_one("main") or soup.body or soup
    img = main.find("img")
    if img and img.get("src"):
        return normalize_url(img.get("src")), clean_text(img.get("alt", "")), "", ""

    return "", "", "", ""


def extract_excerpt_and_body(soup: BeautifulSoup) -> tuple[str, list[str]]:
    description = ""
    meta_desc = soup.find("meta", attrs={"name": "description"})
    if meta_desc and meta_desc.get("content"):
        description = clean_text(meta_desc.get("content"))

    main = soup.select_one("main") or soup.body or soup
    paragraphs: list[str] = []
    for p in main.find_all("p"):
        text = clean_text(p.get_text(" ", strip=True))
        if len(text) >= 35:
            paragraphs.append(text)

    if not description and paragraphs:
        description = paragraphs[0]

    deduped: list[str] = []
    seen: set[str] = set()
    for item in paragraphs:
        if item in seen:
            continue
        seen.add(item)
        deduped.append(item)

    return description, deduped


def extract_title(soup: BeautifulSoup) -> str:
    h1 = soup.find("h1")
    if h1:
        text = clean_text(h1.get_text(" ", strip=True))
        if text:
            return text

    if soup.title and soup.title.string:
        title = clean_text(soup.title.string)
        title = re.sub(r"\s*\|\s*Physicians Committee.*$", "", title)
        return title

    return ""


def extract_canonical(soup: BeautifulSoup, fallback_url: str) -> str:
    canonical = soup.find("link", attrs={"rel": "canonical"})
    if canonical and canonical.get("href"):
        return normalize_url(canonical.get("href"))
    return normalize_url(fallback_url)


def parse_detail(article_url: str, fallback_card: dict[str, Any], translation_map: dict[str, dict[str, Any]]) -> dict[str, Any]:
    html = fetch_html(article_url)
    source_category = fallback_card.get("sourceCategory") or categorize_from_path(urlparse(article_url).path)
    if not html:
        translated = translation_map.get(normalize_url(article_url), {})
        title_en = clean_text(str(fallback_card.get("title", "")))
        excerpt_en = clean_text(str(fallback_card.get("teaserEn", "")))
        return {
            "sourceTitleEn": title_en,
            "sourceUrl": normalize_url(article_url),
            "sourceCategory": source_category,
            "publishedAt": fallback_card.get("publishedAt"),
            "sourceImageUrl": clean_text(str(fallback_card.get("cardImageUrl", ""))),
            "sourceImageAlt": "",
            "sourceImageCaption": "",
            "sourceImageCredit": "",
            "excerptEn": excerpt_en,
            "bodyEn": [],
            "titleVi": clean_text(str(translated.get("title_vi", ""))),
            "excerptVi": clean_text(str(translated.get("description_vi", ""))),
            "summaryVi": clean_text(str(translated.get("description_vi", ""))),
            "attributionVi": "Nguồn: Physicians Committee for Responsible Medicine (PCRM).",
            "localCategoryVi": CATEGORY_TO_VI.get(source_category, ""),
            "needsEditorialReview": True,
            "fetchMode": "fallback",
            "canonicalUrl": normalize_url(article_url),
            "status": "draft",
        }

    soup = BeautifulSoup(html, "html.parser")
    title = extract_title(soup) or clean_text(str(fallback_card.get("title", "")))
    excerpt_en, body_en = extract_excerpt_and_body(soup)
    published_at = extract_published_at_from_soup(soup) or fallback_card.get("publishedAt")
    source_image_url, source_image_alt, source_image_caption, source_image_credit = extract_hero_image(soup)
    canonical_url = extract_canonical(soup, article_url)

    translated = translation_map.get(normalize_url(canonical_url), translation_map.get(normalize_url(article_url), {}))
    title_vi = clean_text(str(translated.get("title_vi", "")))
    description_vi = clean_text(str(translated.get("description_vi", "")))

    if not description_vi:
        paragraphs_vi = translated.get("paragraphs_vi")
        if isinstance(paragraphs_vi, list) and paragraphs_vi:
            description_vi = clean_text(str(paragraphs_vi[0]))

    return {
        "sourceTitleEn": title,
        "sourceUrl": normalize_url(article_url),
        "sourceCategory": source_category,
        "publishedAt": published_at,
        "sourceImageUrl": source_image_url or clean_text(str(fallback_card.get("cardImageUrl", ""))),
        "sourceImageAlt": source_image_alt,
        "sourceImageCaption": source_image_caption,
        "sourceImageCredit": source_image_credit,
        "excerptEn": excerpt_en,
        "bodyEn": body_en,
        "titleVi": title_vi,
        "excerptVi": description_vi,
        "summaryVi": description_vi,
        "attributionVi": "Nguồn: Physicians Committee for Responsible Medicine (PCRM).",
        "localCategoryVi": CATEGORY_TO_VI.get(source_category, ""),
        "needsEditorialReview": True,
        "fetchMode": "live",
        "canonicalUrl": canonical_url,
        "status": "draft",
    }


def run() -> None:
    flags = get_flags()
    validate_flags(flags)

    cards_payload = load_json(IN_CARDS, {})
    card_items = cards_payload.get("items", []) if isinstance(cards_payload, dict) else []
    translation_map = build_translation_map()

    out_items: list[dict[str, Any]] = []
    seen: set[str] = set()

    for card in card_items:
        if not isinstance(card, dict):
            continue
        article_url = normalize_url(str(card.get("url", "")))
        if not article_url or article_url in seen:
            continue
        seen.add(article_url)

        item = parse_detail(article_url, card, translation_map)
        if flags.safe_mode:
            item["bodyEn"] = []
        elif not flags.allow_full_body_mirror:
            item["bodyEn"] = []
        out_items.append(item)

    payload = {
        "generatedAt": now_iso(),
        "safeMode": flags.safe_mode,
        "allowFullBodyMirror": flags.allow_full_body_mirror,
        "enableImageDownload": flags.enable_image_download,
        "articleCount": len(out_items),
        "items": out_items,
    }
    save_json(OUT_DETAILS, payload)
    print(f"[ok] wrote {OUT_DETAILS} with {len(out_items)} article details")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch PCRM article details for mirror")
    parser.parse_args()
    run()
