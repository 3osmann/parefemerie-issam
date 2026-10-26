"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Portal } from "@/components/ui/Portal";
import { categoryTabs } from "@/lib/data";
import { useBodyLock, useEscape } from "@/lib/hooks";

const links = [
  { label: "Shop All", href: "/shop-all" },
  { label: "Real Results", href: "/#results" },
  { label: "Build My Bundle", href: "/#bundle" },
  { label: "Learn", href: "/#learn" },
  { label: "Take the Quiz", href: "/quiz" },
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useBodyLock(open);
  useEscape(open, onClose);
  if (!open) return null;

  return (
    <Portal>
      <div
        role="navigation"
        aria-label="Mobile menu"
        className="fixed inset-0 z-[95] flex flex-col overflow-y-auto bg-cream"
      >
        <div className="container-x flex h-[70px] shrink-0 items-center justify-between">
          <Logo textClassName="text-2xl" />
          <button type="button" onClick={onClose} className="icon-btn" aria-label="Close menu">
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="container-x flex flex-1 flex-col pb-10 pt-4">
          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                style={{ animationDelay: `${80 + index * 55}ms` }}
                className="group flex animate-rise-in items-center justify-between border-b border-plum/10 py-4"
              >
                <span className="flex items-baseline gap-3">
                  <span className="text-[9px] font-semibold tracking-widest text-blush-600">0{index + 1}</span>
                  <span className="font-display text-[30px] leading-none tracking-[-0.03em] text-plum sm:text-4xl">
                    {link.label}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-plum/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blush-600" />
              </Link>
            ))}
          </nav>

          <div className="mt-8 animate-rise-in" style={{ animationDelay: "420ms" }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-plum/40">Shop by need</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {categoryTabs.map((category) => (
                <Link
                  key={category}
                  href={`/shop-all?category=${encodeURIComponent(category)}`}
                  onClick={onClose}
                  className="chip hover:border-blush-400 hover:text-blush-700"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div
            className="mt-8 animate-rise-in overflow-hidden rounded-3xl bg-plum p-6 text-cream"
            style={{ animationDelay: "480ms" }}
          >
            <p className="eyebrow !text-blush-200">
              <Sparkles className="h-3 w-3" /> Save up to 30%
            </p>
            <p className="mt-2 font-display text-2xl leading-tight">Build a bundle that fits your body.</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-cream/60">
              Mix any 5, 10 or 15 products. Skip, pause or cancel whenever.
            </p>
            <Link href="/#bundle" onClick={onClose} className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2.5 text-[12px] font-semibold text-plum">
              Start building <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-auto flex animate-rise-in items-center justify-between pt-8" style={{ animationDelay: "540ms" }}>
            <a href="mailto:hello@nutriiva.com" className="text-[12px] font-medium text-plum/60 underline-offset-4 hover:underline">
              hello@nutriiva.com
            </a>
            <div className="flex gap-3 text-[11px] font-semibold uppercase tracking-widest text-plum/50">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-plum">
                IG
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-plum">
                TT
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-plum">
                PT
              </a>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
