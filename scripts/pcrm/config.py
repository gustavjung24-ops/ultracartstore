from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MIRROR_DIR = ROOT / "pcrm_translated" / "mirror"
MIRROR_DIR.mkdir(parents=True, exist_ok=True)

BASE_PCRM = "https://www.pcrm.org"
BASE_SITE_VI = "https://www.yhoclanhmanh.com"

CATEGORY_URLS = {
    "Health and Nutrition News": f"{BASE_PCRM}/news/health-nutrition",
    "Innovative Science News": f"{BASE_PCRM}/news/innovative-science-news",
    "Good Science Digest": f"{BASE_PCRM}/news/good-science-digest",
    "Good Medicine": f"{BASE_PCRM}/news/good-medicine",
    "News Releases": f"{BASE_PCRM}/news/news-releases",
}

CATEGORY_TO_VI = {
    "Health and Nutrition News": "Tin sức khỏe và dinh dưỡng",
    "Innovative Science News": "Tin khoa học đổi mới",
    "Good Science Digest": "Bản tin khoa học",
    "Good Medicine": "Y học tốt",
    "News Releases": "Thông cáo báo chí",
}

SOURCE_JSON_FILES = [
    ROOT / "pcrm_translated" / "generated_source_pages.json",
    ROOT / "pcrm_translated" / "translated_all.json",
    ROOT / "pcrm_translated" / "extracted_raw.json",
]

DEFAULT_USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
)


@dataclass(frozen=True)
class MirrorFlags:
    safe_mode: bool
    allow_full_body_mirror: bool
    enable_image_download: bool


def env_bool(name: str, default: bool) -> bool:
    raw = os.getenv(name)
    if raw is None:
        return default
    return raw.strip().lower() in {"1", "true", "yes", "on"}


def get_flags() -> MirrorFlags:
    return MirrorFlags(
        safe_mode=env_bool("SAFE_MODE", True),
        allow_full_body_mirror=env_bool("ALLOW_FULL_BODY_MIRROR", False),
        enable_image_download=env_bool("ENABLE_IMAGE_DOWNLOAD", False),
    )


def validate_flags(flags: MirrorFlags) -> None:
    if flags.safe_mode and flags.allow_full_body_mirror:
        raise ValueError(
            "SAFE_MODE=true conflicts with ALLOW_FULL_BODY_MIRROR=true. "
            "Set exactly one mode for content body behavior."
        )
