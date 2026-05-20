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
        className="cursor-pointer border-zinc-300 bg-white text-zinc-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
      >
        {tag}
      </Badge>
    </Link>
  );
}
