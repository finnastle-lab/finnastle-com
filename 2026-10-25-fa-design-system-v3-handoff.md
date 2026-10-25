# FA Design System V3 — where this got to

Written 2026-10-25 for the next session. The audit and all twelve decisions are
in `2026-10-25-fa-design-system-v3-decisions.md`. This file is the state of
play, not the reasoning.

Audit page: https://claude.ai/code/artifact/19d2931b-5ceb-4a81-be86-ad1ca5f93021

---

## Live now

`main` is at `d65aa62`. Everything below is deployed and verified on
finnastle.com.

- **`/tools/design-system`** is an Astro route, 51,182 bytes, down from the
  505,922-byte static file. `/tools/design-system/` 301s to it.
- **It generates itself from the code.** `src/lib/design-tokens.ts` parses the
  hexes and font stacks out of `global.css`, computes the sunmark SHA-256 from
  the shipping bytes, counts the element library, and counts the site's
  transitions. The swatches paint with `var(--token)`. A specimen cannot print
  a value the site does not hold.
- It also compares the two hand-maintained dark palette blocks on **every
  build** and prints the result on the page. If they ever drift, the page says
  so. Do not delete that check.
- **The canonical sunmark is committed** at `src/assets/brand/fa-sunmark/`,
  both variants, hash-verified. Nav, BaseLayout and index.astro all use it.
- **Favicons are transparent**, both variants, chosen by
  `prefers-color-scheme` with the black mark last. `apple-touch-icon.png` is
  the deliberate exception and stays opaque. `scripts/make-favicons.py`
  regenerates them.
- **Sage (`--frame`) is retired.** `.frame` the class stays; it never used the
  token.
- **`SITE.description`** is now "What's irreducible in human making, and how
  you'd know."
- **CI runs** on every PR and push to main: build, then Chromium asserting the
  three sunmark widths at 390 and 1440px in both themes. It passed on `main`.

`finnastle-lab/fa-design-system` is four files: `AGENTS.md`, `README.md` and
the two SVGs. Its `index.html` is deleted and both docs point at the live
route.

---

## Open, and what to do about it

### PR #46 — Lab everywhere, /tools for now

**Ready to merge.** https://github.com/finnastle-lab/finnastle-com/pull/46

Finn, 25 Oct: *"should be lab everywhere except the url slug"* and *"which is
temporary itself"*.

So: five places that said Tools now say Lab (page title, `h1`, the nav
dropdown's own child, the 404 wayfinder, the studio footer link). **No route
moves.** The slug move is **deferred, not cancelled** — treat `/tools` as a URL
that moves once.

That closes the `/tools` vs `/lab` question in section 5 of
`2026-10-24-lab-shift-open-stream.md`, which had been open since 24 October.
Whoever picks that file up next should record the answer there.

Also in #46: the essay sentence the rename broke. It read "FA Design System is
the design system behind this site", which says nothing twice. Merged into one
sentence, every word after "I built" unchanged.

### The essay screenshot is stale

`src/assets/writing/things-a-certificate-wont-teach-you/source-material.png`
is a picture of the old reference page. Its alt text describes that page,
including the **sage swatch that no longer exists**.

Fixing it means re-shooting the live `/tools/design-system`, rewriting the alt
text to match the new page, and renaming the asset off `source-material`.
Needs Finn's call on whether to re-shoot at all; the paragraph reads fine
without a picture.

### The Drive doc may be a third definition

`00_SYSTEM/FA_Brand_Reference_Design_System.md` is a Google Doc. Its content
was not readable from the website session, only its id. Gemini was asked to
report on it read-only in
`00_SYSTEM/30-operations-gemini-drive-docs-update-brief.md`. **Check that
report before trusting anything it says about the system** — it predates all of
the above and may contradict the live route, which now wins.

### The cutout-library rebuild is paused

`handover/cutout-library-2026-10-24` carries handover records only, no
implementation. 110 asset families, 21 legacy public-pack files removed, the
gallery rebuilt. Astro and catalogue checks passed; **visual checks did not and
it is explicitly not signed off.**

It leaves `src/assets/elements/` intact, so the image-language section of the
design system is unaffected. The design system documents principles and points
at the pack rather than restating its inventory, which was the right call: that
inventory is about to change.

---

## Things worth not breaking

- **Don't restate a value the design system page can parse.** If you find
  yourself typing a hex or a font stack into documentation, that is the bug the
  whole V3 rebuild was fixing.
- **Never redraw, trace, regenerate, stretch, crop or colour-filter the
  sunmark.** Copy the file. Check the hash. Both READMEs and `AGENTS.md` say
  this; so does the live page.
- **Two registers, never merged.** `[data-register="studio"]` resolves the
  vermilion to ink on business pages. It is set once on `<html>`.
- **The dark palette is maintained twice by hand** (a `prefers-color-scheme`
  block and a `[data-theme="dark"]` block). Change one, change both. The build
  check will catch you, not save you.
- **Retired rules are recorded, not deleted.** Sage, the old amber, the third
  grey, the Inter display scale, the cloud mark and the filmic spine are all in
  the Retired table on the live page. A documented thing with no asset is how
  the next agent ends up drawing one.

---

## Branch and PR history

Merged to `main`, in order: #41 the canonical sunmark, #42 then #45 the
favicons, #43 the design system and the rebuilt reference page, #44 the CI
workflow. `fa-design-system#2` the assets-only cleanup.

Closed in favour of those: #39 and `fa-design-system#1`. **Neither branch was
force-pushed**; both still sit where they were.

One wrinkle in the history: #42 was a stacked PR and merged into its own base
rather than `main`, because GitHub had not retargeted it after #41 landed. #45
carried the same content the last step. No work was lost or duplicated, but
that is why there is an extra merge commit.
