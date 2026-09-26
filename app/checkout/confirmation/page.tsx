import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "Order Confirmed", robots: { index: false } };

/**
 * Order confirmation (order number, total paid, method, receipt email) must be
 * rendered from a real order record once a payment provider is integrated.
 * Until then this route 404s, so it can never claim a false success.
 */
export default function ConfirmationPage() {
  notFound();
}
