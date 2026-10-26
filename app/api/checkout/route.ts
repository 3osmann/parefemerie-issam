import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const STANDARD_SHIPPING = 599;

type IncomingLine = {
  productId: string | null;
  name: string;
  price: number;
  quantity: number;
};

function parseLines(input: unknown): IncomingLine[] {
  if (!Array.isArray(input)) return [];
  return input
    .slice(0, 30)
    .map((raw) => {
      if (!raw || typeof raw !== "object") return null;
      const line = raw as Record<string, unknown>;
      const price = Number(line.price);
      const quantity = Number(line.quantity);
      if (typeof line.name !== "string" || !line.name.trim()) return null;
      if (!Number.isFinite(price) || price <= 0 || price > 1_000_000) return null;
      if (!Number.isFinite(quantity) || quantity <= 0) return null;
      return {
        productId: typeof line.productId === "string" ? line.productId : null,
        name: line.name.slice(0, 140),
        price: Math.round(price),
        quantity: Math.min(Math.trunc(quantity), 20),
      } satisfies IncomingLine;
    })
    .filter((line): line is IncomingLine => line !== null);
}

function orderNumber() {
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `NRV-${new Date().getFullYear()}-${random}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: unknown;
      items?: unknown;
      discount?: unknown;
      isSubscription?: unknown;
    };

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "A valid email is required to check out." }, { status: 400 });
    }

    const items = parseLines(body.items);
    if (items.length === 0) {
      return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
    }

    const subtotal = items.reduce((total, line) => total + line.price * line.quantity, 0);
    const requestedDiscount = Number(body.discount);
    const discount = Number.isFinite(requestedDiscount)
      ? Math.min(Math.max(Math.round(requestedDiscount), 0), subtotal)
      : 0;
    const shipping = subtotal - discount >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
    const total = subtotal - discount + shipping;
    const number = orderNumber();
    const isSubscription = Boolean(body.isSubscription);

    if (!isDatabaseConfigured()) {
      // Demo mode — the storefront stays fully clickable before Neon is wired up.
      return NextResponse.json({
        order: {
          number,
          email,
          subtotal,
          discount,
          shipping,
          total,
          status: "PENDING",
          isSubscription,
          createdAt: new Date().toISOString(),
        },
        persisted: false,
        source: "demo",
        message: "Demo checkout complete. Connect Neon to persist orders.",
      });
    }

    const store = await cookies();
    const sessionId = store.get("nutriiva_cart")?.value;
    const cart = sessionId ? await prisma.cart.findUnique({ where: { sessionId } }) : null;

    // Never trust client prices when the catalog is available.
    const knownProducts = await prisma.product.findMany({
      where: { id: { in: items.map((i) => i.productId).filter((id): id is string => Boolean(id)) } },
      select: { id: true, price: true, name: true },
    });
    const priceById = new Map(knownProducts.map((product) => [product.id, product]));

    const verifiedItems = items.map((line) => {
      const known = line.productId ? priceById.get(line.productId) : undefined;
      return {
        productId: known?.id ?? null,
        name: known?.name ?? line.name,
        price: known?.price ?? line.price,
        quantity: line.quantity,
      };
    });
    const verifiedSubtotal = verifiedItems.reduce((sum, line) => sum + line.price * line.quantity, 0);
    const verifiedDiscount = Math.min(discount, verifiedSubtotal);
    const verifiedShipping = verifiedSubtotal - verifiedDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
    const verifiedTotal = verifiedSubtotal - verifiedDiscount + verifiedShipping;

    const order = await prisma.order.create({
      data: {
        number,
        cartId: cart?.id ?? null,
        email,
        subtotal: verifiedSubtotal,
        discount: verifiedDiscount,
        shipping: verifiedShipping,
        total: verifiedTotal,
        isSubscription,
        items: {
          create: verifiedItems.map((line) => ({
            productId: line.productId,
            name: line.name,
            price: line.price,
            quantity: line.quantity,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({
      order: {
        number: order.number,
        email: order.email,
        subtotal: order.subtotal,
        discount: order.discount,
        shipping: order.shipping,
        total: order.total,
        status: order.status,
        isSubscription: order.isSubscription,
        createdAt: order.createdAt,
      },
      persisted: true,
      source: "neon",
    });
  } catch (error) {
    console.error("[api/checkout]", error);
    return NextResponse.json({ error: "Checkout could not be completed. Please try again." }, { status: 500 });
  }
}
