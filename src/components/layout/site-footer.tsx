import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-zinc-200">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-sm font-medium text-zinc-900">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-zinc-600">{siteConfig.description}</p>
        </div>
      </div>
    </footer>
  );
}
