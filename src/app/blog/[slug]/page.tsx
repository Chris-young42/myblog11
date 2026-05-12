import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ReadingProgress } from "@/components/blog/reading-progress";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { getAdjacentPosts, getAllPostSummaries, getPostBySlug } from "@/lib/posts";
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
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <article className="max-w-none">{mdxContent}</article>
        <TableOfContents items={post.toc} />
      </div>

      <section className="grid gap-4 border-t border-zinc-200 pt-6 md:grid-cols-2">
        {adjacent.prev ? (
          <Link
            href={adjacent.prev.url}
            className="rounded-2xl border border-zinc-200 p-5 hover:bg-zinc-50"
          >
            <p className="text-xs tracking-[0.12em] text-zinc-500 uppercase">上一篇</p>
            <p className="mt-2 text-zinc-900">{adjacent.prev.title}</p>
          </Link>
        ) : (
          <div />
        )}

        {adjacent.next ? (
          <Link
            href={adjacent.next.url}
            className="rounded-2xl border border-zinc-200 p-5 text-right hover:bg-zinc-50"
          >
            <p className="text-xs tracking-[0.12em] text-zinc-500 uppercase">下一篇</p>
            <p className="mt-2 text-zinc-900">{adjacent.next.title}</p>
          </Link>
        ) : (
          <div />
        )}
      </section>
    </div>
  );
}
