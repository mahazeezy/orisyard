import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = { title: "Cookie Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <section className="container page">
      <div className="page-head center">
        <h1 className="section-title is-center">Cookie Checkout 🍪</h1>
      </div>
      <CheckoutForm />
    </section>
  );
}
