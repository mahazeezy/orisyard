import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { CATEGORIES, getFeaturedProducts } from "@/lib/catalog";
import { REVIEWS, REVIEWS_DISCLAIMER } from "@/lib/reviews";
import { SITE } from "@/lib/site";

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 6);

  return (
    <>
      <section className="overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-serif text-sm tracking-[0.22em] text-rose-deep uppercase">
              Handmade · Est. {SITE.established}
            </p>
            <h1 className="font-display mt-4 max-w-xl text-4xl leading-[1.05] text-espresso sm:text-5xl lg:text-6xl">
              {SITE.tagline}
            </h1>
            <p className="font-serif mt-6 max-w-lg text-xl leading-relaxed text-muted">
              Handmade cakes, cupcakes, bentos, and cookies — baked fresh to
              order in {SITE.location.label}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/menu" size="lg">
                Order Now
              </ButtonLink>
              <ButtonLink href="/menu" variant="secondary" size="lg">
                Explore Menu
              </ButtonLink>
            </div>
          </div>
          <ImagePlaceholder
            aspect="hero"
            label="Hero bakery photography placeholder"
            className="shadow-[0_30px_80px_rgba(26,10,18,0.08)]"
          />
        </Container>
      </section>

      <section className="bg-blush/50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="The menu"
            title="Find your favorite treat"
            description="Browse cakes, bentos, cupcakes, and cookies — provisional catalog from the previous OrisYard site."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/menu/${category.slug}`}
                className="rounded-[1.75rem] border border-border bg-surface p-6 transition hover:border-rose/40"
              >
                <ImagePlaceholder
                  label={`${category.name} photography`}
                  className="mb-5 rounded-2xl"
                />
                <h3 className="font-display text-2xl text-espresso">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {category.headline}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ImagePlaceholder
            aspect="portrait"
            label="Studio / bakery story photography placeholder"
          />
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Made with love in Merrillville."
              description={SITE.shortDescription}
            />
            <p className="mt-6 text-sm leading-relaxed text-muted">
              OrisYard is a handmade bakery based in {SITE.location.label}.
              Pickup is available locally; the previous site also notes cookie
              shipping nationwide. Full biography details will be added once
              confirmed.
            </p>
            <ButtonLink href="/about" variant="secondary" className="mt-8">
              About OrisYard
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="From craving to celebration"
            align="center"
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Choose",
                body: "Browse the menu and pick cakes, cupcakes, bentos, or cookies.",
              },
              {
                step: "02",
                title: "Make it yours",
                body: "Select flavors and share design details for your occasion.",
              },
              {
                step: "03",
                title: "We’ll take it from here",
                body: "Online ordering is coming soon. For now, reach out by phone or Instagram.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="rounded-[1.75rem] border border-border bg-cream p-7"
              >
                <p className="font-serif text-sm tracking-[0.2em] text-rose-deep">
                  {item.step}
                </p>
                <h3 className="font-display mt-3 text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Featured"
              title="A few sweet favorites"
              description="Starting prices from provisional catalog data."
            />
            <ButtonLink href="/menu" variant="secondary">
              View full menu
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-espresso py-16 text-cream sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-serif text-sm tracking-[0.22em] text-rose uppercase">
              Custom cakes
            </p>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl md:text-5xl">
              Need something made just for you?
            </h2>
            <p className="font-serif mt-5 max-w-xl text-lg leading-relaxed text-cream/70">
              Share your event date, theme, and inspiration. Custom cake requests
              are reviewed manually — online submission arrives in a later phase.
            </p>
            <ButtonLink href="/custom-cakes" className="mt-8">
              Custom cake request
            </ButtonLink>
          </div>
          <ImagePlaceholder
            aspect="wide"
            label="Custom cake photography placeholder"
            className="border-white/10 from-mauve/30 via-espresso to-rose-deep/20"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Kind words"
            title="What people say"
            description={REVIEWS_DISCLAIMER}
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((review) => (
              <blockquote
                key={review.id}
                className="rounded-[1.75rem] border border-border bg-blush/40 p-6"
              >
                <p className="font-serif text-lg leading-relaxed text-espresso italic">
                  “{review.quote}”
                </p>
                <footer className="mt-5 text-xs tracking-[0.16em] text-rose-deep uppercase">
                  — {review.author}
                </footer>
              </blockquote>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container className="rounded-[2rem] border border-border bg-surface px-6 py-12 text-center sm:px-10">
          <p className="font-serif text-sm tracking-[0.22em] text-rose-deep uppercase">
            Stay in touch
          </p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl">
            {SITE.instagram.handle}
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-serif text-lg text-muted">
            Call, email, or DM for orders while online checkout is being built.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={SITE.instagram.href} target="_blank" rel="noopener noreferrer">
              Instagram
            </ButtonLink>
            <ButtonLink href={SITE.phone.href} variant="secondary">
              {SITE.phone.display}
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Contact page
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
