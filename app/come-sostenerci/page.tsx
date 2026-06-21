import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/content/page-intro";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { container, heading, section } from "@/components/home/styles";
import { getSitePage } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Come sostenerci | A-ROSE ODV",
  description:
    "Sostieni la ricerca oncologica di A-ROSE ODV con una donazione, il tuo tempo o condividendo la nostra missione.",
};

const ways = [
  ["heart", "Dona", "Con una donazione, aiuti a costruire un futuro libero dal cancro.", "/sostieni-la-ricerca#donazione", "Dona ora"],
  ["people", "Diventa volontario", "Metti a disposizione tempo, competenze ed energia per le iniziative A-ROSE.", "/contatti", "Contattaci"],
  ["book", "Condividi la missione", "Aiuta la cultura scientifica e la missione A-ROSE a raggiungere più persone.", "/news", "Leggi e condividi"],
] as const;

export default async function SupportPage() {
  const source = await getSitePage("come-sostenerci");

  return (
    <main id="contenuto">
      <PageIntro
        eyebrow="Come sostenerci"
        title="Sostieni la"
        accent="ricerca."
        text="Ogni contributo, piccolo o grande, ci avvicina al nostro obiettivo. Scegli come vuoi supportarci: una donazione, il tuo tempo o semplicemente condividendo la nostra missione."
        image={source?.images.find((image) => image.includes("Pazienti.jpg")) ?? source?.images[0]}
        imageAlt="Persone unite nel sostegno alla ricerca"
      />

      <section className={`${section} bg-white`}>
        <div className={container}>
          <Eyebrow>Scegli il tuo modo</Eyebrow>
          <h2 className={heading}>Scegli come vuoi <em className="font-normal text-rose">supportarci.</em></h2>
          <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-3">
            {ways.map(([icon, title, text, href, label]) => (
              <article className="flex min-h-[300px] flex-col bg-paper p-8 sm:p-10" key={title}>
                <span className="grid size-12 place-items-center rounded-full bg-rose-soft text-wine">
                  <Icon className="size-5" name={icon} />
                </span>
                <h3 className="mt-7 font-serif text-3xl font-normal text-ink">{title}</h3>
                <p className="mt-4 text-sm leading-[1.8] text-muted">{text}</p>
                <Link className="mt-auto flex items-center gap-2 pt-7 text-xs font-bold text-wine" href={href}>
                  {label} <Icon className="size-4" name="arrow" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-wine py-16 text-white sm:py-20 lg:py-24">
        <div className={`${container} grid items-end gap-10 lg:grid-cols-[1fr_auto] lg:gap-20`}>
          <div className="max-w-[850px]">
            <Eyebrow light>Donazioni</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(40px,5.4vw,72px)] font-normal leading-[1.02] tracking-[-0.04em]">
              Fai la differenza <em className="font-normal text-[#efabb6]">oggi.</em>
            </h2>
            <p className="mt-6 max-w-[650px] text-base leading-[1.8] text-white/80 sm:text-lg">
              Con una donazione, aiuti a costruire un futuro libero dal cancro.
            </p>
          </div>
          <Link
            className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-white px-8 font-bold text-wine transition hover:bg-rose-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="/sostieni-la-ricerca#donazione"
          >
            Dona ora <Icon className="size-5" name="heart" />
          </Link>
        </div>
      </section>

      <section className={`${section} bg-ivory`}>
        <div className={`${container} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24`}>
          <div>
            <Eyebrow>Domande frequenti</Eyebrow>
            <h2 className={heading}>Donare con <em className="font-normal text-rose">consapevolezza.</em></h2>
          </div>
          <div className="divide-y divide-line border-y border-line">
            <details className="group py-6" open>
              <summary className="cursor-pointer list-none font-serif text-2xl text-ink">Come posso donare?</summary>
              <p className="mt-4 max-w-3xl text-sm leading-[1.8] text-muted">Puoi usare il modulo online oppure effettuare un bonifico intestato ad A-ROSE ODV, indicando nella causale “Erogazione liberale”.</p>
            </details>
            <details className="group py-6">
              <summary className="cursor-pointer list-none font-serif text-2xl text-ink">Come vengono usate le donazioni?</summary>
              <p className="mt-4 max-w-3xl text-sm leading-[1.8] text-muted">Le risorse sostengono ricerca oncologica traslazionale e clinica, progetti scientifici, borse di studio, formazione e attività di prevenzione e divulgazione.</p>
            </details>
            <details className="group py-6">
              <summary className="cursor-pointer list-none font-serif text-2xl text-ink">Posso scegliere un progetto?</summary>
              <p className="mt-4 max-w-3xl text-sm leading-[1.8] text-muted">Sì. Puoi indicare il progetto scelto durante la donazione o contattare direttamente l’associazione.</p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
