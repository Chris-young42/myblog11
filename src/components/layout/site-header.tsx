import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="text-sm font-semibold tracking-[0.18em] text-zinc-900 uppercase">
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-1">
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
      </div>
    </header>
  );
}
