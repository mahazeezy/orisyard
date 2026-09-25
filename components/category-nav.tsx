import Link from "next/link";
import { CATEGORIES, type CategoryId } from "@/lib/catalog";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const tabs: Array<{ id: "all" | CategoryId; href: string; label: string }> = [
  { id: "all", href: "/menu", label: "All" },
  ...CATEGORIES.map((c) => ({
    id: c.id,
    href: `/menu/${c.slug}`,
    label: c.name,
  })),
];

export function CategoryNav({ active }: { active: "all" | CategoryId }) {
  return (
    <nav aria-label="Menu categories" className="-mx-1 overflow-x-auto pb-1">
      <ul className="flex min-w-max gap-2 px-1">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <li key={tab.id}>
              <Link
                href={tab.href}
                className={cx(
                  "inline-flex rounded-full border px-4 py-2 text-sm transition",
                  isActive
                    ? "border-transparent bg-rose-deep text-white"
                    : "border-border bg-surface text-muted hover:border-rose/40 hover:text-rose-deep",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
