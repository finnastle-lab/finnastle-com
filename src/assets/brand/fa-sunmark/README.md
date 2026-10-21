# Canonical FA sunmark

`fa-sunmark-dark.svg` is copied byte-for-byte from
`finnastle-lab/fa-design-system/assets/fa-sunmark-dark.svg`.
SHA-256: `f370477fea88f421ea58445779e70903672581082a012205ea148df745b11278`.

The PNG is a direct rasterisation, not a trace or redraw. Its 1280 × 948
transparent canvas preserves the old source's spacing: the proportional
1116px-wide mark starts at (82, 86). This keeps its apparent size stable
at the existing 26px nav, 18px footer and 64px home-stamp widths.

Keep the existing Astro 52px/128px WebP pipeline and theme filters.
Only the black-ink variant is needed for those filtered uses.

Favicons are also rasterised directly from the SVG, proportionally fitted
to 87.5% of each square canvas. They retain the opaque Paper (#FAF9F6)
ground so black ink remains visible in both light and dark browser chrome.
The ICO contains separate 16px, 32px and 48px images; the Apple icon is 180px.
