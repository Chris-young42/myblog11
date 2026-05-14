import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";

import { SectionTitle } from "@/components/common/section-title";
import { MotionReveal, MotionStagger, MotionStaggerItem } from "@/components/motion/reveal";
import { getProjectSections } from "@/lib/project-sections";
import { renderMdx } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "项目",
  description: "项目与专题模块展示。",
};

const toneStyles = {
  spotlight:
    "relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-br from-white via-zinc-50 to-emerald-50 p-8 md:p-11",
  panel: "rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm",
  plain: "rounded-3xl border border-zinc-200/80 bg-zinc-50/50 p-6",
} as const;

export default async function ProjectsPage() {
  const sections = await getProjectSections();
  const renderedSections = await Promise.all(
    sections.map(async (section) => ({
      ...section,
      content: await renderMdx(section.content),
    })),
  );

  const overview = renderedSections[0];
  const projects = renderedSections.slice(1);

  return (
    <div className="space-y-10">
      {overview ? (
        <MotionReveal as="section">
          <div className={toneStyles[overview.tone]}>
            {overview.tone === "spotlight" ? (
              <div className="pointer-events-none absolute -top-16 -right-8 h-44 w-44 rounded-full bg-emerald-200/40 blur-2xl" />
            ) : null}
            <SectionTitle
              title={overview.title}
              className="relative"
              {...(overview.eyebrow ? { eyebrow: overview.eyebrow } : {})}
              {...(overview.description ? { description: overview.description } : {})}
            />
            <div className="relative mt-6 max-w-4xl">{overview.content}</div>
            {overview.ctaLabel && overview.ctaHref ? (
              <Link
                href={overview.ctaHref as Route}
                className="mt-2 inline-flex rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50"
              >
                {overview.ctaLabel}
              </Link>
            ) : null}
          </div>
        </MotionReveal>
      ) : null}

      <MotionReveal as="section" className="space-y-8">
        <SectionTitle
          eyebrow="Projects"
          title="项目清单"
          description="所有项目卡片都由 MDX 文件驱动，便于随时调整顺序与内容。"
        />
        <MotionStagger className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <MotionStaggerItem key={project.slug}>
              <article className={toneStyles[project.tone]}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs tracking-[0.14em] text-zinc-500 uppercase">
                      {project.eyebrow ?? "Project"}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
                      {project.title}
                    </h2>
                  </div>
                  <span className="rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-600">
                    {project.status}
                  </span>
                </div>
                <p className="mt-3 text-zinc-600">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-zinc-300 px-2.5 py-1 text-xs text-zinc-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="relative mt-5 max-w-4xl">{project.content}</div>
                {project.ctaLabel && project.ctaHref ? (
                  <Link
                    href={project.ctaHref as Route}
                    className="mt-4 inline-flex rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50"
                  >
                    {project.ctaLabel}
                  </Link>
                ) : null}
              </article>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </MotionReveal>
    </div>
  );
}
