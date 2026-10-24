# FA Design System V3 — decisions log

Decisions taken on the twelve questions raised at checkpoint one of the
Source Material V3 audit. Numbering follows the audit's section 05.

Audit: https://claude.ai/code/artifact/19d2931b-5ceb-4a81-be86-ad1ca5f93021
Staging branch: `staging/fa-design-system-v3`

Each entry records what was decided and what it settles. Open questions are
listed with their original recommendation and no action taken.

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

---

## Open

No action taken on any of these.

| # | Question | Recommendation at checkpoint one |
|---|---|---|
| 03 | Does the rename wait for the `/tools` or `/lab` path decision? | Yes. Moving the path now costs the page two 301s and the CV two rebuilds. |
| 04 | PR #39: merge as it stands, or split it first? | Split. The sunmark work is sound; the first CI workflow and the favicon ground are separate decisions riding the same diff. |
| 05 | Favicon ground: opaque Paper, or transparent? | Transparent, with the light variant for dark chrome. |
| 06 | Ship both sunmark variants, or filter one? | Filter the dark variant at chrome sizes, ship both for display size and over photography, and write the split down. |
| 07 | The sage frame: build it, or retire it? | Retire. Declared and documented for two months, never used. |
| 09 | `--maxw`: 62rem or 1080px? | 62rem. What every page is built and reviewed at. |
| 10 | Does Inter keep a display scale? | No. Serif carries display, mono carries body, Inter carries labels and metadata. |
| 11 | Icon Pack rename: before or after V3 documents it? | Before. `index.json` already flags the filenames as placeholders. |
| 12 | Does `SITE.description` move to the widened public line? | Yes. It ships in every meta description and share card. |

Decision 04 now gates the most work. P1 items 1 and 2 (commit the canonical
sunmark folder, resolve the two competing READMEs at one path) both touch paths
PR #39 also writes, so neither can proceed without it.

---

## Corrections to the cross-agent record

Flagged here rather than edited in place, per that file's own instruction.

`2026-10-24-lab-shift-open-stream.md` section 4 states that "Source Material"
appears "three times in the certificates essay body". It appears **twice** in
that file, and only one is body copy: line 52 is prose, line 56 is image alt
text. The change list in section 4 is one item shorter than written.
