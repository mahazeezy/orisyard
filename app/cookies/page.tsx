import type { Metadata } from "next";
import { CookieShop } from "@/components/cookie-shop";
import { Heart, Notice } from "@/components/ui";
import { ACTIVE_COOKIES, COOKIE_CAMPAIGN } from "@/lib/cookies";

export const metadata: Metadata = {
  title: "Cookie Shop",
  description: "Fresh-baked OrisYard cookies — browse our current flavors.",
};

export default function CookiesPage() {
  const anyUnpriced = ACTIVE_COOKIES.some((c) => c.price == null);
  return (
    <section className="container page">
      <div className="page-head center">
        <p className="eyebrow">Cookie Shop</p>
        <h1 className="section-title is-center">
          Pick Your Favorites 🍪
        </h1>
        <p className="page-lead">
          Fresh-baked Orisyard cookies made for treating yourself, sharing, gifting, or keeping the whole box to
          yourself. We don’t judge. <Heart className="inline-heart" />
        </p>
        <p className="campaign">{COOKIE_CAMPAIGN} 🍁🤎</p>
        <p className="page-sub">Browse our current flavors below.</p>
      </div>
      {anyUnpriced ? <Notice>Prices for our current menu are coming soon — check back to order online.</Notice> : null}
      <CookieShop />
    </section>
  );
}
