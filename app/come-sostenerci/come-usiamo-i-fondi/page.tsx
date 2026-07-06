import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { container, heading, section } from "@/components/home/styles";
import { FundsDonutChart } from "@/components/support/funds-donut-chart";

export const metadata: Metadata = {
  title: "Come usiamo i fondi | A-ROSE ODV",
  description:
    "Le aree sostenute dalle donazioni ad A-ROSE ODV: ricerca oncologica, formazione, prevenzione, divulgazione e trasparenza.",
};

const fundAreas = [
  {
    title: "Servizi per attività associative",
    text: "Iniziative di ricerca, prevenzione, formazione e divulgazione scientifica",
    percentage: 79.8,
    color: "#0f5c63",
    dotClass: "bg-wine",
  },
  {
    title: "Materiali e consumi",
    text: "Materiali, consumi e attività necessarie allo svolgimento delle iniziative",
    percentage: 15.1,
    color: "#db5f74",
    dotClass: "bg-rose",
  },
  {
    title: "Altri oneri",
    text: "Oneri di gestione, supporto generale e rapporti finanziari",
    percentage: 5.1,
    color: "#ff5b45",
    dotClass: "bg-[#ff5b45]",
  },
] as const;

const chartItems = fundAreas.map((area) => ({
  label: area.title,
  value: area.percentage,
  color: area.color,
}));

const documents = [
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

export default function FundsUsePage() {
  return (
    <main id="contenuto">
      <section className="border-b border-line bg-paper py-14 sm:py-16 lg:py-20">
        <div className={container}>
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-xs text-muted"
          >
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/chi-siamo/la-nostra-associazione">Chi siamo</Link>
            <span>/</span>
            <span aria-current="page" className="text-ink">
              Come usiamo i fondi
            </span>
          </nav>
          <Eyebrow>Sostegno e trasparenza</Eyebrow>
          <h1 className="mt-5 max-w-5xl font-serif text-[clamp(42px,6vw,78px)] font-normal leading-[0.98] tracking-[-0.045em] text-ink">
            Come usiamo <em className="font-normal text-rose">i fondi.</em>
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            Attraverso il Bilancio Sociale, A-ROSE ODV rende conto in modo
            trasparente delle attività svolte, dei risultati raggiunti e della
            coerenza tra le azioni realizzate e le finalità dell’associazione. È
            uno strumento di responsabilità e consapevolezza, utile per valutare
            il percorso intrapreso, individuare nuove aree di miglioramento e
            rafforzare l’impatto delle iniziative a favore della ricerca, della
            prevenzione e della comunità.
          </p>
        </div>
      </section>

      <section className={`${section} border-b border-line bg-white`}>
        <div
          className={`${container} grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24`}
        >
          <div>
            <h2 className="max-w-2xl font-serif text-[clamp(42px,5.6vw,72px)] font-normal leading-[1.02] tracking-[-0.045em] text-ink">
              Come utilizziamo{" "}
              <em className="font-normal text-rose">le tue donazioni.</em>
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-[1.85] text-ink sm:text-lg">
              Le donazioni sostengono iniziative di ricerca, prevenzione,
              formazione e divulgazione scientifica. Una parte dei fondi copre
              anche materiali, servizi e altre attività necessarie per rendere i
              progetti operativi e rendicontabili.
            </p>
            <Link
              className="mt-7 inline-flex items-center gap-4 text-base font-bold text-wine transition hover:text-rose"
              href="https://a-roseodv.org/wp-content/uploads/2025/06/A-ROSE-OdV_Rendiconto-2024.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Scarica il documento di bilancio
              <Icon className="size-6" name="arrow" />
            </Link>

            <div className="mt-16 grid items-stretch gap-8 sm:grid-cols-3">
              {fundAreas.map((area) => (
                <article className="flex h-full flex-col" key={area.title}>
                  <p className="font-serif text-[clamp(50px,6vw,60px)] font-normal leading-none tracking-[-0.06em] text-wine">
                    {area.percentage.toLocaleString("it-IT", {
                      maximumFractionDigits: 1,
                      minimumFractionDigits: 1,
                    })}
                    %
                  </p>
                  <p className="mt-4 min-h-[84px] max-w-[250px] text-base leading-snug text-rose">
                    {area.text}
                  </p>
                  <span
                    className={`mt-auto block h-1.5 w-full ${area.dotClass}`}
                    aria-hidden="true"
                  />
                </article>
              ))}
            </div>
          </div>
          <div className="mx-auto w-full max-w-[620px] lg:max-w-[720px]">
            <FundsDonutChart items={chartItems} />
          </div>
        </div>
      </section>

      <section className={`${section} bg-ivory`}>
        <div className={container}>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <Eyebrow>Documenti</Eyebrow>
              <h2 className={heading}>
                Rendiconti e <em className="font-normal text-rose">bilanci.</em>
              </h2>
              <p className="mt-6 text-sm leading-7 text-muted">
                I documenti ufficiali si aprono in una nuova scheda e provengono
                dall’archivio pubblicato da A-ROSE.
              </p>
              <Link
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-wine"
                href="https://a-roseodv.org/wp-content/uploads/2025/06/A-ROSE-OdV_Rendiconto-2024.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Fonte: Rendiconto 2024 <Icon className="size-4" name="arrow" />
              </Link>
            </div>
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {documents.map(([label, href]) => (
                <Link
                  className="group flex min-h-28 items-center justify-between gap-5 bg-paper p-6 transition hover:bg-white"
                  href={href}
                  key={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">
                      PDF
                    </span>
                    <span className="mt-2 block font-serif text-2xl text-ink">
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
          </div>
        </div>
      </section>

      <section className="bg-wine py-16 text-white sm:py-20">
        <div
          className={`${container} flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center`}
        >
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#efabb6]">
              Sostegno consapevole
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl font-normal leading-tight sm:text-4xl">
              Vuoi contribuire ai progetti A-ROSE?
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-13 justify-center w-full lg:max-w-max items-center gap-3 rounded-full bg-white px-7 font-bold text-wine"
              href="/sostieni-la-ricerca#donazione"
            >
              Dona ora <Icon className="size-5" name="heart" />
            </Link>
            <Link
              className="inline-flex min-h-13 justify-center w-full lg:max-w-max items-center gap-3 rounded-full border border-white/50 px-7 font-bold text-white transition hover:bg-white/10"
              href="/trasparenza"
            >
              Vai alla trasparenza <Icon className="size-4" name="arrow" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
