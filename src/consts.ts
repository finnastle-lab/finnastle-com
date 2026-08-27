export const SITE = {
  title: 'Finn Astle',
  description: 'What happens to making when machines can make.',
  url: 'https://finnastle.com',
  locale: 'en-AU',
} as const;

// Primary nav. `/fast-as` is intentionally omitted — reserved until it has
// paying customers who aren't Finn (per five-year plan §FAST AS).
export const NAV = [
  { href: '/work', label: 'Work' },
  { href: '/exhibitions', label: 'Exhibitions' },
  { href: '/writing', label: 'Writing' },
  { href: '/tools', label: 'Tools' },
  { href: '/studio', label: 'Studio' },
] as const;
