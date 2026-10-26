import { NextResponse } from "next/server";
import { getProducts } from "@/lib/queries";
import { isDatabaseConfigured } from "@/lib/prisma";
import type { CategoryTab } from "@/lib/types";

export const runtime = "nodejs";
export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") as CategoryTab | "All" | null;
  const search = searchParams.get("q") ?? undefined;
  const bestsellersOnly = searchParams.get("bestsellers") === "true";
  const limitParam = Number(searchParams.get("limit"));
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 50) : undefined;

  try {
    const products = await getProducts({ category, search, bestsellersOnly, limit });
    return NextResponse.json(
      {
        products,
        count: products.length,
        source: isDatabaseConfigured() ? "neon" : "demo",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error("[api/products]", error);
    return NextResponse.json({ error: "Unable to load products" }, { status: 500 });
  }
}
