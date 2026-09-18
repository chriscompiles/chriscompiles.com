import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publicationDate: z.coerce.date(),
    type: z.enum(['Essay', 'Note', 'Fiction', 'Build log']),
    draft: z.boolean(),
  }),
});

export const collections = { writing };
