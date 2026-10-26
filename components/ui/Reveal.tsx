"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { cn, prefersReducedMotion } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  start?: string;
};

/** Single-element scroll reveal with a clean gsap.context() teardown. */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  y = 36,
  start = "top 88%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration, y, start]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  delay?: number;
  start?: string;
};

/** Staggers any direct descendants tagged with data-reveal-item. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  y = 44,
  delay = 0,
  start = "top 85%",
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal-item]"));
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, y, delay, start]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
