import type { Metadata } from "next";
import { SectionTitle } from "@/components/common/section-title";

export const metadata: Metadata = {
  title: "项目",
  description: "项目与专题模块展示。",
};

const projects = [
  {
    name: "Design Tokens Playground",
    summary: "用于沉淀跨端 UI 设计令牌，支持主题变量治理与组件联动。",
    stack: ["TypeScript", "Tailwind", "Storybook"],
    href: "https://github.com/your-name/design-tokens-playground",
  },
  {
    name: "Mdx Knowledge Base",
    summary: "基于 MDX 的工程知识库模板，支持文档检索与静态发布。",
    stack: ["Next.js", "MDX", "Vercel"],
    href: "https://github.com/your-name/mdx-knowledge-base",
  },
  {
    name: "Frontend CI Blueprint",
    summary: "标准化前端项目质量门禁，覆盖 lint、typecheck、test、build。",
    stack: ["GitHub Actions", "Vitest", "ESLint"],
    href: "https://github.com/your-name/frontend-ci-blueprint",
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Projects"
        title="项目展示"
        description="展示可复用的工程模板、专题研究和实践项目。"
      />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.name} className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">{project.name}</h2>
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
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block text-sm text-zinc-900 underline underline-offset-4"
            >
              查看详情
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
