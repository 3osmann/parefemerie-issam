"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export function NewsletterForm({
  tone = "light",
  source = "footer",
  className,
}: {
  tone?: "light" | "dark";
  source?: string;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("success");
      setMessage(data.message ?? "You're in. Check your inbox for 10% off.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage((error as Error).message);
    }
  }

  if (status === "success") {
    return (
      <div
        className={
          tone === "dark"
            ? "flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 text-cream"
            : "flex items-center gap-3 rounded-2xl border border-[#527a4b]/20 bg-sage px-4 py-3.5 text-[#3f5a3a]"
        }
        role="status"
      >
        <span
          className={
            tone === "dark"
              ? "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cream/15"
              : "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/60"
          }
        >
          <Check className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <p className="text-[12.5px] font-medium leading-snug">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={className} noValidate>
      <div
        className={
          tone === "dark"
            ? "flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] p-1.5 pl-5 backdrop-blur"
            : "flex items-center gap-2 rounded-full border border-plum/10 bg-white p-1.5 pl-5 shadow-sm"
        }
      >
        <input
          type="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Your email address"
          aria-label="Email address"
          className={
            tone === "dark"
              ? "min-w-0 flex-1 bg-transparent py-2 text-[13px] text-cream outline-none placeholder:text-cream/40"
              : "min-w-0 flex-1 bg-transparent py-2 text-[13px] text-plum outline-none placeholder:text-plum/40"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={
            tone === "dark"
              ? "inline-flex shrink-0 items-center gap-2 rounded-full bg-cream px-4 py-2.5 text-[12px] font-semibold text-plum transition hover:bg-blush-100 disabled:opacity-60"
              : "inline-flex shrink-0 items-center gap-2 rounded-full bg-plum px-4 py-2.5 text-[12px] font-semibold text-cream transition hover:bg-plum-deep disabled:opacity-60"
          }
        >
          {status === "loading" ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {status === "loading" ? (
            <span className="sr-only">Subscribing</span>
          ) : (
            <>
              <span className="hidden sm:inline">Get 10% off</span>
              <span className="sr-only sm:hidden">Get 10% off</span>
            </>
          )}
        </button>
      </div>
      {status === "error" ? <p className="mt-2 pl-4 text-[11px] font-medium text-blush-600">{message}</p> : null}
      <p
        className={
          tone === "dark"
            ? "mt-2.5 pl-4 text-[10.5px] text-cream/35"
            : "mt-2.5 pl-4 text-[10.5px] text-plum/35"
        }
      >
        By joining you agree to our privacy policy. Unsubscribe anytime.
      </p>
    </form>
  );
}
