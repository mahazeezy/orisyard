import Link from "next/link";
import { Heart } from "@/components/ui";
import { NAV_LINKS, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <svg className="torn-edge" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 24V12 L14 6 L29 14 L38 5 L55 5 L69 13 L78 12 L90 4 L100 10 L115 5 L127 5 L144 10 L153 13 L163 7 L181 4 L199 13 L214 4 L226 4 L243 6 L256 10 L267 12 L277 13 L290 12 L301 5 L319 13 L331 9 L341 12 L351 13 L360 13 L372 11 L389 10 L403 11 L421 11 L435 8 L447 6 L459 5 L477 8 L494 11 L508 11 L521 13 L531 5 L548 10 L559 9 L570 11 L585 4 L595 12 L613 9 L627 9 L645 11 L663 11 L673 5 L686 11 L696 4 L709 14 L727 14 L743 8 L758 14 L772 4 L788 9 L799 13 L809 11 L818 7 L831 6 L843 10 L858 11 L868 6 L884 10 L901 8 L912 10 L929 8 L944 9 L959 7 L970 5 L981 6 L993 14 L1005 4 L1021 13 L1032 8 L1045 4 L1056 10 L1073 9 L1091 13 L1105 6 L1122 13 L1131 11 L1148 10 L1163 10 L1178 5 L1194 14 L1200 4 V24Z" />
      </svg>
      <div className="footer-inner">
        <div className="footer-brand">
          <span>{SITE.wordmark}</span>
          <Heart className="footer-heart" />
        </div>
        <nav aria-label="Footer" className="footer-nav">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="footer-line">{SITE.footerLine}</p>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} {SITE.name}</p>
    </footer>
  );
}
