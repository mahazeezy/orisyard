import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { ProvisionalBanner } from "@/components/provisional-banner";
import { SectionHeading } from "@/components/section-heading";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cart",
  description: "OrisYard cart — coming in a later phase.",
};

export default function CartShellPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-2xl text-center">
        <SectionHeading
          eyebrow="Cart"
          title="Cart coming soon"
          description="The new storefront does not use the legacy localStorage cart. Persistent cart and order submission arrive in a later phase."
          align="center"
        />
        <div className="mt-8">
          <ProvisionalBanner>
            Nothing is stored or submitted here. To place an order today, call{" "}
            {SITE.phone.display} or message {SITE.instagram.handle}.
          </ProvisionalBanner>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/menu">Browse menu</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact OrisYard
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
