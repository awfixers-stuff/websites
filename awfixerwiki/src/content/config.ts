import { defineCollection, z } from "astro:content";

// Define schema for documentation pages
const docsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  published: z.boolean().optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const docs = defineCollection({
  type: "content",
  schema: docsSchema,
});

export const collections = {
  docs,
};
