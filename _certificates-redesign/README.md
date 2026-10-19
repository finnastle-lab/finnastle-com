# Certificates article redesign — working pack

What GPT returned against `2026-10-14-certificates-article-redesign-brief.md`, plus the
certificate record that settles the brief's first open question.

Nothing here is wired into the build. The files sit outside `src/`, so Astro does not
read them. The one change already applied to the live article is the certificate list;
see below.

## Status

| | |
|---|---|
| Certificate list | **Resolved and applied.** Verified against the real certificate. |
| Five H2s | **Applied** to the live article. |
| Closing paragraph | **Applied.** Generative AI Leader confirmed underway, so the "already started" variant is live. |
| Credential grid | **Built and live.** Nine cells in CSS, eight earned plus the open one. |
| Tail mark | **Built and live.** The shredder drawing, theme-aware via masks. |
| Hero | Still the old Google-blue badge ring. Waiting on the photo — see below. |
| Four screenshots | Not captured. Two are behind Google sign-in. |
| Caption pairings | Three of four still unchosen. |

## Files

- `certificate-record.md` — the eight verified course titles and the verification URL.
- `hero-reprompt-shredded.md` — **the live hero direction.** Prompt, variant, alt text.
- `screenshot-capture-spec.md` — capture, crop, caption and alt specs for the four tools.
- `copy-edits.md` — the three copy changes as exact replacement text. All three are now applied.
- `revised-article-draft.md` — GPT's restructured article. The text changes in it are applied;
  what it still carries that the live article does not is the four commented screenshot blocks
  and the three `[VERIFIED COURSE TITLE]` caption slots. Keep it as the map for where the
  pictures go.
- `hero-production-spec.md` — the parked nine-mark hero: how it was composed, and its limits.

## How the page is built now

Three pictures doing three jobs, rather than one hero carrying everything.

1. **Top — the photograph.** Not in yet. A real shredder, a real certificate. See the note
   below before this one lands.
2. **Body — the credential grid.** Nine cells: the eight earned, plus Generative AI Leader
   marked open. Built in CSS, not as an image, for three reasons — Google's badge assets are
   in Google's four colours; a picture of a list is exactly how the copy and the hero came to
   disagree in the first place; and type stays sharp, themes itself and weighs nothing.
   Markup lives in the article, styles under *Credential grid* in `src/styles/global.css`.
3. **Tail — the shredder drawing.** The generated illustration, cut into two alpha masks
   (`shredder-ink.png`, `shredder-accent.png`) in `public/writing/four-things-i-built/`.
   CSS paints them with `var(--ink)` and `var(--accent)`, so one asset pair covers light and
   dark, including the manual theme toggle, and the vermilion ribbon stays vermilion in both.
   The seal in each grid cell is lifted from that same drawing, so the marks match.

The existing `.mark` helper could not be reused for the shredder: it recolours with
`brightness(0) invert()`, which flattens everything to one colour and would take the vermilion
ribbon with it.

### The accent appears twice on this page

The open credential cell near the top, and the vermilion ribbon at the very bottom. They are
far enough apart never to share a viewport, and each is load-bearing — one marks the thing not
finished, the other is the article's whole argument. It is still two, against a system that
says one per view. Easy to drop either: the cell reverts to a dashed `--line` border, or the
accent mask comes off the tail.

## The photograph at the top

Hold until its source is known. A stock photo of a stranger's hand shredding a generic
"Certificate of Completion" is a licensing question on a public repo, and it is also the one
picture on the page that isn't Finn's.

The better version costs an afternoon: print the real certificate — the record is in Drive —
shred it, photograph it. Then the picture is true, which is what the rest of this piece is
built on, and the licence question disappears.

## The two illustration options



**Live direction: the shredded certificate** (`hero-reprompt-shredded.md`). Needs no new scans,
and it argues with the title rather than illustrating it.

**Parked: eight done, one open.** `eight-done-one-open.png` (1402 × 1402) is in Drive, inside
`certificates-redesign-handoff.zip` and extracted alongside it, with 700px and 350px previews.
Still viable if two more distinct marks and a higher-resolution flourish scan turn up — see
`hero-production-spec.md`. The existing Google-blue badge hero stays in place until one of the
two is ready.

## What is left

1. **Generate the hero** from `hero-reprompt-shredded.md`, both variants, then swap the
   frontmatter `heroImage` and `heroImageAlt`. The alt must keep its machine-made disclosure.
2. **The four screenshots.** Almanac and DreadSwipe are behind Google sign-in and have to be
   captured by hand. Source Material and the Icon Pack are on the public site.
3. **Three caption pairings.** Only Almanac → *AI for Data Analysis* is settled.

## Correction to an earlier note

An earlier working note in this project claimed a ninth Coursera badge, *AI for Workflow
Automation*. No record of it appears in the certificate or anywhere in Drive. Treat it as
unverified and do not build the ninth hero position around it. The ninth position refers to
the Google Cloud credential, not a ninth Coursera course.
