"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Pause, Play, X } from "lucide-react";
import { Portal } from "@/components/ui/Portal";
import { Stars } from "@/components/ui/Stars";
import { useBodyLock, useEscape } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export type Story = {
  name: string;
  location?: string;
  title: string;
  quote: string;
  poster: string;
  avatar?: string;
  duration?: string;
  productName?: string;
  productSlug?: string;
  rating?: number;
};

export function StoryModal({ story, onClose }: { story: Story; onClose: () => void }) {
  const [playing, setPlaying] = useState(false);
  useBodyLock(true);
  useEscape(true, onClose);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setPlaying(false), 24000);
    return () => window.clearTimeout(timer);
  }, [playing]);

  return (
    <Portal>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6">
        <button
          type="button"
          aria-label="Close story"
          onClick={onClose}
          className="absolute inset-0 animate-fade-in bg-plum-deep/80 backdrop-blur-sm"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${story.name}'s customer story`}
          className="relative max-h-[92vh] w-full max-w-3xl animate-rise-in overflow-y-auto rounded-[28px] bg-plum text-cream shadow-2xl"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close story"
            className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-plum-deep/60 text-cream backdrop-blur transition hover:bg-plum-deep"
          >
            <X className="h-4 w-4" strokeWidth={1.7} />
          </button>

          <div className="relative aspect-[16/10] w-full overflow-hidden bg-plum-deep">
            <Image
              src={story.poster}
              alt={`${story.name}'s Nutriiva story`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className={cn(
                "object-cover transition-transform duration-[6000ms]",
                playing ? "scale-105" : "scale-100",
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum-deep via-plum-deep/20 to-transparent" />

            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-cream/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-plum">
              Customer story
            </span>

            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? "Pause story" : "Play story"}
              className="absolute inset-0 grid place-items-center"
            >
              <span
                className={cn(
                  "grid h-16 w-16 place-items-center rounded-full border border-white/30 bg-cream/95 text-plum shadow-2xl backdrop-blur transition-all duration-500 sm:h-20 sm:w-20",
                  playing ? "scale-90 opacity-0" : "scale-100 opacity-100",
                )}
              >
                <Play className="ml-1 h-6 w-6 fill-plum" strokeWidth={1} />
              </span>
            </button>

            {playing ? (
              <button
                type="button"
                onClick={() => setPlaying(false)}
                aria-label="Pause story"
                className="absolute inset-0 grid place-items-center"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-plum/40 text-cream opacity-0 backdrop-blur transition hover:opacity-100">
                  <Pause className="h-5 w-5 fill-cream" strokeWidth={1} />
                </span>
              </button>
            ) : null}

            <div className="absolute inset-x-4 bottom-4 flex items-center gap-3">
              <span className="text-[10px] font-semibold tabular-nums text-cream/70">
                {playing ? "00:12" : "00:00"}
              </span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-cream/20">
                <div
                  className={cn(
                    "h-full rounded-full bg-blush-300",
                    playing ? "w-full duration-[24000ms]" : "w-[8%] duration-300",
                    "transition-[width] ease-linear",
                  )}
                />
              </div>
              <span className="text-[10px] font-semibold tabular-nums text-cream/70">{story.duration ?? "01:24"}</span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <Stars rating={story.rating ?? 5} starClassName="h-4 w-4 fill-blush-300 text-blush-300" />
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-blush-200">
                <BadgeCheck className="h-3.5 w-3.5" /> Verified buyer
              </span>
            </div>
            <h3 className="mt-4 text-balance font-display text-2xl leading-tight sm:text-3xl">{story.title}</h3>
            <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-cream/65">“{story.quote}”</p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
              <div className="flex items-center gap-3">
                {story.avatar ? (
                  <span className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image src={story.avatar} alt="" fill sizes="40px" className="object-cover" />
                  </span>
                ) : (
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-blush-300 font-display text-sm text-plum">
                    {story.name.charAt(0)}
                  </span>
                )}
                <div>
                  <p className="text-[12.5px] font-semibold">{story.name}</p>
                  <p className="text-[10.5px] text-cream/45">
                    {story.location ?? "Nutriiva customer"} · {story.productName ?? "90-day ritual"}
                  </p>
                </div>
              </div>
              {story.productSlug ? (
                <Link
                  href={`/product/${story.productSlug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2.5 text-[11.5px] font-semibold text-plum transition hover:bg-blush-100"
                >
                  Shop her ritual <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : null}
            </div>
            <p className="mt-4 text-[9.5px] leading-relaxed text-cream/30">
              Real customer experience. Individual results vary. These statements have not been evaluated by the FDA.
            </p>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export function StoryTrigger({
  story,
  children,
  className,
}: {
  story: Story;
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
        <span className="sr-only">
          {story.name}&apos;s customer story: {story.title}
        </span>
      </button>
      {open ? <StoryModal story={story} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
