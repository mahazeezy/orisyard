import type { Metadata } from "next";
import { PillLink, SectionTitle } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about custom cakes or cookie orders? Let’s talk sweets.",
};

export default function ContactPage() {
  const { email, phone, instagram, hours } = SITE.contact;
  const rows = [
    email && { label: "Email", value: email, href: `mailto:${email}` },
    phone && { label: "Call or Text", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` },
    instagram && { label: "Instagram", value: instagram.handle, href: instagram.href },
    hours && { label: "Hours", value: hours },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <section className="container page page-narrow">
      <div className="page-head center">
        <SectionTitle as="h1" center>
          Let’s Talk Sweets
        </SectionTitle>
        <p className="page-lead">Questions about a custom cake or a cookie order? We’d love to hear from you.</p>
      </div>

      {rows.length ? (
        <ul className="contact-list">
          {rows.map((r) => (
            <li key={r.label} className="contact-row">
              <span className="contact-label">{r.label}</span>
              {r.href ? (
                <a href={r.href} className="contact-value">
                  {r.value}
                </a>
              ) : (
                <span className="contact-value">{r.value}</span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="panel center">
          <p className="page-lead">Our contact details are coming soon.</p>
          <p className="field-hint">In the meantime, start your cake design or browse our cookies.</p>
        </div>
      )}

      <div className="btn-row center">
        <PillLink href="/custom-cakes" size="md" arrow>
          Start My Cake
        </PillLink>
        <PillLink href="/cookies" size="md" variant="outline">
          Shop Cookies
        </PillLink>
      </div>
    </section>
  );
}
