"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { NAV_LINKS, SITE } from "@/lib/site";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const panelId = useId();

  if (pathname !== menuPath) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-cream/90 backdrop-blur-md">
      <Container className="flex h-[4.25rem] items-center justify-between gap-4 sm:h-[4.75rem]">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-espresso sm:text-2xl"
        >
          {SITE.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cx(
                  "rounded-full px-3 py-2 font-serif text-[0.95rem] tracking-wide transition",
                  active
                    ? "bg-blush text-rose-deep"
                    : "text-muted hover:bg-blush/70 hover:text-rose-deep",
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href="/cart" variant="ghost" size="sm">
            Cart
          </ButtonLink>
          <ButtonLink href="/menu" size="sm">
            Order Now
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-espresso lg:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="flex flex-col gap-1.5">
            <span
              className={cx(
                "block h-0.5 w-5 bg-espresso transition",
                open && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cx(
                "block h-0.5 w-5 bg-espresso transition",
                open && "opacity-0",
              )}
            />
            <span
              className={cx(
                "block h-0.5 w-5 bg-espresso transition",
                open && "-translate-y-2 -rotate-45",
              )}
            />
          </span>
        </button>
      </Container>

      <div
        id={panelId}
        className={cx(
          "fixed inset-0 z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={cx(
            "absolute inset-0 bg-espresso/40 transition",
            open ? "opacity-100" : "opacity-0",
          )}
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        />
        <div
          className={cx(
            "absolute top-0 right-0 flex h-full w-[min(100%,22rem)] flex-col bg-cream shadow-xl transition",
            open ? "translate-x-0" : "translate-x-full",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <p className="font-display text-lg">{SITE.name}</p>
            <button
              type="button"
              className="rounded-full px-3 py-2 text-sm text-rose-deep"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 p-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl px-4 py-3 font-serif text-xl text-espresso hover:bg-blush"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              <ButtonLink href="/menu" className="w-full">
                Order Now
              </ButtonLink>
              <ButtonLink href="/cart" variant="secondary" className="w-full">
                Cart
              </ButtonLink>
              <a
                href={SITE.phone.href}
                className="rounded-2xl px-4 py-3 text-center text-sm text-muted hover:bg-blush"
              >
                Call {SITE.phone.display}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
