import type { Route } from "next";
import Link from "next/link";

import { BlogCard } from "@/components/blog/blog-card";
import { SectionTitle } from "@/components/common/section-title";
import { MotionReveal, MotionStagger, MotionStaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { getHomeSections } from "@/lib/home-sections";
import { renderMdx } from "@/lib/mdx";
import { getAllPostSummaries, getTagStats } from "@/lib/posts";

const toneStyles = {
  spotlight:
    "relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-br from-white via-zinc-50 to-orange-50 p-8 md:p-11",
  panel: "rounded-3xl border border-zinc-200 bg-zinc-50/70 p-7 md:p-10",
  plain: "rounded-3xl border border-zinc-200/80 bg-white p-7 md:p-10",
} as const;

export default async function HomePage() {
  const posts = await getAllPostSummaries();
  const tagStats = await getTagStats();
  const sections = await getHomeSections();
  const renderedSections = await Promise.all(
    sections.map(async (section) => ({
      ...section,
      content: await renderMdx(section.content),
    })),
  );

  const featuredPosts = posts.filter((post) => post.featured).slice(0, 3);
  const latestPosts = posts.slice(0, 6);

  return (
    <div className="space-y-16 pb-10">
      {renderedSections.map((section, index) => (
        <MotionReveal key={section.slug} as="section" delay={index * 0.04}>
          <div className={toneStyles[section.tone]}>
            {section.tone === "spotlight" ? (
              <div className="pointer-events-none absolute -top-16 -right-8 h-44 w-44 rounded-full bg-orange-200/40 blur-2xl" />
            ) : null}
            <SectionTitle
              title={section.title}
              className="relative"
              {...(section.eyebrow ? { eyebrow: section.eyebrow } : {})}
              {...(section.description ? { description: section.description } : {})}
            />
            <div className="relative mt-6 max-w-4xl">{section.content}</div>
            {section.ctaLabel && section.ctaHref ? (
              <Link
                href={section.ctaHref as Route}
                className="mt-2 inline-flex rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50"
              >
                {section.ctaLabel}
              </Link>
            ) : null}
          </div>
        </MotionReveal>
      ))}

      <MotionReveal as="section" className="space-y-8">
        <SectionTitle
          eyebrow="Featured"
          title="精选文章"
          description="优先阅读这些文章，快速了解博客核心内容。"
        />
        <MotionStagger className="grid gap-6 md:grid-cols-3">
          {(featuredPosts.length > 0 ? featuredPosts : latestPosts.slice(0, 3)).map((post) => (
            <MotionStaggerItem key={post.slug}>
              <BlogCard post={post} />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </MotionReveal>

      <MotionReveal as="section" className="space-y-8">
        <SectionTitle
          eyebrow="Latest"
          title="最近更新"
          description="按发布时间排序，持续更新工程化和架构实践。"
        />
        <MotionStagger className="grid gap-6 md:grid-cols-2">
          {latestPosts.map((post) => (
            <MotionStaggerItem key={post.slug}>
              <BlogCard post={post} />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </MotionReveal>

      <MotionReveal as="section" className="space-y-5">
        <SectionTitle eyebrow="Tags" title="技术标签" description="按关注主题快速跳转。" />
        <MotionStagger className="flex flex-wrap gap-2">
          {tagStats.map((item) => (
            <MotionStaggerItem key={item.slug}>
              <Link href={`/tags/${item.slug}` as Route}>
                <Badge
                  variant="outline"
                  className="border-zinc-300 bg-white text-zinc-700 transition hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-100"
                >
                  {item.tag} · {item.count}
                </Badge>
              </Link>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </MotionReveal>
    </div>
  );
}
