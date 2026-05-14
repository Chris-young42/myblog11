/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";

import {
  BadgeCheckIcon,
  InfoIcon,
  SparklesIcon,
  TriangleAlertIcon,
  LightbulbIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type CalloutTone = "note" | "tip" | "warning" | "success";

type CalloutProps = {
  tone?: CalloutTone;
  title?: string;
  children: ReactNode;
};

const calloutStyles: Record<CalloutTone, { className: string; icon: ReactNode; label: string }> = {
  note: {
    className: "border-zinc-200 bg-zinc-50 text-zinc-800",
    icon: <InfoIcon className="size-4" />,
    label: "Note",
  },
  tip: {
    className: "border-sky-200 bg-sky-50 text-sky-950",
    icon: <LightbulbIcon className="size-4" />,
    label: "Tip",
  },
  warning: {
    className: "border-amber-200 bg-amber-50 text-amber-950",
    icon: <TriangleAlertIcon className="size-4" />,
    label: "Warning",
  },
  success: {
    className: "border-emerald-200 bg-emerald-50 text-emerald-950",
    icon: <BadgeCheckIcon className="size-4" />,
    label: "Success",
  },
};

export function Callout({ tone = "note", title, children }: CalloutProps) {
  const style = calloutStyles[tone];

  return (
    <aside className={cn("my-6 rounded-2xl border p-4 md:p-5", style.className)}>
      <div className="flex items-center gap-2 text-xs font-medium tracking-[0.14em] uppercase">
        {tone === "tip" ? <SparklesIcon className="size-4" /> : style.icon}
        <span>{title ?? style.label}</span>
      </div>
      <div className="mt-3 leading-7">{children}</div>
    </aside>
  );
}

type FigureProps = {
  src: string;
  alt: string;
  caption?: ReactNode;
  width?: number | string;
  height?: number | string;
  className?: string;
};

export function Figure({ src, alt, caption, width, height, className }: FigureProps) {
  return (
    <figure className="my-8">
      <div
        className={cn("overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50", className)}
        style={width ? { maxWidth: typeof width === "number" ? `${width}px` : width } : undefined}
      >
        <img
          src={src}
          alt={alt}
          width={typeof width === "number" ? width : undefined}
          height={typeof height === "number" ? height : undefined}
          className="h-auto w-full"
          loading="lazy"
        />
      </div>
      {caption ? <figcaption className="mt-2 text-sm text-zinc-500">{caption}</figcaption> : null}
    </figure>
  );
}

type StatItem = {
  label: string;
  value: string;
  hint?: string;
};

type StatsProps = {
  items?: StatItem[];
};

export function Stats({ items = [] }: StatsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="my-8 grid gap-3 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-zinc-200 bg-white p-4">
          <p className="text-xs tracking-[0.14em] text-zinc-500 uppercase">{item.label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">{item.value}</p>
          {item.hint ? <p className="mt-2 text-sm text-zinc-600">{item.hint}</p> : null}
        </div>
      ))}
    </div>
  );
}

type TimelineItem = {
  title: string;
  detail: string;
  meta?: string;
};

type TimelineProps = {
  items?: TimelineItem[];
};

export function Timeline({ items = [] }: TimelineProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="my-8 space-y-4">
      {items.map((item, index) => (
        <div key={`${item.title}-${index}`} className="flex gap-4">
          <div className="relative flex flex-col items-center">
            <div className="size-3 rounded-full bg-zinc-900" />
            {index < items.length - 1 ? <div className="mt-2 h-full w-px bg-zinc-200" /> : null}
          </div>
          <div className="-mt-1 pb-4">
            <p className="text-xs tracking-[0.14em] text-zinc-500 uppercase">
              {item.meta ?? "Step"}
            </p>
            <h3 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900">
              {item.title}
            </h3>
            <p className="mt-2 text-zinc-600">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
