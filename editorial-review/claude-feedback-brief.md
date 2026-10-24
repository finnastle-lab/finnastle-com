# Claude editorial review handoff — four-things-i-built v2

**Status:** Draft for editorial feedback only. Do not merge, publish, deploy, or replace the live essay yet.

**Review file:** `editorial-review/four-things-i-built-v2.md` in this branch.
**Live source, unchanged:** `src/content/essays/four-things-i-built.md` on `main`.
**Public slug to preserve if approved:** `/writing/four-things-i-built`.

## What the author wants the article to do

Keep the factual story: eight courses within **one** Google AI Professional Certificate, roughly $70 spent, and four things made. The story begins with wanting to remove friction and make more time for painting, writing and creative practice, then discovers the unexpected satisfaction of building digital things. The app-building assignment led to DreadSwipe, whose specific premise Finn chose. From there the essay looks outward at the scale of ordinary people being able to prototype software, and acknowledges token, compute and energy costs without becoming a grand manifesto or a defensive vibe-coding essay.

The tone should be observant, wry and slightly uncertain. Let the discovery happen through the examples. Avoid grand claims about futureproofing, declarations that human taste is the sole remaining value, generic AI hype, em dashes, contrived slogans, and 'it's not X, it's Y' prose.

## Precise project motivations

1. **Almanac:** Finn specifically disliked opening Instagram to check statistics and getting pulled into its attention machinery. The tool retrieves performance data separately. Link to `/tools/almanac`.
2. **Icon Pack:** Scanned collage elements needed searchable names, convenient use with Figma open alongside, copy-and-paste workflow, and one common reference for agents. The site currently has a keyword filter, so do not describe filtering as future work. Link to `/tools/icon-pack`.
3. **Source Material:** A **design system** for the site and brand, not an app. It documents visual rules, typography, palette and marks so that other people and agents can follow them. Link to `/tools/design-system/`, which exists under `public/tools/design-system/index.html`.
4. **DreadSwipe:** An app was required by the course; Finn invented the transgressive-horror swipe concept. It is an example of the pleasure of app-building and a personal use case. Link directly to `https://dreadswipe.ai.studio`.

## Visual direction locked for this review

- Keep the existing AI-made late-1990s office **certificate shredder photograph** as the hero. This deliberately banal archival/corporate reference is part of Finn's art direction.
- Cut the second line-drawn shredder at the end.
- Shrink the certificate grid into a quiet, accurate receipt or typographic line with the verification link; don't let it dominate the page.
- Add actual imagery of what exists. Almanac already has real dashboard and post-review images at `src/assets/tools/`; Icon Pack has 76 publicly presented elements; Source Material has a real design-system page; DreadSwipe should have a genuine capture.
- No invented dashboards, fake prototypes, or AI-generated evidence of the four projects. Real captures and genuine scans only. Images and captions are **not** yet placed in this prose draft.

## Please review critically

1. Is the change from administrative friction to enjoyment of building something the reader discovers, or does the prose tell them too early?
2. Does the scale passage feel genuinely awed, rather than self-important or breathless? Does the question about software needing to exist earn its place?
3. Is the DreadSwipe passage accurate about the course assignment and the difference between getting a prototype and maintaining an app?
4. Is the token/compute/energy reflection an integrated tension rather than an obligatory ethical disclaimer? Do the citations support the precise claims?
5. Are there technical claims or current product capabilities needing verification before publishing? Do not invent a personal token bill or productivity savings.
6. Is the voice Finn's? Preserve specific irritations, cultural references, contradiction, and dry Australian deflation. Flag anything too neatly aphoristic or explanatory.
7. Is the title **The things a certificate can’t prove** right? It is provisional. Suggest 2–3 quieter alternatives with the same personal-to-cultural scope. Keep the slug.
8. Is the closing one genuine ending? The old piece had a credential roadmap, second shredder, email CTA and Instagram aside all trying to end it.

## Publication decisions still open

- The essay's original `pubDate` is 2026-09-06. The scale source selected for this draft is an **April 2026** OpenAI figure (900 million weekly users), so it predates publication. If substituting later figures, add an explicit updated date or avoid time-sensitive numbers. The current Astro essay schema has no `updatedDate` field.
- Decide whether to keep the Generative AI Leader and Professional Cloud Architect roadmap in a separate small note, without giving the piece a second ending. Do not imply either certification has been earned. The current live essay says Generative AI Leader learning path is in progress.
- Verify that `$70` is still the author's intended rounded outlay, and that no unsupported claims about saved time are introduced.
- Real image placement/captions, small certificate receipt, and updated Instagram CTA need a design pass after copy approval.
- After Claude review and Finn approval, implement the final copy and images in an isolated implementation branch, test the build, preview it, and only then request explicit permission to merge/publish.

## Relevant source material

- Current essay: `src/content/essays/four-things-i-built.md`
- Earlier targeted brief: `2026-10-14-certificates-article-redesign-brief.md`
- Existing prior working draft: `_certificates-redesign/revised-article-draft.md`
- Anthropic token pricing documentation: https://code.claude.com/docs/en/costs
- IEA energy outlook: https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary
- OpenAI user figure from April 2026: https://openai.com/index/next-phase-of-enterprise-ai/

Please return an editorial diagnosis with exact line-level improvements and a revised candidate draft. Do not write to the production essay yet.
