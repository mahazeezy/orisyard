/**
 * OrisYard site configuration.
 * Wording follows the approved AI reference design. Contact details, hours and
 * any location are intentionally left unset (null) until the owner confirms them —
 * never invent them. OrisYard has no physical storefront.
 */

export const SITE = {
  name: "OrisYard",
  wordmark: "OrisYard Bakery",
  subline: "Cakes • Cookies • Sweet Moments",
  footerLine: "Good things are sweeter here.",
  description:
    "Custom cakes and gourmet cookies made with love for every celebration.",
  contact: {
    email: null as string | null,
    phone: null as string | null,
    instagram: null as { handle: string; href: string } | null,
    hours: null as string | null,
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/order", label: "Order Now" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/policies", label: "Policies" },
] as const;

/** Links shown inline in the desktop header (reference shows these five). */
export const HEADER_LINKS = NAV_LINKS.filter((l) => l.href !== "/order");
