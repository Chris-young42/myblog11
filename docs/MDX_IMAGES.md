# MDX 图片放置说明

## 1. 放哪里

把图片放到 `public/` 下，例如：

- `public/posts/my-article/cover.png`
- `public/about/avatar.jpg`
- `public/projects/tokens/chart.png`

## 2. 怎么写

在 MDX 里直接引用绝对路径：

```mdx
![封面图](/posts/my-article/cover.png)
```

也可以用 HTML：

```mdx
<img src="/posts/my-article/cover.png" alt="封面图" />
```

## 3. 规则

- 不要写 `./image.png` 这种相对路径。
- 不要把图片直接放在 `content/*.mdx` 同目录后再指望自动解析。
- 优先用 `public/`，因为当前项目的 MDX 是以字符串方式编译的。

## 4. 推荐结构

```text
public/
  posts/
    article-slug/
      cover.png
      step-1.png
      step-2.png
```

## 5. 备注

- 当前项目已给 MDX 图片统一加了基础样式。
- 如果你后面要做图注，可以直接用 `<figure>` + `<figcaption>`。
