"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SiteShellProps = {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function SiteShell({ header, footer, children }: SiteShellProps) {
  const pathname = usePathname();
  const immersive = pathname === "/hi";

  return (
    <>
      {immersive ? null : header}
      <main
        className={cn(
          "relative z-10 mx-auto w-full flex-1 px-6 py-12 lg:px-8",
          immersive ? "min-h-dvh max-w-none px-0 py-0" : "max-w-6xl",
        )}
      >
        {children}
      </main>
      {immersive ? null : footer}
    </>
  );
}
