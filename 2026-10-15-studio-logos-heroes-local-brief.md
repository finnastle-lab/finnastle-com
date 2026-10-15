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
`coca-cola`, `amazon-alexa`, `afterpay`, `google-assistant`.

## Task 1: logos

Needed (key → brand):

| key | brand | note |
|---|---|---|
| `agl` | AGL Energy | Unlocks the AGL × Netflix row too |
| `youi` | Youi (Australian insurer) | |
| `7-eleven` | 7-Eleven | The stripes and the "7-ELEVEn" type, all in one colour |
| `welly` | Welly (Finn's brand work) | **Ask Finn first** — he may have the master file from the branding job. Least likely to be online |
| `inke` | Inke (Finn's brand work) | **Ask Finn first** — as above |
| `grove-distillery` | The Grove Distillery (WA) | |
| `tekspace` | Tekspace | |
| `smiling-mind` | Smiling Mind | Unlocks the Google Assistant row |
| `victoria-police` | Victoria Police | **Decided: the wordmark, not the star badge.** |
| `woolworths` | Woolworths | The apple "W" mark |
| `g8-education` | G8 Education | |

Where to look, in this order:
1. Finn's own files: agency folders and brand guidelines. Start here for Welly and
   Inke — ask him before searching the web for those two.
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
