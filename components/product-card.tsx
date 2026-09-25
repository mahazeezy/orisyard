import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { ImagePlaceholder } from "@/components/image-placeholder";
import {
  formatProductPrice,
  type Product,
} from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface transition hover:border-rose/40">
      <Link href={`/products/${product.slug}`} className="block overflow-hidden">
        <ImagePlaceholder
          label={`${product.name} photo placeholder`}
          className="rounded-none border-0 transition duration-500 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div>
          <p className="text-xs tracking-[0.18em] text-muted uppercase">
            {product.category}
          </p>
          <h3 className="font-display mt-1 text-xl text-espresso">
            <Link href={`/products/${product.slug}`} className="hover:text-rose-deep">
              {product.name}
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {product.shortDescription}
          </p>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <p className="font-display text-lg text-rose-deep">
            {formatProductPrice(product)}
          </p>
          <ButtonLink href={`/products/${product.slug}`} variant="secondary" size="sm">
            View
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
