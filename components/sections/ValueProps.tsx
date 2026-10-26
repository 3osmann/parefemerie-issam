import { Sparkles } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { valueProps } from "@/lib/data";
import type { ValueProp } from "@/lib/types";
import { cn } from "@/lib/utils";

function ValueIcon({ icon }: { icon: ValueProp["icon"] }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.35,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7 text-blush-800" aria-hidden="true" {...common}>
      {icon === "flask" ? (
        <>
          <path d="M12 4h8M14 4v7L6.8 23.4A3 3 0 0 0 9.4 27h13.2a3 3 0 0 0 2.6-3.6L18 11V4" />
          <path d="M10 20h12" />
          <circle cx="14" cy="23" r="1" fill="currentColor" stroke="none" />
          <circle cx="18.5" cy="24.5" r="0.8" fill="currentColor" stroke="none" />
        </>
      ) : null}
      {icon === "fruit" ? (
        <>
          <circle cx="16" cy="19" r="9" />
          <path d="M16 10c0-3 2-5 5-6-.2 3-2 5-5 6Z" />
          <path d="M10 15.5c3 2 8 2 11 0M12.5 24c2-3 5-4.5 8.5-4" />
        </>
      ) : null}
      {icon === "bloom" ? (
        <>
          <ellipse cx="16" cy="9" rx="4" ry="6" />
          <ellipse cx="16" cy="23" rx="4" ry="6" />
          <ellipse cx="9" cy="16" rx="6" ry="4" />
          <ellipse cx="23" cy="16" rx="6" ry="4" />
          <circle cx="16" cy="16" r="2.6" fill="currentColor" stroke="none" />
        </>
      ) : null}
      {icon === "zero" ? (
        <>
          <circle cx="16" cy="16" r="10" />
          <path d="M8.8 23.2 23.2 8.8" />
          <path d="M23 24.5v3M21.5 26h3" />
        </>
      ) : null}
    </svg>
  );
}

const toneClasses: Record<ValueProp["tone"], string> = {
  blush: "bg-blush-100/80",
  sage: "bg-sage",
  cream: "bg-white",
  sand: "bg-sand",
};

export function ValueProps() {
  return (
    <section id="why" className="relative scroll-mt-24 overflow-hidden bg-cream py-16 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute left-[-6%] top-[30%] h-64 w-64 rounded-full bg-blush-100/60 blur-[80px]" />
      <div className="container-x relative">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <SectionHeading
              eyebrow="The Nutriiva difference"
              title={
                <>
                  Not just a supplement.
                  <br />
                  <span className="font-normal italic text-blush-600">A lifestyle shift.</span>
                </>
              }
            />
            <div className="lg:pb-2">
              <p className="max-w-md text-pretty text-[14px] leading-relaxed text-plum/60">
                We built the daily ritual we couldn&apos;t find: one that treats energy, digestion, skin and hair as
                connected — because they are.
              </p>
              <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-plum/10 bg-white/60 px-3 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-plum/50">
                <Sparkles className="h-3 w-3 text-blush-600" /> Formulated with women&apos;s health practitioners
              </p>
            </div>
          </div>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-12 lg:grid-cols-4">
          {valueProps.map((value, index) => (
            <div
              key={value.id}
              data-reveal-item
              className={cn("h-full", index % 2 === 1 && "lg:mt-10")}
            >
              <article
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-plum/[0.08] p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft sm:p-6",
                  toneClasses[value.tone],
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/70 shadow-sm transition-transform duration-500 group-hover:-rotate-6">
                    <ValueIcon icon={value.icon} />
                  </span>
                  <span className="font-display text-xl font-medium text-plum/20">0{index + 1}</span>
                </div>
                <h3 className="mt-8 text-balance font-display text-[21px] font-semibold leading-[1.1] tracking-[-0.02em] text-plum">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-[12.5px] leading-relaxed text-plum/60">{value.body}</p>
                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-1.5 text-[8.5px] font-bold uppercase tracking-[0.18em] text-plum/35">
                    <span className="h-1 w-1 rounded-full bg-blush-600" /> Nutriiva standard
                  </span>
                </div>
              </article>
            </div>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 flex max-w-xl flex-col items-center text-center lg:mt-16">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-plum/10 bg-white/70 text-blush-600">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" strokeLinecap="round" />
              </svg>
            </span>
            <p className="mt-4 text-balance font-display text-[23px] font-normal italic leading-snug text-plum sm:text-[27px]">
              “If it doesn&apos;t earn its place in the jar, it&apos;s not in there.”
            </p>
            <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-plum/40">
              Dr. Lena Ortiz, RD · Head of Formulation
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
