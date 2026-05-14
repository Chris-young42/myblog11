import path from "node:path";
import { cache } from "react";

import { z } from "zod";

import { readMdxCollection } from "@/lib/mdx-collection";

const defaultProjectSectionsDir = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "content",
  "projects",
);

const projectSectionSchema = z.object({
  title: z.string().trim().min(1),
  eyebrow: z.string().trim().min(1).optional(),
  description: z.string().trim().min(1).optional(),
  summary: z.string().trim().min(1),
  status: z.string().trim().min(1),
  stack: z.array(z.string().trim().min(1)).min(1),
  order: z.number().int().nonnegative().optional().default(0),
  tone: z.enum(["spotlight", "panel", "plain"]).optional().default("panel"),
  ctaLabel: z.string().trim().min(1).optional(),
  ctaHref: z.string().trim().min(1).optional(),
});

export type ProjectSection = {
  slug: string;
  title: string;
  eyebrow?: string;
  description?: string;
  summary: string;
  status: string;
  stack: string[];
  order: number;
  tone: "spotlight" | "panel" | "plain";
  ctaLabel?: string;
  ctaHref?: string;
  content: string;
};

export async function readProjectSections(
  contentDir = defaultProjectSectionsDir,
): Promise<ProjectSection[]> {
  const sections = await readMdxCollection({
    contentDir,
    schema: projectSectionSchema,
    map: ({ slug, content, frontmatter }) => {
      const section: ProjectSection = {
        slug,
        title: frontmatter.title,
        summary: frontmatter.summary,
        status: frontmatter.status,
        stack: frontmatter.stack,
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

export const getProjectSections = cache(async () => readProjectSections());
