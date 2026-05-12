import type { Route } from "next";
import Link from "next/link";

import { BlogCard } from "@/components/blog/blog-card";
import { SectionTitle } from "@/components/common/section-title";
import { Badge } from "@/components/ui/badge";
import { getAllPostSummaries, getTagStats } from "@/lib/posts";

const featuredProjects = [
  {
    name: "Next.js Starter Kit",
    description: "面向内容型站点的高质量模板，集成 TypeScript、MDX、CI 与 SEO。",
    link: "https://github.com/your-name/next-starter-kit",
  },
  {
    name: "UI Motion Lab",
    description: "用于验证页面动效与可访问性的前端实验项目。",
    link: "https://github.com/your-name/ui-motion-lab",
  },
];

export default async function HomePage() {
  const posts = await getAllPostSummaries();
  const tagStats = await getTagStats();
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 3);
  const latestPosts = posts.slice(0, 6);

  return (
    <div className="space-y-20 pb-10">
      <section className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-8 md:p-12">
        <p className="mb-5 text-xs tracking-[0.14em] text-zinc-500 uppercase">
          Apple-inspired Technical Blog
        </p>
        <h1 className="max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-zinc-900 md:text-5xl">
          以工程化与长期主义为核心的前端技术博客
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-600">
          记录 Next.js、TypeScript、组件体系、性能优化与团队协作实践，内容全部由 MDX 驱动并通过
          CI/CD 自动发布。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm text-white hover:bg-zinc-800"
          >
            浏览文章
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm text-zinc-700 hover:bg-zinc-100"
          >
            查看项目
          </Link>
        </div>
      </section>

      <section className="space-y-8">
        <SectionTitle
          eyebrow="Featured"
          title="精选文章"
          description="优先阅读这些文章，快速了解博客核心内容。"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {(featuredPosts.length > 0 ? featuredPosts : latestPosts.slice(0, 3)).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionTitle
          eyebrow="Latest"
          title="最近更新"
          description="按发布时间排序，持续更新工程化和架构实践。"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <SectionTitle eyebrow="Tags" title="技术标签" description="按关注主题快速跳转。" />
        <div className="flex flex-wrap gap-2">
          {tagStats.map((item) => (
            <Link href={`/tags/${item.slug}` as Route} key={item.slug}>
              <Badge
                variant="outline"
                className="border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100"
              >
                {item.tag} · {item.count}
              </Badge>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionTitle
          eyebrow="Projects"
          title="模块化展示"
          description="以卡片方式展示项目或专题模块。"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <article key={project.name} className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h3 className="text-xl font-medium tracking-tight text-zinc-900">{project.name}</h3>
              <p className="mt-3 text-zinc-600">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm text-zinc-900 underline underline-offset-4"
              >
                查看仓库
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
