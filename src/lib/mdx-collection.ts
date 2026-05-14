import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { z } from "zod";

type ReadMdxCollectionOptions<TSchema extends z.ZodTypeAny, TEntry> = {
  contentDir: string;
  schema: TSchema;
  map: (args: {
    slug: string;
    fileName: string;
    content: string;
    frontmatter: z.infer<TSchema>;
  }) => TEntry;
};

export async function readMdxCollection<TSchema extends z.ZodTypeAny, TEntry>({
  contentDir,
  schema,
  map,
}: ReadMdxCollectionOptions<TSchema, TEntry>): Promise<TEntry[]> {
  const fileNames = await fs.readdir(contentDir);
  const mdxFileNames = fileNames.filter((name) => name.endsWith(".mdx"));

  return Promise.all(
    mdxFileNames.map(async (fileName) => {
      const fullPath = path.join(contentDir, fileName);
      const source = await fs.readFile(fullPath, "utf8");
      const parsed = matter(source);
      const frontmatter = schema.safeParse(parsed.data);

      if (!frontmatter.success) {
        throw new Error(
          `Invalid frontmatter in ${fileName}: ${frontmatter.error.issues
            .map((issue) => issue.path.join("."))
            .join(", ")}`,
        );
      }

      return map({
        slug: fileName.replace(/\.mdx$/, ""),
        fileName,
        content: parsed.content.trim(),
        frontmatter: frontmatter.data,
      });
    }),
  );
}
