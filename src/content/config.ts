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

// Poems — the art register. A sequence, not a feed: these are ordered by hand
// (`order`), never by date, because the running order is part of the work.
// `draft` defaults to true so nothing goes live until it has had a pass.
const poems = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // Lower sits higher on the index. Leave gaps so a poem can be slotted in.
    order: z.number(),
    // Cycle this belongs to, e.g. 'True Fiction'. Shown as a quiet label.
    cycle: z.string().optional(),
    // Free text, not a date — "2019, Victory St" carries more than a timestamp.
    // Reader-facing: only facts about the work itself, never where the file came
    // from. Shown on the poem page.
    provenance: z.string().optional(),
    // Where the text was transcribed from. A private record for Finn — never
    // rendered, so filing paths and note titles stay off the live site.
    source: z.string().optional(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { essays, poems };
