"use client";

import { useMemo, useState } from "react";
import { Link2Icon, ArrowUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type PostActionsProps = {
  url: string;
};

export function PostActions({ url }: PostActionsProps) {
  const [copied, setCopied] = useState(false);

  const buttonLabel = useMemo(() => (copied ? "已复制" : "复制链接"), [copied]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" variant="outline" size="sm" onClick={copyLink}>
        <Link2Icon className="size-4" />
        {buttonLabel}
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={scrollTop}>
        <ArrowUpIcon className="size-4" />
        回到顶部
      </Button>
    </div>
  );
}
