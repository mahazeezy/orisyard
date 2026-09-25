import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { SectionHeading } from "@/components/section-heading";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE.name}, a handmade bakery in ${SITE.location.label}.`,
};

export default function AboutPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <ImagePlaceholder
          aspect="portrait"
          label="About / bakery photography placeholder"
        />
        <div>
          <SectionHeading
            eyebrow="About"
            title="Made with love in Merrillville."
            description={SITE.shortDescription}
          />
          <div className="prose-soft mt-6 space-y-4 text-sm">
            <p>
              {SITE.name} is a handmade bakery based in {SITE.location.label}.
              Est. {SITE.established}.
            </p>
            <p>
              This page keeps to confirmed context from the previous site and
              does not invent founder biography or additional claims. A fuller
              story can be added once approved.
            </p>
            <p>
              Pickup is available locally. The previous site also notes that
              cookies can ship nationwide.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/menu">Explore the menu</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
