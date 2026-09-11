import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutBreadcrumbs } from "@/components/about/about-breadcrumbs";
import { container, textLink } from "@/components/home/styles";

export const metadata: Metadata = {
  title: "Benefici fiscali | A-ROSE ODV",
  description: "Agevolazioni per le donazioni alle organizzazioni di volontariato: detrazione, deduzione, documenti da conservare e domande frequenti.",
};

const sources = {
  law: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2017-07-03;117~art83!vig=",
  donations: "https://infoprecompilata.agenziaentrate.gov.it/portale/semplificata-mod-erogazioni-liberali",
  limits: "https://infoprecompilata.agenziaentrate.gov.it/portale/oneri-e-spese",
};

type Benefit = { title: string; benefit: string; conditions: string; reference: string };
const individualBenefits: Benefit[] = [
  { title: "Detrazione IRPEF", benefit: "35% della donazione", conditions: "Per donazioni alle OdV, su un importo complessivo fino a 30.000 € annui. Nei limiti dell’imposta dovuta e degli ulteriori tetti applicabili al contribuente.", reference: "Art. 83, comma 1" },
  { title: "Deduzione dal reddito", benefit: "Entro il 10% del reddito complessivo dichiarato", conditions: "Alternativa alla detrazione per la stessa donazione. Riduce il reddito su cui viene calcolata l’imposta.", reference: "Art. 83, comma 2" },
];
const companyBenefits: Benefit[] = [
  { title: "Deduzione dal reddito", benefit: "Entro il 10% del reddito complessivo dichiarato", conditions: "Per enti e società, alle condizioni previste dal Codice del Terzo settore. Il regime fiscale del donatore va verificato con il proprio consulente.", reference: "Art. 83, comma 2" },
];
const faqs = [
  { question: "Come posso ottenere i benefici fiscali?", answer: "Effettua la donazione con un pagamento tracciabile e conserva la prova del versamento e la documentazione associativa. Per applicare l’agevolazione nella dichiarazione dei redditi, confrontati con il CAF o con il tuo consulente." },
  { question: "Una donazione in contanti dà diritto all’agevolazione?", answer: "Per le donazioni in denaro scegli bonifico, carta o un altro strumento tracciabile. Il contante non soddisfa il requisito di tracciabilità richiesto per le agevolazioni qui descritte." },
  { question: "Qual è la differenza tra detrazione e deduzione?", answer: "La detrazione riduce l’imposta da pagare. La deduzione riduce invece il reddito imponibile. Per la stessa donazione le due opzioni sono alternative: la convenienza dipende dalla tua situazione fiscale." },
  { question: "Quali documenti devo conservare?", answer: "Conserva la contabile del bonifico o l’estratto conto del pagamento con carta, insieme all’eventuale ricevuta. I documenti devono consentire di ricostruire il versamento e identificare donatore e beneficiario. Per la documentazione di A-ROSE puoi contattare l’associazione." },
  { question: "La donazione non compare nella precompilata: cosa posso fare?", answer: "Controlla la documentazione con il CAF o con il professionista che segue la dichiarazione. L’assenza nella precompilata non determina da sola la perdita dell’agevolazione: occorre verificare i requisiti e, se spettante, inserire correttamente l’onere." },
  { question: "Ho donato con un conto cointestato o una carta di un’altra persona: come procedo?", answer: "Porta al CAF o al consulente la documentazione del pagamento e della donazione. Occorre chiarire chi ha effettivamente sostenuto la spesa e a chi può essere attribuita l’agevolazione prima di inserirla in dichiarazione." },
];

function BenefitsComparison({ title, rows }: { title: string; rows: Benefit[] }) {
  return (
    <section className="border-t border-line pt-10">
      <h2 className="font-serif text-3xl text-wine">{title}</h2>
      <table className="mt-7 hidden w-full border-collapse text-left text-base leading-relaxed md:table">
        <caption className="sr-only">Agevolazioni per {title.toLowerCase()}</caption>
        <thead className="border-y border-wine/40 text-wine"><tr>{["Trattamento fiscale", "Beneficio e condizioni", "Riferimento"].map((label) => <th key={label} scope="col" className="px-4 py-4 align-top font-semibold first:pl-0 last:pr-0">{label}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row.title} className="border-b border-line"><th scope="row" className="w-1/4 py-6 pr-4 align-top font-semibold text-ink">{row.title}</th><td className="px-4 py-6 align-top"><strong className="font-semibold text-wine">{row.benefit}</strong><p className="mt-3 text-muted">{row.conditions}</p></td><td className="w-1/5 py-6 pl-4 align-top"><a href={sources.law} className="text-wine underline underline-offset-4">{row.reference}</a></td></tr>)}</tbody>
      </table>
      <div className="mt-6 space-y-5 md:hidden">{rows.map((row) => <article key={row.title} className="border border-line bg-paper p-5"><h3 className="font-serif text-2xl text-wine">{row.title}</h3><dl className="mt-5 space-y-4 text-base leading-7"><div><dt className="font-semibold text-ink">Beneficio</dt><dd className="mt-1 text-wine">{row.benefit}</dd></div><div><dt className="font-semibold text-ink">Condizioni</dt><dd className="mt-1 text-muted">{row.conditions}</dd></div><div><dt className="font-semibold text-ink">Riferimento normativo</dt><dd className="mt-1"><a href={sources.law} className="text-wine underline underline-offset-4">{row.reference}</a></dd></div></dl></article>)}</div>
    </section>
  );
}

export default function TaxBenefitsPage() {
  return (
    <main id="contenuto">
      <header className="bg-ivory py-10 sm:py-16 lg:py-20">
        <div className={`${container} grid items-center gap-10 lg:grid-cols-2 lg:gap-20`}>
          <div><AboutBreadcrumbs current="Benefici fiscali" /><h1 className="font-serif text-[clamp(42px,5vw,76px)] font-normal leading-tight tracking-[-0.035em] text-wine">Benefici fiscali</h1><p className="mt-5 text-lg leading-relaxed text-muted">Le agevolazioni per chi sostiene la ricerca.</p></div>
          <Image src="/images/ricerca-dettaglio.webp" alt="Attività di ricerca in laboratorio" width={960} height={640} priority sizes="(max-width: 1023px) 100vw, 50vw" className="aspect-[3/2] w-full object-cover" />
        </div>
      </header>

      <div className={`${container} py-14 sm:py-20`}>
        <div className="mx-auto max-w-[860px] space-y-12 sm:space-y-16">
          <section aria-label="Le agevolazioni per le donazioni" className="space-y-5 text-base leading-7 text-muted">
            <p className="text-lg text-wine">Sostenere A-ROSE significa contribuire alla ricerca oncologica. Le donazioni alle organizzazioni di volontariato possono beneficiare delle agevolazioni previste dall’articolo 83 del Codice del Terzo settore, alle condizioni stabilite dalla legge.</p>
            <p><strong className="text-ink">Detrazione e deduzione sono alternative per la stessa donazione.</strong> La scelta dipende dal reddito, dall’imposta dovuta e dal regime fiscale del donatore.</p>
            <p>Effettua il versamento con <strong className="text-ink">strumenti di pagamento tracciabili</strong>, come bonifico o carta, e conserva la documentazione. Per individuare l’opzione applicabile al tuo caso, rivolgiti a un CAF o a un professionista abilitato.</p>
            <Link href="/trasparenza" className={textLink}>Consulta i documenti di A-ROSE <span aria-hidden="true">→</span></Link>
          </section>

          <BenefitsComparison title="Persone fisiche" rows={individualBenefits} />
          <aside className="border-l-2 border-rose bg-ivory p-6 text-base leading-7 text-muted" aria-label="Limiti delle detrazioni"><p>Dal periodo d’imposta 2025, per redditi complessivi superiori a 75.000 €, si applicano ulteriori limiti alle spese detraibili. La percentuale indicata non equivale quindi a un rimborso automatico: verifica anche capienza fiscale e limiti personali. <a href={sources.limits} className="text-wine underline underline-offset-4">Indicazioni dell’Agenzia delle Entrate</a>.</p></aside>
          <BenefitsComparison title="Enti e società" rows={companyBenefits} />

          <section className="border-t border-line pt-10"><h2 className="font-serif text-3xl text-wine">Prima della dichiarazione</h2><p className="mt-5 text-base leading-7 text-muted">Verifica i dati del donatore, la data e l’importo del pagamento. Se ti occorrono informazioni o documenti relativi alla donazione ad A-ROSE, contattaci indicando gli elementi utili a rintracciare il versamento.</p><Link href="/contatti" className={`${textLink} mt-5`}>Richiedi informazioni all’associazione <span aria-hidden="true">→</span></Link></section>

          <section aria-labelledby="faq-benefici"><h2 id="faq-benefici" className="font-serif text-3xl text-wine">Domande frequenti</h2><div className="mt-7 space-y-3">{faqs.map((faq) => <details key={faq.question} className="group bg-ivory px-5 sm:px-7"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-semibold leading-relaxed text-ink [&::-webkit-details-marker]:hidden">{faq.question}<span aria-hidden="true" className="shrink-0 text-2xl font-normal text-wine group-open:rotate-45">+</span></summary><p className="border-t border-line pb-6 pt-5 text-base leading-7 text-muted">{faq.answer}</p></details>)}</div></section>

          <section className="border-t border-line pt-8 text-base leading-7 text-muted" aria-label="Fonti e aggiornamento"><h2 className="font-serif text-2xl text-wine">Fonti ufficiali</h2><ul className="mt-4 list-disc space-y-2 pl-5"><li><a href={sources.law} className="text-wine underline underline-offset-4">Codice del Terzo settore — articolo 83</a></li><li><a href={sources.donations} className="text-wine underline underline-offset-4">Agenzia delle Entrate — erogazioni liberali</a></li></ul><p className="mt-5">Informazioni generali verificate l’11 settembre 2026. Il trattamento applicabile va valutato in relazione all’anno della donazione e alla situazione del contribuente.</p></section>
        </div>
      </div>
    </main>
  );
}
