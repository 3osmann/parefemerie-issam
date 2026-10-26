import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "The journal",
  description:
    "Practical nutrition, honest ingredient breakdowns and recipes that fit a real week — written by the practitioners behind Nutriiva.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-blush-100/80 via-blush-50/50 to-cream pb-10 pt-8 sm:pb-12 sm:pt-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full border border-blush-300/50"
        />
        <div className="container-x relative">
          <nav aria-label="Breadcrumb" className="text-[10.5px] text-plum/40">
            <Link href="/" className="transition hover:text-plum">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-plum/65">The journal</span>
          </nav>

          <Reveal>
            <div className="mt-7 max-w-2xl">
              <p className="eyebrow">
                <Sparkles className="h-3 w-3" /> Learn with Nutriiva
              </p>
              <h1 className="mt-4 text-balance font-display text-[42px] font-semibold leading-[0.95] tracking-[-0.045em] text-plum sm:text-[54px] lg:text-[62px]">
                Nutrition, without{" "}
                <span className="font-normal italic text-blush-600">the noise.</span>
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-[13.5px] leading-relaxed text-plum/60 sm:text-[14px]">
                No detoxes, no fear-mongering, no 47-step morning routine. Just practical guidance from the registered
                dietitians and formulators we work with.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream pb-16 sm:pb-20 lg:pb-24">
        <div className="container-x">
          {featured ? (
            <Reveal>
              <Link
                href={`/journal/${featured.slug}`}
                className="group grid overflow-hidden rounded-[30px] border border-plum/[0.08] bg-white/60 transition-all duration-500 hover:border-blush-300/70 hover:shadow-card lg:grid-cols-[1.15fr_1fr]"
              >
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[380px]">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[8.5px] font-bold uppercase tracking-[0.14em] text-plum backdrop-blur">
                    Featured · {featured.category}
                  </span>
                </div>
                <div className="flex flex-col p-5 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-plum/40">
                    <Clock className="h-3 w-3" /> {featured.readTime}
                    <span className="h-0.5 w-0.5 rounded-full bg-plum/30" />
                    {featured.author}
                  </div>
                  <h2 className="mt-3 font-display text-[27px] font-semibold leading-[1.05] tracking-[-0.03em] text-plum sm:text-[34px]">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-plum/55">{featured.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[11.5px] font-semibold text-blush-700">
                    Read the story
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ) : null}

          <RevealGroup className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <div key={post.id} data-reveal-item className="h-full">
                <Link
                  href={`/journal/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-plum/[0.08] bg-white/60 transition-all duration-500 hover:-translate-y-1 hover:border-blush-300/70 hover:shadow-card"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-plum backdrop-blur">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-plum/40">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </div>
                    <h2 className="mt-2 font-display text-[19px] font-semibold leading-[1.15] tracking-[-0.02em] text-plum">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-[11.5px] leading-relaxed text-plum/50">{post.excerpt}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[10.5px] font-semibold text-blush-700">
                      Read more <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </RevealGroup>

          <Reveal delay={0.08}>
            <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-[26px] bg-gradient-to-r from-plum to-[#641E35] p-6 text-cream sm:flex-row sm:p-8">
              <div>
                <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-blush-300">Not sure where to start?</p>
                <p className="mt-2 font-display text-[24px] font-semibold leading-tight">Let the quiz do the thinking.</p>
              </div>
              <Link
                href="/quiz"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-[11.5px] font-semibold text-plum transition hover:bg-blush-100"
              >
                Find my ritual <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
