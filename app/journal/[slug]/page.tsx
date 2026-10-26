import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { ProductArt } from "@/components/product/ProductArt";
import { Reveal } from "@/components/ui/Reveal";
import { blogPosts, findProduct } from "@/lib/data";
import { journalArticles } from "@/lib/journal";
import { formatPrice } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return { title: "Story not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [{ url: post.image }],
    },
  };
}

export default async function JournalArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  const article = journalArticles[slug];
  if (!post || !article) notFound();

  const product = findProduct(article.productSlug);
  const more = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="bg-cream">
        <div className="container-x max-w-4xl pt-8 sm:pt-10">
          <nav aria-label="Breadcrumb" className="text-[10.5px] text-plum/40">
            <Link href="/" className="transition hover:text-plum">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/journal" className="transition hover:text-plum">
              The journal
            </Link>
            <span className="mx-2">/</span>
            <span className="text-plum/65">{post.category}</span>
          </nav>

          <Reveal>
            <div className="mt-6">
              <p className="eyebrow">
                <Sparkles className="h-3 w-3" /> {post.category}
              </p>
              <h1 className="mt-4 text-balance font-display text-[37px] font-semibold leading-[0.98] tracking-[-0.04em] text-plum sm:text-[48px] lg:text-[56px]">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-plum/40">
                <span>{post.author}</span>
                <span className="h-0.5 w-0.5 rounded-full bg-plum/30" />
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> {post.readTime}
                </span>
                <span className="h-0.5 w-0.5 rounded-full bg-plum/30" />
                <span>Updated March 2026</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="container-x mt-7 max-w-5xl">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] bg-blush-100 sm:aspect-[16/8]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/25 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>

        <div className="container-x max-w-3xl pb-14 pt-9 sm:pb-16 sm:pt-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_220px] lg:gap-12">
            <div>
              <p className="text-pretty text-[15px] leading-[1.75] text-plum/75 first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-[58px] first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-blush-600">
                {article.intro}
              </p>

              <div className="mt-8 space-y-7">
                {article.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="font-display text-[23px] font-semibold leading-tight tracking-[-0.025em] text-plum sm:text-[26px]">
                      {section.heading}
                    </h2>
                    <div className="mt-3 space-y-3">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-[13.5px] leading-[1.75] text-plum/65">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {product ? (
                <div className="mt-9 flex flex-col gap-4 rounded-[26px] border border-blush-200 bg-blush-50/80 p-4 sm:flex-row sm:items-center sm:p-5">
                  <div className="h-28 w-24 shrink-0 self-center overflow-hidden rounded-2xl bg-white/70 sm:self-auto">
                    <ProductArt product={product} decoration={false} className="scale-110" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[8.5px] font-bold uppercase tracking-[0.16em] text-blush-700">
                      Mentioned in this story
                    </p>
                    <p className="mt-1 font-display text-[20px] font-semibold leading-tight text-plum">{product.name}</p>
                    <p className="mt-0.5 text-[11px] text-plum/50">
                      {product.subtitle} · {formatPrice(product.price)}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href={`/product/${product.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-plum px-4 py-2 text-[10.5px] font-semibold text-cream transition hover:bg-plum-deep"
                      >
                        Shop the formula <ArrowRight className="h-3 w-3" />
                      </Link>
                      <Link
                        href="/#bundle"
                        className="inline-flex items-center gap-1.5 rounded-full border border-plum/20 px-4 py-2 text-[10.5px] font-semibold text-plum transition hover:bg-white/60"
                      >
                        Bundle &amp; save
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <aside className="lg:pt-1">
              <div className="rounded-2xl border border-plum/[0.08] bg-white/60 p-4 lg:sticky lg:top-28">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-blush-700">The short version</p>
                <ul className="mt-3 space-y-3">
                  {article.takeaways.map((takeaway) => (
                    <li key={takeaway} className="flex items-start gap-2 text-[11px] leading-relaxed text-plum/60">
                      <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-blush-500" />
                      {takeaway}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-plum/[0.08] pt-3">
                  <Link
                    href="/quiz"
                    className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-blush-700"
                  >
                    Build my ritual <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-10 border-t border-plum/[0.08] pt-5">
            <Link href="/journal" className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-plum/50 hover:text-plum">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to the journal
            </Link>
          </div>
        </div>
      </article>

      <section className="bg-[#FBF3EE] py-14 sm:py-16">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-[28px] font-semibold leading-tight tracking-[-0.03em] text-plum sm:text-[34px]">
              Keep reading
            </h2>
            <Link href="/journal" className="text-[11px] font-semibold text-blush-700 underline-offset-4 hover:underline">
              All stories
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {more.map((item) => (
              <Link
                key={item.id}
                href={`/journal/${item.slug}`}
                className="group flex flex-col overflow-hidden rounded-[22px] border border-plum/[0.08] bg-white/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-3.5">
                  <p className="text-[8.5px] font-bold uppercase tracking-[0.14em] text-blush-700">{item.category}</p>
                  <p className="mt-1.5 font-display text-[16px] font-semibold leading-snug text-plum">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
