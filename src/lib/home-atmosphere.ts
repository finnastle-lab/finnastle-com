// Homepage atmosphere — the geometry the Figma frames fix, in one place.
//
// Source: GPT Space, page "10 · finnastle.com · Atmosphere".
//   light desktop 8:389 · light mobile 8:511 · dark desktop 52:890 · dark mobile 52:1438
//
// Every box below is a percentage of its own container, so the whole
// composition scales with the column instead of needing a breakpoint per item.
// The Figma numbers they came from are in the comments.

export type Box = {
  /** left edge, % of container width */
  x: number;
  /** top edge, % of container height */
  y: number;
  /** % of container width */
  w: number;
  /** % of container height */
  h: number;
};

export type Cutout = Box & {
  /** key into the image map in the component that renders it */
  src: string;
  alt: string;
};

export type MarginGroup = {
  id: string;
  caption: string;
  /** which page section the group hangs off, and which gutter */
  section: 'hero' | 'proof';
  side: 'left' | 'right';
  /** top offset within that section, px at the 1248px design width */
  top: number;
  /** window width, px at the 1248px design width (height is always 132) */
  width: number;
  images: Cutout[];
};

/** The fixed image window every rotation plays inside. Figma: 132px tall. */
export const MARGIN_WINDOW_HEIGHT = 132;

/**
 * Four margin groups, desktop only (annotation 8:640: "Margin images remain
 * desktop-only"). The caption and the window never move; only the image inside
 * the window changes, so a swap can't shift the page.
 *
 * Image order is the approved sequence. The first image is the resting state:
 * it is what a reduced-motion reader, a no-JS reader and the first paint all
 * get.
 */
export const MARGIN_GROUPS: MarginGroup[] = [
  {
    id: 'campaigns',
    caption: 'CAMPAIGNS',
    section: 'hero',
    side: 'left',
    top: 330, // 49:780
    width: 124,
    images: [
      // x/y/w/h as % of the 124 × 132 window
      { src: 'billboard-spokane', x: 0, y: 3.03, w: 100, h: 93.94,
        alt: 'A damaged roadside billboard reading “There are no termites in Spokane”.' },
      { src: 'baseball-advertising', x: 0, y: 14.83, w: 100, h: 70.34,
        alt: 'A night baseball stadium ringed with outfield advertising.' },
      { src: 'vegas-print-ad', x: 13.42, y: 0, w: 73.16, h: 100,
        alt: 'A vintage “Free Las Vegas Vacation” print advertisement.' },
    ],
  },
  {
    id: 'words-form',
    caption: 'WORDS + FORM',
    section: 'hero',
    side: 'right',
    top: 400, // 49:790
    width: 128,
    images: [
      { src: 'super-starliner', x: 0, y: 29.62, w: 100, h: 40.76,
        alt: 'Chromed “Super Starliner” script lettering from a car badge.' },
      { src: 'hopelessness', x: 0, y: 3.59, w: 100, h: 92.83,
        alt: 'HOPE / LESS / NESS, hand-lettered in three stacked lines.' },
      { src: 'timelessness', x: 0, y: 3.59, w: 100, h: 92.83,
        alt: 'TIME / LESS / NESS, hand-lettered in three stacked lines.' },
      { src: 'union-lettering', x: 3.91, y: 5.30, w: 92.19, h: 89.39,
        alt: 'The word UNION in heavy condensed capitals on a printed card.' },
    ],
  },
  {
    id: 'art-ideas',
    caption: 'ART + IDEAS',
    section: 'proof',
    side: 'left',
    top: 170, // 49:800
    width: 122,
    images: [
      { src: 'sun-newsprint', x: 0, y: 3.79, w: 100, h: 92.42,
        alt: 'A sun drawn in thick black ink across a spread of newsprint.' },
      { src: 'falcon-drawing', x: 0, y: 1.09, w: 100, h: 97.82,
        alt: 'An ink drawing of a falcon in flight beneath a sun and a cloud.' },
      { src: 'greyhound-drawing', x: 25.21, y: 0, w: 49.57, h: 100,
        alt: 'A loose ink drawing of a greyhound at full stretch.' },
      { src: 'landscape-drawing', x: 0, y: 20.63, w: 100, h: 58.73,
        alt: 'An ink landscape drawing of a mesa under a long cloud.' },
    ],
  },
  {
    id: 'brand-culture',
    caption: 'BRAND + CULTURE',
    section: 'proof',
    side: 'right',
    top: 430, // 49:810
    width: 126,
    images: [
      { src: 'converse-collage', x: 12.17, y: 0, w: 75.66, h: 100,
        alt: 'A painted collage of a Converse sneaker over a drawn skyline.' },
      { src: 'ned-kelly', x: 14.35, y: 0, w: 71.30, h: 100,
        alt: 'A black ink drawing of Ned Kelly’s helmet and armour.' },
      { src: 'lucky-cat', x: 0, y: 19.65, w: 100, h: 60.70,
        alt: 'A hand-drawn maneki-neko lucky cat.' },
      { src: 'intermission-lettering', x: 0, y: 37.07, w: 100, h: 25.87,
        alt: 'The word INTERMISSION in condensed serif capitals on a white card.' },
    ],
  },
];

/**
 * Footer working paper. Desktop box is 1120 × 490 (30:784), mobile 342 × 350
 * (30:831); both are expressed here as percentages of their own box so the
 * composition holds at any width.
 *
 * `layer` decides which side of the wordmark the cutout sits on. The wordmark
 * is the stable anchor: nothing in front of it is allowed to cover a letter.
 */
export type FooterCutout = Cutout & {
  layer: 'behind' | 'front';
  /** seconds; each mark comes and goes on its own long cycle */
  cycle: number;
  delay: number;
  /** drop on mobile — the small paper carries three marks, not six */
  mobile?: Box;
};

export const FOOTER_CUTOUTS: FooterCutout[] = [
  { src: 'super-starliner', layer: 'behind', cycle: 41, delay: 0,
    x: 36.16, y: 9.80, w: 25.00, h: 24.02,
    mobile: { x: 48.25, y: 12.86, w: 47.95, h: 19.69 },
    alt: 'Chromed “Super Starliner” script lettering from a car badge.' },
  { src: 'sun-newsprint', layer: 'behind', cycle: 37, delay: 6,
    x: 73.66, y: 1.02, w: 20.98, h: 47.96,
    alt: 'A sun drawn in thick black ink across a spread of newsprint.' },
  { src: 'billboard-spokane', layer: 'behind', cycle: 46, delay: 13,
    x: 2.68, y: 1.02, w: 24.11, h: 55.10,
    mobile: { x: 0, y: 1.14, w: 38.01, h: 37.14 },
    alt: 'A damaged roadside billboard reading “There are no termites in Spokane”.' },
  { src: 'union-lettering', layer: 'front', cycle: 43, delay: 21,
    x: 22.00, y: 61.22, w: 17.41, h: 39.80,
    alt: 'The word UNION in heavy condensed capitals on a printed card.' },
  { src: 'converse-collage', layer: 'front', cycle: 34, delay: 28,
    x: 80.45, y: 58.16, w: 15.54, h: 49.17,
    mobile: { x: 64.33, y: 64.29, w: 29.24, h: 39.56 },
    alt: 'A painted collage of a Converse sneaker over a drawn skyline.' },
];

/** Figma 43:868 / 30:831: the wordmark sits at 25.5% down, full box width. */
export const FOOTER_WORDMARK_TOP = 25.5;

/** Footer hero links. Art and Writing keep their destinations here. */
export const FOOTER_LINKS = [
  { href: '/work', label: 'Art' },
  { href: '/writing', label: 'Writing' },
  { href: '/tools', label: 'Tools' },
  { href: 'INSTAGRAM', label: 'Instagram' },
] as const;

/**
 * Night sky. Figma 7:192 hand-places ~170 ellipses: mostly "distant" at
 * 0.8–2.1px, plus one "slow twinkle" at 2.8px every ninth star. Reproducing
 * the distribution from a fixed seed gives the same sparse field without
 * carrying 170 nodes of markup, and it is stable across builds.
 */
export function starField(count = 170, seed = 0x5eed1e) {
  // mulberry32 — small, deterministic, good enough for scatter.
  let s = seed >>> 0;
  const rnd = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const round = (n: number) => Math.round(n * 1000) / 1000;
  return Array.from({ length: count }, (_, i) => {
    const twinkle = i % 9 === 8;
    return {
      x: round(rnd() * 100),
      y: round(rnd() * 100),
      size: twinkle ? 2.8 : round(0.8 + rnd() * 1.3),
      twinkle,
      // spread the twinkles across the cycle so none of them pulse together
      delay: round(rnd() * 9),
      opacity: twinkle ? 1 : round(0.35 + rnd() * 0.5),
    };
  });
}
