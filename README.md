# Frontend Tech Blog

Apple 风格技术博客模板，技术栈为 Next.js + TypeScript + shadcn/ui + MDX，部署链路为 GitHub Actions + Vercel。

## Features

- App Router + TypeScript 严格模式（`strict`、`noUncheckedIndexedAccess`、`exactOptionalPropertyTypes`、`noImplicitOverride`）
- shadcn/ui 基础组件集成（Button/Card/Badge/Tabs/Input/Sheet/Command 等）
- MDX 文件内容管理（frontmatter 校验、阅读时长、目录提取、标签归档）
- 首页模块化展示：Hero、精选、最新、标签墙、项目卡片
- 文章详情能力：TOC、阅读进度、上一篇/下一篇、代码高亮
- SEO 输出：`sitemap.xml`、`robots.txt`、`rss.xml`、Open Graph、JSON-LD
- 工程门禁：ESLint + Prettier + Vitest + Husky + Commitlint + GitHub Actions

## Quick Start

```bash
pnpm install
pnpm dev
```

本地访问：`http://localhost:3000`

## Content Workflow

1. 在 `content/posts` 下新增 `*.mdx` 文件。
2. frontmatter 最低要求字段：

```yaml
title: string
description: string
date: "YYYY-MM-DD"
tags: [string]
draft: boolean
featured: boolean
```

3. 提交代码到 GitHub，PR 通过 CI 后合并到 `master`。
4. Vercel 自动拉取最新提交并发布。

## Scripts

- `pnpm dev`：本地开发
- `pnpm lint`：ESLint 检查
- `pnpm typecheck`：TypeScript 类型检查
- `pnpm test:run`：运行测试
- `pnpm test:coverage`：运行测试并生成覆盖率
- `pnpm build`：构建生产版本
- `pnpm ci`：完整质量门禁

## Deploy

部署步骤和 CI 细节见：[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Execution Tracking

执行跟踪文档见：[docs/EXECUTION_TRACKING.md](docs/EXECUTION_TRACKING.md)
