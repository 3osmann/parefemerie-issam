"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Leaf, ShieldCheck, Sparkles, Vegan } from "lucide-react";
import { ProductArt } from "@/components/product/ProductArt";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categoryTabs } from "@/lib/data";
import type { CategoryTab, Product } from "@/lib/types";
import { cn } from "@/lib/utils";

const filters: Array<CategoryTab | "All"> = ["All", ...categoryTabs];

export function Bestsellers({ products }: { products: Product[] }) {
  const [active, setActive] = useState<CategoryTab | "All">("All");

  const filtered = useMemo(
    () => (active === "All" ? products : products.filter((product) => product.categoryLabel === active)),
    [active, products],
  );

  return (
    <section className="relative overflow-hidden bg-blush-50/60 py-16 sm:py-20 lg:py-24" aria-labelledby="bestsellers-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-16 h-72 w-72 rounded-full border border-blush-300/40"
      />
      <div className="container-x relative">
        <Reveal>
          <SectionHeading
            eyebrow="The favourites"
            title={
              <span id="bestsellers-heading">
                Bestsellers, but make them{" "}
                <span className="font-normal italic text-blush-600">obsessed-over.</span>
              </span>
            }
            description="The formulas our community reorders on repeat — clinically dosed, third-party tested, and genuinely delicious."
            action={
              <Link
                href="/shop-all"
                className="group inline-flex items-center gap-2 rounded-full border border-plum/20 px-5 py-3 text-[12px] font-semibold text-plum transition hover:border-plum hover:bg-plum hover:text-cream"
              >
                Shop all products
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            }
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                aria-pressed={active === filter}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-[11.5px] font-semibold transition-all duration-300",
                  active === filter
                    ? "border-plum bg-plum text-cream shadow-sm"
                    : "border-plum/12 bg-white/60 text-plum/60 hover:border-blush-300 hover:text-plum",
                )}
              >
                {filter}
              </button>
            ))}
            <span className="ml-auto hidden items-center gap-1.5 text-[10.5px] text-plum/40 sm:flex">
              <Sparkles className="h-3 w-3" /> Free shipping over $65
            </span>
          </div>
        </Reveal>

        <RevealGroup key={active} className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {filtered.map((product, index) => (
            <div key={product.id} data-reveal-item className="h-full">
              <ProductCard product={product} priority={index < 2} />
            </div>
          ))}
        </RevealGroup>

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-plum/20 p-10 text-center">
            <p className="font-display text-2xl text-plum">Nothing here yet.</p>
            <button
              type="button"
              onClick={() => setActive("All")}
              className="mt-3 text-[12px] font-semibold text-blush-700 underline underline-offset-4"
            >
              Show everything
            </button>
          </div>
        ) : null}

        {/* Social strip / certifications */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl border border-plum/[0.08] bg-white/60 p-5 backdrop-blur lg:flex-row lg:px-7">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-plum/50 lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-blush-600" /> 3rd-party tested
              </span>
              <span className="inline-flex items-center gap-2">
                <Vegan className="h-3.5 w-3.5 text-blush-600" /> Vegan
              </span>
              <span className="inline-flex items-center gap-2">
                <Leaf className="h-3.5 w-3.5 text-blush-600" /> No artificial dyes
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {products.slice(0, 4).map((product) => (
                  <span
                    key={product.id}
                    className="grid h-9 w-9 place-items-center overflow-hidden rounded-full border-2 border-white bg-blush-50"
                  >
                    <ProductArt product={product} decoration={false} className="scale-125" />
                  </span>
                ))}
              </div>
              <p className="text-[11px] leading-tight text-plum/55">
                <span className="font-bold text-plum">10,000+</span> women
                <br />
                building their ritual
              </p>
            </div>
            <Link
              href="/#bundle"
              className="group inline-flex items-center gap-2 text-[11.5px] font-semibold text-blush-700"
            >
              Bundle 3 &amp; save 30%
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
