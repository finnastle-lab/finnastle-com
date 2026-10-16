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

## Provenance

From npm (Simple Icons, SVG Logos): `netflix` `coca-cola` `amazon-alexa` `afterpay`
`google-assistant`.

From Finn's own client artwork in `~/Desktop/Client Assets` (16 Oct):

| key | source | treatment |
|---|---|---|
| `agl` | `AGL_Energy_logo.svg` | gradients dropped, flattened to one fill |
| `welly` | `welly logo.svg` | master wordmark; single path, `fill-rule="evenodd"` |
| `tekspace` | `logo-black-tekspace.svg` | viewBox cropped tight; crescent is a real hole |
| `7-eleven` | `7-Eleven-Logo.png` | already transparent, trimmed |
| `g8-education` | `g8educationlogo_landscape-blackred.png` | already transparent, trimmed |
| `youi` | `Youi_Logo_1800x1000-removebg-preview.webp` | already transparent; letters are real holes |
| `inke` | `eps_inke_logotype_black.png` | the master file — replaced the photo knockout |
| `grove-distillery` | `The-Grove-Distillery-600x600.jpg` | white ground knocked out by luminance |
| `smiling-mind` | `~/Downloads/smiling mind logo.png` | purple ground knocked out by colour distance; the smile stays a real hole |
| `det` | `det logo.png` | white-on-navy, so alpha is whiteness; "VICTORIA" stays a real hole in the triangle |
| `city-of-melbourne` | `city of melb.jpeg` | white ground knocked out; the M's facets flatten to one silhouette |

Nothing here is traced or redrawn.

`woolworths` is `logo.svg` from woolworthsgroup.com.au. It is the Woolworths **Group**
globe and wordmark, not the supermarket apple W. The apple W is not on Wikimedia
Commons and woolworths.com.au returns 403 on its asset paths. Finn chose the Group
mark over leaving the key as type.

## Still missing

`victoria-police` — the only wordmark on hand (`vic pol logo png.png`) sits 18px tall
under the badge, too small to use. The star badge flattens to a solid blob, and the
brief already ruled it out.

`city-of-melbourne` is a stacked lockup, so Astro ships it 66px wide and the type under
the M is about 8px tall. An M-only or horizontal version would sit better.

Keys in use: `agl` `netflix` `afterpay` `youi` `7-eleven` `welly` `inke` `grove-distillery`
`coca-cola` `amazon-alexa` `tekspace` `google-assistant` `smiling-mind` `victoria-police`
`woolworths` `g8-education` `city-of-melbourne` `det`

If a key has no file, the brand name stands in as type.
