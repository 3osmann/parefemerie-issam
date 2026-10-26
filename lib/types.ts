/**
 * Shared storefront types. These are intentionally plain / serializable so
 * the same shape is returned by Prisma, the API routes, and the demo fallback.
 */

export type ProductCategory = "WEIGHT_LOSS" | "WELLNESS" | "SKIN" | "HAIR";

export type CategoryTab = "Weight Loss" | "Wellness" | "Skin" | "Hair";

export type ArtVariant = "berry" | "greens" | "bundle" | "peach" | "caramel" | "rose" | "cream" | "lavender" | "bronze";

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  category: ProductCategory;
  categoryLabel: CategoryTab;
  flavor: string;
  price: number;
  compareAtPrice: number | null;
  rating: number;
  reviewCount: number;
  badge: string | null;
  accentFrom: string;
  accentTo: string;
  lidColor: string;
  labelColor: string;
  isBestseller: boolean;
  isBundle: boolean;
  ingredients: string[];
  benefits: string[];
  artVariant: ArtVariant;
};

export type Review = {
  id: string;
  customer: string;
  handle: string;
  location: string;
  title: string;
  body: string;
  rating: number;
  verified: boolean;
  image: string | null;
  avatar: string;
  productSlug: string | null;
  featured?: boolean;
};

export type BundleTier = {
  id: string;
  slug: string;
  name: string;
  packSize: number;
  price: number;
  compareAtPrice: number;
  badge: string | null;
  discountRate: number;
};

export type SocialPost = {
  id: string;
  image: string;
  handle: string;
  caption: string;
  likes: number;
  tall?: boolean;
};

export type BlogPost = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
  author: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type ValueProp = {
  id: string;
  title: string;
  body: string;
  tone: "blush" | "sage" | "cream" | "sand";
  icon: "flask" | "fruit" | "bloom" | "zero";
};

export type CartPurchaseType = "one_time" | "subscription";

export type CartLine = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  flavor: string;
  price: number;
  compareAtPrice: number | null;
  quantity: number;
  purchaseType: CartPurchaseType;
  accentFrom: string;
  accentTo: string;
  lidColor: string;
  labelColor: string;
  artVariant: ArtVariant;
  isBundle?: boolean;
};
