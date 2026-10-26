"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Plus, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { faqs } from "@/lib/data";
import { cn, prefersReducedMotion } from "@/lib/utils";

function FaqRow({
  item,
  index,
  open,
  onToggle,
}: {
  item: { id: string; question: string; answer: string };
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useIsomorphicLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (prefersReducedMotion()) {
      panel.style.height = open ? "auto" : "0px";
      return;
    }

    if (firstRender.current) {
      firstRender.current = false;
      gsap.set(panel, { height: open ? "auto" : 0 });
      return;
    }

    const tween = gsap.to(panel, {
      height: open ? "auto" : 0,
      duration: 0.45,
      ease: "power3.inOut",
      overwrite: true,
    });

    return () => {
      tween.kill();
    };
  }, [open]);

  const panelId = `${item.id}-panel`;
  const buttonId = `${item.id}-trigger`;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border transition-colors duration-300",
        open
          ? "border-blush-300/70 bg-blush-50/80"
          : "border-plum/[0.09] bg-white/55 hover:border-plum/20",
      )}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start gap-4 px-4 py-4 text-left sm:px-5 sm:py-5"
        >
          <span
            className={cn(
              "mt-0.5 font-display text-[11px] font-semibold tabular-nums tracking-[0.08em]",
              open ? "text-blush-700" : "text-plum/30",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "flex-1 font-display text-[16px] font-semibold leading-snug tracking-[-0.015em] transition-colors sm:text-[17px]",
              open ? "text-plum" : "text-plum/80",
            )}
          >
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300",
              open
                ? "rotate-45 border-blush-600 bg-blush-600 text-cream"
                : "border-plum/15 text-plum/50",
            )}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        ref={panelRef}
        className="h-0 overflow-hidden"
      >
        <p className="px-4 pb-5 pl-[42px] pr-10 text-[12.5px] leading-relaxed text-plum/60 sm:px-5 sm:pb-6 sm:pl-[52px] sm:text-[13px]">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="relative scroll-mt-24 overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full border border-blush-200/60"
      />
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Good questions"
                title={
                  <>
                    Everything you were{" "}
                    <span className="font-normal italic text-blush-600">about to ask.</span>
                  </>
                }
                description="No fine-print games. If something still feels unclear, a real human on our team will answer within one business day."
              />
            </Reveal>

            <Reveal delay={0.08} className="mt-8 lg:mt-10">
              <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-plum via-[#5A1B30] to-plum-deep p-6 text-cream shadow-card sm:p-7">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blush-400/15 blur-3xl"
                />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-blush-200">
                    <MessageCircle className="h-3 w-3" /> Real humans
                  </span>
                  <p className="mt-5 font-display text-[24px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[27px]">
                    Still curious?
                    <br />
                    <span className="font-normal italic text-blush-200">We love a good question.</span>
                  </p>
                  <p className="mt-3 max-w-[28ch] text-[12px] leading-relaxed text-cream/55">
                    Email us and you&apos;ll hear back from the team — not a chatbot, not a ticket number.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-2.5">
                    <a
                      href="mailto:hello@nutriiva.com"
                      className="group inline-flex items-center gap-2 rounded-full bg-cream py-2 pl-4 pr-1.5 text-[11.5px] font-semibold text-plum transition hover:bg-blush-100"
                    >
                      hello@nutriiva.com
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-plum text-cream transition-transform group-hover:translate-x-0.5">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </a>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-[9.5px] uppercase tracking-[0.14em] text-cream/40">
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-blush-300" /> 90-day guarantee
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-blush-300" /> Replies in ~1 day
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-[11px] leading-relaxed text-plum/45">
                Looking for shipping timelines?{" "}
                <Link href="/legal/shipping" className="font-semibold text-blush-700 underline underline-offset-4">
                  Read our shipping &amp; returns policy
                </Link>
                .
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.06} className="lg:pt-1">
            <div className="space-y-2.5">
              {faqs.map((item, index) => (
                <FaqRow
                  key={item.id}
                  item={item}
                  index={index}
                  open={openId === item.id}
                  onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
