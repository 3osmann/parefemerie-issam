import { cache } from "react";
import type { Prisma } from "@prisma/client";
import { prisma, isDatabaseConfigured } from "./prisma";
import {
  bundleTiers,
  categoryLabels,
  categoryToEnum,
  findProduct,
  products as fallbackProducts,
  reviews as fallbackReviews,
} from "./data";
import type { ArtVariant, BundleTier, CategoryTab, Product, ProductCategory, Review } from "./types";

type DbProduct = Prisma.ProductGetPayload<Record<string, never>>;
type DbReview = Prisma.ReviewGetPayload<{ include: { product: { select: { slug: true } } } }>;

export type ProductQuery = {
  category?: CategoryTab | ProductCategory | "All" | null;
  bestsellersOnly?: boolean;
  limit?: number;
  search?: string;
};

function toCategoryEnum(category?: string | null): ProductCategory | null {
  if (!category || category === "All") return null;
  if (category in categoryToEnum) return categoryToEnum[category as CategoryTab];
  if (["WEIGHT_LOSS", "WELLNESS", "SKIN", "HAIR"].includes(category)) {
    return category as ProductCategory;
  }
  return null;
}

function mapDbProduct(row: DbProduct): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    subtitle: row.subtitle,
    description: row.description,
    category: row.category,
    categoryLabel: categoryLabels[row.category],
    flavor: row.flavor,
    price: row.price,
    compareAtPrice: row.compareAtPrice,
    rating: row.rating,
    reviewCount: row.reviewCount,
    badge: row.badge,
    accentFrom: row.accentFrom,
    accentTo: row.accentTo,
    lidColor: row.lidColor,
    labelColor: row.labelColor,
    isBestseller: row.isBestseller,
    isBundle: row.isBundle,
    ingredients: row.ingredients,
    benefits: row.benefits,
    artVariant: (row.artVariant as ArtVariant) ?? "berry",
  };
}

function mapDbReview(row: DbReview): Review {
  return {
    id: row.id,
    customer: row.customer,
    handle: row.handle ?? "",
    location: row.location ?? "",
    title: row.title,
    body: row.body,
    rating: row.rating,
    verified: row.verified,
    image: row.image,
    avatar:
      row.avatar ??
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    productSlug: row.product?.slug ?? null,
    featured: row.featured,
  };
}

function filterFallback({ category, bestsellersOnly, limit, search }: ProductQuery): Product[] {
  const categoryEnum = toCategoryEnum(category);
  let list = fallbackProducts;
  if (categoryEnum) list = list.filter((p) => p.category === categoryEnum);
  if (bestsellersOnly) list = list.filter((p) => p.isBestseller);
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.flavor.toLowerCase().includes(q),
    );
  }
  return limit ? list.slice(0, limit) : list;
}

export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  const { category, bestsellersOnly, limit, search } = query;
  const categoryEnum = toCategoryEnum(category);

  if (isDatabaseConfigured()) {
    try {
      const where: Prisma.ProductWhereInput = {};
      if (categoryEnum) where.category = categoryEnum;
      if (bestsellersOnly) where.isBestseller = true;
      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { subtitle: { contains: search, mode: "insensitive" } },
          { flavor: { contains: search, mode: "insensitive" } },
        ];
      }

      const rows = await prisma.product.findMany({
        where,
        orderBy: [{ isBestseller: "desc" }, { createdAt: "asc" }],
        take: limit,
      });
      if (rows.length > 0) return rows.map(mapDbProduct);
    } catch (error) {
      console.warn("[nutriiva] Falling back to demo catalog:", (error as Error).message);
    }
  }

  return filterFallback(query);
}

export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  if (isDatabaseConfigured()) {
    try {
      const row = await prisma.product.findUnique({ where: { slug } });
      if (row) return mapDbProduct(row);
    } catch (error) {
      console.warn("[nutriiva] Falling back to demo product:", (error as Error).message);
    }
  }
  return findProduct(slug) ?? null;
});

export async function getReviews(limit = 6): Promise<Review[]> {
  if (isDatabaseConfigured()) {
    try {
      const rows = await prisma.review.findMany({
        include: { product: { select: { slug: true } } },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        take: limit,
      });
      if (rows.length > 0) return rows.map(mapDbReview);
    } catch (error) {
      console.warn("[nutriiva] Falling back to demo reviews:", (error as Error).message);
    }
  }
  return fallbackReviews.slice(0, limit);
}

export async function getBundles(): Promise<BundleTier[]> {
  if (isDatabaseConfigured()) {
    try {
      const rows = await prisma.bundle.findMany({
        where: { isActive: true },
        orderBy: { packSize: "asc" },
      });
      if (rows.length > 0) {
        return rows.map((row) => ({
          id: row.id,
          slug: row.slug,
          name: row.name,
          packSize: row.packSize,
          price: row.price,
          compareAtPrice: row.compareAtPrice,
          badge: row.badge,
          discountRate:
            row.compareAtPrice > row.price
              ? Math.round(((row.compareAtPrice - row.price) / row.compareAtPrice) * 100) / 100
              : 0,
        }));
      }
    } catch (error) {
      console.warn("[nutriiva] Falling back to demo bundles:", (error as Error).message);
    }
  }
  return bundleTiers;
}
