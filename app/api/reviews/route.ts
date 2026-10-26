import { NextResponse } from "next/server";
import { getReviews } from "@/lib/queries";
import { isDatabaseConfigured } from "@/lib/prisma";

export const runtime = "nodejs";
export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limitParam = Number(searchParams.get("limit"));
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 24) : 6;

  try {
    const reviews = await getReviews(limit);
    return NextResponse.json({
      reviews,
      count: reviews.length,
      source: isDatabaseConfigured() ? "neon" : "demo",
    });
  } catch (error) {
    console.error("[api/reviews]", error);
    return NextResponse.json({ error: "Unable to load reviews" }, { status: 500 });
  }
}
