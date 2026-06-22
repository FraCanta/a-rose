import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { container, heading, section } from "@/components/home/styles";
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
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source
              src="https://youtu.be/eqPjmk0420k?si=woWgkn-vpmxZLia7&t=5"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-wine/30 via-transparent to-transparent lg:from-wine/15" />
        </div>
      </section>

      <section className={`${section} bg-white`}>
        <div
          className={`${container} grid items-center gap-12 lg:grid-cols-2 lg:gap-24`}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[48%_52%_45%_55%/52%_45%_55%_48%] bg-rose-soft">
            <Image
              className="object-cover"
              src="/images/sostegno-cuore.webp"
              alt="Mani che custodiscono un cuore, simbolo del sostegno alla ricerca"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </div>
          <div>
            <Eyebrow>Una scelta semplice</Eyebrow>
            <h2 className={heading}>
              Il tuo 5x1000{" "}
              <em className="font-normal text-rose">non costa nulla.</em>
            </h2>
            <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
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
              <p className="mt-5 text-sm font-bold text-ink">
                Sostegno degli Enti del Terzo Settore iscritti nel RUNTS
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {taxCode.split("").map((digit, index) => (
                  <span
                    className="grid size-10 place-items-center border border-wine/35 font-mono text-lg text-wine sm:size-12"
                    key={`${digit}-${index}`}
                  >
                    {digit}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-14 grid border border-line bg-line md:grid-cols-2">
            <article className="bg-paper p-8 sm:p-10">
              <span className="font-serif text-6xl text-rose">01</span>
              <h3 className="mt-7 font-serif text-2xl text-ink">
                Presenti la dichiarazione dei redditi
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted">
                Firma nel riquadro dedicato agli Enti del Terzo Settore e
                inserisci il codice fiscale{" "}
                <strong className="text-ink">{taxCode}</strong>.
              </p>
            </article>
            <article className="bg-paper p-8 sm:p-10 md:border-l md:border-line">
              <span className="font-serif text-6xl text-rose">02</span>
              <h3 className="mt-7 font-serif text-2xl text-ink">
                Non presenti la dichiarazione
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted">
                Puoi utilizzare la scheda allegata alla Certificazione Unica,
                firmarla e consegnarla secondo le modalità indicate dalle
                istruzioni fiscali vigenti.
              </p>
            </article>
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
