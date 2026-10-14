---
title: Site copy pass — cut the explaining
status: brief
created: 2026-10-14
owner: finnastle@gmail.com
base_branch: staging/pope-reply
work_branch: staging/copy-pass
---

# The problem

FA, 2026-10-14: the site is full of copy that over-explains and gives pointless
context, "only an AI would have added", usually by defining what a feature,
function or page is for. The first one he named, "When I'm not writing I'm
making things. Those go to Instagram. Same territory, fewer words.", is already
gone from the essay template on `staging/pope-reply`. The rest of the site has
the same habit.

**The test for every line a reader can see:** does it tell the reader what the
page, feature or thing *is for*, how it works, why it exists, or what the
previous sentence meant? Then it goes, or it gets replaced by the thing itself.
Labels that help someone navigate ("All poems", "← Work", "Open the tool") are
fine. Copy that justifies the navigation is not.

Second test: **internal vocabulary.** Words from plans, briefs and strategy
docs that a visitor has no way of knowing: "the art register", "the gallery
track", "on-territory", "canonical home", "syndication", "page two of the brand
reference", "the cascade". These are context only someone who read the brief
would have.

# What not to touch

- **FA's own verbatim words.** Copy salvaged from finnastle.com Squarespace or
  astlecreative.com, his poems, the True Fiction note, essays marked as
  syndicated from Medium ("kept as written"). Check `_migration/` for the
  salvaged sources before changing anything on the home page, the Fearless
  Answers page or the studio intro. If a line is his, leave it and list it in
  the report as "his, left alone" so he can decide.
- Code comments, HTML comments, alt text and `aria-label`s. Not reader copy in
  this sense. (Alt text that over-explains is a separate job.)
- Facts. Don't change a credit, a date, a client name or a role.

# Found in the first pass (2026-10-14) — start here, then sweep the rest

| Where | Line | Problem |
|---|---|---|
| `src/pages/writing/index.astro` intro | "Canonical home for the essays. Medium and LinkedIn carry syndicated copies that point back here." | Explains the publishing setup. |
| `src/pages/writing/index.astro` meta | "Essays: the canonical home. Medium and LinkedIn are syndication only." | Same, in the description. |
| `src/pages/writing/index.astro` 2020 signpost | "The first pass at the same question, syndicated from Medium. Kept as written. The territory was here before the tools were." | Explains the section and restates the thesis. |
| `src/pages/writing/[...slug].astro` meta line | "First published on Medium, kept here as written" | "kept here as written" explains. The provenance link can stay. |
| `src/pages/tools.astro` intro | "Small machines that make. On-territory by construction." | Internal vocabulary. |
| `src/pages/tools.astro` meta | "Small tools: specimens of making when machines can make." | Explains the page's role. |
| `src/pages/tools.astro` un-write blurb | "The joke it owns: … Detection, obsolete by design." | Explains its own joke. |
| `src/pages/tools.astro` Source Material + Icon Pack blurbs | "The monochrome-first brand system behind this site…", "Page two of the brand reference…" | Internal vocabulary, defines what the page is for. |
| `src/pages/tools/icon-pack.astro` intro | "Page two of the brand reference. The scanned collage elements, N of them." | Same. |
| `src/pages/poems/index.astro` intro | "Written over years and mostly never shown. Set as they were written — the line breaks are mine, not the window's." | Explains the typesetting. Check whether it's FA's. |
| `src/pages/poems/index.astro` meta | "Poems and the True Fiction cycle. The art register." | Internal vocabulary. |
| `src/pages/exhibitions.astro` meta | "Exhibition history, 2015–2024: the gallery track." | Internal vocabulary. |
| `src/pages/index.astro` explore card | "The gallery track, 2015–2024." | Internal vocabulary. |
| `src/pages/index.astro` | "F.A. turns up everywhere on this site before you're told what it stands for…" paragraph | Explains the brand. Check provenance first. |
| `src/pages/404.astro` | "This site was built to publish with impermanence in mind first, so a dead link here isn't strictly a bug. (It isn't strictly a feature either. It's a dead link.)" and "If you typed the address, check it for a stray character…" | Explains the site and the error. |
| `src/pages/404.astro` meta | "Nothing at this address. The nav still works; whatever you came for might not." | Probably fine, check. |
| `src/pages/studio.astro` intro | "Volume without soul, or soul without volume. Most shops pick one. The current work is the third option: an AI-assisted pipeline built to hold quality at a pace it couldn't manage by hand." | Explains the offer instead of showing it. Check provenance. |
| `src/content/studio/*.md` | e.g. Youi: "The aha is that the sculptures only resolve when you see them from a Youi perspective." | Case bodies explain why the idea works. Sweep all fifteen; keep the facts. |
| Every page's `description=` | | Meta descriptions that describe the page's function. |

# How to rewrite

Load the `write-like-finn` skill first and follow its "Don't explain" section.
Deletion beats rewriting: most of these lines should simply go. Where a page
needs something, give it a fact or an image, not a description of itself.
No em dashes. Shorter is fine.
