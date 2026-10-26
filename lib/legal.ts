export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  sections: LegalSection[];
};

export const legalDocuments: Record<string, LegalDocument> = {
  terms: {
    slug: "terms",
    title: "Terms of service",
    summary:
      "The plain-English agreement between you and Nutriiva Wellness, Inc. By shopping with us you agree to these terms.",
    updated: "March 1, 2026",
    sections: [
      {
        heading: "1. Who we are",
        paragraphs: [
          "Nutriiva Wellness, Inc. (\"Nutriiva\", \"we\", \"us\") sells dietary supplements and related products through this website. Our registered office is 218 Rosewood Avenue, Suite 04, Austin, TX 78704.",
          "These terms apply to every order placed through nutriiva.com, including subscription orders and bundle purchases.",
        ],
      },
      {
        heading: "2. Orders and pricing",
        paragraphs: [
          "All prices are listed in US dollars. We reserve the right to correct pricing errors before an order ships, and we will always contact you first if the corrected price is higher.",
          "An order is accepted when we send your confirmation email. If an item is unavailable we may cancel and refund that item without affecting the rest of your order.",
        ],
      },
      {
        heading: "3. Subscriptions",
        paragraphs: [
          "Subscription orders renew every 30 days at the price shown at checkout, unless you skip, pause or cancel before the renewal date. You can manage everything from your account in two clicks.",
          "If a subscription payment fails we will retry once and email you. You will never be charged a cancellation fee.",
        ],
      },
      {
        heading: "4. 90-day glow guarantee",
        paragraphs: [
          "Take any product daily for 90 days. If you do not feel a difference, email hello@nutriiva.com with your order number and we will refund the full purchase price — including opened jars.",
          "The guarantee applies once per customer per product and does not require you to return anything. Refunds are issued to the original payment method within 5–10 business days.",
        ],
      },
      {
        heading: "5. Product use and disclaimers",
        paragraphs: [
          "Our products are dietary supplements, not medicines. They are not intended to diagnose, treat, cure or prevent any disease, and these statements have not been evaluated by the Food and Drug Administration.",
          "Consult a qualified healthcare professional before starting any supplement, especially if you are pregnant, nursing, taking medication or managing a medical condition.",
        ],
      },
      {
        heading: "6. Acceptable use",
        paragraphs: [
          "You agree not to resell products purchased through this site without a wholesale agreement, scrape or disrupt the site, or use it for unlawful purposes.",
          "All content on this site — including copy, product artwork and photography — is owned by Nutriiva or licensed to us and may not be reproduced without permission.",
        ],
      },
      {
        heading: "7. Contact",
        paragraphs: [
          "Questions about these terms? Email hello@nutriiva.com or write to Nutriiva Wellness, Inc., 218 Rosewood Avenue, Suite 04, Austin, TX 78704.",
        ],
      },
    ],
  },
  privacy: {
    slug: "privacy",
    title: "Privacy policy",
    summary:
      "What we collect, why we collect it, and the simple controls you have. We do not sell your personal information.",
    updated: "March 1, 2026",
    sections: [
      {
        heading: "What we collect",
        paragraphs: [
          "When you place an order we collect your name, email, shipping address, order history and the last four digits of your payment card (full card details are processed by our payment provider and never stored on our servers).",
          "When you browse we collect anonymised analytics such as pages viewed, device type, referring site and approximate region. You can opt out of non-essential cookies at any time.",
        ],
      },
      {
        heading: "How we use it",
        paragraphs: [
          "We use your information to fulfil orders, provide support, personalise product recommendations, prevent fraud and — only if you opt in — send marketing emails.",
          "We do not sell, rent or trade your personal information. We share it only with processors who help us run the store (payments, shipping, email, analytics) under contractual confidentiality obligations.",
        ],
      },
      {
        heading: "Cookies and analytics",
        paragraphs: [
          "Essential cookies keep your bag and session working. Analytics cookies help us understand which pages are useful. You can clear or block cookies in your browser without losing access to the store.",
          "We use aggregated, de-identified data for reporting and never attempt to re-identify visitors.",
        ],
      },
      {
        heading: "Your choices",
        bullets: [
          "Access, correct or delete your personal data by emailing privacy@nutriiva.com.",
          "Unsubscribe from marketing with one click in any email.",
          "Request a copy of your order history at any time.",
        ],
        paragraphs: [
          "We respond to verified requests within 30 days. Depending on where you live, you may also have the right to lodge a complaint with your local data protection authority.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "Order records are kept for seven years for tax and warranty purposes. Marketing preferences are kept until you withdraw consent. Analytics data is retained for 14 months in aggregate form.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Data controller: Nutriiva Wellness, Inc., 218 Rosewood Avenue, Suite 04, Austin, TX 78704. Email privacy@nutriiva.com with any questions.",
        ],
      },
    ],
  },
  shipping: {
    slug: "shipping",
    title: "Shipping & returns",
    summary:
      "Free shipping over $65, carbon-neutral delivery, and a 90-day guarantee that does not require you to return empty jars.",
    updated: "March 1, 2026",
    sections: [
      {
        heading: "Processing times",
        paragraphs: [
          "Orders placed before 2pm CT on a business day are packed and handed to the carrier the same day. Orders placed later ship the next business day.",
          "You will receive a tracking link by email as soon as your parcel is scanned. If it has not arrived within 48 hours, check your spam folder or email hello@nutriiva.com.",
        ],
      },
      {
        heading: "Delivery options",
        bullets: [
          "Standard (3–5 business days): $5.99, free on orders over $65.",
          "Express (1–2 business days): $12.99, available at checkout.",
          "Subscriptions always ship free, regardless of order value.",
          "We currently ship to all 50 US states and Canada.",
        ],
        paragraphs: [
          "Delivery estimates are business days and exclude weekends and federal holidays. Remote areas may add one additional day.",
        ],
      },
      {
        heading: "Returns and the 90-day guarantee",
        paragraphs: [
          "You have 90 days from delivery to try any product. If it is not for you, email hello@nutriiva.com with your order number for a full refund — opened jars included. No return shipping is required.",
          "For damaged or incorrect items, send us a photo within 14 days and we will replace or refund immediately.",
        ],
      },
      {
        heading: "Subscriptions and address changes",
        paragraphs: [
          "You can skip, pause, swap or cancel a subscription from your account at any time before the next renewal. Address changes made before 2pm CT apply to the same day's shipment.",
          "If a parcel is returned to us as undeliverable, we will contact you to arrange reshipment. A second shipping fee may apply.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: ["Email hello@nutriiva.com — a real human replies within one business day."],
      },
    ],
  },
  accessibility: {
    slug: "accessibility",
    title: "Accessibility statement",
    summary:
      "We want every person to be able to shop, learn and get support here. Here is where we are and how to reach us.",
    updated: "March 1, 2026",
    sections: [
      {
        heading: "Our commitment",
        paragraphs: [
          "Nutriiva aims to meet WCAG 2.2 AA across the store. That means readable contrast, keyboard-friendly controls, visible focus states, meaningful alt text and respect for reduced-motion preferences.",
          "Accessibility is ongoing work, not a badge. We audit new sections before launch and fix issues as we find them.",
        ],
      },
      {
        heading: "What we have implemented",
        bullets: [
          "Semantic landmarks, skip-to-content link and logical heading order.",
          "Keyboard-operable navigation, drawers, accordions and product controls.",
          "Reduced-motion support that disables decorative animation.",
          "Colour combinations checked against WCAG contrast targets.",
          "Form labels, error messages and status announcements for assistive technology.",
        ],
        paragraphs: [],
      },
      {
        heading: "Known limitations",
        paragraphs: [
          "Some product imagery is illustrative SVG artwork. Where a chart or decorative graphic conveys no information, it is hidden from assistive technology.",
          "Third-party payment and video embeds may not fully meet our standards; we link to accessible alternatives where possible.",
        ],
      },
      {
        heading: "Tell us what is not working",
        paragraphs: [
          "If a page is difficult to use, email accessibility@nutriiva.com with the page address and a short description. We aim to acknowledge within two business days and to fix confirmed issues within 30 days.",
          "You can also write to us at Nutriiva Wellness, Inc., 218 Rosewood Avenue, Suite 04, Austin, TX 78704.",
        ],
      },
    ],
  },
};

export const legalSlugs = Object.keys(legalDocuments);
