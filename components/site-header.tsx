"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Heart } from "@/components/ui";
import { DRAWER_LINKS, HEADER_LINKS, SITE } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Wordmark({ small }: { small?: boolean }) {
  return (
    <Link href="/" className={`brand ${small ? "is-small" : ""}`} aria-label={`${SITE.wordmark} home`}>
      <Image src="/images/logo-badge.png" alt="" width={320} height={320} priority className="brand-logo" />
      <span className="wordmark">
      <span className="wordmark-name">
        {SITE.wordmark} <Heart className="wordmark-heart" />
      </span>
      <span className="wordmark-sub">{SITE.subline}</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const panelId = useId();

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
    <>
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
      </header>

      {/* Sibling of the header, not a child: the header's backdrop-filter would otherwise
          become the drawer's containing block and clip it to the header's height. */}
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
            {DRAWER_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                tabIndex={open ? 0 : -1}
                className={isActive(pathname, l.href) ? "is-active" : undefined}
                aria-current={isActive(pathname, l.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
