---
name: article-images
description: Decide, generate, process and place the pictures for an essay on finnastle.com. Use whenever an article needs imagery — a hero, section pictures or a tail mark — or when a draft is written and the question is "what goes in it". Covers choosing what the picture is of, the archival alternate-history prompt register, the two-mask pipeline that makes generated art theme-aware, captions, alt text and disclosure.
---

# Article images

The writing is never the hard part. The pictures are, and they come last, which is the worst
time to start deciding. This exists so the deciding is already done.

## Rule zero: ideas or evidence

Before anything else, work out which kind of picture the passage needs.

**Evidence.** The passage claims a thing exists — a tool, a result, a page that was actually
built. The picture must be real: a screenshot, a photograph. Generating one is not a style
choice, it is a false claim, and it takes the rest of the piece down with it.

**Ideas.** The passage makes an argument, names a feeling, describes a problem. Nothing is
being claimed as a built artifact. Generate freely.

Most essays need both. Get this backwards and nothing downstream matters.

## The three visual voices

The brand holds three type voices apart without blending them. The pictures work the same way,
and the same rule applies: never let one do another's job.

| Voice | What it is | Who makes it |
|---|---|---|
| **The hand** | Real scanned ink and felt-tip. The sun signature, the flourish, the yin-yang, the cloud. | Finn. Scans only. |
| **The archive** | Generated artifacts from a technical past that never happened. | A model, per this skill. |
| **The record** | Screenshots and photographs of things that exist. | Captured, never generated. |

**Never ask a model for the hand.** That style does not survive the attempt — the results come
back as repeated motifs and upscaled mush, and a convincing fake of a real mark would be the
one unambiguous brand failure available. If a mark is wanted and no scan exists, say so.

The archive register is chosen precisely because it is nothing like the hand. The two sit in
one essay without competing, because they are visibly doing different jobs.

## Deciding what the picture is of

This is the part that stalls, so it is a procedure, not a judgement call.

**1. Name the thing at the centre of the section.** Every section is about one thing. Write it
as a noun. Not "automating reporting" — *a weekly report*. Not "documenting taste" — *a style
guide*. If the noun won't come, the section isn't finished and the picture isn't the problem.

**2. Make it an object.** The picture is that noun as a physical thing, alone. Never a person,
never a desk, never a workspace, never a glowing abstraction of "AI". Objects are what this
register renders well and what generic AI imagery does badly, so this rule earns its keep twice.

**3. File it in an archive that never existed.** Render the object as a document or specimen
catalogued by an institution that would have had no reason to exist — the thing patented,
diagrammed, filed, mounted or indexed decades before it could have been. That gap is the whole
effect. A weekly social-media report is dull; a 1950s tabulator card recording one post's reach
is not.

**4. Name what the vermilion marks.** Exactly one element is vermilion, and it must be the thing
the section is actually about. If you cannot say what it marks, go back to step one.

### Archival forms

Pick one per picture and vary across an essay. The form should argue with the subject, not match
it — the further the filing system is from the thing being filed, the better it works.

patent drawing · technical-manual exploded diagram · museum specimen plate · botanical plate ·
index or filing card · punch-card or tabulator readout · engineering blueprint elevation ·
instruction-manual step figure · catalogue entry plate · laboratory logbook page · microfiche
frame · wiring or signal-flow schematic · surveyor's plan · type specimen sheet

## Writing the prompt

Two parts: a constant block that never changes, and one line that does. The full grammar,
the worked examples and the failure cases are in `references/prompt-kit.md` — read it before
writing the variable line for the first time in a session.

The constant block, pasted every time:

```
Flat hand-inked line illustration, one flat black ink on a plain off-white ground, visible pen
irregularity — uneven line weight, slight wobble, small bleed where the nib paused. Exactly one
element is solid vermilion; everything else is black on off-white. No legible letterforms
anywhere: all text is suggested by ruled strokes only. Flat and frontal — no perspective, no
shading, no gradients, no drop shadows, no glossy or three-dimensional rendering, no colour
beyond the single vermilion element. The subject sits in the middle third with the outer eighth
of the frame left clear.
```

Negative, every time:

```
text, lettering, words, numbers, logos, brand marks, blue, yellow, green, gradient, 3D render,
photorealism, glossy, drop shadow, rounded corners, symmetrical centred composition, watermark,
signature, people, hands, faces, desks, computer screens
```

Values if the model takes them: ink `#0F0F0E`, ground `#FAF9F6`, the one accent `#D9360F`.

**Ask for a transparent background where the model supports it.** It costs nothing and it makes
the processing step below cleaner.

## Two rules that are not style preferences

**No legible type, ever.** Image models still set type badly, and a hero carrying a misspelled
word undoes the piece. Rule marks and figure-number shapes only. Real labels are set afterwards
in Cousine.

**One accent, and it is load-bearing.** One vermilion element per picture, marking the thing the
section is about. This is also what makes the picture theme-aware downstream, so it is a
technical requirement as much as a brand one.

## Processing: making it theme-aware

The site has a manual dark-mode toggle, so `<picture>` with a `prefers-color-scheme` media query
is not enough — it follows the OS and ignores the toggle. A second inverted export is also wrong:
inverting takes the vermilion to cyan.

Instead, split the picture into two alpha masks and let CSS paint them with the tokens. One asset
pair covers light, dark and the toggle, and the accent follows `--accent` automatically.

```
python3 -I .claude/skills/article-images/scripts/make-masks.py <image> <out-dir> <slug>
```

It prints the exact CSS and markup to paste. The `.mark` helper in `global.css` cannot be used
here — it recolours with `brightness(0) invert()`, which flattens everything to one colour and
takes the vermilion with it.

The pipeline only works if the prompt was followed: flat line art, one accent, plain or
transparent ground. A shaded or photographic image has no clean masks to cut.

## How many, and where

- **Opener.** The essay's whole argument as one object. One per essay.
- **Section pictures.** At most one per H2, and not every H2 earns one. Three good ones beat
  six dutiful ones.
- **Tail.** Optional, and it carries the consequence of the argument rather than restating it.
  Smaller than the opener — `width: min(100%, 20rem)` — and it sits after the last paragraph.

## Caption and alt

Caption: one italic line under the picture, the same construction every time within an essay.
The house pattern is a colon-separated pair, e.g. `*Certificate: AI for Data Analysis. Built:
Almanac.*` Markdown is image, blank line, italic caption, blank line.

Alt: long and literal, describing what is actually in the frame rather than what it means.
**Every generated picture discloses itself in the final clause** — `The drawing is machine-made.`
Screenshots and photographs carry no such clause, and that difference is the point: it is what
makes the disclosure mean something.

## Before it ships

- Does any generated picture sit next to a claim that something exists? Fix that first.
- One vermilion element per picture, and can you say what it marks?
- Any legible letterform anywhere in the frame?
- Does the accent now appear more than once per viewport across the whole page?
- Alt text literal, and disclosed if generated?
- Checked at 350px as well as 700px?
