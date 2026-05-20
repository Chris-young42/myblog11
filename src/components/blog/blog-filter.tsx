"use client";

import { useMemo, useState } from "react";

import type { PostSummary } from "@/lib/post-types";
import { cn } from "@/lib/utils";

import { BlogCard } from "./blog-card";

type BlogFilterProps = {
  posts: PostSummary[];
  tags: string[];
};

export function BlogFilter({ posts, tags }: BlogFilterProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("all");

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return posts.filter((post) => {
      const queryMatched =
        normalized.length === 0 ||
        post.title.toLowerCase().includes(normalized) ||
        post.description.toLowerCase().includes(normalized) ||
        post.tags.some((tag) => tag.toLowerCase().includes(normalized));

      const tagMatched = activeTag === "all" || post.tags.includes(activeTag);
      return queryMatched && tagMatched;
    });
  }, [activeTag, posts, query]);

  return (
    <div className="space-y-8">
      <div className="space-y-4 rounded-3xl border border-zinc-200/80 bg-white/85 p-5 shadow-sm backdrop-blur">
        <label className="block text-sm font-medium text-zinc-700" htmlFor="blog-search">
          搜索文章
        </label>
        <input
          id="blog-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="按标题、描述或标签搜索..."
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-400"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag("all")}
            className={cn(
              "cursor-pointer rounded-full px-3 py-1.5 text-xs transition-colors",
              activeTag === "all"
                ? "bg-blue-600 text-white"
                : "border border-zinc-300 bg-white text-zinc-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700",
            )}
          >
            全部
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={cn(
                "cursor-pointer rounded-full px-3 py-1.5 text-xs transition-colors",
                activeTag === tag
                  ? "bg-blue-600 text-white"
                  : "border border-zinc-300 bg-white text-zinc-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-500">
          没有匹配的文章，请尝试更换关键词或标签。
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
