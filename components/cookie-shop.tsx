"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, PhotoSlot, PillButton } from "@/components/ui";
import { useCart } from "@/lib/cart";
import { ACTIVE_COOKIES, type Cookie } from "@/lib/cookies";
import { formatPrice } from "@/lib/ordering";

export function CookieShop() {
  const { itemCount, subtotal, ready } = useCart();
  return (
    <>
      <ul className="cookie-grid">
        {ACTIVE_COOKIES.map((c) => (
          <li key={c.id}>
            <CookieCard cookie={c} />
          </li>
        ))}
      </ul>

      {ready && itemCount > 0 ? (
        <div className="cart-bar" role="region" aria-label="Cart summary">
          <span>
            🛒 Cart • {itemCount} {itemCount === 1 ? "item" : "items"}
            {subtotal != null ? ` • ${formatPrice(subtotal)}` : ""}
          </span>
          <Link href="/cart" className="pill pill-sm cart-bar-btn">
            <span>View Cart</span>
          </Link>
        </div>
      ) : null}
    </>
  );
}

function CookieCard({ cookie }: { cookie: Cookie }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const priced = cookie.price != null;

  return (
    <article className="cookie-card">
      <div className="cookie-media">
        {cookie.image ? (
          <Image src={cookie.image} alt={cookie.name} fill sizes="(max-width: 899px) 46vw, 360px" />
        ) : (
          <PhotoSlot label={cookie.name} tone={cookie.tone} />
        )}
      </div>
      <div className="cookie-body">
        <h3 className="cookie-name">{cookie.name}</h3>
        <p className="cookie-desc">{cookie.description}</p>
        <p className={`cookie-price ${priced ? "" : "is-tbd"}`}>
          {priced ? formatPrice(cookie.price as number) : "Price coming soon"}
        </p>
        <div className="cookie-actions">
          <div className="qty" aria-label={`Quantity for ${cookie.name}`}>
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={!priced || qty <= 1}>
              <span className="sr-only">Decrease</span>−
            </button>
            <span aria-live="polite">{qty}</span>
            <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} disabled={!priced}>
              <span className="sr-only">Increase</span>+
            </button>
          </div>
          <PillButton
            size="sm"
            disabled={!priced}
            onClick={() => {
              add(cookie.id, qty);
              setAdded(true);
              setQty(1);
              window.setTimeout(() => setAdded(false), 1600);
            }}
          >
            {added ? "Added" : "Add to Cart"}
          </PillButton>
          {added ? <Heart className="added-heart" /> : null}
        </div>
      </div>
    </article>
  );
}
