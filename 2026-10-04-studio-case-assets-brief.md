# Brief: source images, logos and copy for the Studio case studies

**For:** Gemini Spark, working in Finn Astle's Google Drive
**From:** Finn Astle (finnastle.com rebuild)
**Date:** 4 October 2026
**Returns to:** Finn and Claude, who will bring the files onto the site and fill the gaps together

---

## What this is for

finnastle.com/studio is being rebuilt as a list of client case studies. Each case is
one row: the brand's logo, the campaign's platform line, and an optional discipline tag.
Opening a row shows a hero image and a short write-up in three parts: **The brief**,
**The execution**, **What I wrote**.

Eight cases already have a write-up. Seven are new and have only a name. Most images on
the page are low resolution, salvaged from old portfolio sites. There are no logos yet.

**Your job is to find three things in Drive for each case:**

1. **The best hero image**, at the highest resolution that exists
2. **The brand's logo**, as a clean vector or transparent file
3. **Anything Finn has already written about the project**, quoted word for word with its file path

Find and organise only. **Do not write new case-study copy.** Gaps are fine. Finn and
Claude will fill them together.

---

## Ground rules

- **Never invent.** Every fact, quote, year, agency and role you report needs a source:
  a Drive file path, or a public URL for logos. If you're inferring something, label it
  `inferred` and give your reason.
- **Copy, don't move.** Leave Finn's originals where they are. Copy the files you pick
  into the output folder.
- **Originals over exports.** Prefer the master file (PSD/AI export, the raw frame, the
  agency's final JPG) over social crops, compressed WhatsApp/Slack copies, screenshots or
  deck pages, whenever a better version exists.
- **Flag sensitivity.** If something looks unreleased, under NDA, internal-only, or shows
  identifiable members of the public or children (relevant to G8, Smiling Mind, Victoria
  Police), say so in the notes. Don't leave it out silently.
- **Say when you can't find something.** "Searched X, Y, Z; nothing found" is a useful
  result.

---

## Deliverable

Create a Drive folder: **`Studio case assets — 2026-10`**

```
Studio case assets — 2026-10/
  _manifest            (Google Sheet, layout below)
  _notes               (Google Doc: per-case findings + verbatim copy excerpts)
  agl-join-the-change/
    hero-1.jpg  hero-2.jpg  hero-3.jpg     (best first; up to 3 candidates)
  agl-netflix/
  ...one folder per case slug (list below)...
  _logos/
    agl.svg  netflix.svg  afterpay.svg ... (named by logo key, list below)
```

### `_manifest` columns

| Column | What goes in it |
|---|---|
| `slug` | Case slug from the table below |
| `asset` | `hero-1`, `hero-2`, `hero-3`, or `logo:<key>` |
| `file` | Filename in the output folder |
| `source` | Full Drive path of the original, or URL for a public logo |
| `px` | Width × height in pixels |
| `what it shows` | One line, plain description (this becomes alt text) |
| `why this one` | One line: why it beats the alternatives |
| `flags` | NDA / unreleased / people visible / low-res-only / inferred |

### `_notes` structure (one section per case)

- **Found copy:** verbatim excerpts, each with its file path. Sort them under
  Brief / Execution / What I wrote where the fit is obvious; otherwise leave them unsorted.
- **Facts:** year, client, agency, Finn's role, and the exact wording of the platform
  line, each with its source.
- **Gaps:** what you looked for and couldn't find.

---

## Image spec

- **Resolution:** at least 2000px on the long edge is ideal; 1400px is the minimum. If
  only something smaller exists, include it and flag it `low-res-only`.
- **Shape:** landscape (16:9 or 3:2) works best. Portrait is fine if it's clearly the
  strongest image. Note the orientation.
- **What makes a good hero:** the campaign's key visual or a hero frame from the film.
  Prefer a single strong image over a collage, a deck slide or a grid of ads, unless the
  campaign *is* a system of executions.
- **Video-only work:** if the best image only exists as a video, export a still at the
  video's native resolution and note the source file and timestamp (e.g.
  `AGL_JTC_60s_master.mp4 @ 0:12`).
- **No watermarks, UI chrome, or presentation borders.**

## Logo spec

- **Format:** SVG first, otherwise PNG with a **transparent background**, at least 800px wide.
- **Colour doesn't matter.** The site flattens every logo to solid black (or white in dark
  mode). Transparency matters a lot: a white or coloured background turns into a solid block.
- **Which version:** the brand's primary logo as it looked at the time of the work. If the
  logo has changed since, note both.
- **Where to look:** brand packs or agency handover folders in Drive first. If there's
  nothing there, use the brand's official press or media kit page and record the URL.
  Avoid fan redraws and clip-art sites.

---

## The cases

Listed in the order they appear on the page. **Slug** names the folder. **Logo keys**
name the files in `_logos/`.

| # | Slug | Brand | Platform line / name | Tag | Logo keys | Has write-up? | Current hero |
|---|---|---|---|---|---|---|---|
| 1 | `agl-join-the-change` | AGL | Join the Change | n/a | `agl` | Brief only | **none** |
| 2 | `agl-netflix` | AGL × Netflix | Can't live without Netflix | n/a | `agl` `netflix` | Execution + What I wrote | 1112×1450 |
| 3 | `afterpay` | Afterpay | However You Christmas Afterpay It | n/a | `afterpay` | Yes | 600×800 ⚠️ |
| 4 | `youi` | Youi | You-Shaped Insurance | n/a | `youi` | Yes | 600×800 ⚠️ |
| 5 | `seven-eleven` | 7-Eleven | Summer 24/7 | n/a | `7-eleven` | Yes | 1280×720 |
| 6 | `welly` | Welly | 5 a day the easy way | n/a | `welly` | Yes | 2560×1440 ✓ |
| 7 | `inke` | Inke | Send Joy | n/a | `inke` | **No** | none |
| 8 | `grove-distillery` | The Grove Distillery | The Spirit Of | Copywriting | `grove-distillery` | Yes | 1446×1092 |
| 9 | `coca-cola-alexa` | Coca-Cola × Amazon Alexa | Share a Coke with Alexa | Copywriting | `coca-cola` `amazon-alexa` | Yes | 801×311 ⚠️ |
| 10 | `tekspace` | Tekspace | Research | Content Strategy | `tekspace` | **No** | none |
| 11 | `bowen-st-press` | Bowen St Press | n/a | Branding | `bowen-st-press` | **No** | none |
| 12 | `google-assistant-smiling-mind` | Google Assistant × Smiling Mind | n/a | UX Writing | `google-assistant` `smiling-mind` | **No** | none |
| 13 | `victoria-police-blue-space` | Victoria Police | Blue Space | n/a | `victoria-police` | **No** | none |
| 14 | `woolworths-olive` | Woolworths | Olive (the Woolworths chatbot) | n/a | `woolworths` | **No** | none |
| 15 | `g8-education` | G8 Education | The Film Diary | n/a | `g8-education` | Yes | 960×540 ⚠️ |

⚠️ = existing hero is under the 1400px minimum; find a better one.
✓ = already good; only replace it if something clearly stronger turns up.

### Leads and specific asks, case by case

**1. AGL: Join the Change**
- **Hero (Finn's pick):** the **blue underwater swimming shot** from the Join the Change
  campaign video. It's in Finn's Drive. A low-res copy appears in a portfolio collage
  (underwater swimmer in blue light, next to a woman lit by a screen and a wind farm), which
  you can use to identify the frame. Find the master video or a full-res still, and export
  the frame at native resolution.
- Other evidence of this work: AGL brand voice guidelines, signage guidelines and an eDM
  approach (seen as deck pages). If the source decks exist, note them. They may support
  "What I wrote".
- **Copy:** this case is new. It was split out of a combined AGL × Netflix case, so only a
  brief exists. Look for anything about the rebrand platform, tone of voice, templates or
  the brand voice guidelines.
- Known: Big Red Communications, Lead Creative Copywriter, 2023. Start with
  `04_WORK/Career/` (the extended case-studies résumé, `…resume_extended-case-studies_v1`).

**2. AGL × Netflix: Can't live without Netflix**
- **Confirm the exact line.** The social ads read "Can't live without Netflix while working
  out?" / "…while in the garden?". Is the platform line "Can't live without Netflix" or
  "You can't live without Netflix"?
- **Hero:** the TV Dad broadcast spot (a hero frame) or the strongest retail or social
  execution. The 15s and 30s scripts and any Bridgerton-hook executions are relevant.

**3. Afterpay: However You Christmas Afterpay It**
- Hero is 600×800; find the full-size key visual or archetype executions (the Grinch, the
  Giver, the long luncher, the summer holidayer).
- **Facts missing:** year, agency, Finn's role.

**4. Youi: You-Shaped Insurance**
- Hero is a 600×800 collage. Find the individual executions at full size: the You-shaped
  car air freshener and the NRL You-shaped goal post especially.

**5. 7-Eleven: Summer 24/7**
- 1280×720 now. Look for a hero frame from the day/night looping film at full resolution.
  Known: CHEP Network, Copywriter, 2021–22, 25th anniversary in Australia.

**6. Welly: 5 a day the easy way**
- Hero is fine. **Confirm the line:** existing copy says "Easy way to get 5 a day"; Finn's
  list says "5 a day the easy way". Which ran?

**7. Inke: Send Joy** *(new: needs everything)*
- Brand platform for Inke (custom sustainable packaging, possibly "Inke Packaging").
  Find any platform deck, tone-of-voice doc, web copy, and campaign visuals.

**8. The Grove Distillery: The Spirit Of**
- **Confirm the full line.** Is "The Spirit Of" complete, or is it the start of a longer
  line? Existing copy also cites "Distilled with a story. Delivered to you." and "Made on
  this land. Distilled in history." How do they relate?
- Lead: `99_ARCHIVE/The Grove Rum Campaign.zip` (the current hero is the Caribbean Spiced
  product shot from it). Look for a stronger brand or campaign image there.

**9. Coca-Cola × Amazon Alexa: Share a Coke with Alexa**
- Hero is 801×311, a thin banner. Find a proper key visual or a frame from the promotion.
- Known: VERSA (with CHEP, BRX), Copywriter & Chat Flow Designer. Voice and chat-flow
  work, not a traditional ad. Starting point: `04_WORK/Folio`.

**10. Tekspace: Research** *(new)*
- Tagged Content Strategy. **Clarify what "Research" refers to** (a report, a content
  series, a research-led platform?) and find the deliverable and any visuals.

**11. Bowen St Press** *(new)*
- Tagged Branding. Find the identity work: logo, applications, any brand guidelines.
  The platform line is unknown; report one if it exists.

**12. Google Assistant × Smiling Mind** *(new)*
- Tagged UX Writing. Find conversation scripts, flow docs, and any screenshots or promo
  visuals. Flag anything that looks internal to Google.

**13. Victoria Police: Blue Space** *(new)*
- Find the campaign or program material and visuals. Flag sensitivity: wellbeing content
  and police imagery.

**14. Woolworths: Olive** *(new)*
- Olive, Woolworths' customer chatbot. Find conversation design or personality docs,
  sample dialogue, and any visuals. Note the agency and year (VERSA era?).

**15. G8 Education: The Film Diary**
- 960×540 now. Find full-res frames from the film-diary work. Flag children's faces.
- Note: an older portfolio called a similar case "CJ Education". Check whether this is the
  same work and which name is right.
- **Facts missing:** year, agency, Finn's role.

---

## Where to look

Start with what's known, then widen:

1. `04_WORK/Folio`: portfolio masters (some current heroes came from here)
2. `04_WORK/Career/`: résumés and the extended case-studies doc
3. `99_ARCHIVE/`: project archives and zips (e.g. `The Grove Rum Campaign.zip`)
4. Then search Drive by brand name, platform line and agency (Big Red, CHEP, VERSA, BRX,
   Deepend, Fuel Agency), and by file type: `.mp4/.mov` for films, `.ai/.svg/.eps` for
   logos, decks for strategy and tone-of-voice work.

Docs where Finn has **written about** the work (case-study drafts, award entries, LinkedIn
or Medium drafts, pitch decks, résumé variants) are the most valuable copy sources. Quote
them exactly.

---

## When you're done

Reply with:
1. The output folder link
2. A one-line status per case: **complete** / **partial (what's missing)** / **nothing found**
3. Every wording question above, answered or marked unresolved:
   Netflix line, Welly line, Grove line, Tekspace "Research", G8 vs "CJ Education"
4. Anything flagged for sensitivity
