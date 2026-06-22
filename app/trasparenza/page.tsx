import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { container, heading, section } from "@/components/home/styles";

export const metadata: Metadata = {
  title: "Trasparenza | A-ROSE ODV",
  description: "Statuto, rendiconti, bilanci e dati associativi ufficiali di A-ROSE ODV.",
};

const documents = [
  ["Statuto dell’associazione", "Documento associativo", "https://a-roseodv.org/wp-content/uploads/2025/06/A-ROSE-OdV_Statuto.pdf"],
  ["Rendiconto 2024", "Rendiconto annuale", "https://a-roseodv.org/wp-content/uploads/2025/06/A-ROSE-OdV_Rendiconto-2024.pdf"],
  ["Rendiconto 2023", "Rendiconto annuale", "https://a-roseodv.org/wp-content/uploads/2025/06/A-ROSE-OdV_Rendiconto-2023.pdf"],
  ["Rendiconto 2022", "Rendiconto annuale", "https://a-roseodv.org/wp-content/uploads/2025/06/A-ROSE-OdV_Rendiconto-2022.pdf"],
  ["Rendiconto 2021", "Rendiconto annuale", "https://a-roseodv.org/wp-content/uploads/2025/06/A-ROSE-OdV_Rendiconto-2021.pdf"],
  ["Bilancio 2020", "Bilancio annuale", "https://a-roseodv.org/wp-content/uploads/2025/06/A-ROSE-OdV_Bilancio-2020.pdf"],
  ["Bilancio 2019", "Bilancio annuale", "https://a-roseodv.org/wp-content/uploads/2025/06/A-ROSE-OdV_Bilancio-2019.pdf"],
] as const;

export default function TransparencyPage() {
  return (
    <main id="contenuto">
      <header className="border-b border-line bg-ivory px-5 py-16 sm:px-8 lg:py-24">
        <div className={container}>
          <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-2 text-xs text-muted">
            <Link href="/">Home</Link><span>/</span><Link href="/chi-siamo/la-nostra-associazione">Chi siamo</Link><span>/</span><span aria-current="page" className="text-ink">Trasparenza</span>
          </nav>
          <Eyebrow>Trasparenza</Eyebrow>
          <h1 className="mt-5 max-w-5xl font-serif text-[clamp(46px,6vw,80px)] leading-[0.98] tracking-[-0.045em] text-ink">
            Fiducia, documenti e <em className="font-normal text-rose">responsabilità.</em>
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            A-ROSE rende pubblici i documenti fondamentali dell’associazione per garantire chiarezza sulle attività, sulla struttura organizzativa e sull’utilizzo delle risorse.
          </p>
        </div>
      </header>

      <section className={`${section} bg-white`}>
        <div className={container}>
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <Eyebrow>Documenti ufficiali</Eyebrow>
              <h2 className={heading}>Un archivio <em className="font-normal text-rose">consultabile.</em></h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-muted">I documenti si aprono in formato PDF in una nuova scheda. L’archivio segue la pubblicazione ufficiale presente sul sito dell’associazione.</p>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {documents.map(([title, kind, href]) => (
                <li key={href}>
                  <Link className="group grid min-h-24 grid-cols-[auto_1fr_auto] items-center gap-4 py-5 transition hover:bg-ivory sm:px-5" href={href} target="_blank" rel="noreferrer">
                    <span className="grid size-11 place-items-center rounded-full bg-rose-soft text-[10px] font-extrabold text-wine">PDF</span>
                    <span><span className="block font-serif text-xl text-ink sm:text-2xl">{title}</span><span className="mt-1 block text-xs text-muted">{kind}</span></span>
                    <Icon className="size-4 text-wine transition-transform group-hover:translate-x-1" name="arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ivory px-5 py-14 sm:px-8 lg:py-18">
        <div className={`${container} grid gap-8 sm:grid-cols-3`}>
          <div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">Codice fiscale</p><p className="mt-3 font-serif text-2xl text-ink">93096710384</p></div>
          <div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">Registro</p><p className="mt-3 font-serif text-2xl text-ink">RUNTS – OdV n. 34668</p></div>
          <div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">Contatti</p><Link className="mt-3 block font-serif text-2xl text-ink hover:text-wine" href="mailto:info@a-roseodv.org">info@a-roseodv.org</Link></div>
        </div>
      </section>
    </main>
  );
}
