"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/button";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { ProvisionalBanner } from "@/components/provisional-banner";
import {
  FLAVOR_OPTIONS,
  formatPrice,
  type Product,
} from "@/lib/catalog";
import { SITE } from "@/lib/site";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function ProductDetailShell({ product }: { product: Product }) {
  const [flavorId, setFlavorId] = useState(FLAVOR_OPTIONS[0]?.id ?? "white");
  const [qty, setQty] = useState(1);
  const [fulfillment, setFulfillment] = useState<"pickup" | "ship">("pickup");
  const [notes, setNotes] = useState("");
  const [requestedDate, setRequestedDate] = useState("");

  const selectedFlavor = FLAVOR_OPTIONS.find((f) => f.id === flavorId);
  const unitPrice = useMemo(() => {
    const delta = product.hasFlavorOptions ? (selectedFlavor?.priceDelta ?? 0) : 0;
    return product.basePrice + delta;
  }, [product, selectedFlavor]);

  const lineTotal = unitPrice * qty;
  const shippingPreview =
    fulfillment === "ship" && product.shippable ? 10 : 0;
  const totalPreview = lineTotal + shippingPreview;

  const shipBlocked = fulfillment === "ship" && !product.shippable;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
      <div className="space-y-4">
        <ImagePlaceholder
          aspect="portrait"
          label={`${product.name} photography placeholder`}
        />
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((n) => (
            <ImagePlaceholder
              key={n}
              label={`Gallery slot ${n}`}
              className="rounded-2xl"
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs tracking-[0.2em] text-muted uppercase">
          {product.category}
        </p>
        <h1 className="font-display mt-2 text-4xl text-espresso sm:text-5xl">
          {product.name}
        </h1>
        <p className="font-display mt-4 text-2xl text-rose-deep">
          {product.priceIsStartingAt ? "Starting at " : ""}
          {formatPrice(product.basePrice)}
        </p>
        <p className="font-serif mt-5 text-lg leading-relaxed text-muted">
          {product.description}
        </p>

        <ProvisionalBanner>
          Pricing and options are provisional seed data from the previous site.
          Online ordering is not enabled yet — this page is a storefront shell.
        </ProvisionalBanner>

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {product.hasFlavorOptions ? (
            <fieldset>
              <legend className="mb-3 text-sm font-medium text-espresso">
                Flavor
              </legend>
              <div className="flex flex-wrap gap-2">
                {FLAVOR_OPTIONS.map((flavor) => {
                  const selected = flavor.id === flavorId;
                  return (
                    <button
                      key={flavor.id}
                      type="button"
                      onClick={() => setFlavorId(flavor.id)}
                      className={cx(
                        "rounded-full border px-4 py-2 text-sm transition",
                        selected
                          ? "border-rose-deep bg-blush text-rose-deep"
                          : "border-border bg-surface text-muted hover:border-rose/40",
                      )}
                      aria-pressed={selected}
                    >
                      {flavor.name}
                      {flavor.priceDelta > 0
                        ? ` (+${formatPrice(flavor.priceDelta)})`
                        : ""}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="qty" className="mb-2 block text-sm font-medium">
                Quantity
              </label>
              <input
                id="qty"
                type="number"
                min={1}
                max={99}
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(1, Number(e.target.value) || 1))
                }
                className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-rose-deep"
              />
            </div>
            <div>
              <label
                htmlFor="requested-date"
                className="mb-2 block text-sm font-medium"
              >
                Requested date
              </label>
              <input
                id="requested-date"
                type="date"
                value={requestedDate}
                onChange={(e) => setRequestedDate(e.target.value)}
                className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-rose-deep"
              />
            </div>
          </div>

          <fieldset>
            <legend className="mb-3 text-sm font-medium">Fulfillment</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm has-[:checked]:border-rose-deep has-[:checked]:bg-blush">
                <input
                  type="radio"
                  name="fulfillment"
                  value="pickup"
                  checked={fulfillment === "pickup"}
                  onChange={() => setFulfillment("pickup")}
                />
                Pickup — {SITE.location.label}
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm has-[:checked]:border-rose-deep has-[:checked]:bg-blush">
                <input
                  type="radio"
                  name="fulfillment"
                  value="ship"
                  checked={fulfillment === "ship"}
                  onChange={() => setFulfillment("ship")}
                />
                Shipping
                {product.shippable ? " (cookies, +$10)" : " (not available)"}
              </label>
            </div>
            {shipBlocked ? (
              <p className="mt-2 text-sm text-rose-deep" role="status">
                Legacy site notes shipping for cookies only. This item is marked
                non-shippable in provisional catalog data.
              </p>
            ) : null}
          </fieldset>

          <div>
            <label htmlFor="notes" className="mb-2 block text-sm font-medium">
              Message / design details
            </label>
            <textarea
              id="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Writing on the cake, allergies, custom decor requests…"
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-rose-deep"
            />
          </div>

          <div className="rounded-3xl border border-border bg-blush/50 p-5">
            <div className="flex justify-between text-sm text-muted">
              <span>Line total</span>
              <span>{formatPrice(lineTotal)}</span>
            </div>
            {shippingPreview > 0 ? (
              <div className="mt-2 flex justify-between text-sm text-muted">
                <span>Shipping (provisional)</span>
                <span>{formatPrice(shippingPreview)}</span>
              </div>
            ) : null}
            <div className="mt-3 flex justify-between border-t border-border pt-3">
              <span className="font-display text-lg">Preview total</span>
              <span className="font-display text-xl text-rose-deep">
                {formatPrice(totalPreview)}
              </span>
            </div>
          </div>

          <Button type="button" disabled className="w-full" size="lg">
            Ordering coming soon
          </Button>
          <p className="text-center text-sm text-muted">
            Cart and order submission are not connected in this phase. Call{" "}
            <a href={SITE.phone.href} className="text-rose-deep underline">
              {SITE.phone.display}
            </a>{" "}
            or DM{" "}
            <a
              href={SITE.instagram.href}
              className="text-rose-deep underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE.instagram.handle}
            </a>{" "}
            to order.
          </p>
        </form>
      </div>
    </div>
  );
}
