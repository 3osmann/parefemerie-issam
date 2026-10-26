"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Clock, Lock, Minus, Plus, ShieldCheck, Sparkles, Truck, X } from "lucide-react";
import { ProductArt } from "@/components/product/ProductArt";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCart } from "@/lib/cart-context";
import { bundleTiers, categoryTabs } from "@/lib/data";
import type { CategoryTab, Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export function BundleBuilder({ products }: { products: Product[] }) {
  const { addLine, openCart } = useCart();
  const [activeTier, setActiveTier] = useState(bundleTiers[0].slug);
  const [activeCategory, setActiveCategory] = useState<CategoryTab>("Weight Loss");
  const [selection, setSelection] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    products.slice(0, 2).forEach((product) => {
      initial[product.id] = 1;
    });
    return initial;
  });
  const [remaining, setRemaining] = useState<number | null>(null);

  const tier = bundleTiers.find((item) => item.slug === activeTier) ?? bundleTiers[0];

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      setRemaining(end.getTime() - now.getTime());
    };
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const selectionCount = useMemo(
    () => Object.values(selection).reduce((total, quantity) => total + quantity, 0),
    [selection],
  );

  const selected = useMemo(
    () =>
      products
        .filter((product) => selection[product.id])
        .map((product) => ({ product, quantity: selection[product.id] })),
    [products, selection],
  );

  const retail = selected.reduce((total, line) => total + line.product.price * line.quantity, 0);
  const total = Math.round(retail * (1 - tier.discountRate));
  const savings = retail - total;
  const isComplete = selectionCount === tier.packSize;

  const categoryProducts = products.filter((product) => product.categoryLabel === activeCategory);
  const categoryCount = (category: CategoryTab) =>
    products.filter((product) => product.categoryLabel === category).length;

  function trimSelection(next: Record<string, number>, limit: number) {
    let count = 0;
    const trimmed: Record<string, number> = {};
    for (const product of products) {
      const quantity = next[product.id];
      if (!quantity) continue;
      const allowed = Math.min(quantity, limit - count);
      if (allowed <= 0) break;
      trimmed[product.id] = allowed;
      count += allowed;
    }
    return trimmed;
  }

  function changeTier(slug: string) {
    const nextTier = bundleTiers.find((item) => item.slug === slug);
    if (!nextTier) return;
    setActiveTier(slug);
    setSelection((current) => trimSelection(current, nextTier.packSize));
  }

  function addItem(productId: string) {
    setSelection((current) => {
      const count = Object.values(current).reduce((total, quantity) => total + quantity, 0);
      if (count >= tier.packSize) return current;
      return { ...current, [productId]: (current[productId] ?? 0) + 1 };
    });
  }

  function removeItem(productId: string, all = false) {
    setSelection((current) => {
      const quantity = current[productId] ?? 0;
      if (quantity <= 1 || all) {
        const next = { ...current };
        delete next[productId];
        return next;
      }
      return { ...current, [productId]: quantity - 1 };
    });
  }

  function addBundle() {
    if (!isComplete || total <= 0) return;
    const names = selected.flatMap((line) =>
      Array.from({ length: line.quantity }, () => line.product.name),
    );
    const summary =
      names.length > 2 ? `${names.slice(0, 2).join(" · ")} + ${names.length - 2} more` : names.join(" · ");

    addLine({
      productId: `custom-bundle-${tier.packSize}`,
      slug: `custom-bundle-${tier.packSize}`,
      name: `Custom Glow Bundle · ${tier.packSize}-Pack`,
      flavor: summary,
      price: total,
      compareAtPrice: retail,
      quantity: 1,
      purchaseType: "one_time",
      accentFrom: "#F9CDDC",
      accentTo: "#D81B60",
      lidColor: "#4A1525",
      labelColor: "#FFF6F1",
      artVariant: "bundle",
      isBundle: true,
    });
    openCart();
  }

  const hours = remaining === null ? null : Math.max(0, Math.floor(remaining / 3_600_000));
  const minutes = remaining === null ? null : Math.max(0, Math.floor((remaining % 3_600_000) / 60_000));
  const seconds = remaining === null ? null : Math.max(0, Math.floor((remaining % 60_000) / 1000));

  return (
    <section id="bundle" className="relative scroll-mt-24 overflow-hidden bg-[#FBEDF1] py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8%] top-10 h-80 w-80 rounded-full bg-blush-200/50 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-[-5%] h-96 w-96 rounded-full bg-white/60 blur-[100px]"
      />
      <div className="container-x relative">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Build your bundle"
            title={
              <>
                Your bundle. Your rules.
                <br />
                <span className="font-normal italic text-blush-600">Save up to 30%.</span>
              </>
            }
            description="Pick 5, 10 or 15 products from any category. The discount applies automatically — and you can change your mix anytime."
            className="mx-auto max-w-3xl"
          />
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.34fr_0.66fr] lg:gap-5">
          {/* ----------------------------- Builder ----------------------------- */}
          <Reveal className="min-w-0">
            <div className="rounded-[32px] border border-plum/[0.08] bg-white/75 p-4 shadow-soft backdrop-blur sm:p-6">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-plum/45">01 · Pick your pack</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sage px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#476b41]">
                  <Sparkles className="h-2.5 w-2.5" /> Mix any products
                </span>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {bundleTiers.map((option) => {
                  const isActive = option.slug === activeTier;
                  return (
                    <button
                      key={option.slug}
                      type="button"
                      onClick={() => changeTier(option.slug)}
                      aria-pressed={isActive}
                      className={cn(
                        "relative rounded-2xl border p-3 text-left transition-all duration-300",
                        isActive
                          ? "border-plum bg-plum text-cream shadow-lg"
                          : "border-plum/12 bg-white/60 hover:border-blush-300 hover:bg-white",
                      )}
                    >
                      {option.badge ? (
                        <span className="absolute -top-2 right-2 rounded-full bg-blush-600 px-2 py-[3px] text-[7px] font-bold uppercase tracking-[0.1em] text-cream">
                          {option.badge}
                        </span>
                      ) : null}
                      <div className="flex items-center justify-between gap-2">
                        <span className={cn("font-display text-[19px] font-semibold", isActive ? "text-cream" : "text-plum")}>
                          {option.packSize} pack
                        </span>
                        <span
                          className={cn(
                            "text-[10px] font-bold",
                            isActive ? "text-blush-200" : "text-blush-700",
                          )}
                        >
                          −{Math.round(option.discountRate * 100)}%
                        </span>
                      </div>
                      <p className={cn("mt-1 text-[10px]", isActive ? "text-cream/50" : "text-plum/40")}>
                        from {formatPrice(option.price)}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-plum/45">02 · Choose your products</p>
                <span className="text-[10px] font-semibold text-plum/45">
                  {selectionCount}/{tier.packSize} selected
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5 rounded-2xl border border-plum/[0.06] bg-blush-50/80 p-1.5">
                {categoryTabs.map((category) => {
                  const isActive = category === activeCategory;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      aria-pressed={isActive}
                      className={cn(
                        "flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[10.5px] font-semibold transition-all duration-300",
                        isActive
                          ? "bg-white text-plum shadow-sm"
                          : "text-plum/50 hover:text-plum",
                      )}
                    >
                      {category}
                      <span className={cn("text-[8.5px]", isActive ? "text-blush-600" : "text-plum/30")}>
                        {categoryCount(category)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {categoryProducts.map((product) => {
                  const quantity = selection[product.id] ?? 0;
                  const full = selectionCount >= tier.packSize && quantity === 0;
                  return (
                    <div
                      key={product.id}
                      className={cn(
                        "relative flex items-center gap-2.5 rounded-2xl border p-2.5 transition-all duration-300",
                        quantity > 0
                          ? "border-blush-400 bg-white shadow-sm"
                          : "border-plum/[0.08] bg-white/55 hover:border-blush-300",
                      )}
                    >
                      <div className="h-[66px] w-[54px] shrink-0 overflow-hidden rounded-xl bg-blush-50">
                        <ProductArt product={product} decoration={false} className="scale-110" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[11.5px] font-semibold text-plum">{product.name}</p>
                        <p className="mt-0.5 truncate text-[9.5px] text-plum/45">{product.flavor}</p>
                        <p className="mt-1 text-[10.5px] font-semibold text-blush-700">{formatPrice(product.price)}</p>
                      </div>

                      {quantity > 0 ? (
                        <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-plum p-0.5 text-cream">
                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            aria-label={`Remove one ${product.name}`}
                            className="grid h-5 w-5 place-items-center rounded-full transition hover:bg-white/15"
                          >
                            <Minus className="h-2.5 w-2.5" />
                          </button>
                          <span className="w-3.5 text-center text-[9.5px] font-bold">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => addItem(product.id)}
                            disabled={full}
                            aria-label={`Add one more ${product.name}`}
                            className="grid h-5 w-5 place-items-center rounded-full transition hover:bg-white/15 disabled:opacity-30"
                          >
                            <Plus className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addItem(product.id)}
                          disabled={full}
                          aria-label={`Add ${product.name} to bundle`}
                          className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-plum/15 text-plum transition hover:border-plum hover:bg-plum hover:text-cream disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      )}

                      {quantity > 0 ? (
                        <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-blush-600 text-cream">
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-2xl bg-blush-50 px-3.5 py-2.5 text-[10.5px] leading-relaxed text-plum/55">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blush-600" />
                <span>
                  Mix categories freely — your {Math.round(tier.discountRate * 100)}% bundle discount applies to the
                  whole ritual. Swap products before every renewal.
                </span>
              </div>
            </div>
          </Reveal>

          {/* ----------------------------- Summary ----------------------------- */}
          <Reveal delay={0.1} className="self-start lg:sticky lg:top-[104px]">
            <aside className="overflow-hidden rounded-[32px] bg-plum text-cream shadow-card">
              <div className="relative p-5 sm:p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blush-500/25 blur-[50px]"
                />
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blush-300">Your ritual</p>
                    <h3 className="mt-1 font-display text-[26px] font-semibold leading-none">
                      {tier.packSize}-Pack Bundle
                    </h3>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 font-display text-lg text-blush-200">
                    {selectionCount}
                  </span>
                </div>

                <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blush-300 to-blush-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, (selectionCount / tier.packSize) * 100)}%` }}
                  />
                </div>

                <div className="relative mt-4 flex items-center justify-between gap-2 rounded-xl bg-white/[0.06] px-3 py-2">
                  <span className="inline-flex items-center gap-1.5 text-[8.5px] font-bold uppercase tracking-[0.14em] text-cream/45">
                    <Clock className="h-3 w-3 text-blush-300" /> Offer ends in
                  </span>
                  <div className="flex items-center gap-1 text-[13px] font-bold tabular-nums">
                    <span className="rounded bg-white/10 px-1.5 py-0.5">{hours === null ? "--" : pad(hours)}</span>
                    <span className="text-cream/35">:</span>
                    <span className="rounded bg-white/10 px-1.5 py-0.5">{minutes === null ? "--" : pad(minutes)}</span>
                    <span className="text-cream/35">:</span>
                    <span className="rounded bg-white/10 px-1.5 py-0.5">{seconds === null ? "--" : pad(seconds)}</span>
                  </div>
                </div>

                <div className="relative mt-4">
                  {selected.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/15 px-4 py-6 text-center">
                      <p className="text-[11.5px] font-medium text-cream/60">Your bundle is empty.</p>
                      <p className="mt-1 text-[10px] text-cream/35">Pick a product to see your price update live.</p>
                    </div>
                  ) : (
                    <ul className="max-h-48 space-y-1.5 overflow-y-auto pr-1">
                      {selected.map(({ product, quantity }) => (
                        <li
                          key={product.id}
                          className="flex items-center gap-2 rounded-xl bg-white/[0.045] py-1.5 pl-1.5 pr-1"
                        >
                          <span className="h-8 w-7 shrink-0 overflow-hidden rounded-lg bg-white/10">
                            <ProductArt product={product} decoration={false} className="scale-110" />
                          </span>
                          <span className="min-w-0 flex-1 truncate text-[10.5px] font-medium text-cream/80">
                            {product.name}
                          </span>
                          <span className="text-[9.5px] text-cream/40">×{quantity}</span>
                          <span className="text-[10px] font-semibold tabular-nums">
                            {formatPrice(product.price * quantity)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(product.id, true)}
                            aria-label={`Remove ${product.name} from bundle`}
                            className="grid h-5 w-5 place-items-center rounded-full text-cream/35 transition hover:bg-white/10 hover:text-cream"
                          >
                            <X className="h-2.5 w-2.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="relative mt-4 space-y-1.5 border-t border-white/10 pt-3.5 text-[11px]">
                  <div className="flex items-center justify-between text-cream/45">
                    <span>Retail value</span>
                    <span className={cn(savings > 0 && "line-through")}>{formatPrice(retail)}</span>
                  </div>
                  <div className="flex items-center justify-between text-blush-200">
                    <span>Bundle saving · {Math.round(tier.discountRate * 100)}%</span>
                    <span>-{formatPrice(savings)}</span>
                  </div>
                  <div className="flex items-end justify-between pt-2">
                    <span className="font-display text-lg">Your price</span>
                    <span className="font-display text-[26px] font-semibold leading-none">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addBundle}
                  disabled={!isComplete}
                  className={cn(
                    "mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[12.5px] font-semibold transition-all duration-300",
                    isComplete
                      ? "bg-cream text-plum hover:-translate-y-0.5 hover:bg-blush-100"
                      : "cursor-not-allowed bg-white/10 text-cream/35",
                  )}
                >
                  {isComplete ? (
                    <>
                      Add bundle to bag · {formatPrice(total)} <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Select {Math.max(0, tier.packSize - selectionCount)} more to unlock{" "}
                      {Math.round(tier.discountRate * 100)}%
                    </>
                  )}
                </button>

                <div className="relative mt-4 grid grid-cols-3 gap-1.5 text-center text-[8px] font-semibold uppercase tracking-[0.1em] text-cream/40">
                  <span className="flex flex-col items-center gap-1">
                    <Truck className="h-3.5 w-3.5 text-blush-300" /> Free shipping
                  </span>
                  <span className="flex flex-col items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-blush-300" /> 90-day promise
                  </span>
                  <span className="flex flex-col items-center gap-1">
                    <Lock className="h-3.5 w-3.5 text-blush-300" /> Skip anytime
                  </span>
                </div>
              </div>
              <div className="border-t border-white/10 bg-plum-deep/40 px-5 py-3 text-center text-[9.5px] text-cream/35">
                Secure checkout · Cancel or swap products whenever you like
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
