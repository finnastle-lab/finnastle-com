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
| Hero | Direction changed — see `hero-reprompt-shredded.md`. The nine-mark hero is parked in Drive. |
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

## The two hero options

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
