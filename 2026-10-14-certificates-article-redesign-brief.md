# Brief for GPT — redesign "I got all the Google AI certificates"

**Status:** ready to run. The article is live and unblocked, so this is an improvement pass, not a fix.
**Article:** `src/content/essays/four-things-i-built.md`, published 2026-09-06, live at `/writing/four-things-i-built`.
**Who this is for:** paste the whole file into GPT. It covers the visual redesign, the picture set, and the copy changes. Nothing here needs the repo open.

---

## The ask in one line

The article argues that eight certificates produced four working tools. It shows the certificates and none of the tools.

---

## What is there now

| | |
|---|---|
| Words | 618 |
| Paragraphs | 9 |
| Section headings | 0 |
| Pictures in the body | 0 |
| Hero | one, 1939 x 1097 PNG |

For comparison, the house pattern on this site is the essay published five weeks later, *The word that had no business being there*: 1,407 words, seven headings, four captioned pictures, each with a one-line italic caption under it (`*Pope technique: hyperbole.*`) and a closing section that discloses the pictures were machine-made.

The certificates piece predates that pattern. It reads as a wall.

### The hero is the main problem

It is a ring of eight Google course-completion badges on a pale ground, with a blue felt-tip sunburst behind them, a red dot top left, a green line through the lower left and a yellow squiggle bottom right.

Four faults, in order of severity:

1. **It is in Google's colours, not Finn's.** Blue, red, yellow, green. The Astle Creative system is monochrome with a single guest accent. The one picture at the top of the article is the only thing on the page that is not in the brand.
2. **The badge names contradict the copy.** The hero shows *AI for Research and Insights* and *AI for App Deployment*. The article lists *Generative AI for Everyone* and *AI for Product Management*. Two of eight do not match. Fix the fact before fixing the picture: confirm which eight are actually held, and make the copy and the image agree.
3. **It does not survive the column.** The text column is capped at 40rem (roughly 700px). Half the hero canvas is empty on the left, so the badges land small and the badge text is unreadable at the size it actually renders.
4. **The squiggles are decoration.** The red dot, the green line and the yellow squiggle do not mean anything. In this system, marks are load-bearing or they are out.

---

## The brand it has to sit inside

Non-negotiable:

- **Palette.** Ink `#0F0F0E`, Graphite `#6F6B63`, Paper `#FAF9F6`, Card `#FFFFFF`. One accent, vermilion `#D9360F`, used **once per view**. No Google blue, no second accent, no gradients.
- **Type.** Three voices kept apart: Instrument Serif italic for display, Cousine (mono) for body, labels, captions and metadata, Inter for interface text only.
- **Marks.** Hand-drawn, scanned from real ink and felt-tip. The sun-ray flourish, the ink yin-yang, the cloud, the filmic dashed tab, and the FA sun signature as the primary mark. Never redraw these as clean vectors. If a mark is needed and the real file has not been supplied, say so rather than inventing a lookalike.
- **Avoid.** Warm cream plus terracotta, purple-to-blue gradients, rounded corners everywhere, centred everything. The generic AI-design look is close enough to monochrome-plus-accent to be a real risk here.

---

## The redesign

### 1. New hero: eight done, one open

Keep the sunburst as a form, because it is already right, and rebuild it in the system.

- The burst is the real felt-tip sun-ray flourish, in ink on paper, not a blue vector.
- Nine positions around it. Eight filled, one empty.
- The eight filled positions are Finn's own marks, not Google's badge assets. Scanned, bitonal, irregular.
- The ninth position is empty and outlined in vermilion. That is the single accent appearance on the page, and it marks the certificate not yet held: the Google Cloud Generative AI Leader path.
- Square or 3:2, built for a 700px column. Nothing of consequence in the outer margins.

The idea is that the accent marks the unfinished one. The article's whole move is that finishing a course is the least interesting part, so the one thing in colour should be the thing not done.

**Practical note:** image models still set type badly. Do not generate the badge labels as part of the picture. Either leave the positions wordless, or set the labels in Cousine afterwards.

### 2. Four pictures, one per tool, and they must be real

Almanac, Source Material, the Icon Pack, DreadSwipe. Each gets a picture, placed with its paragraph.

**These four are screenshots, not generated images.** The argument of the article is that these things exist. A generated picture of a dashboard that was never built would wreck it. Finn supplies the screenshots; the job here is the treatment, the crop and the caption, not the picture.

Treatment spec: flat crop on Paper, no device mockup, no drop shadow, no browser chrome, no perspective. If a frame is needed, the filmic dashed tab as a left-margin spine.

### 3. Caption device

Carry over the Pope pattern: one italic line under each picture, same construction every time.

```
*Certificate: AI for Data Analysis. Built: Almanac.*
```

It does the work the body copy currently has to do, and it makes the certificate-to-tool claim checkable at a glance four times.

### 4. Headings

Four H2s, one per tool, plus a closer. The pattern on this site is short and declarative, not labels: *Look at what she chose*, *The device is a slot*, *The part that doesn't automate*. Do not title them "Almanac", "Source Material" and so on, as the links already do that.

### 5. Alt text

Long and literal, as on the Pope essay, and it names what the picture actually is. Where an image is machine-made, the alt text says so in its final clause. The current hero alt should be rewritten with the new picture.

---

## Copy changes

Three, and only three. The piece is not being rewritten.

**1. Fix the eight.** Make the list in paragraph three match the badges actually held. Two currently do not match the hero.

**2. Name what is next.** The article closes on "On to the next course", which is a shrug. It should name it: the **Google Cloud Generative AI Leader** learning path, heading toward the **Professional Cloud Architect** certification. That reframes the ending from a sign-off into a direction, and it gives the vermilion ninth position in the hero something to point at.

Starting point for that line, not a final draft:

> Next one's already started. Google Cloud Generative AI Leader, then the Professional Cloud Architect certification, which is a different animal: less about what the model can do, more about what it costs to run and who it falls over on.

**Confirm before publishing:** Google calls these certifications, not licences, and Generative AI Leader and Professional Cloud Architect are two separate credentials rather than one path. Get the names and the order right, and say which one is actually in progress today.

**3. Handle the title.** "I got **all** the Google AI certificates" stops being true the moment the last paragraph names a ninth. Either the title acknowledges that, or the closing paragraph does. The second is better and nearly free: "all" was true for about a day.

---

## Technical specs

- **Format.** PNG, in `src/assets/writing/four-things-i-built/`. The hero stays where it is or moves into that folder with the frontmatter updated.
- **Size.** Match the existing house set: 1122 x 1402 for portrait, or equivalent long edge for landscape. Astro resizes to 480 and 960 and serves WebP, so oversized sources are fine, but animated GIF is not. There is a separate brief on that.
- **Markdown.** Image, blank line, italic caption, blank line. Exactly as in `inconvenient-truth-for-copywriters-reply.md`.
- **Weight.** The page currently ships one 360KB hero. Five pictures should land well under 2MB total after Astro's pass.

---

## Hand back

1. The new hero, plus the prompt used to make it.
2. Crop, treatment and caption spec for the four screenshots.
3. Four H2s.
4. Alt text for all five pictures.
5. The three copy edits as exact replacement text.

## Open questions

- Which eight certificates are actually held? The hero and the copy disagree on two.
- Which Google Cloud credential is in progress right now, and what is it properly called?
- Do screenshots of all four tools exist, or does one of them need to be built out enough to photograph?
