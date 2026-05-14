import type { Route } from "next";

import type { PostSummary } from "@/lib/post-types";
import type { SiteConfig } from "@/lib/site-config";

export type SearchEntryGroup = "导航" | "文章" | "标签";

export type SearchEntry = {
  id: string;
  group: SearchEntryGroup;
  title: string;
  href: Route | string;
  description?: string;
  keywords: string[];
};

type BuildSearchEntriesInput = {
  nav: SiteConfig["nav"];
  posts: PostSummary[];
  tags: Array<{ tag: string; slug: string; count: number }>;
};

export function buildSearchEntries({ nav, posts, tags }: BuildSearchEntriesInput): SearchEntry[] {
  const navEntries: SearchEntry[] = nav.map((item) => ({
    id: `nav:${item.href}`,
    group: "导航",
    title: item.label,
    href: item.href,
    description: `前往 ${item.label}`,
    keywords: [item.label, item.href],
  }));

  const postEntries: SearchEntry[] = posts.slice(0, 8).map((post) => ({
    id: `post:${post.slug}`,
    group: "文章",
    title: post.title,
    href: post.url,
    description: post.description,
    keywords: [...post.tags, post.slug, post.title, post.description],
  }));

  const tagEntries: SearchEntry[] = tags.map((tag) => ({
    id: `tag:${tag.slug}`,
    group: "标签",
    title: tag.tag,
    href: `/tags/${tag.slug}`,
    description: `${tag.count} 篇文章`,
    keywords: [tag.tag, tag.slug],
  }));

  return [...navEntries, ...postEntries, ...tagEntries];
}
