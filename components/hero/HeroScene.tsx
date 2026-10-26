"use client";

import dynamic from "next/dynamic";
import { findProduct } from "@/lib/data";
import { ProductArt } from "@/components/product/ProductArt";

const JarScene = dynamic(() => import("./JarScene"), {
  ssr: false,
  loading: () => {
    const product = findProduct("metaglow-fat-burn");
    return (
      <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
        {product ? (
          <div className="h-[78%] w-[52%] animate-pulse opacity-60">
            <ProductArt product={product} decoration={false} />
          </div>
        ) : null}
      </div>
    );
  },
});

export function HeroScene() {
  return (
    <div className="h-full w-full">
      <JarScene />
    </div>
  );
}
