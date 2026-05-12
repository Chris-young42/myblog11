import type { MetadataRoute } from "next";

import { getAllPostSummaries } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/blog", "/projects", "/about"];
  const posts = await getAllPostSummaries();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
    lastModified: new Date(),
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.siteUrl}${post.url}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
}
