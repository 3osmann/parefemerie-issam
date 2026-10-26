import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/lib/data";
import type { BlogPost } from "@/lib/types";

function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-plum/[0.08] bg-white/65 transition-all duration-500 hover:-translate-y-1 hover:border-blush-300/70 hover:shadow-card"
    >
      <div className={featured ? "relative aspect-[16/10] overflow-hidden" : "relative aspect-[16/9] overflow-hidden"}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes={featured ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 42vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-plum/45 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-2.5 py-1 text-[8.5px] font-bold uppercase tracking-[0.14em] text-plum backdrop-blur">
          {post.category}
        </span>
        <span className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-cream/90 text-plum opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>

      <div className={featured ? "flex flex-1 flex-col p-4 sm:p-5" : "flex flex-1 flex-col p-4"}>
        <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-plum/40">
          <Clock className="h-3 w-3" /> {post.readTime}
          <span className="h-0.5 w-0.5 rounded-full bg-plum/30" />
          <span className="truncate">{post.author}</span>
        </div>
        <h3
          className={
            featured
              ? "mt-2 font-display text-[22px] font-semibold leading-[1.12] tracking-[-0.025em] text-plum sm:text-[26px]"
              : "mt-2 font-display text-[16px] font-semibold leading-[1.2] tracking-[-0.02em] text-plum"
          }
        >
          {post.title}
        </h3>
        <p
          className={
            featured
              ? "mt-2.5 max-w-lg text-[12.5px] leading-relaxed text-plum/55"
              : "mt-1.5 line-clamp-2 text-[11.5px] leading-relaxed text-plum/50"
          }
        >
          {post.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[10.5px] font-semibold text-blush-700">
          Read the story
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function BlogSection() {
  const [featured, ...rest] = blogPosts;

  return (
    <section id="learn" className="relative scroll-mt-24 overflow-hidden bg-[#FBF3EE] py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 bottom-0 h-80 w-80 rounded-full bg-blush-200/40 blur-[100px]"
      />
      <div className="container-x relative">
        <Reveal>
          <SectionHeading
            eyebrow="Learn with Nutriiva"
            title={
              <>
                The journal, for your{" "}
                <span className="font-normal italic text-blush-600">curious era.</span>
              </>
            }
            description="Practical nutrition, honest ingredient breakdowns and recipes that fit a real week. Written by the practitioners behind the formulas."
            action={
              <Link
                href="/journal"
                className="group inline-flex items-center gap-2 rounded-full border border-plum/20 px-5 py-3 text-[12px] font-semibold text-plum transition hover:border-plum hover:bg-plum hover:text-cream"
              >
                Visit the journal
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            }
          />
        </Reveal>

        <RevealGroup className="mt-8 grid gap-4 lg:grid-cols-[1.18fr_1fr]">
          <div data-reveal-item className="h-full">
            {featured ? <BlogCard post={featured} featured /> : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {rest.map((post) => (
              <div key={post.id} data-reveal-item className="h-full">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </RevealGroup>

        <Reveal delay={0.08}>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-plum/[0.08] bg-white/55 px-5 py-4 sm:flex-row">
            <p className="inline-flex items-center gap-2 text-[11px] text-plum/55">
              <Sparkles className="h-3.5 w-3.5 text-blush-600" />
              New stories every Tuesday. No 12-step protocols, no fear-mongering.
            </p>
            <Link
              href="/journal"
              className="text-[11px] font-semibold text-blush-700 underline-offset-4 hover:underline"
            >
              Browse all articles
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
