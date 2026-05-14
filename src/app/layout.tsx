import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteAtmosphere } from "@/components/layout/site-atmosphere";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="relative min-h-full overflow-x-hidden bg-background text-foreground">
        <SiteAtmosphere />
        <SiteHeader />
        <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-6 py-10 lg:px-8">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
