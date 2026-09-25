/**
 * Centralized OrisYard business information.
 * Values are provisional — observed from the legacy static site and not yet
 * confirmed as final business-approved data.
 */

export const SITE = {
  name: "OrisYard",
  tagline: "Sweet things, made with intention.",
  established: 2024,
  location: {
    city: "Merrillville",
    state: "Indiana",
    label: "Merrillville, Indiana",
  },
  phone: {
    display: "(219) 801-1578",
    href: "tel:2198011578",
  },
  email: {
    display: "demmahumyaseec@gmail.com",
    href: "mailto:demmahumyaseec@gmail.com",
  },
  instagram: {
    handle: "@orisyard",
    href: "https://instagram.com/orisyard",
  },
  /** Observed from legacy site; treat as provisional. */
  paymentMethodsNote: "Apple Pay and Cash App only.",
  /** Observed from legacy site; treat as provisional. */
  shippingNote: "Cookies ship nationwide starting at $10.",
  shortDescription:
    "Handcrafted cupcakes, cakes, bentos, and cookies baked fresh to order in Merrillville, Indiana.",
  provisional: true as const,
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/custom-cakes", label: "Custom Cakes" },
  { href: "/about", label: "About" },
  { href: "/policies", label: "Policies" },
  { href: "/contact", label: "Contact" },
] as const;
