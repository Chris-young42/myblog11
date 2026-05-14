import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

import type { Post, PostSummary, TocHeading } from "@/lib/post-types";
import { tagToSlug } from "@/lib/tag-utils";

const defaultPostsDir = path.join(/* turbopackIgnore: true */ process.cwd(), "content", "posts");

const frontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.coerce.date(),
  tags: z.array(z.string().trim().min(1)).min(1),
  cover: z.string().trim().min(1).optional(),
  draft: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),
});

export type { Post, PostSummary, TocHeading } from "@/lib/post-types";

type ReadPostsOptions = {
  contentDir?: string;
  includeDrafts?: boolean;
};

function parseToc(content: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const matcher = /^(##|###)\s+(.+)$/gm;
  let match: RegExpExecArray | null = matcher.exec(content);

  while (match) {
    const headingMarker = match[1];
    const headingText = match[2];

    if (!headingMarker || !headingText) {
      match = matcher.exec(content);
      continue;
    }

    const depth = headingMarker.length as 2 | 3;
    const text = headingText
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/[`*_~]/g, "")
      .trim();

    headings.push({
      id: tagToSlug(text),
      text,
      depth,
    });

    match = matcher.exec(content);
  }

  return headings;
}

export { tagToSlug } from "@/lib/tag-utils";

export async function readPostsFromDirectory(options: ReadPostsOptions = {}): Promise<Post[]> {
  const contentDir = options.contentDir ?? defaultPostsDir;
  const includeDrafts = options.includeDrafts ?? false;
  const fileNames = await fs.readdir(contentDir);
  const postFileNames = fileNames.filter((name) => name.endsWith(".mdx"));

  const posts = await Promise.all(
    postFileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(contentDir, fileName);
      const source = await fs.readFile(fullPath, "utf8");
      const parsed = matter(source);
      const frontmatter = frontmatterSchema.safeParse(parsed.data);

      if (!frontmatter.success) {
        throw new Error(
          `Invalid frontmatter in ${fileName}: ${frontmatter.error.issues
            .map((issue) => issue.path.join("."))
            .join(", ")}`,
        );
      }

      const tags = [...new Set(frontmatter.data.tags.map((tag) => tag.trim()).filter(Boolean))];
      if (tags.length === 0) {
        throw new Error(`Post ${fileName} must include at least one non-empty tag`);
      }

      const post: Post = {
        slug,
        title: frontmatter.data.title,
        description: frontmatter.data.description,
        date: frontmatter.data.date.toISOString(),
        tags,
        draft: frontmatter.data.draft,
        featured: frontmatter.data.featured,
        readingTime: readingTime(parsed.content).text,
        url: `/blog/${slug}` as const,
        toc: parseToc(parsed.content),
        content: parsed.content,
        ...(frontmatter.data.cover ? { cover: frontmatter.data.cover } : {}),
      };

      return post;
    }),
  );

  return posts
    .filter((post) => (includeDrafts ? true : !post.draft))
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

function shouldIncludeDrafts(): boolean {
  return process.env.NODE_ENV !== "production" && process.env.INCLUDE_DRAFTS === "true";
}

export const getAllPosts = cache(async (): Promise<Post[]> => {
  return readPostsFromDirectory({ includeDrafts: shouldIncludeDrafts() });
});

export const getAllPostSummaries = cache(async (): Promise<PostSummary[]> => {
  const posts = await getAllPosts();
  return posts.map((post) => {
    const summary: PostSummary = {
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      tags: post.tags,
      draft: post.draft,
      featured: post.featured,
      readingTime: post.readingTime,
      url: post.url,
      ...(post.cover ? { cover: post.cover } : {}),
    };
    return summary;
  });
});

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getTagStats(): Promise<Array<{ tag: string; slug: string; count: number }>> {
  const posts = await getAllPosts();
  const counter = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      counter.set(tag, (counter.get(tag) ?? 0) + 1);
    }
  }

  return [...counter.entries()]
    .map(([tag, count]) => ({ tag, slug: tagToSlug(tag), count }))
    .sort((a, b) => b.count - a.count);
}

export async function getPostsByTag(tagSlug: string): Promise<PostSummary[]> {
  const posts = await getAllPostSummaries();
  return posts.filter((post) => post.tags.some((tag) => tagToSlug(tag) === tagSlug));
}

export async function getAdjacentPosts(slug: string): Promise<{
  prev: PostSummary | null;
  next: PostSummary | null;
}> {
  const posts = await getAllPostSummaries();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<PostSummary[]> {
  const posts = await getAllPostSummaries();
  const current = posts.find((post) => post.slug === slug);

  if (!current) {
    return [];
  }

  const scored = posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const sharedTags = post.tags.filter((tag) => current.tags.includes(tag)).length;
      const daysSinceCurrent =
        Math.abs(Date.parse(current.date) - Date.parse(post.date)) / 86400000;
      const recencyScore = Math.max(0, 20 - daysSinceCurrent);

      return {
        post,
        score: sharedTags * 10 + recencyScore,
      };
    })
    .sort((a, b) => b.score - a.score || Date.parse(b.post.date) - Date.parse(a.post.date));

  return scored.slice(0, limit).map(({ post }) => post);
}
