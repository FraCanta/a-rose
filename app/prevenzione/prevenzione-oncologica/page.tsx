import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { container, heading } from "@/components/home/styles";

export const metadata: Metadata = {
  title: "Prevenzione oncologica | A-ROSE ODV",
  description: "Abitudini quotidiane, screening e fonti affidabili: una guida per orientarsi nella prevenzione oncologica e nei servizi del territorio.",
};

const sources = {
  code: "https://cancer-code-europe.iarc.who.int/",
  airc: "https://www.airc.it/cancro/prevenzione-tumore/alimentazione/stili-di-vita-anti-cancro",
  screening: "https://www.salute.gov.it/new/it/faq/faq-screening-tumori/",
  ferrara: "https://www.ausl.fe.it/strutture/azienda/servizi-territoriali/screening-oncologici-epidemiologia-e-programmi-di-promozione-della-salute",
};
const habits = [
  ["Tabacco", "Non fumare e limita l’esposizione al fumo passivo. Se vuoi smettere, chiedi aiuto al medico o a un centro antifumo: non devi affrontare il percorso da solo."],
  ["Movimento", "Inserisci attività fisica nella giornata, secondo le tue possibilità, e interrompi i lunghi periodi seduti. Anche camminare e spostarsi a piedi aiutano a costruire una routine più attiva."],
  ["Alimentazione", "Dai spazio a cereali integrali, legumi, verdura e frutta. Limita le carni rosse e quelle lavorate. Non esiste un singolo alimento capace di prevenire il cancro."],
  ["Alcol", "Per la prevenzione oncologica, non bere è la scelta migliore. Ridurre il consumo è un passo utile: vino e birra non fanno eccezione."],
  ["Sole e pelle", "Evita l’esposizione eccessiva ai raggi UV e le lampade abbronzanti. Cerca l’ombra e usa indumenti protettivi e protezione solare, con particolare attenzione ai bambini."],
  ["Vaccinazioni", "Informati sulle vaccinazioni contro HPV ed epatite B, infezioni associate ad alcuni tumori. Il servizio vaccinale può verificare le indicazioni per età e situazione personale."],
] as const;
const screenings = [
  ["Mammella", "Mammografia", "Un esame radiologico che può individuare un tumore prima che sia palpabile."],
  ["Collo dell’utero", "HPV test o Pap test", "Il test proposto dipende dal programma e dall’età: si ricercano l’HPV o alterazioni delle cellule del collo dell’utero."],
  ["Colon-retto", "Sangue occulto nelle feci", "Ricerca piccole tracce di sangue non visibili. Un risultato positivo richiede approfondimenti, generalmente una colonscopia: non equivale a una diagnosi di tumore."],
] as const;
const linkStyle = "text-wine underline decoration-wine/40 underline-offset-4 hover:decoration-wine";

export default function OncologyPreventionPage() {
  return (
    <main id="contenuto">
      <header className="bg-wine py-16 text-white sm:py-24">
        <div className={container}>
          <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/prevenzione">Prevenzione</Link><span aria-hidden="true">/</span><span aria-current="page">Prevenzione oncologica</span>
          </nav>
          <Eyebrow light>Conoscere per scegliere</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-tight sm:text-7xl">Prevenzione <em className="font-normal text-[#efabb6]">oncologica.</em></h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/85">Ridurre i rischi, partecipare ai controlli appropriati e sapere a chi rivolgersi. La prevenzione prende forma nelle scelte quotidiane e nell’accesso ai servizi sanitari.</p>
        </div>
      </header>

      <nav aria-label="In questa pagina" className="border-b border-line bg-ivory py-6">
        <div className={`${container} flex flex-wrap gap-x-8 gap-y-4 text-sm font-bold text-wine`}>
          <a href="#abitudini">Le abitudini quotidiane</a><a href="#screening">Gli screening</a><a href="#da-dove-iniziare">Da dove iniziare</a><a href="#fonti">Fonti e approfondimenti</a>
        </div>
      </nav>

      <section className="py-16 sm:py-24">
        <div className={`${container} grid gap-10 lg:grid-cols-2 lg:gap-20`}>
          <h2 className={heading}>Prevenire non significa <em className="font-normal text-rose">avere certezze.</em></h2>
          <div className="space-y-5 text-base leading-relaxed text-muted">
            <p>La prevenzione primaria cerca di ridurre la probabilità che un tumore si sviluppi. Gli screening, invece, cercano una malattia o alcune lesioni precancerose in persone senza sintomi, quando intervenire può essere più utile.</p>
            <p>Uno stile di vita sano non azzera il rischio. Ammalarsi non è una colpa: contano anche fattori che non possiamo modificare, e non tutte le persone hanno le stesse possibilità di accesso alla prevenzione.</p>
            <a className={linkStyle} href="https://www.airc.it/cancro/prevenzione-tumore/prevenzione-per-tutti/cancro-la-prevenzione">Approfondisci i diversi livelli di prevenzione su AIRC</a>
          </div>
        </div>
      </section>

      <section id="abitudini" className="scroll-mt-28 bg-ivory py-16 sm:py-24">
        <div className={container}>
          <Eyebrow>Prevenzione primaria</Eyebrow>
          <h2 className={`${heading} mt-5 max-w-3xl`}>Abitudini che fanno la differenza.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {habits.map(([title, text], index) => (
              <article key={title} className="site-card site-card-body">
                <span aria-hidden="true" className="font-serif text-3xl text-rose">0{index + 1}</span>
                <h3 className="mt-6 font-serif text-2xl text-ink">{title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted">{text}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm leading-relaxed text-muted">Riferimenti: <a className={linkStyle} href={sources.code}>Codice europeo contro il cancro, IARC</a> e <a className={linkStyle} href={sources.airc}>raccomandazioni sugli stili di vita, AIRC</a>. Sono indicazioni generali, da adattare alle proprie condizioni con un professionista sanitario.</p>
        </div>
      </section>

      <section id="screening" className="scroll-mt-28 py-16 sm:py-24">
        <div className={container}>
          <Eyebrow>Prevenzione secondaria</Eyebrow>
          <h2 className={`${heading} mt-5`}>Controlli appropriati, non più esami.</h2>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted">I programmi organizzati invitano le persone che rientrano nei criteri previsti e accompagnano gli eventuali approfondimenti. Età, test e intervalli possono variare: fai riferimento all’invito e alle informazioni della tua ASL.</p>
          <div className="mt-12 divide-y divide-line border-y border-line">
            {screenings.map(([title, test, text]) => (
              <article key={title} className="grid gap-4 py-8 md:grid-cols-[1fr_2fr] md:gap-12">
                <h3 className="font-serif text-3xl text-wine">{title}</h3>
                <div><p className="font-bold text-ink">{test}</p><p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">{text}</p></div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">Fonte: <a className={linkStyle} href={sources.screening}>Ministero della Salute — domande e risposte sugli screening</a>.</p>
          <aside className="mt-10 rounded-2xl bg-rose-soft p-7 sm:p-9">
            <h3 className="font-serif text-2xl text-wine">Hai un sintomo? Non aspettare lo screening.</h3>
            <p className="mt-4 max-w-4xl leading-relaxed text-ink">Un cambiamento nuovo, persistente o insolito merita un confronto con il medico, anche dopo un test negativo. Lo screening non sostituisce una visita per un disturbo e nessun esame può escludere ogni tumore.</p>
          </aside>
        </div>
      </section>

      <section id="da-dove-iniziare" className="scroll-mt-28 bg-wine py-16 text-white sm:py-20">
        <div className={`${container} grid gap-10 lg:grid-cols-2 lg:gap-20`}>
          <div><Eyebrow light>Un passo concreto</Eyebrow><h2 className="mt-5 font-serif text-4xl sm:text-5xl">Da dove iniziare?</h2><p className="mt-6 text-lg leading-relaxed text-white/85">Non serve cambiare tutto insieme. Puoi partire da una domanda al tuo medico e dalle informazioni del servizio sanitario del tuo territorio.</p></div>
          <ol className="list-decimal space-y-5 pl-6 text-base leading-relaxed text-white/90">
            <li>Controlla se hai ricevuto un invito allo screening. Se hai dubbi sui requisiti o sull’appuntamento, contatta il centro screening.</li>
            <li>Parla con il medico della tua storia personale e familiare: alcune situazioni richiedono percorsi diversi da quelli di popolazione.</li>
            <li>Scegli un’abitudine su cui lavorare e chiedi supporto se ne hai bisogno.</li>
          </ol>
          <a className="w-fit rounded-full bg-white px-7 py-4 font-bold text-wine" href={sources.ferrara}>Consulta il Centro screening AUSL Ferrara</a>
        </div>
      </section>

      <section id="fonti" className="scroll-mt-28 py-16">
        <div className={`${container} max-w-5xl`}>
          <h2 className="font-serif text-3xl text-ink">Per approfondire, parti dalle fonti.</h2>
          <ul className="mt-6 space-y-4">
            <li><a className={linkStyle} href={sources.code}>IARC — Codice europeo contro il cancro</a></li>
            <li><a className={linkStyle} href={sources.airc}>AIRC — Stili di vita e prevenzione</a></li>
            <li><a className={linkStyle} href={sources.screening}>Ministero della Salute — Screening oncologici</a></li>
            <li><a className={linkStyle} href={sources.ferrara}>AUSL Ferrara — Programmi e contatti del Centro screening</a></li>
          </ul>
          <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-muted">Contenuti informativi generali: non sostituiscono una visita, una diagnosi o indicazioni personalizzate. Per decisioni sulla tua salute rivolgiti a un professionista sanitario. Fonti consultate il 10 settembre 2026.</p>
          <Link className={`${linkStyle} mt-6 inline-block`} href="/prevenzione/faq">Continua con le domande frequenti</Link>
        </div>
      </section>
    </main>
  );
}
