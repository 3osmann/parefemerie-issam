"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { useRecentlyViewed } from "@/lib/use-recently-viewed";

export function RecentlyViewed() {
  const { products, hasHistory } = useRecentlyViewed(6);
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.max(280, track.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-cream py-14 sm:py-16 lg:py-20" aria-labelledby="recently-viewed-heading">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">
                <Clock3 className="h-3 w-3" strokeWidth={1.75} />
                {hasHistory ? "Pick up where you left off" : "A good place to start"}
              </p>
              <h2
                id="recently-viewed-heading"
                className="mt-3 font-display text-[28px] font-semibold leading-tight tracking-[-0.03em] text-plum sm:text-[34px]"
              >
                {hasHistory ? (
                  <>
                    Recently viewed,{" "}
                    <span className="font-normal italic text-blush-600">still thinking about?</span>
                  </>
                ) : (
                  <>
                    Your ritual,{" "}
                    <span className="font-normal italic text-blush-600">picked for you.</span>
                  </>
                )}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll(-1)}
                className="grid h-9 w-9 place-items-center rounded-full border border-plum/15 text-plum/60 transition hover:border-plum hover:bg-plum hover:text-cream"
                aria-label="Scroll recently viewed products left"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                className="grid h-9 w-9 place-items-center rounded-full border border-plum/15 text-plum/60 transition hover:border-plum hover:bg-plum hover:text-cream"
                aria-label="Scroll recently viewed products right"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            ref={trackRef}
            className="hide-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:gap-4"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="w-[72%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] xl:w-[23.5%]"
              >
                <ProductCard product={product} compact />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-5 text-center">
            <Link
              href="/shop-all"
              className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-blush-700 underline-offset-4 hover:underline"
            >
              Browse the full collection
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
