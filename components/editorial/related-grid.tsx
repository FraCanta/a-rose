import Link from "next/link";
import { Icon } from "@/components/home/icons";

type RelatedItem = {
  href: string;
  category: string;
  title: string;
};

export function RelatedGrid({ items }: { items: RelatedItem[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          className="site-card site-card-body group flex min-h-[190px] flex-col"
          href={item.href}
          key={item.href}
        >
          <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-rose">
            {item.category}
          </span>
          <h3 className="mt-4 font-serif text-2xl font-normal leading-tight text-ink">
            {item.title}
          </h3>
          <span className="site-card-action mt-auto">
            Approfondisci
            <Icon className="size-4 transition-transform group-hover:translate-x-1" name="arrow" />
          </span>
        </Link>
      ))}
    </div>
  );
}
