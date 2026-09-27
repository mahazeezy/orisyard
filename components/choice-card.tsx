import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PhotoSlot, PillLink } from "@/components/ui";

type Props = {
  href: string;
  title: string;
  text: ReactNode;
  cta: string;
  meta?: string;
  image?: { src: string; width: number; height: number };
  placeholder?: { label: string; tone: string };
  /** Fill the frame edge-to-edge (photos) instead of fitting a cut-out inside it. */
  cover?: boolean;
};

/** Large stacked photo card (reference: Menu / Order Now screens). */
export function ChoiceCard({ href, title, text, cta, meta, image, placeholder, cover }: Props) {
  return (
    <article className="choice-card">
      <Link href={href} className={`choice-card-media ${cover ? "is-cover" : ""}`} tabIndex={-1} aria-hidden="true">
        {image ? (
          <Image src={image.src} width={image.width} height={image.height} sizes="(max-width: 899px) 92vw, 540px" alt="" />
        ) : placeholder ? (
          <PhotoSlot label={placeholder.label} tone={placeholder.tone} />
        ) : null}
      </Link>
      <div className="choice-card-body">
        <h2 className="card-title">{title}</h2>
        {meta ? <p className="choice-meta">{meta}</p> : null}
        <p className="card-sub">{text}</p>
        <PillLink href={href} size="md" arrow>
          {cta}
        </PillLink>
      </div>
    </article>
  );
}
