"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ProductArt } from "@/components/product/ProductArt";
import { Portal } from "@/components/ui/Portal";
import { products } from "@/lib/data";
import { useBodyLock, useEscape } from "@/lib/hooks";
import { formatPrice } from "@/lib/utils";

const suggestions = ["Fat burn", "Bloating", "Collagen", "Hair growth", "Energy"];

export function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  useBodyLock(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (!open) return null;

  const normalized = query.trim().toLowerCase();
  const results = normalized
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(normalized) ||
          product.subtitle.toLowerCase().includes(normalized) ||
          product.flavor.toLowerCase().includes(normalized) ||
          product.categoryLabel.toLowerCase().includes(normalized),
      )
    : [];

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    onClose();
    router.push(normalized ? `/shop-all?q=${encodeURIComponent(query.trim())}` : "/shop-all");
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-[90]">
        <button
          type="button"
          aria-label="Close search"
          onClick={onClose}
          className="absolute inset-0 animate-fade-in bg-plum/30 backdrop-blur-[6px]"
        />
        <div
          role="search"
          aria-label="Product search"
          className="relative mx-auto w-full max-w-4xl animate-rise-in px-3 pt-3 sm:pt-6"
        >
          <div className="max-h-[88vh] overflow-y-auto rounded-4xl bg-cream p-5 shadow-card sm:p-8">
            <div className="flex items-center justify-between">
              <Logo textClassName="text-2xl" />
              <button type="button" onClick={onClose} className="icon-btn" aria-label="Close search">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <form onSubmit={submit} className="mt-7 flex items-center gap-3 border-b border-plum/15 pb-4">
              <Search className="h-5 w-5 shrink-0 text-plum/50" strokeWidth={1.5} />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, goals, flavours…"
                className="w-full bg-transparent font-display text-xl text-plum outline-none placeholder:font-sans placeholder:text-sm placeholder:text-plum/40 sm:text-2xl"
                aria-label="Search products"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded-full bg-plum/5 px-3 py-1 text-[11px] font-semibold text-plum/60 transition hover:bg-plum/10"
                >
                  Clear
                </button>
              ) : null}
            </form>

            {!normalized ? (
              <div className="mt-7 space-y-8">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-plum/40">Trending searches</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setQuery(suggestion)}
                        className="chip hover:border-blush-400 hover:text-blush-700"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-plum/40">Most loved</p>
                    <Link
                      href="/shop-all"
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-blush-700"
                    >
                      Shop all <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {products.slice(0, 3).map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="group flex items-center gap-3 rounded-2xl border border-plum/[0.06] bg-white/60 p-2.5 transition hover:border-blush-300 hover:bg-white"
                      >
                        <span className="grid h-16 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-blush-50">
                          <ProductArt product={product} decoration={false} className="scale-110" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-[12px] font-semibold text-plum">{product.name}</span>
                          <span className="mt-0.5 block truncate text-[11px] text-plum/50">{product.subtitle}</span>
                          <span className="mt-1 block text-[11px] font-semibold text-blush-700">{formatPrice(product.price)}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-plum/40">
                  {results.length} {results.length === 1 ? "result" : "results"}
                </p>
                {results.length ? (
                  <div className="mt-3 divide-y divide-plum/[0.07]">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="group flex items-center gap-4 py-3 transition hover:bg-white/50"
                      >
                        <span className="grid h-20 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-blush-50">
                          <ProductArt product={product} decoration={false} className="scale-110" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-plum">{product.name}</span>
                          <span className="mt-0.5 block truncate text-xs text-plum/50">
                            {product.subtitle} · {product.flavor}
                          </span>
                        </span>
                        <span className="text-sm font-semibold text-plum">{formatPrice(product.price)}</span>
                        <ArrowRight className="h-4 w-4 text-plum/30 transition group-hover:translate-x-0.5 group-hover:text-blush-600" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="mt-8 rounded-3xl bg-blush-50 p-8 text-center">
                    <p className="font-display text-2xl text-plum">No matches for “{query}”</p>
                    <p className="mx-auto mt-2 max-w-sm text-sm text-plum/55">
                      Try “energy”, “bloating” or “glow” — or browse everything we make.
                    </p>
                    <Link href="/shop-all" onClick={onClose} className="btn-primary mt-5">
                      Shop all products <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}
                <button
                  type="button"
                  onClick={submit}
                  className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold text-blush-700 hover:text-blush-800"
                >
                  View all results for “{query}” <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-plum/30">Press ESC to close</p>
          </div>
        </div>
      </div>
    </Portal>
  );
}
