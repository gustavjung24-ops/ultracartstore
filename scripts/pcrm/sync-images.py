#!/usr/bin/env python3
from __future__ import annotations

import argparse
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from scripts.pcrm.common import load_json, normalize_path, normalize_url, save_json
from scripts.pcrm.config import MIRROR_DIR, get_flags

try:
    import requests  # type: ignore[import-not-found]
except Exception:  # pragma: no cover
    requests = None

IN_DRAFTS = MIRROR_DIR / "import_drafts.json"
OUT_DRAFTS = MIRROR_DIR / "import_drafts_with_images.json"
DOWNLOAD_DIR = MIRROR_DIR / "images"


def file_name_from_url(url: str) -> str:
    path = normalize_path(urlparse(url).path)
    name = path.split("/")[-1] or "image.jpg"
    return name


def run() -> None:
    flags = get_flags()
    payload = load_json(IN_DRAFTS, {})
    items = payload.get("items", []) if isinstance(payload, dict) else []

    if not flags.enable_image_download:
        print("[skip] ENABLE_IMAGE_DOWNLOAD is false; keeping remote sourceImageUrl only")
        save_json(OUT_DRAFTS, payload)
        return

    if requests is None:
        raise RuntimeError("requests package is required for image download mode")

    DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)

    for item in items:
        if not isinstance(item, dict):
            continue
        source_image_url = normalize_url(str(item.get("sourceImageUrl", "")))
        if not source_image_url:
            continue

        file_name = file_name_from_url(source_image_url)
        output_path = DOWNLOAD_DIR / file_name

        try:
            response = requests.get(source_image_url, timeout=30)
            response.raise_for_status()
            output_path.write_bytes(response.content)
            item["localImagePath"] = str(output_path.relative_to(Path(__file__).resolve().parents[2]))
        except Exception:
            item["localImagePath"] = ""

    payload["items"] = items
    save_json(OUT_DRAFTS, payload)
    print(f"[ok] wrote {OUT_DRAFTS}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Optional image downloader for mirror drafts")
    parser.parse_args()
    run()
