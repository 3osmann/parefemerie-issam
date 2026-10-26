import { NextResponse } from "next/server";
import { getProductBySlug, getReviews } from "@/lib/queries";

export const runtime = "nodejs";
export const revalidate = 60;

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const reviews = (await getReviews(12)).filter((review) => review.productSlug === slug);
    return NextResponse.json({ product, reviews });
  } catch (error) {
    console.error("[api/products/:slug]", error);
    return NextResponse.json({ error: "Unable to load product" }, { status: 500 });
  }
}
