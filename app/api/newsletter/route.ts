import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: unknown; source?: unknown };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    const source = typeof body.source === "string" ? body.source.slice(0, 40) : "footer";

    if (isDatabaseConfigured()) {
      await prisma.subscriber.upsert({
        where: { email },
        update: { source },
        create: { email, source },
      });
    }

    return NextResponse.json({
      ok: true,
      persisted: isDatabaseConfigured(),
      source: isDatabaseConfigured() ? "neon" : "demo",
      message: "You're in. Check your inbox for 10% off.",
    });
  } catch (error) {
    console.error("[api/newsletter]", error);
    return NextResponse.json({ error: "Could not join the list. Try again." }, { status: 500 });
  }
}
