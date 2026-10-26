# Nutriiva

A conversion-focused, fully responsive storefront for **Nutriiva** — a fictional women's supplement brand. Built with Next.js App Router, TypeScript, Tailwind CSS, GSAP, React Three Fiber and a Neon/Prisma backend.

The experience includes a 3D jar-and-podium hero, a live bundle builder, a product catalog, customer stories, a ritual quiz, a journal and a persistent cart — all backed by a local demo catalog that upgrades to Postgres automatically when a database is connected.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 + custom design tokens |
| Motion | GSAP 3 + ScrollTrigger |
| 3D | Three.js, React Three Fiber, drei |
| Data | Prisma 6 + Neon Postgres |
| Icons | lucide-react |
| Fonts | Fraunces (display) + Manrope (sans), via `next/font` |

Palette: cream `#FFF8F4`, blush `#FCE4EC`, hot pink `#D81B60`, plum `#4A1525`.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Create your local env file
cp .env.example .env        # Windows PowerShell: Copy-Item .env.example .env

# 3. Start the dev server
npm run dev
```

Open <http://localhost:3000>.

> The storefront runs without a database. With the placeholder `DATABASE_URL` from `.env.example`, all pages and APIs use the local demo catalog in `lib/data.ts`. Add a real Neon connection string to switch to Postgres.

### Useful checks

```bash
npm run typecheck   # TypeScript
npm run build       # prisma generate + production build
npm run start       # serve the production build
```

---

## Environment variables

Create `.env` from `.env.example`:

```dotenv
# Neon pooled connection — used by the app at runtime
DATABASE_URL="postgresql://user:password@ep-xxxx-pooler.us-east-2.aws.neon.tech/nutriiva?sslmode=require&pgbouncer=true"

# Neon direct connection — used by Prisma migrations / db push
DIRECT_URL="postgresql://user:password@ep-xxxx.us-east-2.aws.neon.tech/nutriiva?sslmode=require"

# Optional
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_INSTAGRAM_HANDLE="nutriiva"
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | No | Pooled Neon connection. When missing, placeholder or unreachable, the app falls back to demo data. |
| `DIRECT_URL` | With DB | Direct Neon connection used by `prisma db push` / migrations. |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL for metadata and Open Graph. Defaults to `http://localhost:3000`. |
| `NEXT_PUBLIC_INSTAGRAM_HANDLE` | No | Social handle used by the storefront. |

`DATABASE_URL` is considered "configured" only when it starts with `postgres` and does not contain the `ep-xxxx` placeholder. Failed database queries also fall back to the local catalog, so a missing or sleeping Neon project never takes the storefront down.

---

## Connect Neon Postgres

1. Create a project at [neon.tech](https://neon.tech) and open **Connect**.
2. Copy both connection strings:
   - the **pooled** string (host contains `-pooler`) into `DATABASE_URL`, keeping `sslmode=require` and `pgbouncer=true`;
   - the **direct** string into `DIRECT_URL`.
3. Push the schema to the database:

   ```bash
   npm run db:push
   ```

   For a migration-based workflow use `npm run db:migrate` instead.

4. Seed the catalog, bundles, reviews and demo content:

   ```bash
   npm run db:seed
   ```

5. Optional: inspect the data in Prisma Studio:

   ```bash
   npm run db:studio
   ```

6. Restart `npm run dev`. The pages now read products and reviews from Neon.

### Seeding notes

- `prisma/seed.ts` clears transactional tables first, then recreates products, reviews, bundle tiers and subscribers from `lib/data.ts`.
- Prices are stored as integer **cents** (`4900` = `$49.00`) to avoid floating-point rounding.
- The seed is destructive by design for local/demo environments. Do not point it at production data you want to keep.

---

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Next.js development server |
| `npm run build` | `prisma generate` + optimized production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript, no emit |
| `npm run db:generate` | Generate the Prisma client |
| `npm run db:push` | Push the current schema to Neon |
| `npm run db:migrate` | Create/apply a development migration |
| `npm run db:seed` | Seed the database (`tsx prisma/seed.ts`) |
| `npm run db:studio` | Open Prisma Studio |
| `postinstall` | Generates the Prisma client after install |

---

## Pages

| Route | Description |
| --- | --- |
| `/` | Landing page: hero + 3D podium, value props, bestsellers, social wall, bundle builder, results, FAQ, journal, recently viewed |
| `/shop-all` | Catalog with category filters and search (`?category=`, `?q=`) |
| `/product/[slug]` | Product detail, subscription/one-time pricing, reviews, related products |
| `/quiz` | "Find your ritual" quiz with a personalised result |
| `/account` | Demo account dashboard and order history |
| `/journal` | Editorial index |
| `/journal/[slug]` | Article page |
| `/legal/[slug]` | Privacy, terms, shipping, returns and accessibility copy |
| `not-found` | Themed 404 with product shortcuts |

### API routes

| Route | Methods |
| --- | --- |
| `/api/products` | `GET` — filter by `category`, `q`, `bestsellers`, `limit` |
| `/api/products/[slug]` | `GET` |
| `/api/reviews` | `GET` — optional `product` filter |
| `/api/bundles` | `GET` |
| `/api/cart` | `GET`, `PUT` — best-effort server sync of the local cart |
| `/api/checkout` | `POST` — validates the cart and returns a demo order number |
| `/api/newsletter` | `POST` — stores a subscriber when a database is configured |

---

## Project structure

```
app/
  layout.tsx                 Root shell: fonts, metadata, cart provider, nav/footer
  page.tsx                   Landing page composition
  globals.css                Design tokens, utilities, contrast-safe muted type
  shop-all/ product/ quiz/ account/ journal/ legal/
  api/                       Products, reviews, bundles, cart, checkout, newsletter
components/
  hero/                      3D hero scene + jar meshes
  product/                   ProductCard, ProductArt (SVG jars), purchase panel
  sections/                  Hero, ValueProps, Bestsellers, SocialFeed, BundleBuilder,
                             ResultsSection, FaqSection, BlogSection, RecentlyViewed
  layout/                    AnnouncementBar, Navbar, MobileMenu, SearchPanel,
                             CartDrawer, CartToast, Footer, NewsletterForm
  ui/                        Stars, Reveal, StoryModal, Portal, SectionHeading…
lib/
  data.ts                    Local demo catalog, reviews, FAQs, quiz, editorial copy
  queries.ts                 Database-or-fallback data access
  prisma.ts                  Prisma singleton + isDatabaseConfigured()
  cart-context.tsx           localStorage-first cart (`nutriiva:bag:v1`)
  hooks.ts, gsap.ts, utils.ts, types.ts
prisma/
  schema.prisma              Product, Review, Bundle, Cart, Order, Subscriber
  seed.ts                    Deterministic demo seed
```

---

## Implementation notes

### 3D hero

`components/hero/HeroScene.tsx` renders a responsive React Three Fiber canvas with a three-tier podium, lathe-generated supplement jars, canvas-texture labels, soft lighting, contact shadows and a lightweight GLSL aura. The scene is dynamically mounted on the client, respects reduced motion, and resizes with the viewport. On very small or low-power devices the scene stays intentionally lightweight.

### Motion

- Scroll reveals use GSAP `ScrollTrigger` inside `gsap.context()` and are cleaned up on unmount.
- `prefers-reduced-motion: reduce` disables reveal animations and smooth scrolling while keeping all content visible.
- The FAQ accordion animates its height and rotates its indicator with GSAP.

### Cart and checkout

- The cart is stored in `localStorage` under `nutriiva:bag:v1`, so it survives reloads without an account.
- Adding a product opens the drawer and shows a toast.
- `PUT /api/cart` syncs the cart to Postgres on a best-effort basis; failures never block the UI.
- Checkout is a **demo**: `POST /api/checkout` validates the payload and returns a generated order number (for example `NRV-2026-XXXXX`). No payment is captured and no real order is placed.
- Bundle builder choices are capped atomically, so rapid clicks can never exceed the selected 5/10/15-pack size.

### Images

Product visuals are hand-built SVG jars (`components/product/ProductArt.tsx`) so they stay crisp at any size and work without external assets. Lifestyle, avatar, editorial and social images come from Unsplash; `next.config.ts` allow-lists `images.unsplash.com`.

### Data fallback

`lib/queries.ts` prefers Neon whenever `DATABASE_URL` is configured and wraps every query in a fallback path. If the database is unavailable, pages still render from `lib/data.ts`. This is why the repo can be cloned and previewed immediately with no credentials.

---

## Data model

- `Product` — catalog row, category enum, price in cents, ratings, art tokens, ingredients and benefits.
- `Review` — optional product relation, customer, rating, story image/avatar, featured flag.
- `Bundle` / `BundleItem` — preset bundle tiers and their products.
- `Cart` / `CartItem` — anonymous cart keyed by a client-generated cart key.
- `Order` / `OrderItem` — demo checkout records with status and totals.
- `Subscriber` — newsletter signups.

See `prisma/schema.prisma` for the full schema, indexes and relations.

---

## Quality checks

Verified with headless Chrome/Puppeteer and axe-core:

- **No console errors or page errors** across the storefront and 404 flow (the only console entry is the expected `404` network response when visiting a missing route).
- **No horizontal overflow** at 390, 768, 1024 and 1440 px; tablet carousels scroll inside their own containers.
- **Accessibility:** axe-core reports **0 violations** (WCAG 2.0/2.1 A/AA + best-practice) on home (desktop + mobile), product, shop, quiz, account, journal, legal and 404 pages, plus the open mobile menu, search panel, cart drawer and story modal.
- **Reduced motion:** all scroll-revealed content is visible with `prefers-reduced-motion: reduce`.
- **Flows tested:** mobile menu, search + Escape, story modal + Escape, 5/10/15-pack bundle building (including rapid clicks), add-to-cart drawer, demo checkout, quiz result, category filters, search/empty states and the 404 page.

To rerun the app checks:

```bash
npm run typecheck
npm run build
```

The QA scripts used during development live outside the repository (Puppeteer + axe-core in a scratch directory) and are not part of the production bundle.

---

## Deployment

### Vercel

1. Import the repository into Vercel.
2. Add `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_INSTAGRAM_HANDLE` in **Project → Settings → Environment Variables**.
3. Deploy. The build runs `prisma generate && next build`.
4. Run `npm run db:push` (or migrations) and `npm run db:seed` once against the production Neon branch.

### Other hosts

Any Node.js host that supports Next.js works. Build with `npm run build`, then run `npm run start`. Make sure the runtime has the same environment variables and outbound access to Neon.

---

## Demo limitations

This is a polished storefront demo, not a production commerce system:

- Checkout is simulated; there is no Stripe/payment integration.
- Accounts and order history are demo UI, not authenticated users.
- Product reviews and editorial content are seeded demo copy.
- Lifestyle imagery is sourced from Unsplash and should be replaced with licensed brand photography before launch.
- Newsletter and cart API writes are best-effort and degrade silently without a database.

---

Built for the Nutriiva brand concept. Fonts are loaded through `next/font`, so no external font requests are made at runtime.
