import type { Metadata } from "next";

import { BlogFilter } from "@/components/blog/blog-filter";
import { SectionTitle } from "@/components/common/section-title";
import { getAllPostSummaries } from "@/lib/posts";

export const metadata: Metadata = {
  title: "博客",
  description: "按标签和关键词检索文章，内容由 MDX 驱动。",
};

export default async function BlogPage() {
  const posts = await getAllPostSummaries();
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b));

  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="Blog"
        title="全部文章"
        description="支持按关键词与标签筛选，基于构建期内容索引进行前端检索。"
      />
      <BlogFilter posts={posts} tags={tags} />
    </div>
  );
}
