import { defineCollection, z } from 'astro:content';

// Essays — the monthly tier of the cascade. Canonical home lives here;
// Medium/LinkedIn are syndication only.
const essays = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      // Where this was syndicated, so canonical stays pointed home.
      canonicalUrl: z.string().url().optional(),
      // Which platform the copy came from, for the provenance line.
      syndicatedFrom: z.enum(['medium', 'linkedin']).optional(),
      draft: z.boolean().default(false),
      // Closing Instagram line, written per essay. Falls back to a default.
      instagramCta: z.string().optional(),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
    }),
});

export const collections = { essays };
