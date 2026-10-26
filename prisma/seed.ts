import { PrismaClient } from "@prisma/client";
import { bundleTiers, products, reviews } from "../lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Nutriiva…");

  // Clean slate (order matters because of foreign keys).
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.bundleItem.deleteMany();
  await prisma.bundle.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subscriber.deleteMany();

  for (const [index, product] of products.entries()) {
    await prisma.product.create({
      data: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        subtitle: product.subtitle,
        description: product.description,
        category: product.category,
        flavor: product.flavor,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        rating: product.rating,
        reviewCount: product.reviewCount,
        badge: product.badge,
        accentFrom: product.accentFrom,
        accentTo: product.accentTo,
        lidColor: product.lidColor,
        labelColor: product.labelColor,
        artVariant: product.artVariant,
        isBestseller: product.isBestseller,
        isBundle: product.isBundle,
        ingredients: product.ingredients,
        benefits: product.benefits,
        createdAt: new Date(2026, 0, 1 + index),
      },
    });
  }
  console.log(`   • ${products.length} products`);

  const productIdBySlug = new Map(products.map((product) => [product.slug, product.id]));

  for (const review of reviews) {
    await prisma.review.create({
      data: {
        id: review.id,
        productId: review.productSlug ? productIdBySlug.get(review.productSlug) ?? null : null,
        customer: review.customer,
        handle: review.handle,
        location: review.location,
        title: review.title,
        body: review.body,
        rating: review.rating,
        verified: review.verified,
        image: review.image,
        avatar: review.avatar,
        featured: Boolean(review.featured),
      },
    });
  }
  console.log(`   • ${reviews.length} reviews`);

  for (const tier of bundleTiers) {
    const picks = products.slice(0, tier.packSize);
    await prisma.bundle.create({
      data: {
        id: tier.id,
        slug: tier.slug,
        name: tier.name,
        tagline: `${tier.packSize} products, one ritual. Mix and match your favourites.`,
        packSize: tier.packSize,
        price: tier.price,
        compareAtPrice: tier.compareAtPrice,
        badge: tier.badge,
        items: {
          create: picks.map((product) => ({
            productId: product.id,
            quantity: 1,
          })),
        },
      },
    });
  }
  console.log(`   • ${bundleTiers.length} bundles`);

  console.log("✅ Done. Your storefront now has a live catalog.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
