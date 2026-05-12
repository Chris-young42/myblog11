import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { readPostsFromDirectory, tagToSlug } from "@/lib/posts";

async function createFixtureDir() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "blog-posts-"));
  return dir;
}

describe("tagToSlug", () => {
  it("normalizes mixed language tags", () => {
    expect(tagToSlug("TypeScript Basics")).toBe("typescript-basics");
    expect(tagToSlug("前端 工程")).toBe("前端-工程");
  });
});

describe("readPostsFromDirectory", () => {
  it("sorts posts by date and filters drafts by default", async () => {
    const dir = await createFixtureDir();

    await fs.writeFile(
      path.join(dir, "a.mdx"),
      `---
title: A
description: A desc
date: "2026-05-01"
tags: [TypeScript]
draft: false
---
## A
content`,
      "utf8",
    );

    await fs.writeFile(
      path.join(dir, "b.mdx"),
      `---
title: B
description: B desc
date: "2026-05-02"
tags: [Next.js]
draft: true
---
## B
content`,
      "utf8",
    );

    const posts = await readPostsFromDirectory({ contentDir: dir });
    expect(posts).toHaveLength(1);
    expect(posts[0]?.slug).toBe("a");

    const postsWithDrafts = await readPostsFromDirectory({ contentDir: dir, includeDrafts: true });
    expect(postsWithDrafts).toHaveLength(2);
    expect(postsWithDrafts[0]?.slug).toBe("b");
  });

  it("throws when frontmatter is invalid", async () => {
    const dir = await createFixtureDir();

    await fs.writeFile(
      path.join(dir, "broken.mdx"),
      `---
title: Broken
description: test
tags: [NoDate]
---
content`,
      "utf8",
    );

    await expect(readPostsFromDirectory({ contentDir: dir })).rejects.toThrowError(
      "Invalid frontmatter",
    );
  });
});
