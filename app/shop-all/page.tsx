import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, Sparkles, X } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { categoryLabels, categoryTabs, categoryToEnum } from "@/lib/data";
import { getProducts } from "@/lib/queries";
import type { CategoryTab } from "@/lib/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop all supplements",
  description:
    "Explore every Nutriiva formula — metabolism, digestion, skin and hair. Clinically dosed, third-party tested and genuinely delicious.",
  alternates: { canonical: "/shop-all" },
};

type SearchParams = Promise<{ q?: string | string[]; category?: string | string[] }>;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ShopAllPage({ searchParams }: { searchParams: SearchParams }) {
  const resolved = await searchParams;
  const query = (firstValue(resolved.q) ?? "").trim();
  const rawCategory = firstValue(resolved.category) ?? "All";
  const category = (categoryTabs as string[]).includes(rawCategory) ? (rawCategory as CategoryTab) : "All";

  const products = await getProducts({
    category: category === "All" ? null : category,
    search: query || undefined,
    limit: 24,
  });

  const isFiltered = Boolean(query) || category !== "All";

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-blush-100/80 via-blush-50/60 to-cream pb-10 pt-8 sm:pb-12 sm:pt-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-blush-300/50"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-blush-200/40 blur-[90px]"
        />
        <div className="container-x relative">
          <nav aria-label="Breadcrumb" className="text-[10.5px] text-plum/40">
            <Link href="/" className="transition hover:text-plum">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-plum/65">Shop all</span>
          </nav>

          <div className="mt-7 grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <p className="eyebrow">
                <Sparkles className="h-3 w-3" /> The full collection
              </p>
              <h1 className="mt-4 text-balance font-display text-[42px] font-semibold leading-[0.95] tracking-[-0.045em] text-plum sm:text-[54px] lg:text-[64px]">
                All the good stuff.{" "}
                <span className="font-normal italic text-blush-600">None of the filler.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[13.5px] leading-relaxed text-plum/60 sm:text-[14px]">
                Every formula is built with women&apos;s health practitioners, dosed at clinical levels and tested by an
                independent lab. Pick one, or build a bundle and save up to 30%.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[26px] border border-white/60 bg-white/55 p-4 backdrop-blur sm:p-5">
                <form action="/shop-all" method="get" role="search" className="flex gap-2">
                  {category !== "All" ? <input type="hidden" name="category" value={category} /> : null}
                  <label htmlFor="shop-search" className="sr-only">
                    Search products
                  </label>
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/35" />
                    <input
                      id="shop-search"
                      name="q"
                      type="search"
                      defaultValue={query}
                      placeholder="Search flavours, benefits, formulas…"
                      className="input-pill !py-3 !pl-11"
                    />
                  </div>
                  <button type="submit" className="btn-primary shrink-0 px-5">
                    Search
                  </button>
                </form>
                <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-plum/35">
                  Free shipping over $65 · 90-day money-back guarantee
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <Link
                href={query ? `/shop-all?q=${encodeURIComponent(query)}` : "/shop-all"}
                className={cn(
                  "rounded-full border px-4 py-2 text-[11.5px] font-semibold transition",
                  category === "All"
                    ? "border-plum bg-plum text-cream"
                    : "border-plum/12 bg-white/60 text-plum/60 hover:border-blush-300 hover:text-plum",
                )}
              >
                All products
              </Link>
              {categoryTabs.map((tab) => {
                const params = new URLSearchParams();
                if (query) params.set("q", query);
                params.set("category", tab);
                return (
                  <Link
                    key={tab}
                    href={`/shop-all?${params.toString()}`}
                    className={cn(
                      "rounded-full border px-4 py-2 text-[11.5px] font-semibold transition",
                      category === tab
                        ? "border-plum bg-plum text-cream"
                        : "border-plum/12 bg-white/60 text-plum/60 hover:border-blush-300 hover:text-plum",
                    )}
                  >
                    {categoryLabels[categoryToEnum[tab]]}
                  </Link>
                );
              })}
              {isFiltered ? (
                <Link
                  href="/shop-all"
                  className="ml-auto inline-flex items-center gap-1 text-[10.5px] font-semibold text-plum/45 transition hover:text-plum"
                >
                  <X className="h-3 w-3" /> Clear filters
                </Link>
              ) : null}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream pb-16 pt-6 sm:pb-20 lg:pb-24">
        <div className="container-x">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-plum/40">
              {products.length} {products.length === 1 ? "formula" : "formulas"}
              {category !== "All" ? ` · ${category}` : ""}
              {query ? ` · “${query}”` : ""}
            </p>
            <p className="text-[10.5px] text-plum/35">Prices in USD · subscribe &amp; save 15%</p>
          </div>

          <h2 className="sr-only">Shop all formulas</h2>
          {products.length > 0 ? (
            <RevealGroup key={`${category}-${query}`} className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, index) => (
                <div key={product.id} data-reveal-item className="h-full">
                  <ProductCard product={product} priority={index < 4} />
                </div>
              ))}
            </RevealGroup>
          ) : (
            <Reveal>
              <div className="mt-5 rounded-[28px] border border-dashed border-plum/20 bg-white/50 px-6 py-14 text-center">
                <p className="font-display text-[28px] font-semibold text-plum">No formulas match that (yet).</p>
                <p className="mx-auto mt-2 max-w-sm text-[12.5px] leading-relaxed text-plum/55">
                  Try a different flavour, benefit or category. Or take the quiz and we&apos;ll point you in the right
                  direction.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  <Link href="/shop-all" className="btn-plum">
                    Show all products
                  </Link>
                  <Link href="/quiz" className="btn-outline">
                    Take the quiz
                  </Link>
                </div>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.06}>
            <div className="mt-10 flex flex-col items-center justify-between gap-5 overflow-hidden rounded-[28px] bg-gradient-to-r from-plum via-[#5A1B30] to-blush-800 p-6 text-cream sm:flex-row sm:p-8">
              <div>
                <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-blush-300">
                  The smarter way to shop
                </p>
                <p className="mt-2 font-display text-[25px] font-semibold leading-tight tracking-[-0.02em] sm:text-[29px]">
                  Buy 3, save up to 30%.
                </p>
                <p className="mt-1 text-[11.5px] text-cream/55">
                  Mix any formulas. One delivery. Change it before every renewal.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Link
                  href="/#bundle"
                  className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-[11.5px] font-semibold text-plum transition hover:bg-blush-100"
                >
                  Build my bundle <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-[11.5px] font-semibold text-cream transition hover:bg-white/10"
                >
                  Find my match
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
