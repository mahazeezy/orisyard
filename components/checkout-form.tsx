"use client";

import { useState } from "react";
import { SummaryRow } from "@/components/cart-view";
import { Notice, PillButton, PillLink } from "@/components/ui";
import { useCart } from "@/lib/cart";
import { getCookie } from "@/lib/cookies";
import { ORDERING, formatPrice } from "@/lib/ordering";

const STATES =
  "AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split(
    " ",
  );

export function CheckoutForm() {
  const { lines, ready, subtotal } = useCart();
  const [method, setMethod] = useState<"pickup" | "shipping">("pickup");
  const [attempted, setAttempted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  if (!ready) return <p className="field-hint">Loading…</p>;
  if (!lines.length)
    return (
      <div className="empty center">
        <p className="page-lead">Your cart is empty.</p>
        <PillLink href="/cookies" size="md" arrow>
          Shop Cookies
        </PillLink>
      </div>
    );

  const shipping = method === "shipping" ? ORDERING.shippingFee : 0;
  const tax = ORDERING.taxRate != null && subtotal != null ? subtotal * ORDERING.taxRate : null;
  const total =
    subtotal != null && shipping != null && tax != null ? subtotal + shipping + tax : null;

  return (
    <form
      className="checkout"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setAttempted(true);
      }}
    >
      <div className="checkout-main">
        <fieldset className="panel">
          <legend className="panel-title">Pickup or Shipping</legend>
          <div className="segmented">
            {(["pickup", "shipping"] as const).map((m) => (
              <label key={m} className={method === m ? "is-checked" : ""}>
                <input type="radio" name="method" className="sr-only" checked={method === m} onChange={() => setMethod(m)} />
                {m === "pickup" ? "Pickup" : "Shipping"}
              </label>
            ))}
          </div>
          {method === "pickup" ? (
            <div className="field-row">
              <label className="field">
                <span className="field-label">Pickup Date</span>
                <input className="input" type="date" name="pickupDate" />
              </label>
              <label className="field">
                <span className="field-label">Available Pickup Time</span>
                <select className="input" name="pickupTime" disabled={!ORDERING.pickupTimes.length}>
                  {ORDERING.pickupTimes.length ? (
                    ORDERING.pickupTimes.map((t) => <option key={t}>{t}</option>)
                  ) : (
                    <option>Pickup times coming soon</option>
                  )}
                </select>
              </label>
            </div>
          ) : (
            <>
              <label className="field">
                <span className="field-label">Street Address</span>
                <input className="input" name="street" autoComplete="address-line1" />
              </label>
              <label className="field">
                <span className="field-label">Apt / Suite</span>
                <input className="input" name="apt" autoComplete="address-line2" />
              </label>
              <div className="field-row three">
                <label className="field">
                  <span className="field-label">City</span>
                  <input className="input" name="city" autoComplete="address-level2" />
                </label>
                <label className="field">
                  <span className="field-label">State</span>
                  <select className="input" name="state" autoComplete="address-level1" defaultValue="">
                    <option value="" disabled>
                      Select
                    </option>
                    {STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span className="field-label">ZIP</span>
                  <input className="input" name="zip" inputMode="numeric" autoComplete="postal-code" pattern="\d{5}(-\d{4})?" />
                </label>
              </div>
            </>
          )}
        </fieldset>

        <fieldset className="panel">
          <legend className="panel-title">Contact</legend>
          <div className="field-row">
            <label className="field">
              <span className="field-label">First Name</span>
              <input className="input" name="first" autoComplete="given-name" />
            </label>
            <label className="field">
              <span className="field-label">Last Name</span>
              <input className="input" name="last" autoComplete="family-name" />
            </label>
          </div>
          <div className="field-row">
            <label className="field">
              <span className="field-label">Email</span>
              <input className="input" type="email" name="email" autoComplete="email" />
            </label>
            <label className="field">
              <span className="field-label">Phone</span>
              <input className="input" type="tel" name="phone" autoComplete="tel" />
            </label>
          </div>
        </fieldset>

        <fieldset className="panel">
          <legend className="panel-title">Payment</legend>
          <div className="pay-options" aria-disabled="true">
            <span className="pay-option">Credit / Debit Card</span>
            <span className="pay-option">Apple Pay</span>
          </div>
          <p className="field-hint">Secure online payment is coming soon.</p>
        </fieldset>
      </div>

      <aside className="summary">
        <p className="panel-title">Order Summary</p>
        {lines.map((l) => {
          const c = getCookie(l.id);
          if (!c) return null;
          return (
            <SummaryRow
              key={l.id}
              label={`${c.name} × ${l.qty}`}
              value={c.price != null ? formatPrice(c.price * l.qty) : "—"}
            />
          );
        })}
        <SummaryRow
          label={method === "shipping" ? "Shipping" : "Pickup"}
          value={shipping == null ? "TBD" : shipping === 0 ? "Free" : formatPrice(shipping)}
        />
        <SummaryRow label="Taxes" value={tax == null ? "TBD" : formatPrice(tax)} />
        <SummaryRow label="Total" value={total == null ? "—" : formatPrice(total)} strong />
        <label className="check">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <span>
            I agree to the{" "}
            <a href="/policies" target="_blank" rel="noopener noreferrer">
              OrisYard policies
            </a>
            .
          </span>
        </label>
        <PillButton type="submit" size="md" heart className="w-full" disabled={!ORDERING.cookieCheckoutLive}>
          Place Order
        </PillButton>
        {!ORDERING.cookieCheckoutLive ? (
          <Notice>Online checkout is opening soon. No order has been placed and nothing has been charged.</Notice>
        ) : attempted && !agreed ? (
          <p className="field-error">Please agree to the policies.</p>
        ) : null}
      </aside>
    </form>
  );
}
