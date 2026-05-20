import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Caveat, Quicksand } from "next/font/google";

import { SiteAtmosphere } from "@/components/layout/site-atmosphere";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteShell } from "@/components/layout/site-shell";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const displayFont = Caveat({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700"],
});

const sansFont = Quicksand({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

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
    <html
      lang="zh-CN"
      className={`${displayFont.variable} ${sansFont.variable} h-full antialiased`}
    >
      <body className="relative min-h-full overflow-x-hidden bg-background text-foreground">
        <SiteAtmosphere />
        <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
