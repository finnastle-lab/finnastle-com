// Reads the design system out of the files that implement it, at build time.
//
// The point of this module is that the reference page cannot print a value the
// site does not hold. Every hex, every font stack and every asset hash on
// /tools/design-system is parsed or computed here from the real source, so a
// specimen and the stylesheet cannot drift the way the old static page drifted
// from global.css for two months.
//
// Everything comes in through Vite's build-time imports rather than reading
// from disk, so it survives bundling: a readFileSync here would resolve
// against dist/ once Astro has built the SSR entry.

import { createHash } from 'node:crypto';

import css from '../styles/global.css?raw';
import darkSvg from '../assets/brand/fa-sunmark/fa-sunmark-dark.svg?raw';
import lightSvg from '../assets/brand/fa-sunmark/fa-sunmark-light.svg?raw';
import renameMap from '../assets/elements/rename-map.csv?raw';

const elementFiles = Object.keys(
  import.meta.glob('../assets/elements/*.{png,webp}'),
).map((p) => p.split('/').pop()!);

/** Pull the custom properties out of one selector's block. */
function block(selector: string): Record<string, string> {
  // Match the selector at the start of a line, then take to its closing brace.
  const i = css.indexOf(selector + ' {');
  if (i === -1) throw new Error(`design-tokens: no block for ${selector}`);
  const open = css.indexOf('{', i);
  const close = css.indexOf('}', open);
  const out: Record<string, string> = {};
  for (const line of css.slice(open + 1, close).split('\n')) {
    const m = line.match(/^\s*(--[\w-]+)\s*:\s*([^;]+);/);
    if (m) out[m[1]] = m[2].trim();
  }
  return out;
}

export const light = block(':root');
export const dark = block(':root[data-theme="dark"]');

/** The studio register's override, which is the system's defining rule. */
export const studio = block(':root[data-register="studio"]');

// The dark palette is declared twice: once under prefers-color-scheme and once
// under [data-theme="dark"]. They have to stay identical by hand. Compare them
// at build time so a drift fails loudly here instead of quietly on the site.
const mediaDark = (() => {
  const i = css.indexOf('@media (prefers-color-scheme: dark)');
  const open = css.indexOf('{', css.indexOf('{', i) + 1);
  const close = css.indexOf('\n  }', open);
  const out: Record<string, string> = {};
  for (const line of css.slice(open + 1, close).split('\n')) {
    const m = line.match(/^\s*(--[\w-]+)\s*:\s*([^;]+);/);
    if (m) out[m[1]] = m[2].trim();
  }
  return out;
})();

export const darkBlocksAgree =
  JSON.stringify(Object.entries(mediaDark).sort()) ===
  JSON.stringify(Object.entries(dark).sort());

/** A palette entry, paired light and dark, for the swatch specimens. */
export type Swatch = {
  token: string;
  name: string;
  role: string;
  light: string;
  dark: string;
};

const ROLES: [string, string, string][] = [
  ['--ink', 'Ink', 'Type, marks, rules'],
  ['--graphite', 'Graphite', 'Secondary, captions, metadata'],
  ['--paper', 'Paper', 'The base surface'],
  ['--card', 'Card', 'Inset content'],
  ['--line', 'Line', 'Hairlines and dividers'],
  ['--line-strong', 'Line strong', 'Section rules'],
  ['--accent', 'Vermilion', 'The one guest. Art register only.'],
  ['--accent-press', 'Vermilion press', 'The guest, pressed'],
];

export const palette: Swatch[] = ROLES.filter(([t]) => t in light).map(
  ([token, name, role]) => ({
    token,
    name,
    role,
    light: light[token],
    dark: dark[token] ?? light[token],
  }),
);

/** Type voices, read off the real font stacks. */
export const voices = [
  {
    token: '--serif',
    name: 'Instrument Serif',
    role: 'Display',
    note: 'Italic, always. Headlines and the Fearless / Answers duality.',
    stack: light['--serif'],
    css: 'font-family: var(--serif); font-style: italic;',
  },
  {
    token: '--mono',
    name: 'Cousine',
    role: 'Body',
    note: 'Monospace rigour. Running text, labels, technical voice.',
    stack: light['--mono'],
    css: 'font-family: var(--mono);',
  },
  {
    token: '--sans',
    name: 'Inter',
    role: 'Interface',
    note: 'Labels, metadata, navigation. No display size: the serif has that.',
    stack: light['--sans'],
    css: 'font-family: var(--sans);',
  },
];

/** Heading sizes, lifted from the rules rather than retyped. */
function declaration(selector: string, prop: string): string | null {
  // Anchor to the start of a line: `h2 {` also matches inside `h1, h2 {`,
  // which is the shared family rule and carries no size.
  const at = css.search(
    new RegExp(`^${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{`, 'm'),
  );
  const i = at;
  if (i === -1) return null;
  const open = css.indexOf('{', i);
  const close = css.indexOf('}', open);
  const m = css
    .slice(open + 1, close)
    .match(new RegExp(`${prop}\\s*:\\s*([^;]+);`));
  return m ? m[1].trim() : null;
}

export const scale = {
  h1: declaration('h1', 'font-size'),
  h2: declaration('h2', 'font-size'),
  h3: declaration('h3', 'font-size'),
  body: declaration('body', 'font-size'),
  measure: declaration('p', 'max-width'),
  maxw: light['--maxw'],
  frame: declaration('.frame', 'max-width'),
};

/** Grid densities, in the order they appear in the stylesheet. */
export const grids = [...css.matchAll(/^\.([\w-]+)\s*\{[^}]*?minmax\((\d+)px/gms)]
  .map((m) => ({ selector: `.${m[1]}`, min: `${m[2]}px` }));

/** Canonical mark files, hashed from the source that ships. */
const MARKS = [
  ['fa-sunmark-dark.svg', darkSvg],
  ['fa-sunmark-light.svg', lightSvg],
] as const;

export const sunmark = MARKS.map(([file, svg]) => {
  const bytes = Buffer.from(svg, 'utf8');
  const vb = svg.match(/viewBox="([^"]+)"/);
  return {
    file,
    artwork: file.includes('dark') ? 'Black mark' : 'White mark',
    use: file.includes('dark') ? 'Light backgrounds' : 'Dark backgrounds',
    viewBox: vb ? vb[1] : 'unknown',
    bytes: bytes.length,
    sha256: createHash('sha256').update(bytes).digest('hex'),
  };
});

/** The element library, counted by the prefix that names its material. */
const PREFIX_MEANING: Record<string, string> = {
  mark: 'Hand-drawn and scanned marks',
  photo: 'Photographs',
  print: 'Printed matter, scanned',
  clipping: 'Cut and collaged fragments',
  texture: 'Surfaces and grounds',
  engraving: 'Engraved and line illustration',
  comic: 'Halftone and comic reproduction',
  digital: 'Made on screen',
  sticker: 'Adhesive and label stock',
  badge: 'Fabric and applique',
};

export const taxonomy = (() => {
  const files = elementFiles;
  const counts: Record<string, number> = {};
  for (const f of files) {
    const prefix = f.split('-')[0];
    if (prefix in PREFIX_MEANING) counts[prefix] = (counts[prefix] ?? 0) + 1;
  }
  const renamed = renameMap.trim().split('\n').length - 1;
  return {
    total: files.length,
    renamed,
    groups: Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([prefix, count]) => ({
        prefix,
        count,
        meaning: PREFIX_MEANING[prefix],
      })),
  };
})();

/** Motion, counted rather than described. */
export const motion = {
  transitions: (css.match(/\b(?:transition|animation):/g) ?? []).length,
  reducedMotion: css.includes('@media (prefers-reduced-motion: reduce)'),
};
