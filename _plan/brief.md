---
title: Brief — publish-essay, the deterministic end of the content pipeline
status: brief
created: 2026-10-16
owner: finnastle@gmail.com
---

# Brief: `publish-essay`

Build a single command that takes a finished essay draft and its hero image
and puts them into this site correctly, every time, with no model in the loop.

## Why this exists

There is a content pipeline for finnastle.com essays: research, drafting,
review by question, recalibrate, image brief, image generation, framing. Every
stage of it needs a human making taste decisions, and the whole of it was
built and calibrated over 15–16 October 2026.

The last stage is not like the others. Writing frontmatter, placing files,
running a build, committing and pushing has exactly one correct answer. It
currently gets done by hand, or by asking a model to do shell work, which is
the most expensive possible way to get a deterministic result.

**So the deliverable is a script, not an agent.** Once it exists, publishing
costs nothing — no tokens, no judgment, no session.

## What already exists

- **Essays** live in `src/content/essays/*.md`. The schema is defined in
  `src/content/config.ts` and is authoritative: `title`, `description?`,
  `pubDate`, `canonicalUrl?`, `syndicatedFrom?` (`medium`|`linkedin`),
  `draft` (default false), `instagramCta?`, `heroImage?`, `heroImageAlt?`.
- **Hero images** live in `src/assets/writing/<slug>/` and are referenced from
  frontmatter by relative path (`../../assets/writing/<slug>/<file>`).
- **Drafts** are authored outside this repo, at
  `~/Desktop/05_WRITING/essays/<date>-<slug>-draft-NN.md`. They carry their own
  frontmatter — `title`, `status`, `slug`, `standfirst`, `source`, `changes`,
  `to_confirm` — which is *authoring* metadata and is **not** the site schema.
  Mapping between the two is the interesting part of this job.
- **The framing script** is at
  `~/Desktop/00_SYSTEM/agentic-development/framing/frame-hero.py`. It applies
  grain and a hairline border, deterministically. The FA signature is off by
  default and must stay off for site heroes.
- **Branching:** work goes to `staging/<topic>` branches. Cloudflare Pages
  builds a preview per branch. Production is `main`.

## What to build

A command, `publish-essay`, that given a draft path and a hero image path:

1. **Reads the draft** and maps its authoring frontmatter onto the site
   schema. `standfirst` becomes `description`. `slug` picks the output
   filename. `pubDate` comes from the draft's date or today.
2. **Refuses, loudly, if the draft still has unresolved `to_confirm` items.**
   Those are open questions for the author; publishing past them is how a
   draft with a placeholder title goes live.
3. **Runs the hero through `frame-hero.py`** and writes the result into
   `src/assets/writing/<slug>/`.
4. **Writes the essay file** to `src/content/essays/<slug>.md` with
   `draft: true` always. Nothing this script produces goes live on its own; a
   human flips that flag in a separate commit.
5. **Validates** by running `npm run build` and failing if it does.
6. **Commits and pushes** to a `staging/<slug>` branch, never to `main`.

## Acceptance

- Running it on `~/Desktop/05_WRITING/essays/2026-10-15-pitch-ends-head-doesnt-draft-04.md`
  with the calibrated contact-sheet hero produces a valid, building site with
  the essay present and hidden behind `draft: true`.
- Running it twice is safe — second run updates rather than duplicating.
- A draft with `to_confirm` entries is refused with a message naming them.
- `npm run build` passes after it runs.
- `main` is untouched.

## Non-goals

- **No model calls of any kind.** If a step seems to need judgment, that step
  belongs upstream with the human, not in this script.
- No flipping `draft: false`, no deploying to production, no syndication to
  Medium or LinkedIn.
- No image generation, no bucket selection, no alt-text writing. Alt text is
  written by the author and read from the draft; if it is missing, say so and
  carry on rather than inventing it.
- No rewriting of the draft's prose. Not a word.

## A question the plan should answer

This task is small, deterministic and well-specified — arguably too small for
a milestone hierarchy, a plan review and a verification pass. Part of the
value of running it through the full agent pipeline is finding out whether
that ceremony earns its place on a job this size. If the planner's honest
answer is "this is one task, not a milestone tree," that is a legitimate and
useful result; say so rather than inflating it.

---

## Outcome — 2026-10-16

Built at `~/Desktop/00_SYSTEM/agentic-development/publish/publish-essay.py`.
No planner, no milestone tree: it is one task, and the brief's own closing
question answers itself — the ceremony did not earn its place here.

Two things in this brief were wrong, found by running it:

1. **"Refuse if the draft has unresolved `to_confirm`"** would have refused
   every draft in `05_WRITING`. All of them carry open items, and
   `there-is-only-advertising-draft-07` was staged with five. They are
   provenance notes the author keeps deliberately, not blockers. The script
   prints them and stops; `--ack-confirm` proceeds. Hard refusal is reserved
   for placeholders (TODO, TKTK, FIXME, lorem ipsum), which are unfinished
   rather than unverified.

2. **The acceptance draft does not exist.** There is no
   `2026-10-15-pitch-ends-head-doesnt-draft-04.md`; the latest is
   `2026-10-13-pitch-ends-head-doesnt-v6.md`. Run against that.

Three things the brief did not anticipate:

- **Drafts open with an H1 of the title; site essays do not** (the layout
  renders it). A matching leading H1 is stripped, a non-matching one is left
  and reported.
- **The v6 draft's frontmatter is not valid YAML** — a `changes` item opens
  with a double quote and continues past the closing one. That field is never
  read here, so strict parsing falls back to a narrow line reader for the keys
  that matter, and says so.
- **The hero must be snapshotted before git.** The contact sheet existed only
  on `staging/collage-elements`, so switching branches deleted the script's own
  argument. The hero is an input, not repo state.

Verified: refuses on `to_confirm`; `npm run build` passes; one clean commit on
`staging/pitch-ends-head-doesnt`; a third run with identical inputs reports
"no change to commit"; local `main` untouched (and still behind `origin/main`,
which is what the branch was cut from).
