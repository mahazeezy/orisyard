"use client";

import { PillButton, SectionTitle } from "@/components/ui";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="container page page-narrow center">
      <SectionTitle as="h1" center>
        Something Went Wrong
      </SectionTitle>
      <p className="page-lead">Please try again.</p>
      <div className="btn-row center">
        <PillButton size="md" onClick={reset}>
          Try Again
        </PillButton>
      </div>
    </section>
  );
}
