import type { Metadata } from "next";

import { SectionTitle } from "@/components/common/section-title";

export const metadata: Metadata = {
  title: "关于",
  description: "博客作者简介与写作原则。",
};

const principles = [
  "优先写可复现、可落地的工程实践，不写空泛经验谈。",
  "所有示例默认遵循 TypeScript 严格模式与可维护架构。",
  "重点关注团队协作效率，而不是单点技巧堆叠。",
];

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="About"
        title="关于这个博客"
        description="这是一个面向前端工程师的技术博客，聚焦长期可维护的软件工程实践。"
      />
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <p className="text-zinc-600">
          作者定位为前端工程负责人视角，内容覆盖 Next.js、TypeScript、组件体系、测试体系、CI/CD
          与工程规范建设。
        </p>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-zinc-700">
          {principles.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
