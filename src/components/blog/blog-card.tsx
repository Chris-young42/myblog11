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
    <Card className="group h-full border-zinc-200/80 bg-white/90 shadow-[0_1px_0_rgba(9,9,11,0.02)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      <CardHeader>
        <div className="text-xs tracking-[0.14em] text-zinc-500 uppercase">
          {formatDate(post.date)} · {post.readingTime}
        </div>
        <CardTitle className="text-xl text-zinc-900 transition-colors group-hover:text-blue-700">
          <Link href={post.url} className="cursor-pointer hover:underline">
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
      <CardFooter className="border-zinc-100 bg-zinc-50/80 text-sm text-zinc-600">
        <Link
          href={post.url}
          className="cursor-pointer font-medium hover:text-blue-700 hover:underline"
        >
          阅读全文
        </Link>
      </CardFooter>
    </Card>
  );
}
