import { cn } from "@/lib/utils";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionTitle({ eyebrow, title, description, className }: SectionTitleProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {eyebrow ? (
        <p className="text-xs tracking-[0.16em] text-zinc-500 uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl leading-tight font-semibold tracking-tight text-zinc-900">{title}</h2>
      {description ? <p className="max-w-2xl text-zinc-600">{description}</p> : null}
    </div>
  );
}
