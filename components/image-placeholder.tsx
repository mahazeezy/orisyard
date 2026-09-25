export function ImagePlaceholder({
  label = "Product photography coming soon",
  aspect = "square",
  className = "",
}: {
  label?: string;
  aspect?: "square" | "portrait" | "wide" | "hero";
  className?: string;
}) {
  const aspectClass =
    aspect === "portrait"
      ? "aspect-[4/5]"
      : aspect === "wide"
        ? "aspect-[16/10]"
        : aspect === "hero"
          ? "aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5]"
          : "aspect-square";

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-blush via-cream to-rose-light ${aspectClass} ${className}`}
      role="img"
      aria-label={label}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.9), transparent 45%), radial-gradient(circle at 70% 75%, rgba(232,121,169,0.25), transparent 40%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
        <span className="font-serif text-sm tracking-[0.2em] text-rose-deep uppercase">
          OrisYard
        </span>
        <span className="max-w-[14rem] text-sm text-muted">{label}</span>
      </div>
    </div>
  );
}
