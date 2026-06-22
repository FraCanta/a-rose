import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { container, section } from "@/components/home/styles";
import { getAboutContent } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Partner e sostenitori | A-ROSE ODV",
  description: "Istituzioni, laboratori, associazioni e imprese che collaborano con A-ROSE ODV.",
};

const descriptions: Record<string, string> = {
  "Signal Transduction Lab": "Laboratorio di riferimento per le attività di ricerca traslazionale sostenute da A-ROSE.",
  "Comune di Ferrara": "Collaborazione istituzionale e territoriale a supporto delle iniziative associative.",
  "Comune di Copparo": "Ha ospitato e sostenuto incontri divulgativi, iniziative culturali e attività di raccolta fondi.",
  "Comune di Portomaggiore": "Ha collaborato alla realizzazione di incontri territoriali dedicati a ricerca e prevenzione.",
  "Comune di Voghiera": "Ha collaborato alla realizzazione di incontri territoriali dedicati a ricerca e prevenzione.",
  "Grandi Riso": "Ha promosso una campagna solidale legata a un prodotto dedicato, destinando parte del ricavato alla ricerca.",
  "Lions International": "Ha collaborato a iniziative pubbliche di sensibilizzazione e divulgazione sul territorio.",
  "Ente Palio di Ferrara": "Realtà del territorio vicina alle iniziative associative e alla raccolta fondi.",
};

export default async function PartnersPage() {
  const { partners } = await getAboutContent();
  return (
    <main id="contenuto">
      <header className="border-b border-line bg-paper py-14 sm:py-20">
        <div className={container}>
          <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-2 text-xs text-muted"><Link href="/">Home</Link><span>/</span><Link href="/chi-siamo/la-nostra-associazione">Chi siamo</Link><span>/</span><span aria-current="page" className="text-ink">Partner e sostenitori</span></nav>
          <Eyebrow>Chi siamo</Eyebrow>
          <h1 className="mt-6 max-w-5xl font-serif text-[clamp(44px,6vw,82px)] font-normal leading-[0.98] tracking-[-0.045em] text-ink">Una rete che sostiene <em className="font-normal text-rose">la ricerca.</em></h1>
          <p className="mt-7 max-w-3xl text-base leading-[1.85] text-muted sm:text-lg">A-ROSE collabora con istituzioni, laboratori, associazioni e imprese. Per alcune realtà è documentata una specifica iniziativa; per le altre indichiamo prudentemente il ruolo di sostegno alla rete associativa.</p>
        </div>
      </header>

      <section className={`${section} bg-white`}>
        <div className={container}>
          <div className="grid gap-5 lg:grid-cols-2">
            {partners.map((partner) => (
              <article className="grid min-h-56 items-center gap-7 border border-line bg-paper p-7 sm:grid-cols-[180px_1fr] sm:p-9" key={partner.name}>
                <div className="flex h-32 items-center justify-center bg-white p-4">
                  <Image className="h-full w-full object-contain grayscale" src={partner.image} alt={`Logo ${partner.name}`} width={320} height={160} sizes="180px" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-ink">{partner.name}</h2>
                  <p className="mt-3 text-sm leading-[1.75] text-muted">{descriptions[partner.name] ?? "Organizzazione presente nella rete di partner e sostenitori che affianca A-ROSE nelle proprie attività."}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-wine py-16 text-white sm:py-20"><div className={`${container} flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center`}><div><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#efabb6]">Collaborazioni</p><h2 className="mt-3 max-w-3xl font-serif text-3xl font-normal sm:text-4xl">Vuoi costruire un progetto insieme ad A-ROSE?</h2></div><Link className="inline-flex min-h-13 items-center gap-3 rounded-full bg-white px-7 font-bold text-wine" href="/come-sostenerci/aziende-e-partner">Diventa partner <Icon className="size-4" name="arrow" /></Link></div></section>
    </main>
  );
}
