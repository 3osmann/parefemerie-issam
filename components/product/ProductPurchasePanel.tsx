"use client";

import { useEffect, useState } from "react";
import { Check, Minus, Plus, RotateCcw, ShieldCheck, ShoppingBag, Sparkles, Truck } from "lucide-react";
import { Stars } from "@/components/ui/Stars";
import { useCart } from "@/lib/cart-context";
import { markRecentlyViewed } from "@/lib/use-recently-viewed";
import type { CartPurchaseType, Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

const SUBSCRIPTION_DISCOUNT = 0.15;

export function ProductPurchasePanel({ product }: { product: Product }) {
  const { addLine, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<CartPurchaseType>("subscription");

  useEffect(() => {
    markRecentlyViewed(product.slug);
  }, [product.slug]);

  const subscriptionPrice = Math.round(product.price * (1 - SUBSCRIPTION_DISCOUNT));
  const unitPrice = purchaseType === "subscription" ? subscriptionPrice : product.price;
  const compareAt = purchaseType === "subscription" ? product.price : product.compareAtPrice;
  const total = unitPrice * quantity;

  function handleAdd() {
    addLine({
      key: `${product.id}:${purchaseType}`,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      flavor: product.flavor,
      price: unitPrice,
      compareAtPrice: compareAt,
      quantity,
      purchaseType,
      accentFrom: product.accentFrom,
      accentTo: product.accentTo,
      lidColor: product.lidColor,
      labelColor: product.labelColor,
      artVariant: product.artVariant,
      isBundle: product.isBundle,
    });
    openCart();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-blush-700">
          <Sparkles className="h-3 w-3" /> {product.categoryLabel}
        </span>
        <a href="#reviews" className="inline-flex items-center gap-1.5 text-[11px] text-plum/55 hover:text-plum">
          <Stars rating={product.rating} starClassName="h-3 w-3" />
          <span className="font-semibold text-plum">{product.rating.toFixed(1)}</span>
          <span className="underline-offset-4 hover:underline">({product.reviewCount.toLocaleString("en-US")} reviews)</span>
        </a>
      </div>

      <h1 className="mt-4 text-balance font-display text-[38px] font-semibold leading-[0.98] tracking-[-0.04em] text-plum sm:text-[46px] lg:text-[52px]">
        {product.name}
      </h1>
      <p className="mt-2 text-[13px] font-medium text-plum/50">
        {product.subtitle} · {product.flavor}
      </p>
      <p className="mt-4 max-w-lg text-pretty text-[13.5px] leading-relaxed text-plum/65">{product.description}</p>

      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {product.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-[12px] leading-snug text-plum/65">
            <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-sage text-[#527a4b]">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            {benefit}
          </li>
        ))}
      </ul>

      <div className="mt-7 space-y-2.5">
        <button
          type="button"
          onClick={() => setPurchaseType("subscription")}
          aria-pressed={purchaseType === "subscription"}
          className={cn(
            "relative flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all sm:p-4",
            purchaseType === "subscription"
              ? "border-blush-500 bg-blush-50 shadow-[0_12px_30px_-20px_rgba(216,27,96,0.6)]"
              : "border-plum/12 bg-white/50 hover:border-plum/30",
          )}
        >
          <span
            className={cn(
              "grid h-4 w-4 shrink-0 place-items-center rounded-full border-2",
              purchaseType === "subscription" ? "border-blush-600" : "border-plum/25",
            )}
          >
            {purchaseType === "subscription" ? <span className="h-2 w-2 rounded-full bg-blush-600" /> : null}
          </span>
          <span className="flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-[13px] font-semibold text-plum">Subscribe &amp; save 15%</span>
              <span className="rounded-full bg-blush-600 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-cream">
                Best value
              </span>
            </span>
            <span className="mt-0.5 block text-[10.5px] text-plum/50">
              Every 30 days · free shipping · skip or cancel anytime
            </span>
          </span>
          <span className="shrink-0 text-right">
            <span className="block text-[14px] font-bold text-plum">{formatPrice(subscriptionPrice)}</span>
            <span className="block text-[10px] text-plum/35 line-through">{formatPrice(product.price)}</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => setPurchaseType("one_time")}
          aria-pressed={purchaseType === "one_time"}
          className={cn(
            "flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all sm:p-4",
            purchaseType === "one_time"
              ? "border-blush-500 bg-blush-50 shadow-[0_12px_30px_-20px_rgba(216,27,96,0.6)]"
              : "border-plum/12 bg-white/50 hover:border-plum/30",
          )}
        >
          <span
            className={cn(
              "grid h-4 w-4 shrink-0 place-items-center rounded-full border-2",
              purchaseType === "one_time" ? "border-blush-600" : "border-plum/25",
            )}
          >
            {purchaseType === "one_time" ? <span className="h-2 w-2 rounded-full bg-blush-600" /> : null}
          </span>
          <span className="flex-1">
            <span className="text-[13px] font-semibold text-plum">One-time purchase</span>
            <span className="mt-0.5 block text-[10.5px] text-plum/50">Try it once, no commitment</span>
          </span>
          <span className="shrink-0 text-[14px] font-bold text-plum">{formatPrice(product.price)}</span>
        </button>
      </div>

      <div className="mt-4 flex items-stretch gap-2.5">
        <div className="flex shrink-0 items-center rounded-full border border-plum/15 bg-white/60">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="grid h-12 w-11 place-items-center rounded-full text-plum/60 transition hover:text-plum disabled:opacity-30"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="min-w-5 text-center text-[13px] font-semibold text-plum" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(10, value + 1))}
            disabled={quantity >= 10}
            aria-label="Increase quantity"
            className="grid h-12 w-11 place-items-center rounded-full text-plum/60 transition hover:text-plum disabled:opacity-30"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <button type="button" onClick={handleAdd} className="btn-primary flex-1 py-3.5">
          <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
          Add to bag · {formatPrice(total)}
        </button>
      </div>

      {compareAt && compareAt > unitPrice ? (
        <p className="mt-2 text-center text-[10.5px] font-semibold text-blush-700">
          You&apos;re saving {formatPrice((compareAt - unitPrice) * quantity)} today
        </p>
      ) : null}

      <div className="mt-5 grid gap-2 rounded-2xl border border-plum/[0.08] bg-white/45 p-3.5 sm:grid-cols-3">
        {[
          { icon: Truck, label: "Free shipping over $65" },
          { icon: RotateCcw, label: "90-day money back" },
          { icon: ShieldCheck, label: "3rd-party tested" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-[10px] font-medium leading-tight text-plum/55">
            <Icon className="h-3.5 w-3.5 shrink-0 text-blush-600" strokeWidth={1.6} />
            {label}
          </div>
        ))}
      </div>

      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.14em] text-plum/35">
        Usually ships within 24 hours · carbon-neutral delivery
      </p>
    </div>
  );
}
