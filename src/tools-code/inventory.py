#!/usr/bin/env python3
"""
Phase 1 inventory — element library.

READ-ONLY. Walks an art corpus, records one row per image, and writes
catalog.csv next to this script. Never renames, moves, or modifies a source
file. See ../creative-skills/element-naming-spec.md for the framework.

Design choices (see spec §4 "Operational constraints"):
  - stdlib only + macOS `sips` for dimensions/alpha, so there's no Pillow install.
  - Resilient to Google Drive File Stream timeouts: every filesystem touch is
    wrapped, so one slow/unhydrated file can't kill the whole run.
  - Skips reel-build byproduct dirs and video/binary files by default.
  - Emits the schema columns blank, so the same CSV becomes the Phase 2/3
    rename worklist (fill new_name, then a later script applies it).

Usage:
    python3 inventory.py                      # default root (canonical Drive 01_ART)
    python3 inventory.py --root ~/Desktop/01_ART
    python3 inventory.py --no-hash            # skip sha256 (faster on Drive)
    python3 inventory.py --out my_catalog.csv
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import os
import subprocess
import sys
from pathlib import Path

# --- what counts as an element -------------------------------------------------

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".tif", ".tiff", ".heic", ".psd", ".gif", ".bmp"}

# Directory names (any depth) that are reel-build byproducts — never index.
SKIP_DIR_PREFIXES = ("verify", "frames", "bounds_", "sheets", "check", "cand", "gcand", "prev")
SKIP_DIR_EXACT = {".git", "node_modules", "__pycache__"}

DEFAULT_ROOT = os.path.expanduser(
    "~/Library/CloudStorage/GoogleDrive-finnastle@gmail.com/My Drive/01_ART"
)

# corpus_scope (spec: keep style-divergent / project-specific work out of the
# core keyword framework). A path is 'quarantined' if it lives in one of these
# chapters, or is a raw PSD layer-dump slice in sketches/.
QUARANTINE_DIRS = ("jesus-never-vaped", "correctional-service")
LAYER_DUMP_HINTS = ("_layer", "0_000", "0_0001s", "b__", "artboard")

# Heuristics for the audit flags (spec §0).
SOUP_NAME_LEN = 60          # filenames longer than this are likely keyword-soup
INSITU_MAX_BYTES = 500_000  # a transparent PNG under this is an in-situ candidate

FIELDNAMES = [
    # --- observed facts (filled by this script) ---
    "rel_path", "filename", "ext", "folder", "size_bytes",
    "width", "height", "aspect", "has_alpha", "sha256",
    "corpus_scope", "flags", "usability_guess",
    # --- schema targets (left blank for Phase 2/3 fill-in) ---
    "new_name", "type", "subject", "descriptor", "palette", "treatment",
    "series", "notes",
]


def corpus_scope_of(rel_path: str, filename: str) -> str:
    """Tag 'quarantined' for style-divergent / project chapters, else 'core'."""
    p = rel_path.lower()
    if any(f"{d}/" in p or p.startswith(f"{d}/") or f"/{d}/" in p for d in QUARANTINE_DIRS):
        return "quarantined"
    # raw PSD layer-dump slices in sketches/ are quarantined batch material
    if p.startswith("sketches/") and any(h in filename.lower() for h in LAYER_DUMP_HINTS):
        return "quarantined"
    return "core"


def should_skip_dir(name: str) -> bool:
    if name in SKIP_DIR_EXACT:
        return True
    # `_`-prefixed dirs are staging/meta (e.g. _dedupe-trash, _lost-rescan) — never index
    if name.startswith("_"):
        return True
    return any(name.lower().startswith(p) for p in SKIP_DIR_PREFIXES)


def sips_probe(path: str) -> tuple[int | None, int | None, str]:
    """Return (width, height, has_alpha) via macOS sips. Never raises."""
    try:
        out = subprocess.run(
            ["sips", "-g", "pixelWidth", "-g", "pixelHeight", "-g", "hasAlpha", path],
            capture_output=True, text=True, timeout=15,
        ).stdout
    except Exception:
        return None, None, ""
    w = h = None
    alpha = ""
    for line in out.splitlines():
        line = line.strip()
        if line.startswith("pixelWidth:"):
            w = _to_int(line.split(":", 1)[1])
        elif line.startswith("pixelHeight:"):
            h = _to_int(line.split(":", 1)[1])
        elif line.startswith("hasAlpha:"):
            alpha = line.split(":", 1)[1].strip()
    return w, h, alpha


def _to_int(s: str) -> int | None:
    try:
        return int(s.strip())
    except (ValueError, AttributeError):
        return None


def sha256_of(path: str) -> str:
    """Full-file sha256 for dedup. Never raises; returns '' on failure."""
    h = hashlib.sha256()
    try:
        with open(path, "rb") as f:
            for chunk in iter(lambda: f.read(1 << 20), b""):
                h.update(chunk)
        return h.hexdigest()
    except Exception:
        return ""


def audit_flags(filename: str, stem: str) -> list[str]:
    flags: list[str] = []
    lower = stem.lower()
    # null / device-default names
    if (lower.startswith(("img_", "untitled", "sketch", "screen shot", "artboard"))
            or stem.strip().isdigit()):
        flags.append("null-name")
    # keyword-soup
    if len(stem) > SOUP_NAME_LEN:
        flags.append("soup-name")
    # dirty strings
    if filename != filename.strip() or "  " in filename:
        flags.append("leading-trailing-space")
    return flags


def main() -> int:
    ap = argparse.ArgumentParser(description="Phase 1 read-only element inventory.")
    ap.add_argument("--root", default=DEFAULT_ROOT, help="corpus root to walk")
    ap.add_argument("--out", default=str(Path(__file__).with_name("catalog.csv")))
    ap.add_argument("--no-hash", action="store_true", help="skip sha256 (faster on Drive)")
    ap.add_argument("--no-probe", action="store_true",
                    help="skip sips dims/alpha — metadata only, no file hydration "
                         "(fast + safe first pass over Drive FUSE)")
    ap.add_argument("--probe-under", type=int, default=None, metavar="BYTES",
                    help="only probe (sips) + hash files at/under this size; larger "
                         "files stay metadata-only. Confirms alpha + dedup for the "
                         "rename-relevant subset without hydrating heavy source files.")
    args = ap.parse_args()

    root = os.path.expanduser(args.root)
    if not os.path.isdir(root):
        print(f"error: root not found: {root}", file=sys.stderr)
        return 2

    rows: list[dict] = []
    seen_hashes: dict[str, str] = {}   # sha256 -> first rel_path seen
    errors = 0

    for dirpath, dirnames, filenames in os.walk(root, onerror=lambda e: None):
        dirnames[:] = [d for d in dirnames if not should_skip_dir(d)]
        for name in filenames:
            ext = os.path.splitext(name)[1].lower()
            if ext not in IMAGE_EXTS:
                continue
            full = os.path.join(dirpath, name)
            rel = os.path.relpath(full, root)
            stem = os.path.splitext(name)[0]

            try:
                size = os.path.getsize(full)
            except Exception:
                errors += 1
                size = None

            # per-file heavy-pass gate: with --probe-under, only small files get
            # sips-probed and hashed; big source files stay metadata-only.
            if args.probe_under is not None:
                do_heavy = size is not None and size <= args.probe_under
                do_probe = do_hash = do_heavy
            else:
                do_probe = not args.no_probe
                do_hash = not args.no_hash

            if do_probe:
                w, h, alpha = sips_probe(full)
            else:
                w = h = None
                alpha = ""
            aspect = round(w / h, 3) if (w and h) else ""
            has_alpha = "yes" if alpha == "yes" else ("no" if alpha == "no" else "")

            digest = sha256_of(full) if do_hash else ""
            flags = audit_flags(name, stem)
            if digest:
                if digest in seen_hashes:
                    flags.append(f"dup-of:{seen_hashes[digest]}")
                else:
                    seen_hashes[digest] = rel

            # usability guess (spec §2). With --no-probe we can't confirm alpha,
            # so fall back to an ext+size heuristic and mark it a guess.
            usability = ""
            if not args.no_probe and has_alpha == "yes" and size is not None and size <= INSITU_MAX_BYTES:
                usability = "in-situ-ready"
            elif args.no_probe and ext == ".png" and size is not None and size <= INSITU_MAX_BYTES:
                usability = "in-situ-ready?"   # unconfirmed: PNG + small, alpha not probed
            elif ext in {".tif", ".tiff", ".psd"} or (size is not None and size > 3_000_000):
                usability = "source-only"

            scope = corpus_scope_of(rel, name)

            rows.append({
                "rel_path": rel,
                "filename": name,
                "ext": ext.lstrip("."),
                "folder": os.path.relpath(dirpath, root),
                "size_bytes": size if size is not None else "",
                "width": w or "",
                "height": h or "",
                "aspect": aspect,
                "has_alpha": has_alpha,
                "sha256": digest,
                "corpus_scope": scope,
                "flags": ";".join(flags),
                "usability_guess": usability,
                "new_name": "", "type": "", "subject": "", "descriptor": "",
                "palette": "", "treatment": "", "series": "", "notes": "",
            })

    with open(args.out, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
        writer.writeheader()
        writer.writerows(rows)

    # summary to stderr — the CSV is the deliverable
    total = len(rows)
    insitu = sum(1 for r in rows if r["usability_guess"].startswith("in-situ-ready"))
    core = sum(1 for r in rows if r["corpus_scope"] == "core")
    quar = sum(1 for r in rows if r["corpus_scope"] == "quarantined")
    flagged = sum(1 for r in rows if r["flags"])
    dupes = sum(1 for r in rows if "dup-of:" in r["flags"])
    print(f"catalog: {args.out}", file=sys.stderr)
    print(f"  {total} elements  |  {core} core / {quar} quarantined  |  "
          f"{insitu} in-situ-ready  |  {flagged} flagged  |  "
          f"{dupes} duplicate  |  {errors} read errors", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
