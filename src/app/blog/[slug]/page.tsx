import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/blog/blog-card";
import { PostActions } from "@/components/blog/post-actions";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { TagChip } from "@/components/blog/tag-chip";
import { getAdjacentPosts, getAllPostSummaries, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { renderMdx } from "@/lib/mdx";
import { siteConfig } from "@/lib/site-config";
import { formatDate } from "@/lib/utils";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPostSummaries();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${siteConfig.siteUrl}${post.url}`,
      publishedTime: post.date,
    },
    alternates: {
      canonical: post.url,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const mdxContent = await renderMdx(post.content);
  const adjacent = await getAdjacentPosts(post.slug);
  const relatedPosts = await getRelatedPosts(post.slug);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: `${siteConfig.siteUrl}${post.url}`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };

  return (
    <div className="space-y-10">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <header className="space-y-4 border-b border-zinc-200 pb-8">
        <p className="text-xs tracking-[0.14em] text-zinc-500 uppercase">
          {formatDate(post.date)} · {post.readingTime}
        </p>
        <h1 className="max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-zinc-900">
          {post.title}
        </h1>
        <p className="max-w-3xl text-lg text-zinc-600">{post.description}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
        <PostActions url={`${siteConfig.siteUrl}${post.url}`} />
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <article className="max-w-none">{mdxContent}</article>
        <TableOfContents items={post.toc} />
      </div>

      <section className="grid gap-4 border-t border-zinc-200 pt-6 md:grid-cols-2">
        {adjacent.prev ? (
          <Link
            href={adjacent.prev.url}
            className="cursor-pointer rounded-2xl border border-zinc-200 p-5 transition-colors hover:border-blue-200 hover:bg-blue-50/60"
          >
            <p className="text-xs tracking-[0.12em] text-zinc-500 uppercase">上一篇</p>
            <p className="mt-2 text-zinc-900 transition-colors hover:text-blue-700">
              {adjacent.prev.title}
            </p>
          </Link>
        ) : (
          <div />
        )}

        {adjacent.next ? (
          <Link
            href={adjacent.next.url}
            className="cursor-pointer rounded-2xl border border-zinc-200 p-5 text-right transition-colors hover:border-blue-200 hover:bg-blue-50/60"
          >
            <p className="text-xs tracking-[0.12em] text-zinc-500 uppercase">下一篇</p>
            <p className="mt-2 text-zinc-900 transition-colors hover:text-blue-700">
              {adjacent.next.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </section>

      {relatedPosts.length > 0 ? (
        <section className="space-y-6 border-t border-zinc-200 pt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.14em] text-zinc-500 uppercase">Related</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">推荐阅读</h2>
            </div>
            <p className="hidden text-sm text-zinc-500 md:block">基于标签和发布时间自动推荐</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((item) => (
              <BlogCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
