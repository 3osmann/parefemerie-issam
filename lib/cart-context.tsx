"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { FREE_SHIPPING_THRESHOLD } from "./data";
import type { CartLine, CartPurchaseType, Product } from "./types";

const STORAGE_KEY = "nutriiva:bag:v1";

type Toast = { id: number; message: string; action?: string };

type CartContextValue = {
  items: CartLine[];
  count: number;
  subtotal: number;
  freeShippingRemaining: number;
  isOpen: boolean;
  hydrated: boolean;
  openCart: () => void;
  closeCart: () => void;
  addProduct: (product: Product, options?: { quantity?: number; purchaseType?: CartPurchaseType }) => void;
  addLine: (line: Omit<CartLine, "key"> & { key?: string }) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  toast: Toast | null;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line): line is CartLine =>
        Boolean(line) && typeof line.key === "string" && typeof line.price === "number",
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setItems(readStoredCart());
    setHydrated(true);
  }, []);

  // Persist locally for instant, auth-free bag persistence.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage can be unavailable in private mode */
    }

    // Best-effort mirror to the Neon-backed cart API. The UI never waits on it.
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((line) => ({
            productId: line.productId,
            quantity: line.quantity,
            purchaseType: line.purchaseType,
          })),
        }),
      }).catch(() => undefined);
    }, 700);
  }, [items, hydrated]);

  const notify = useCallback((message: string, action?: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    const id = Date.now();
    setToast({ id, message, action });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      if (syncTimer.current) clearTimeout(syncTimer.current);
    };
  }, []);

  const addLine = useCallback(
    (line: Omit<CartLine, "key"> & { key?: string }) => {
      const key = line.key ?? `${line.productId}:${line.purchaseType}`;
      setItems((current) => {
        const existing = current.find((item) => item.key === key);
        if (existing) {
          return current.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + line.quantity } : item,
          );
        }
        return [...current, { ...line, key }];
      });
      notify(`${line.name} added to your bag`);
    },
    [notify],
  );

  const addProduct = useCallback<CartContextValue["addProduct"]>(
    (product, options) => {
      const purchaseType = options?.purchaseType ?? "one_time";
      const quantity = options?.quantity ?? 1;
      addLine({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        flavor: product.flavor,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        quantity,
        purchaseType,
        accentFrom: product.accentFrom,
        accentTo: product.accentTo,
        lidColor: product.lidColor,
        labelColor: product.labelColor,
        artVariant: product.artVariant,
        isBundle: product.isBundle,
      });
    },
    [addLine],
  );

  const removeItem = useCallback((key: string) => {
    setItems((current) => current.filter((item) => item.key !== key));
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.key !== key)
        : current.map((item) => (item.key === key ? { ...item, quantity } : item)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const count = useMemo(() => items.reduce((total, line) => total + line.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((total, line) => total + line.price * line.quantity, 0),
    [items],
  );
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count,
      subtotal,
      freeShippingRemaining,
      isOpen,
      hydrated,
      openCart,
      closeCart,
      addProduct,
      addLine,
      removeItem,
      updateQuantity,
      clearCart,
      toast,
    }),
    [
      items,
      count,
      subtotal,
      freeShippingRemaining,
      isOpen,
      hydrated,
      openCart,
      closeCart,
      addProduct,
      addLine,
      removeItem,
      updateQuantity,
      clearCart,
      toast,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
