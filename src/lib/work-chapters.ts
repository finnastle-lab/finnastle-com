import { getImage } from 'astro:assets';

// Art chapters, sourced from 01_ART project folders. Each chapter = one key
// image + an optional gallery. Add chapters by dropping images into
// src/assets/work/<chapter>/ (00-key.* sorts first).
const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/work/*/*.{png,jpg,jpeg}',
  { eager: true },
);

export const CHAPTER_META: Record<string, { title: string; blurb?: string }> = {
  'irrespective': { title: 'Irrespective' },
  'vest-chain-cans': { title: 'Knock Off' },
  'bougainvillea': { title: 'Bougainvillea: Sydney Views' },
  'reebok-running': { title: 'Apocalypse' },
  'engine-oil-afternoon': {
    title: 'Engine Oil',
    blurb: 'A series inspired by the garish design of engine oil bottles.',
  },
  'extreme-golf': { title: 'Extreme Golf' },
  'blues-angels-crossing': { title: 'Blues Angels Crossing' },
  'paper-universe': { title: 'Paper Universe' },
  'highway-blues': { title: 'Highway Blues' },
  'vintage-car-gas-station': { title: 'Vintage Car, Gas Station' },
  'mays-end': { title: "May's End" },
  // Staged in src/assets/work/ but deliberately unlisted below: it will NOT
  // render until its slug is added to CHAPTER_ORDER.
  //   'harbour-bridge-scene'  (2 images)  - needs a title
};
export const CHAPTER_ORDER = [
  'irrespective', 'vest-chain-cans', 'bougainvillea',
  'reebok-running', 'engine-oil-afternoon', 'extreme-golf',
  'blues-angels-crossing', 'paper-universe',
  'highway-blues', 'vintage-car-gas-station', 'mays-end',
];

function rawGroups(): Record<string, ImageMetadata[]> {
  const groups: Record<string, ImageMetadata[]> = {};
  for (const [path, mod] of Object.entries(files)) {
    const m = path.match(/\/work\/([^/]+)\//);
    if (!m) continue;
    (groups[m[1]] ??= []).push(mod.default);
  }
  for (const k in groups) groups[k].sort((a, b) => (a.src < b.src ? -1 : 1));
  return groups;
}

export function chapterSlugs(): string[] {
  const groups = rawGroups();
  return CHAPTER_ORDER.filter((k) => groups[k]);
}

/** Lightweight index data: key image only (for the /work grid). Returns the raw
 *  ImageMetadata so the page can render it through <Image>, which emits the
 *  intrinsic width/height the grid needs to reserve space before load. */
export function getChapterCards() {
  const groups = rawGroups();
  return chapterSlugs().map((k) => {
    const imgs = groups[k];
    return { slug: k, title: CHAPTER_META[k].title, blurb: CHAPTER_META[k].blurb, count: imgs.length, key: imgs[0] };
  });
}

// The key image tops out at 944 CSS px, so a 2x display wants ~1888 real ones.
// A single 1100px render was serving those screens at about 58%. Ask for a
// ladder up to that instead, but never past the source: upscaling costs bytes
// and buys nothing, and several chapters are only 1250-1600px wide to begin
// with. Those still land short of 2x — that is a source ceiling, not a
// rendering one, and no srcset will fix it.
const KEY_MAX = 1888;
const KEY_STEPS = [480, 720, 960, 1280, 1600];
const KEY_SIZES = '(max-width: 62rem) 100vw, 944px';

function keyWidths(im: ImageMetadata): number[] {
  const cap = Math.min(im.width, KEY_MAX);
  return [...new Set([...KEY_STEPS.filter((w) => w < cap), cap])];
}

/** Full chapter data: large + thumb variants for every image (for /work/[chapter]). */
export async function getChapterDetail(slug: string) {
  const groups = rawGroups();
  const imgs = groups[slug];
  if (!imgs) return null;
  const large = await Promise.all(
    imgs.map((im) => getImage({ src: im, widths: keyWidths(im), sizes: KEY_SIZES, format: 'webp' })),
  );
  const thumb = await Promise.all(imgs.map((im) => getImage({ src: im, width: 320, format: 'webp' })));
  // Intrinsic dimensions come from the source, not the resized output: they
  // describe the artwork's shape, which is what the aspect-ratio box needs.
  const dims = imgs.map((im) => ({ w: im.width, h: im.height }));
  return { slug, title: CHAPTER_META[slug].title, blurb: CHAPTER_META[slug].blurb, count: imgs.length, large, thumb, dims };
}
