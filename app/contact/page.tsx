import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { ProvisionalBanner } from "@/components/provisional-banner";
import { SectionHeading } from "@/components/section-heading";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE.name} in ${SITE.location.label}.`,
};

export default function ContactPage() {
  const items = [
    {
      label: "Call or text",
      value: SITE.phone.display,
      href: SITE.phone.href,
    },
    {
      label: "Email",
      value: SITE.email.display,
      href: SITE.email.href,
    },
    {
      label: "Instagram",
      value: SITE.instagram.handle,
      href: SITE.instagram.href,
      external: true,
    },
    {
      label: "Location",
      value: SITE.location.label,
    },
  ];

  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Say hello"
          title="Contact"
          description="Pickup is based in Merrillville, Indiana. Reach out by phone, email, or Instagram while online ordering is being built."
        />
        <div className="mt-8">
          <ProvisionalBanner>
            Contact details are provisional values observed from the previous
            OrisYard website.
          </ProvisionalBanner>
        </div>
        <ul className="mt-10 space-y-4">
          {items.map((item) => (
            <li
              key={item.label}
              className="rounded-[1.5rem] border border-border bg-surface px-6 py-5"
            >
              <p className="text-xs tracking-[0.18em] text-muted uppercase">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="font-display mt-2 inline-block text-2xl text-espresso hover:text-rose-deep"
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.value}
                </a>
              ) : (
                <p className="font-display mt-2 text-2xl text-espresso">
                  {item.value}
                </p>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">{SITE.paymentMethodsNote}</p>
        <p className="mt-2 text-sm text-muted">{SITE.shippingNote}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/menu">Browse menu</ButtonLink>
          <ButtonLink href="/custom-cakes" variant="secondary">
            Custom cakes
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
