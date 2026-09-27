import type { Metadata } from "next";
import { ChoiceCard } from "@/components/choice-card";
import { SectionTitle } from "@/components/ui";
import { CAKE_SIZES } from "@/lib/cake-builder";
import { formatPrice } from "@/lib/ordering";

export const metadata: Metadata = {
  title: "Menu",
  description: "Custom-designed cakes and our current gourmet cookie collection.",
};

export default function MenuPage() {
  const from = Math.min(...CAKE_SIZES.map((s) => s.startingPrice));
  return (
    <section className="container page">
      <SectionTitle as="h1" center>
        Something Sweet For Every Mood
      </SectionTitle>
      <div className="choice-grid">
        <ChoiceCard
          href="/custom-cakes"
          title="Custom Cakes"
          meta={`Starting at ${formatPrice(from)}`}
          text="Custom-designed cakes, built around your size, flavor, filling, colors and decorations."
          cta="Build Your Cake"
          image={{ src: "/images/custom-cake.png", width: 2216, height: 2320 }}
        />
        <ChoiceCard
          href="/cookies"
          title="Cookies"
          text="Our current gourmet cookie collection."
          cta="Shop Cookies"
          image={{ src: "/images/cookies.jpg", width: 2800, height: 2340 }}
          cover
        />
      </div>
    </section>
  );
}
