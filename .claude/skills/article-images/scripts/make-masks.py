#!/usr/bin/env python3
"""Split a flat two-colour illustration into ink and accent alpha masks.

The site has a manual dark-mode toggle, so a <picture> media query isn't enough,
and a second inverted export would take the vermilion to cyan. Instead we cut the
drawing into two alpha masks and let CSS paint them with var(--ink) and
var(--accent): one asset pair covers light, dark and the toggle, and the accent
follows the token.

Needs flat line art with one accent colour on a plain or transparent ground.
A shaded or photographic image has no clean masks to cut.

    python3 -I make-masks.py <image> <out-dir> <slug>

Writes <slug>-ink.png and <slug>-accent.png, and prints the CSS and markup.
"""

import os
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit("needs Pillow:  pip install Pillow")

# Alpha levels kept in the delivered masks. Line art survives 8 with no visible
# change and compresses to roughly a third of the full-depth file.
ALPHA_LEVELS = 8
MAX_WIDTH = 1400
GROUND_CUTOFF = 238   # at or above this on all channels, treat as background
ALPHA_CUTOFF = 8


def is_accent(r, g, b):
    """Warm chromatic pixel — the vermilion, separated from ink by hue."""
    return r > 110 and r - g > 55 and r - b > 55


def quantise(mask, levels=ALPHA_LEVELS):
    step = 256 // levels
    return mask.point(lambda v: min(255, (v + step // 2) // step * step))


def split(path):
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    px = im.load()

    ink = Image.new("L", (w, h), 0)
    acc = Image.new("L", (w, h), 0)
    ip, ap = ink.load(), acc.load()

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < ALPHA_CUTOFF:
                continue
            if r >= GROUND_CUTOFF and g >= GROUND_CUTOFF and b >= GROUND_CUTOFF:
                continue  # plain light ground, drop it
            if is_accent(r, g, b):
                ap[x, y] = a
            else:
                # Darker ink reads as more opaque, so a light-grey antialias edge
                # doesn't come back as a hard pixel.
                ip[x, y] = min(a, 255 - min(r, g, b))
    return ink, acc


def main():
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    src, outdir, slug = sys.argv[1], sys.argv[2], sys.argv[3]
    os.makedirs(outdir, exist_ok=True)

    ink, acc = split(src)
    ink_px = ink.width * ink.height - ink.histogram()[0]
    acc_px = acc.width * acc.height - acc.histogram()[0]
    if not ink_px:
        sys.exit("no ink found — is the image flat line art on a light ground?")

    # Crop both to the union of their content so dead margins don't ship.
    boxes = [m.getbbox() for m in (ink, acc) if m.getbbox()]
    bb = (min(b[0] for b in boxes), min(b[1] for b in boxes),
          max(b[2] for b in boxes), max(b[3] for b in boxes))
    ink, acc = ink.crop(bb), acc.crop(bb)

    if ink.width > MAX_WIDTH:
        nh = round(ink.height * MAX_WIDTH / ink.width)
        ink = ink.resize((MAX_WIDTH, nh), Image.LANCZOS)
        acc = acc.resize((MAX_WIDTH, nh), Image.LANCZOS)

    paths = {}
    for name, mask in (("ink", ink), ("accent", acc)):
        out = Image.new("RGBA", mask.size, (0, 0, 0, 0))
        out.putalpha(quantise(mask))
        p = os.path.join(outdir, f"{slug}-{name}.png")
        out.save(p, optimize=True)
        paths[name] = p

    w, h = ink.size
    total = sum(os.path.getsize(p) for p in paths.values())
    web = "/" + outdir.split("public/", 1)[-1].strip("/") if "public/" in outdir else outdir

    print(f"ink {ink_px} px   accent {acc_px} px   delivered {w}x{h}   {total // 1024}KB")
    if acc_px == 0:
        print("!! no accent found — the vermilion element didn't survive generation")
    elif acc_px > ink_px * 0.4:
        print("!! accent is unusually large — check it caught only the one element")

    print(f"""
--- CSS ---------------------------------------------------------------------
.{slug} {{
  position: relative;
  width: min(100%, 20rem);
  aspect-ratio: {w} / {h};
  margin: 3rem auto 0.5rem;
}}
.{slug} span {{
  position: absolute;
  inset: 0;
  -webkit-mask-position: center; mask-position: center;
  -webkit-mask-size: contain;    mask-size: contain;
  -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
}}
.{slug}-ink {{
  background: var(--ink);
  -webkit-mask-image: url('{web}/{slug}-ink.png');
  mask-image: url('{web}/{slug}-ink.png');
}}
.{slug}-accent {{
  background: var(--accent);
  -webkit-mask-image: url('{web}/{slug}-accent.png');
  mask-image: url('{web}/{slug}-accent.png');
}}

--- Markdown ----------------------------------------------------------------
<div class="{slug}" role="img" aria-label="LITERAL DESCRIPTION. The drawing is machine-made.">
  <span class="{slug}-ink"></span>
  <span class="{slug}-accent"></span>
</div>
-----------------------------------------------------------------------------""")


if __name__ == "__main__":
    main()
