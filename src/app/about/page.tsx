import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";

import { SectionTitle } from "@/components/common/section-title";
import { MotionReveal } from "@/components/motion/reveal";
import { getAboutSections } from "@/lib/about-sections";
import { renderMdx } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "关于",
  description: "博客作者简介与写作原则。",
};

const toneStyles = {
  spotlight:
    "relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-br from-white via-zinc-50 to-sky-50 p-8 md:p-11",
  panel: "rounded-3xl border border-zinc-200 bg-zinc-50/70 p-7 md:p-10",
  plain: "rounded-3xl border border-zinc-200/80 bg-white p-7 md:p-10",
} as const;

export default async function AboutPage() {
  const sections = await getAboutSections();
  const renderedSections = await Promise.all(
    sections.map(async (section) => ({
      ...section,
      content: await renderMdx(section.content),
    })),
  );

  return (
    <div className="space-y-8">
      {renderedSections.map((section, index) => (
        <MotionReveal key={section.slug} as="section" delay={index * 0.04}>
          <div className={toneStyles[section.tone]}>
            {section.tone === "spotlight" ? (
              <div className="pointer-events-none absolute -top-16 -right-8 h-44 w-44 rounded-full bg-sky-200/40 blur-2xl" />
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
    </div>
  );
}
