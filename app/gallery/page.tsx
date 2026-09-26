import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";
import { PillLink, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A little look at what OrisYard has been baking.",
};

export default function GalleryPage() {
  return (
    <section className="container page">
      <div className="page-head center">
        <SectionTitle as="h1" center>
          Made by OrisYard
        </SectionTitle>
        <p className="page-lead">A little look at what we’ve been baking.</p>
      </div>
      <GalleryGrid />
      <div className="cta-band center">
        <p className="section-title is-center small">See something you love?</p>
        <PillLink href="/order" size="lg" heart arrow>
          Order Now
        </PillLink>
      </div>
    </section>
  );
}
