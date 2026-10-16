# Brief: genuine logos and the four missing heroes for /studio

**For:** a Claude Code session running on Finn's own computer, which has the open
web. The cloud session can only reach npm. Wikimedia, brand sites and Finn's
Drive are blocked for binaries, so it can't fetch these.

## Context

finnastle.com is an Astro site. `/studio` lists 14 cases (`src/content/studio/*.md`).
Each case names its logos by key in `logos: [...]`. The page loads
`src/assets/studio/logos/<key>.svg` and inlines it with every fill forced to
`currentColor`, so a mark renders black in light mode and white in dark. That means a
logo only needs the right **shapes**; its colours don't matter. If any key in a case
is missing, the whole row falls back to the brand name in type.

Already in the repo, sourced from Simple Icons / SVG Logos on npm: `netflix`,
`coca-cola`, `amazon-alexa`, `afterpay`, `google-assistant`.

## Task 1: logos

Needed (key → brand):

| key | brand | note |
|---|---|---|
| `agl` | AGL Energy | Unlocks the AGL × Netflix row too |
| `youi` | Youi (Australian insurer) | |
| `7-eleven` | 7-Eleven | The stripes and the "7-ELEVEn" type, all in one colour |
| ~~`welly`~~ | Done | |
| `inke` | Inke | Ask Finn: as above |
| `grove-distillery` | The Grove Distillery (WA) | |
| `tekspace` | Tekspace | |
| `smiling-mind` | Smiling Mind | Unlocks the Google Assistant row |
| `victoria-police` | Victoria Police | The star badge or the wordmark; ask Finn which |
| ~~`woolworths`~~ | Done | |
| `g8-education` | G8 Education | |

Where to look, in this order:
1. Finn's own files: agency folders and brand guidelines.
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

These four cases have no hero image:

| case file | what would work |
|---|---|
| `tekspace.md` | Cyber Lab content: a page or social post Finn wrote |
| `google-assistant-smiling-mind.md` | The Action on a phone or Nest Hub, or a Smiling Mind × Google key visual |
| `victoria-police-blue-space.md` | **Not** the internal VERSA flyer. Only a public Police Care Australia / Blue Space image |
| ~~`woolworths-olive.md`~~ | Done: Olive in the app |

Rules:
- Show Finn the candidates and let him choose.
- Hero images should be landscape, ideally 2560×1440 (16:9); minimum 1600px wide.
- Save each as `src/assets/studio/<case-file-name>.webp` (or .jpg/.png). Then set
  `hero: <filename>` in that case's frontmatter.

## Check before committing

```bash
npm run build
npm run preview   # http://localhost:4321/studio
```

Check that:
- every logo shows in both light and dark mode (the toggle is top right);
- no logo shows as a solid blob or has missing parts;
- the AGL × Netflix and Google Assistant × Smiling Mind rows show both marks.

## Commit and push

Work on branch `claude/tender-bardeen-rimzmn`: `git pull` it first.
Commit only:
- `src/assets/studio/logos/*`;
- the new hero files;
- the case `.md` files whose `hero:` changed.

Then:

```bash
git commit -m "Studio: genuine brand logos and remaining case heroes"
git push origin claude/tender-bardeen-rimzmn
```

Then tell Finn which keys are still missing.
