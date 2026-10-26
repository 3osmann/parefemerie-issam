"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Heart, Instagram } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { socialPosts } from "@/lib/data";
import { gsap } from "@/lib/gsap";
import { cn, formatNumber, prefersReducedMotion } from "@/lib/utils";

const hashtags = [
  "#MyNutriivaRitual",
  "#RealResults",
  "#GlowFromWithin",
  "#NoFilterGlow",
  "#MetabolismReset",
  "#StrongNotSkinny",
];

export function SocialFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-social-card]");
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: index % 2 === 0 ? 26 : 4 },
            {
              y: index % 2 === 0 ? -18 : 8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.1,
              },
            },
          );
        });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const scroll = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({ left: direction * 300, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
      <div className="container-x relative">
        <Reveal>
          <SectionHeading
            eyebrow="Get social with @nutriiva"
            title={
              <>
                No filters. Just <span className="font-normal italic text-blush-600">the receipts.</span>
              </>
            }
            description="Real routines, real transformations, and the occasional smoothie. Tag us and you might end up right here."
            action={
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-plum/20 px-4 py-2.5 text-[11.5px] font-semibold text-plum transition hover:border-plum hover:bg-plum hover:text-cream"
                >
                  <Instagram className="h-3.5 w-3.5" /> Follow @nutriiva
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <div className="hidden items-center gap-1 sm:flex">
                  <button
                    type="button"
                    onClick={() => scroll(-1)}
                    aria-label="Previous photos"
                    className="grid h-9 w-9 place-items-center rounded-full border border-plum/15 text-plum/60 transition hover:border-plum hover:text-plum"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scroll(1)}
                    aria-label="Next photos"
                    className="grid h-9 w-9 place-items-center rounded-full border border-plum/15 text-plum/60 transition hover:border-plum hover:text-plum"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            }
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div
            ref={trackRef}
            className="mt-8 flex snap-x snap-mandatory items-end gap-3 overflow-x-auto pb-3 hide-scrollbar lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0"
          >
            {socialPosts.map((post, index) => (
              <a
                key={post.id}
                data-social-card
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "group relative w-[64%] shrink-0 snap-start overflow-hidden rounded-[22px] bg-blush-100 sm:w-[38%] lg:w-auto",
                  post.tall ? "aspect-[3/4.4] lg:h-[360px] lg:aspect-auto" : "aspect-[3/4] lg:h-[300px] lg:aspect-auto",
                )}
              >
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  sizes="(max-width: 1024px) 40vw, 16vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-plum/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                <span className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full bg-cream/20 text-cream backdrop-blur transition group-hover:bg-cream group-hover:text-plum">
                  <Instagram className="h-3.5 w-3.5" strokeWidth={1.6} />
                </span>

                <div className="absolute inset-x-3 bottom-3 text-cream">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold">
                    <Heart className="h-3 w-3 fill-blush-300 text-blush-300" />
                    {formatNumber(post.likes)}
                  </p>
                  <p className="mt-0.5 text-[10.5px] font-semibold">{post.handle}</p>
                  <p className="mt-0.5 max-h-0 overflow-hidden text-[10px] leading-snug text-cream/70 transition-all duration-500 group-hover:max-h-12">
                    {post.caption}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute left-2.5 top-2.5 text-[8px] font-bold uppercase tracking-[0.16em] text-cream/60"
                >
                  0{index + 1}
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 overflow-hidden border-y border-plum/10 py-3">
            <div className="marquee-mask flex w-max animate-marquee">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
                  {hashtags.map((tag) => (
                    <span
                      key={`${copy}-${tag}`}
                      className="flex items-center gap-5 px-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-plum/40"
                    >
                      {tag}
                      <span className="h-1 w-1 rounded-full bg-blush-400" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-center">
            <p className="text-[12px] text-plum/50">
              <span className="font-semibold text-plum">10,000+ women</span> are already inside.
            </p>
            <Link href="/shop-all" className="group inline-flex items-center gap-1.5 text-[12px] font-semibold text-blush-700">
              Join them — shop the ritual
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
