export const SITE = {
  title: 'Finn Astle',
  description: "What's irreducible in human making, and how you'd know.",
  url: 'https://finnastle.com',
  locale: 'en-AU',
} as const;

// The one social account that gets linked from the writing. Handle sourced from
// the salvaged astlecreative.com contact block.
export const SOCIAL = {
  instagram: 'https://www.instagram.com/finnastle/',
  instagramHandle: '@finnastle',
} as const;

type NavLink = { href: string; label: string };
type NavItem = { label: string; href?: string; items?: NavLink[] };

// Three top-level items, one dropdown. Art is making, Studio is the register
// that pays, Lab is building. Each hero item goes one place; only Lab opens.
//
// Writing sits inside Lab rather than taking a slot of its own: it is the
// explaining register, it serves all three rooms, and it was already in this
// group when the group was called "Words & Tools".
//
// Studio stays a single link. A dropdown there means listing cases, and the
// cases are anchors on one page rather than routes, so the menu would fill
// with rows pointing at the same URL.
//
// Art is a single link too. Exhibitions keeps its own link at the top of
// /work, so collapsing the group costs it one click, not its route.
//
// `/fast-as` stays out until it has paying customers (per plan).
export const NAV: NavItem[] = [
  { label: 'Art', href: '/work' },
  { label: 'Studio', href: '/studio' },
  {
    // Lab is the label everywhere; /tools is still the slug. That slug move is
    // deferred, not cancelled, so treat /tools as a URL that moves once.
    label: 'Lab',
    items: [
      { href: '/tools', label: 'Lab' },
      { href: '/tools/almanac', label: 'FA Almanac' },
      { href: '/tools/collage-cutouts', label: 'Collage cutouts' },
      { href: '/writing', label: 'Writing' },
    ],
  },
];
