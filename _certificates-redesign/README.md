# Certificates article redesign — working pack

What GPT returned against `2026-10-14-certificates-article-redesign-brief.md`, plus the
certificate record that settles the brief's first open question.

Nothing here is wired into the build. The files sit outside `src/`, so Astro does not
read them. The one change already applied to the live article is the certificate list;
see below.

## Status

| | |
|---|---|
| Certificate list | **Resolved.** Verified against the real certificate. Applied to the live article. |
| Hero | Built, with caveats. PNG is in Drive, not yet in this repo. |
| Five H2s | Written, in `revised-article-draft.md`. Not applied. |
| Closing paragraph | Two variants. Blocked on one fact: what is actually in progress today. |
| Four screenshots | Not captured. Two are behind Google sign-in. |

## Files

- `certificate-record.md` — the eight verified course titles and the verification URL.
- `revised-article-draft.md` — GPT's restructured article, with the two certificate
  slots resolved from the record. Still carries four commented screenshot blocks and
  three `[VERIFIED COURSE TITLE]` caption slots.
- `copy-edits.md` — the three copy changes as exact replacement text.
- `hero-production-spec.md` — how the hero was composed, and its limits.
- `screenshot-capture-spec.md` — capture, crop, caption and alt specs for the four tools.

## Where the hero lives

`eight-done-one-open.png` (1402 × 1402) is in Drive, in
`certificates-redesign-handoff.zip` and extracted alongside it, with 700px and 350px
previews. It is not in this repo yet because the direction needs a decision first — see
the caveats in `hero-production-spec.md`. Target path when it lands:
`src/assets/writing/four-things-i-built/eight-done-one-open.png`.

## What is blocked, and on what

1. **The closing paragraph.** The draft says Generative AI Leader is next and Professional
   Cloud Architect after it — future-facing, so it claims nothing unverified. If study has
   already started, `copy-edits.md` has the replacement sentence. Needs confirming either way.
2. **The four screenshots.** Almanac and DreadSwipe are behind Google sign-in; they have to
   be captured by hand. Source Material and the Icon Pack are on the public site.
3. **Three caption pairings.** Only Almanac's is settled (AI for Data Analysis). The other
   three need the course-to-tool pairing chosen.
4. **Two more distinct marks, and a better flourish scan.** The hero repeats the ohm and the
   flower to fill eight positions, and the central outline is upscaled from a 138 × 57px crop.

## Correction to an earlier note

An earlier working note in this project claimed a ninth Coursera badge, *AI for Workflow
Automation*. No record of it appears in the certificate or anywhere in Drive. Treat it as
unverified and do not build the ninth hero position around it. The ninth position refers to
the Google Cloud credential, not a ninth Coursera course.
