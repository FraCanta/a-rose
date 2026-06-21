import Link from "next/link";
import { Icon } from "@/components/home/icons";

type RelatedItem = {
  href: string;
  category: string;
  title: string;
};

export function RelatedGrid({ items }: { items: RelatedItem[] }) {
  return (
    <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          className="group flex min-h-[190px] flex-col bg-paper p-7 transition hover:bg-white sm:p-8"
          href={item.href}
          key={item.href}
        >
          <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-rose">
            {item.category}
          </span>
          <h3 className="mt-4 font-serif text-2xl font-normal leading-tight text-ink">
            {item.title}
          </h3>
          <span className="mt-auto flex items-center gap-2 pt-6 text-xs font-bold text-wine">
            Approfondisci
            <Icon className="size-4 transition-transform group-hover:translate-x-1" name="arrow" />
          </span>
        </Link>
      ))}
    </div>
  );
}
