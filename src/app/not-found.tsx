import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl space-y-5 py-20 text-center">
      <p className="text-xs tracking-[0.16em] text-zinc-500 uppercase">404</p>
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">页面不存在</h1>
      <p className="text-zinc-600">链接可能已过期，或者页面已被移动到新的地址。</p>
      <Link
        href="/"
        className="inline-block rounded-full bg-zinc-900 px-5 py-2.5 text-sm text-white hover:bg-zinc-800"
      >
        返回首页
      </Link>
    </div>
  );
}
