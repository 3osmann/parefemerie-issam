import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { ProductArt } from "@/components/product/ProductArt";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page went off-ritual. Find your way back to the Nutriiva shop, journal or quiz.",
};

export default function NotFound() {
  const picks = products.filter((product) => product.isBestseller).slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-100/70 via-blush-50/50 to-cream py-16 sm:py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full border border-blush-300/40"
      />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <Sparkles className="h-3 w-3" /> Error 404
          </p>
          <h1 className="mt-4 text-balance font-display text-[54px] font-semibold leading-[0.92] tracking-[-0.05em] text-plum sm:text-[76px]">
            This page went{" "}
            <span className="font-normal italic text-blush-600">off-ritual.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-pretty text-[13.5px] leading-relaxed text-plum/60">
            The link may be old, the jar may be sold out, or a typo snuck in. Let&apos;s get you back to something that
            feels good.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            <Link href="/" className="btn-primary">
              Back to home <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/shop-all" className="btn-outline">
              <Search className="h-4 w-4" /> Shop all
            </Link>
          </div>
        </div>

        {picks.length > 0 ? (
          <div className="mx-auto mt-12 max-w-3xl">
            <p className="text-center text-[9.5px] font-bold uppercase tracking-[0.2em] text-plum/35">
              A few good places to land
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-4">
              {picks.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group rounded-[22px] border border-plum/[0.08] bg-white/60 p-3 text-center transition-all duration-500 hover:-translate-y-1 hover:border-blush-300 hover:shadow-card"
                >
                  <div className="mx-auto aspect-square w-full max-w-[120px]">
                    <ProductArt product={product} decoration={false} className="transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <p className="mt-1 truncate font-display text-[14px] font-semibold text-plum">{product.name}</p>
                  <p className="text-[10px] text-plum/45">{product.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
