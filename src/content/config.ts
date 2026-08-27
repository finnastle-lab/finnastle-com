import { defineCollection, z } from 'astro:content';

// Essays — the monthly tier of the cascade. Canonical home lives here;
// Medium/LinkedIn are syndication only.
const essays = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    // Where this was syndicated, so canonical stays pointed home.
    canonicalUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { essays };
