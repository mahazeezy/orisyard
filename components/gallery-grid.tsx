"use client";

import Image from "next/image";
import { useState } from "react";
import { PhotoSlot } from "@/components/ui";
import { GALLERY, GALLERY_PLACEHOLDERS } from "@/lib/gallery";

type Tab = "all" | "cakes" | "cookies";
const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cakes", label: "Custom Cakes" },
  { id: "cookies", label: "Cookies" },
];

export function GalleryGrid() {
  const [tab, setTab] = useState<Tab>("all");
  const items = GALLERY.filter((g) => tab === "all" || g.category === tab);
  const slots: Array<"cakes" | "cookies"> = [];
  for (const cat of ["cakes", "cookies"] as const) {
    if (tab !== "all" && tab !== cat) continue;
    const have = GALLERY.filter((g) => g.category === cat).length;
    for (let i = have; i < GALLERY_PLACEHOLDERS[cat]; i++) slots.push(cat);
  }

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Filter gallery">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`tab ${tab === t.id ? "is-active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <ul className="gallery-grid">
        {items.map((g) => (
          <li key={g.src} className={`gallery-item ${g.cover ? "is-cover" : ""}`}>
            <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(max-width: 899px) 46vw, 380px" />
            {g.label ? <span className="photo-tag">{g.label}</span> : null}
          </li>
        ))}
        {slots.map((cat, i) => (
          <li key={`${cat}-${i}`} className="gallery-item">
            <PhotoSlot label={cat === "cakes" ? "Custom cake" : "Cookies"} tone={cat === "cakes" ? "#F3C6D2" : "#C9964F"} />
          </li>
        ))}
      </ul>
    </>
  );
}
