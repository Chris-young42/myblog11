# Deployment Guide (Vercel + GitHub Actions)

## 1. Vercel 项目初始化

1. 将仓库推送到 GitHub。
2. 在 Vercel 中导入该仓库。
3. Framework 选择 `Next.js`，Build Command 使用默认 `pnpm build`。
4. Root Directory 指向仓库根目录。

## 2. 环境变量

在 Vercel 项目中设置：

- `NEXT_PUBLIC_SITE_URL=https://your-domain.com`

如果需要预览环境，也设置 Preview 对应的 URL。

## 3. 域名绑定

1. 在 Vercel `Settings > Domains` 添加你的域名。
2. 按 Vercel 指引在域名服务商完成 DNS 配置。
3. 等待证书签发完成并检查 HTTPS 可用。

## 4. GitHub Actions 门禁

CI 文件位置：`.github/workflows/ci.yml`

流水线顺序：

1. `pnpm install --frozen-lockfile`
2. `pnpm lint`
3. `pnpm typecheck`
4. `pnpm test:run`
5. `pnpm build`

建议开启分支保护：

- `main` 只允许通过 CI 的 PR 合并。
- 禁止直接推送 `main`。

## 5. 发布模型

- `pull_request`：只做质量校验，Vercel 生成预览。
- `main`：CI 通过后由 Vercel 自动发布生产版本。

## 6. 内容更新方式

1. 修改或新增 `content/posts/*.mdx`。
2. 提交并推送。
3. 触发 CI 与 Vercel 构建。
4. 发布后页面、RSS、Sitemap 自动更新。
