# Brief: genuine logos and the four missing heroes for /studio

**For:** a Claude Code session running on Finn's own computer, which has the open
web. The cloud session can only reach npm. Wikimedia, brand sites and Finn's
Drive are blocked for binaries, so it can't fetch these. Every URL in this brief
came from Finn and has **not** been opened or verified by the cloud session — treat
each one as a lead to check, not a confirmed file.

## Context

finnastle.com is an Astro site. `/studio` lists 14 cases (`src/content/studio/*.md`).
Each case names its logos by key in `logos: [...]`. The page loads
`src/assets/studio/logos/<key>.svg` and inlines it with every fill forced to
`currentColor`, so a mark renders black in light mode and white in dark. That means a
logo only needs the right **shapes**; its colours don't matter. A case shows marks
only when *every* key it lists has a file; otherwise the whole row falls back to the
brand name in type.

Already in the repo, sourced from Simple Icons / SVG Logos on npm: `netflix`,
`coca-cola`, `amazon-alexa`, `afterpay`, `google-assistant`. Plus `inke`, knocked out
of the window-signage photograph that is already the Inke hero (`inke.png`, 1259×584
transparent). That one is genuine vinyl lettering, not a redraw, but it is
photo-derived — if Finn turns up the master file, swap it.

## Start here: the files already on Finn's Mac

Finn has downloaded assets for this job. **Check these before searching the web for
anything** — they are genuine artwork from the jobs themselves, which beats any
third-party copy. Ask him where he put them (likely `~/Downloads` or `~/Desktop`) and
confirm each file with him before using it.

Finn sent five files to the cloud session on 15 Oct and they were checked there:

| What he sent | Outcome |
|---|---|
| **Coca-Cola × Alexa** key frame, 2000×1125 | Already in the repo as `coca-cola-alexa.webp` at 2560×1440 — the identical image, larger. Nothing to do |
| **Inke** window signage, 2000×1125 | Already in the repo as `inke.webp` at 2560×1440. The `inke` logo key was knocked out of the repo copy. Nothing to do |
| **Welly** orange sachet, 1000×1000 | New. Square, so it crops hard in the hero slot. Candidate only |
| **Welly Kids** mobile screens, 2000×1125 | New. The kids tone of voice |
| **Welly** adult mobile screens, 2000×1125 | New. The adult tone of voice, with **& NOTHING ELSE** legible on the packs |

So the only open Welly question is which hero he picks — see Task 3. The three new
Welly files are not in the repo; ask Finn to re-send whichever one he chooses.

Note on the pack design: it puts the ingredients list on the front with nothing else
on it, under the line **& nothing else**. The orange sachet shot is where that reads
most clearly, but it is square and the hero slot is 59rem × 34rem.

## Task 1: logos

Needed (key → brand). Twelve left:

| key | brand | note |
|---|---|---|
| `agl` | AGL Energy | Unlocks the AGL × Netflix row too |
| `youi` | Youi (Australian insurer) | |
| `7-eleven` | 7-Eleven | The stripes and the "7-ELEVEn" type, all in one colour |
| `welly` | Welly (Finn's brand work) | **Still open.** The Welly mark appears in his files only at ~110px wide, in site navs and on angled foil — too small and too distorted to knock out. Ask him for the master file from the branding job |
| `grove-distillery` | The Grove Distillery (WA) | |
| `tekspace` | Tekspace | |
| `smiling-mind` | Smiling Mind | Unlocks the Google Assistant row |
| `victoria-police` | Victoria Police | **Decided: the wordmark, not the star badge.** |
| `woolworths` | Woolworths | The apple "W" mark |
| `g8-education` | G8 Education | |
| `city-of-melbourne` | City of Melbourne | New case added 16 Oct. Council marks are public-domain-ish but check usage terms |
| `det` | Department of Education and Training | New case added 16 Oct. State-level DET, home of the ARC learning portal. Finn has not named the state, so the write-up says "the state Department" — confirm before chasing a mark |

Where to look, in this order:
1. Finn's own files: the downloads above first, then agency folders and brand
   guidelines. Welly and Inke are settled by his downloads — don't go to the web
   for those two.
2. The brand's own site: the header logo is usually an inline `<svg>` or a `.svg` file.
3. Wikimedia Commons (`File:<Brand> logo.svg`), then Brandfetch or worldvectorlogo.

Rules:
- **Genuine artwork only.** Never trace, redraw or approximate a logo. If you can't
  find a real one, leave that key out and list it for Finn.
- SVG preferred. If only a raster exists, use a transparent PNG at least 400px wide.
  Never use one with a white box behind it.
- Clean each SVG:
  - remove any background rectangle;
  - flatten it to a single colour;
  - **make sure no shape relies on a second colour to be visible.** A white
    knockout drawn on top of a filled shape vanishes when everything becomes one
    colour. Convert those to real holes (fill-rule evenodd or a boolean subtract)
    or drop them.
  - Crop the viewBox tight to the artwork.
- Save as `src/assets/studio/logos/<key>.svg`. The key must match exactly.
- **Pulling a mark off a packaging photo:** a logo key needs the mark on transparency,
  so a crop out of a photograph usually won't do — it carries the pack colour behind
  it, and the brief's no-white-box rule applies to any background. Check what Finn's
  Welly and Inke files actually are first. If they're vector or layered artwork, use
  them. If they're only flat photographs, ask him for the master file from the job
  before anything else; he art-directed both, so he has one. A clean knockout off a
  flat-colour pack is acceptable as a fallback. Tracing or redrawing the wordmark is
  not, no matter how close it looks.

## Task 2: heroes

Four cases have no hero image. Finn has supplied starting points for three of them.

**Rules for all four:**
- **Show Finn the candidates and let him choose.** Never commit a hero he hasn't seen.
- Genuine artwork and real screenshots only — nothing mocked up or recreated.
- Landscape, ideally 2560×1440 (16:9); minimum 1600px wide. If the best genuine
  option is smaller, show it to Finn with its dimensions and let him decide.
- Save as `src/assets/studio/<case-file-name>.webp` (or .jpg/.png), then set
  `hero: <filename>` in that case's frontmatter.

### `google-assistant-smiling-mind.md`

Finn's sources — check all three and pull the best image from each:

- https://mumbrella.com.au/versa-and-smiling-mind-help-australians-access-mindfulness-in-isolation-641846
- https://www.thestable.com.au/versa-smiling-mind-google-assistant-provides-the-meditation-antidote-to-2020/
- https://www.ahead.ie/userfiles/images/AT%20Hive/AT%20Hive%20-%20screenshots/smiling%20app%20image.png

Notes: the first two are trade-press articles about this exact VERSA × Smiling Mind
Google Assistant work, so their lead images are the strongest fit. The ahead.ie file
is a third-party rehost of an app screenshot — confirm it is actually Smiling Mind
and look for the original before using it; a phone screenshot is portrait and may
not crop to a usable landscape hero.

Also ask Finn whether he kept any screenshots of the Google Assistant Action
himself. He mentioned he might; his own would beat anything found online.

### `victoria-police-blue-space.md`

**The site is live again: https://www.bluespacewellbeing.com.au/**

The existing rule stands: **public images only, never the internal VERSA flyer.**

Finn's picks:
- https://www.bluespacewellbeing.com.au/sites/default/files/2026-03/111240-2.jpg?width=2048
  — Finn: "this image is great". Lead candidate.
- https://www.bluespacewellbeing.com.au/sites/default/files/2024-09/Bluespace_Ripple2_Twitter.png
  — a Twitter card, so probably around 1200px wide. Check before offering it.

Finn also wants mobile shots of the live site's content. Open
bluespacewellbeing.com.au at a phone viewport, capture a few screens of real content
(not the cookie banner or an empty nav), and include them in the candidates you show
him. A UX-writing case is well served by the writing being visible on screen.

### `woolworths-olive.md`

Finn's sources:
- https://www.itnews.com.au/news/meet-olive-woolworths-conversational-ai-platform-529353
- https://i.nextmedia.com.au/News/20190809081016_Olive_demo.jpg — the Olive demo
  screenshot from that article; the chat UI, which is what the case is about.
- https://woolworthsgroup.scene7.com/is/image/woolworthsgroupltd/OLIVE%20WAVING?ts=1782785423652&dpr=off
  — the Olive character art from Woolworths Group's own image server. Scene7 takes
  size parameters, so try appending `&wid=2560` for a larger render if the default
  comes back small.

Ask Finn whether he kept screenshots of Olive from the project. He mentioned he
might; his own would beat anything found online.

### `tekspace.md`

No source supplied. Cyber Lab content — a report page, a chart from one of the three
benchmark reports, or a social post Finn wrote. Tekspace is his current in-house
role, so ask him for the asset rather than scraping one.

## Task 3: Welly heroes — done, nothing to do

Settled on 15 Oct and already committed. Recorded here so nobody redoes it:

- `welly.webp` is now the orange sachet, the shot where the ingredients-as-hero pack
  design and **& nothing else** read clearly.
- `welly-kids.jpg` and `welly-adults.jpg` sit under the write-up through the new
  `gallery:` frontmatter field, one per tone of voice, full width and stacked so the
  screens stay legible. The field takes `- src: <filename>` with an optional
  `caption:`, resolves out of `src/assets/studio/`, and is available to any case that
  needs more than one image.

Resolution is sorted too. The first copy of the sachet was 1000x1000, too small for
the slot; Finn supplied the 2000x2000 original the same day and it is now
`welly.jpg`. It is a genuine original, not an upscale - 68.9 per-pixel edge energy
against 17.5 for a 2x Lanczos of the small one. Kept as JPEG rather than re-encoded
to WebP, since Astro converts at build and a second lossy pass would only lose
detail.

If a hero ever looks soft, check the source size before reaching for a filter.
Upscaling was tried on the small copy and made it worse: no added detail, plus a
white halo around the pack type.
- Inke and Coca-Cola × Alexa already hold the best version of what Finn sent. Leave
  both alone.

## Check before committing

```bash
npm run build
npm run preview   # http://localhost:4321/studio
```

Check that:
- every logo shows in both light and dark mode (the toggle is top right);
- no logo shows as a solid blob or has missing parts;
- the AGL × Netflix and Google Assistant × Smiling Mind rows show both marks
  (each row needs *both* of its keys present before either appears).

## Commit and push

Work on branch `claude/bold-fermat-4anj7j`:

```bash
git fetch origin
git checkout claude/bold-fermat-4anj7j
git pull origin claude/bold-fermat-4anj7j
npm install
```

That branch carries the five logos already in the repo and this brief. The older
`claude/tender-bardeen-rimzmn` branch is finished — its pull request is closed and
merged. Don't push there.

Commit only:
- `src/assets/studio/logos/*`;
- the new hero files;
- the case `.md` files whose `hero:` changed.

Then:

```bash
git commit -m "Studio: genuine brand logos and remaining case heroes"
git push -u origin claude/bold-fermat-4anj7j
```

Then tell Finn which keys are still missing, and the pixel dimensions of every hero
you committed.
