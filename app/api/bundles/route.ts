import { NextResponse } from "next/server";
import { getBundles } from "@/lib/queries";
import { isDatabaseConfigured } from "@/lib/prisma";

export const runtime = "nodejs";
export const revalidate = 60;

export async function GET() {
  try {
    const bundles = await getBundles();
    return NextResponse.json({
      bundles,
      source: isDatabaseConfigured() ? "neon" : "demo",
    });
  } catch (error) {
    console.error("[api/bundles]", error);
    return NextResponse.json({ error: "Unable to load bundles" }, { status: 500 });
  }
}
