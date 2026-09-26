"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart } from "@/components/ui";

/** Pages that already have their own pinned bottom bar. */
const HIDDEN_ON = ["/order", "/custom-cakes", "/cookies", "/cart", "/checkout"];

/** Mobile floating "Order Now ♡" — appears once the user scrolls past the first screen. */
export function FloatingOrderNow() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;

  return (
    <Link href="/order" className={`floating-order ${show ? "is-visible" : ""}`} tabIndex={show ? 0 : -1}>
      Order Now <Heart className="pill-heart" />
    </Link>
  );
}
