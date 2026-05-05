from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urljoin, urlparse

import requests  # type: ignore[import-not-found]
from bs4 import BeautifulSoup  # type: ignore[import-not-found]

from .config import BASE_PCRM, DEFAULT_USER_AGENT

SESSION = requests.Session()
SESSION.headers.update({"User-Agent": DEFAULT_USER_AGENT})


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def load_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def save_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def clean_text(text: str | None) -> str:
    return re.sub(r"\s+", " ", (text or "").strip())


def normalize_path(value: str) -> str:
    raw = clean_text(value)
    if not raw:
        return "/"
    parsed = urlparse(raw)
    path = parsed.path if parsed.scheme else raw
    path = path.split("?")[0].split("#")[0].strip()
    if not path.startswith("/"):
        path = f"/{path}"
    path = re.sub(r"/+", "/", path)
    if path != "/":
        path = path.rstrip("/")
    return path or "/"


def normalize_url(url: str, base: str = BASE_PCRM) -> str:
    if not url:
        return ""
    joined = urljoin(base, url)
    parsed = urlparse(joined)
    path = normalize_path(parsed.path)
    return f"{parsed.scheme}://{parsed.netloc}{path}"


def normalize_title(title: str) -> str:
    lowered = clean_text(title).lower()
    lowered = re.sub(r"[^a-z0-9\s]", "", lowered)
    lowered = re.sub(r"\s+", " ", lowered)
    return lowered.strip()


def extract_published_at_from_soup(soup: BeautifulSoup) -> str | None:
    candidates = []

    for meta_name in [
        ("property", "article:published_time"),
        ("name", "article:published_time"),
        ("property", "og:updated_time"),
        ("name", "date"),
        ("itemprop", "datePublished"),
    ]:
        tag = soup.find("meta", attrs={meta_name[0]: meta_name[1]})
        if tag and tag.get("content"):
            candidates.append(tag.get("content"))

    time_tag = soup.find("time")
    if time_tag:
        if time_tag.get("datetime"):
            candidates.append(time_tag.get("datetime"))
        candidates.append(time_tag.get_text(" ", strip=True))

    # Many PCRM pages expose publish date in JSON-LD blocks.
    for script_tag in soup.find_all("script", attrs={"type": "application/ld+json"}):
        raw_json = clean_text(script_tag.string or script_tag.get_text(" ", strip=True))
        if not raw_json:
            continue
        try:
            payload = json.loads(raw_json)
        except Exception:
            continue

        stack: list[Any] = [payload]
        while stack:
            current = stack.pop()
            if isinstance(current, dict):
                for key in ["datePublished", "dateCreated", "dateModified"]:
                    value = current.get(key)
                    if isinstance(value, str) and value.strip():
                        candidates.append(value)
                for value in current.values():
                    stack.append(value)
            elif isinstance(current, list):
                stack.extend(current)

    for value in candidates:
        parsed = parse_any_datetime(value)
        if parsed:
            return parsed
    return None


def parse_any_datetime(value: str | None) -> str | None:
    raw = clean_text(value)
    if not raw:
        return None

    raw = raw.replace("Z", "+00:00")
    known_formats = [
        "%Y-%m-%d",
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%dT%H:%M:%S%z",
        "%Y-%m-%dT%H:%M:%S",
        "%B %d, %Y",
        "%b %d, %Y",
    ]

    for fmt in known_formats:
        try:
            dt = datetime.strptime(raw, fmt)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
        except ValueError:
            continue

    try:
        dt = datetime.fromisoformat(raw)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
    except ValueError:
        return None


def categorize_from_path(path: str) -> str | None:
    p = normalize_path(path)
    if p.startswith("/news/health-nutrition/") or p == "/news/health-nutrition":
        return "Health and Nutrition News"
    if p.startswith("/news/innovative-science/") or p.startswith("/news/innovative-science-news/") or p == "/news/innovative-science-news":
        return "Innovative Science News"
    if p.startswith("/news/good-science-digest/") or p == "/news/good-science-digest":
        return "Good Science Digest"
    if p.startswith("/news/good-medicine/") or p == "/news/good-medicine":
        return "Good Medicine"
    if p.startswith("/news/news-releases/") or p == "/news/news-releases":
        return "News Releases"
    return None


def article_slug_from_url(url: str) -> str:
    path = normalize_path(urlparse(url).path)
    return path.strip("/").replace("/", "__") or "home"


def fetch_html(url: str, timeout: int = 30) -> str | None:
    try:
        response = SESSION.get(url, timeout=timeout)
        response.raise_for_status()
        return response.text
    except Exception:
        return None
