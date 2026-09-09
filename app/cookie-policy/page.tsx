import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/content/legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy | A-ROSE ODV",
  description: "Informazioni sui cookie e sulle tecnologie utilizzate dal sito A-ROSE ODV.",
};

const services = [
  ["Elementor", "Statistiche anonime"], ["WordPress", "Funzionale"], ["GiveWP", "Funzionale"],
  ["LiteSpeed", "Funzionale"], ["Google Fonts", "Pubblicità"], ["Google reCAPTCHA", "Pubblicità"],
  ["Facebook", "Pubblicità, funzionale"], ["Complianz", "Funzionale"],
  ["Google Analytics", "Statistiche"], ["Varie", "Scopo in attesa di indagine"],
] as const;

const sections: LegalSection[] = [
  { id: "introduzione", title: "1. Introduzione", content: <p>Il nostro sito web utilizza cookie e altre tecnologie correlate; per comodità, tutte queste tecnologie sono definite “cookie”. Alcuni cookie possono essere inseriti anche da terze parti. In questa pagina informiamo sull’uso dei cookie.</p> },
  { id: "cosa-sono", title: "2. Cosa sono i cookie?", content: <p>I cookie sono piccoli file inviati insieme alle pagine del sito e salvati dal browser sul computer o su altri dispositivi. Le informazioni contenute possono essere rinviate ai nostri server o ai server di terze parti durante una visita successiva.</p> },
  { id: "script", title: "3. Cosa sono gli script?", content: <p>Uno script è una porzione di codice usata per far funzionare il sito correttamente e in modo interattivo. Può essere eseguito sui nostri server o sul dispositivo dell’utente.</p> },
  { id: "web-beacon", title: "4. Cos’è un web beacon?", content: <p>Un web beacon, o pixel tag, è un piccolo elemento invisibile inserito in una pagina e utilizzato per monitorare il traffico. Attraverso i web beacon possono essere conservati diversi dati.</p> },
  { id: "tipi", title: "5. Tipologie di cookie", content: <><p><strong>Cookie tecnici o funzionali.</strong> Assicurano il corretto funzionamento del sito e mantengono valide le preferenze. Possono essere installati senza consenso quando strettamente necessari.</p><p><strong>Cookie statistici.</strong> Aiutano a comprendere come viene utilizzato il sito e a migliorarne l’esperienza. Quando richiesto dalla normativa vengono installati soltanto previo consenso.</p><p><strong>Cookie di marketing o tracciamento.</strong> Possono creare profili per mostrare pubblicità o tracciare l’utente su questo e altri siti per finalità analoghe.</p><p><strong>Social media.</strong> I contenuti incorporati da piattaforme esterne possono installare cookie e trattare dati personali secondo le rispettive informative.</p></> },
  { id: "cookie-inseriti", title: "6. Cookie e servizi inseriti", content: <><p>La precedente versione del sito dichiarava i seguenti servizi. L’effettiva presenza dei relativi cookie dipende dalle funzionalità attive e dal consenso espresso:</p><div className="mt-6 overflow-hidden rounded-sm border border-line">{services.map(([name, purpose]) => <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-line px-4 py-3 last:border-b-0 odd:bg-ivory" key={name}><strong>{name}</strong><span className="text-right text-sm">{purpose}</span></div>)}</div></> },
  { id: "consenso", title: "7. Consenso", content: <><p>Quando previsto, alla prima visita viene mostrato un avviso con la possibilità di accettare o rifiutare le categorie di cookie non essenziali. I cookie tecnici necessari restano attivi per consentire il funzionamento del sito.</p><p>Le preferenze possono essere modificate attraverso gli strumenti di consenso disponibili sul sito oppure tramite le impostazioni del browser.</p></> },
  { id: "disabilitare", title: "8. Abilitare, disabilitare e cancellare i cookie", content: <><p>È possibile cancellare i cookie automaticamente o manualmente dalle impostazioni del browser, impedire che vengano installati o ricevere un avviso quando un sito tenta di salvarli.</p><p>Disabilitando tutti i cookie, alcune parti del sito potrebbero non funzionare correttamente. Dopo la cancellazione, i cookie consentiti possono essere nuovamente inseriti durante una visita successiva.</p></> },
  { id: "diritti", title: "9. Diritti in relazione ai dati personali", content: <><p>L’interessato ha diritto di conoscere modalità, finalità e durata del trattamento; chiedere accesso, rettifica, cancellazione, limitazione o portabilità dei dati; revocare il consenso e opporsi al trattamento quando ne ricorrono i presupposti.</p><p>Per maggiori informazioni consulta la <Link href="/privacy-policy">Privacy Policy</Link>. È inoltre possibile presentare reclamo al Garante per la protezione dei dati personali.</p></> },
  { id: "contatti", title: "10. Dettagli di contatto", content: <address className="not-italic"><strong>A‑ROSE ODV</strong><br />Ferrara, Italia<br /><Link href="https://a-roseodv.org">https://a-roseodv.org</Link><br /><Link href="mailto:info@a-roseodv.org">info@a-roseodv.org</Link></address> },
];

export default function CookiePolicyPage() {
  return <LegalPage eyebrow="Trasparenza digitale" title="Cookie Policy" introduction={<>La precedente informativa indicava come ultimo aggiornamento il <strong>13 marzo 2026</strong> e l’applicazione ai cittadini e residenti permanenti dello Spazio Economico Europeo e della Svizzera.</>} sections={sections} />;
}
