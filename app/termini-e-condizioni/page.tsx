import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/content/legal-page";

export const metadata: Metadata = {
  title: "Termini e condizioni | A-ROSE ODV",
  description: "Condizioni di utilizzo del sito A-ROSE: account, contenuti, raccolte fondi e donazioni.",
};

const sections: LegalSection[] = [
  {
    id: "utilizzo",
    title: "1. Utilizzo del sito",
    content: <><p>Questa pagina descrive le condizioni di utilizzo dei servizi digitali di A‑ROSE ODV. Il sito permette di conoscere le attività dell’associazione, consultare informazioni sulla ricerca e partecipare alle iniziative di sostegno.</p><p>Le condizioni si applicano alle funzionalità disponibili sul sito; eventuali regole specifiche delle singole iniziative sono indicate nelle relative pagine.</p></>,
  },
  {
    id: "account",
    title: "2. Account e area personale",
    content: <><p>Per creare un profilo occorre fornire informazioni corrette e un indirizzo email al quale si ha accesso. Le credenziali sono personali: custodiscile con attenzione e non condividerle.</p><p>Se dimentichi la password, usa il recupero dalla pagina di accesso. Per segnalare un utilizzo non autorizzato o richiedere assistenza e chiusura dell’account, contatta A‑ROSE.</p></>,
  },
  {
    id: "raccolte",
    title: "3. Raccolte fondi e contenuti pubblicati",
    content: <><p>Chi crea una raccolta deve descriverne correttamente l’occasione e utilizzare soltanto testi e immagini che ha diritto di pubblicare. Prima di inserire nomi, fotografie o storie di altre persone, occorre disporre delle autorizzazioni necessarie.</p><p>Evita di pubblicare dati sanitari o altre informazioni riservate. La creazione di una raccolta non attribuisce il ruolo di rappresentante dell’associazione. Contenuti ingannevoli o lesivi possono essere segnalati ai nostri contatti.</p></>,
  },
  {
    id: "donazioni",
    title: "4. Donazioni e pagamenti",
    content: <><p>Prima di confermare una donazione, verifica importo, destinatario ed eventuale periodicità nel riepilogo del pagamento. L’obiettivo economico di una raccolta esprime un traguardo e non garantisce il suo raggiungimento.</p><p>Per errori di pagamento, richieste relative a una donazione o alla documentazione, scrivi all’associazione indicando il riferimento dell’operazione. Non inviare password o dati completi della carta. Consulta anche <Link href="/come-sostenerci/come-usiamo-i-fondi">come usiamo i fondi</Link>.</p></>,
  },
  {
    id: "contenuti",
    title: "5. Informazione e diritti sui materiali",
    content: <><p>I contenuti su salute e ricerca hanno finalità divulgativa e non sostituiscono il parere del medico, una diagnosi o una terapia. L’area personale non è un servizio di assistenza sanitaria.</p><p>Testi, fotografie e marchi appartengono ai rispettivi titolari. Per riutilizzarli verifica le condizioni del singolo materiale o richiedi un’autorizzazione, fatti salvi gli utilizzi consentiti dalla legge.</p></>,
  },
  {
    id: "sicurezza",
    title: "6. Uso corretto dei servizi",
    content: <p>Non è consentito usare il sito per frodi, impersonare altre persone, diffondere contenuti illeciti, accedere senza autorizzazione a dati altrui o compromettere il funzionamento dei servizi. Segnala eventuali problemi di sicurezza senza divulgare dati personali di altri utenti.</p>,
  },
  {
    id: "servizi-esterni",
    title: "7. Disponibilità e servizi esterni",
    content: <p>Manutenzioni e problemi tecnici possono interrompere temporaneamente alcune funzioni. Il sito contiene collegamenti e utilizza servizi di terzi, per i quali possono applicarsi condizioni specifiche. Prima di fornire informazioni su un sito esterno, consulta le relative informative.</p>,
  },
  {
    id: "privacy",
    title: "8. Privacy e comunicazioni",
    content: <p>Il trattamento dei dati è descritto nella <Link href="/privacy-policy">Privacy Policy</Link> e nella <Link href="/cookie-policy">Cookie Policy</Link>. La creazione di un account non comporta automaticamente l’iscrizione a comunicazioni promozionali.</p>,
  },
  {
    id: "aggiornamenti",
    title: "9. Aggiornamenti e normativa applicabile",
    content: <p>Le condizioni possono essere aggiornate per riflettere modifiche ai servizi o alla normativa. Questa versione è datata 10 settembre 2026. Si applica la legge italiana, fatti salvi i diritti e le tutele inderogabili riconosciuti agli utenti.</p>,
  },
  {
    id: "contatti",
    title: "10. Contatti",
    content: <address className="not-italic"><strong>A‑ROSE ODV</strong><br />Codice fiscale 93096710384<br />RUNTS – sezione ODV, repertorio n. 34668<br />Ferrara, Italia<br /><Link href="mailto:info@a-roseodv.org">info@a-roseodv.org</Link></address>,
  },
];

export default function TermsPage() {
  return <LegalPage eyebrow="Utilizzo dei servizi" title="Termini e condizioni" sections={sections} />;
}
