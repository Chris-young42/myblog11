import type { Metadata } from "next";
import Link from "next/link";
import { SparklesIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "展示页",
  description: "沉浸式展示页。",
};

export default function HiPage() {
  const line1 = "hi";
  const line2 = "hi, I am 🍔";

  return (
    <Link
      href="/home"
      className="relative isolate block min-h-dvh cursor-pointer overflow-hidden bg-[radial-gradient(circle_at_20%_18%,rgba(37,99,235,0.18),transparent_30%),radial-gradient(circle_at_84%_14%,rgba(24,24,27,0.14),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_52%,#f8fafc_100%)] px-6 py-12 text-center focus:outline-none"
      aria-label="进入首页"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 h-60 w-60 rounded-full bg-blue-300/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-10 h-72 w-72 rounded-full bg-zinc-900/10 blur-3xl"
      />

      <div className="relative flex min-h-[calc(100dvh-6rem)] items-center justify-center">
        <div className="w-full max-w-4xl space-y-6">
          <p className="inline-flex animate-[hero-fade-up_640ms_cubic-bezier(0.22,1,0.36,1)_120ms_both] items-center gap-2 rounded-full border border-blue-200 bg-white/75 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-blue-700 uppercase backdrop-blur">
            <SparklesIcon className="size-3.5" />
            Showcase
          </p>

          <p className="flex justify-center gap-1 text-5xl font-semibold tracking-tight text-zinc-900 md:text-7xl">
            {Array.from(line1).map((char, index) => (
              <span
                key={`line-1-${char}-${index}`}
                style={{ animationDelay: `${200 + index * 70}ms` }}
                className="inline-block animate-[hero-bounce-in_700ms_cubic-bezier(0.22,1,0.36,1)_both]"
              >
                {char}
              </span>
            ))}
          </p>

          <h1 className="flex flex-wrap justify-center gap-1 text-5xl leading-tight font-semibold tracking-tight text-zinc-900 md:text-8xl">
            {Array.from(line2).map((char, index) => (
              <span
                key={`line-2-${char}-${index}`}
                style={{ animationDelay: `${500 + index * 48}ms` }}
                className="inline-block animate-[hero-bounce-in_760ms_cubic-bezier(0.22,1,0.36,1)_both]"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <p className="mx-auto max-w-2xl animate-[hero-fade-up_760ms_cubic-bezier(0.22,1,0.36,1)_1200ms_both] text-base text-zinc-600 md:text-lg">
            欢迎来到我的博客展示页，这里记录前端工程实践与设计探索。
          </p>
          <p className="mx-auto pt-3 text-sm font-medium text-blue-700/85">单击任意区域进入首页</p>
        </div>
      </div>
    </Link>
  );
}
