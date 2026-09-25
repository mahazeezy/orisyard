import Link from "next/link";
import { Container } from "@/components/container";
import { NAV_LINKS, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-espresso text-cream">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{SITE.name}</p>
          <p className="font-serif mt-3 max-w-sm text-base leading-relaxed text-cream/65">
            {SITE.shortDescription} Est. {SITE.established}.
          </p>
          {SITE.provisional ? (
            <p className="mt-4 text-xs tracking-wide text-cream/40 uppercase">
              Business details provisional pending confirmation
            </p>
          ) : null}
        </div>

        <div>
          <h2 className="font-display text-lg">Explore</h2>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/65 transition hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/cart"
                className="text-sm text-cream/65 transition hover:text-cream"
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm text-cream/65">
            <li>
              <a href={SITE.phone.href} className="hover:text-cream">
                {SITE.phone.display}
              </a>
            </li>
            <li>
              <a href={SITE.email.href} className="hover:text-cream">
                {SITE.email.display}
              </a>
            </li>
            <li>
              <a
                href={SITE.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cream"
              >
                {SITE.instagram.handle}
              </a>
            </li>
            <li>{SITE.location.label}</li>
            <li className="pt-2 text-cream/45">{SITE.paymentMethodsNote}</li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10 py-4 text-center text-xs text-cream/35">
        © {SITE.established} {SITE.name} · {SITE.location.label}
      </div>
    </footer>
  );
}
