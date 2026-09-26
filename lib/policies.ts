/**
 * Policies. Sections marked `confirmed: false` have no approved text yet and
 * are shown as "details coming soon" — never invent policy text.
 */

export type PolicySection = {
  id: string;
  title: string;
  confirmed: boolean;
  body: string[];
};

export const POLICY_SECTIONS: PolicySection[] = [
  {
    id: "custom-cakes",
    title: "Custom Cake Inquiries",
    confirmed: true,
    body: [
      "Submitting an inquiry does not guarantee availability.",
      "Prices on the website are starting estimates.",
      "Your final price can change based on design complexity, decorations, materials, and detailed piping.",
      "Your order is booked only after we review your request, send your final quote/invoice, and the required payment is completed.",
    ],
  },
  {
    id: "inspiration",
    title: "Inspiration Photos",
    confirmed: true,
    body: [
      "Inspiration photos are used as a reference. Each Orisyard cake is handmade, so exact replicas are not guaranteed.",
    ],
  },
  {
    id: "cookie-orders",
    title: "Cookie Orders",
    confirmed: true,
    body: [
      "Checkout prices reflect your products, quantities, taxes, and any shipping or fees.",
      "Cookie orders are confirmed after successful checkout and payment.",
    ],
  },
  {
    id: "allergens",
    title: "Allergens",
    confirmed: true,
    body: [
      "Our products may contain or come into contact with wheat, eggs, milk, soy, peanuts, and tree nuts.",
    ],
  },
  { id: "ordering", title: "Ordering", confirmed: false, body: [] },
  { id: "payment", title: "Payment", confirmed: false, body: [] },
  { id: "pickup", title: "Pickup", confirmed: false, body: [] },
  { id: "shipping", title: "Shipping", confirmed: false, body: [] },
  { id: "cancellation", title: "Cancellations", confirmed: false, body: [] },
  { id: "refunds", title: "Refunds", confirmed: false, body: [] },
  { id: "changes", title: "Order Changes", confirmed: false, body: [] },
];
