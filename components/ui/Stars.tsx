import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  rating = 5,
  className,
  starClassName,
  showValue = false,
  count,
}: {
  rating?: number;
  className?: string;
  starClassName?: string;
  showValue?: boolean;
  count?: number;
}) {
  return (
    <span
      role="img"
      className={cn("inline-flex items-center gap-1.5", className)}
      aria-label={`${rating} out of 5 stars${count !== undefined ? ` from ${count.toLocaleString("en-US")} reviews` : ""}`}
    >
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => {
          const filled = index + 1 <= Math.round(rating);
          return (
            <Star
              key={index}
              className={cn(
                "h-3.5 w-3.5",
                filled ? "fill-blush-600 text-blush-600" : "fill-transparent text-plum/25",
                starClassName,
              )}
              strokeWidth={1.5}
            />
          );
        })}
      </span>
      {showValue ? (
        <span className="text-[11px] font-semibold text-plum/70">
          {rating.toFixed(1)}
          {count !== undefined ? ` (${count.toLocaleString("en-US")})` : ""}
        </span>
      ) : null}
    </span>
  );
}
