# Brief: the last /studio logos and heroes

**For:** a Claude Code session running on Finn's own computer
**Source files:** `~/Desktop/client assets/` (Finn put them there; list the folder first)

## Context

finnastle.com is an Astro site. `/studio` lists 14 client cases, one file each in
`src/content/studio/*.md`. A case names its brands in `logos: [...]`.

**How logos render:**
- The page looks for `src/assets/studio/logos/<key>.svg` and inlines it.
- Every fill becomes `currentColor`: black in light mode, white in dark.
- So a logo only needs the right **shapes**. Its colours don't matter.
- A case shows logos only when **every** key it lists has a file. Otherwise the
  brand name is set in type.

`src/assets/studio/logos/` already has: `afterpay`, `agl`, `amazon-alexa`, `coca-cola`,
`google-assistant`, `netflix`, `tekspace`, `victoria-police`, `welly` and `woolworths`.
Open one or two to see the target format: a tight viewBox, no background, and
`fill="currentColor"`.

## Setup

```bash
cd <your local clone of finnastle-lab/finnastle-com>
git fetch origin
git checkout claude/tender-bardeen-rimzmn
git pull origin claude/tender-bardeen-rimzmn
npm install
ls -la ~/Desktop/"client assets"
```

## Task 1: logos

| key | brand | expected source in `client assets` | note |
|---|---|---|---|
| `g8-education` | G8 Education | Two-ring "G8" mark + "G8 Education ltd" lockup | Use the horizontal lockup if it's there, otherwise the square red one |
| `grove-distillery` | The Grove Distillery | Script "The Grove" over "Distillery & Brewery" | Ignore the thin gold drop shadow |
| `inke` | Inke | "inke." wordmark | Already black on white: an easy trace |
| `youi` | Youi | Rounded speech-box badge with "youi" inside | The word must stay a **knockout** (a hole in the box) |
| `smiling-mind` | Smiling Mind | Brain-cloud icon with a smile, black on purple | Mark only, without the purple tile. Unlocks the Google Assistant × Smiling Mind row |
| `7-eleven` | 7-Eleven | Probably not in the folder | Find the official logo online (Wikimedia Commons `File:7-eleven logo.svg`). Ask Finn if unsure |

**Method:**
1. **If a file is already SVG:** use it. Strip any background rectangle, any `<image>`
   embeds, and gradient `<defs>` that nothing references any more.
2. **If it's raster (PNG/JPG/AVIF/WebP), trace it.** Never redraw it by hand.
   - Make a high-contrast mask: logo black, everything else white.
     - Light background:
       ```bash
       magick in.png -background white -flatten -colorspace Gray -threshold 55% mask.png
       ```
     - Dark or coloured background, logo lighter (e.g. the red G8 tile): add `-negate`
       after the threshold.
     - Black-on-purple (Smiling Mind): threshold so the black brain becomes black
       and the purple becomes white. The smile and the thought-bubble dots must
       survive: the smile as a hole, the dots as separate shapes.
   - Upscale small sources 2–4× before thresholding (`-resize 300%`) for
     smoother curves.
   - Trace it:
     ```bash
     potrace mask.pbm -s -o out.svg
     ```
     Install with `brew install potrace imagemagick`, and convert to pbm with
     `magick mask.png mask.pbm`.
3. **Normalise the SVG:**
   - one or more `<path>` elements with no fill colours;
   - root `<svg ... viewBox="…" fill="currentColor">` with no width or height;
   - viewBox cropped tight to the artwork;
   - round coordinates to 1 decimal;
   - aim for under 40 KB.
4. **Knockouts must be real holes.** That means:
   - a white shape drawn on top of a black one disappears once everything is one
     colour;
   - so open it in a browser on a coloured background and check you can see
     through the holes: the "youi" letters, the Smiling Mind smile, the gaps in
     the G8 rings.
5. Save as `src/assets/studio/logos/<key>.svg`. The key must match exactly.

## Task 2: heroes

Heroes live in `src/assets/studio/`. Set each one in the case file's frontmatter
as `hero: <filename>`, placed after `order:`. Use landscape 16:9: ideally 2560×1440,
and at least 1600 wide where the source allows.

| case file | source | how |
|---|---|---|
| `google-assistant-smiling-mind.md` | Square "Hey Google, talk to Smiling Mind." illustration (1080×1080) | See below |
| `tekspace.md` | The Cyber Lab report "Browser Security: A Cyber SaaS Analysis (2026)" | See below |

**Smiling Mind hero:** widen it to 16:9 by **extending its flat background**, not by
cropping. The blue sky and the purple table band run edge to edge, so repeating the
edge pixels sideways works:

```bash
magick in.png -resize 1440x1440 -virtual-pixel edge \
  -set option:distort:viewport 2560x1440-560+0 -distort SRT 0 +repage \
  google-assistant-smiling-mind.webp
```

Check that the "Smiling Mind" title, the speech line and the Google HOME logo are
all intact and centred, with no visible seam where the edge was stretched.

**Tekspace hero:**
1. Prefer the page's share image:
   https://tekspace.com.au/lab/lab-images/og-browser-security.png.
2. Otherwise, take a 2560×1440 screenshot of the top of the live report
   (find "Browser Security" under https://tekspace.com.au/lab/). For example:
   ```bash
   npx playwright screenshot --viewport-size=1280,720 --device-scale-factor=2 <url> tekspace.png
   ```
   Dismiss any cookie banner first.
3. Show Finn both and let him choose.
4. Save as `src/assets/studio/tekspace.webp`.

**Don't replace** the existing Grove hero (it's campaign work). The Grove barrel photo
in the folder is a spare. Leave it out unless Finn asks.

## Check before committing

```bash
npm run build
npm run preview   # http://localhost:4321/studio
```

Check that:
- all 14 rows show a logo in **both** light and dark mode (the toggle is top right);
- none is a solid blob, has a white box behind it, or is missing a knockout;
- the Google Assistant × Smiling Mind row shows both marks;
- the two new heroes open sharp and uncropped (`/studio#tekspace`,
  `/studio#google-assistant-smiling-mind`).

## Commit and push

Commit only:
- `src/assets/studio/logos/*.svg`;
- the two hero files;
- `src/content/studio/google-assistant-smiling-mind.md` and `src/content/studio/tekspace.md`.

```bash
git status
git add <those files>
git commit -m "Studio: final logos (G8, Grove, Inke, Youi, Smiling Mind, 7-Eleven) and heroes"
git push origin claude/tender-bardeen-rimzmn
```

Then tell Finn:
- which keys are done;
- which are still missing, and why;
- the size of each hero.

## Don'ts

- Don't trace or redraw a logo you don't have a genuine source for. Leave it out and say so.
- Don't edit any copy, styling or other case.
- Don't commit anything from the Desktop apart from the files above.
- Don't push to `main`.
