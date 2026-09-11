import Image from "next/image";
import Link from "next/link";
import type { NavigationChild, NavigationGroup } from "./navigation-data";

export function HealthMenu({ links, onNavigate, group }: { links: readonly NavigationChild[]; onNavigate: () => void; group?: NavigationGroup }) {
  const isHealth = !group || group.href === "/prevenzione-e-salute";
  const groups: Record<string, { title: string; indexes: number[] }[]> = {
    "/chi-siamo": [{ title: "L’associazione", indexes: [0] }, { title: "Persone e collaborazioni", indexes: [1, 2] }, { title: "Responsabilità", indexes: [3, 4, 5] }],
    "/la-ricerca": [{ title: "Comprendere la ricerca", indexes: [0] }, { title: "Il nostro lavoro", indexes: [1, 3] }, { title: "Crescere nella ricerca", indexes: [2] }],
    "/partecipa": [{ title: "Incontriamoci", indexes: [0] }, { title: "Dona il tuo tempo", indexes: [1] }, { title: "Nella comunità", indexes: [2] }],
    "/come-sostenerci": [{ title: "Il tuo contributo", indexes: [0, 1] }, { title: "Coinvolgi gli altri", indexes: [2, 3] }, { title: "Insieme alle aziende", indexes: [4] }],
  };
  const sections = isHealth ? [
    { title: "Conosci", links: links.filter((link) => /conoscere-i-tumori|guide-e-approfondimenti|\/faq$/.test(link.href)) },
    { title: "Previeni", links: links.filter((link) => /prevenzione-oncologica|stili-di-vita|hpv|screening/.test(link.href)) },
    { title: "Approfondimenti", links: links.filter((link) => /prevenzione-e-salute\/(alimentazione-durante-le-cure|attivita-fisica|sole-e-cura-della-pelle|supporto-psicologico-e-psiconcologia)/.test(link.href)) },
  ] : (groups[group.href] ?? [{ title: group.label, indexes: links.map((_, index) => index) }]).map((section) => ({ title: section.title, links: section.indexes.flatMap((index) => links[index] ? [links[index]] : []) }));
  return <div className="grid gap-8 xl:grid-cols-[1fr_1fr_1.2fr_1fr] xl:gap-0">
    {sections.filter((section) => section.links.length).map((section) => <section key={section.title} className="xl:border-r xl:border-line xl:px-7 first:xl:pl-0">
      <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.13em] text-rose xl:mb-8">{section.title}</h2>
      <ul className="space-y-1 xl:space-y-3">{section.links.map((link) => <li key={link.href}><Link href={link.href} onClick={onNavigate} className="block py-2.5 text-[15px] font-medium leading-relaxed text-wine underline-offset-4 hover:underline xl:py-2 xl:text-base">{link.label}</Link></li>)}</ul>
    </section>)}
    {isHealth ? <Link href="/prevenzione/screening-e-controlli" onClick={onNavigate} className="group hidden xl:block xl:pl-7">
      <Image src="/images/prevenzione-dialogo.webp" alt="" width={600} height={450} sizes="25vw" className="aspect-[4/3] w-full object-cover" />
      <span className="mt-6 block text-lg leading-relaxed text-wine group-hover:underline">Fai prevenzione: orientati tra screening e controlli <span aria-hidden="true">→</span></span>
    </Link> : <Link href={group.href} onClick={onNavigate} className="group hidden xl:block xl:pl-7"><div className="flex min-h-52 flex-col justify-between bg-ivory p-7"><p className="text-xs font-bold uppercase tracking-widest text-rose">{group.label}</p><p className="mt-6 font-serif text-2xl leading-relaxed text-wine">{group.description}</p><span className="mt-8 font-bold text-wine group-hover:underline">Scopri di più →</span></div></Link>}
    <Link href={group?.href ?? "/prevenzione-e-salute"} onClick={onNavigate} className="border-t border-line pt-5 text-sm font-bold text-wine xl:col-span-full xl:mt-8">Esplora {group?.label ?? "Prevenzione e salute"} →</Link>
  </div>;
}
