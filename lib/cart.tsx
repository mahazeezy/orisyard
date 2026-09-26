"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getCookie } from "@/lib/cookies";

/** Cart lines store only the cookie id + qty; names/prices always come from lib/cookies. */
export type CartLine = { id: string; qty: number };

const STORAGE_KEY = "orisyard_cart_v2";

type CartContextValue = {
  lines: CartLine[];
  ready: boolean;
  itemCount: number;
  /** Subtotal in USD, or null if any line has no price set yet. */
  subtotal: number | null;
  add: (id: string, qty: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function read(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return parsed.filter((l) => getCookie(l.id)?.active && l.qty > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Hydrate from storage after mount (storage is unavailable during SSR).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines(read());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage blocked — cart still works for this visit */
    }
  }, [lines, ready]);

  const add = useCallback((id: string, qty: number) => {
    if (qty <= 0) return;
    setLines((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((id: string) => setLines((p) => p.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = lines.reduce((a, l) => a + l.qty, 0);
    let subtotal: number | null = 0;
    for (const l of lines) {
      const p = getCookie(l.id)?.price;
      if (p == null) {
        subtotal = null;
        break;
      }
      subtotal += p * l.qty;
    }
    return { lines, ready, itemCount, subtotal, add, setQty, remove, clear };
  }, [lines, ready, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
