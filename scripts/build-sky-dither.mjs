// Builds the pixel-dithered sky plates for the homepage atmosphere panel.
//
// The Figma study's cloud fill is a 440 x 293 review copy stretched across a
// 1248px frame, and the blockiness that came out of that is the look the design
// approved: ordered-dither pixel art, video-game sky, high-key and warm at the
// horizon. So this script makes that deliberate instead of accidental — it
// reduces the repo's own full-resolution cloud photographs to the same 440px
// grid and quantises them against a fixed twelve-tone sky palette with an 8x8
// Bayer threshold, which is what gives the gradients their stipple.
//
// Run: node scripts/build-sky-dither.mjs
// Output: src/assets/home/sky/*.png  (committed; provenance in sources.json)

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = path.join(ROOT, 'src/assets/home/sky');

// The design width. The Figma fill was 440 x 293; holding that ratio keeps the
// cloud reading at the scale the frames draw it.
const WIDE = { w: 440, h: 293 };
const NARROW = { w: 220, h: 220 };

// Twelve tones: warm cream through pale neutral into a cool blue-grey. Picked
// off the approved frames (mean 174/186/190, saturation 0.08, nothing darker
// than mid grey), so the dither can only ever land inside that atmosphere.
const PALETTE = [
  [255, 253, 246], [250, 244, 228], [243, 233, 212],
  [241, 241, 235], [230, 231, 227],
  [223, 231, 238], [211, 221, 231], [197, 209, 222],
  [182, 195, 211], [167, 181, 199],
  [152, 167, 187], [138, 154, 175],
];

// Standard 8x8 Bayer matrix, 0..63.
const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

/** Nearest palette entry by squared RGB distance. */
function nearest(r, g, b) {
  let best = PALETTE[0];
  let bestD = Infinity;
  for (const c of PALETTE) {
    const d = (r - c[0]) ** 2 + (g - c[1]) ** 2 + (b - c[2]) ** 2;
    if (d < bestD) { bestD = d; best = c; }
  }
  return best;
}

const clamp = (n) => (n < 0 ? 0 : n > 255 ? 255 : n);

/**
 * @param {string} src            source image inside src/assets
 * @param {{w:number,h:number}} size
 * @param {object} opts
 * @param {boolean} opts.stipple  bake a dithered radial alpha (the near plate)
 */
async function plate(src, size, { stipple }) {
  // Pull the photograph down to the frames' pale, high-key atmosphere before
  // quantising: saturation out, exposure up, contrast off. Doing it here rather
  // than in a CSS filter means the shipped pixels are already the right sky,
  // so nothing has to be recoloured at runtime.
  const { data, info } = await sharp(path.join(ROOT, 'src/assets', src))
    .resize(size.w, size.h, { fit: 'cover', position: 'centre', kernel: 'lanczos3' })
    .modulate({ saturation: 0.16, brightness: 1.26 })
    .linear(0.6, 72)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);
  // One palette step is the dither spread: enough to break a band, not enough
  // to reach past the neighbouring tone.
  const spread = 26;

  for (let y = 0; y < height; y++) {
    // The vertical journey the frames carry: deeper blue with altitude, warm
    // cream at the horizon. Baked in before quantisation so the gradient is
    // dithered with everything else, instead of a smooth CSS wash sitting on
    // top of a visible pixel grid and giving it away.
    const t = y / height;
    const warmth = Math.max(0, (t - 0.46) / 0.54) ** 1.3;
    const altitude = Math.max(0, (0.52 - t) / 0.52) ** 1.2;

    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const t = BAYER[y & 7][x & 7] / 63 - 0.5;

      let r = data[i] + warmth * 30 - altitude * 16;
      let g = data[i + 1] + warmth * 12 - altitude * 7;
      let b = data[i + 2] - warmth * 26 + altitude * 10;

      const [pr, pg, pb] = nearest(
        clamp(r + t * spread), clamp(g + t * spread), clamp(b + t * spread),
      );

      const o = (y * width + x) * 4;
      out[o] = pr; out[o + 1] = pg; out[o + 2] = pb;

      if (!stipple) { out[o + 3] = 255; continue; }

      // The near plate keeps its cloud banks and loses the clear opening in
      // the middle, matching radial-gradient(118% 86% at 50% 44%, transparent
      // 26%, #000 72%). The alpha is dithered to hard on/off, so the edge
      // stipples out pixel by pixel instead of fading a blurred gradient
      // across a visible pixel grid.
      const dx = (x / width - 0.5) / 0.59;
      const dy = (y / height - 0.44) / 0.43;
      const d = Math.sqrt(dx * dx + dy * dy);
      const a = Math.min(1, Math.max(0, (d - 0.26) / 0.46));
      out[o + 3] = a > BAYER[y & 7][x & 7] / 64 ? 255 : 0;
    }
  }

  return sharp(out, { raw: { width, height, channels: 4 } })
    .png({ palette: true, colours: stipple ? 13 : 12, effort: 10 })
    .toBuffer();
}

await mkdir(OUT, { recursive: true });

const jobs = [
  ['sky-base-wide.png',   'elements/photo-sky-cumulus-clear-gap.webp', WIDE,   { stipple: false }],
  ['sky-base-narrow.png', 'elements/photo-sky-cumulus-clear-gap.webp', NARROW, { stipple: false }],
  ['sky-near-wide.png',   'elements/photo-sky-cumulus-sparse.webp',    WIDE,   { stipple: true }],
  ['sky-near-narrow.png', 'elements/photo-sky-cumulus-sparse.webp',    NARROW, { stipple: true }],
];

for (const [name, src, size, opts] of jobs) {
  const buffer = await plate(src, size, opts);
  await writeFile(path.join(OUT, name), buffer);
  console.log(`${name.padEnd(22)} ${size.w}x${size.h}  ${(buffer.length / 1024).toFixed(1)} KB  <- ${src}`);
}
