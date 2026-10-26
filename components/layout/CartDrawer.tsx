"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { ProductArt } from "@/components/product/ProductArt";
import { Portal } from "@/components/ui/Portal";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/data";
import { useBodyLock, useEscape } from "@/lib/hooks";
import { cn, formatPrice } from "@/lib/utils";

type OrderResponse = {
  number: string;
  email: string;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
};

export function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    freeShippingRemaining,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    addProduct,
    clearCart,
  } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderResponse | null>(null);

  useBodyLock(isOpen);
  useEscape(isOpen, () => handleClose());

  function handleClose() {
    closeCart();
    window.setTimeout(() => {
      setCheckoutOpen(false);
      setEmail("");
      setError(null);
      setOrder(null);
      setLoading(false);
    }, 350);
  }

  const upsell = products.find((product) => !items.some((line) => line.slug === product.slug));
  const shippingProgress = Math.min(100, (subtotal / 6500) * 100);
  const savings = items.reduce(
    (total, line) => total + (line.compareAtPrice ? (line.compareAtPrice - line.price) * line.quantity : 0),
    0,
  );

  async function handleCheckout(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          items: items.map((line) => ({
            productId: line.productId,
            name: line.name,
            price: line.price,
            quantity: line.quantity,
          })),
          isSubscription: items.some((line) => line.purchaseType === "subscription"),
        }),
      });
      const data = (await response.json()) as { order?: OrderResponse; error?: string };
      if (!response.ok || !data.order) throw new Error(data.error ?? "Checkout failed");
      setOrder(data.order);
      setCheckoutOpen(false);
      clearCart();
    } catch (checkoutError) {
      setError((checkoutError as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-[100]">
        <button
          type="button"
          aria-label="Close bag"
          onClick={handleClose}
          className="absolute inset-0 animate-fade-in bg-plum/40 backdrop-blur-[3px]"
        />

        <aside
          aria-label="Shopping bag"
          className="absolute right-0 top-0 flex h-full w-full max-w-[460px] animate-drawer-in flex-col bg-cream shadow-2xl"
        >
          <header className="flex shrink-0 items-center justify-between border-b border-plum/10 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="h-[18px] w-[18px] text-plum" strokeWidth={1.5} />
              <h2 className="font-display text-xl text-plum">
                Your bag <span className="text-sm text-plum/40">({count})</span>
              </h2>
            </div>
            <button type="button" onClick={handleClose} className="icon-btn" aria-label="Close bag">
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </header>

          {order ? (
            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-sage">
                <CheckCircle2 className="h-8 w-8 text-[#527a4b]" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-display text-3xl leading-tight text-plum">You&apos;re glowing already.</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-plum/60">
                Order <span className="font-semibold text-plum">{order.number}</span> is confirmed. A receipt is on its
                way to {order.email}.
              </p>
              <div className="mt-6 w-full space-y-2 rounded-2xl border border-plum/10 bg-white/60 p-4 text-left text-[13px]">
                <div className="flex justify-between text-plum/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-plum/60">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-plum/10 pt-2 font-semibold text-plum">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="btn-plum mt-6 w-full"
              >
                Keep browsing <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-4 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-plum/35">
                <ShieldCheck className="h-3 w-3" /> 90-day glow guarantee
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-blush-100">
                <ShoppingBag className="h-8 w-8 text-blush-600" strokeWidth={1.25} />
              </span>
              <h3 className="mt-5 font-display text-2xl text-plum">Your bag is feeling light</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-plum/55">
                Let&apos;s fix that. Our bestsellers are a very good place to start.
              </p>
              <Link href="/shop-all" onClick={handleClose} className="btn-primary mt-6">
                Shop the bestsellers <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-10 w-full rounded-3xl bg-blush-50 p-5 text-left">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-plum/45">New here?</p>
                <p className="mt-1.5 font-display text-xl text-plum">Take the 60-second quiz.</p>
                <p className="mt-1 text-[12px] leading-relaxed text-plum/55">
                  We&apos;ll match you to a ritual built around your goals.
                </p>
                <Link
                  href="/quiz"
                  onClick={handleClose}
                  className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-blush-700"
                >
                  Find my match <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="shrink-0 border-b border-plum/[0.07] px-5 py-3.5 sm:px-6">
                <p className="text-[11px] font-medium text-plum/60">
                  {freeShippingRemaining > 0 ? (
                    <>
                      You&apos;re <span className="font-bold text-blush-700">{formatPrice(freeShippingRemaining)}</span>{" "}
                      away from free shipping
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 font-semibold text-[#527a4b]">
                      <Check className="h-3.5 w-3.5" /> Free shipping unlocked
                    </span>
                  )}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-plum/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blush-400 to-blush-600 transition-all duration-500"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
                <ul className="divide-y divide-plum/[0.07]">
                  {items.map((line) => (
                    <li key={line.key} className="flex gap-3.5 py-4 first:pt-1">
                      <div className="relative h-[92px] w-[72px] shrink-0 overflow-hidden rounded-2xl bg-blush-50">
                        <ProductArt product={line} decoration={false} className="scale-110" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-[13px] font-semibold text-plum">{line.name}</p>
                            <p className="mt-0.5 text-[11px] text-plum/45">{line.flavor}</p>
                            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-blush-700">
                              {line.purchaseType === "subscription" ? "Subscribe · save 15%" : "One-time"}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(line.key)}
                            aria-label={`Remove ${line.name}`}
                            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-plum/35 transition hover:bg-plum/5 hover:text-plum"
                          >
                            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                          </button>
                        </div>

                        <div className="mt-auto flex items-end justify-between pt-2">
                          <div className="flex items-center rounded-full border border-plum/15">
                            <button
                              type="button"
                              onClick={() => updateQuantity(line.key, line.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="grid h-7 w-7 place-items-center rounded-full text-plum/60 transition hover:text-plum"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-4 text-center text-[12px] font-semibold text-plum">{line.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(line.key, line.quantity + 1)}
                              aria-label="Increase quantity"
                              className="grid h-7 w-7 place-items-center rounded-full text-plum/60 transition hover:text-plum"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-[13px] font-semibold text-plum">{formatPrice(line.price * line.quantity)}</p>
                            {line.compareAtPrice ? (
                              <p className="text-[10px] text-plum/35 line-through">
                                {formatPrice(line.compareAtPrice * line.quantity)}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {upsell ? (
                  <div className="mt-3 rounded-2xl border border-dashed border-blush-300 bg-blush-50/70 p-3.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-plum/45">
                      Pairs beautifully with
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="h-14 w-12 shrink-0 overflow-hidden rounded-xl bg-white/70">
                        <ProductArt product={upsell} decoration={false} className="scale-110" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12px] font-semibold text-plum">{upsell.name}</p>
                        <p className="text-[11px] text-plum/45">{formatPrice(upsell.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => addProduct(upsell)}
                        className="rounded-full bg-plum px-3 py-1.5 text-[11px] font-semibold text-cream transition hover:bg-plum-deep"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ) : null}

                <div className="mt-4 flex items-center gap-2 rounded-2xl bg-sage/60 px-3.5 py-3 text-[11px] leading-relaxed text-[#476b41]">
                  <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  <span>90-day money-back guarantee. Even on empty jars.</span>
                </div>
              </div>

              <footer className="shrink-0 border-t border-plum/10 bg-cream px-5 pb-5 pt-4 sm:px-6">
                {savings > 0 ? (
                  <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-blush-700">
                    <span>You&apos;re saving</span>
                    <span>{formatPrice(savings)}</span>
                  </div>
                ) : null}
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-plum/60">Subtotal</span>
                  <span className="font-semibold text-plum">{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-1 text-[10.5px] text-plum/40">Taxes and shipping calculated at checkout.</p>

                {!checkoutOpen ? (
                  <button type="button" onClick={() => setCheckoutOpen(true)} className="btn-primary mt-3 w-full py-4">
                    Checkout · {formatPrice(subtotal)} <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <form onSubmit={handleCheckout} className="mt-3 space-y-2 animate-rise-in">
                    <label className="block text-[11px] font-semibold text-plum/60" htmlFor="checkout-email">
                      Email for your receipt
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="input-pill !py-3"
                    />
                    {error ? <p className="text-[11px] font-medium text-blush-700">{error}</p> : null}
                    <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-3.5 w-3.5" />}
                      {loading ? "Securing your order…" : `Pay ${formatPrice(subtotal)}`}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutOpen(false)}
                      className="w-full py-1 text-[11px] font-medium text-plum/45 hover:text-plum"
                    >
                      Back to bag
                    </button>
                  </form>
                )}

                <div className="mt-3 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.14em] text-plum/35">
                  <Lock className="h-3 w-3" /> Secure checkout
                  <span className={cn("mx-1 h-1 w-1 rounded-full bg-plum/20")} />
                  Free returns
                </div>
              </footer>
            </>
          )}
        </aside>
      </div>
    </Portal>
  );
}
