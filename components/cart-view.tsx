"use client";

import { PhotoSlot, PillLink } from "@/components/ui";
import { useCart } from "@/lib/cart";
import { getCookie } from "@/lib/cookies";
import { formatPrice } from "@/lib/ordering";

export function CartView() {
  const { lines, ready, subtotal, setQty, remove } = useCart();

  if (!ready) return <p className="field-hint">Loading your cart…</p>;

  if (!lines.length) {
    return (
      <div className="empty center">
        <p className="page-lead">Your cart is empty.</p>
        <PillLink href="/cookies" size="md" arrow>
          Shop Cookies
        </PillLink>
        <PillLink href="/custom-cakes" size="md" arrow>
          Shop Cakes
        </PillLink>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <ul className="cart-lines">
        {lines.map((l) => {
          const c = getCookie(l.id);
          if (!c) return null;
          return (
            <li key={l.id} className="cart-line">
              <PhotoSlot className="cart-thumb" label={c.name} tone={c.tone} />
              <div className="cart-line-main">
                <p className="cart-line-name">{c.name}</p>
                <p className="cart-line-unit">{c.price != null ? `${formatPrice(c.price)} each` : "Price coming soon"}</p>
                <div className="qty">
                  <button type="button" onClick={() => setQty(l.id, l.qty - 1)}>
                    <span className="sr-only">Decrease</span>−
                  </button>
                  <span>{l.qty}</span>
                  <button type="button" onClick={() => setQty(l.id, l.qty + 1)}>
                    <span className="sr-only">Increase</span>+
                  </button>
                </div>
              </div>
              <div className="cart-line-side">
                <p className="cart-line-total">{c.price != null ? formatPrice(c.price * l.qty) : "—"}</p>
                <button type="button" className="link-btn" onClick={() => remove(l.id)}>
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <aside className="summary">
        <SummaryRow label="Subtotal" value={subtotal != null ? formatPrice(subtotal) : "—"} />
        <SummaryRow label="Shipping / Pickup" value="Calculated at checkout" />
        <SummaryRow label="Total" value={subtotal != null ? `${formatPrice(subtotal)}+` : "—"} strong />
        <PillLink href="/checkout" size="md" arrow className="w-full">
          Continue to Checkout
        </PillLink>
      </aside>
    </div>
  );
}

export function SummaryRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`summary-row ${strong ? "is-strong" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
