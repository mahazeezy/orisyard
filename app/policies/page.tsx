import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui";
import { POLICY_SECTIONS } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Policies",
  description: "Please read before you order from OrisYard.",
};

export default function PoliciesPage() {
  return (
    <section className="container page page-narrow">
      <div className="page-head center">
        <SectionTitle as="h1" center>
          Before You Order
        </SectionTitle>
        <p className="page-lead">Everything you need to know about ordering from OrisYard.</p>
      </div>
      <div className="accordion">
        {POLICY_SECTIONS.map((p, i) => (
          <details key={p.id} className="accordion-item" open={i === 0}>
            <summary>
              <span>{p.title}</span>
              <span className="accordion-icon" aria-hidden="true" />
            </summary>
            <div className="accordion-body">
              {p.confirmed ? (
                <ul>
                  {p.body.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="field-hint">Details coming soon.</p>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
