import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";
import { SectionTitle } from "@/components/ui";

export const metadata: Metadata = { title: "Your Cookie Cart" };

export default function CartPage() {
  return (
    <section className="container page page-mid">
      <div className="page-head center">
        <p className="eyebrow">Your Cookie Cart</p>
        <SectionTitle as="h1" center>
          Your Order
        </SectionTitle>
      </div>
      <CartView />
    </section>
  );
}
