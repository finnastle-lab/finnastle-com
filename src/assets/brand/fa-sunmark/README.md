# FA sunmark — canonical vector

Confirmed by Finn Astle on 2026-10-22. This folder is the website repo's copy.
Two others exist and must stay byte-identical:

- GitHub: `finnastle-lab/fa-design-system/assets/` (the cross-tool source of truth)
- Google Drive: `00_SYSTEM/brand-assets/` (Gemini's reach)

| File | Artwork | Use on |
| --- | --- | --- |
| `fa-sunmark-dark.svg` | Black mark, transparent ground | Light backgrounds |
| `fa-sunmark-light.svg` | White mark, transparent ground | Dark backgrounds |

"Dark" and "light" name the mark colour, not the page theme.

Both are 458 × 319 viewBox. Both have a genuinely transparent ground: the only
full-bleed rect in either file sits inside a `clipPath` and renders nothing.

SHA-256 (check before trusting a copy):

- dark  `f370477fea88f421ea58445779e70903672581082a012205ea148df745b11278`
- light `6eb3d8b95ff3239e1b7f11ec9b9f847fa4a1cb39b694086f10ad82b1ed8ae233`

Raw URLs for agents without local access:

- https://raw.githubusercontent.com/finnastle-lab/fa-design-system/main/assets/fa-sunmark-dark.svg
- https://raw.githubusercontent.com/finnastle-lab/fa-design-system/main/assets/fa-sunmark-light.svg

## Rules

Copy the file. Never redraw it, never trace it again, never substitute a font or
a generated lookalike, never stretch, crop or colour-filter it. Pick the variant
that contrasts with the actual background rather than recolouring one.

Reference with an `<img>` and proportional sizing (`height: auto` or
`object-fit: contain`). Alt text when the mark carries identity, empty alt when
decorative.

## How this site uses it

`fa-sunmark-dark.png` is a direct rasterisation of `fa-sunmark-dark.svg`, not a
trace or a redraw. Its 1280 × 948 transparent canvas reproduces the previous
asset's spacing: the proportional 1116px-wide mark starts at (82, 86). That
keeps the rendered mark the same apparent size at the three widths already in
use — 26px in the nav, 18px in the footer, 64px as the home stamp — so the
switch to canonical artwork changes no layout.

The PNG exists because the site recolours the mark by filter rather than by
swapping files. `global.css` sets `--mark-inv` to 0 in light and 1 in dark, and
`.mark` applies `brightness(0) invert(var(--mark-inv))`. One black-ink source
therefore covers both themes, and it runs through Astro's `getImage` WebP
pipeline, which does not process SVG.

`fa-sunmark-light.svg` ships as the canonical pair's other half. The site does
not currently consume it. Whether display-size and over-photography uses should
swap to it instead of filtering the dark variant is open; see decision 06 in
`2026-10-25-fa-design-system-v3-decisions.md`.

The SVGs are the master. If a raster ever disagrees with one, re-export rather
than editing the raster.

## Favicons

Favicons derive from these: fit the whole mark inside a square canvas with
transparent padding, don't distort to fill. Test at 16px and 32px.

**Decision 05, taken 2026-10-25: transparent.** The favicons are rasterised
from these SVGs with cairosvg, fitted to 87.5% of each square canvas with
transparent padding, and never distorted to fill. PR #39's opaque Paper ground
is dropped.

Both variants ship, which is where decision 06 lands in practice: the black
mark serves light browser chrome, the white mark serves dark, selected by
`media="(prefers-color-scheme: ...)"` on the `rel="icon"` links. Those links
are ordered with the black mark last, because `media` on `rel="icon"` is
honoured unevenly and a browser that ignores it takes the final link.
`favicon.ico` carries 16, 32 and 48px frames of the black mark as the fallback.

One exception: `apple-touch-icon.png` keeps an opaque Paper ground at 180px.
iOS composites it onto the home screen, where a transparent ground renders
black.

To regenerate, `scripts/make-favicons.py`.

## Superseded

All four moved to `~/Desktop/99_ARCHIVE/superseded-brand-marks/` on 2026-10-22:

- `FA Sun Signature - raw trace (needs simplification).svg`
- `FA Sun Logo (sourced from astlecreative.com).png` — raster scrape off the old site
- `FA signature (blk).png` / `FA signature (white).png` — the 102×71 bitonal scans
  that `frame-hero.py` used to read

Still live and still raster, owned by the website repo rather than this folder:

- `public/favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`,
  `apple-touch-icon.png` — all still derived from the old raster, pending
  decision 05

`src/assets/elements/print-monogram-square-framed.png|.webp` is the same artwork
at 640×474. `Nav.astro`, `BaseLayout.astro` and `index.astro` no longer import
it; it stays in the element library.

## Consumers already switched

- `00_SYSTEM/agentic-development/framing/frame-hero.py` — reads 2048px PNG
  rasterisations of these SVGs, generated with cairosvg. Scale them down, never
  up. To regenerate:

      python3 -c "import cairosvg; cairosvg.svg2png(url='fa-sunmark-dark.svg', \
        write_to='fa-sunmark-dark-2048.png', output_width=2048)"

- `src/components/Nav.astro`, `src/layouts/BaseLayout.astro`,
  `src/pages/index.astro` — all three import `fa-sunmark-dark.png` (PR #39).

---

This file replaces two documents that both claimed this path: the 18-line
rasterisation note written by PR #39, and the 69-line canonical-vector note
written on 2026-10-22 and never committed. Neither was wrong; they answered
different questions at the same address. Both are folded in above.
