# Hero reprompt — the certificate getting shredded

> Superseded as a method. This was written one-off; the repeatable version is the
> `article-images` skill in `.claude/skills/`, which generalises what worked here — the
> object-not-scene rule, the single load-bearing accent, no legible type, and the mask
> pipeline that made the result theme-aware. Kept for the record of this particular picture.


The in-between option. It drops the nine-position grid, needs no new scans, and says the
article's first line — *a certificate only proves you sat still* — in one picture. It is also
the only hero concept here that argues with the title instead of illustrating it.

Target: `src/assets/writing/four-things-i-built/shredded-certificate.png`, 2103 × 1402 PNG
(3:2 landscape, 1402 short edge to match the house long-edge convention).

## The prompt

```
A hand-inked felt-tip line illustration on warm off-white paper, drawn in one flat black
ink with visible pen irregularity — uneven line weight, slight wobble, small bleed where
the nib paused. A formal certificate, portrait orientation, with a ruled double border, an
empty circular seal at the lower left and short horizontal rule marks standing in for its
lines of text, is fed halfway into the slot of a plain desktop paper shredder, seen straight
on. Below the slot the document comes out as long vertical ribbons that curl, kink and tangle
as they fall, some crossing each other, the lower ends drifting apart. One single ribbon, and
only one, is solid vermilion; every other ribbon and every other element in the picture is
black on off-white. No legible letterforms anywhere — the certificate's text is suggested by
ruled strokes only. The shredder sits within the middle third of the frame, with quiet empty
paper across the top and the outer eighth of the frame left clear. Flat and frontal: no
perspective tricks, no shading, no gradients, no drop shadows, no glossy or three-dimensional
rendering, no colour anywhere except the one vermilion ribbon.
```

Exact values, if the model takes them: ink `#0F0F0E`, paper `#FAF9F6`, the one ribbon
`#D9360F`.

**Negative prompt:** text, lettering, words, numbers, logos, Google branding, blue, yellow,
green, gradient, 3D render, photorealism, glossy, drop shadow, rounded corners, symmetrical
centred composition, watermark, signature.

## Variant B, if the mid-shred reads too busy

Same ink language and the same single-vermilion rule, but after the fact:

```
...the certificate is already gone. A loose heap of long curled paper ribbons lies on an
empty off-white surface, drawn in the same uneven black felt-tip line. Two or three ribbons
still carry fragments of a ruled border, so the heap is identifiably a shredded certificate.
One ribbon, and only one, is solid vermilion. Nothing else in the frame.
```

Quieter, more graphic, and it holds together better at 350px. Worth generating both.

## Two things not to get wrong

1. **No type in the image.** Image models still set type badly, and a hero with a
   half-legible misspelled "Certificate" on it would undo the whole point. Rule marks only.
   If a label is wanted, set it in Cousine afterwards.
2. **This is a generated picture, so it has to say so.** The four tool screenshots are real
   and need no disclosure; this does not. The Pope essay's pattern is to disclose machine-made
   pictures in the final clause of the alt text. Follow it.

## Alt text

> A hand-inked black line drawing on off-white paper of a formal certificate being fed into a
> desktop paper shredder, emerging below the slot as long curling ribbons. The certificate's
> text is drawn as plain rule marks rather than words, and one single ribbon among the black
> ones is vermilion. The picture is machine-made.

## Where it sits in the brand

Honest about what it is: a new picture drawn in the mark language, not one of the real scanned
marks. It does not pretend to be the sun-ray flourish, the yin-yang or the FA sun signature,
and it should not be asked to — those exist as real artifacts and a generated lookalike of any
of them would be the one unambiguous brand failure available here.

The single vermilion ribbon is the whole accent budget for the view. Check it against the live
page before merging: vermilion links or buttons in the same viewport would make two.
