import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react";
import { legalDocuments, legalSlugs } from "@/lib/legal";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const doc = legalDocuments[slug];
  if (!doc) return { title: "Not found" };
  return {
    title: doc.title,
    description: doc.summary,
    alternates: { canonical: `/legal/${doc.slug}` },
  };
}

export default async function LegalPage({ params }: { params: Params }) {
  const { slug } = await params;
  const doc = legalDocuments[slug];
  if (!doc) notFound();

  return (
    <section className="relative overflow-hidden bg-cream py-10 sm:py-14 lg:py-16">
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="text-[10.5px] text-plum/40">
          <Link href="/" className="transition hover:text-plum">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-plum/65">{doc.title}</span>
        </nav>

        <div className="mt-7 grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-blush-700">The fine print</p>
            <nav aria-label="Legal documents" className="mt-3 space-y-1">
              {legalSlugs.map((item) => {
                const entry = legalDocuments[item];
                const active = item === doc.slug;
                return (
                  <Link
                    key={item}
                    href={`/legal/${item}`}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] transition ${
                      active
                        ? "bg-plum font-semibold text-cream"
                        : "text-plum/55 hover:bg-plum/[0.04] hover:text-plum"
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} />
                    {entry.title}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 rounded-2xl border border-plum/[0.08] bg-white/60 p-4">
              <p className="text-[11px] font-semibold text-plum">Still stuck?</p>
              <p className="mt-1 text-[10.5px] leading-relaxed text-plum/50">
                A real human answers within one business day.
              </p>
              <a
                href="mailto:hello@nutriiva.com"
                className="mt-2.5 inline-flex items-center gap-1 text-[10.5px] font-semibold text-blush-700 underline-offset-4 hover:underline"
              >
                hello@nutriiva.com <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>

            <Link
              href="/shop-all"
              className="mt-4 inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-plum/45 transition hover:text-plum"
            >
              <ArrowLeft className="h-3 w-3" /> Back to the shop
            </Link>
          </aside>

          <article className="max-w-2xl">
            <p className="eyebrow">Last updated {doc.updated}</p>
            <h1 className="mt-3 text-balance font-display text-[38px] font-semibold leading-[0.98] tracking-[-0.04em] text-plum sm:text-[48px]">
              {doc.title}
            </h1>
            <p className="mt-4 text-pretty text-[13.5px] leading-relaxed text-plum/60">{doc.summary}</p>

            <div className="mt-8 space-y-7">
              {doc.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-[21px] font-semibold tracking-[-0.02em] text-plum sm:text-[23px]">
                    {section.heading}
                  </h2>
                  <div className="mt-2.5 space-y-2.5">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-[12.5px] leading-relaxed text-plum/60">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets && section.bullets.length > 0 ? (
                    <ul className="mt-3 space-y-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-plum/60">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-blush-500" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <div className="mt-9 rounded-2xl bg-blush-50/80 p-5">
              <p className="text-[12px] font-semibold text-plum">The short version</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-plum/55">
                We want you to feel good about shopping here. If anything in this document feels unfair or unclear,
                email us — we will explain it in plain English.
              </p>
              <a
                href="mailto:hello@nutriiva.com"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-plum px-4 py-2 text-[11px] font-semibold text-cream transition hover:bg-plum-deep"
              >
                Talk to a human <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
