#!/usr/bin/env python3
"""Convert Finn's Medium RSS feed into Astro essay markdown files."""
import re, html, xml.etree.ElementTree as ET, datetime, pathlib

FEED = "medium-feed.xml"
OUT = pathlib.Path("../src/content/essays")
OUT.mkdir(parents=True, exist_ok=True)

# on-territory -> publish; others migrated as drafts (preserved, hidden)
PUBLISH_SLUGS = {"art-meets-ai-automated-image-generation-with-a-fine-artist-touch"}

ns = {"content": "http://purl.org/rss/1.0/modules/content/"}
tree = ET.parse(FEED)

def html_to_md(h):
    h = re.sub(r"<(figure|figcaption)[^>]*>", "", h)
    h = re.sub(r"</(figure|figcaption)>", "\n", h)
    h = re.sub(r'<img[^>]*src="([^"]+)"[^>]*>', r"![](\1)\n", h)
    for i in range(1, 7):
        h = re.sub(rf"<h{i}[^>]*>(.*?)</h{i}>", lambda m, i=i: f"\n{'#'*i} {m.group(1)}\n", h, flags=re.S)
    h = re.sub(r"<blockquote[^>]*>(.*?)</blockquote>", lambda m: "\n> " + m.group(1).strip() + "\n", h, flags=re.S)
    h = re.sub(r'<a[^>]*href="([^"]+)"[^>]*>(.*?)</a>', r"[\2](\1)", h, flags=re.S)
    h = re.sub(r"<(strong|b)>(.*?)</\1>", r"**\2**", h, flags=re.S)
    h = re.sub(r"<(em|i)>(.*?)</\1>", r"*\2*", h, flags=re.S)
    h = re.sub(r"<li[^>]*>(.*?)</li>", r"- \1\n", h, flags=re.S)
    h = re.sub(r"</p>", "\n\n", h)
    h = re.sub(r"<[^>]+>", "", h)       # strip remaining tags
    h = html.unescape(h)
    h = re.sub(r"\n{3,}", "\n\n", h).strip()
    return h

def slugify(link):
    seg = link.split("?")[0].rstrip("/").split("/")[-1]
    return re.sub(r"-[0-9a-f]{6,}$", "", seg)

for item in tree.findall(".//item"):
    title = item.findtext("title", "").strip()
    link = item.findtext("link", "").strip()
    pub = item.findtext("pubDate", "").strip()
    content = item.find("content:encoded", ns)
    body = html_to_md(content.text or "") if content is not None else ""
    dt = datetime.datetime.strptime(pub[:25], "%a, %d %b %Y %H:%M:%S").date()
    slug = slugify(link)
    draft = slug not in PUBLISH_SLUGS
    # description = first non-empty text line, trimmed
    desc = next((l for l in body.splitlines() if l and not l.startswith(("!", "#", ">"))), "")[:180]
    fm = [
        "---",
        f'title: {title!r}',
        f'description: {desc!r}',
        f"pubDate: {dt.isoformat()}",
        f"canonicalUrl: {link.split('?')[0]}",
        f"draft: {'true' if draft else 'false'}",
        "syndicatedFrom: medium",
        "---", "",
    ]
    fname = OUT / f"{dt.isoformat()}-{slug}.md"
    fname.write_text("\n".join(fm) + body + "\n", encoding="utf-8")
    print(f"{'draft ' if draft else 'LIVE  '} {fname.name}")
