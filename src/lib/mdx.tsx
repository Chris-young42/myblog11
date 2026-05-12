import type { ComponentPropsWithoutRef } from "react";

import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-12 mb-4 scroll-mt-32 text-3xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-10 mb-3 scroll-mt-32 text-2xl font-medium tracking-tight" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-5 leading-8 text-zinc-700" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-zinc-700" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-zinc-700" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="text-zinc-900 underline decoration-zinc-300 underline-offset-4" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-6 border-l-2 border-zinc-300 pl-4 text-zinc-600 italic" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-950 p-4 text-sm text-zinc-100",
        props.className,
      )}
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn("rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm", props.className)}
      {...props}
    />
  ),
};

export async function renderMdx(source: string) {
  const { content } = await compileMDX<Record<string, never>>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: {
                className: ["heading-anchor"],
                ariaLabel: "Anchor",
              },
            },
          ],
          [
            rehypePrettyCode,
            {
              keepBackground: false,
              theme: {
                dark: "github-dark",
                light: "github-light",
              },
            },
          ],
        ] as never,
      },
    },
  });

  return content;
}
