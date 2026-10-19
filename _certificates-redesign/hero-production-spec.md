# Hero: eight done, one open

Output: `src/assets/writing/four-things-i-built/eight-done-one-open.png`, 1402 × 1402 PNG.
Currently in Drive, not in this repo.

No image-generation prompt was used. This is a raster composition of the supplied scans,
assembled with `compose-hero.cjs` (in the Drive pack; it needs `sharp`, and its
runtime-specific require path has to be updated for another machine). Source contours are
retained rather than replaced by clean vector geometry. The upper light half-sun silhouette
in `sun-flourish.png` supplies both the central outline and the smaller empty vermilion
outline. No FA signature is claimed.

Eight occupied positions use the ohm, flower, smiley, yin-yang, cloud and solid sun scans;
**the ohm and the flower repeat.** Only six distinct standalone motifs were supplied, so the
composition counts eight completed positions without pretending each motif identifies a
particular certificate. The ninth, upper-left position is empty. The hero stays wordless.

## Processing

Crop the upper half-sun from the paired source; derive its outline directly from the raster
silhouette; discard the lower vermilion source variant. Crop the unrelated printed “10” out
of the yin-yang scan. Normalise marks to bitonal Ink on Paper, keeping source silhouettes and
ink irregularity. For the coloured flower and smiley, keep existing dark details and the
source silhouette edge. The outline is `#D9360F`; other marks are `#0F0F0E`; background
`#FAF9F6`. No new decorative mark was drawn.

## Composition recipe

> Set a 1402px Paper square. Place the scanned half-sun outline centrally at 380px width.
> Arrange nine positions clockwise from the top on a 485px-radius ring. Fill the first eight
> with the supplied black scan motifs at up to 175px width, reusing the ohm and flower. Leave
> the ninth empty inside the same scan-derived outline, in vermilion. Add no text, badge
> assets, gradients, extra flourishes or framing.

## Known limits — read before merging

1. **Two motifs repeat.** Eight distinct marks were asked for; six were supplied. Two more
   distinct scans would fix this properly.
2. **The central outline is upscaled.** The source flourish is 200 × 200px and supplied as a
   pair; its usable upper crop is roughly 138 × 57px, blown up to a 380px-wide central
   element. Scan roughness is visible. A higher-resolution original would fix this without
   changing the design.
3. **The accent budget is per view, not per image.** The vermilion ninth outline is the one
   accent in the picture, but existing vermilion links or buttons may add another in the same
   viewport. Check the hero against the real page, not on its own.

## Alt text

> An off-white square with a black outline of the scanned felt-tip half-sun flourish at the
> centre. Around it are eight black marks: two ohm stamps, two flowers, a smiley face, a
> yin-yang, a cloud and a solid half-sun. A ninth position at the upper left contains an empty
> vermilion outline of the flourish, representing the next credential still to be earned. The
> composition uses supplied scans, with two motifs repeated.

Literal, and it discloses the repetition rather than hiding it.

## Layout checks

Checked at 700px and 350px; both previews are in the Drive pack. Eight occupied positions and
one outlined empty position stay distinct at both sizes. No site CSS has been changed.
