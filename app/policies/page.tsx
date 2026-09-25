import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ProvisionalBanner } from "@/components/provisional-banner";
import { SectionHeading } from "@/components/section-heading";
import { POLICIES, POLICIES_INTRO, SHIPPING_POLICY } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Policies",
  description: "OrisYard order and shipping policies.",
};

export default function PoliciesPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow="Before you order"
          title="Policies"
          description={POLICIES_INTRO}
        />
        <div className="mt-8">
          <ProvisionalBanner>
            Policy text is carried over from the legacy OrisYard site and is not
            yet confirmed as final business rules.
          </ProvisionalBanner>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {POLICIES.map((policy) => (
            <li
              key={policy.id}
              className="rounded-[1.5rem] border border-border bg-surface p-6"
            >
              <h2 className="font-display text-xl text-espresso">
                {policy.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {policy.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-[1.75rem] border border-border bg-blush/50 p-7">
          <h2 className="font-display text-2xl">{SHIPPING_POLICY.title}</h2>
          <p className="font-serif mt-3 text-lg text-muted">
            {SHIPPING_POLICY.summary}
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-muted">
            {SHIPPING_POLICY.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
