import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { container } from "@/components/home/styles";

export const metadata: Metadata = {
  title: "Ecosostenibilità | A-ROSE ODV",
  description:
    "Le scelte digitali di A-ROSE per un sito più leggero, efficiente e ospitato con energia da fonti rinnovabili.",
};

const sections = [
  ["impegno", "Il digitale, con più attenzione"],
  ["efficienza", "Meno risorse, più efficienza"],
  ["futuro", "Ricerca e ambiente guardano avanti"],
] as const;

export default function SustainabilityPage() {
  return (
    <main id="contenuto">
      <header className="border-b border-line bg-ivory px-5 py-16 sm:px-8 lg:py-24">
        <div className={container}>
          <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-2 text-xs text-muted">
            <Link className="transition hover:text-wine" href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink">Ecosostenibilità</span>
          </nav>
          <Eyebrow>Il nostro impegno digitale</Eyebrow>
          <h1 className="mt-5 max-w-5xl font-serif text-[clamp(46px,7vw,88px)] leading-[0.96] tracking-[-0.05em] text-ink">
            Tecnologia più leggera, <em className="font-normal text-rose">impatto più consapevole.</em>
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            Anche un sito web consuma energia. Per questo A‑ROSE sceglie soluzioni efficienti, contenuti ottimizzati e un’infrastruttura verificata come alimentata da fonti rinnovabili.
          </p>
        </div>
      </header>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className={`${container} grid gap-14 lg:grid-cols-[250px_minmax(0,760px)] lg:justify-between lg:gap-24`}>
          <aside className="lg:sticky lg:top-32 lg:self-start" aria-label="Indice della pagina">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">In questa pagina</p>
            <nav className="mt-5 border-l border-line">
              {sections.map(([id, label]) => (
                <a className="block border-l-2 border-transparent py-2 pl-4 text-sm leading-5 text-muted transition hover:border-rose hover:text-wine" href={`#${id}`} key={id}>
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          <article className="min-w-0 text-[17px] leading-8 text-muted sm:text-lg">
            <section className="scroll-mt-32" id="impegno">
              <Eyebrow>Consapevolezza</Eyebrow>
              <h2 className="mt-4 font-serif text-[clamp(34px,4.5vw,56px)] leading-[1.04] tracking-[-0.035em] text-ink">
                Il digitale, con <em className="font-normal text-rose">più attenzione.</em>
              </h2>
              <p className="mt-7">
                Consultare una pagina, scaricare un documento o visualizzare un’immagine richiede energia: server, reti e dispositivi lavorano insieme a ogni visita. Rendere il sito più essenziale significa ridurre dati e richieste non necessarie, migliorando allo stesso tempo l’esperienza delle persone.
              </p>
              <p className="mt-4">
                L’infrastruttura che ospita questo sito risulta verificata da The Green Web Foundation come alimentata da fonti rinnovabili.
              </p>
              <a
                className="mt-8 inline-flex rounded-sm border border-line bg-white p-3 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
                href="https://www.thegreenwebfoundation.org/green-web-check/?url=a-rose.fcantale14.workers.dev"
                target="_blank"
                rel="noreferrer"
                aria-label="Verifica l'hosting sostenibile di A-ROSE su The Green Web Foundation (si apre in una nuova scheda)"
              >
                <Image
                  src="https://app.greenweb.org/api/v3/greencheckimage/a-rose.fcantale14.workers.dev?nocache=true"
                  alt="Questo sito utilizza hosting sostenibile, verificato da The Green Web Foundation"
                  width={200}
                  height={95}
                  unoptimized
                />
              </a>
            </section>

            <section className="mt-20 scroll-mt-32 border-t border-line pt-16" id="efficienza">
              <Eyebrow>Efficienza</Eyebrow>
              <h2 className="mt-4 font-serif text-[clamp(34px,4.5vw,56px)] leading-[1.04] tracking-[-0.035em] text-ink">
                Meno risorse, <em className="font-normal text-rose">più efficienza.</em>
              </h2>
              <p className="mt-7">Il sito è progettato per offrire contenuti chiari senza appesantire la navigazione:</p>
              <ul className="mt-6 space-y-4 pl-5 marker:text-rose">
                <li className="pl-2"><strong className="text-ink">Immagini ottimizzate</strong>, dimensionate per i diversi schermi e caricate solo quando servono.</li>
                <li className="pl-2"><strong className="text-ink">Distribuzione tramite CDN globale</strong>, per avvicinare i contenuti alle persone e ridurre tempi e trasferimenti.</li>
                <li className="pl-2"><strong className="text-ink">Pagine statiche e cache selettiva</strong>, così il server evita di ripetere elaborazioni e richieste già svolte.</li>
                <li className="pl-2"><strong className="text-ink">Interfacce essenziali e accessibili</strong>, pensate per funzionare bene su mobile, tablet e desktop.</li>
              </ul>
            </section>

            <section className="mt-20 scroll-mt-32 border-t border-line pt-16" id="futuro">
              <Eyebrow>Responsabilità</Eyebrow>
              <h2 className="mt-4 font-serif text-[clamp(34px,4.5vw,56px)] leading-[1.04] tracking-[-0.035em] text-ink">
                Ricerca e ambiente <em className="font-normal text-rose">guardano avanti.</em>
              </h2>
              <p className="mt-7">
                Per A‑ROSE innovazione significa prendersi cura delle persone e del contesto in cui vivono. La sostenibilità digitale è un percorso concreto: misurare, migliorare e scegliere tecnologie proporzionate agli obiettivi, senza rinunciare alla qualità dell’informazione.
              </p>
              <div className="mt-10 border-l-2 border-rose bg-ivory px-7 py-6 text-base leading-7 text-ink sm:px-9">
                Continueremo a verificare prestazioni e peso delle pagine, aggiornando le soluzioni tecniche quando esistono alternative più efficienti.
              </div>
              <p className="mt-10 border-t border-line pt-5 text-xs font-bold uppercase tracking-[0.12em] text-wine">
                Ultimo aggiornamento: settembre 2026
              </p>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}
