const fallbackSiteUrl = "https://example.com";

export const siteConfig = {
  name: "🍔hamburger's Notebook",
  title: "🍔hamburger's Notebook | 前端技术博客",
  description: "聚焦 Next.js、TypeScript、工程化与现代前端架构的技术博客，采用 MDX 驱动内容发布。",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl).replace(/\/$/, ""),
  nav: [
    { href: "/", label: "首页" },
    { href: "/blog", label: "博客" },
    { href: "/projects", label: "项目" },
    { href: "/about", label: "关于" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
