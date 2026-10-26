"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Plus, ShoppingBag } from "lucide-react";
import { ProductArt } from "@/components/product/ProductArt";
import { Stars } from "@/components/ui/Stars";
import { useCart } from "@/lib/cart-context";
import { markRecentlyViewed } from "@/lib/use-recently-viewed";
import type { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

export function ProductCard({
  product,
  priority = false,
  compact = false,
}: {
  product: Product;
  priority?: boolean;
  compact?: boolean;
}) {
  const { addProduct } = useCart();
  const [saved, setSaved] = useState(false);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-plum/[0.09] bg-white/75 transition-all duration-500 hover:-translate-y-1 hover:border-blush-300/60 hover:shadow-card">
      <div className="relative overflow-hidden">
        <div
          className="relative flex items-center justify-center overflow-hidden px-4 pb-2 pt-6"
          style={{ background: `linear-gradient(150deg, ${product.accentFrom}30 0%, #FFF9F6 65%, #FFFFFF 100%)` }}
        >
          <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
            {product.badge ? (
              <span className="rounded-full bg-blush-600 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-cream shadow-sm">
                {product.badge}
              </span>
            ) : null}
            {product.isBestseller ? (
              <span className="rounded-full bg-plum px-2.5 py-1 text-[8.5px] font-bold uppercase tracking-[0.14em] text-cream">
                Bestseller
              </span>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setSaved((value) => !value)}
            aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            aria-pressed={saved}
            className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full border border-plum/10 bg-white/70 text-plum/50 backdrop-blur transition hover:border-blush-400 hover:text-blush-600"
          >
            <Heart className={cn("h-3.5 w-3.5", saved && "fill-blush-600 text-blush-600")} strokeWidth={1.5} />
          </button>

          <Link
            href={`/product/${product.slug}`}
            onClick={() => markRecentlyViewed(product.slug)}
            className={cn(
              "block w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]",
              compact ? "aspect-[1/1] max-w-[190px]" : "aspect-[4/5] max-w-[230px]",
            )}
          >
            <ProductArt product={product} />
          </Link>

          <button
            type="button"
            onClick={() => addProduct(product)}
            aria-label={`Add ${product.name} to bag`}
            className="absolute bottom-3 right-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-plum text-cream shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blush-600"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/80 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-4 pt-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-blush-700">
            {product.categoryLabel}
          </span>
          <Stars rating={product.rating} starClassName="h-2.5 w-2.5" />
        </div>

        <h3 className="mt-1.5">
          <Link
            href={`/product/${product.slug}`}
            onClick={() => markRecentlyViewed(product.slug)}
            className="font-display text-[19px] font-semibold leading-tight tracking-[-0.02em] text-plum transition-colors hover:text-blush-700"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-0.5 text-[11px] text-plum/50">
          {product.subtitle} · {product.flavor}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[15px] font-bold text-plum">{formatPrice(product.price)}</span>
            {product.compareAtPrice ? (
              <span className="text-[11px] text-plum/35 line-through">{formatPrice(product.compareAtPrice)}</span>
            ) : null}
          </div>
          <span className="text-[9.5px] font-medium text-plum/40">
            {product.reviewCount.toLocaleString("en-US")} reviews
          </span>
        </div>

        <button
          type="button"
          onClick={() => addProduct(product)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-plum/15 bg-transparent py-2.5 text-[11.5px] font-semibold text-plum transition-all duration-300 hover:border-plum hover:bg-plum hover:text-cream"
        >
          <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.6} />
          Add to bag · {formatPrice(product.price)}
        </button>
      </div>
    </article>
  );
}
