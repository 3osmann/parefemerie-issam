import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { Bestsellers } from "@/components/sections/Bestsellers";
import { BlogSection } from "@/components/sections/BlogSection";
import { BundleBuilder } from "@/components/sections/BundleBuilder";
import { FaqSection } from "@/components/sections/FaqSection";
import { RecentlyViewed } from "@/components/sections/RecentlyViewed";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { SocialFeed } from "@/components/sections/SocialFeed";
import { ValueProps } from "@/components/sections/ValueProps";
import { getProducts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Nutriiva — Look Better. Feel Stronger. Save 30%",
  description:
    "Clinically dosed daily supplements for energy, glow, digestion and hair. Build a bundle of 5, 10 or 15 and save up to 30%. 90-day money-back guarantee.",
  alternates: { canonical: "/" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Nutriiva",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  potentialAction: {
    "@type": "SearchAction",
    target: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/shop-all?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default async function HomePage() {
  const products = await getProducts({ limit: 9 });

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <ValueProps />
      <Bestsellers products={products} />
      <SocialFeed />
      <BundleBuilder products={products} />
      <ResultsSection />
      <FaqSection />
      <BlogSection />
      <RecentlyViewed />
    </>
  );
}
