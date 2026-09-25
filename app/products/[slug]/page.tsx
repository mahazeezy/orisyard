import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { ProductDetailShell } from "@/components/product-detail-shell";
import { getProductBySlug, PRODUCTS } from "@/lib/catalog";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/menu" className="hover:text-rose-deep">
                Menu
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/menu/${product.category}`}
                className="capitalize hover:text-rose-deep"
              >
                {product.category}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-espresso">{product.name}</li>
          </ol>
        </nav>
        <ProductDetailShell product={product} />
      </Container>
    </section>
  );
}
