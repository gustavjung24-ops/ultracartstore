#!/usr/bin/env python3
"""Sync menu-related content from pcrm.org and patch missing Vietnamese fields.

This script does three things:
1) Fetches full source content for missing/manual menu routes.
2) Translates those pages to Vietnamese using Google public endpoint with cache.
3) Patches missing *_vi fields in translated_all.json to avoid EN fallbacks.
"""

from __future__ import annotations

import json
import re
import time
from pathlib import Path
from typing import Any
from urllib.parse import quote, urljoin, urlparse

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "https://www.pcrm.org"

TRANSLATED_ALL_PATH = ROOT / "pcrm_translated" / "translated_all.json"
GENERATED_PAGES_PATH = ROOT / "pcrm_translated" / "generated_source_pages.json"
CACHE_PATH = ROOT / "pcrm_translated" / "google_free_cache_vi.json"
MANUAL_PAGES_TS = ROOT / "lib" / "manual-pages.ts"

ADDITIONAL_MENU_PATHS = [
    "/veganstarterkit",
    "/universalmeals",
    "/take-action",
    "/findadoctor",
    "/findadietitian",
    "/dogs",
    "/t2dstudy",
    "/podcast",
    "/yourbodyinbalance",
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
}

SESSION = requests.Session()
SESSION.headers.update(HEADERS)


def load_json(path: Path, default: Any):
    if path.exists():
        return json.loads(path.read_text(encoding="utf-8"))
    return default


def save_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def normalize_path(path: str) -> str:
    clean = str(path or "").strip()
    if not clean:
        return "/"
    clean = clean.replace("https://www.pcrm.org", "").replace("http://www.pcrm.org", "")
    clean = clean.split("?")[0].split("#")[0].strip()
    clean = re.sub(r"/+$", "", clean)
    if clean in ("", "/home"):
        return "/"
    if not clean.startswith("/"):
        clean = f"/{clean}"
    return clean


def path_from_url(url: str) -> str:
    try:
        parsed = urlparse(url)
        return normalize_path(parsed.path)
    except Exception:
        return normalize_path(url)


def parse_manual_paths(ts_content: str) -> list[str]:
    matches = re.findall(r"\[\s*\n\s*\"(/[^\"\n]+)\"\s*,", ts_content)
    return sorted(set(normalize_path(path) for path in matches))


def clean_text(text: str) -> str:
    return re.sub(r"\s+", " ", (text or "").strip())


def dedupe_keep_order(values: list[str]) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for item in values:
        if item and item not in seen:
            seen.add(item)
            out.append(item)
    return out


def strip_noise(container: BeautifulSoup) -> None:
    selectors = [
        "script",
        "style",
        "noscript",
        "svg",
        "header",
        "footer",
        "nav",
        ".utility-menu",
        ".mobile-menu",
        ".header",
        ".footer",
        ".breadcrumb",
        ".skip-link",
        "#utility-menu",
        "#block-pcrm-main-menu",
        "#block-pcrm-footer",
        "#block-pcrm-social-menu",
    ]
    for selector in selectors:
        for node in container.select(selector):
            node.decompose()


def extract_page_content(path: str) -> dict[str, Any] | None:
    url = urljoin(BASE_URL, path)
    try:
        response = SESSION.get(url, timeout=25)
        response.raise_for_status()
    except Exception as exc:
        print(f"[warn] fetch failed for {url}: {exc}")
        return None

    soup = BeautifulSoup(response.text, "html.parser")
    main = soup.select_one("main") or soup.body or soup
    strip_noise(main)

    title = ""
    if soup.title and soup.title.string:
        title = clean_text(soup.title.string)
        title = re.sub(r"\s*\|\s*Physicians Committee.*$", "", title).strip()

    description = ""
    meta_desc = soup.find("meta", attrs={"name": "description"})
    if meta_desc and meta_desc.get("content"):
        description = clean_text(meta_desc.get("content", ""))

    h1 = dedupe_keep_order([
        clean_text(tag.get_text(" ", strip=True))
        for tag in main.find_all("h1")
        if len(clean_text(tag.get_text(" ", strip=True))) > 2
    ])
    h2 = dedupe_keep_order([
        clean_text(tag.get_text(" ", strip=True))
        for tag in main.find_all("h2")
        if len(clean_text(tag.get_text(" ", strip=True))) > 2
    ])
    h3 = dedupe_keep_order([
        clean_text(tag.get_text(" ", strip=True))
        for tag in main.find_all("h3")
        if len(clean_text(tag.get_text(" ", strip=True))) > 2
    ])

    paragraphs = []
    for tag in main.find_all("p"):
        text = clean_text(tag.get_text(" ", strip=True))
        if len(text) >= 25:
            paragraphs.append(text)

    if len(paragraphs) < 4:
        for tag in main.find_all("li"):
            text = clean_text(tag.get_text(" ", strip=True))
            if len(text) >= 35:
                paragraphs.append(text)

    paragraphs = dedupe_keep_order(paragraphs)

    if not description and paragraphs:
        description = paragraphs[0]

    if not title and h1:
        title = h1[0]
    if not title:
        title = normalize_path(path).strip("/").replace("-", " ").title() or "PCRM"

    images: list[dict[str, str]] = []
    for img in main.find_all("img"):
        src = clean_text(img.get("src", ""))
        if not src:
            continue
        src = urljoin(BASE_URL, src)
        if re.search(r"pixel|tracking|p\.gif", src, re.IGNORECASE):
            continue
        images.append({
            "src": src,
            "alt": clean_text(img.get("alt", "")),
        })

    seen_links: set[tuple[str, str]] = set()
    links: list[dict[str, str]] = []
    for a_tag in main.find_all("a", href=True):
        href = clean_text(a_tag.get("href", ""))
        text = clean_text(a_tag.get_text(" ", strip=True))
        if not href or href.startswith("javascript:"):
            continue
        if href.startswith("mailto:") or href.startswith("tel:"):
            continue
        if len(text) < 2:
            continue
        full_url = urljoin(BASE_URL, href)
        key = (text, full_url)
        if key in seen_links:
            continue
        seen_links.add(key)
        links.append({"text": text, "url": full_url})

    return {
        "url": url,
        "title": title,
        "description": description,
        "h1": h1,
        "h2": h2,
        "h3": h3,
        "paragraphs": paragraphs,
        "images": images,
        "links": links,
    }


def translate_request(text: str) -> str:
    endpoint = (
        "https://translate.googleapis.com/translate_a/single"
        f"?client=gtx&sl=en&tl=vi&dt=t&q={quote(text)}"
    )
    response = SESSION.get(endpoint, timeout=25)
    response.raise_for_status()
    payload = response.json()
    translated = "".join(part[0] for part in payload[0] if part and part[0])
    return translated or text


def split_long_text(text: str, chunk_size: int = 1800) -> list[str]:
    text = clean_text(text)
    if len(text) <= chunk_size:
        return [text]

    sentences = re.split(r"(?<=[.!?])\s+", text)
    chunks: list[str] = []
    current = ""

    for sentence in sentences:
        if not sentence:
            continue
        candidate = f"{current} {sentence}".strip()
        if len(candidate) <= chunk_size:
            current = candidate
        else:
            if current:
                chunks.append(current)
            if len(sentence) <= chunk_size:
                current = sentence
            else:
                for i in range(0, len(sentence), chunk_size):
                    chunks.append(sentence[i:i + chunk_size])
                current = ""

    if current:
        chunks.append(current)

    return chunks or [text]


def translate_text(text: str, cache: dict[str, str]) -> str:
    raw = clean_text(text)
    if not raw:
        return text

    if raw in cache:
        return cache[raw]

    if len(raw) <= 2 or raw.startswith("http"):
        cache[raw] = raw
        return raw

    chunks = split_long_text(raw)

    for _ in range(3):
        try:
            translated_chunks = [translate_request(chunk) for chunk in chunks]
            translated = clean_text(" ".join(translated_chunks))
            cache[raw] = translated
            time.sleep(0.06)
            return translated
        except Exception:
            time.sleep(0.4)

    cache[raw] = raw
    return raw


def ensure_vi_fields(page: dict[str, Any], cache: dict[str, str], force_translate_all: bool = False) -> tuple[dict[str, Any], bool]:
    changed = False

    title_en = clean_text(page.get("title_en") or page.get("title") or "")
    description_en = clean_text(page.get("description_en") or page.get("description") or "")

    if page.get("title") != title_en:
        page["title"] = title_en
        changed = True
    if page.get("description") != description_en:
        page["description"] = description_en
        changed = True

    if page.get("title_en") != title_en:
        page["title_en"] = title_en
        changed = True
    if page.get("description_en") != description_en:
        page["description_en"] = description_en
        changed = True

    if force_translate_all or not clean_text(page.get("title_vi", "")):
        new_value = translate_text(title_en, cache)
        if page.get("title_vi") != new_value:
            page["title_vi"] = new_value
            changed = True

    if force_translate_all or not clean_text(page.get("description_vi", "")):
        new_value = translate_text(description_en, cache)
        if page.get("description_vi") != new_value:
            page["description_vi"] = new_value
            changed = True

    for base in ["h1", "h2", "h3", "paragraphs"]:
        source = page.get(f"{base}_en") or page.get(base) or []
        if not isinstance(source, list):
            source = []
        source = [clean_text(str(value)) for value in source if clean_text(str(value))]

        if page.get(base) != source:
            page[base] = source
            changed = True
        if page.get(f"{base}_en") != source:
            page[f"{base}_en"] = source
            changed = True

        existing_vi = page.get(f"{base}_vi")
        if not isinstance(existing_vi, list):
            existing_vi = []

        needs_translate = force_translate_all or len(existing_vi) < len(source) or any(
            not clean_text(str(existing_vi[idx])) if idx < len(existing_vi) else True
            for idx in range(len(source))
        )

        if needs_translate:
            new_vi: list[str] = []
            for idx, text in enumerate(source):
                current = clean_text(str(existing_vi[idx])) if idx < len(existing_vi) else ""
                if current and not force_translate_all:
                    new_vi.append(current)
                else:
                    new_vi.append(translate_text(text, cache))
            if page.get(f"{base}_vi") != new_vi:
                page[f"{base}_vi"] = new_vi
                changed = True

    links = page.get("links")
    if not isinstance(links, list):
        links = []
    normalized_links = []
    for item in links:
        if not isinstance(item, dict):
            continue
        text = clean_text(str(item.get("text", "")))
        url = clean_text(str(item.get("url", "")))
        if text and url:
            normalized_links.append({"text": text, "url": url})
    if page.get("links") != normalized_links:
        page["links"] = normalized_links
        changed = True

    existing_links_vi = page.get("links_vi")
    if not isinstance(existing_links_vi, list):
        existing_links_vi = []

    rebuilt_links_vi = []
    for idx, link in enumerate(normalized_links):
        current = existing_links_vi[idx] if idx < len(existing_links_vi) and isinstance(existing_links_vi[idx], dict) else {}
        text_vi = clean_text(str(current.get("text_vi", "")))
        if force_translate_all or not text_vi:
            text_vi = translate_text(link["text"], cache)
        rebuilt_links_vi.append({
            "text": link["text"],
            "url": link["url"],
            "text_vi": text_vi,
        })

    if page.get("links_vi") != rebuilt_links_vi:
        page["links_vi"] = rebuilt_links_vi
        changed = True

    if not isinstance(page.get("images"), list):
        page["images"] = []
        changed = True

    return page, changed


def main() -> None:
    translated_pages = load_json(TRANSLATED_ALL_PATH, [])
    cache = load_json(CACHE_PATH, {})
    manual_paths = parse_manual_paths(MANUAL_PAGES_TS.read_text(encoding="utf-8"))

    target_paths = sorted(set(manual_paths + [normalize_path(path) for path in ADDITIONAL_MENU_PATHS]))
    existing_paths = {path_from_url(page.get("url", "")) for page in translated_pages if isinstance(page, dict)}

    paths_to_generate = [path for path in target_paths if path not in existing_paths]

    print(f"[info] manual paths: {len(manual_paths)}")
    print(f"[info] additional menu paths: {len(ADDITIONAL_MENU_PATHS)}")
    print(f"[info] to generate from source: {len(paths_to_generate)}")

    generated_pages: list[dict[str, Any]] = []
    for idx, route in enumerate(paths_to_generate, start=1):
        print(f"[fetch {idx}/{len(paths_to_generate)}] {route}")
        extracted = extract_page_content(route)
        if not extracted:
            continue
        generated_page, _ = ensure_vi_fields(extracted, cache, force_translate_all=True)
        generated_pages.append(generated_page)

        if idx % 3 == 0:
            save_json(CACHE_PATH, cache)
            save_json(GENERATED_PAGES_PATH, generated_pages)

    save_json(GENERATED_PAGES_PATH, generated_pages)

    patched = 0
    for idx, page in enumerate(translated_pages, start=1):
        if not isinstance(page, dict):
            continue
        _, changed = ensure_vi_fields(page, cache, force_translate_all=False)
        if changed:
            patched += 1
        if idx % 10 == 0:
            save_json(CACHE_PATH, cache)

    save_json(TRANSLATED_ALL_PATH, translated_pages)
    save_json(CACHE_PATH, cache)

    print("\n[done]")
    print(f"generated pages: {len(generated_pages)}")
    print(f"patched translated pages: {patched}")
    print(f"cache entries: {len(cache)}")
    print(f"saved: {GENERATED_PAGES_PATH}")
    print(f"saved: {TRANSLATED_ALL_PATH}")


if __name__ == "__main__":
    main()
