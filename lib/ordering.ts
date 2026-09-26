/**
 * Ordering configuration. Everything that is not yet decided by the owner
 * lives here as an explicit "not set" value so the UI can stay honest.
 */

export const ORDERING = {
  /** Cake inquiries can be submitted online. Off until a submission backend exists. */
  cakeInquiriesLive: false,
  /** Cookie checkout can place orders. Off until a payment provider is chosen. */
  cookieCheckoutLive: false,
  /** Shipping fee in USD, or null when not set. */
  shippingFee: null as number | null,
  /** Tax rate (e.g. 0.07), or null when not set. */
  taxRate: null as number | null,
  /** Available cookie pickup time slots. Empty until confirmed. */
  pickupTimes: [] as string[],
  /** Max inspiration photos per cake inquiry. */
  maxInspirationPhotos: 5,
  /** Max size per inspiration photo, in MB. */
  maxPhotoMB: 10,
  /** Max characters for cake writing. */
  maxWritingChars: 40,
} as const;

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
