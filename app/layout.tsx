import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { CartToast } from "@/components/layout/CartToast";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollRefresh } from "@/components/site/ScrollRefresh";
import { CartProvider } from "@/lib/cart-context";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nutriiva — Look Better. Feel Stronger. Save 30%",
    template: "%s · Nutriiva",
  },
  description:
    "Clinically dosed supplements for energy, glow and a metabolism that keeps up with you. Build a bundle and save up to 30%. 90-day money-back guarantee.",
  keywords: [
    "women's supplements",
    "fat burner",
    "greens powder",
    "collagen",
    "hair growth",
    "supplement bundle",
    "Nutriiva",
  ],
  openGraph: {
    title: "Nutriiva — Look Better. Feel Stronger.",
    description:
      "Daily essentials for energy, glow and digestion. Formulated by women, for women. Save 30% when you build a bundle.",
    url: siteUrl,
    siteName: "Nutriiva",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "A woman training — Nutriiva daily supplements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nutriiva — Look Better. Feel Stronger.",
    description: "Clinically dosed supplements for women. Build a bundle, save 30%.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FCE4EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <CartProvider>
          <a
            href="#main"
            className="sr-only z-[200] rounded-full bg-plum px-5 py-3 text-sm font-semibold text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <AnnouncementBar />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <CartToast />
          <ScrollRefresh />
        </CartProvider>
      </body>
    </html>
  );
}
