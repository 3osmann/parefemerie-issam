"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Leaf,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Zap,
} from "lucide-react";
import { ProductArt } from "@/components/product/ProductArt";
import { Stars } from "@/components/ui/Stars";
import { useCart } from "@/lib/cart-context";
import { products, quizQuestions } from "@/lib/data";
import type { Product, ProductCategory } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

const optionIcons = [Zap, Leaf, Sparkles, Heart];

function pickProduct(category: ProductCategory, exclude?: string) {
  return (
    products.find((product) => product.category === category && product.id !== exclude && product.isBestseller) ??
    products.find((product) => product.category === category && product.id !== exclude) ??
    products.find((product) => product.id !== exclude) ??
    products[0]
  );
}

export default function QuizPage() {
  const { addProduct, openCart } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ProductCategory[]>([]);
  const [complete, setComplete] = useState(false);

  const totalSteps = quizQuestions.length;
  const progress = complete ? 100 : Math.round((step / totalSteps) * 100);

  const match = useMemo<Product | null>(() => {
    if (!complete || answers.length === 0) return null;
    return pickProduct(answers[0]);
  }, [answers, complete]);

  const companion = useMemo<Product | null>(() => {
    if (!match) return null;
    const second = answers[1];
    const candidate = second ? pickProduct(second, match.id) : undefined;
    return candidate && candidate.id !== match.id
      ? candidate
      : products.find((product) => product.id !== match.id && product.isBestseller) ?? null;
  }, [answers, match]);

  function choose(category: ProductCategory) {
    const nextAnswers = [...answers];
    nextAnswers[step] = category;
    setAnswers(nextAnswers);

    if (step + 1 >= totalSteps) {
      setComplete(true);
    } else {
      setStep(step + 1);
    }
  }

  function restart() {
    setStep(0);
    setAnswers([]);
    setComplete(false);
  }

  function addRitual() {
    const items = [match, companion].filter((item): item is Product => Boolean(item));
    items.forEach((item) => addProduct(item));
    openCart();
  }

  const current = quizQuestions[step];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-100/70 via-blush-50/40 to-cream py-10 sm:py-14 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full border border-blush-300/50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blush-200/40 blur-[100px]"
      />

      <div className="container-x relative">
        <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
          {/* ------------------------------ Left rail ----------------------------- */}
          <div className="lg:pt-4">
            <Link href="/" className="inline-flex items-center gap-1.5 text-[10.5px] text-plum/45 hover:text-plum">
              <ArrowLeft className="h-3 w-3" /> Back to Nutriiva
            </Link>
            <p className="eyebrow mt-6">
              <Sparkles className="h-3 w-3" /> The ritual finder
            </p>
            <h1 className="mt-4 text-balance font-display text-[40px] font-semibold leading-[0.96] tracking-[-0.04em] text-plum sm:text-[48px]">
              Three questions.
              <br />
              <span className="font-normal italic text-blush-600">One ritual that fits.</span>
            </h1>
            <p className="mt-4 max-w-sm text-[12.5px] leading-relaxed text-plum/60">
              Tell us what you want to change and how much time you&apos;ll give it. We&apos;ll do the matching — no email,
              no account, no guesswork.
            </p>

            <div className="mt-7 max-w-sm rounded-[24px] border border-white/70 bg-white/50 p-4 backdrop-blur">
              <div className="flex items-center justify-between text-[9.5px] font-bold uppercase tracking-[0.16em] text-plum/40">
                <span>{complete ? "Your match is ready" : `Question ${step + 1} of ${totalSteps}`}</span>
                <span>{progress}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-plum/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blush-400 to-blush-600 transition-all duration-500"
                  style={{ width: `${Math.max(progress, 4)}%` }}
                />
              </div>
              <div className="mt-4 flex items-center gap-2.5">
                <span className="flex -space-x-2">
                  {["photo-1494790108377-be9c29b29330", "photo-1534528741775-53994a69daeb", "photo-1524504388940-b1c1722653e1"].map(
                    (id) => (
                      <span
                        key={id}
                        className="h-7 w-7 overflow-hidden rounded-full border-2 border-white bg-blush-100"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=80&q=70`}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </span>
                    ),
                  )}
                </span>
                <p className="text-[10px] leading-tight text-plum/45">
                  <span className="font-bold text-plum">10,000+</span> women have found their match
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[9.5px] uppercase tracking-[0.14em] text-plum/40">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-blush-600" /> 90-day guarantee
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Leaf className="h-3.5 w-3.5 text-blush-600" /> No email needed
              </span>
            </div>
          </div>

          {/* ------------------------------ Quiz card ----------------------------- */}
          <div className="relative">
            {!complete && current ? (
              <div
                key={current.id}
                className="animate-rise-in rounded-[30px] border border-white/70 bg-white/65 p-5 shadow-card backdrop-blur-sm sm:p-7 lg:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-blush-100 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-blush-700">
                    {current.eyebrow}
                  </span>
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-plum/40 transition hover:text-plum"
                    >
                      <ArrowLeft className="h-3 w-3" /> Back
                    </button>
                  ) : null}
                </div>

                <h2 className="mt-5 max-w-lg text-balance font-display text-[28px] font-semibold leading-[1.05] tracking-[-0.03em] text-plum sm:text-[34px]">
                  {current.question}
                </h2>

                <div className="mt-6 grid gap-2.5">
                  {current.options.map((option, index) => {
                    const Icon = optionIcons[index] ?? Sparkles;
                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => choose(option.category)}
                        className="group flex w-full items-center gap-3.5 rounded-2xl border border-plum/10 bg-white/55 p-3.5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-blush-400 hover:bg-blush-50 hover:shadow-soft sm:p-4"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blush-50 text-blush-700 transition-colors group-hover:bg-plum group-hover:text-cream">
                          <Icon className="h-4 w-4" strokeWidth={1.6} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13px] font-semibold text-plum">{option.label}</span>
                          <span className="mt-0.5 block text-[10.5px] leading-snug text-plum/50">
                            {option.description}
                          </span>
                        </span>
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-plum/12 text-plum/25 transition-all group-hover:border-plum group-hover:bg-plum group-hover:text-cream">
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="mt-5 text-center text-[9.5px] uppercase tracking-[0.14em] text-plum/30">
                  No wrong answers · takes under 60 seconds
                </p>
              </div>
            ) : match ? (
              <div className="animate-rise-in overflow-hidden rounded-[30px] border border-white/70 bg-white/70 shadow-card backdrop-blur-sm">
                <div className="flex items-center justify-between gap-2 border-b border-plum/[0.08] bg-blush-50/70 px-5 py-3.5 sm:px-7">
                  <span className="inline-flex items-center gap-2 text-[9.5px] font-bold uppercase tracking-[0.16em] text-blush-700">
                    <Check className="h-3.5 w-3.5" /> Your ritual is ready
                  </span>
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-plum/40 transition hover:text-plum"
                  >
                    <RotateCcw className="h-3 w-3" /> Retake
                  </button>
                </div>

                <div className="p-5 sm:p-7">
                  <h2 className="font-display text-[28px] font-semibold leading-[1.02] tracking-[-0.03em] text-plum sm:text-[34px]">
                    Meet your match,{" "}
                    <span className="font-normal italic text-blush-600">{match.subtitle.toLowerCase()}.</span>
                  </h2>
                  <p className="mt-2 max-w-md text-[12px] leading-relaxed text-plum/55">
                    Based on your goals, routine and flavour energy, this is the duo we&apos;d start you on for the next
                    90 days.
                  </p>

                  <div className="mt-5 space-y-2.5">
                    {[match, companion].filter((item): item is Product => Boolean(item)).map((item, index) => (
                      <div
                        key={item.id}
                        className={cn(
                          "flex items-center gap-3.5 rounded-2xl border p-3",
                          index === 0 ? "border-blush-300 bg-blush-50/80" : "border-plum/10 bg-white/50",
                        )}
                      >
                        <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-white/70">
                          <ProductArt product={item} decoration={false} className="scale-110" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[8.5px] font-bold uppercase tracking-[0.14em] text-blush-700">
                            {index === 0 ? "Your hero formula" : "The perfect pairing"}
                          </p>
                          <p className="mt-0.5 truncate font-display text-[16px] font-semibold text-plum">{item.name}</p>
                          <p className="text-[10.5px] text-plum/45">
                            {item.flavor} · {item.subtitle}
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-[12px] font-bold text-plum">{formatPrice(item.price)}</span>
                            <Stars rating={item.rating} starClassName="h-2.5 w-2.5" />
                          </div>
                        </div>
                        <Link
                          href={`/product/${item.slug}`}
                          aria-label={`View ${item.name}`}
                          className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-plum/15 text-plum/50 transition hover:border-plum hover:bg-plum hover:text-cream"
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <button type="button" onClick={addRitual} className="btn-primary flex-1 py-3.5">
                      <ShoppingBag className="h-4 w-4" /> Add my ritual ·{" "}
                      {formatPrice([match, companion].filter((item): item is Product => Boolean(item)).reduce((sum, item) => sum + item.price, 0))}
                    </button>
                    <Link href="/#bundle" className="btn-outline py-3.5">
                      Bundle &amp; save 30%
                    </Link>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-plum/[0.08] pt-3 text-[9.5px] uppercase tracking-[0.12em] text-plum/35">
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-blush-600" /> 90-day glow guarantee
                    </span>
                    <span>Free shipping over $65</span>
                  </div>
                </div>
              </div>
            ) : null}

            {complete ? (
              <div className="mt-4 text-center">
                <Link href="/shop-all" className="text-[10.5px] font-semibold text-plum/45 underline-offset-4 hover:underline">
                  Or browse everything yourself
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
