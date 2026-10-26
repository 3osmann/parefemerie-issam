"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, Sparkles, User } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchPanel } from "@/components/layout/SearchPanel";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Shop All", href: "/shop-all" },
  { label: "Real Results", href: "/#results" },
  { label: "Build My Bundle", href: "/#bundle" },
  { label: "Learn", href: "/#learn" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-plum/10 bg-cream/85 shadow-[0_18px_40px_-32px_rgba(74,21,37,0.55)] backdrop-blur-xl"
            : "border-b border-transparent bg-cream/55 backdrop-blur-md",
        )}
      >
        <div className="container-x flex h-[68px] items-center justify-between gap-3 lg:h-[82px]">
          <div className="flex items-center gap-1 sm:gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="icon-btn -ml-2 lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <Logo textClassName="text-[24px] sm:text-[26px] lg:text-[28px]" markClassName="h-7 w-7 sm:h-8 sm:w-8" />
          </div>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[13px] font-medium tracking-[-0.01em] transition-colors",
                  isActive(link.href) ? "text-plum" : "text-plum/65 hover:text-plum",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-[1.5px] origin-left bg-blush-600 transition-transform duration-300",
                    isActive(link.href) ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1.5">
            <Link
              href="/quiz"
              className="mr-1 hidden items-center gap-2 rounded-full bg-blush-600 px-5 py-2.5 text-[12px] font-semibold text-cream shadow-pill transition-all hover:-translate-y-0.5 hover:bg-blush-700 md:inline-flex"
            >
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
              Take the Quiz
            </Link>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="icon-btn"
              aria-label="Search products"
            >
              <Search className="h-[19px] w-[19px]" strokeWidth={1.5} />
            </button>
            <Link href="/account" className="icon-btn hidden sm:grid" aria-label="Your account">
              <User className="h-[19px] w-[19px]" strokeWidth={1.5} />
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="icon-btn"
              aria-label={`Open your bag${count > 0 ? `, ${count} items` : ""}`}
            >
              <ShoppingBag className="h-[19px] w-[19px]" strokeWidth={1.5} />
              {count > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-blush-600 px-1 text-[10px] font-bold leading-none text-cream ring-2 ring-cream">
                  {count > 9 ? "9+" : count}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
