import Image from "next/image";
import Link from "next/link";
import { Arrow, Heart, LineIcon, PhotoSlot, PillLink, ScriptNote } from "@/components/ui";
import { GALLERY } from "@/lib/gallery";

const FEATURES = [
  { icon: "whisk", label: "Made From Scratch" },
  { icon: "heart", label: "High-Quality Ingredients" },
  { icon: "cake", label: "Perfect For Every Occasion" },
  { icon: "smile", label: "Sweetened With Love" },
] as const;

export default function HomePage() {
  const favorites = GALLERY.slice(0, 6);
  const emptySlots = Math.max(0, 6 - favorites.length);

  return (
    <>
      <div className="hero-bg">
        <div className="atmo" aria-hidden="true">
          <div className="glow g1" />
          <div className="bokeh b1" />
          <div className="bokeh b2" />
          <div className="bokeh b3" />
          <div className="grain" />
        </div>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-t1">
            <p className="eyebrow">Custom Cakes. Gourmet Cookies.</p>
            <h1 id="hero-title" className="hero-title">
              Taste the <span className="nowrap">View. <Heart className="hero-heart" /></span>
            </h1>
          </div>
          <div className="hero-cake">
            <div className="hero-cake-shadow" aria-hidden="true" />
            <Image
              src="/images/hero-cake.png"
              width={1590}
              height={1927}
              priority
              quality={90}
              sizes="(max-width: 899px) min(78vw, 340px), min(484px, 36vw)"
              alt="Tall white textured buttercream cake decorated with pink-tipped cream roses"
            />
          </div>
          <div className="hero-t2">
            <p className="hero-lead">
              Custom cakes and gourmet cookies made with love for every celebration.
            </p>
            <PillLink href="/order" size="lg" heart arrow className="hero-cta">
              Order Now
            </PillLink>
          </div>
        </section>
      </div>

      <section className="features-band" aria-label="Why OrisYard">
        <ul className="features">
          {FEATURES.map((f) => (
            <li key={f.label}>
              <LineIcon name={f.icon} />
              <span>{f.label}</span>
            </li>
          ))}
        </ul>
        <ScriptNote className="features-note">
          Different Desserts <br />
          Same Sweet Vibes <Heart className="script-heart" />
        </ScriptNote>
      </section>

      <section className="container category-cards" aria-label="What we make">
        <article className="category-card">
          <Link href="/custom-cakes" className="category-card-media" tabIndex={-1} aria-hidden="true">
            <Image
              src="/images/hero-cake.png"
              width={1590}
              height={1927}
              sizes="(max-width: 899px) 45vw, 280px"
              alt=""
            />
          </Link>
          <div className="category-card-body">
            <h2 className="card-title">Custom Cakes</h2>
            <p className="card-sub">Build your dream cake.</p>
            <PillLink href="/custom-cakes" size="md" arrow>
              Start My Cake
            </PillLink>
          </div>
        </article>
        <article className="category-card">
          <Link href="/cookies" className="category-card-media" tabIndex={-1} aria-hidden="true">
            <PhotoSlot label="OrisYard cookies" tone="#C4884A" />
          </Link>
          <div className="category-card-body">
            <h2 className="card-title">Cookies</h2>
            <p className="card-sub">Shop our current menu.</p>
            <PillLink href="/cookies" size="md" arrow>
              Shop Cookies
            </PillLink>
          </div>
        </article>
      </section>

      <section className="container favorites" aria-labelledby="favorites-title">
        <div className="favorites-head">
          <h2 id="favorites-title" className="section-title">
            Featured Favorites <Heart className="title-heart" />
          </h2>
          <Link href="/gallery" className="text-link">
            View Gallery <Arrow />
          </Link>
        </div>
        <ul className="favorites-strip">
          {favorites.map((g) => (
            <li key={g.src}>
              <Link href="/gallery" className="tile">
                <Image src={g.src} width={g.width} height={g.height} sizes="(max-width: 899px) 33vw, 190px" alt={g.alt} />
              </Link>
            </li>
          ))}
          {Array.from({ length: emptySlots }).map((_, i) => (
            <li key={`slot-${i}`}>
              <PhotoSlot className="tile" label={i % 2 ? "Cookies" : "Cakes"} tone={i % 2 ? "#C9964F" : "#F3C6D2"} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
