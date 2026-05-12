import Link from "next/link";
import type { Route } from "next";

import { Badge } from "@/components/ui/badge";
import { tagToSlug } from "@/lib/tag-utils";

type TagChipProps = {
  tag: string;
};

export function TagChip({ tag }: TagChipProps) {
  const href = `/tags/${tagToSlug(tag)}` as Route;

  return (
    <Link href={href}>
      <Badge
        variant="outline"
        className="border-zinc-300 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
      >
        {tag}
      </Badge>
    </Link>
  );
}
