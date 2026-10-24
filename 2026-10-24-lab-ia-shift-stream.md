# Open stream: the Lab shift, and what the site is for

**Status:** open stream, not a brief. Append to it. It gets formed into a proper
addendum for the agent currently doing Source Material v3.
**Opened:** 2026-10-24
**Repo:** `finnastle-lab/finnastle-com`, branch `main`
**Written from:** a session that published the certificates essay and then took
the architecture decision below.

---

## 1. The decision

The site goes from three nav groups to three registers, and the third one
changes name and job.

**Now**

| Group | Behaviour | Contains |
|---|---|---|
| Art | dropdown | `/work`, `/exhibitions` |
| Studio | single link | `/studio` |
| Words & Tools | dropdown | `/writing`, `/tools`, `/tools/almanac`, `/tools/icon-pack` |

**After**

| Group | Behaviour | Contains |
|---|---|---|
| Art | dropdown | `/work`, `/exhibitions` |
| Studio | dropdown | the studio index, plus its cases |
| Lab | dropdown | Tools, and whatever Lab grows into |

Writing stops being a nav destination. It becomes a section at the foot of
Studio and Lab, featuring key articles. `/writing` stays as the listing page.

Finn's wording on Lab, 2026-10-24: *"for now we can make lab tools but we can
eventually build lab or even do that now and then it's drop down is tools for
now, studio can be similar."*

So: **Lab is the hero nav item now. It resolves to the tools page for now. Its
dropdown is Tools. Studio gets the same hero-plus-dropdown treatment.** A real
Lab landing page is a later build, not a blocker on the nav change.

---

## 2. Why this shape

The always-on context names three methods and their cascade rates: **making**
(art, weekly), **explaining** (strategy, marketing theory, cultural
idiosyncrasy, monthly), **building** (the FAST AS pipeline, quarterly).

The old nav had no slot for building. Tools sat inside "Words & Tools", which
put the quarterly work under the same label as the monthly work and gave
neither its own front door.

The new shape is one nav item per method. Art is making. Lab is building.
Studio is the commercial register that pays for both. Explaining stops being a
fourth destination and attaches to the two registers it serves, which is what
it was already doing.

That is the argument. It is not in the stream to be repeated on the site.

---

## 3. What Writing becomes

- `/writing` stays. It is the full listing, by year, as it is now.
- Studio and Lab each grow a featured-articles section at the foot of the page.
- The sections feature **key** articles, not the whole feed. The mechanism for
  choosing them is unspecified and needs deciding: a frontmatter flag on the
  essay, or a hand-picked list on each page. Hand-picked matches how the studio
  cases are already ordered (`order:` in the collection schema, strongest first).
- The essays collection has a `register` field already, `art` or `craft`. It is
  currently used to decide which pieces carry the poems sign-off. It is not a
  Studio-or-Lab split and should not be forced into one without checking what
  it breaks.

---

## 4. The rename

Finn, same session: *"i also think we rename source material publicly to
something that references design system."*

The thing already answers to three public names:

| Name | Where it appears |
|---|---|
| **Source Material** | the card on `/tools`, and three times in the body of the certificates essay |
| **FA Brand Reference** | the `<title>` of the page itself, `public/tools/design-system/index.html` |
| **fa-design-system** | the GitHub repo the sun marks are pulled from |

The URL is already `/tools/design-system/`. The page's own masthead says
"BRAND REFERENCE — V2 DRAFT".

Names in play, all of them already his rather than invented:

- **FA Design System** (matches the repo)
- **FA Brand Reference** (matches the page)
- **Astle Creative Design System** (matches the business register)

Finn picks. The rule against constructed literary titles applies here as much
as to an essay, so the shortlist is what is already in use, not something new.

Whatever wins has to change in four places: the card on `/tools`, the page
`<title>`, three mentions in the certificates essay body, and the alt text on
the screenshot in that essay.

---

## 5. URLs

Decided: Lab labels the nav item, `/tools` stays the path for now. No redirects
needed yet, nothing breaks.

Still open, for whenever the real Lab page gets built:

- Does `/tools` become `/lab`, with a 301, or stay?
- Do the children move (`/lab/almanac`, `/lab/icon-pack`, `/lab/design-system`)?
- The certificates essay links `/tools/almanac`, `/tools/icon-pack` and
  `/tools/design-system/` in its body. Any path move has to update those three
  links, not just redirect them.
- `/fast-as` exists and is kept out of the nav until it has paying customers.
  It is the building register's actual product. Where it sits once Lab is real
  is unresolved.

---

## 6. State of the certificates essay, carried forward

Published 2026-09-06, live at `/writing/four-things-i-built`.

- The live copy is **V3**. V4 exists on branch
  `editorial/four-things-v2-review-2026-10-24` and is **held**, not applied.
  Finn reviews V3 on the live article first.
- The **slug change is pending**. Agreed to happen after the V4 pass, not before.
- All four tools now carry a real picture: Almanac's post review with its own
  numbers, the Icon Pack grid with real filenames, Source Material's palette and
  type voices, and the DreadSwipe double-feature board. Nothing generated,
  nothing composited.
- The nine-card credential grid is now one mono receipt line. The line-drawn
  shredder at the tail is gone and its three mask PNGs with it. The office
  photograph is the hero, in the article and on the listing.

Both external citations were checked against source, not taken from the draft:
OpenAI's 8 April 2026 page says "ChatGPT has 900 million weekly users", and the
IEA executive summary covers data-centre electricity demand, 17 per cent growth
in 2025 and 485 TWh rising to 950 TWh by 2030.

---

## 7. Open, for the addendum

1. Who picks the featured articles on Studio and Lab, and by what mechanism.
2. The design system's public name.
3. Whether Lab gets a real landing page in this pass or the next.
4. Whether `/tools` eventually moves to `/lab`.
5. Whether the essays `register` field gets reused for the Studio-or-Lab split
   or a new field is added.
6. The certificates essay slug.

---

## 8. Hands on this

- The Source Material v3 agent: owns the design system, and now the rename.
- The documentation and five-year-plan agent: Finn is giving it this same
  refinement so the plan and the site agree from here.
- This repo: holds the nav, the routes and the essay.

Three agents, one decision. The risk is the three of them each forming a
slightly different idea of what was decided. That is what this file is for.
