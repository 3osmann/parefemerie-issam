import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * The storefront ships with a complete local catalog so the UI can be
 * previewed before Neon is connected. Once a real DATABASE_URL is present
 * every query below automatically prefers Postgres.
 */
export function isDatabaseConfigured() {
  const url = process.env.DATABASE_URL;
  if (!url) return false;
  if (url.includes("ep-xxxx")) return false;
  return url.startsWith("postgres");
}
