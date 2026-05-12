import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PostSummary } from "@/lib/post-types";
import { formatDate } from "@/lib/utils";

import { TagChip } from "./tag-chip";

type BlogCardProps = {
  post: PostSummary;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="h-full border-zinc-200 bg-white shadow-none transition hover:-translate-y-0.5 hover:shadow-sm">
      <CardHeader>
        <div className="text-xs tracking-wide text-zinc-500 uppercase">
          {formatDate(post.date)} · {post.readingTime}
        </div>
        <CardTitle className="text-xl text-zinc-900">
          <Link href={post.url} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-zinc-600">{post.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagChip key={`${post.slug}-${tag}`} tag={tag} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-zinc-100 bg-zinc-50/70 text-sm text-zinc-600">
        <Link href={post.url} className="hover:text-zinc-900 hover:underline">
          阅读全文
        </Link>
      </CardFooter>
    </Card>
  );
}
