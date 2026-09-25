import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryNav } from "@/components/category-nav";
import { Container } from "@/components/container";
import { ProductGrid } from "@/components/product-grid";
import { ProvisionalBanner } from "@/components/provisional-banner";
import { SectionHeading } from "@/components/section-heading";
import {
  CATEGORIES,
  getCategory,
  getProductsByCategory,
  isCategoryId,
} from "@/lib/catalog";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Menu" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function MenuCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  if (!isCategoryId(slug)) notFound();

  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.id);

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="The Menu"
          title={category.name}
          description={category.description}
        />
        <div className="mt-8 space-y-8">
          <ProvisionalBanner>
            Prices and availability are provisional until confirmed by OrisYard.
          </ProvisionalBanner>
          <CategoryNav active={category.id} />
          <ProductGrid products={products} />
        </div>
      </Container>
    </section>
  );
}
