# Prompt kit

The slot grammar, worked examples, and the ways this goes wrong.

## The slot line

Everything variable lives in one sentence, placed before the constant block:

> A **[ARCHIVAL FORM]** of **[THE OBJECT]**, **[ONE CONCRETE STRUCTURAL DETAIL]**, with
> **[THE VERMILION ELEMENT]** picked out in solid vermilion.

Four slots, in this order, because the order is what keeps the model on the object instead of
drifting into a scene.

**ARCHIVAL FORM** — one from the menu in `SKILL.md`. Name it plainly: *a patent drawing*, *a
museum specimen plate*, *a punch-card tabulator readout*. Don't name a decade; naming the
document type gets you the period for free, and naming a decade tends to summon a stock-photo
pastiche of that decade instead.

**THE OBJECT** — the noun from step one, physical and alone. Add the two or three features that
make it that object and not a generic one.

**ONE CONCRETE STRUCTURAL DETAIL** — the single detail that makes it look catalogued rather than
drawn: figure callout numbers, a mounting pin, a punched row of holes, a ruled margin, a
specimen label plate, a fold crease, a stitched binding edge. One. Two reads as clutter.

**THE VERMILION ELEMENT** — what the section is about, named as a specific part of the object.
Not "a red accent". *The one punched hole that is filled in.* *The single leaf that is still
attached.* *The thread that runs out of the binding.*

## Worked examples

### 1. Shipped: the certificates essay, tail

Argument: finishing a course is the least interesting part.
Object: the certificate. Vermilion: the one ribbon that keeps going.

> A formal certificate, portrait orientation, with a ruled double border, an empty circular seal
> at the lower left and short horizontal rule marks standing in for its lines of text, is fed
> halfway into the slot of a plain desktop paper shredder, seen straight on. Below the slot the
> document comes out as long vertical ribbons that curl, kink and tangle as they fall, some
> crossing each other. One single ribbon, and only one, is solid vermilion.

Why it worked: one object, frontal, no scene, the seal as the structural detail, and the
vermilion marks the thing the essay is actually about. It also came back on a transparent ground,
which made the mask split clean. Assets: `public/writing/four-things-i-built/shredder-*.png`.

### 2. An opener, from the same essay's argument

Argument: a certificate only proves you sat still.

> A museum specimen plate of a single office chair, mounted and pinned as though it were an
> insect, with a small engraved specimen label plate below it, and the one pin through its seat
> picked out in solid vermilion.

The form argues with the subject — a chair filed as natural history — which is where the register
earns its keep.

### 3. A section picture, idea not evidence

Argument: a taste you can't explain is a bad thing to keep only in your head.

> A botanical plate of a single branching plant whose leaves are paint swatches rather than
> leaves, each one numbered with a small figure callout, with the one unnumbered leaf picked out
> in solid vermilion.

Note what this is *not*: it is not a picture of Source Material, the built tool. That claim needs
a screenshot. This illustrates the idea the section opens with, and sits well away from the
sentence that says the thing exists.

## Failure cases

**The scene creeps back in.** You get a desk, a window, a person's hands. Cause: the object slot
was abstract. Fix: make the noun more physical and add a structural detail.

**Generic AI gloss.** Soft gradients, glow, depth of field, a floating 3D object. Cause: the
constant block was trimmed. It is not boilerplate — paste all of it.

**Legible text appears anyway.** Models write on documents by reflex. Add *no legible letterforms
anywhere; all text is ruled strokes only* a second time, inside the slot line. Regenerate rather
than accepting a near-miss; a half-legible word is worse than none.

**Two accents.** Usually a second warm element the model added. Regenerate — don't fix it in post,
because the mask step will split on hue and quietly pick up both.

**Nothing to mask.** The image came back shaded or textured. The pipeline needs flat line art; a
beautiful shaded version is still the wrong asset.

**The decade showed up instead of the document.** Naming "1950s" gets a pastiche. Name the
document type and let the period arrive on its own.

## Choosing between returns

Generate several, then:

1. Cover the vermilion. Does the picture still read as the object? If not, the accent is doing
   work the drawing should do.
2. Shrink it to 350px. Does it survive? Tails and section pictures are often seen small.
3. Does any part invite a reader to think it is a photograph of something that exists? If so,
   it is in the wrong register for that passage.
4. Flat enough to mask? Plain or transparent ground, two colours, no shading.

## Processing

```
python3 -I .claude/skills/article-images/scripts/make-masks.py <image> public/writing/<slug> <name>
```

Prints the CSS and markup. Check the ink/accent pixel split it reports: an accent count near
zero means the vermilion didn't survive, and a very high one means it caught more than intended.
