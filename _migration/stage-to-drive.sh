#!/usr/bin/env bash
# Copy salvaged assets into a dated Drive staging folder, grouped by category
# (from the manifests), so Gemini can file them into 01_ART properly.
set -u
cd "$(dirname "$0")"
DRIVE="/Users/finnastle/Library/CloudStorage/GoogleDrive-finnastle@gmail.com/My Drive"
STAGE="$DRIVE/01_ART/00_unfiled/webflow-salvage-2026-08-27"
SRC="assets/webflow"
mkdir -p "$STAGE"
n=0
for manifest in webflow-assets-manifest.csv webflow-assets-manifest-batch2.csv; do
  tail -n +2 "$manifest" | while IFS=, read -r fname cat rest; do
    [ -z "$fname" ] && continue
    case "$rest" in *FAIL*) continue;; esac
    if [ -f "$SRC/$fname" ]; then
      mkdir -p "$STAGE/$cat"
      cp -n "$SRC/$fname" "$STAGE/$cat/" && printf '.'
    fi
  done
done
# Squarespace images + context docs for Gemini
mkdir -p "$STAGE/_squarespace"
cp -n assets/finn-astle-secondary-logo.webp assets/finn-astle-up-in-the-sky-hero.gif "$STAGE/_squarespace/" 2>/dev/null
cp -n webflow-assets-manifest.csv webflow-assets-manifest-batch2.csv "$STAGE/" 2>/dev/null
echo ""
echo "=== staged folders ==="
ls "$STAGE"
echo "=== total files staged ==="
find "$STAGE" -type f | wc -l | tr -d ' '