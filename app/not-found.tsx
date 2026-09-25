import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="max-w-xl text-center">
        <p className="font-serif text-sm tracking-[0.2em] text-rose-deep uppercase">
          404
        </p>
        <h1 className="font-display mt-3 text-4xl text-espresso">
          Page not found
        </h1>
        <p className="mt-4 text-muted">
          That page isn’t part of the OrisYard storefront shell.
        </p>
        <ButtonLink href="/" className="mt-8">
          Back home
        </ButtonLink>
      </Container>
    </section>
  );
}
