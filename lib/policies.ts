/**
 * Provisional policy content observed from the legacy OrisYard site.
 * Do not treat as final business rules until owner-confirmed.
 */

export type PolicyItem = {
  id: string;
  title: string;
  body: string;
};

export const POLICIES_INTRO =
  "Please read before placing your order. These policies are carried over from the previous OrisYard site and are marked provisional until confirmed.";

export const POLICIES: PolicyItem[] = [
  {
    id: "deposit",
    title: "Deposit for Cakes",
    body: "50% non-refundable deposit required to secure a cake order. Remaining balance due 2 days before pickup date.",
  },
  {
    id: "shipping-payment",
    title: "Shipping Orders",
    body: "Items that need to be shipped must be paid in full to secure the order. No exceptions.",
  },
  {
    id: "custom-designs",
    title: "Custom Designs",
    body: "Custom designs should be ordered 2–3 weeks in advance to ensure all decorations arrive on time.",
  },
  {
    id: "one-flavor",
    title: "One Flavor Per Product",
    body: "Only one cake flavor per product. Please choose your flavor when placing your order.",
  },
  {
    id: "lead-time",
    title: "Order in Advance",
    body: "Orders must be placed at least 1 week before pickup date. Orders placed after will be considered a rush order — contact for more info.",
  },
  {
    id: "payment",
    title: "Payment Methods",
    body: "We accept Apple Pay and Cash App only.",
  },
];

export const SHIPPING_POLICY = {
  title: "Shipping",
  summary:
    "Love OrisYard but not in Indiana? Freshly baked cookies can ship nationwide. Shipping starts at $10.",
  notes: [
    "Shipping is described on the legacy site as cookies only.",
    "Shipping orders must be paid in full upfront.",
    "Most orders arrive within 2–4 business days anywhere in the continental USA (legacy site claim).",
  ],
  provisional: true as const,
};
