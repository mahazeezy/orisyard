"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";

/** Pages where the cart is the page itself or a pinned bottom bar already owns that corner. */
const HIDDEN_ON = ["/cart", "/checkout", "/custom-cakes"];

/** Fixed bottom-right cart button; stays put regardless of scroll. */
export function FloatingCart() {
  const pathname = usePathname();
  const { itemCount, ready } = useCart();
  const count = ready ? itemCount : 0;

  if (HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;
  // The cookie shop shows its own "View Cart" bar across the bottom once items are added.
  if (pathname === "/cookies" && count > 0) return null;

  return (
    <Link href="/cart" className="floating-cart" aria-label={count > 0 ? `Cart, ${count} items` : "Cart"}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 8H6.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="20" r="1.4" fill="currentColor" />
        <circle cx="17" cy="20" r="1.4" fill="currentColor" />
      </svg>
      {count > 0 ? <span className="floating-cart-count">{count}</span> : null}
    </Link>
  );
}
