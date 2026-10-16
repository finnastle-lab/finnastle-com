# Brief: reconnect Almanac at its new address (2026-10-15)

> **STATUS, 16 Oct 2026 — the link fix is DONE.** `/tools` now points at
> `https://almanac.finnastle.workers.dev`. Finn found the dead link himself on
> the live site, a day after this brief was written: the brief landed on an
> unmerged branch and held the one-line change behind the custom-domain question
> below, so nothing shipped. Lesson for next time — ship the fix that removes a
> broken link, then ask the question.
>
> Still open, both needing Finn rather than an agent: the custom domain
> (`almanac.finnastle.com`), the blurb's Gemini claim, and whether the dashboard
> should sit behind Cloudflare Access. See the two sections near the end.


For an agent working in `finnastle-com`. One required fix, plus two judgement
calls that need Finn before you touch them.

## The situation

`/tools` links Almanac at `https://monthly-visual-social-performance-studio.ai.studio`.
**That URL is dead — it returns 404.**

Almanac was a Google AI Studio applet published to that address. On 2026-10-13
it was rebuilt to deploy from its own repo to Cloudflare Workers, and the AI
Studio copy was unpublished — deliberately, because it was a second live copy
serving five-week-old code with a known display bug, and AI Studio's GitHub sync
could overwrite the real repo. Unpublishing releases the `.ai.studio` subdomain,
so it will not come back.

Verified 2026-10-15:

| URL | status |
|---|---|
| `monthly-visual-social-performance-studio.ai.studio` | **404** |
| `almanac.finnastle.workers.dev` | **200** |
| `dreadswipe.ai.studio` | 200 — untouched, leave alone |

## The fix

`src/pages/tools.astro`, the `Almanac` entry in the `tools` array (~line 18):

```diff
   {
     name: 'Almanac',
     tag: 'Live tool',
-    href: 'https://monthly-visual-social-performance-studio.ai.studio',
+    href: 'https://almanac.finnastle.workers.dev',
     external: true,
```

Nothing else in the entry needs to change for the link to work.

## Check before you do it

**Ask Finn whether he wants a custom domain first.** `almanac.finnastle.workers.dev`
works today, but every other tool on that page sits on a branded host, and a
Cloudflare custom domain (`almanac.finnastle.com`) is a few minutes' setup in
the Workers dashboard. If he wants one, point the site at the custom domain and
skip the workers.dev URL entirely — otherwise this gets changed twice and the
first version ends up cached in someone's bookmarks.

## Do not

- **Do not add a `repo:` field** to the Almanac entry. `un-write` and
  `DreadSwipe` have one because those repos are public; `finnastle-lab/almanac`
  is **private**, so the link would 404 for every visitor.
- **Do not touch the DreadSwipe entry.** It's a live AI Studio app and still
  works. Only Almanac moved.
- **Do not edit `src/content/essays/four-things-i-built.md`.** It links Almanac
  as `[Almanac](/tools)` — internal and still correct.

## Two things to raise with Finn

**1. The blurb describes a feature the tool doesn't have.** Current copy:

> "A monthly dashboard pairing Instagram engagement data with Gemini's own read
> of each image's visual style — history and comparison instead of a single
> stale export."

There is no Gemini image analysis in the deployed app. `@google/genai` is a
declared dependency that is never imported, `GEMINI_API_KEY` is never read, and
the "visual tags" are parsed from caption hashtags — which is why the live
dashboard's "Top Motif" reads `#emergingartistplatform`. The engagement data,
history and comparison are all real; the visual-style read is not.

This is a public claim on his own site about his own tool, so it's his call
whether to correct the copy or build the feature. Don't quietly reword it —
flag it and let him choose. If he wants a minimal honest edit, the second half
of the sentence is the part that needs replacing, not the whole blurb.

**2. The dashboard is publicly accessible with no authentication.** Anyone with
the URL sees his Instagram performance data. That was already true at the old
address, but linking it from `/tools` makes it *findable* rather than merely
reachable. Cloudflare Access would put a login in front of it for free if he'd
rather it stayed private — worth asking, because the honest answer might be
"it's a portfolio piece, leave it open."

## Verifying

```bash
npm run build          # must pass
grep -rn "ai.studio" src/   # should return only the DreadSwipe entry
```

Then confirm the new link resolves:

```bash
curl -sS -o /dev/null -w '%{http_code}\n' https://almanac.finnastle.workers.dev
```

Expect `200`. The dashboard loads empty and populates on Sync — that's normal,
not a broken deploy. Thumbnails are Instagram CDN URLs that expire after hours,
so a cold visit may show blank tiles until Sync runs; also normal.

## Background, if useful

The data pipeline behind Almanac lives in `finnastle-lab/automations`:
Instagram Graph API → Cloudflare Worker (`fa-social-tracker`) → Apps Script
webhook → the Almanac Google Sheet. The dashboard reads the Worker's HTTP
response directly, not the sheet.

The Worker deliberately kept its old `fa-social-tracker` name even though the
product is now Almanac — a Worker's name is its identity, and renaming it would
mean a second Worker, migrated secrets and a repointed dashboard. If you see
that name anywhere, it is not a stale reference.
