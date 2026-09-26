"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Heart } from "@/components/ui";
import { useCart } from "@/lib/cart";
import { HEADER_LINKS, NAV_LINKS, SITE } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Wordmark({ small }: { small?: boolean }) {
  return (
    <Link href="/" className={`wordmark ${small ? "is-small" : ""}`} aria-label={`${SITE.wordmark} home`}>
      <span className="wordmark-name">
        {SITE.wordmark} <Heart className="wordmark-heart" />
      </span>
      <span className="wordmark-sub">{SITE.subline}</span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const panelId = useId();
  const { itemCount, ready } = useCart();

  // Close the drawer on navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Wordmark />
        <nav aria-label="Primary" className="header-nav">
          {HEADER_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(pathname, l.href) ? "is-active" : undefined}
              aria-current={isActive(pathname, l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          {ready && itemCount > 0 ? (
            <Link href="/cart" className="header-cart" aria-label={`Cart, ${itemCount} items`}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 8H6.2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="20" r="1.4" fill="currentColor" />
                <circle cx="17" cy="20" r="1.4" fill="currentColor" />
              </svg>
              <span className="header-cart-count">{itemCount}</span>
            </Link>
          ) : null}
          <Link href="/order" className="header-order">
            Order Now <Heart className="header-order-heart" />
          </Link>
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <i />
            <i />
            <i />
          </button>
        </div>
      </div>

      <div id={panelId} className={`drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <button
          type="button"
          className="drawer-scrim"
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        />
        <div className="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="drawer-top">
            <Wordmark small />
            <button type="button" className="drawer-close" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <span className="sr-only">Close menu</span>×
            </button>
          </div>
          <nav aria-label="Menu" className="drawer-nav">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                tabIndex={open ? 0 : -1}
                className={isActive(pathname, l.href) ? "is-active" : undefined}
              >
                {l.label}
                {l.href === "/order" ? <Heart className="drawer-heart" /> : null}
              </Link>
            ))}
            <Link href="/cart" tabIndex={open ? 0 : -1} className={isActive(pathname, "/cart") ? "is-active" : undefined}>
              Cart{ready && itemCount > 0 ? ` (${itemCount})` : ""}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
