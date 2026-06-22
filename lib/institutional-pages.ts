export type InstitutionalPageData = {
  path: string;
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  description: string;
  parent: { label: string; href: string };
  points: Array<{ title: string; text: string }>;
  cta: { label: string; href: string; text: string };
  metaTitle: string;
  metaDescription: string;
};

export const institutionalPages: InstitutionalPageData[] = [
  {
    path: "/chi-siamo/storia", eyebrow: "Chi siamo", title: "La nostra", accent: "storia.",
    intro: "A-ROSE nasce a Ferrara dall'incontro tra ricerca preclinica, pratica clinica e impegno civico.",
    description: "Questa pagina raccoglie le tappe principali dell'associazione e il percorso costruito con ricercatori, professionisti, volontari e comunità.",
    parent: { label: "Chi siamo", href: "/chi-siamo" },
    points: [{ title: "Le origini", text: "L'associazione nasce nel 2019 dall'iniziativa di quattro professionisti ferraresi." }, { title: "Una rete locale", text: "Il lavoro si sviluppa in relazione con università, strutture sanitarie e territorio." }, { title: "Uno sguardo al futuro", text: "L'obiettivo resta avvicinare ricerca, prevenzione e vita delle persone." }],
    cta: { label: "Conosci il team", href: "/team", text: "Scopri le persone che danno forma al progetto A-ROSE." }, metaTitle: "La nostra storia | A-ROSE ODV", metaDescription: "Le origini e il percorso dell'associazione A-ROSE ODV a Ferrara.",
  },
  {
    path: "/chi-siamo/missione-e-valori", eyebrow: "Chi siamo", title: "Missione e", accent: "valori.",
    intro: "Sosteniamo la ricerca oncologica, la formazione e una divulgazione scientifica accessibile e responsabile.",
    description: "La missione di A-ROSE unisce rigore scientifico, collaborazione, trasparenza e attenzione alle persone. I contenuti ufficiali di questa sezione potranno essere aggiornati con i documenti associativi.",
    parent: { label: "Chi siamo", href: "/chi-siamo" },
    points: [{ title: "Rigore", text: "Promuovere iniziative fondate su competenze scientifiche e cliniche." }, { title: "Collaborazione", text: "Creare connessioni tra laboratorio, ospedale e comunità." }, { title: "Responsabilità", text: "Comunicare finalità, attività e impiego delle risorse con chiarezza." }],
    cta: { label: "Scopri i progetti", href: "/progetti", text: "Guarda come la missione si traduce in attività concrete." }, metaTitle: "Missione e valori | A-ROSE ODV", metaDescription: "Missione, principi e valori che guidano A-ROSE ODV.",
  },
  {
    path: "/chi-siamo/partner-e-sostenitori", eyebrow: "Chi siamo", title: "Partner e", accent: "sostenitori.",
    intro: "La ricerca cresce attraverso relazioni solide con istituzioni, imprese e realtà del territorio.",
    description: "La pagina presenta la rete che collabora con A-ROSE e riconosce il contributo di chi sostiene progetti, eventi e attività divulgative.",
    parent: { label: "Chi siamo", href: "/chi-siamo" },
    points: [{ title: "Istituzioni", text: "Collaborazioni con enti pubblici e comunità locali." }, { title: "Ricerca e sanità", text: "Relazioni con università, laboratori e professionisti clinici." }, { title: "Imprese e associazioni", text: "Partnership costruite intorno a obiettivi condivisi e verificabili." }],
    cta: { label: "Diventa partner", href: "/come-sostenerci/aziende-e-partner", text: "Valuta una collaborazione con A-ROSE." }, metaTitle: "Partner e sostenitori | A-ROSE ODV", metaDescription: "La rete di istituzioni, imprese e organizzazioni che sostiene A-ROSE ODV.",
  },
  {
    path: "/trasparenza", eyebrow: "Chi siamo", title: "Trasparenza e", accent: "responsabilità.",
    intro: "Informazioni associative e documenti utili per conoscere A-ROSE con chiarezza.",
    description: "Questa sezione è predisposta per bilanci, rendicontazioni, statuto e documenti fiscali. I materiali ufficiali saranno pubblicati e aggiornati progressivamente.",
    parent: { label: "Chi siamo", href: "/chi-siamo" },
    points: [{ title: "Documenti associativi", text: "Statuto, dati identificativi e informazioni istituzionali." }, { title: "Bilanci e rendiconti", text: "Documentazione economica e rendicontazione delle attività." }, { title: "Uso delle risorse", text: "Finalità sostenute dalle donazioni e dalle raccolte fondi." }],
    cta: { label: "Come usiamo i fondi", href: "/come-sostenerci/come-usiamo-i-fondi", text: "Approfondisci la destinazione dei contributi." }, metaTitle: "Trasparenza | A-ROSE ODV", metaDescription: "Documenti, rendicontazione e informazioni di trasparenza di A-ROSE ODV.",
  },
  {
    path: "/la-ricerca", eyebrow: "La ricerca", title: "Conoscenza che diventa", accent: "possibilità.",
    intro: "A-ROSE sostiene la ricerca oncologica traslazionale e le connessioni tra laboratorio, clinica e territorio.",
    description: "Questa area orienta tra il significato della ricerca traslazionale, i progetti sostenuti, la formazione e le pubblicazioni del team.",
    parent: { label: "Home", href: "/" },
    points: [{ title: "Ricerca traslazionale", text: "Il percorso che collega le scoperte scientifiche alle possibili applicazioni cliniche." }, { title: "Progetti", text: "Studi sviluppati attraverso collaborazioni scientifiche e sanitarie." }, { title: "Formazione e risultati", text: "Competenze, pubblicazioni e crescita delle persone impegnate nella ricerca." }],
    cta: { label: "Esplora i progetti", href: "/progetti", text: "Scopri le attività di ricerca sostenute da A-ROSE." }, metaTitle: "La ricerca | A-ROSE ODV", metaDescription: "Ricerca oncologica traslazionale, progetti, formazione e risultati di A-ROSE ODV.",
  },
  {
    path: "/la-ricerca/ricerca-traslazionale", eyebrow: "La ricerca", title: "Cos'è la ricerca", accent: "traslazionale.",
    intro: "È il ponte tra le conoscenze prodotte in laboratorio e la loro valutazione in ambito clinico.",
    description: "A-ROSE racconta questo percorso in modo prudente e accessibile, senza sostituire le fonti scientifiche o il confronto con professionisti sanitari.",
    parent: { label: "La ricerca", href: "/la-ricerca" },
    points: [{ title: "Dal laboratorio", text: "Lo studio dei meccanismi biologici genera nuove domande scientifiche." }, { title: "Alla collaborazione clinica", text: "Ricercatori e clinici valutano la rilevanza delle conoscenze prodotte." }, { title: "Verso nuove possibilità", text: "I risultati richiedono verifica, tempo e ulteriori studi prima di applicazioni cliniche." }],
    cta: { label: "Vedi i progetti", href: "/progetti", text: "Conosci gli ambiti di ricerca sostenuti dall'associazione." }, metaTitle: "Cos'è la ricerca traslazionale | A-ROSE ODV", metaDescription: "Una spiegazione prudente del ruolo della ricerca oncologica traslazionale.",
  },
  {
    path: "/la-ricerca/formazione", eyebrow: "La ricerca", title: "Formazione e", accent: "competenze.",
    intro: "La crescita della ricerca passa anche dalla formazione di chi lavora nei laboratori e nei percorsi clinici.",
    description: "La pagina raccoglierà borse, opportunità formative e iniziative sostenute da A-ROSE. I contenuti saranno aggiornati con informazioni ufficiali.",
    parent: { label: "La ricerca", href: "/la-ricerca" },
    points: [{ title: "Borse e percorsi", text: "Supporto a esperienze formative e attività di ricerca." }, { title: "Confronto scientifico", text: "Occasioni di aggiornamento e condivisione delle competenze." }, { title: "Nuove generazioni", text: "Attenzione alle persone che costruiscono il futuro della ricerca." }],
    cta: { label: "Contattaci", href: "/contatti", text: "Richiedi informazioni sulle iniziative formative." }, metaTitle: "Formazione | A-ROSE ODV", metaDescription: "Formazione, borse e crescita delle competenze sostenute da A-ROSE ODV.",
  },
  {
    path: "/la-ricerca/pubblicazioni-e-risultati", eyebrow: "La ricerca", title: "Pubblicazioni e", accent: "risultati.",
    intro: "Una porta di accesso alle fonti bibliografiche e al lavoro scientifico del team A-ROSE.",
    description: "Le pubblicazioni sono consultabili per profilo attraverso fonti bibliografiche riconosciute. La pagina non interpreta i risultati clinici e rimanda alle fonti originali.",
    parent: { label: "La ricerca", href: "/la-ricerca" },
    points: [{ title: "Fonti verificabili", text: "Collegamenti a PubMed, Google Scholar e altri archivi bibliografici." }, { title: "Profili scientifici", text: "Le pubblicazioni sono organizzate per componente del team." }, { title: "Aggiornamento", text: "Gli elenchi vengono recuperati dalle fonti disponibili e possono evolvere nel tempo." }],
    cta: { label: "Consulta il team", href: "/team", text: "Apri i profili e le relative pubblicazioni." }, metaTitle: "Pubblicazioni e risultati | A-ROSE ODV", metaDescription: "Pubblicazioni, fonti bibliografiche e risultati del team scientifico A-ROSE.",
  },
  {
    path: "/prevenzione", eyebrow: "Prevenzione", title: "Informarsi è già", accent: "prendersi cura.",
    intro: "Informazioni chiare aiutano a comprendere la prevenzione e a dialogare meglio con i professionisti sanitari.",
    description: "Quest'area organizza guide, approfondimenti e domande frequenti. I contenuti hanno finalità divulgative e non forniscono diagnosi o indicazioni terapeutiche personali.",
    parent: { label: "Home", href: "/" },
    points: [{ title: "Prevenzione oncologica", text: "Informazioni generali e fonti affidabili." }, { title: "Screening", text: "Orientamento sui programmi e sui controlli raccomandati dalle autorità sanitarie." }, { title: "Approfondimenti", text: "Contenuti divulgativi da leggere e condividere." }],
    cta: { label: "Leggi gli approfondimenti", href: "/prevenzione/guide-e-approfondimenti", text: "Esplora i materiali disponibili." }, metaTitle: "Prevenzione oncologica | A-ROSE ODV", metaDescription: "Guide e informazioni prudenti sulla prevenzione oncologica curate da A-ROSE ODV.",
  },
  {
    path: "/prevenzione/prevenzione-oncologica", eyebrow: "Prevenzione", title: "Prevenzione", accent: "oncologica.", intro: "Una pagina per orientarsi tra informazione, consapevolezza e fonti sanitarie ufficiali.", description: "I contenuti definitivi saranno sviluppati con supervisione competente. Questa pagina non sostituisce il medico o i programmi sanitari regionali.", parent: { label: "Prevenzione", href: "/prevenzione" }, points: [{ title: "Informazione", text: "Comprendere fattori di rischio e raccomandazioni generali." }, { title: "Consapevolezza", text: "Riconoscere il valore dei percorsi di prevenzione organizzata." }, { title: "Fonti ufficiali", text: "Riferirsi a servizi sanitari e professionisti qualificati." }], cta: { label: "Vai alle FAQ", href: "/prevenzione/faq", text: "Consulta le domande frequenti." }, metaTitle: "Prevenzione oncologica | A-ROSE ODV", metaDescription: "Informazioni generali e prudenti sulla prevenzione oncologica." },
  {
    path: "/prevenzione/hpv-e-tumore-cervicale", eyebrow: "Prevenzione", title: "HPV e tumore", accent: "cervicale.", intro: "Uno spazio informativo dedicato a HPV, prevenzione e percorsi di screening.", description: "La pagina è predisposta per contenuti verificati e riferimenti sanitari ufficiali. Non contiene indicazioni cliniche personalizzate.", parent: { label: "Prevenzione", href: "/prevenzione" }, points: [{ title: "Conoscere l'HPV", text: "Informazioni introduttive da completare con fonti ufficiali." }, { title: "Prevenzione", text: "Orientamento generale sui percorsi disponibili." }, { title: "Parlane con un professionista", text: "Per decisioni personali è necessario rivolgersi ai servizi sanitari." }], cta: { label: "Contattaci", href: "/contatti", text: "Segnalaci risorse o iniziative divulgative." }, metaTitle: "HPV e tumore cervicale | A-ROSE ODV", metaDescription: "Pagina informativa su HPV, prevenzione e tumore cervicale." },
  {
    path: "/prevenzione/screening-e-controlli", eyebrow: "Prevenzione", title: "Screening e", accent: "controlli.", intro: "Comprendere finalità e organizzazione degli screening aiuta a orientarsi con maggiore consapevolezza.", description: "I programmi variano per età, territorio e indicazioni sanitarie. La pagina rimanderà sempre alle fonti regionali e nazionali aggiornate.", parent: { label: "Prevenzione", href: "/prevenzione" }, points: [{ title: "Programmi organizzati", text: "Percorsi proposti dai sistemi sanitari alla popolazione destinataria." }, { title: "Informazioni aggiornate", text: "Calendari e criteri devono essere verificati sulle fonti sanitarie ufficiali." }, { title: "Dubbi personali", text: "Il medico resta il riferimento per la situazione individuale." }], cta: { label: "Leggi le guide", href: "/prevenzione/guide-e-approfondimenti", text: "Consulta i contenuti divulgativi." }, metaTitle: "Screening e controlli | A-ROSE ODV", metaDescription: "Informazioni generali sui programmi di screening oncologico." },
  {
    path: "/prevenzione/guide-e-approfondimenti", eyebrow: "Prevenzione", title: "Guide e", accent: "approfondimenti.", intro: "Una raccolta editoriale per rendere più accessibili i temi della prevenzione e della ricerca.", description: "I materiali saranno selezionati e aggiornati progressivamente, distinguendo sempre la divulgazione dalle indicazioni mediche personali.", parent: { label: "Prevenzione", href: "/prevenzione" }, points: [{ title: "Articoli", text: "Contenuti divulgativi pubblicati da A-ROSE." }, { title: "Guide", text: "Materiali sintetici e facilmente consultabili." }, { title: "Fonti", text: "Riferimenti utili per approfondire su canali istituzionali." }], cta: { label: "Vai agli articoli", href: "/news/articoli", text: "Leggi gli approfondimenti disponibili." }, metaTitle: "Guide e approfondimenti | A-ROSE ODV", metaDescription: "Guide e articoli divulgativi sulla prevenzione oncologica." },
  {
    path: "/prevenzione/faq", eyebrow: "Prevenzione", title: "Domande", accent: "frequenti.", intro: "Risposte sintetiche per orientarsi tra prevenzione, screening e attività dell'associazione.", description: "Le FAQ saranno ampliate con contenuti ufficiali. Non possono rispondere a dubbi clinici individuali né sostituire una consulenza sanitaria.", parent: { label: "Prevenzione", href: "/prevenzione" }, points: [{ title: "Dove trovo informazioni ufficiali?", text: "Consulta i canali del servizio sanitario nazionale e regionale." }, { title: "A-ROSE offre consulenze mediche?", text: "No. L'associazione svolge ricerca, formazione e divulgazione." }, { title: "Come segnalo un tema?", text: "Puoi scriverci dalla pagina Contatti." }], cta: { label: "Scrivi ad A-ROSE", href: "/contatti", text: "Invia una domanda di carattere generale." }, metaTitle: "FAQ prevenzione | A-ROSE ODV", metaDescription: "Domande frequenti su prevenzione e attività divulgative A-ROSE." },
  {
    path: "/partecipa", eyebrow: "Partecipa", title: "La ricerca vive", accent: "nella comunità.", intro: "Eventi, volontariato e iniziative territoriali trasformano la partecipazione in sostegno concreto.", description: "Quest'area raccoglie le opportunità per incontrare A-ROSE, dedicare tempo, collaborare con scuole e organizzare raccolte fondi.", parent: { label: "Home", href: "/" }, points: [{ title: "Eventi", text: "Incontri scientifici, iniziative e appuntamenti solidali." }, { title: "Volontariato", text: "Tempo e competenze al servizio della missione." }, { title: "Territorio", text: "Progetti condivisi con scuole, associazioni e comunità." }], cta: { label: "Scopri gli eventi", href: "/eventi", text: "Consulta gli appuntamenti A-ROSE." }, metaTitle: "Partecipa | A-ROSE ODV", metaDescription: "Eventi, volontariato e iniziative territoriali di A-ROSE ODV." },
  {
    path: "/partecipa/volontariato", eyebrow: "Partecipa", title: "Diventa", accent: "volontario.", intro: "Metti a disposizione tempo, competenze ed energia per sostenere le attività A-ROSE.", description: "Le esigenze possono cambiare in base a eventi e progetti. Scrivici indicando disponibilità e interessi: valuteremo insieme il contributo più adatto.", parent: { label: "Partecipa", href: "/partecipa" }, points: [{ title: "Eventi", text: "Supporto organizzativo e accoglienza." }, { title: "Divulgazione", text: "Collaborazione alla diffusione delle iniziative." }, { title: "Competenze", text: "Contributi professionali coerenti con le necessità associative." }], cta: { label: "Candidati come volontario", href: "/contatti", text: "Presentati e raccontaci come vorresti contribuire." }, metaTitle: "Volontariato | A-ROSE ODV", metaDescription: "Come diventare volontario e partecipare alle attività A-ROSE." },
  {
    path: "/partecipa/scuole-e-territorio", eyebrow: "Partecipa", title: "Scuole e", accent: "territorio.", intro: "La cultura scientifica cresce quando incontra studenti, famiglie e comunità locali.", description: "La pagina raccoglierà proposte divulgative e collaborazioni territoriali. Ogni iniziativa viene definita con gli enti coinvolti e con linguaggi adatti al pubblico.", parent: { label: "Partecipa", href: "/partecipa" }, points: [{ title: "Incontri", text: "Momenti di confronto su ricerca e prevenzione." }, { title: "Progetti educativi", text: "Percorsi da costruire con scuole e docenti." }, { title: "Comunità", text: "Iniziative aperte e accessibili sul territorio." }], cta: { label: "Proponi una collaborazione", href: "/contatti", text: "Scrivici per costruire un'attività insieme." }, metaTitle: "Scuole e territorio | A-ROSE ODV", metaDescription: "Attività divulgative A-ROSE per scuole e comunità territoriali." },
  {
    path: "/partecipa/organizza-raccolta-fondi", eyebrow: "Partecipa", title: "Organizza una", accent: "raccolta fondi.", intro: "Un'iniziativa locale può trasformarsi in sostegno concreto alla ricerca.", description: "Prima di utilizzare nome e identità A-ROSE è necessario concordare finalità, comunicazione e modalità di raccolta con l'associazione.", parent: { label: "Partecipa", href: "/partecipa" }, points: [{ title: "Condividi l'idea", text: "Raccontaci obiettivo, pubblico e formato dell'iniziativa." }, { title: "Definiamo le modalità", text: "Verifichiamo insieme aspetti organizzativi e comunicativi." }, { title: "Rendicontiamo", text: "La raccolta deve essere chiara, tracciabile e coerente con la finalità concordata." }], cta: { label: "Proponi un'iniziativa", href: "/contatti", text: "Contatta A-ROSE prima di avviare la raccolta." }, metaTitle: "Organizza una raccolta fondi | A-ROSE ODV", metaDescription: "Come proporre una raccolta fondi a sostegno di A-ROSE ODV." },
  {
    path: "/come-sostenerci/5x1000", eyebrow: "Sostienici", title: "Destina il", accent: "5×1000.", intro: "Una scelta nella dichiarazione dei redditi può sostenere le attività di A-ROSE.", description: "Inserisci il codice fiscale dell'associazione nello spazio dedicato agli Enti del Terzo Settore. Verifica sempre le istruzioni aggiornate con il tuo professionista fiscale.", parent: { label: "Sostienici", href: "/come-sostenerci" }, points: [{ title: "Codice fiscale", text: "93096710384" }, { title: "Firma", text: "Firma nel riquadro previsto dalla dichiarazione applicabile." }, { title: "Nessun costo aggiuntivo", text: "Il 5×1000 è una quota dell'imposta già dovuta." }], cta: { label: "Richiedi informazioni", href: "/contatti", text: "Contattaci per i dati associativi." }, metaTitle: "5×1000 | A-ROSE ODV", metaDescription: "Informazioni per destinare il 5×1000 ad A-ROSE ODV." },
  {
    path: "/come-sostenerci/donazione-in-memoria", eyebrow: "Sostienici", title: "Donazione in", accent: "memoria.", intro: "Un gesto dedicato a una persona può diventare sostegno alla ricerca.", description: "Per concordare la dedica e ricevere indicazioni sulle modalità di donazione, contatta direttamente A-ROSE. Tratteremo ogni richiesta con attenzione e riservatezza.", parent: { label: "Sostienici", href: "/come-sostenerci" }, points: [{ title: "Un gesto personale", text: "La donazione può ricordare una persona cara." }, { title: "Comunicazione", text: "Possiamo concordare un messaggio per i familiari." }, { title: "Tracciabilità", text: "La donazione viene gestita con le stesse modalità trasparenti degli altri contributi." }], cta: { label: "Parla con noi", href: "/contatti", text: "Scrivici per definire la donazione." }, metaTitle: "Donazione in memoria | A-ROSE ODV", metaDescription: "Come effettuare una donazione in memoria a favore di A-ROSE ODV." },
  {
    path: "/come-sostenerci/aziende-e-partner", eyebrow: "Sostienici", title: "Aziende e", accent: "partner.", intro: "Collaborazioni responsabili possono amplificare l'impatto della ricerca e della divulgazione.", description: "Valutiamo partnership coerenti con missione, reputazione e finalità associative. Ogni collaborazione viene definita con obiettivi e comunicazione trasparenti.", parent: { label: "Sostienici", href: "/come-sostenerci" }, points: [{ title: "Donazioni", text: "Contributi liberali a sostegno delle attività." }, { title: "Campagne", text: "Iniziative condivise e raccolte fondi concordate." }, { title: "Competenze", text: "Supporto tecnico o professionale utile ai progetti." }], cta: { label: "Diventa partner", href: "/contatti", text: "Presenta la tua organizzazione e la proposta." }, metaTitle: "Aziende e partner | A-ROSE ODV", metaDescription: "Partnership e collaborazioni aziendali con A-ROSE ODV." },
  {
    path: "/come-sostenerci/come-usiamo-i-fondi", eyebrow: "Sostienici", title: "Come usiamo", accent: "i fondi.", intro: "Le risorse sostengono finalità scientifiche, formative e divulgative coerenti con la missione A-ROSE.", description: "Questa pagina offre un quadro sintetico. La documentazione ufficiale e gli aggiornamenti economici trovano spazio nella sezione Trasparenza.", parent: { label: "Sostienici", href: "/come-sostenerci" }, points: [{ title: "Ricerca", text: "Progetti oncologici traslazionali e clinici." }, { title: "Formazione", text: "Borse e percorsi per persone impegnate nella ricerca." }, { title: "Prevenzione e divulgazione", text: "Incontri, materiali e iniziative rivolte alla comunità." }], cta: { label: "Vai alla trasparenza", href: "/trasparenza", text: "Consulta documenti e informazioni associative." }, metaTitle: "Come usiamo i fondi | A-ROSE ODV", metaDescription: "Le finalità sostenute dalle donazioni ricevute da A-ROSE ODV." },
  {
    path: "/come-sostenerci/benefici-fiscali", eyebrow: "Sostienici", title: "Benefici", accent: "fiscali.", intro: "Le erogazioni liberali tracciabili agli Enti del Terzo Settore possono beneficiare delle agevolazioni previste dalla normativa.", description: "Le regole dipendono dal soggetto che dona e dalla normativa vigente. Conserva la documentazione e verifica il trattamento applicabile con un professionista fiscale.", parent: { label: "Sostienici", href: "/come-sostenerci" }, points: [{ title: "Pagamenti tracciabili", text: "Utilizza modalità che consentano di documentare la donazione." }, { title: "Ricevute", text: "Conserva la documentazione bancaria e associativa." }, { title: "Verifica professionale", text: "Chiedi al tuo consulente quale agevolazione sia applicabile." }], cta: { label: "Richiedi i dati", href: "/contatti", text: "Contatta A-ROSE per la documentazione associativa." }, metaTitle: "Benefici fiscali | A-ROSE ODV", metaDescription: "Indicazioni generali sui benefici fiscali delle donazioni ad A-ROSE ODV." },
];

export function getInstitutionalPage(path: string) {
  return institutionalPages.find((page) => page.path === path);
}
