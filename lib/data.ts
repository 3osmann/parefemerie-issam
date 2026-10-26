import type {
  BlogPost,
  BundleTier,
  CategoryTab,
  FaqItem,
  Product,
  ProductCategory,
  Review,
  SocialPost,
  ValueProp,
} from "./types";

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categoryLabels: Record<ProductCategory, CategoryTab> = {
  WEIGHT_LOSS: "Weight Loss",
  WELLNESS: "Wellness",
  SKIN: "Skin",
  HAIR: "Hair",
};

export const categoryTabs: CategoryTab[] = ["Weight Loss", "Wellness", "Skin", "Hair"];

export const categoryToEnum: Record<CategoryTab, ProductCategory> = {
  "Weight Loss": "WEIGHT_LOSS",
  Wellness: "WELLNESS",
  Skin: "SKIN",
  Hair: "HAIR",
};

export const FREE_SHIPPING_THRESHOLD = 6500;

/* -------------------------------------------------------------------------- */
/*                                  Products                                  */
/* -------------------------------------------------------------------------- */

export const products: Product[] = [
  {
    id: "prod_metaglow",
    slug: "metaglow-fat-burn",
    name: "MetaGlow™ Fat Burn",
    subtitle: "Metabolism igniter",
    description:
      "A gentle, jitter-free thermogenic built around green tea EGCG, L-carnitine and chromium. MetaGlow supports your metabolism, steadies cravings and gives you the kind of energy that doesn't crash at 3pm.",
    category: "WEIGHT_LOSS",
    categoryLabel: "Weight Loss",
    flavor: "Wild Raspberry",
    price: 4900,
    compareAtPrice: 6900,
    rating: 4.9,
    reviewCount: 2184,
    badge: "Save $20",
    accentFrom: "#F9B8C8",
    accentTo: "#E24C83",
    lidColor: "#4A1525",
    labelColor: "#FFF6F1",
    isBestseller: true,
    isBundle: false,
    ingredients: ["Green Tea EGCG", "L-Carnitine", "Chromium", "Vitamin B12", "Raspberry Extract"],
    benefits: ["Supports daily metabolism", "Curbs sweet cravings", "Clean, steady energy"],
    artVariant: "berry",
  },
  {
    id: "prod_gutreset",
    slug: "gut-reset-greens",
    name: "Gut Reset Greens",
    subtitle: "Daily debloat blend",
    description:
      "23 organic greens, prebiotic fibre and digestive enzymes in a minty-apple blend that actually tastes good. A calmer gut, a flatter morning, and one less thing to think about.",
    category: "WELLNESS",
    categoryLabel: "Wellness",
    flavor: "Minty Apple",
    price: 4400,
    compareAtPrice: 5900,
    rating: 4.8,
    reviewCount: 1452,
    badge: "Save $15",
    accentFrom: "#D3E7C9",
    accentTo: "#7BAA6E",
    lidColor: "#3F5A3A",
    labelColor: "#F8F5E9",
    isBestseller: true,
    isBundle: false,
    ingredients: ["Spirulina", "Chlorella", "Inulin", "Apple Pectin", "Digestive Enzymes"],
    benefits: ["Reduces bloating", "Feeds good bacteria", "Gentle daily detox"],
    artVariant: "greens",
  },
  {
    id: "prod_glowstack",
    slug: "glow-stack-bundle",
    name: "Glow Stack Bundle",
    subtitle: "The 3-step skin ritual",
    description:
      "Our three most-loved beauty formulas in one ritual: Collagen Glow, MetaGlow and Gut Reset Greens. Three months of skin, energy and digestion support — bundled for less.",
    category: "SKIN",
    categoryLabel: "Skin",
    flavor: "Berry Trio",
    price: 8900,
    compareAtPrice: 12900,
    rating: 4.9,
    reviewCount: 986,
    badge: "Save $40",
    accentFrom: "#F8C9D9",
    accentTo: "#C94C7C",
    lidColor: "#4A1525",
    labelColor: "#FFF6F1",
    isBestseller: true,
    isBundle: true,
    ingredients: ["Collagen Peptides", "Green Tea EGCG", "Organic Greens", "Vitamin C", "Biotin"],
    benefits: ["Plumper-looking skin", "All-day energy", "Less bloating"],
    artVariant: "bundle",
  },
  {
    id: "prod_collagen",
    slug: "collagen-glow",
    name: "Collagen Glow",
    subtitle: "Skin, hair & nails",
    description:
      "10g of marine collagen peptides with hyaluronic acid, vitamin C and pearl extract. A peachy daily ritual for bounce, glow and stronger nails — no chalky aftertaste.",
    category: "SKIN",
    categoryLabel: "Skin",
    flavor: "Peach Bellini",
    price: 5400,
    compareAtPrice: 7200,
    rating: 4.8,
    reviewCount: 1830,
    badge: "Save $18",
    accentFrom: "#FFD9C7",
    accentTo: "#F19A79",
    lidColor: "#7A3A2B",
    labelColor: "#FFF7F2",
    isBestseller: true,
    isBundle: false,
    ingredients: ["Marine Collagen", "Hyaluronic Acid", "Vitamin C", "Pearl Extract", "Biotin"],
    benefits: ["Skin elasticity", "Hair thickness", "Nail strength"],
    artVariant: "peach",
  },
  {
    id: "prod_hairrevive",
    slug: "hair-revive-complex",
    name: "Hair Revive Complex",
    subtitle: "Density + shine",
    description:
      "A follicle-first blend of saw palmetto, bamboo silica and iron-supporting vitamins. Formulated for postpartum shedding, hormonal thinning and the ponytail you miss.",
    category: "HAIR",
    categoryLabel: "Hair",
    flavor: "Vanilla Fig",
    price: 4600,
    compareAtPrice: 6200,
    rating: 4.7,
    reviewCount: 742,
    badge: "Save $16",
    accentFrom: "#EBD3B8",
    accentTo: "#B88A5E",
    lidColor: "#5B3A26",
    labelColor: "#FFF9F1",
    isBestseller: false,
    isBundle: false,
    ingredients: ["Saw Palmetto", "Bamboo Silica", "Iron", "Zinc", "Vitamin D3"],
    benefits: ["Less shedding", "Fuller part-line", "Stronger strands"],
    artVariant: "caramel",
  },
  {
    id: "prod_hormone",
    slug: "hormone-harmony",
    name: "Hormone Harmony",
    subtitle: "Cycle support",
    description:
      "Adaptogens, myo-inositol and vitamin B6 for the weeks your body feels like a stranger. Chai rose, gently sweet, and designed to be taken every single day.",
    category: "WELLNESS",
    categoryLabel: "Wellness",
    flavor: "Chai Rose",
    price: 4200,
    compareAtPrice: 5600,
    rating: 4.9,
    reviewCount: 1205,
    badge: "Save $14",
    accentFrom: "#F3C6BC",
    accentTo: "#C46B5E",
    lidColor: "#5C2A2A",
    labelColor: "#FFF6F2",
    isBestseller: true,
    isBundle: false,
    ingredients: ["Myo-Inositol", "Ashwagandha", "Vitamin B6", "Rose Petal", "Cinnamon"],
    benefits: ["Hormone balance", "Calmer cycles", "Steadier mood"],
    artVariant: "rose",
  },
  {
    id: "prod_protein",
    slug: "lean-vanilla-protein",
    name: "Lean Vanilla Protein",
    subtitle: "21g plant protein",
    description:
      "A silky vanilla plant protein with 21g protein, 4g fibre and zero bloat. Blends into coffee, smoothies or a shaker bottle on the way out the door.",
    category: "WEIGHT_LOSS",
    categoryLabel: "Weight Loss",
    flavor: "Vanilla Cream",
    price: 3900,
    compareAtPrice: 5200,
    rating: 4.8,
    reviewCount: 2109,
    badge: "Save $13",
    accentFrom: "#F3E6C8",
    accentTo: "#D9B872",
    lidColor: "#6A4A22",
    labelColor: "#FFFBF2",
    isBestseller: true,
    isBundle: false,
    ingredients: ["Pea Protein", "Brown Rice Protein", "Chicory Root", "Vanilla Bean", "Monk Fruit"],
    benefits: ["Keeps you full", "Supports lean muscle", "No added sugar"],
    artVariant: "cream",
  },
  {
    id: "prod_sleep",
    slug: "sleep-repair",
    name: "Sleep & Repair",
    subtitle: "Nightly magnesium",
    description:
      "Triple magnesium with glycine and tart cherry for the deep, unbroken sleep that makes everything else work. Lavender honey flavour, dissolves in warm water.",
    category: "WELLNESS",
    categoryLabel: "Wellness",
    flavor: "Lavender Honey",
    price: 3800,
    compareAtPrice: 4900,
    rating: 4.9,
    reviewCount: 1633,
    badge: "Save $11",
    accentFrom: "#DED3F2",
    accentTo: "#9B85C7",
    lidColor: "#463A63",
    labelColor: "#FAF7FF",
    isBestseller: false,
    isBundle: false,
    ingredients: ["Magnesium Glycinate", "Magnesium Citrate", "Glycine", "Tart Cherry", "Lavender"],
    benefits: ["Falls asleep faster", "Fewer 3am wake-ups", "Morning recovery"],
    artVariant: "lavender",
  },
  {
    id: "prod_lash",
    slug: "lash-brow-boost",
    name: "Lash & Brow Boost",
    subtitle: "Growth serum",
    description:
      "A peptide-rich serum for sparse brows and short lashes. Clean, ophthalmologist-tested, and far less dramatic than the extensions you were considering.",
    category: "HAIR",
    categoryLabel: "Hair",
    flavor: "Unscented",
    price: 3400,
    compareAtPrice: 4500,
    rating: 4.6,
    reviewCount: 538,
    badge: "Save $11",
    accentFrom: "#E9D6C6",
    accentTo: "#B08868",
    lidColor: "#4A2B1E",
    labelColor: "#FFFBF5",
    isBestseller: false,
    isBundle: false,
    ingredients: ["Myristoyl Pentapeptide", "Biotin", "Panthenol", "Hyaluronic Acid", "Aloe"],
    benefits: ["Longer-looking lashes", "Fuller brows", "Conditioned follicles"],
    artVariant: "bronze",
  },
];

export const featuredProducts = products.slice(0, 8);

export function findProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

/* -------------------------------------------------------------------------- */
/*                                   Bundles                                  */
/* -------------------------------------------------------------------------- */

export const bundleTiers: BundleTier[] = [
  {
    id: "tier_5",
    slug: "starter-five",
    name: "The Starter Five",
    packSize: 5,
    price: 15900,
    compareAtPrice: 19500,
    badge: null,
    discountRate: 0.2,
  },
  {
    id: "tier_10",
    slug: "ritual-ten",
    name: "The Ritual Ten",
    packSize: 10,
    price: 27900,
    compareAtPrice: 39000,
    badge: "Most popular",
    discountRate: 0.25,
  },
  {
    id: "tier_15",
    slug: "transform-fifteen",
    name: "The Transform Fifteen",
    packSize: 15,
    price: 37900,
    compareAtPrice: 58500,
    badge: "Best value",
    discountRate: 0.3,
  },
];

/* -------------------------------------------------------------------------- */
/*                                   Reviews                                  */
/* -------------------------------------------------------------------------- */

export const reviews: Review[] = [
  {
    id: "rev_maya",
    customer: "Maya R.",
    handle: "@mayaonamission",
    location: "Austin, TX",
    title: "The only thing I've actually stuck with",
    body:
      "I've quit every supplement I've ever bought by week two. I'm on month three of MetaGlow and down 19 pounds — but honestly? It's the 2pm energy that keeps me reordering.",
    rating: 5,
    verified: true,
    image: img("photo-1571019614242-c5c5dee9f50b", 900),
    avatar: img("photo-1494790108377-be9c29b29330", 200),
    productSlug: "metaglow-fat-burn",
    featured: true,
  },
  {
    id: "rev_priya",
    customer: "Priya S.",
    handle: "@priyaglow",
    location: "London, UK",
    title: "My skin has never looked better",
    body:
      "I started Collagen Glow for my hair and stayed for the skin. Fine lines around my eyes are softer and my nails stopped peeling. It dissolves completely — no weird texture.",
    rating: 5,
    verified: true,
    image: null,
    avatar: img("photo-1524504388940-b1c1722653e1", 200),
    productSlug: "collagen-glow",
    featured: true,
  },
  {
    id: "rev_jess",
    customer: "Jess T.",
    handle: "@jessreset",
    location: "Toronto, CA",
    title: "Greens that don't taste like a lawn",
    body:
      "The minty apple is genuinely delicious. My bloating after dinner is gone and I'm finally regular. I've converted two coworkers already.",
    rating: 5,
    verified: true,
    image: img("photo-1511690743698-d9d85f2fbf38", 900),
    avatar: img("photo-1534528741775-53994a69daeb", 200),
    productSlug: "gut-reset-greens",
    featured: true,
  },
  {
    id: "rev_camille",
    customer: "Camille D.",
    handle: "@camillefit",
    location: "Miami, FL",
    title: "Postpartum hair, handled",
    body:
      "Four months of Hair Revive and my part-line is filling in. I cried in the mirror, which feels dramatic, but here we are. The bundle pricing made it a no-brainer.",
    rating: 5,
    verified: true,
    image: null,
    avatar: img("photo-1544005313-94ddf0286df2", 200),
    productSlug: "hair-revive-complex",
  },
  {
    id: "rev_noor",
    customer: "Noor A.",
    handle: "@noorwellness",
    location: "Dubai, UAE",
    title: "No jitters. Just steady energy.",
    body:
      "I'm sensitive to caffeine and MetaGlow doesn't spike me at all. I take it before my morning walk and I'm good until lunch. The raspberry flavour is unreal.",
    rating: 5,
    verified: true,
    image: null,
    avatar: img("photo-1531123897727-8f129e1688ce", 200),
    productSlug: "metaglow-fat-burn",
  },
  {
    id: "rev_hannah",
    customer: "Hannah K.",
    handle: "@hannahkruns",
    location: "Seattle, WA",
    title: "The bundle saved me $60 a month",
    body:
      "I was buying three separate products from three brands. Building a 10-pack here cut my monthly spend and my cabinet clutter. The quiz actually got my picks right.",
    rating: 5,
    verified: true,
    image: null,
    avatar: img("photo-1508214751196-bcfd4ca60f91", 200),
    productSlug: "glow-stack-bundle",
  },
];

/* -------------------------------------------------------------------------- */
/*                                    Social                                  */
/* -------------------------------------------------------------------------- */

export const socialPosts: SocialPost[] = [
  {
    id: "soc_1",
    image: img("photo-1518310383802-640c2de311b2", 800),
    handle: "@mayaonamission",
    caption: "Day 60. Same jeans, different human.",
    likes: 4820,
    tall: true,
  },
  {
    id: "soc_2",
    image: img("photo-1511690743698-d9d85f2fbf38", 800),
    handle: "@jessreset",
    caption: "Greens + sunshine. That's the whole routine.",
    likes: 2140,
  },
  {
    id: "soc_3",
    image: img("photo-1571019613454-1cb2f99b2d8b", 800),
    handle: "@camillefit",
    caption: "Strong is the goal. Glow is the side effect.",
    likes: 6390,
    tall: true,
  },
  {
    id: "soc_4",
    image: img("photo-1600334129128-685c5582fd35", 800),
    handle: "@noorwellness",
    caption: "Sunday reset, in powder form.",
    likes: 1870,
  },
  {
    id: "soc_5",
    image: img("photo-1490645935967-10de6ba17061", 800),
    handle: "@priyaglow",
    caption: "Lunch that loves your gut back.",
    likes: 3020,
  },
  {
    id: "soc_6",
    image: img("photo-1550345332-09e3ac987658", 800),
    handle: "@hannahkruns",
    caption: "10k, then collagen. In that order.",
    likes: 4410,
    tall: true,
  },
];

/* -------------------------------------------------------------------------- */
/*                                    Blog                                    */
/* -------------------------------------------------------------------------- */

export const blogPosts: BlogPost[] = [
  {
    id: "blog_1",
    slug: "metabolism-after-30",
    category: "Nutrition",
    title: "Your metabolism isn't broken — your routine is",
    excerpt:
      "What actually moves the needle after 30 (spoiler: it isn't 5am cardio), and the three daily habits our nutritionists swear by.",
    readTime: "6 min read",
    image: img("photo-1490645935967-10de6ba17061", 1000),
    author: "Dr. Lena Ortiz, RD",
  },
  {
    id: "blog_2",
    slug: "gut-skin-axis",
    category: "Skin Care",
    title: "The gut–skin axis, explained simply",
    excerpt:
      "Your breakouts might start in your stomach. Here's how digestion shapes your glow — and the gentle reset that helps both.",
    readTime: "4 min read",
    image: img("photo-1570172619644-dfd03ed5d881", 1000),
    author: "Nadia Chen",
  },
  {
    id: "blog_3",
    slug: "peach-collagen-smoothie",
    category: "Recipes",
    title: "The 3-minute peach collagen smoothie",
    excerpt:
      "Creamy, peachy, and packed with 10g of collagen. This is the breakfast we make when the morning is already winning.",
    readTime: "3 min read",
    image: img("photo-1553530666-ba11a7da3888", 1000),
    author: "Nutriiva Kitchen",
  },
  {
    id: "blog_4",
    slug: "protein-without-bloat",
    category: "Diet",
    title: "How to hit 100g of protein without the bloat",
    excerpt:
      "A realistic day of eating from a women's health dietitian, including the swaps that keep your gut calm.",
    readTime: "7 min read",
    image: img("photo-1498837167922-ddd27525d352", 1000),
    author: "Dr. Lena Ortiz, RD",
  },
];

/* -------------------------------------------------------------------------- */
/*                                    FAQs                                    */
/* -------------------------------------------------------------------------- */

export const faqs: FaqItem[] = [
  {
    id: "faq_1",
    question: "How is Nutriiva different from other supplement brands?",
    answer:
      "Every formula is developed with women's health practitioners, third-party tested for purity, and dosed at clinical levels — not fairy dust. We skip proprietary blends, artificial dyes and the 14 ingredients you can't pronounce. If it doesn't earn its place in the jar, it's not in there.",
  },
  {
    id: "faq_2",
    question: "How does the 30% bundle saving work?",
    answer:
      "Build a bundle of 5, 10 or 15 products and the discount is applied automatically at checkout — 20% off a 5-pack, 25% off a 10-pack and 30% off a 15-pack. You can mix any products, and you can change your bundle before your next renewal.",
  },
  {
    id: "faq_3",
    question: "When will I start seeing results?",
    answer:
      "Most customers notice energy and digestion shifts within 7–10 days. Skin and hair changes typically show at the 6–8 week mark because that's how long a full skin and follicle cycle takes. We recommend committing to 90 days — which is exactly why the bundles exist.",
  },
  {
    id: "faq_4",
    question: "Is the subscription flexible? Can I cancel anytime?",
    answer:
      "Completely. Skip, pause, swap a flavour or cancel from your account in two clicks — no phone calls, no retention scripts. Subscribers also get 15% off every delivery and free shipping, always.",
  },
  {
    id: "faq_5",
    question: "What if it doesn't work for me?",
    answer:
      "Take it daily for 90 days. If you don't feel a difference, email hello@nutriiva.com and we'll refund your full order — even the empty jars. That's our 90-day glow guarantee, and we've honoured it since day one.",
  },
  {
    id: "faq_6",
    question: "Are the products third-party tested and safe?",
    answer:
      "Yes. Each batch is tested by an independent ISO 17025 lab for heavy metals, microbes and label accuracy, and every jar has a batch code you can look up. Our formulas are made in a cGMP-certified facility in the USA. If you're pregnant, nursing or on medication, have a chat with your doctor first.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                Value props                                 */
/* -------------------------------------------------------------------------- */

export const valueProps: ValueProp[] = [
  {
    id: "val_science",
    title: "Science-backed formulas",
    body:
      "Created with women's health practitioners and dosed at clinical levels. Third-party tested, always.",
    tone: "blush",
    icon: "flask",
  },
  {
    id: "val_flavor",
    title: "Ridiculously good flavours",
    body:
      "Wild raspberry. Peach bellini. Minty apple. You'll look forward to your daily scoop — genuinely.",
    tone: "sage",
    icon: "fruit",
  },
  {
    id: "val_beauty",
    title: "Metabolism + beauty boost",
    body:
      "One ritual that works on energy, digestion, skin, hair and nails. Because you're not one thing.",
    tone: "cream",
    icon: "bloom",
  },
  {
    id: "val_bs",
    title: "Zero B.S.",
    body:
      "No proprietary blends, no artificial dyes, no 47-ingredient fairy dust. Just what works, at the dose that works.",
    tone: "sand",
    icon: "zero",
  },
];

/* -------------------------------------------------------------------------- */
/*                                    Quiz                                    */
/* -------------------------------------------------------------------------- */

export type QuizOption = {
  label: string;
  description: string;
  category: ProductCategory;
};

export type QuizQuestion = {
  id: string;
  question: string;
  eyebrow: string;
  options: QuizOption[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "quiz_goal",
    question: "What would you love to change first?",
    eyebrow: "Question 01 — Your goal",
    options: [
      { label: "My energy & metabolism", description: "Less 3pm collapse, more steady get-up-and-go.", category: "WEIGHT_LOSS" },
      { label: "My digestion", description: "Less bloating, a happier gut, regular mornings.", category: "WELLNESS" },
      { label: "My skin & glow", description: "Bounce, brightness and a bit more confidence.", category: "SKIN" },
      { label: "My hair & nails", description: "Density, strength and less shedding.", category: "HAIR" },
    ],
  },
  {
    id: "quiz_routine",
    question: "How much time will you actually give it?",
    eyebrow: "Question 02 — Your routine",
    options: [
      { label: "One scoop, once a day", description: "Keep it simple — one product, one habit.", category: "WEIGHT_LOSS" },
      { label: "A morning + evening ritual", description: "I like a routine I can look forward to.", category: "WELLNESS" },
      { label: "A full 3-step stack", description: "I'm ready to go all in for 90 days.", category: "SKIN" },
      { label: "Whatever fits in my bag", description: "Travel-friendly, no fuss.", category: "HAIR" },
    ],
  },
  {
    id: "quiz_flavor",
    question: "Pick your flavour energy.",
    eyebrow: "Question 03 — Your flavour",
    options: [
      { label: "Fruity & bright", description: "Wild raspberry, peach, minty apple.", category: "WEIGHT_LOSS" },
      { label: "Creamy & cosy", description: "Vanilla, chai rose, lavender honey.", category: "WELLNESS" },
      { label: "Fresh & green", description: "Clean, minty, garden-fresh.", category: "SKIN" },
      { label: "Surprise me", description: "I trust the experts.", category: "HAIR" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                               Shortcut images                              */
/* -------------------------------------------------------------------------- */

export const images = {
  hero: img("photo-1571019613454-1cb2f99b2d8b", 1400),
  heroAlt: img("photo-1518310383802-640c2de311b2", 1200),
  videoPoster: img("photo-1518310383802-640c2de311b2", 1000),
  storyPoster: img("photo-1571019614242-c5c5dee9f50b", 1000),
  bundleFlatlay: img("photo-1511690743698-d9d85f2fbf38", 1200),
};
