export const SITE = {
  title: 'Finn Astle',
  description: 'What happens to making when machines can make.',
  url: 'https://finnastle.com',
  locale: 'en-AU',
} as const;

type NavLink = { href: string; label: string };
type NavItem = { label: string; href?: string; items?: NavLink[] };

// Three groups. `/fast-as` stays out until it has paying customers (per plan).
export const NAV: NavItem[] = [
  {
    label: 'Work',
    items: [
      { href: '/work', label: 'Work' },
      { href: '/exhibitions', label: 'Exhibitions' },
    ],
  },
  { label: 'Studio', href: '/studio' },
  {
    label: 'Words & Tools',
    items: [
      { href: '/writing', label: 'Writing' },
      { href: '/tools', label: 'Tools' },
      { href: '/tools/icon-pack', label: 'Icon Pack' },
    ],
  },
];
