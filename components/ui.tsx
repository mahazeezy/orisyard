import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

function cx(...p: Array<string | false | null | undefined>) {
  return p.filter(Boolean).join(" ");
}

/** Hand-drawn heart doodle (outline), sized in em so it tracks the text it sits in. */
export function Heart({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 34 40" className={cx("heart", className)} style={style} aria-hidden="true">
      <path
        d="M17 36C9 27 2 20 3 11 4 5 10 2 14 5c2 2 3 5 3 8 0-4 2-8 6-10 5-2 9 3 8 9-1 9-8 15-14 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Arrow({ className, back }: { className?: string; back?: boolean }) {
  return (
    <svg
      viewBox="0 0 28 20"
      className={cx("arrow", className)}
      aria-hidden="true"
      style={back ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M1 10h25M18 2l8 8-8 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type PillProps = {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline";
  heart?: boolean;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

function pillClass({ size = "md", variant = "primary", className }: PillProps) {
  return cx("pill", `pill-${size}`, variant === "outline" && "pill-outline", className);
}

function PillInner({ heart, arrow, children }: PillProps) {
  return (
    <>
      <span>{children}</span>
      {heart ? <Heart className="pill-heart" /> : null}
      {arrow ? <Arrow className="pill-arrow" /> : null}
    </>
  );
}

export function PillLink(props: PillProps & Omit<ComponentProps<typeof Link>, "children" | "className">) {
  const { size, variant, heart, arrow, className, children, ...rest } = props;
  return (
    <Link className={pillClass({ size, variant, className, children })} {...rest}>
      <PillInner heart={heart} arrow={arrow}>
        {children}
      </PillInner>
    </Link>
  );
}

export function PillButton(props: PillProps & Omit<ComponentProps<"button">, "children" | "className">) {
  const { size, variant, heart, arrow, className, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={pillClass({ size, variant, className, children })} {...rest}>
      <PillInner heart={heart} arrow={arrow}>
        {children}
      </PillInner>
    </button>
  );
}

/** "Section title ♡" in the reference's display serif. */
export function SectionTitle({
  children,
  as: Tag = "h2",
  center,
  className,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  center?: boolean;
  className?: string;
}) {
  return (
    <Tag className={cx("section-title", center && "is-center", className)}>
      {children} <Heart className="title-heart" />
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("eyebrow", className)}>{children}</p>;
}

/** Styled slot for a real OrisYard photo that has not been supplied yet. */
export function PhotoSlot({
  label,
  tone,
  className,
  style,
}: {
  label: string;
  tone?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cx("photo-slot", className)}
      role="img"
      aria-label={`${label} (photo coming soon)`}
      style={{ ...(tone ? ({ "--tone": tone } as CSSProperties) : null), ...style }}
    >
      <span className="photo-slot-label">{label}</span>
    </div>
  );
}

export function Notice({ children, tone = "soft" }: { children: ReactNode; tone?: "soft" | "strong" }) {
  return <p className={cx("notice", tone === "strong" && "notice-strong")}>{children}</p>;
}

export function ScriptNote({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("script-note", className)}>{children}</p>;
}

/* Thin-line pink icons from the reference feature row */
export function LineIcon({ name }: { name: "whisk" | "heart" | "cake" | "smile" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 44 44" className="line-icon" aria-hidden="true">
      {name === "whisk" && (
        <g {...common}>
          <ellipse cx="29" cy="14" rx="8" ry="12" transform="rotate(35 29 14)" />
          <path d="M23 23 9 37M24 6c-2 6 0 12 5 16M32 8c1 6-1 11-5 14" />
        </g>
      )}
      {name === "heart" && (
        <path
          {...common}
          d="M22 38C14 31 7 25 8 17c1-6 7-8 11-5 2 2 3 4 3 7 0-4 2-8 6-10 5-2 9 3 8 9-1 8-8 14-14 20"
        />
      )}
      {name === "cake" && (
        <g {...common}>
          <rect x="6" y="26" width="32" height="12" rx="3" />
          <rect x="11" y="15" width="22" height="11" rx="3" />
          <path d="M22 15V8M19 10h6M6 31c3 2 6 2 8 0s6-2 8 0 6 2 8 0 6-2 8 0" />
        </g>
      )}
      {name === "smile" && (
        <g {...common}>
          <circle cx="22" cy="22" r="16" />
          <path d="M15 25c3 5 11 5 14 0" />
          <circle cx="16.5" cy="18" r="1" fill="currentColor" />
          <circle cx="27.5" cy="18" r="1" fill="currentColor" />
        </g>
      )}
    </svg>
  );
}
