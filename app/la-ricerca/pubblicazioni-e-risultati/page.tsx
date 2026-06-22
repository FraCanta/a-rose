import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { container, section } from "@/components/home/styles";
import { founders } from "@/components/team/data";
import { getPublicationSources, getPublications } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Pubblicazioni e risultati | A-ROSE ODV",
  description: "Pubblicazioni e fonti bibliografiche del team scientifico A-ROSE ODV.",
};

export default async function PublicationsPage() {
  const profiles = await Promise.all(founders.map(async (founder) => ({
    founder,
    publications: await getPublications(founder.publicationsSlug, 8),
    sources: await getPublicationSources(founder.publicationsSlug),
  })));

  return (
    <main id="contenuto">
      <header className="border-b border-line bg-ivory px-5 py-16 sm:px-8 lg:py-24">
        <div className={container}>
          <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-2 text-xs text-muted"><Link href="/">Home</Link><span>/</span><Link href="/la-ricerca">La ricerca</Link><span>/</span><span aria-current="page" className="text-ink">Pubblicazioni e risultati</span></nav>
          <Eyebrow>La ricerca</Eyebrow>
          <h1 className="mt-5 max-w-5xl font-serif text-[clamp(46px,6vw,80px)] leading-[0.98] tracking-[-0.045em] text-ink">Fonti, pubblicazioni e <em className="font-normal text-rose">risultati.</em></h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-muted sm:text-lg">Una raccolta organizzata per profilo delle pubblicazioni disponibili e dei collegamenti agli archivi bibliografici originali. A-ROSE non modifica né interpreta i contenuti scientifici delle fonti.</p>
        </div>
      </header>

      <section className={`${section} bg-white`}>
        <div className={`${container} grid gap-8`}>
          {profiles.map(({ founder, publications, sources }, index) => (
            <details className="group border border-line bg-paper open:bg-ivory" key={founder.key} open={index === 0}>
              <summary className="flex min-h-28 cursor-pointer list-none items-center justify-between gap-6 px-6 py-6 sm:px-9">
                <span><span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">{founder.eyebrow}</span><span className="mt-2 block font-serif text-3xl text-ink sm:text-4xl">{founder.name}</span></span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-wine text-xl text-wine transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <div className="border-t border-line px-6 py-7 sm:px-9 sm:py-9">
                {sources.length ? <div className="flex flex-wrap gap-2">{sources.map((source) => <Link className="inline-flex min-h-10 items-center gap-2 rounded-full border border-wine px-4 text-xs font-bold text-wine transition hover:bg-wine hover:text-white" href={source.href} key={source.href} target="_blank" rel="noreferrer">{source.label}<Icon className="size-3.5" name="arrow" /></Link>)}</div> : null}
                {publications.length ? (
                  <ol className="mt-8 grid gap-x-10 gap-y-6 lg:grid-cols-2">
                    {publications.map((publication, publicationIndex) => (
                      <li className="border-t border-line pt-5" key={`${publication.href}-${publicationIndex}`}>
                        <div className="flex items-center gap-3"><span className="text-[10px] font-bold text-rose">{String(publicationIndex + 1).padStart(2, "0")}</span>{publication.sourceLabel ? <span className="rounded-full bg-rose-soft px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-wine">{publication.sourceLabel}</span> : null}</div>
                        <h2 className="mt-3 font-serif text-xl leading-snug text-ink">{publication.title}</h2>
                        {publication.summary ? <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{publication.summary}</p> : null}
                        {publication.href ? <Link className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-wine" href={publication.href} target="_blank" rel="noreferrer">Apri la fonte<Icon className="size-3.5" name="arrow" /></Link> : null}
                      </li>
                    ))}
                  </ol>
                ) : <p className="mt-7 text-sm leading-7 text-muted">L’elenco interno non è disponibile. Consulta gli archivi bibliografici indicati sopra.</p>}
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
