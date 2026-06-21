import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { container, heading, section, textLink } from "@/components/home/styles";

export const metadata: Metadata = {
  title: "Come sostenerci | A-ROSE ODV",
  description: "Sostieni la ricerca oncologica di A-ROSE ODV con una donazione o il tuo tempo.",
};

const ways = [
  ["heart", "Dona", "Con una donazione, aiuti a costruire un futuro libero dal cancro.", "/sostieni-la-ricerca#donazione", "Dona ora"],
  ["people", "Diventa volontario", "Metti a disposizione tempo, competenze ed energia per le iniziative A-ROSE.", "/contatti", "Contattaci"],
  ["book", "Condividi la missione", "Aiuta la cultura scientifica e la missione A-ROSE a raggiungere più persone.", "/news", "Leggi e condividi"],
] as const;

export default function SupportPage() {
  return (
    <main id="contenuto">
      <header className="border-b border-line bg-white py-12 sm:py-16">
        <div className={container}>
          <Eyebrow>Come sostenerci</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-serif text-[clamp(44px,6vw,78px)] font-normal leading-[0.98] tracking-[-0.045em] text-ink">
            Sostieni la <em className="font-normal text-rose">ricerca.</em>
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-[1.85] text-muted sm:text-lg">
            Ogni contributo, piccolo o grande, ci avvicina al nostro obiettivo. Scegli come vuoi supportarci: una donazione, il tuo tempo o semplicemente condividendo la nostra missione.
          </p>
        </div>
      </header>

      <section className={`${section} bg-white`}>
        <div className={container}>
          <Eyebrow>Scegli il tuo modo</Eyebrow>
          <h2 className={heading}>Scegli come vuoi <em className="font-normal text-rose">supportarci.</em></h2>
          <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-3">
            {ways.map(([icon, title, text, href, label]) => (
              <article className="flex min-h-[300px] flex-col bg-paper p-8 sm:p-10" key={title}>
                <span className="grid size-12 place-items-center rounded-full bg-rose-soft text-wine"><Icon className="size-5" name={icon} /></span>
                <h3 className="mt-7 font-serif text-3xl font-normal text-ink">{title}</h3>
                <p className="mt-4 text-sm leading-[1.8] text-muted">{text}</p>
                <Link className="mt-auto flex items-center gap-2 pt-7 text-xs font-bold text-wine" href={href}>{label} <Icon className="size-4" name="arrow" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-wine py-16 text-white sm:py-20 lg:py-24">
        <div className={`${container} grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20`}>
          <div className="max-w-[850px]">
            <Eyebrow light>Donazioni</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(40px,5.4vw,72px)] font-normal leading-[1.02] tracking-[-0.04em]">Fai la differenza <em className="font-normal text-[#efabb6]">oggi.</em></h2>
            <p className="mt-6 max-w-[650px] text-base leading-[1.8] text-white/80 sm:text-lg">Con una donazione, aiuti a costruire un futuro libero dal cancro.</p>
            <div className="mt-7 border-t border-white/20 pt-6 text-sm leading-[1.8] text-white/80">
              <p className="font-bold text-white">Bonifico intestato ad A-ROSE ODV</p>
              <p className="mt-1 break-all font-mono">IBAN IT46A0301503200000003758386</p>
              <p className="mt-1">Causale: “Erogazione liberale”</p>
            </div>
          </div>
          <Link className="inline-flex min-h-13 items-center justify-center gap-3 self-end rounded-full bg-white px-8 font-bold text-wine" href="/sostieni-la-ricerca#donazione">Dona ora <Icon className="size-5" name="heart" /></Link>
        </div>
      </section>

      <section className={`${section} bg-ivory`}>
        <div className={`${container} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24`}>
          <div><Eyebrow>Domande frequenti</Eyebrow><h2 className={heading}>Donare con <em className="font-normal text-rose">consapevolezza.</em></h2></div>
          <div className="divide-y divide-line border-y border-line">
            <details className="group py-6" open><summary className="cursor-pointer list-none font-serif text-2xl text-ink">Come posso donare?</summary><p className="mt-4 max-w-3xl text-sm leading-[1.8] text-muted">Puoi usare il modulo online oppure effettuare un bonifico intestato ad A-ROSE ODV, indicando nella causale “Erogazione liberale”.</p></details>
            <details className="group py-6"><summary className="cursor-pointer list-none font-serif text-2xl text-ink">Come vengono usate le donazioni?</summary><p className="mt-4 max-w-3xl text-sm leading-[1.8] text-muted">Tutte le donazioni sostengono la ricerca scientifica sul cancro nei suoi aspetti traslazionali e clinici, la realizzazione di progetti, le borse di studio e di ricerca e l&apos;educazione oncologica su prevenzione, diagnosi precoce e nuove terapie.</p></details>
            <details className="group py-6"><summary className="cursor-pointer list-none font-serif text-2xl text-ink">Posso scegliere un progetto?</summary><p className="mt-4 max-w-3xl text-sm leading-[1.8] text-muted">Sì. Puoi indicare il progetto durante la donazione oppure inviarci direttamente le informazioni sul progetto che vuoi sostenere.</p></details>
          </div>
        </div>
      </section>

      <section className={`${section} bg-white`} id="trasparenza">
        <div className={`${container} grid gap-10 lg:grid-cols-2 lg:gap-20`}>
          <div><Eyebrow>Agevolazioni fiscali</Eyebrow><h2 className={heading}>Ogni donazione è una scelta <em className="font-normal text-rose">consapevole.</em></h2></div>
          <div className="border-l border-line pl-7 sm:pl-10">
            <p className="text-base leading-[1.85] text-muted">Le erogazioni liberali permettono di beneficiare delle agevolazioni fiscali previste per le donazioni agli Enti del Terzo Settore. Conserva la ricevuta del pagamento tracciabile e contattaci se hai bisogno dei dati associativi.</p>
            <Link className={`${textLink} mt-6`} href="/contatti">Richiedi informazioni <Icon className="size-4" name="arrow" /></Link>
          </div>
        </div>
      </section>

      <section className={`${section} bg-ivory`}>
        <div className={`${container} grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-20`}>
          <div><Eyebrow>Campagne di raccolta fondi</Eyebrow><h2 className={heading}>Partecipa alle iniziative per <em className="font-normal text-rose">sostenere la ricerca.</em></h2><p className="mt-6 max-w-3xl text-base leading-[1.8] text-muted">Aiuta A-ROSE donando oggi. Puoi sostenere la raccolta generale oppure scegliere uno dei progetti dell&apos;associazione.</p></div>
          <Link className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-wine px-8 font-bold text-white" href="/sostieni-la-ricerca#donazione">Vai alla donazione <Icon className="size-5" name="heart" /></Link>
        </div>
      </section>

      <section className={`${section} bg-white`}>
        <div className={`${container} text-center`}><Eyebrow centered>Dedicaci il tuo tempo</Eyebrow><h2 className={`${heading} mx-auto max-w-4xl`}>Diventa <em className="font-normal text-rose">volontario.</em></h2><p className="mx-auto mt-6 max-w-2xl text-base leading-[1.8] text-muted">Unisciti a noi come volontario e aiutaci a sostenere la ricerca sul cancro.</p><Link className="mt-8 inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-wine px-8 font-bold text-wine" href="/contatti">Unisciti a noi <Icon className="size-4" name="arrow" /></Link></div>
      </section>
    </main>
  );
}
