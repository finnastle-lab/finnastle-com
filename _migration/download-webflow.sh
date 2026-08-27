#!/usr/bin/env bash
# Downloads every Webflow asset URL in webflow-urls.txt into assets/webflow/,
# with unique human-readable filenames, and writes a manifest.
set -u
cd "$(dirname "$0")"
DEST="assets/webflow"
mkdir -p "$DEST"
MANIFEST="webflow-assets-manifest.csv"
echo "filename,category,status,bytes,source_url" > "$MANIFEST"

cat=""
ok=0; fail=0
while IFS= read -r line; do
  [ -z "$line" ] && continue
  case "$line" in
    \#CAT:*) cat="${line#\#CAT:}"; continue ;;
    \#*) continue ;;
    https://*) ;;
    *) continue ;;
  esac
  url="$line"
  base="${url##*/}"                 # <assetid>_<name>.<ext>
  hash="${base%%_*}"                # assetid
  short="${hash: -7}"               # last 7 chars -> uniqueness
  rest="${base#*_}"                 # <name>.<ext> (percent-encoded)
  decoded=$(printf '%b' "${rest//%/\\x}")            # decode %XX
  clean=$(printf '%s' "$decoded" | tr ' /' '--' | tr -d '()' | tr -s '-')
  fname="${short}_${clean}"
  out="$DEST/$fname"
  code=$(curl -sSL -A "Mozilla/5.0" --max-time 60 -o "$out" -w "%{http_code}" "$url" 2>/dev/null)
  if [ "$code" = "200" ] && [ -s "$out" ]; then
    bytes=$(wc -c < "$out" | tr -d ' ')
    ok=$((ok+1))
    printf '  ok  %-6s %s\n' "$code" "$fname"
    echo "$fname,$cat,ok,$bytes,$url" >> "$MANIFEST"
  else
    fail=$((fail+1))
    printf '  FAIL %-6s %s\n' "$code" "$fname"
    echo "$fname,$cat,FAIL_$code,0,$url" >> "$MANIFEST"
    rm -f "$out"
  fi
done < webflow-urls.txt

echo "----"
echo "downloaded: $ok   failed: $fail"
echo "total size: $(du -sh "$DEST" | cut -f1)"
