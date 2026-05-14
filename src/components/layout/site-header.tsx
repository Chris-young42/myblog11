import Link from "next/link";

import { SiteCommandPalette } from "@/components/layout/site-command-palette";
import { getAllPostSummaries, getTagStats } from "@/lib/posts";
import { buildSearchEntries } from "@/lib/search";
import { siteConfig } from "@/lib/site-config";

export async function SiteHeader() {
  const [posts, tags] = await Promise.all([getAllPostSummaries(), getTagStats()]);
  const searchEntries = buildSearchEntries({
    nav: siteConfig.nav,
    posts,
    tags,
  });

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.22em] text-zinc-900 uppercase"
          >
            {siteConfig.name}
          </Link>
          <span className="hidden rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] tracking-[0.12em] text-zinc-500 uppercase md:inline-flex">
            MDX · Static
          </span>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <SiteCommandPalette entries={searchEntries} />
      </div>
    </header>
  );
}
