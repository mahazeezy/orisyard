import type { Metadata } from "next";
import { Suspense } from "react";
import { CakeBuilder } from "@/components/cake-builder";

export const metadata: Metadata = {
  title: "Build Your Cake",
  description: "Design your OrisYard custom cake step by step and send it as an inquiry.",
};

export default function CustomCakesPage() {
  return (
    <section className="container page page-narrow">
      <Suspense fallback={<p className="field-hint">Loading the cake builder…</p>}>
        <CakeBuilder />
      </Suspense>
    </section>
  );
}
