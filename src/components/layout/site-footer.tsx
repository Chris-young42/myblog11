import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-zinc-200/80 bg-white/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-sm font-semibold tracking-[0.06em] text-zinc-900">{siteConfig.name}</p>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">{siteConfig.description}</p>
        </div>
        <p className="text-xs tracking-[0.1em] text-zinc-500 uppercase">
          Crafted with Next.js + MDX
        </p>
      </div>
    </footer>
  );
}
