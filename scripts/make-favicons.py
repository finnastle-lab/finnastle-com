#!/usr/bin/env python3
"""Rasterise favicons from the canonical FA sunmark SVGs.

Decision 05: transparent padding, not an opaque Paper ground.
Decision 06: the dark (black) mark serves light browser chrome, the light
(white) mark serves dark chrome, selected with a media attribute on the link.

No redraw, no trace, no recolour. cairosvg renders the supplied SVG; Pillow
only scales and centres the result on a transparent square.
"""

import io
import cairosvg
from PIL import Image

SRC = "src/assets/brand/fa-sunmark"
OUT = "public"

# Fit the whole mark inside the square at this fraction of the canvas, so the
# irregular edges never touch the crop. Matches the 87.5% PR #39 used.
FIT = 0.875
# Render once, large, then downsample. The mark is 458x319.
MASTER = 2048


def render(variant):
    """cairosvg -> RGBA image of the mark on a transparent ground."""
    png = cairosvg.svg2png(
        url=f"{SRC}/fa-sunmark-{variant}.svg",
        output_width=MASTER,
        background_color=None,
    )
    return Image.open(io.BytesIO(png)).convert("RGBA")


def square(mark, size, ground=None):
    """Centre the mark on a square canvas, proportionally, never distorted."""
    box = int(size * FIT)
    w, h = mark.size
    scale = min(box / w, box / h)
    fitted = mark.resize((max(1, round(w * scale)), max(1, round(h * scale))),
                         Image.LANCZOS)
    canvas = Image.new("RGBA", (size, size), ground or (0, 0, 0, 0))
    canvas.alpha_composite(fitted, ((size - fitted.width) // 2,
                                    (size - fitted.height) // 2))
    return canvas


dark = render("dark")    # black mark
light = render("light")  # white mark

# Browser chrome: transparent, both themes.
for size in (16, 32):
    square(dark, size).save(f"{OUT}/favicon-{size}x{size}.png")
    square(light, size).save(f"{OUT}/favicon-{size}x{size}-light.png")

# ICO fallback for anything that ignores the PNG links. Black mark,
# transparent, three frames.
square(dark, 48).save(f"{OUT}/favicon.ico", format="ICO",
                      sizes=[(16, 16), (32, 32), (48, 48)])

# Apple touch icon is composited onto the home screen, where transparency
# renders black. This one keeps the opaque Paper ground on purpose.
PAPER = (250, 249, 246, 255)
square(dark, 180, ground=PAPER).save(f"{OUT}/apple-touch-icon.png")

for f in ("favicon-16x16.png", "favicon-32x32.png", "favicon-16x16-light.png",
          "favicon-32x32-light.png", "favicon.ico", "apple-touch-icon.png"):
    im = Image.open(f"{OUT}/{f}")
    alpha = im.convert("RGBA").getchannel("A")
    print(f"{f:28} {im.size!s:10} mode={im.mode:5} "
          f"min-alpha={alpha.getextrema()[0]}")
