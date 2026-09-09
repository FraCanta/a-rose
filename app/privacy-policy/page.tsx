import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/content/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | A-ROSE ODV",
  description: "Informativa sul trattamento dei dati personali di A-ROSE ODV.",
};

const sections: LegalSection[] = [
  {
    id: "informazioni",
    title: "1. Informazioni",
    content: <><p>A‑ROSE ODV, ai sensi del Regolamento (UE) 2016/679, intende tutelare la privacy e i Dati Personali nello svolgimento della propria attività.</p><p>Prima di trasmettere qualsiasi dato personale al Titolare e/o ai Contitolari è necessario leggere con attenzione la presente informativa, che contiene informazioni importanti sul trattamento dei Dati Personali.</p><p>Per “Dato Personale” si intende qualsiasi informazione riguardante una persona fisica identificata o identificabile, direttamente o indirettamente, anche mediante dati anagrafici, identificativi online, dati relativi all’ubicazione o elementi caratteristici della sua identità.</p><p>La presente informativa è resa ai sensi dell’art. 13 del Regolamento agli utenti che consultano il sito e utilizzano i servizi messi a disposizione. Il trattamento avviene nel rispetto dei principi di liceità, correttezza, trasparenza, limitazione delle finalità e della conservazione, minimizzazione, esattezza, integrità e riservatezza.</p></>,
  },
  {
    id: "dati-personali",
    title: "2. Dati Personali oggetto del trattamento",
    content: <><p>A seguito della navigazione possono essere trattati dati identificativi e informazioni idonee a rendere l’interessato identificato o identificabile. Eventuali categorie particolari di dati ai sensi dell’art. 9 del Regolamento non saranno trattate senza un esplicito consenso, ove richiesto.</p><p><strong>Dati di navigazione.</strong> I sistemi informatici acquisiscono informazioni la cui trasmissione è implicita nell’uso dei protocolli Internet, tra cui indirizzi IP, nomi a dominio, URI delle risorse richieste, orario e metodo della richiesta, dimensione della risposta, codice di stato e parametri del sistema operativo. Sono utilizzati per statistiche anonime, sicurezza e corretto funzionamento del sito.</p><p><strong>Dati forniti volontariamente.</strong> Possono essere trattati dati anagrafici e di contatto quali nome, cognome, email e telefono. Chi comunica dati di terzi deve assicurarsi che il trattamento sia fondato su un’idonea base giuridica.</p></>,
  },
  {
    id: "finalita",
    title: "3. Finalità del trattamento",
    content: <><p>I dati possono essere trattati per:</p><ul><li>consentire l’erogazione dei servizi richiesti, inclusa la condivisione dei contenuti;</li><li>rispondere a richieste di informazioni o assistenza;</li><li>adempiere a obblighi di legge, contabili e fiscali;</li><li>accertare, esercitare o difendere un diritto in sede giudiziaria;</li><li>adempiere agli obblighi derivanti da rapporti contrattuali.</li></ul></>,
  },
  {
    id: "base-giuridica",
    title: "4. Base di legittimità e natura del conferimento",
    content: <><p>La base giuridica dipende dalla finalità perseguita e può consistere nell’esecuzione di misure precontrattuali o contrattuali richieste dall’interessato, nell’adempimento di un obbligo legale, nel legittimo interesse del Titolare oppure nel consenso.</p><p>Il conferimento dei dati può essere necessario per ottenere i servizi richiesti. Quando il trattamento si fonda sul consenso, questo può essere revocato in qualsiasi momento senza pregiudicare la liceità del trattamento precedente.</p></>,
  },
  {
    id: "destinatari",
    title: "5. Destinatari dei Dati Personali",
    content: <><p>I dati possono essere comunicati, nei limiti delle finalità indicate, a soggetti che agiscono come responsabili del trattamento ai sensi dell’art. 28 del Regolamento, tra cui fornitori di servizi tecnici, informatici, amministrativi, contabili, legali e di pagamento.</p><p>Possono inoltre essere comunicati a soggetti autorizzati dal Titolare e ad autorità o organismi pubblici quando previsto dalla legge. I dati non sono oggetto di diffusione salvo specifica base giuridica.</p></>,
  },
  {
    id: "conservazione",
    title: "6. Conservazione dei dati",
    content: <p>I Dati Personali saranno conservati per il tempo strettamente necessario al raggiungimento delle finalità per cui sono stati raccolti e, successivamente, per i termini richiesti dalla normativa o necessari alla tutela dei diritti del Titolare.</p>,
  },
  {
    id: "diritti",
    title: "7. Diritti degli interessati",
    content: <><p>L’interessato può esercitare i diritti previsti dagli articoli 15 e seguenti del Regolamento, inclusi accesso, rettifica, cancellazione, limitazione, portabilità e opposizione. Quando il trattamento è basato sul consenso, può revocarlo in qualsiasi momento.</p><p>È inoltre possibile proporre reclamo al Garante per la protezione dei dati personali o rivolgersi all’autorità giudiziaria. Le richieste possono essere inviate ai contatti indicati in fondo alla presente informativa.</p></>,
  },
  {
    id: "modifiche",
    title: "8. Modifiche",
    content: <p>La presente Privacy Policy può essere modificata o aggiornata in seguito a variazioni normative, tecniche o organizzative. Si invita pertanto a consultare periodicamente questa pagina. Se le modifiche incidono in modo sostanziale sui trattamenti, sarà fornita adeguata informazione agli interessati.</p>,
  },
  {
    id: "finalita-commerciali",
    title: "9. Finalità commerciali e di promozione",
    content: <p>Comunicazioni informative, promozionali o di marketing vengono inviate soltanto in presenza di una base giuridica idonea. Quando richiesto, il consenso è facoltativo e può essere revocato in qualsiasi momento.</p>,
  },
  {
    id: "cookie",
    title: "10. Cookie",
    content: <p>Il sito può utilizzare cookie e tecnologie analoghe per garantire le funzionalità essenziali e, previo consenso quando necessario, per misurare l’utilizzo dei servizi. Per informazioni dettagliate e per gestire le preferenze consulta la <Link href="/cookie-policy">Cookie Policy</Link>.</p>,
  },
  {
    id: "contatti",
    title: "11. Titolare del trattamento e contatti",
    content: <address className="not-italic"><strong>A‑ROSE ODV</strong><br />C.F. 93096710384<br />Iscrizione RUNTS – sez. ODV, rep. n. 34668<br />Ferrara, Italia<br /><Link href="mailto:info@a-roseodv.org">info@a-roseodv.org</Link></address>,
  },
];

export default function PrivacyPolicyPage() {
  return <LegalPage eyebrow="Tutela dei dati personali" title="Privacy Policy" sections={sections} />;
}
