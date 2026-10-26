"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { HeroScene } from "@/components/hero/HeroScene";
import { StoryTrigger } from "@/components/ui/StoryModal";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { images, reviews } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/utils";

function MeasuringTape() {
  const ticks = Array.from({ length: 61 }, (_, index) => index);

  return (
    <svg viewBox="0 0 620 54" className="h-auto w-full" aria-hidden="true">
      <defs>
        <clipPath id="tape-clip">
          <rect x="1" y="1" width="618" height="52" rx="9" />
        </clipPath>
        <linearGradient id="tape-fill" x1="0" y1="0" x2="620" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7B7C8" />
          <stop offset="0.5" stopColor="#F4A9C3" />
          <stop offset="1" stopColor="#EDA0B8" />
        </linearGradient>
      </defs>
      <g clipPath="url(#tape-clip)">
        <rect x="1" y="1" width="618" height="52" rx="9" fill="url(#tape-fill)" />
        <rect x="1" y="38" width="618" height="15" fill="#E88FAF" opacity="0.55" />
        {ticks.map((tick) => {
          const x = 10 + tick * 9.9;
          const isMajor = tick % 5 === 0;
          const isMid = tick % 2 === 0;
          return (
            <line
              key={tick}
              x1={x}
              y1={5}
              x2={x}
              y2={isMajor ? 26 : isMid ? 17 : 12}
              stroke="#6B1E35"
              strokeOpacity={isMajor ? 0.65 : 0.4}
              strokeWidth={isMajor ? 1.4 : 0.8}
            />
          );
        })}
        {ticks
          .filter((tick) => tick % 5 === 0)
          .map((tick) => (
            <text
              key={`label-${tick}`}
              x={10 + tick * 9.9}
              y={35}
              textAnchor="middle"
              fontFamily="Helvetica, Arial, sans-serif"
              fontSize="8.5"
              fontWeight="700"
              fill="#5C1F32"
              opacity="0.75"
            >
              {60 + tick}
            </text>
          ))}
        <text x="610" y="48" textAnchor="end" fontFamily="Helvetica, Arial, sans-serif" fontSize="7" fill="#5C1F32" opacity="0.6">
          CM
        </text>
      </g>
      <rect x="1" y="1" width="618" height="52" rx="9" fill="none" stroke="#E88FAF" strokeWidth="1.5" />
    </svg>
  );
}

function RotatingSeal() {
  return (
    <div className="relative grid h-[74px] w-[74px] place-items-center rounded-full border border-white/70 bg-cream/80 shadow-soft backdrop-blur sm:h-[90px] sm:w-[90px]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="hero-seal-path" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
        </defs>
        <text fontSize="8.2" letterSpacing="2.6" fill="#4A1525" opacity="0.72">
          <textPath href="#hero-seal-path" startOffset="0%">
            CLINICALLY TESTED · WOMEN OWNED ·
          </textPath>
        </text>
      </svg>
      <Sparkles className="h-5 w-5 text-blush-600 sm:h-6 sm:w-6" strokeWidth={1.25} />
    </div>
  );
}

const story = {
  name: reviews[0].customer,
  location: reviews[0].location,
  title: reviews[0].title,
  quote: reviews[0].body,
  poster: images.storyPoster,
  avatar: reviews[0].avatar,
  productName: "MetaGlow™ Fat Burn",
  productSlug: "metaglow-fat-burn",
  duration: "01:24",
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-hero-line]", { yPercent: 112 });
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .from("[data-hero-eyebrow]", { autoAlpha: 0, y: 16, duration: 0.7 })
        .to("[data-hero-line]", { yPercent: 0, duration: 1.05, stagger: 0.11, ease: "power4.out" }, "-=0.45")
        .from("[data-hero-visual]", { autoAlpha: 0, scale: 0.955, duration: 1.2, ease: "power2.out" }, "-=0.95")
        .from("[data-hero-copy]", { autoAlpha: 0, y: 18, duration: 0.8 }, "-=0.9")
        .from("[data-hero-cta]", { autoAlpha: 0, y: 18, duration: 0.8 }, "-=0.7")
        .from("[data-hero-chip]", { autoAlpha: 0, y: 20, duration: 0.7, stagger: 0.12 }, "-=0.6")
        .from("[data-hero-trust]", { autoAlpha: 0, y: 22, duration: 0.8 }, "-=0.6");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="hero-heading" className="relative overflow-hidden bg-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,#FCE4EC_0%,rgba(252,228,236,0.35)_36%,transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-blush-200/30 blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-[46%] h-40 w-40 rounded-full border border-blush-300/40"
      />

      <div className="container-x relative grid gap-8 pb-10 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-center lg:gap-4 lg:pb-14 lg:pt-14">
        {/* ------------------------------- Copy ------------------------------- */}
        <div className="relative z-10 max-w-2xl">
          <div
            data-hero-eyebrow
            className="inline-flex items-center gap-2.5 rounded-full border border-plum/10 bg-white/70 py-1.5 pl-2 pr-3.5 shadow-sm backdrop-blur"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-blush-600/10">
              <Star className="h-3 w-3 fill-blush-600 text-blush-600" />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-plum/70 sm:text-[10px]">
              The 30% bundle is live
            </span>
            <span className="h-1 w-1 rounded-full bg-plum/20" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blush-700 sm:text-[10px]">
              4.9 · 10k+ women
            </span>
          </div>

          <h1
            id="hero-heading"
            className="mt-6 text-[44px] font-semibold leading-[0.94] tracking-[-0.045em] text-plum sm:text-[60px] lg:text-[66px] xl:text-[76px]"
          >
            <span className="block overflow-hidden pb-1">
              <span data-hero-line className="block">
                Look better.
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span data-hero-line className="block">
                Feel stronger.
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span data-hero-line className="block font-normal italic text-blush-600">Save 30% now.</span>
            </span>
          </h1>

          <p
            data-hero-copy
            className="mt-6 max-w-md text-pretty text-[14.5px] leading-[1.65] text-plum/65 sm:text-[15.5px]"
          >
            Daily essentials for energy, glow, and a metabolism that keeps up with you. Clinically dosed, ridiculous
            flavours, formulated by women — for women.
          </p>

          <div data-hero-cta className="mt-7 flex flex-col items-start gap-3.5 sm:flex-row sm:items-center">
            <Link
              href="/#bundle"
              className="group inline-flex w-full items-center justify-between gap-4 rounded-full bg-blush-600 py-[7px] pl-6 pr-[7px] text-[13px] font-semibold text-cream shadow-pill transition-all duration-300 hover:-translate-y-0.5 hover:bg-blush-700 sm:w-auto"
            >
              <span>Buy 3 Bundle &amp; Save 30%</span>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-cream/15 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </span>
            </Link>
            <Link
              href="/quiz"
              className="group inline-flex items-center gap-1.5 px-1 text-[12px] font-semibold text-plum/65 underline-offset-4 transition hover:text-plum hover:underline"
            >
              Take the 60-second quiz
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-[10.5px] text-plum/50">
            <span className="rounded-full bg-plum px-2.5 py-1 text-[8.5px] font-bold uppercase tracking-[0.14em] text-cream">
              First 500 orders
            </span>
            <span>get a free 30-day Glow Guide + shaker</span>
          </div>

          <div className="mt-8 flex items-center gap-5">
            <div className="flex -space-x-2.5">
              {reviews.slice(0, 3).map((review) => (
                <span
                  key={review.id}
                  className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-cream bg-blush-200"
                >
                  <Image src={review.avatar} alt="" fill sizes="32px" className="object-cover" />
                </span>
              ))}
              <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-cream bg-plum text-[8px] font-bold text-cream">
                10k
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-blush-600">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-3 w-3 fill-current" strokeWidth={0} />
                ))}
                <span className="ml-1 text-[10.5px] font-bold text-plum">4.9</span>
              </div>
              <p className="text-[10px] text-plum/45">from 10,000+ verified reviews</p>
            </div>
          </div>
        </div>

        {/* ------------------------------ Visual ------------------------------ */}
        <div
          data-hero-visual
          className="relative mx-auto h-[440px] w-full max-w-[600px] sm:h-[540px] lg:h-[650px] lg:max-w-none"
        >
          <div
            aria-hidden="true"
            className="absolute right-0 top-[5%] h-[82%] w-[80%] rounded-[48%_52%_44%_56%/52%_44%_56%_48%] bg-gradient-to-br from-blush-200 via-blush-100 to-[#FFF3EE] sm:w-[74%]"
          />
          <div
            aria-hidden="true"
            className="absolute left-[4%] top-[8%] h-24 w-24 rounded-full border border-dashed border-blush-400/60 sm:h-32 sm:w-32"
          />
          <div
            aria-hidden="true"
            className="absolute -right-2 top-[12%] h-14 w-14 rounded-full bg-blush-300/30 blur-xl"
          />

          <figure className="absolute bottom-[7%] right-0 z-10 h-[75%] w-[62%] overflow-hidden rounded-t-[999px] rounded-b-[30px] border-[5px] border-cream bg-blush-200 shadow-card sm:w-[58%]">
            <Image
              src={images.hero}
              alt="Woman training with her Nutriiva ritual"
              fill
              priority
              sizes="(max-width: 1024px) 58vw, 34vw"
              className="object-cover object-[center_28%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum/65 via-plum/5 to-transparent" />
            <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/30 bg-cream/90 px-3 py-2.5 backdrop-blur-md">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold text-plum">Maya, 90 days in</p>
                <BadgeCheck className="h-3.5 w-3.5 text-blush-600" />
              </div>
              <p className="mt-0.5 text-[9.5px] leading-snug text-plum/55">Down 19 lbs · energy that lasts past 3pm</p>
            </figcaption>
          </figure>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[21%] left-0 z-20 w-[96%] -rotate-[13deg] drop-shadow-[0_14px_16px_rgba(74,21,37,0.16)] sm:w-[92%]"
          >
            <MeasuringTape />
          </div>

          <div className="absolute bottom-0 left-[-8%] z-30 h-[76%] w-[104%] sm:left-[-6%] sm:h-[78%] sm:w-[98%] lg:left-[-7%] lg:w-[100%]">
            <HeroScene />
          </div>

          <div
            data-hero-chip
            className="absolute left-0 top-[13%] z-40 flex -rotate-[5deg] items-center gap-2.5 rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2.5 shadow-soft backdrop-blur sm:left-[2%] sm:top-[16%]"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-blush-100">
              <Sparkles className="h-4 w-4 text-blush-600" strokeWidth={1.6} />
            </span>
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-plum/40">Bundle &amp; save</p>
              <p className="font-display text-[19px] font-semibold leading-none text-plum">30% off</p>
            </div>
          </div>

          <div data-hero-chip className="absolute right-[2%] top-0 z-40 sm:right-[6%] sm:top-[1%]">
            <RotatingSeal />
          </div>

          <div
            data-hero-chip
            className="absolute left-[-2%] top-[47%] z-40 hidden rotate-[3deg] rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2.5 shadow-soft backdrop-blur sm:block"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blush-600" strokeWidth={1.6} />
              <div>
                <p className="text-[10px] font-semibold leading-tight text-plum">Zero jitters</p>
                <p className="text-[8.5px] uppercase tracking-[0.12em] text-plum/40">0 dyes · 0 blends</p>
              </div>
            </div>
          </div>

          <StoryTrigger
            story={story}
            className="group absolute bottom-[9%] right-[-2%] z-40 flex items-center gap-2.5 rounded-2xl border border-white/20 bg-plum/90 p-2 pr-3.5 text-left text-cream shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:bg-plum sm:right-[1%]"
          >
            <span className="relative h-11 w-14 shrink-0 overflow-hidden rounded-xl bg-plum-soft">
              <Image src={images.heroAlt} alt="" fill sizes="56px" className="object-cover opacity-80" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-cream/90">
                  <Play className="ml-0.5 h-2.5 w-2.5 fill-plum text-plum" strokeWidth={1} />
                </span>
              </span>
            </span>
            <span className="hidden sm:block">
              <span className="block text-[10.5px] font-semibold">Watch Maya&apos;s story</span>
              <span className="mt-0.5 block text-[9px] text-cream/55">90 days · 1:24</span>
            </span>
          </StoryTrigger>
        </div>
      </div>

      {/* ------------------------------- Trust ------------------------------- */}
      <div className="container-x relative z-10 pb-10 pt-2 lg:pb-14">
        <div
          data-hero-trust
          className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-plum/10 bg-plum/10 shadow-soft sm:grid-cols-3"
        >
          <div className="flex items-center gap-3.5 bg-cream/95 px-4 py-4 backdrop-blur sm:px-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blush-100">
              <ShieldCheck className="h-4 w-4 text-blush-700" strokeWidth={1.6} />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-plum">100% money-back guarantee</p>
              <p className="mt-0.5 text-[10px] text-plum/45">90 days. Even on empty jars.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-cream/95 px-4 py-4 backdrop-blur sm:px-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blush-100">
              <Star className="h-4 w-4 fill-blush-700 text-blush-700" strokeWidth={0} />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-plum">4.9/5 from 10,000+ women</p>
              <p className="mt-0.5 text-[10px] text-plum/45">Independently verified reviews.</p>
            </div>
          </div>

          <StoryTrigger
            story={story}
            className="group flex items-center gap-3.5 bg-cream/95 px-4 py-4 text-left backdrop-blur transition hover:bg-white sm:px-5"
          >
            <span className="relative h-11 w-16 shrink-0 overflow-hidden rounded-xl bg-blush-200">
              <Image src={images.heroAlt} alt="" fill sizes="64px" className="object-cover" />
              <span className="absolute inset-0 grid place-items-center bg-plum/25">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-cream/95">
                  <Play className="ml-0.5 h-2.5 w-2.5 fill-plum text-plum" strokeWidth={1} />
                </span>
              </span>
            </span>
            <span>
              <span className="block text-[12px] font-semibold text-plum">Watch Maya&apos;s 60-day story</span>
              <span className="mt-0.5 block text-[10px] text-plum/45">1:24 · Real customer, no filter</span>
            </span>
          </StoryTrigger>
        </div>
      </div>
    </section>
  );
}
