---
title: Redirect Map — finnastle.com migration
status: active
created: 2026-08-27
source: crawl of live finnastle.com (Squarespace), 27 Aug 2026
consumed-by: Astro build (`astro.config` redirects) + Cloudflare Redirect Rules
links: [2026-08-27-site-migration-scope-v2.md]
---

# Redirect Map — finnastle.com

**Finding (27 Aug 2026 crawl):** the live site is a **single page**. `sitemap.xml`
lists one URL; the whole site is one about/portfolio statement served at both `/`
and `/finnastle`. No blog, no nested paths, no `/studio`. So there is almost no
URL structure to preserve — the ranking asset is the domain + name, which the
migration never touches.

## A · Internal redirects (old finnastle.com paths → new site)

| Old URL | New URL | Type | Note |
|---|---|---|---|
| `finnastle.com/` | `/` | keep | Home. New Astro home replaces it 1:1. |
| `finnastle.com/finnastle` | `/` | **301** | Squarespace's duplicate named-home path → collapse to canonical root. |

That's the entire internal map. (New pages — `/studio`, `/fast-as` — are *additions*, not migrations; no redirect needed.)

## B · Host canonicalisation (decide once)

Current indexed host is **`www.finnastle.com`**. Pick one canonical host; 301 the other.
- **Recommended:** canonical = apex `finnastle.com`, 301 `www` → apex (cleaner for a static site; Google consolidates ranking across the 301).
- Alternative: keep `www` as canonical to avoid moving the currently-indexed URL. Either is fine; decide before cutover so it's set from day one.

## C · Other-domain redirects (Phase 4 — handled at Cloudflare, not in Astro)

| Domain / path | Target | Type |
|---|---|---|
| `astlecreative.com` (apex + www) | `finnastle.com/studio` | 301 |
| `astlecreative.com/fearlessanswer` | `finnastle.com/studio/fearless-answers` | 301 |
| `finnastlecreative.com` | `finnastle.com` | 301 |
| `fineasscreative.com` | — (burner: parked, no redirect) | — |

## Open items
- **`/fearlessanswer` destination — DECIDED (29 Aug 2026):** `finnastle.com/studio/fearless-answers`. Built from the actual salvaged philosophy/bio page content, not a redirect to home.
- **www vs apex** canonical (section B).
- **Webflow property — DECIDED (27 Aug 2026): retire it.** New finnastle.com absorbs its role (this is the whole point — consolidate, cut cost, rebuild on a controlled baseline). ⚠️ **Salvage first:** the current finnastle.com is text-only, so `finnastleworld.webflow.io` is where the *visual/portfolio* work lives — export/download all copy + image assets **before** cancelling. Check if it's on a paid Webflow plan (another cost to cut). Consequence for structure: the new site needs a **visual-work surface** (`/work`), which the current text-only site lacks.
