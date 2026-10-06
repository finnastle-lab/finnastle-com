import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { chapterSlugs } from '../lib/work-chapters';

// Hand-rolled sitemap (see astro.config.mjs for why not @astrojs/sitemap).
// Lists every indexable page: the static routes, each work chapter, each
// published essay and each published poem. Leaves out /404 (noindex) and /fast-as (reserved, not in nav).
const STATIC = [
  '/', '/work', '/exhibitions', '/studio', '/studio/fearless-answers',
  '/writing', '/poems', '/tools', '/tools/icon-pack', '/tools/design-system/',
];

export const GET: APIRoute = async ({ site }) => {
  const essays = await getCollection('essays', ({ data }) => !data.draft);
  const poems = await getCollection('poems', ({ data }) => !data.draft);
  const urls: { loc: string; lastmod?: Date }[] = [
    ...STATIC.map((p) => ({ loc: p })),
    ...chapterSlugs().map((slug) => ({ loc: `/work/${slug}` })),
    ...essays.map((e) => ({ loc: `/writing/${e.slug}`, lastmod: e.data.pubDate })),
    ...poems.map((p) => ({ loc: `/poems/${p.slug}` })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(({ loc, lastmod }) =>
    `  <url><loc>${new URL(loc, site)}</loc>${lastmod ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : ''}</url>`)
  .join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
