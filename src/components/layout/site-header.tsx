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
    <header className="sticky top-4 z-40 mx-4 rounded-2xl border border-zinc-200/80 bg-white/85 shadow-sm backdrop-blur-xl lg:mx-8">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 lg:px-7">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-base leading-none font-semibold tracking-[0.08em] text-zinc-900"
          >
            {siteConfig.name}
          </Link>
          <span className="hidden rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-medium tracking-[0.1em] text-blue-700 uppercase md:inline-flex">
            Motion Blog
          </span>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
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
