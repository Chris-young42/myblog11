"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = total <= 0 ? 0 : Math.min(window.scrollY / total, 1);
      setProgress(ratio * 100);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 h-0.5 w-full bg-transparent">
      <div
        className="h-full bg-zinc-900 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
