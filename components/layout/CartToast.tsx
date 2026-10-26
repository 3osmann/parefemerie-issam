"use client";

import { Check } from "lucide-react";
import { Portal } from "@/components/ui/Portal";
import { useCart } from "@/lib/cart-context";

export function CartToast() {
  const { toast, openCart } = useCart();
  if (!toast) return null;

  return (
    <Portal>
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[110] flex justify-center px-4">
        <div
          key={toast.id}
          className="pointer-events-auto flex w-full max-w-sm animate-toast-in items-center gap-3 rounded-2xl border border-white/10 bg-plum px-4 py-3 text-cream shadow-2xl"
          role="status"
          aria-live="polite"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blush-100/15">
            <Check className="h-4 w-4 text-blush-200" strokeWidth={2} />
          </span>
          <p className="min-w-0 flex-1 text-[12.5px] font-medium leading-snug">{toast.message}</p>
          <button
            type="button"
            onClick={openCart}
            className="shrink-0 rounded-full bg-cream/10 px-3 py-1.5 text-[11px] font-semibold text-cream transition hover:bg-cream/20"
          >
            View bag
          </button>
        </div>
      </div>
    </Portal>
  );
}
