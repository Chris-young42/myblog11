"use client";

import { useEffect, useMemo, useState } from "react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { SearchIcon, SparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import type { SearchEntry } from "@/lib/search";

type SiteCommandPaletteProps = {
  entries: SearchEntry[];
};

export function SiteCommandPalette({ entries }: SiteCommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const groups = useMemo(() => {
    return entries.reduce<Record<string, SearchEntry[]>>((acc, entry) => {
      acc[entry.group] ??= [];
      acc[entry.group]?.push(entry);
      return acc;
    }, {});
  }, [entries]);

  const navigate = (href: string) => {
    setOpen(false);
    if (/^https?:\/\//i.test(href)) {
      window.open(href, "_blank", "noreferrer");
      return;
    }
    router.push(href as Route);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="hidden border-zinc-200 bg-white/80 text-zinc-600 shadow-sm lg:inline-flex"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-4" />
        <span>搜索</span>
        <CommandShortcut>⌘K</CommandShortcut>
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="inline-flex border border-zinc-200 bg-white/80 text-zinc-600 shadow-sm lg:hidden"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-4" />
        <span className="sr-only">打开搜索</span>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="站点搜索"
        description="搜索导航、文章和标签。"
      >
        <Command className="border-none shadow-none">
          <div className="flex items-center gap-2 border-b border-zinc-200 px-3 py-2 text-xs text-zinc-500">
            <SparklesIcon className="size-4" />
            <span>输入关键词后回车跳转</span>
          </div>
          <CommandInput placeholder="搜索标题、标签或页面..." />
          <CommandList>
            <CommandEmpty>没有找到匹配内容。</CommandEmpty>
            {(["导航", "文章", "标签"] as const).map((group, index) => {
              const groupEntries = groups[group] ?? [];

              if (groupEntries.length === 0) {
                return null;
              }

              return (
                <div key={group}>
                  {index > 0 ? <CommandSeparator /> : null}
                  <CommandGroup heading={group}>
                    {groupEntries.map((entry) => (
                      <CommandItem
                        key={entry.id}
                        value={[entry.title, entry.description, ...entry.keywords].join(" ")}
                        onSelect={() => navigate(String(entry.href))}
                      >
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <span className="truncate">{entry.title}</span>
                          {entry.description ? (
                            <span className="truncate text-xs text-zinc-500">
                              {entry.description}
                            </span>
                          ) : null}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </div>
              );
            })}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
