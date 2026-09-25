import type { Metadata } from "next";
import { CategoryNav } from "@/components/category-nav";
import { Container } from "@/components/container";
import { ProductGrid } from "@/components/product-grid";
import { ProvisionalBanner } from "@/components/provisional-banner";
import { SectionHeading } from "@/components/section-heading";
import { getProductsByCategory } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "The Menu",
  description: "Browse OrisYard cakes, bentos, cupcakes, and cookies.",
};

export default function MenuPage() {
  const products = getProductsByCategory("all");

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="Order"
          title="The Menu"
          description="Handcrafted treats made fresh to order. Catalog prices are provisional seed data from the previous site."
        />
        <div className="mt-8 space-y-8">
          <ProvisionalBanner>
            Online cart and checkout are not enabled yet. Use View on any product
            to explore the storefront shell, or contact OrisYard to place an
            order.
          </ProvisionalBanner>
          <CategoryNav active="all" />
          <ProductGrid products={products} />
        </div>
      </Container>
    </section>
  );
}
