import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';

export async function GET(context) {
  const essays = await getCollection('essays', ({ data }) => !data.draft);
  const items = essays
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((e) => ({
      title: e.data.title,
      description: e.data.description ?? '',
      pubDate: e.data.pubDate,
      link: `/writing/${e.slug}/`,
    }));

  return rss({
    title: `${SITE.title} — Writing`,
    description: SITE.description,
    site: context.site,
    items,
  });
}
