"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, Play, Sparkles } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stars } from "@/components/ui/Stars";
import { StoryTrigger, type Story } from "@/components/ui/StoryModal";
import { reviews } from "@/lib/data";
import { cn } from "@/lib/utils";

const stats = [
  { value: "10k+", label: "women in the ritual" },
  { value: "4.9", label: "average rating" },
  { value: "92%", label: "reorder every month" },
  { value: "90", label: "day glow guarantee" },
];

function toStory(index: number): Story {
  const review = reviews[index];
  return {
    name: review.customer,
    location: review.location,
    title: review.title,
    quote: review.body,
    poster: review.image ?? "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1000&q=80",
    avatar: review.avatar,
    productName: review.productSlug?.replace(/-/g, " "),
    productSlug: review.productSlug ?? undefined,
    duration: "01:12",
  };
}

export function ResultsSection() {
  const featured = reviews.slice(0, 3);

  return (
    <section id="results" className="relative scroll-mt-24 overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
      <div className="container-x relative">
        {/* --------------------------- Quiz banner --------------------------- */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-plum via-[#5A1B30] to-blush-800 p-6 text-cream shadow-card sm:p-9 lg:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 right-[20%] h-72 w-72 rounded-full bg-blush-400/15 blur-[80px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-6 top-6 h-2 w-2 rounded-full bg-blush-300 animate-pulse-soft"
            />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <p className="inline-flex items-center gap-2 text-[9.5px] font-bold uppercase tracking-[0.22em] text-blush-300">
                  <Sparkles className="h-3 w-3" /> Not sure where to start?
                </p>
                <h2 className="mt-4 max-w-xl text-balance font-display text-[32px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[42px] lg:text-[48px]">
                  Your body has questions.
                  <br />
                  <span className="font-normal italic text-blush-200">The quiz has answers.</span>
                </h2>
                <p className="mt-4 max-w-md text-[13px] leading-relaxed text-cream/60 sm:text-[14px]">
                  Three questions, sixty seconds, one ritual built around your goals, your routine and your flavour
                  preferences. No guesswork required.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="/quiz"
                    className="group inline-flex items-center gap-3 rounded-full bg-cream py-1.5 pl-5 pr-1.5 text-[12.5px] font-semibold text-plum transition hover:bg-blush-100"
                  >
                    Take the 60-second quiz
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-plum text-cream transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-cream/35">3 questions · no email needed</span>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[320px]">
                <div className="absolute inset-0 rotate-3 rounded-[26px] border border-white/10 bg-white/[0.04]" />
                <div className="relative -rotate-2 rounded-[26px] border border-white/15 bg-white/[0.08] p-4 backdrop-blur-md sm:p-5">
                  <div className="flex items-center justify-between text-[8.5px] font-bold uppercase tracking-[0.14em] text-cream/40">
                    <span>Question 1 of 3</span>
                    <span>33%</span>
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-1/3 rounded-full bg-blush-300" />
                  </div>
                  <p className="mt-4 font-display text-[19px] leading-tight text-cream">
                    What would you love to change first?
                  </p>
                  <div className="mt-3 space-y-1.5">
                    {["My energy & metabolism", "My digestion", "My skin & glow"].map((option, index) => (
                      <Link
                        key={option}
                        href="/quiz"
                        className={cn(
                          "flex items-center gap-2 rounded-xl border px-3 py-2 text-[11px] transition",
                          index === 0
                            ? "border-blush-300/60 bg-cream/15 text-cream"
                            : "border-white/10 text-cream/55 hover:border-white/25 hover:text-cream",
                        )}
                      >
                        <span
                          className={cn(
                            "h-2.5 w-2.5 rounded-full border",
                            index === 0 ? "border-blush-300 bg-blush-300" : "border-white/30",
                          )}
                        />
                        {option}
                        {index === 0 ? <Sparkles className="ml-auto h-3 w-3 text-blush-300" /> : null}
                      </Link>
                    ))}
                  </div>
                  <p className="mt-3 text-center text-[8px] uppercase tracking-[0.14em] text-cream/25">
                    Personalised in under a minute
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* --------------------------- Testimonials --------------------------- */}
        <Reveal className="mt-14 lg:mt-20">
          <SectionHeading
            eyebrow="Real results"
            title={
              <>
                Thousands of women are losing weight{" "}
                <span className="font-normal italic text-blush-600">(and finding themselves).</span>
              </>
            }
            description="Unedited, unfiltered, and verified. These are the messages sitting in our inbox on a Monday morning."
            action={
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-[12px] font-semibold text-blush-700"
              >
                See more on Instagram
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            }
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-plum/10 bg-plum/10 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-cream/95 px-3 py-5 text-center backdrop-blur">
                <p className="font-display text-[28px] font-semibold leading-none tracking-[-0.03em] text-plum sm:text-[34px]">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-plum/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <RevealGroup className="mt-5 grid gap-4 md:grid-cols-3">
          {featured.map((review, index) => {
            const dark = index === 2;
            return (
              <div key={review.id} data-reveal-item className="h-full">
                <article
                  className={cn(
                    "flex h-full flex-col overflow-hidden rounded-[28px] border p-3.5 transition-transform duration-500 hover:-translate-y-1 sm:p-4",
                    dark ? "border-plum bg-plum text-cream" : index === 1 ? "border-blush-200 bg-blush-100" : "border-plum/[0.08] bg-white/75",
                  )}
                >
                  {review.image ? (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-blush-200">
                      <Image
                        src={review.image}
                        alt={`${review.customer}'s Nutriiva story`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-plum/60 via-transparent to-transparent" />
                      <StoryTrigger
                        story={toStory(index)}
                        className="absolute inset-0 grid place-items-center"
                      >
                        <span className="grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-cream/90 text-plum shadow-lg transition-transform duration-300 hover:scale-105">
                          <Play className="ml-0.5 h-4 w-4 fill-plum" strokeWidth={1} />
                        </span>
                      </StoryTrigger>
                      <span className="absolute left-2.5 top-2.5 rounded-full bg-cream/85 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-plum backdrop-blur">
                        90-day story
                      </span>
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] flex-col justify-between rounded-[20px] bg-white/45 p-4">
                      <span className="font-display text-5xl leading-none text-blush-600/50">“</span>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-plum/35">
                        {review.handle}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between px-1 pt-4">
                    <Stars
                      rating={review.rating}
                      starClassName={dark ? "fill-blush-300 text-blush-300 h-3.5 w-3.5" : "h-3.5 w-3.5"}
                    />
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-[8.5px] font-semibold uppercase tracking-[0.12em]",
                        dark ? "text-blush-200" : "text-plum/40",
                      )}
                    >
                      <BadgeCheck className="h-3 w-3" /> Verified
                    </span>
                  </div>

                  <p
                    className={cn(
                      "mt-3 px-1 font-display text-[17px] font-medium leading-[1.35] tracking-[-0.01em] sm:text-[18px]",
                      dark ? "text-cream" : "text-plum",
                    )}
                  >
                    “{review.body}”
                  </p>

                  <div className="mt-auto flex items-center gap-2.5 px-1 pt-5">
                    <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-blush-200">
                      <Image src={review.avatar} alt="" fill sizes="32px" className="object-cover" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={cn("text-[11px] font-semibold", dark ? "text-cream" : "text-plum")}>
                        {review.customer}
                      </p>
                      <p className={cn("text-[9.5px]", dark ? "text-cream/40" : "text-plum/40")}>
                        {review.location} · {review.title}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-current/10 px-1 pt-3">
                    {review.productSlug ? (
                      <Link
                        href={`/product/${review.productSlug}`}
                        className={cn(
                          "truncate text-[9.5px] font-semibold uppercase tracking-[0.1em]",
                          dark ? "text-blush-200 hover:text-cream" : "text-blush-700 hover:text-blush-800",
                        )}
                      >
                        {review.productSlug.replace(/-/g, " ")}
                      </Link>
                    ) : (
                      <span />
                    )}
                    <StoryTrigger
                      story={toStory(index)}
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1 text-[9.5px] font-semibold underline-offset-4 hover:underline",
                        dark ? "text-cream/60" : "text-plum/55",
                      )}
                    >
                      <Play className="h-2.5 w-2.5" /> Watch her story
                    </StoryTrigger>
                  </div>
                </article>
              </div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
