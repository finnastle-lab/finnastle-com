#!/usr/bin/env bash
# Batch 2: reconstruct FULL-RES source URLs from Webflow thumbnail URLs
# (strip -p-130x130q80, use true extension). Falls back to the thumbnail if the
# full-res original is gone. Input lines: <trueext>\t<thumb-url>, with #CAT: markers.
set -u
cd "$(dirname "$0")"
DEST="assets/webflow"
mkdir -p "$DEST"
MANIFEST="webflow-assets-manifest-batch2.csv"
echo "filename,category,resolution,status,bytes,source_url" > "$MANIFEST"
SITE="65fb97bf71a790050ff68f22"
cat=""; ok=0; fail=0

dl () { curl -sSL -A "Mozilla/5.0" --max-time 60 -o "$2" -w "%{http_code}" "$1" 2>/dev/null; }

while IFS= read -r line; do
  [ -z "$line" ] && continue
  case "$line" in
    \#CAT:*) cat="${line#\#CAT:}"; continue ;;
    \#*) continue ;;
  esac
  trueext="${line%%$'\t'*}"
  url="${line#*$'\t'}"
  path="${url##*/}"                       # <assetid>_<name>[-p-130x130q80].<thumbext>
  noext="${path%.*}"
  noext="${noext%-p-130x130q80}"          # strip thumbnail suffix if present
  assetid="${noext%%_*}"
  short="${assetid: -7}"
  name="${noext#*_}"                       # encoded name
  decoded=$(printf '%b' "${name//%/\\x}")
  clean=$(printf '%s' "$decoded" | tr ' /' '--' | tr -d '()' | tr -s '-')
  out="$DEST/${short}_${clean}.${trueext}"

  full="https://cdn.prod.website-files.com/${SITE}/${assetid}_${name}.${trueext}"
  code=$(dl "$full" "$out"); res="full"
  if [ "$code" != "200" ] || [ ! -s "$out" ]; then
    # try full-res on the legacy host
    alt="https://uploads-ssl.webflow.com/${SITE}/${assetid}_${name}.${trueext}"
    code=$(dl "$alt" "$out"); res="full"
  fi
  if [ "$code" != "200" ] || [ ! -s "$out" ]; then
    # last resort: the thumbnail we were given
    code=$(dl "$url" "$out"); res="THUMB-130px"
  fi

  if [ "$code" = "200" ] && [ -s "$out" ]; then
    bytes=$(wc -c < "$out" | tr -d ' '); ok=$((ok+1))
    printf '  ok  %-11s %s\n' "$res" "${short}_${clean}.${trueext}"
    echo "${short}_${clean}.${trueext},$cat,$res,ok,$bytes,$full" >> "$MANIFEST"
  else
    fail=$((fail+1)); rm -f "$out"
    printf '  FAIL %-6s %s\n' "$code" "${short}_${clean}.${trueext}"
    echo "${short}_${clean}.${trueext},$cat,-,FAIL_$code,0,$full" >> "$MANIFEST"
  fi
done < webflow-urls-batch2.txt

echo "----"
echo "downloaded: $ok   failed: $fail"