import Link from "next/link";
import { Icon } from "./icons";
import { container } from "./styles";

const paths = [
  { title: "Il tuo 5×1000", text: "Una firma per sostenere A-ROSE.", href: "/come-sostenerci/5x1000" },
  { title: "Un regalo solidale", text: "Dedica una donazione a una persona speciale.", href: "/come-sostenerci/regala-una-donazione" },
  { title: "Una raccolta fondi", text: "Coinvolgi altre persone in un gesto condiviso.", href: "/come-sostenerci/raccolta-fondi" },
] as const;

export function SupportPathsSection() {
  return (
    <section className="bg-wine py-10 text-white sm:py-12" aria-labelledby="home-support-paths-title">
      <div className={`${container} grid gap-8 xl:grid-cols-[0.8fr_2.2fr] xl:items-center`}>
        <h2 id="home-support-paths-title" className="max-w-md font-serif text-3xl font-normal leading-tight">Ci sono tanti modi<br />per esserci.</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {paths.map((path) => (
            <Link key={path.href} href={path.href} className="group border-t border-white/30 pt-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <h3 className="flex items-center justify-between gap-4 font-serif text-2xl font-normal group-hover:underline">{path.title}<Icon name="arrow" className="size-5 shrink-0" /></h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{path.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
