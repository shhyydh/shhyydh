import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        chapter: z.number(),
        series: z.string(),
        draft: z.boolean().optional(),
      }),
    }),
  },
});
