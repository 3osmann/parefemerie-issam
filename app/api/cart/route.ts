import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CART_COOKIE = "nutriiva_cart";
const MAX_LINES = 30;
const MAX_QUANTITY = 10;

type IncomingItem = {
  productId: string;
  quantity: number;
  purchaseType: string;
};

function normalizeItems(input: unknown): IncomingItem[] {
  if (!Array.isArray(input)) return [];
  const deduped = new Map<string, IncomingItem>();
  for (const raw of input.slice(0, MAX_LINES)) {
    if (!raw || typeof raw !== "object") continue;
    const item = raw as Record<string, unknown>;
    if (typeof item.productId !== "string" || !item.productId) continue;
    const quantity = Number(item.quantity);
    const purchaseType = item.purchaseType === "subscription" ? "subscription" : "one_time";
    const safeQuantity = Number.isFinite(quantity)
      ? Math.min(Math.max(Math.trunc(quantity), 1), MAX_QUANTITY)
      : 1;
    deduped.set(`${item.productId}:${purchaseType}`, {
      productId: item.productId,
      quantity: safeQuantity,
      purchaseType,
    });
  }
  return [...deduped.values()];
}

async function resolveCart() {
  const store = await cookies();
  let sessionId = store.get(CART_COOKIE)?.value;
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    store.set(CART_COOKIE, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return prisma.cart.upsert({
    where: { sessionId },
    update: {},
    create: { sessionId },
  });
}

async function loadCart(cartId: string) {
  const items = await prisma.cartItem.findMany({
    where: { cartId },
    include: { product: true },
    orderBy: { id: "asc" },
  });
  return items.map((item) => ({
    id: item.id,
    productId: item.productId,
    quantity: item.quantity,
    purchaseType: item.purchaseType,
    product: {
      slug: item.product.slug,
      name: item.product.name,
      price: item.product.price,
      flavor: item.product.flavor,
    },
  }));
}

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ items: [], persisted: false, source: "demo" });
  }
  try {
    const cart = await resolveCart();
    const items = await loadCart(cart.id);
    return NextResponse.json({ items, persisted: true, source: "neon" });
  } catch (error) {
    console.error("[api/cart:GET]", error);
    return NextResponse.json({ items: [], persisted: false, source: "demo" });
  }
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ items: [], persisted: false, source: "demo" });
  }
  try {
    const body = (await request.json()) as { productId?: unknown; quantity?: unknown; purchaseType?: unknown };
    const [item] = normalizeItems([
      { productId: body.productId, quantity: body.quantity, purchaseType: body.purchaseType },
    ]);
    if (!item) return NextResponse.json({ error: "Invalid cart item" }, { status: 400 });

    const product = await prisma.product.findUnique({ where: { id: item.productId }, select: { id: true } });
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    const cart = await resolveCart();
    await prisma.cartItem.upsert({
      where: {
        cartId_productId_purchaseType: {
          cartId: cart.id,
          productId: item.productId,
          purchaseType: item.purchaseType,
        },
      },
      update: { quantity: { increment: item.quantity } },
      create: {
        cartId: cart.id,
        productId: item.productId,
        quantity: item.quantity,
        purchaseType: item.purchaseType,
      },
    });
    const items = await loadCart(cart.id);
    return NextResponse.json({ items, persisted: true, source: "neon" });
  } catch (error) {
    console.error("[api/cart:POST]", error);
    return NextResponse.json({ error: "Unable to add to cart" }, { status: 500 });
  }
}

/** Replace the entire bag — used by the client when syncing localStorage. */
export async function PUT(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ items: [], persisted: false, source: "demo" });
  }
  try {
    const body = (await request.json()) as { items?: unknown };
    const items = normalizeItems(body.items);
    const cart = await resolveCart();
    const knownProducts = await prisma.product.findMany({
      where: { id: { in: items.map((item) => item.productId) } },
      select: { id: true },
    });
    const allowed = new Set(knownProducts.map((product) => product.id));
    const valid = items.filter((item) => allowed.has(item.productId));

    await prisma.$transaction([
      prisma.cartItem.deleteMany({ where: { cartId: cart.id } }),
      ...valid.map((item) =>
        prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: item.productId,
            quantity: item.quantity,
            purchaseType: item.purchaseType,
          },
        }),
      ),
    ]);

    return NextResponse.json({ items: await loadCart(cart.id), persisted: true, source: "neon" });
  } catch (error) {
    console.error("[api/cart:PUT]", error);
    return NextResponse.json({ error: "Unable to sync cart" }, { status: 500 });
  }
}

export async function DELETE() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ items: [], persisted: false, source: "demo" });
  }
  try {
    const store = await cookies();
    const sessionId = store.get(CART_COOKIE)?.value;
    if (sessionId) {
      const cart = await prisma.cart.findUnique({ where: { sessionId } });
      if (cart) await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    }
    return NextResponse.json({ items: [], persisted: true, source: "neon" });
  } catch (error) {
    console.error("[api/cart:DELETE]", error);
    return NextResponse.json({ error: "Unable to clear cart" }, { status: 500 });
  }
}
