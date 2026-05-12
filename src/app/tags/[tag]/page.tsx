import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/blog/blog-card";
import { SectionTitle } from "@/components/common/section-title";
import { getAllPostSummaries, getPostsByTag } from "@/lib/posts";
import { tagToSlug } from "@/lib/tag-utils";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPostSummaries();
  const tagSet = new Set(posts.flatMap((post) => post.tags.map((tag) => tagToSlug(tag))));
  return [...tagSet].map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `标签：${tag}`,
    description: `查看与 ${tag} 相关的全部技术文章。`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  const displayTag = posts[0]?.tags.find((item) => tagToSlug(item) === tag) ?? tag;

  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Tag Archive"
        title={`# ${displayTag}`}
        description={`共 ${posts.length} 篇文章，按发布时间倒序展示。`}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
