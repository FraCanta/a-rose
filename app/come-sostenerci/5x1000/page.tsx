import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { container, heading, section } from "@/components/home/styles";
import { FivePerThousandCalculator } from "@/components/support/five-per-thousand-calculator";
import { TaxCodeCopy } from "@/components/support/tax-code-copy";

export const metadata: Metadata = {
  title: "5x1000 | A-ROSE ODV",
  description:
    "Come destinare il 5x1000 ad A-ROSE ODV usando il codice fiscale 93096710384.",
};

const taxCode = "93096710384";
const reports = [
  [
    "Rendiconto 2024",
    "https://a-roseodv.org/wp-content/uploads/2025/06/A-ROSE-OdV_Rendiconto-2024.pdf",
  ],
  [
    "Rendiconto 2023",
    "https://a-roseodv.org/wp-content/uploads/2025/06/A-ROSE-OdV_Rendiconto-2023.pdf",
  ],
  [
    "Rendiconto 2022",
    "https://a-roseodv.org/wp-content/uploads/2025/06/A-ROSE-OdV_Rendiconto-2022.pdf",
  ],
  [
    "Rendiconto 2021",
    "https://a-roseodv.org/wp-content/uploads/2025/06/A-ROSE-OdV_Rendiconto-2021.pdf",
  ],
  [
    "Bilancio 2020",
    "https://a-roseodv.org/wp-content/uploads/2025/06/A-ROSE-OdV_Bilancio-2020.pdf",
  ],
  [
    "Bilancio 2019",
    "https://a-roseodv.org/wp-content/uploads/2025/06/A-ROSE-OdV_Bilancio-2019.pdf",
  ],
] as const;

export default function FiveForThousandPage() {
  return (
    <main id="contenuto">
      <section className="grid min-h-[610px] bg-wine text-white lg:grid-cols-2">
        <div className="flex items-center px-5 py-16 sm:px-8 lg:py-20">
          <div className="ml-auto w-full max-w-[710px] lg:pr-16">
            <nav
              aria-label="Breadcrumb"
              className="mb-10 flex items-center gap-2 text-xs text-white/65"
            >
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/come-sostenerci">Sostienici</Link>
              <span>/</span>
              <span aria-current="page" className="text-white">
                5x1000
              </span>
            </nav>
            <Eyebrow light>5x1000</Eyebrow>
            <h1 className="mt-5 font-serif text-[clamp(46px,6vw,78px)] leading-[0.96] tracking-[-0.045em]">
              Una firma che avvicina{" "}
              <em className="font-normal text-[#efabb6]">ricerca e cura.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Destina il tuo 5x1000 ad A-ROSE ODV. Non è una donazione
              aggiuntiva: è una quota dell’imposta sul reddito che puoi
              scegliere di indirizzare a un Ente del Terzo Settore.
            </p>
            <div className="mt-9 border-y border-white/25 py-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#efabb6]">
                Codice fiscale A-ROSE ODV
              </p>
              <p className="mt-2 font-mono text-3xl font-bold tracking-[0.09em] sm:text-4xl">
                {taxCode}
              </p>
            </div>
            <div className="mt-7">
              <TaxCodeCopy />
            </div>
          </div>
        </div>
        <div className="relative min-h-[390px] overflow-hidden lg:min-h-full">
          <Image
            className="object-cover"
            src="/images/sostegno-cuore.webp"
            alt="Mani che custodiscono un cuore, simbolo del sostegno alla ricerca"
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wine/30 via-transparent to-transparent lg:from-wine/15" />
        </div>
      </section>

      <section className={`${section} bg-white`}>
        <div
          className={`${container} grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24`}
        >
          <div>
            <Eyebrow>Una scelta semplice</Eyebrow>
            <h2 className={heading}>
              Il tuo 5x1000{" "}
              <em className="font-normal text-rose">non costa nulla.</em>
            </h2>
          </div>
          <div className="border-l-2 border-rose pl-7 sm:pl-10 lg:mt-11">
            <p className="text-base leading-8 text-muted sm:text-lg">
              La scelta non modifica l’importo delle imposte dovute. Inserendo
              il codice fiscale di A-ROSE puoi contribuire alle finalità
              associative dedicate a ricerca oncologica, formazione, prevenzione
              e divulgazione.
            </p>
            <Link
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-wine"
              href="/come-sostenerci/come-usiamo-i-fondi"
            >
              Come usiamo i fondi <Icon className="size-4" name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-rose-soft py-16 sm:py-20" aria-labelledby="simulatore-5x1000">
        <div className={container}>
          <div className="mb-9 max-w-3xl">
            <Eyebrow>Fai una stima</Eyebrow>
            <h2 className="font-serif text-[clamp(34px,4vw,52px)] font-normal leading-tight tracking-[-0.035em] text-ink" id="simulatore-5x1000">
              Quanto vale il tuo <em className="font-normal text-rose">5×1000?</em>
            </h2>
          </div>
          <FivePerThousandCalculator />
        </div>
      </section>

      <section className={`${section} bg-ivory`}>
        <div className={container}>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <div>
              <Eyebrow>Come fare</Eyebrow>
              <h2 className={heading}>
                Come destinare il{" "}
                <em className="font-normal text-rose">5x1000.</em>
              </h2>
              <p className="mt-6 text-sm leading-7 text-muted">
                Segui il caso corrispondente alla tua dichiarazione. Per dubbi
                fiscali specifici, verifica sempre le istruzioni aggiornate con
                un CAF o un professionista.
              </p>
            </div>
            <div className="rounded-2xl border border-wine/25 bg-white p-7 sm:p-10">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">
                Esempio di compilazione
              </p>
              <div
                className="mt-6 rounded-lg border border-wine bg-[#faf9f7] p-5 text-wine sm:p-7"
                aria-label={`Esempio di compilazione con firma Mario Rossi e codice fiscale ${taxCode}`}
              >
                <p className="text-[11px] font-medium uppercase leading-snug tracking-[0.025em] sm:text-sm">
                  Finanziamento della ricerca scientifica e dell’università
                </p>

                <div className="mt-9 flex items-end gap-4 sm:mt-12">
                  <span className="shrink-0 text-[10px] font-medium uppercase sm:text-xs">
                    Firma
                  </span>
                  <span className="min-w-0 flex-1 border-b-2 border-dotted border-current pb-1 text-center text-xl leading-none sm:text-3xl">
                    Mario Rossi
                  </span>
                </div>

                <p className="mb-4 mt-10 max-w-40 text-[10px] leading-[1.05] sm:mt-12 sm:text-xs">
                  Codice fiscale del
                  <br />
                  beneficiario (eventuale)
                </p>
                <div className="grid grid-cols-11 border-b-2 border-x-2 border-current" aria-label={`Codice fiscale ${taxCode}`}>
                  {taxCode.split("").map((digit, index) => (
                    <span
                      className="grid aspect-[0.8] min-w-0 place-items-center border-r border-current text-[clamp(18px,4.2vw,42px)] leading-none last:border-r-0"
                      key={`${digit}-${index}`}
                      aria-hidden="true"
                    >
                      {digit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose">
              Quale dichiarazione presenti?
            </p>
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {[
                {
                  badge: "730",
                  title: "Modello 730",
                  audience: "Per lavoratori dipendenti e pensionati.",
                  steps: [
                    "Apri la sezione dedicata alle scelte 8, 5 e 2 per mille.",
                    "Seleziona il sostegno agli Enti del Terzo Settore iscritti nel RUNTS.",
                    `Firma e inserisci il codice fiscale ${taxCode}.`,
                  ],
                },
                {
                  badge: "PF",
                  title: "Redditi Persone Fisiche",
                  audience: "Per autonomi e situazioni reddituali più articolate.",
                  steps: [
                    "Trova la scheda per la destinazione del 5×1000.",
                    "Scegli il riquadro dedicato agli Enti del Terzo Settore iscritti nel RUNTS.",
                    `Firma e inserisci il codice fiscale ${taxCode}.`,
                  ],
                },
                {
                  badge: "CU",
                  title: "Certificazione Unica",
                  audience: "Per chi non presenta una dichiarazione dei redditi.",
                  steps: [
                    "Usa la scheda allegata alla Certificazione Unica.",
                    "Firma nel riquadro dedicato agli Enti del Terzo Settore.",
                    `Inserisci il codice fiscale ${taxCode} e consegna la scheda secondo le istruzioni vigenti.`,
                  ],
                },
              ].map((item) => (
                <article className="flex min-h-[530px] flex-col overflow-hidden border border-line bg-white" key={item.title}>
                  <div className="relative h-60 overflow-hidden bg-rose-soft p-7 sm:p-9">
                    <span className={`absolute right-4 font-serif leading-none tracking-[-0.08em] text-white/70 ${item.badge === "730" ? "-bottom-1 text-[96px]" : "-bottom-7 text-[116px]"}`} aria-hidden="true">
                      {item.badge}
                    </span>
                    <p className="relative z-10 text-[10px] font-extrabold uppercase tracking-[0.16em] text-wine">
                      Tipo di dichiarazione
                    </p>
                    <h3 className="relative z-10 mt-5 h-20 max-w-56 font-serif text-3xl font-normal leading-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="relative z-10 mt-3 max-w-60 text-sm leading-6 text-muted">
                      {item.audience}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col p-7 sm:p-9">
                    <ol className="grid gap-5 text-sm leading-6 text-muted">
                      {item.steps.map((step, index) => (
                        <li className="grid grid-cols-[28px_1fr] gap-3" key={step}>
                          <span className="grid size-7 place-items-center rounded-full bg-rose-soft text-xs font-bold text-wine" aria-hidden="true">{index + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-auto border-t border-line pt-6">
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-rose">Codice fiscale A-ROSE</p>
                      <p className="mt-2 font-mono text-base font-bold tracking-[0.08em] text-wine">{taxCode}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <a
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-wine"
              href="https://infoprecompilata.agenziaentrate.gov.it/portale/web/guest/scelte-8-5-e-2-per-mille"
              target="_blank"
              rel="noreferrer"
            >
              Consulta le istruzioni aggiornate dell’Agenzia delle Entrate
              <Icon className="size-4" name="arrow" />
            </a>
          </div>
        </div>
      </section>

      <section className={`${section} bg-white`}>
        <div className={container}>
          <Eyebrow>Trasparenza</Eyebrow>
          <h2 className={`${heading} max-w-4xl`}>
            Rendiconti e <em className="font-normal text-rose">bilanci.</em>
          </h2>
          <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {reports.map(([label, href]) => (
              <Link
                className="group flex min-h-32 items-center justify-between gap-5 bg-paper p-7 transition hover:bg-ivory"
                href={href}
                key={href}
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <span className="block text-[10px] font-extrabold uppercase tracking-[0.15em] text-rose">
                    PDF
                  </span>
                  <span className="mt-2 block font-serif text-xl text-ink">
                    {label}
                  </span>
                </span>
                <Icon
                  className="size-4 text-wine transition-transform group-hover:translate-x-1"
                  name="arrow"
                />
              </Link>
            ))}
          </div>
          <Link
            className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-wine"
            href="/trasparenza"
          >
            Consulta tutti i documenti <Icon className="size-4" name="arrow" />
          </Link>
        </div>
      </section>

      <section className={`${section} border-t border-line bg-ivory`}>
        <div
          className={`${container} grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24`}
        >
          <div>
            <Eyebrow>Domande frequenti</Eyebrow>
            <h2 className={heading}>
              Il 5x1000, <em className="font-normal text-rose">in breve.</em>
            </h2>
          </div>
          <div className="divide-y divide-line border-y border-line">
            <details className="group py-6" open>
              <summary className="cursor-pointer list-none font-serif text-2xl text-ink">
                Il 5x1000 ha un costo?
              </summary>
              <p className="mt-4 text-sm leading-7 text-muted">
                No. È una quota dell’imposta sul reddito già dovuta e non
                comporta un pagamento aggiuntivo.
              </p>
            </details>
            <details className="group py-6">
              <summary className="cursor-pointer list-none font-serif text-2xl text-ink">
                Cosa succede se non firmo?
              </summary>
              <p className="mt-4 text-sm leading-7 text-muted">
                La quota resta comunque destinata secondo i meccanismi previsti
                dalla normativa, ma non potrai scegliere direttamente A-ROSE.
              </p>
            </details>
            <details className="group py-6">
              <summary className="cursor-pointer list-none font-serif text-2xl text-ink">
                Posso destinare anche l’8x1000?
              </summary>
              <p className="mt-4 text-sm leading-7 text-muted">
                Sì. Le scelte del 5x1000, 8x1000 e 2x1000 sono distinte e
                possono coesistere.
              </p>
            </details>
            <details className="group py-6">
              <summary className="cursor-pointer list-none font-serif text-2xl text-ink">
                Dove trovo il codice fiscale?
              </summary>
              <p className="mt-4 text-sm leading-7 text-muted">
                Il codice fiscale di A-ROSE ODV è{" "}
                <strong className="text-ink">{taxCode}</strong>. Puoi copiarlo
                dalla parte iniziale di questa pagina.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
