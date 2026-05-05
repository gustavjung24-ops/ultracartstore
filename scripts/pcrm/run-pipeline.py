#!/usr/bin/env python3
from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

STEPS = [
    "scripts/pcrm/fetch-category-pages.py",
    "scripts/pcrm/fetch-article-details.py",
    "scripts/pcrm/compare-with-local.py",
    "scripts/pcrm/build-import-drafts.py",
    "scripts/pcrm/sync-images.py",
]


def run_step(step: str) -> None:
    command = [sys.executable, str(ROOT / step)]
    print(f"[run] {' '.join(command)}")
    subprocess.run(command, cwd=ROOT, check=True)


def run() -> None:
    for step in STEPS:
        run_step(step)
    print("[ok] pipeline completed")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run full PCRM mirror pipeline")
    parser.parse_args()
    run()
