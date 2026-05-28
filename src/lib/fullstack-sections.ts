import path from "node:path";
import { cache } from "react";

import { z } from "zod";

import { readMdxCollection } from "@/lib/mdx-collection";

const defaultFullstackSectionsDir = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "content",
  "fullstack",
);

const fullstackSectionSchema = z.object({
  title: z.string().trim().min(1),
  eyebrow: z.string().trim().min(1).optional(),
  description: z.string().trim().min(1).optional(),
  order: z.number().int().nonnegative().optional().default(0),
  tone: z.enum(["spotlight", "panel", "plain"]).optional().default("panel"),
  ctaLabel: z.string().trim().min(1).optional(),
  ctaHref: z.string().trim().min(1).optional(),
});

export type FullstackSection = {
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

export async function readFullstackSections(
  contentDir = defaultFullstackSectionsDir,
): Promise<FullstackSection[]> {
  const sections = await readMdxCollection({
    contentDir,
    schema: fullstackSectionSchema,
    map: ({ slug, content, frontmatter }) => {
      const section: FullstackSection = {
        slug,
        title: frontmatter.title,
        order: frontmatter.order,
        tone: frontmatter.tone,
        content,
      };

      if (frontmatter.eyebrow) {
        section.eyebrow = frontmatter.eyebrow;
      }
      if (frontmatter.description) {
        section.description = frontmatter.description;
      }
      if (frontmatter.ctaLabel) {
        section.ctaLabel = frontmatter.ctaLabel;
      }
      if (frontmatter.ctaHref) {
        section.ctaHref = frontmatter.ctaHref;
      }

      return section;
    },
  });

  return sections.sort((a, b) => {
    if (a.order === b.order) {
      return a.slug.localeCompare(b.slug);
    }
    return a.order - b.order;
  });
}

export const getFullstackSections = cache(async () => readFullstackSections());
