import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-7",
        align === "center"
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto flex flex-col items-center")}>
        {eyebrow ? (
          <p className="eyebrow">
            <Sparkles className="h-3 w-3" strokeWidth={1.75} />
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "mt-4 text-balance text-[34px] font-semibold leading-[1.02] tracking-[-0.035em] text-plum sm:text-[44px] lg:text-[54px]",
            titleClassName,
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-5 max-w-xl text-pretty text-[14px] leading-relaxed text-plum/65 sm:text-[15px]">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
