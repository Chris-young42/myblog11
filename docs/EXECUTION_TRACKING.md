# Execution Tracking

更新时间：2026-05-12

## 状态看板

- [x] 初始化 Next.js + TypeScript + Tailwind 项目
- [x] 接入 shadcn/ui 并生成基础组件
- [x] 建立 MDX 内容目录与 frontmatter 校验
- [x] 实现首页、博客列表、详情、标签页、About、Projects
- [x] 加入 SEO（sitemap/robots/rss/metadata/JSON-LD）
- [x] 配置 CI（GitHub Actions）
- [x] 配置工程规范（ESLint/Prettier/Vitest/Commitlint/Husky）
- [ ] 完成首次生产部署到 Vercel（需你绑定 GitHub 与域名）

## 核心交付清单

- 路由：`/`、`/blog`、`/blog/[slug]`、`/tags/[tag]`、`/about`、`/projects`
- 内容：`content/posts/*.mdx`
- CI：`.github/workflows/ci.yml`
- 规范：`commitlint.config.cjs`、`.prettierrc`、`eslint.config.mjs`、`vitest.config.ts`
- SEO：`src/app/sitemap.ts`、`src/app/robots.ts`、`src/app/rss.xml/route.ts`

## 待你执行的外部动作

1. 把 `siteConfig` 中社交链接改成真实地址。
2. 设置 `NEXT_PUBLIC_SITE_URL` 为你的正式域名。
3. 配置 Vercel 与域名 DNS。
4. 开启 GitHub 分支保护规则。
