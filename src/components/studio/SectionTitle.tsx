import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Uniform Studio section heading: a line icon in a small tinted tile plus the title
 * (and an optional one-line hint underneath). Used for every Studio section header.
 */
export function SectionTitle({
  icon: Icon,
  children,
  hint,
  className,
  as: Tag = "span",
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  hint?: React.ReactNode;
  className?: string;
  as?: "span" | "h2";
}) {
  return (
    <Tag className={cn("flex min-w-0 items-center gap-2.5 text-base font-medium", className)}>
      <span
        aria-hidden
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary"
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
      </span>
      <span className="min-w-0 text-left">
        <span className="block truncate">{children}</span>
        {hint != null && (
          <span className="block truncate text-xs font-normal text-muted-foreground">{hint}</span>
        )}
      </span>
    </Tag>
  );
}
