import type { Metadata } from "next";
import { PillLink, SectionTitle } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE.name}.`,
};

/* Placeholder until the owner supplies the OrisYard story — do not add facts here. */
export default function AboutPage() {
  return (
    <section className="container page page-narrow">
      <div className="page-head center">
        <SectionTitle as="h1" center>
          About OrisYard
        </SectionTitle>
        <p className="page-lead">{SITE.description}</p>
      </div>

      <div className="panel center">
        <p className="page-lead">Our story is coming soon.</p>
      </div>

      <div className="btn-row center">
        <PillLink href="/menu" size="md" arrow>
          Explore the Menu
        </PillLink>
        <PillLink href="/contact" size="md" variant="outline">
          Contact Us
        </PillLink>
      </div>
    </section>
  );
}
