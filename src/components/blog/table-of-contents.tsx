import Link from "next/link";

import type { TocHeading } from "@/lib/post-types";
import { cn } from "@/lib/utils";

type TableOfContentsProps = {
  items: TocHeading[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-auto lg:block">
      <p className="mb-3 text-xs tracking-[0.12em] text-zinc-500 uppercase">目录</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className={cn(
                "block text-sm text-zinc-500 transition hover:text-zinc-900",
                item.depth === 3 ? "pl-4" : "pl-0",
              )}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
