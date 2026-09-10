import Image from "next/image";
import Link from "next/link";
import { container } from "@/components/home/styles";
import type { NavigationChild } from "@/components/layout/navigation-data";

export function AreaHero({ label, title, intro, image, imageAlt, note }: { label: string; title: string; intro: string; image: string; imageAlt: string; note?: string }) {
  return <>
    <header className="bg-wine pt-14 text-white sm:pt-24">
      <div className={`${container} grid gap-10 lg:grid-cols-[2fr_1fr]`}>
        <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#efabb6]">{label}</p><h1 className="mt-6 max-w-4xl font-serif text-[clamp(44px,6vw,84px)] font-normal leading-[1.04]">{title}</h1></div>
        <div className="self-end border-l border-white/30 pl-7"><p className="max-w-sm text-lg leading-relaxed text-white/85">{intro}</p><a href="#percorsi" className="mt-6 inline-block py-3 font-bold">Esplora i percorsi ↓</a></div>
        <div className="relative -mb-16 mt-3 lg:col-span-2 lg:ml-[16%]"><Image src={image} alt={imageAlt} width={1440} height={960} sizes="(max-width: 1023px) 100vw, 80vw" priority className="h-[280px] w-full object-cover sm:h-[400px] lg:h-[480px]" /></div>
      </div>
    </header>
    <div className={`${container} pb-16 pt-28 sm:pb-24`}>{note ? <p className="max-w-4xl border-l-2 border-rose pl-7 text-xl leading-relaxed text-wine lg:ml-[16%]">{note}</p> : null}</div>
  </>;
}

export function AreaPaths({ title, links }: { title: string; links: readonly NavigationChild[] }) {
  return <section id="percorsi" className="scroll-mt-28 bg-ivory py-16 sm:py-24"><div className={container}><h2 className="font-serif text-4xl font-normal text-wine sm:text-5xl">{title}</h2><div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{links.map((link) => <Link href={link.href} key={link.href} className="site-card site-card-body group flex flex-col"><h3 className="font-serif text-2xl text-wine group-hover:underline">{link.label}</h3><p className="mb-8 mt-4 leading-relaxed text-muted">{link.description}</p><span className="site-card-action mt-auto">Scopri di più →</span></Link>)}</div></div></section>;
}
