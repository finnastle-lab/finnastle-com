# Studio logos

Drop a brand's logo here as `<key>.svg` (preferred) or a transparent `<key>.png` / `.webp`.
`/studio` picks it up by filename, with no code change, for every case that lists that key.

SVGs are inlined with every fill set to `currentColor`, so they render as flat ink:
black on light, white on dark, following the theme toggle. Any colour is fine, but
there must be no background shape, and no detail that only shows as a second colour
(white knockouts vanish). Rasters are recoloured by the `.mark` filter and need a
transparent background.

A case shows logos only when every key it lists has a file; otherwise the brand is
set in type.

From npm (Simple Icons, SVG Logos): `netflix` `coca-cola` `amazon-alexa` `afterpay`
`google-assistant`.

`inke.png` is a luminance knockout of the shopfront vinyl in `../inke.webp` — the real
lettering, not a redraw, so it carries a little of the photograph's texture. Replace it
if the master file turns up.

Keys in use: `agl` `netflix` `afterpay` `youi` `7-eleven` `welly` `inke` `grove-distillery`
`coca-cola` `amazon-alexa` `tekspace` `google-assistant` `smiling-mind` `victoria-police`
`woolworths` `g8-education`

If a key has no file, the brand name stands in as type.
