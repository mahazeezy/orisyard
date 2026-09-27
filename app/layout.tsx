import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { FloatingCart } from "@/components/floating-cart";
import { FloatingOrderNow } from "@/components/floating-order";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CartProvider } from "@/lib/cart";
import { SITE } from "@/lib/site";
import "./globals.css";

/* Fonts are self-hosted so builds never depend on network access. */
const display = localFont({
  src: "./fonts/dm-serif-display-latin-400-normal.woff2",
  variable: "--font-display",
  display: "swap",
});
const serif = localFont({
  src: [{ path: "./fonts/playfair-display-latin-500-normal.woff2", weight: "500" }],
  variable: "--font-serif",
  display: "swap",
});
const label = localFont({
  src: [
    { path: "./fonts/montserrat-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/montserrat-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-label",
  display: "swap",
});
const sans = localFont({
  src: [
    { path: "./fonts/lato-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/lato-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-sans",
  display: "swap",
});
const script = localFont({
  src: "./fonts/oooh-baby-latin-400-normal.woff2",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.wordmark} · Custom Cakes & Gourmet Cookies`,
    template: `%s · ${SITE.wordmark}`,
  },
  description: SITE.description,
};

export const viewport: Viewport = { themeColor: "#FCE7EB" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${label.variable} ${sans.variable} ${script.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <CartProvider>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <FloatingOrderNow />
          <FloatingCart />
        </CartProvider>
      </body>
    </html>
  );
}
