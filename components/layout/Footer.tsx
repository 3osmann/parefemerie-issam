import Link from "next/link";
import { Facebook, Instagram, Lock, Music2, ShieldCheck, Youtube } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NewsletterForm } from "@/components/layout/NewsletterForm";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Shop all", href: "/shop-all" },
      { label: "Weight loss", href: "/shop-all?category=Weight%20Loss" },
      { label: "Wellness", href: "/shop-all?category=Wellness" },
      { label: "Skin", href: "/shop-all?category=Skin" },
      { label: "Hair", href: "/shop-all?category=Hair" },
      { label: "Build your bundle", href: "/#bundle" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Real results", href: "/#results" },
      { label: "The journal", href: "/#learn" },
      { label: "Our science", href: "/#why" },
      { label: "Take the quiz", href: "/quiz" },
      { label: "FAQs", href: "/#faq" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact us", href: "mailto:hello@nutriiva.com" },
      { label: "Shipping & returns", href: "/legal/shipping" },
      { label: "Track your order", href: "/account" },
      { label: "Accessibility", href: "/legal/accessibility" },
      { label: "Privacy", href: "/legal/privacy" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story", href: "/#why" },
      { label: "Careers", href: "mailto:careers@nutriiva.com" },
      { label: "Wholesale", href: "mailto:stockists@nutriiva.com" },
      { label: "Affiliates", href: "mailto:partners@nutriiva.com" },
      { label: "Press", href: "mailto:press@nutriiva.com" },
    ],
  },
];

const payments = ["VISA", "Mastercard", "AMEX", "Shop Pay", "Apple Pay", "G Pay"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-plum-deep text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blush-600/15 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blush-300/10 blur-[120px]"
      />

      <div className="container-x relative">
        {/* Newsletter */}
        <div className="grid gap-8 border-b border-white/10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:py-20">
          <div>
            <p className="eyebrow !text-blush-300">Join the glow list</p>
            <h2 className="mt-4 max-w-lg text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
              10% off your first ritual.{" "}
              <span className="font-normal italic text-blush-200">Zero spam, ever.</span>
            </h2>
            <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-cream/55">
              Early access to drops, real customer stories, and the kind of nutrition advice you can actually use.
            </p>
          </div>
          <div>
            <NewsletterForm tone="dark" source="footer" />
            <div className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/35">
              <ShieldCheck className="h-3.5 w-3.5" /> 10,000+ women already inside
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-8 lg:py-16">
          <div className="max-w-xs">
            <Logo className="text-cream" textClassName="text-[30px]" markClassName="h-9 w-9" />
            <p className="mt-4 text-[12.5px] leading-relaxed text-cream/50">
              Supplements for women who are done with fairy dust. Formulated with clinicians, tested by labs, loved by
              10,000+ women.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                { icon: Music2, label: "TikTok", href: "https://tiktok.com" },
                { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
                { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-cream/65 transition hover:border-blush-300 hover:bg-blush-300 hover:text-plum"
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
                </a>
              ))}
            </div>
            <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-cream/30">Made in the USA · cGMP certified</p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blush-300">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[12.5px] text-cream/55 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payments + legal */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {payments.map((payment) => (
              <span
                key={payment}
                className="rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-cream/60"
              >
                {payment}
              </span>
            ))}
            <span className="ml-1 inline-flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.16em] text-cream/35">
              <Lock className="h-3 w-3" /> Secure 256-bit SSL
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-cream/40">
            <span>© {new Date().getFullYear()} Nutriiva Wellness, Inc.</span>
            <Link href="/legal/terms" className="hover:text-cream">
              Terms
            </Link>
            <Link href="/legal/privacy" className="hover:text-cream">
              Privacy
            </Link>
            <Link href="/legal/accessibility" className="hover:text-cream">
              Accessibility
            </Link>
            <span className="text-cream/25">These statements have not been evaluated by the FDA.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
