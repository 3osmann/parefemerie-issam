"use client";

import { useEffect, useState } from "react";
import { featuredProducts, findProduct } from "./data";

const KEY = "nutriiva:recently-viewed";
const EVENT = "nutriiva:recently-viewed";

function readSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : [];
  } catch {
    return [];
  }
}

export function markRecentlyViewed(slug: string) {
  if (typeof window === "undefined") return;
  const next = [slug, ...readSlugs().filter((item) => item !== slug)].slice(0, 8);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
  } catch {
    /* ignore */
  }
}

export function useRecentlyViewed(limit = 6) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSlugs(readSlugs());
    setReady(true);

    const onUpdate = (event: Event) => {
      const detail = (event as CustomEvent<string[]>).detail;
      if (Array.isArray(detail)) setSlugs(detail);
    };
    window.addEventListener(EVENT, onUpdate);
    return () => window.removeEventListener(EVENT, onUpdate);
  }, []);

  const history = slugs
    .map((slug) => findProduct(slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product))
    .slice(0, limit);

  return {
    ready,
    hasHistory: history.length > 0,
    products: history.length > 0 ? history : featuredProducts.slice(0, 4),
  };
}
