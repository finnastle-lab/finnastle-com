export const SITE = {
  title: 'Finn Astle',
  description: 'What happens to making when machines can make.',
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

// Four top-level items, one per room plus the writing that serves all three.
// Art is making, Lab is building, Studio is the register that pays for both.
// Writing keeps its own front door: it is the largest body of work on the site,
// and a featured link from another page is not a route to a listing.
// `/fast-as` stays out until it has paying customers (per plan).
export const NAV: NavItem[] = [
  {
    label: 'Art',
    items: [
      { href: '/work', label: 'Art' },
      { href: '/exhibitions', label: 'Exhibitions' },
    ],
  },
  {
    // Cases are anchors on the one page, never their own routes: the ids are
    // printed as clickable links inside CV and addendum PDFs already out with
    // applications, and the single page is the one-screen scan /studio is for.
    // Five of sixteen, taken off the collection's own `order` (strongest first).
    label: 'Studio',
    items: [
      { href: '/studio', label: 'Studio' },
      { href: '/studio#agl-join-the-change', label: 'AGL' },
      { href: '/studio#agl-netflix', label: 'AGL × Netflix' },
      { href: '/studio#afterpay', label: 'Afterpay' },
      { href: '/studio#youi', label: 'Youi' },
      { href: '/studio#seven-eleven', label: '7-Eleven' },
    ],
  },
  {
    // Resolves to /tools. The path does not move until that is decided.
    label: 'Lab',
    items: [
      { href: '/tools', label: 'Tools' },
      { href: '/tools/almanac', label: 'FA Almanac' },
      { href: '/tools/icon-pack', label: 'Icon Pack' },
    ],
  },
  { label: 'Writing', href: '/writing' },
];
