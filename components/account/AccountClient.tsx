"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Box,
  Gift,
  LogOut,
  Mail,
  MapPin,
  Package,
  Sparkles,
  Truck,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export function AccountClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 4) {
      setError("Your password needs at least 4 characters.");
      return;
    }
    setError(null);
    setSignedIn(true);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-100/70 via-blush-50/40 to-cream py-10 sm:py-14 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full border border-blush-300/40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-blush-200/40 blur-[100px]"
      />

      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* Editorial rail */}
          <div className="lg:pt-4">
            <p className="eyebrow">
              <Sparkles className="h-3 w-3" /> Your corner of Nutriiva
            </p>
            <h1 className="mt-4 text-balance font-display text-[40px] font-semibold leading-[0.96] tracking-[-0.04em] text-plum sm:text-[48px]">
              Your ritual,
              <br />
              <span className="font-normal italic text-blush-600">all in one place.</span>
            </h1>
            <p className="mt-4 max-w-sm text-[12.5px] leading-relaxed text-plum/60">
              Track orders, manage your subscription, and keep your glow points somewhere you&apos;ll actually find them.
            </p>

            <div className="mt-7 grid max-w-sm gap-2">
              {[
                { icon: Truck, title: "Track every order", body: "Live delivery updates, no support ticket required." },
                { icon: Box, title: "Skip, pause or swap", body: "Your subscription, entirely on your schedule." },
                { icon: Gift, title: "Glow points", body: "Earn 1 point per $1 and spend them on full jars." },
              ].map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/50 p-3.5 backdrop-blur"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blush-100 text-blush-700">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold text-plum">{title}</p>
                    <p className="mt-0.5 text-[10.5px] leading-snug text-plum/50">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 max-w-sm rounded-2xl bg-plum p-4 text-cream">
              <p className="font-display text-[16px] leading-snug">
                “The subscription is the whole reason I stuck with it. Skip a month when life happens — it&apos;s just
                there when I&apos;m back.”
              </p>
              <p className="mt-2 text-[9.5px] uppercase tracking-[0.14em] text-blush-200">
                Maya R. · subscriber since 2023
              </p>
            </div>
          </div>

          {/* Card */}
          <div className="relative">
            <div className="rounded-[30px] border border-white/80 bg-white/70 p-5 shadow-card backdrop-blur-sm sm:p-7 lg:p-8">
              {!signedIn ? (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <Logo textClassName="text-[24px]" markClassName="h-8 w-8" />
                    <span className="rounded-full bg-blush-100 px-2.5 py-1 text-[8.5px] font-bold uppercase tracking-[0.14em] text-blush-700">
                      Demo mode
                    </span>
                  </div>
                  <h2 className="mt-6 font-display text-[28px] font-semibold leading-tight tracking-[-0.03em] text-plum">
                    Welcome back.
                  </h2>
                  <p className="mt-1.5 text-[12px] text-plum/50">
                    Sign in to see your ritual. This preview is local-only and doesn&apos;t create a real account.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                    <div>
                      <label htmlFor="account-email" className="mb-1.5 block text-[10.5px] font-semibold text-plum/60">
                        Email
                      </label>
                      <input
                        id="account-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        className="input-pill"
                        required
                      />
                    </div>
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <label htmlFor="account-password" className="block text-[10.5px] font-semibold text-plum/60">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => setError("Password resets are disabled in this demo. Use any 4+ character password.")}
                          className="text-[10px] font-medium text-blush-700 underline-offset-4 hover:underline"
                        >
                          Forgot?
                        </button>
                      </div>
                      <input
                        id="account-password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="••••••••"
                        className="input-pill"
                        required
                      />
                    </div>
                    {error ? <p className="text-[11px] font-medium text-blush-700">{error}</p> : null}
                    <button type="submit" className="btn-primary w-full py-3.5">
                      Sign in <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>

                  <div className="mt-5 flex items-center gap-3">
                    <span className="h-px flex-1 bg-plum/10" />
                    <span className="text-[9px] uppercase tracking-[0.16em] text-plum/30">or</span>
                    <span className="h-px flex-1 bg-plum/10" />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEmail("demo@nutriiva.com");
                      setPassword("glow");
                      setSignedIn(true);
                    }}
                    className="btn-outline mt-5 w-full py-3.5"
                  >
                    <Mail className="h-4 w-4" /> Continue with the demo account
                  </button>

                  <p className="mt-4 text-center text-[10.5px] text-plum/45">
                    New here?{" "}
                    <Link href="/quiz" className="font-semibold text-blush-700 underline-offset-4 hover:underline">
                      Take the quiz
                    </Link>{" "}
                    and we&apos;ll build your ritual.
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-blush-700">Signed in</p>
                      <h2 className="mt-2 font-display text-[28px] font-semibold leading-tight tracking-[-0.03em] text-plum">
                        Hi, glow-getter.
                      </h2>
                      <p className="mt-1 text-[11.5px] text-plum/50">{email || "demo@nutriiva.com"}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSignedIn(false);
                        setError(null);
                      }}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-plum/40 transition hover:text-plum"
                    >
                      <LogOut className="h-3 w-3" /> Sign out
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {[
                      { label: "Glow points", value: "120" },
                      { label: "Orders", value: "0" },
                      { label: "Ritual streak", value: "0 days" },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-2xl border border-plum/[0.08] bg-white/60 px-3 py-3 text-center">
                        <p className="font-display text-[22px] font-semibold leading-none text-plum">{stat.value}</p>
                        <p className="mt-1 text-[8.5px] font-semibold uppercase tracking-[0.1em] text-plum/40">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-dashed border-blush-300 bg-blush-50/70 p-5 text-center">
                    <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white/80">
                      <Package className="h-5 w-5 text-blush-600" strokeWidth={1.4} />
                    </span>
                    <p className="mt-3 font-display text-[19px] font-semibold text-plum">No orders yet</p>
                    <p className="mx-auto mt-1 max-w-[30ch] text-[11px] leading-relaxed text-plum/50">
                      Your first ritual is one small decision away. Start with a bestseller or let the quiz choose.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      <Link href="/shop-all" className="btn-primary !px-4 !py-2.5 !text-[11.5px]">
                        Shop bestsellers
                      </Link>
                      <Link href="/quiz" className="btn-outline !px-4 !py-2.5 !text-[11.5px]">
                        Find my match
                      </Link>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1.5">
                    {[
                      { icon: Truck, label: "Track an order", hint: "Delivery updates by email", href: "/legal/shipping" },
                      { icon: BadgeCheck, label: "Manage subscription", hint: "Skip, swap or cancel anytime", href: "/#faq" },
                      { icon: MapPin, label: "Saved addresses", hint: "Add one at your first checkout", href: "/shop-all" },
                    ].map(({ icon: Icon, label, hint, href }) => (
                      <Link
                        key={label}
                        href={href}
                        className="group flex items-center gap-3 rounded-xl border border-plum/[0.07] bg-white/50 px-3 py-2.5 transition hover:border-blush-300 hover:bg-white"
                      >
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-blush-50 text-blush-700">
                          <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
                        </span>
                        <span className="flex-1">
                          <span className="block text-[11.5px] font-semibold text-plum">{label}</span>
                          <span className="block text-[9.5px] text-plum/40">{hint}</span>
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-plum/25 transition group-hover:text-plum" />
                      </Link>
                    ))}
                  </div>

                  <p className="mt-4 rounded-xl bg-sage/60 px-3 py-2.5 text-[10px] leading-relaxed text-[#476b41]">
                    This is a demo dashboard. Connect Neon + your auth provider of choice to persist orders and
                    subscriptions.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
