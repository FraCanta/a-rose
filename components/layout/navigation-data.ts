export type NavigationChild = {
  label: string;
  href: string;
  description: string;
};

export type NavigationGroup = {
  label: string;
  href: string;
  description: string;
  children?: readonly NavigationChild[];
};

export const navigation: readonly NavigationGroup[] = [
  {
    label: "Chi siamo",
    href: "/chi-siamo/la-nostra-associazione",
    description: "Identità, persone e responsabilità dell'associazione.",
    children: [
      { label: "La nostra associazione", href: "/chi-siamo/la-nostra-associazione", description: "Storia, missione e valori di A-ROSE." },
      { label: "Team scientifico", href: "/chi-siamo/team-scientifico", description: "Ricercatori, clinici e collaboratori." },
      { label: "Partner e sostenitori", href: "/chi-siamo/partner-e-sostenitori", description: "La rete istituzionale e territoriale." },
      { label: "Trasparenza", href: "/trasparenza", description: "Documenti e informazioni associative." },
    ],
  },
  {
    label: "La ricerca",
    href: "/la-ricerca",
    description: "Dal laboratorio alla vita delle persone.",
    children: [
      { label: "Cos'è la ricerca traslazionale", href: "/la-ricerca/ricerca-traslazionale", description: "Il ponte tra scoperta scientifica e cura." },
      { label: "Progetti di ricerca", href: "/progetti", description: "Gli studi sostenuti da A-ROSE." },
      { label: "Formazione", href: "/la-ricerca/formazione", description: "Competenze e crescita per la ricerca." },
      { label: "Pubblicazioni e risultati", href: "/la-ricerca/pubblicazioni-e-risultati", description: "Fonti e risultati del team scientifico." },
    ],
  },
  {
    label: "Prevenzione",
    href: "/prevenzione",
    description: "Informazioni prudenti per orientarsi con consapevolezza.",
    children: [
      { label: "Prevenzione oncologica", href: "/prevenzione/prevenzione-oncologica", description: "Il ruolo di informazione e consapevolezza." },
      { label: "HPV e tumore cervicale", href: "/prevenzione/hpv-e-tumore-cervicale", description: "Una pagina informativa in aggiornamento." },
      { label: "Screening e controlli", href: "/prevenzione/screening-e-controlli", description: "Risorse per comprendere i percorsi di screening." },
      { label: "Guide e approfondimenti", href: "/prevenzione/guide-e-approfondimenti", description: "Articoli e materiali divulgativi." },
      { label: "FAQ", href: "/prevenzione/faq", description: "Risposte alle domande più frequenti." },
    ],
  },
  {
    label: "Partecipa",
    href: "/partecipa",
    description: "Iniziative, volontariato e territorio.",
    children: [
      { label: "Eventi", href: "/eventi", description: "Gli appuntamenti A-ROSE." },
      { label: "Volontariato", href: "/partecipa/volontariato", description: "Dona tempo e competenze." },
      { label: "Scuole e territorio", href: "/partecipa/scuole-e-territorio", description: "Divulgazione vicina alle comunità." },
      { label: "Organizza una raccolta fondi", href: "/partecipa/organizza-raccolta-fondi", description: "Costruiamo insieme un'iniziativa." },
    ],
  },
  {
    label: "Sostienici",
    href: "/come-sostenerci",
    description: "Ogni contributo può sostenere una nuova possibilità.",
    children: [
      { label: "Dona ora", href: "/sostieni-la-ricerca", description: "Sostieni direttamente la ricerca." },
      { label: "5×1000", href: "/come-sostenerci/5x1000", description: "Destina il tuo 5×1000 ad A-ROSE." },
      { label: "Donazione in memoria", href: "/come-sostenerci/donazione-in-memoria", description: "Un gesto di ricordo e speranza." },
      { label: "Aziende e partner", href: "/come-sostenerci/aziende-e-partner", description: "Collaborazioni responsabili e condivise." },
      { label: "Come usiamo i fondi", href: "/come-sostenerci/come-usiamo-i-fondi", description: "Finalità e impiego delle donazioni." },
      { label: "Benefici fiscali", href: "/come-sostenerci/benefici-fiscali", description: "Indicazioni generali sulle agevolazioni." },
    ],
  },
  {
    label: "News",
    href: "/news",
    description: "Aggiornamenti dalla ricerca e dall'associazione.",
    children: [
      { label: "Tutte le news", href: "/news", description: "Tutti gli aggiornamenti pubblicati." },
      { label: "Articoli", href: "/news/articoli", description: "Approfondimenti e divulgazione." },
      { label: "Comunicati", href: "/news/comunicati", description: "Comunicazioni istituzionali." },
    ],
  },
  {
    label: "Contatti",
    href: "/contatti",
    description: "Scrivi ad A-ROSE.",
  },
] as const;

export const allNavigationLinks = navigation.flatMap((group) => [
  { label: group.label, href: group.href },
  ...(group.children ?? []),
]);
