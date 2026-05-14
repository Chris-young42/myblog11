import path from "node:path";
import { cache } from "react";

import { z } from "zod";

import { readMdxCollection } from "@/lib/mdx-collection";

const defaultHomeSectionsDir = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "content",
  "home",
);

const homeSectionSchema = z.object({
  title: z.string().trim().min(1),
  eyebrow: z.string().trim().min(1).optional(),
  description: z.string().trim().min(1).optional(),
  order: z.number().int().nonnegative().optional().default(0),
  tone: z.enum(["spotlight", "panel", "plain"]).optional().default("panel"),
  ctaLabel: z.string().trim().min(1).optional(),
  ctaHref: z.string().trim().min(1).optional(),
});

export type HomeSection = {
  slug: string;
  title: string;
  eyebrow?: string;
  description?: string;
  order: number;
  tone: "spotlight" | "panel" | "plain";
  ctaLabel?: string;
  ctaHref?: string;
  content: string;
};

export async function readHomeSections(
  contentDir = defaultHomeSectionsDir,
): Promise<HomeSection[]> {
  const sections = await readMdxCollection({
    contentDir,
    schema: homeSectionSchema,
    map: ({ slug, content, frontmatter }) => {
      const baseSection: HomeSection = {
        slug,
        title: frontmatter.title,
        order: frontmatter.order,
        tone: frontmatter.tone,
        content,
      };

      if (frontmatter.eyebrow) {
        baseSection.eyebrow = frontmatter.eyebrow;
      }
      if (frontmatter.description) {
        baseSection.description = frontmatter.description;
      }
      if (frontmatter.ctaLabel) {
        baseSection.ctaLabel = frontmatter.ctaLabel;
      }
      if (frontmatter.ctaHref) {
        baseSection.ctaHref = frontmatter.ctaHref;
      }

      return baseSection;
    },
  });

  return sections.sort((a, b) => {
    if (a.order === b.order) {
      return a.slug.localeCompare(b.slug);
    }
    return a.order - b.order;
  });
}

export const getHomeSections = cache(async () => readHomeSections());
