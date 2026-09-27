import type { Metadata } from "next";
import { ChoiceCard } from "@/components/choice-card";
import { SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Order Now",
  description: "Start a custom cake inquiry or shop OrisYard cookies.",
};

export default function OrderPage() {
  return (
    <section className="container page">
      <SectionTitle as="h1" center>
        What Can We Make For You?
      </SectionTitle>
      <div className="choice-grid">
        <ChoiceCard
          href="/custom-cakes"
          title="Custom Cake"
          text="Create your cake step by step and submit your design as an inquiry. We’ll review your request and contact you with your final quote."
          cta="Start My Cake"
          image={{ src: "/images/custom-cake-scene.jpg", width: 2172, height: 1890 }}
          cover
        />
        <ChoiceCard
          href="/cookies"
          title="Cookies"
          text="Build your cookie order, add it to your cart, and checkout online."
          cta="Shop Cookies"
          image={{ src: "/images/cookies.jpg", width: 2800, height: 2340 }}
          cover
        />
      </div>
    </section>
  );
}
