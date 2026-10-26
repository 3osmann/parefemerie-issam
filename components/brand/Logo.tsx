import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  markClassName,
  textClassName,
  href = "/",
  label = "Nutriiva",
}: {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  href?: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`${label} — home`}
      className={cn("group inline-flex items-center gap-2.5 text-plum", className)}
    >
      <span
        className={cn(
          "relative grid h-8 w-8 shrink-0 place-items-center transition-transform duration-500 group-hover:rotate-90",
          markClassName,
        )}
      >
        <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="h-full w-full">
          <path
            d="M20 1.5c3.2 8.6 9.9 15.3 18.5 18.5C29.9 23.2 23.2 29.9 20 38.5 16.8 29.9 10.1 23.2 1.5 20 10.1 16.8 16.8 10.1 20 1.5Z"
            fill="url(#nutriiva-mark)"
          />
          <circle cx="20" cy="20" r="4.2" fill="#FFF8F4" />
          <defs>
            <linearGradient id="nutriiva-mark" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E24C83" />
              <stop offset="1" stopColor="#8E0F3E" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-[27px] font-semibold leading-none tracking-[-0.035em]",
          textClassName,
        )}
      >
        {label}
      </span>
    </Link>
  );
}
