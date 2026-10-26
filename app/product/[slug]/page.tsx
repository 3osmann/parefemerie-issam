import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  FlaskConical,
  Leaf,
  Sparkles,
  Star,
} from "lucide-react";
import { ProductArt } from "@/components/product/ProductArt";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Stars } from "@/components/ui/Stars";
import { getProductBySlug, getProducts, getReviews } from "@/lib/queries";
import { products } from "@/lib/data";
import { discountPercent, formatPrice } from "@/lib/utils";

export const revalidate = 300;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} — ${product.subtitle}`,
    description: product.description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.name} · Nutriiva`,
      description: product.description,
      type: "website",
    },
  };
}

const trustPoints = [
  { icon: FlaskConical, label: "Clinically dosed" },
  { icon: Leaf, label: "Vegan & dye-free" },
  { icon: BadgeCheck, label: "Third-party tested" },
];

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [categoryProducts, allReviews] = await Promise.all([
    getProducts({ category: product.category, limit: 4 }),
    getReviews(12),
  ]);

  const related = [
    ...categoryProducts.filter((item) => item.id !== product.id),
    ...(await getProducts({ limit: 9 })),
  ]
    .filter((item, index, list) => item.id !== product.id && list.findIndex((entry) => entry.id === item.id) === index)
    .slice(0, 4);

  const reviews = allReviews.filter((review) => review.productSlug === product.slug).slice(0, 3);
  const shownReviews = reviews.length > 0 ? reviews : allReviews.slice(0, 3);
  const savings = discountPercent(product.price, product.compareAtPrice);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "Nutriiva" },
    category: product.categoryLabel,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: (product.price / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/product/${product.slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <section className="relative overflow-hidden bg-blush-50/60 pb-12 pt-5 sm:pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-blush-200/40 blur-[110px]"
        />
        <div className="container-x relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[10.5px] text-plum/40">
            <Link href="/shop-all" className="inline-flex items-center gap-1 transition hover:text-plum">
              <ArrowLeft className="h-3 w-3" /> Shop all
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href={`/shop-all?category=${encodeURIComponent(product.categoryLabel)}`}
              className="transition hover:text-plum"
            >
              {product.categoryLabel}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate text-plum/65">{product.name}</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
            {/* ------------------------------ Visual ------------------------------ */}
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <div
                  className="relative overflow-hidden rounded-[32px] border border-plum/[0.07]"
                  style={{
                    background: `radial-gradient(120% 100% at 50% 0%, ${product.accentFrom}55 0%, #FFF7F2 55%, #FFFFFF 100%)`,
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-8 rounded-[26px] border border-white/50"
                  />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-16 rounded-full border border-plum/[0.06]" />
                  <div className="pointer-events-none absolute left-4 top-4 z-10 flex flex-col items-start gap-1.5">
                    {product.badge ? (
                      <span className="rounded-full bg-blush-600 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-cream shadow-sm">
                        {product.badge}
                      </span>
                    ) : null}
                    {savings > 0 ? (
                      <span className="rounded-full bg-white/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-plum backdrop-blur">
                        Save {savings}%
                      </span>
                    ) : null}
                  </div>

                  <div className="relative aspect-[4/4.3] w-full px-8 py-10 sm:px-16 sm:py-14">
                    <div className="absolute inset-x-10 bottom-10 h-10 rounded-[50%] bg-plum/10 blur-xl" />
                    <ProductArt product={product} className="relative drop-shadow-[0_30px_30px_rgba(74,21,37,0.14)]" />
                  </div>

                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2 rounded-2xl border border-white/60 bg-white/65 px-4 py-2.5 backdrop-blur">
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-plum/50">
                      <Sparkles className="h-3 w-3 text-blush-600" /> {product.flavor}
                    </span>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-plum/40">
                      30 servings · 1 scoop daily
                    </span>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {trustPoints.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1.5 rounded-2xl border border-plum/[0.07] bg-white/55 px-2 py-3 text-center"
                    >
                      <Icon className="h-4 w-4 text-blush-600" strokeWidth={1.5} />
                      <span className="text-[9px] font-semibold uppercase leading-tight tracking-[0.08em] text-plum/50">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ------------------------------ Details ----------------------------- */}
            <Reveal delay={0.08}>
              <ProductPurchasePanel product={product} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------- Story ------------------------------- */}
      <section className="bg-cream py-14 sm:py-16 lg:py-20">
        <div className="container-x">
          <div className="grid gap-4 lg:grid-cols-3">
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-[26px] border border-plum/[0.08] bg-white/60 p-5 sm:p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-blush-100 text-blush-700">
                  <Sparkles className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <h2 className="mt-4 font-display text-[22px] font-semibold leading-tight text-plum">Why it works</h2>
                <p className="mt-2 text-[12.5px] leading-relaxed text-plum/60">
                  {product.description}
                </p>
                <ul className="mt-4 space-y-2 border-t border-plum/[0.08] pt-4">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-[11.5px] text-plum/60">
                      <Star className="h-3 w-3 shrink-0 fill-blush-500 text-blush-500" /> {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.06} className="h-full">
              <div className="flex h-full flex-col rounded-[26px] border border-plum/[0.08] bg-white/60 p-5 sm:p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-sage text-[#527a4b]">
                  <Leaf className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <h2 className="mt-4 font-display text-[22px] font-semibold leading-tight text-plum">What&apos;s inside</h2>
                <p className="mt-2 text-[12.5px] leading-relaxed text-plum/60">
                  Nothing hidden behind a proprietary blend. Every gram earns its place.
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-plum/[0.08] pt-4">
                  {product.ingredients.map((ingredient) => (
                    <li
                      key={ingredient}
                      className="rounded-full border border-plum/10 bg-blush-50/70 px-2.5 py-1 text-[10px] font-medium text-plum/60"
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="h-full">
              <div className="flex h-full flex-col rounded-[26px] bg-plum p-5 text-cream sm:p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-blush-200">
                  <FlaskConical className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <h2 className="mt-4 font-display text-[22px] font-semibold leading-tight">How to take it</h2>
                <p className="mt-2 text-[12.5px] leading-relaxed text-cream/60">
                  One scoop, one glass of cold water, once a day. Morning with breakfast is our favourite — but consistency
                  beats timing.
                </p>
                <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-[11.5px] text-cream/60">
                  <p className="flex items-center gap-2">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-blush-300 text-[8px] font-bold text-plum">
                      1
                    </span>
                    Shake one scoop into 250ml water
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-blush-300 text-[8px] font-bold text-plum">
                      2
                    </span>
                    Drink within 10 minutes
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-blush-300 text-[8px] font-bold text-plum">
                      3
                    </span>
                    Stay consistent for 90 days
                  </p>
                </div>
                <p className="mt-auto pt-4 text-[9px] uppercase tracking-[0.14em] text-cream/30">
                  Consult your doctor if pregnant or nursing
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------- Reviews ------------------------------ */}
      <section id="reviews" className="scroll-mt-24 bg-[#FBF3EE] py-14 sm:py-16 lg:py-20">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">
                  <Sparkles className="h-3 w-3" /> Real reviews
                </p>
                <h2 className="mt-3 font-display text-[30px] font-semibold leading-tight tracking-[-0.03em] text-plum sm:text-[38px]">
                  What the ritual{" "}
                  <span className="font-normal italic text-blush-600">actually feels like.</span>
                </h2>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-plum/[0.08] bg-white/60 px-4 py-2.5">
                <span className="font-display text-[30px] font-semibold leading-none text-plum">
                  {product.rating.toFixed(1)}
                </span>
                <div>
                  <Stars rating={product.rating} starClassName="h-3 w-3" />
                  <p className="mt-1 text-[9.5px] uppercase tracking-[0.1em] text-plum/40">
                    {product.reviewCount.toLocaleString("en-US")} verified reviews
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <RevealGroup className="mt-7 grid gap-3 md:grid-cols-3">
            {shownReviews.map((review) => (
              <div key={review.id} data-reveal-item className="h-full">
                <article className="flex h-full flex-col rounded-[24px] border border-plum/[0.08] bg-white/70 p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <Stars rating={review.rating} starClassName="h-3 w-3" />
                    <span className="inline-flex items-center gap-1 text-[8.5px] font-semibold uppercase tracking-[0.1em] text-plum/40">
                      <BadgeCheck className="h-3 w-3 text-blush-600" /> Verified
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-[17px] font-semibold leading-tight text-plum">{review.title}</h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-plum/60">“{review.body}”</p>
                  <div className="mt-auto flex items-center gap-2.5 pt-5">
                    <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-blush-100">
                      <Image src={review.avatar} alt="" fill sizes="32px" className="object-cover" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold text-plum">{review.customer}</p>
                      <p className="text-[9.5px] text-plum/40">{review.location}</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ------------------------------- Related ------------------------------ */}
      <section className="bg-cream py-14 sm:py-16 lg:py-20">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">
                  <Sparkles className="h-3 w-3" /> Pairs beautifully with
                </p>
                <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight tracking-[-0.03em] text-plum sm:text-[34px]">
                  Build your{" "}
                  <span className="font-normal italic text-blush-600">full ritual.</span>
                </h2>
              </div>
              <Link
                href="/shop-all"
                className="group inline-flex items-center gap-2 text-[11.5px] font-semibold text-blush-700"
              >
                Shop all products
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>

          <RevealGroup className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {related.map((item) => (
              <div key={item.id} data-reveal-item className="h-full">
                <ProductCard product={item} compact />
              </div>
            ))}
          </RevealGroup>

          <Reveal delay={0.06}>
            <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-3xl bg-gradient-to-r from-plum to-[#641E35] px-6 py-5 text-cream sm:flex-row">
              <p className="text-[12.5px] text-cream/70">
                Buy any 3 and save up to{" "}
                <span className="font-semibold text-blush-200">30%</span> — mix flavours, one delivery.
              </p>
              <Link
                href="/#bundle"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cream px-4 py-2 text-[11.5px] font-semibold text-plum transition hover:bg-blush-100"
              >
                Build my bundle <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>

          <p className="mt-4 text-center text-[10px] text-plum/35">
            One-time price {formatPrice(product.price)}. Subscription price shown at checkout.
          </p>
        </div>
      </section>
    </>
  );
}
