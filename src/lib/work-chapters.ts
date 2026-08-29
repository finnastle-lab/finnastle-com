import { getImage } from 'astro:assets';

// Art chapters, sourced from 01_ART project folders. Each chapter = one key
// image + an optional gallery. Add chapters by dropping images into
// src/assets/work/<chapter>/ (00-key.* sorts first).
const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/work/*/*.{png,jpg,jpeg}',
  { eager: true },
);

export const CHAPTER_META: Record<string, { title: string; blurb?: string }> = {
  'bougainvillea': { title: 'Bougainvillea — Sydney Views' },
  'blues-angels-crossing': { title: 'Blues Angels Crossing' },
  'paper-universe': { title: 'Paper Universe' },
  'highway-blues': { title: 'Highway Blues' },
  'vintage-car-gas-station': { title: 'Vintage Car, Gas Station' },
  'mays-end': { title: "May's End" },
};
export const CHAPTER_ORDER = [
  'bougainvillea', 'blues-angels-crossing', 'paper-universe',
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

/** Lightweight index data: key thumb only (for the /work grid). */
export async function getChapterCards() {
  const groups = rawGroups();
  return Promise.all(
    chapterSlugs().map(async (k) => {
      const imgs = groups[k];
      const keyImg = await getImage({ src: imgs[0], width: 640, format: 'webp' });
      return { slug: k, title: CHAPTER_META[k].title, blurb: CHAPTER_META[k].blurb, count: imgs.length, key: keyImg };
    }),
  );
}

/** Full chapter data: large + thumb variants for every image (for /work/[chapter]). */
export async function getChapterDetail(slug: string) {
  const groups = rawGroups();
  const imgs = groups[slug];
  if (!imgs) return null;
  const large = await Promise.all(imgs.map((im) => getImage({ src: im, width: 1100, format: 'webp' })));
  const thumb = await Promise.all(imgs.map((im) => getImage({ src: im, width: 320, format: 'webp' })));
  return { slug, title: CHAPTER_META[slug].title, blurb: CHAPTER_META[slug].blurb, count: imgs.length, large, thumb };
}
