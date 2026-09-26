import { PillLink, SectionTitle } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container page page-narrow center">
      <p className="eyebrow">404</p>
      <SectionTitle as="h1" center>
        This Page Crumbled
      </SectionTitle>
      <p className="page-lead">We couldn’t find what you were looking for.</p>
      <div className="btn-row center">
        <PillLink href="/" size="md" arrow>
          Back Home
        </PillLink>
      </div>
    </section>
  );
}
