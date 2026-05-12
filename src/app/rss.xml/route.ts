import { getAllPostSummaries } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getAllPostSummaries();
  const latestDate = posts[0]?.date ?? new Date().toISOString();

  const items = posts
    .map((post) => {
      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${siteConfig.siteUrl}${post.url}</link>`,
        `<guid>${siteConfig.siteUrl}${post.url}</guid>`,
        `<pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `<description>${escapeXml(post.description)}</description>`,
        "</item>",
      ].join("");
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${siteConfig.siteUrl}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>zh-cn</language>
    <lastBuildDate>${new Date(latestDate).toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
