# FA Design System V3 — decisions log

Decisions taken on the twelve questions raised at checkpoint one of the
Source Material V3 audit. Numbering follows the audit's section 05.

Audit: https://claude.ai/code/artifact/19d2931b-5ceb-4a81-be86-ad1ca5f93021
Staging branch: `staging/fa-design-system-v3`

All twelve are answered. Each entry records what was decided, what it settles
and where it was applied.

---

## Decided 2026-10-25
### 01 · Two registers, not one system

**Decided:** two registers, kept apart.

The V3 document is built on the register split the site already implements:
`[data-register="studio"]` sets `--accent: var(--ink)`, so the vermilion is an
art-register device and never appears on a business page. The V2 reference
page's framing, "one monochrome system built on a single tension" under the
heading *The Astle Creative System*, is superseded.

Consequences:
- Identity foundations opens with the two registers, before the palette.
- Every colour rule states which register it applies to.
- The V2 page's single-system framing does not carry forward.

### 02 · The public name is FA Design System

**Decided:** FA Design System. Matches the repo (`finnastle-lab/fa-design-system`)
and the URL that already exists. A name already in use, not constructed.

Retired as public names: *Source Material*, *FA Brand Reference*.

Applied on the staging branch:
- `src/pages/tools.astro` — the card name
- `public/tools/design-system/index.html` — the `<title>` and the masthead label

Still to change, each blocked on something:
- The essay sentence at `src/content/essays/things-a-certificate-wont-teach-you.md:52`.
  The rename makes it read "FA Design System is the design system behind this
  site." Finn's copy, Finn's rewrite.
- The alt text at line 56, and the asset `source-material.png`. Both describe a
  screenshot of the page as it was. They move when the page is rebuilt and
  re-shot, not before, or the alt text will contradict the picture.
- The card blurb still says "the brand system behind this site" and lists
  "marks and motifs", which now includes two struck marks.
- The card's tag reads `Design system`, which was set when the name was
  *Source Material*. The card now renders "FA Design System / DESIGN SYSTEM".
- The master CV, "Things I've built", line 196. Owned by the five-year-plan
  agent, which has confirmed it is the only occurrence outside this repo.

Not changed: the path. `/tools/design-system/` stays until decision 03 is taken.

### 04 · PR #39 is split three ways

**Decided:** split.

PR #39's two commits do not divide by commit: `d420105` carries the sunmark
work, the favicons and the first 18 lines of the CI workflow together. So the
split is by file, and PR #39's branch was left untouched. `staging/canonical-sunmark`
is branched *from* it and rebased onto `main`, so both original commits are
preserved verbatim in its history and nothing was re-done or force-pushed.

| Branch | Carries | Blocked on |
| --- | --- | --- |
| `staging/canonical-sunmark` | Both SVGs, the dark PNG, the merged README, the three import swaps | Nothing. Ready. |
| `staging/favicon-canonical-rasterisation` | The four regenerated favicons | Decision 05 |
| `staging/ci-build-workflow` | `.github/workflows/build.yml` | Its own review |

This unblocked P1 items 1 and 2, both now done on `staging/canonical-sunmark`:

- **The canonical folder is committed.** Both SVGs are tracked for the first
  time. `fa-sunmark-light.svg` was never in PR #39; it is hash-verified against
  `fa-design-system` and added here.
- **The two READMEs are one file.** PR #39's 18-line rasterisation note and the
  uncommitted 69-line canonical-vector note are folded into a single document.
  Neither was wrong; they answered different questions at the same address.

Verified: build passes at 51 pages, and all three sunmark uses keep their
widths — 26px nav, 64px home stamp, 18px footer. The favicons on that branch
are byte-identical to `main`, so the ground question travels with branch B
rather than riding along.

Not done: nothing is pushed and no PR is opened. PR #39's own disposition —
close it in favour of `staging/canonical-sunmark`, or retarget it — is Finn's.

### 05 · Favicons are transparent

**Decided:** transparent padding. PR #39's opaque Paper ground is dropped.

Rasterised from the canonical SVGs with cairosvg, fitted to 87.5% of each
square canvas, never distorted to fill. Pillow only scales and centres what
cairosvg returns; nothing is redrawn, traced or recoloured.
`scripts/make-favicons.py` regenerates the set.

One exception, on purpose: `apple-touch-icon.png` keeps an opaque Paper ground
at 180px, because iOS composites it onto the home screen where transparency
renders black.

Checked at 8× magnification: the mark reads at 32px in both themes, and the
16px pair is legible as a mark.

On `staging/favicon-canonical-rasterisation`, now rebased on top of
`staging/canonical-sunmark` since it needs the canonical SVGs and the icon
links.

### 06 · Both variants ship, and the split is written down

**Asked:** have we done this already?

Partly, and now the rest of it. The split has three parts:

1. **The light variant ships.** Done in the PR #39 split. It was never in
   PR #39 and is now tracked.
2. **Chrome sizes keep the filter.** Unchanged. `--mark-inv` drives
   `brightness(0) invert()` on `.mark` and `.stamp--ink` at 18, 26 and 64px.
   One black-ink source covers both themes and runs through Astro's WebP
   pipeline, which does not process SVG.
3. **Favicons swap files rather than filter.** Done above, and this is the
   first place on the site that actually consumes `fa-sunmark-light.svg`.

What remains is one documentation line, not code: the rule for display-size
use and for the mark over photography, where a filter cannot be trusted
against an arbitrary ground. There is no instance of either on the site today,
so V3 states the rule and the first use follows it.

### 07 · Sage is retired

**Decided:** retire.

`--frame: #c9d0c0` is removed from `global.css`, from all three blocks (light,
`prefers-color-scheme` dark, `[data-theme="dark"]`). It was declared as web
chrome on 30 August, documented in the V2 palette as identity, and consumed by
no rule on the site in the two months since. The only consumer anywhere was
the reference page's own `body`, and that page declares its own copy.

The `.frame` class stays. It was never using the token.

The retirement is recorded in the stylesheet header rather than dropped
silently. The header also stops calling itself the Astle Creative system and
names the two registers, per decision 01.

### 08 · The cloud mark and the filmic spine are struck

**Decided:** both struck from the documented system, with the strike recorded.

Neither has an asset. The V2 page documents a cloud mark with a specified
treatment (black outline, white fill, shadow ledge) and there is no cloud in
`src/assets/brand/`. It documents a filmic side tab, a dashed film-strip spine,
and calls it "the recurring structural rule"; it is implemented nowhere in
`global.css`.

A documented mark with no file is how an agent ends up drawing one. Both are
recorded as retired claims rather than deleted silently, so the record shows
they were considered and dropped.

If either returns, it returns with an asset.

**Known exception, open until the reference page is rebuilt:** the live page at
`/tools/design-system/` still asserts both marks, and still calls the filmic
spine a recurring structural rule. Editing two blocks out of a 506KB file that
is slated for replacement widens the drift between its two copies for no gain.
The strike lands when the page is rebuilt as an Astro route (P1 item 4).

Approved marks, unchanged: the FA sunmark (primary), the sun-ray flourish, the
ink yin-yang.

### 09 · `--maxw` stays at 62rem

**Decided:** 62rem. No code change; the site is already there. V3 documents
62rem and drops the V2 page's 1080px claim.

### 10 · Inter keeps no display scale

**Decided:** no. The serif carries display, the mono carries body, Inter
carries labels and metadata. No code change; the site is already there. V3
drops the V2 page's "Interface scale · Inter: Display 48 / Title 24 / Body 16
/ Label 11", which was never implemented.

### 11 · The Icon Pack work comes first

**Decided:** before. Confirmed by work already in flight.

This is bigger than the rename the audit assumed. A cutout-library rebuild is
paused at `handover/cutout-library-2026-10-24`, which carries handover records
only, no implementation. Per that record: 110 asset families across 131
versions, 35 native Figma renders with WebP derivatives, 21 legacy public-pack
files removed, and the gallery rebuilt with variant dropdowns, search, category
filter and per-preview ground selection. Astro build and catalogue checks
passed; visual checks did not, and it is explicitly not signed off.

It also records that `src/assets/elements/` was left intact, so the 127-file
material taxonomy the V3 image-language section is built on is unaffected.

V3 documents principles for using the pack and points at it. It does not
restate the inventory, which would need rewriting the moment that branch lands.

### 12 · The public line catches up

**Decided:** yes. `SITE.description` moves from "What happens to making when
machines can make." to "What's irreducible in human making, and how you'd
know." Verified gone from the built site: the old line survives only as essay
prose. `/studio` keeps its own business-register description.

---

## Open

Only decision 03 remains, and it is not ours to take.

| # | Question | Recommendation at checkpoint one |
|---|---|---|
| 03 | Does the rename wait for the `/tools` or `/lab` path decision? | Yes. Moving the path now costs the page two 301s and the CV two rebuilds. |

Decision 03 is shared with the website repo and sits in section 5 of
`My Drive/00_SYSTEM/2026-10-24-lab-shift-open-stream.md`. The rename is applied without it: the
name changed, the path did not. Nothing here is blocked on it.

Scope for V3 is now agreed. The next item that needs a go-ahead is not a
decision but a build: replacing the static 506KB reference page with an Astro
route that consumes `global.css` (P1 items 3 and 4). That is the change the
whole source-of-truth argument rests on, and it is large enough to ask before
starting.

---

## Built 2026-10-25: the reference page is now an Astro route

P1 items 3 and 4, done together on `staging/fa-design-system-v3`.

`public/tools/design-system/index.html` is deleted. `/tools/design-system` is
an Astro route that imports `global.css`. **505,922 bytes to 51,182.**

`src/lib/design-tokens.ts` reads the system out of the files that implement it
at build time: hexes and font stacks parsed from `global.css`, sunmark hashes
computed from the shipping bytes, element counts from the asset directory, the
transition count counted. Swatches paint themselves with `var(--token)`. A
specimen cannot print a value the site does not hold, which is the whole
argument for the rebuild.

It also compares the two hand-maintained dark blocks on every build and prints
the result on the page, so the duplication risk surfaces there rather than on
the site.

Six sections: an agent-readable rules block, identity foundations opening on
the two registers, marks with live hashes, image language built from the
element taxonomy, digital design language, motion stated as two transitions
and a kill-switch. Plus a retired ledger carrying all six dropped rules.

**The URL lost its trailing slash**, which `trailingSlash: 'never'` requires.
The `/tools` card, the essay link and the sitemap are repointed to the final
URL rather than left following a redirect, and `/tools/design-system/` 301s in
`public/_redirects`.

Verified: build passes at 52 pages; all 16 image assets serve 200; both themes
resolve from tokens; the studio register specimen resolves the accent to ink;
375px has no horizontal page scroll, with wide tables scrolling inside their
own container.

**The second copy is gone too.** `finnastle-lab/fa-design-system#2` deletes
`index.html` there and repoints the repository at the published route. That
repo now holds the canonical sunmark pair, the rules for using it and favicon
guidance, and nothing else; `README.md` and `AGENTS.md` both lead with
<https://finnastle.com/tools/design-system> and tell an agent to read the
system there rather than reconstruct it from an older document. The two SVGs
are untouched, hash-verified identical before and after. Its PR #1, which
refreshed embedded marks inside the deleted file, is closed.

The duplication this audit opened on is now closed on both sides: one rendered
page, generated from the code it describes.

### A correction the parser caught

The audit said the four grid densities were gallery 220, work-grid 240,
icon-grid 96 and tool-links 120. Reading the stylesheet rather than my notes:
gallery 220, work-grid 240, **chapter-thumbs 96**, **icon-grid 120**. The page
prints what it parses.

---

## Corrections to the cross-agent record

Flagged here rather than edited in place, per that file's own instruction.

1. The Lab shift open stream (now `My Drive/00_SYSTEM/2026-10-24-lab-shift-open-stream.md`)
   section 4 states that "Source
   Material" appears "three times in the certificates essay body". It appears
   **twice** in that file, and only one is body copy: line 52 is prose, line 56
   is image alt text. The change list in section 4 is one item shorter than
   written.

2. The essay moved. `main` is at `a17ea6a`, which renamed the slug to
   `things-a-certificate-wont-teach-you` with a 301 off the old path, and
   repointed the `FeaturedWriting` slug on `src/pages/tools.astro:84`. Section
   5's note that the master CV "breaks when the essay slug changes" has now
   fired. All four staging branches are based on that commit.

---

## Branches

Each builds. None is merged.

| Branch | Base | Carries |
| --- | --- | --- |
| `staging/canonical-sunmark` | `main` | PR #39's two commits verbatim, plus the committed canonical pair and the merged README |
| `staging/favicon-canonical-rasterisation` | `staging/canonical-sunmark` | Transparent favicons, both variants, the icon links and `scripts/make-favicons.py` |
| `staging/ci-build-workflow` | `main` | `.github/workflows/build.yml` |
| `staging/fa-design-system-v3` | `staging/favicon-canonical-rasterisation` | The rename, the sage retirement, the site description, the Astro reference page, this log |

Pushed 2026-10-25, with pull requests open and no merges:

| PR | Base | Carries |
| --- | --- | --- |
| finnastle-com#41 | `main` | The canonical sunmark, split out of #39 |
| finnastle-com#42 | #41 | Transparent favicons, both variants |
| finnastle-com#43 | #42 | FA Design System v3 and the rebuilt reference page |
| finnastle-com#44 | `main` | The CI workflow, independent of the stack |
| fa-design-system#2 | `main` | Assets and rules only; `index.html` deleted |

Closed in favour of the above: finnastle-com#39 and fa-design-system#1. Neither
branch was force-pushed; both still sit where they were.
