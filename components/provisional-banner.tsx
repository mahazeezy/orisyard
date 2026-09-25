import type { ReactNode } from "react";

export function ProvisionalBanner({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl border border-border bg-blush/60 px-4 py-3 text-sm text-muted">
      {children}
    </p>
  );
}
