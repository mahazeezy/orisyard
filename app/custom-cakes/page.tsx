import type { Metadata } from "next";
import { Container } from "@/components/container";
import { CustomCakeFormShell } from "@/components/custom-cake-form-shell";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { SectionHeading } from "@/components/section-heading";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom Cakes",
  description:
    "Request a custom OrisYard cake. Requests are reviewed manually.",
};

export default function CustomCakesPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Custom"
            title="Custom cake requests"
            description="Tell us about your celebration. Custom designs are reviewed manually — the previous site asks for 2–3 weeks of lead time when possible."
          />
          <div className="mt-8">
            <ImagePlaceholder
              aspect="portrait"
              label="Custom cake photography placeholder"
            />
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Prefer to talk it through? Call{" "}
            <a href={SITE.phone.href} className="text-rose-deep underline">
              {SITE.phone.display}
            </a>{" "}
            or message{" "}
            <a
              href={SITE.instagram.href}
              className="text-rose-deep underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE.instagram.handle}
            </a>
            .
          </p>
        </div>
        <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
          <h2 className="font-display text-2xl">Request form</h2>
          <p className="mt-2 text-sm text-muted">
            Online submission is not connected yet. Fields are ready for a later
            phase.
          </p>
          <div className="mt-8">
            <CustomCakeFormShell />
          </div>
        </div>
      </Container>
    </section>
  );
}
