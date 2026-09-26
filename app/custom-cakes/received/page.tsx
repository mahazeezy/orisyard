import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PillLink, SectionTitle } from "@/components/ui";
import { ORDERING } from "@/lib/ordering";

export const metadata: Metadata = { title: "Inquiry Received", robots: { index: false } };

/**
 * Only reachable once online inquiries are live — it must never be shown
 * unless an inquiry was actually submitted.
 */
export default function InquiryReceivedPage() {
  if (!ORDERING.cakeInquiriesLive) notFound();
  return (
    <section className="container page page-narrow center">
      <p className="eyebrow">Inquiry Received!</p>
      <SectionTitle as="h1" center>
        We Got Your Cake Request!
      </SectionTitle>
      <div className="prose">
        <p>Your inquiry has been submitted.</p>
        <p>We’ll review your selections and inspiration photos, then contact you with your final quote.</p>
        <p>Your order isn’t booked until your final invoice and the required payment are completed.</p>
      </div>
      <div className="btn-row">
        <PillLink href="/" size="md">
          Return Home
        </PillLink>
        <PillLink href="/gallery" size="md" variant="outline">
          View Gallery
        </PillLink>
      </div>
    </section>
  );
}
