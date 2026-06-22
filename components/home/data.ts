import type { IconName } from "./icons";

export const pillars: Array<{
  icon: IconName;
  number: string;
  title: string;
  text: string;
}> = [
  {
    icon: "search",
    number: "01",
    title: "Ricerca",
    text: "Sosteniamo progetti traslazionali per portare le scoperte dal laboratorio alla pratica clinica.",
  },
  {
    icon: "people",
    number: "02",
    title: "Formazione",
    text: "Promuoviamo competenze specialistiche, confronto e crescita per chi lavora nella ricerca e nella cura.",
  },
  {
    icon: "shield",
    number: "03",
    title: "Prevenzione",
    text: "Diffondiamo conoscenze e buone pratiche per rendere la prevenzione più vicina e consapevole.",
  },
  {
    icon: "book",
    number: "04",
    title: "Divulgazione",
    text: "Traduciamo la complessità scientifica in informazioni chiare, affidabili e accessibili.",
  },
];

export const articles = [
  {
    category: "Prevenzione",
    title: "Screening oncologici: quando e perché farli",
    text: "Conoscere tempi, modalità e benefici degli screening aiuta a compiere scelte più consapevoli.",
    image: "/images/prevenzione-dialogo.webp",
    alt: "Medica che illustra informazioni di prevenzione a una paziente",
  },
  {
    category: "Stili di vita",
    title: "Alimentazione e stile di vita nella prevenzione",
    text: "Le evidenze scientifiche e i comportamenti quotidiani che possono contribuire alla prevenzione.",
    image: "/images/sostegno-cuore.webp",
    alt: "Mani che custodiscono un piccolo cuore rosa",
  },
  {
    category: "Approfondimento",
    title: "Tumori e prevenzione: cosa possiamo fare ogni giorno",
    text: "Piccole azioni, informazioni affidabili e controlli appropriati: una guida per orientarsi.",
    image: "/images/ricerca-dettaglio.webp",
    alt: "Ricercatrice al lavoro su campioni di laboratorio",
  },
] as const;

export const team = [
  {
    name: "Prof.ssa Carlotta Giorgi",
    qualification: "Professore Ordinario di Patologia Generale",
    role: "Presidente dell’associazione e coordinatrice dei progetti di ricerca.",
    image: "/images/team/carlotta-giorgi.jpg",
    hoverImage: "/images/Arose_PicWebsiteT-ShirtA-Rose_Giorgi.webp",
  },
  {
    name: "Prof. Paolo Pinton",
    qualification: "Professore Ordinario di Patologia Generale",
    role: "Supervisore scientifico e responsabile della ricerca traslazionale.",
    image: "/images/team/paolo-pinton.jpg",
    hoverImage: "/images/Arose_PicWebsiteT-ShirtA-Rose_Pinton.webp",
  },
  {
    name: "Dott. Francesco Fiorica",
    qualification:
      "Radio-Oncologo, Direttore UOC Radioterapia e Medicina Nucleare, Direttore Dipartimento di Oncologia Clinica, Oncologo Nutrizionista",
    role: "Consulente clinico e responsabile del collegamento tra ricerca e pazienti.",
    image: "/images/team/francesco-fiorica.jpg",
    hoverImage: "/images/Arose_PicWebsiteT-ShirtA-Rose_Fiorica.webp",
  },
  {
    name: "Prof. Gabriele Anania",
    qualification: "Chirurgo Oncologico, Dirigente Medico Chirurgia Generale",
    role: "Consulente clinico e responsabile del collegamento tra ricerca e pazienti.",
    image: "/images/team/gabriele-anania.jpg",
    hoverImage: "/images/Arose_PicWebsiteT-ShirtA-Rose_Anania.webp",
  },
] as const;

export const partners = [
  {
    name: "Comune di Copparo",
    image: "/images/partners/comune-copparo-transparent.png",
    width: 250,
    height: 249,
  },
  {
    name: "Comune di Ferrara",
    image: "/images/partners/comune-ferrara-gray.png",
    width: 240,
    height: 130,
  },
  {
    name: "Il Palio di Ferrara",
    image: "/images/partners/palio-ferrara-gray.png",
    width: 240,
    height: 130,
  },
  {
    name: "Lions International",
    image: "/images/partners/lions-international-gray.png",
    width: 240,
    height: 130,
  },
  {
    name: "Grandi Riso",
    image: "/images/partners/grandi-riso-gray.png",
    width: 240,
    height: 130,
  },
] as const;
