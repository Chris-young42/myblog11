export type TocHeading = {
  id: string;
  text: string;
  depth: 2 | 3;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  draft: boolean;
  featured: boolean;
  readingTime: string;
  url: `/blog/${string}`;
  toc: TocHeading[];
  content: string;
};

export type PostSummary = Omit<Post, "content" | "toc">;
