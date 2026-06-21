export type ScientificProjectDetails = {
  partner: string;
  objective?: string;
};

export const scientificProjectDetails: Record<string, ScientificProjectDetails> = {
  "correlazione-tra-obesita-infiammazione-e-sviluppo-tumorale-in-donne-affette-da-carcinoma-dellendometrio": {
    partner: "U.O. Ginecologia ed Ostetricia",
    objective:
      "Identificare un nuovo bersaglio terapeutico per sviluppare una terapia personalizzata, riducendo la progressione tumorale attraverso antinfiammatori selettivi.",
  },
  "identificazione-di-un-nuovo-fattore-prognostico-nel-tumore-alla-mammella": {
    partner: "U.O. Chirurgia e Anatomia Patologica",
    objective:
      "Individuare un fattore prognostico utile a definire il chemioterapico più adatto per ogni donna.",
  },
  "identificazione-di-un-nuovo-meccanismo-di-resistenza-ai-chemioterapici-nel-tumore-al-colon": {
    partner: "U.O. Chirurgia Generale",
    objective:
      "Individuare un meccanismo di resistenza che possa diventare bersaglio farmacologico e permettere una terapia specifica per il singolo paziente.",
  },
  "analisi-degli-effetti-della-radioterapia-sullo-stato-infiammatorio": {
    partner: "U.O. Oncologia Radioterapica",
    objective:
      "Valutare gli effetti della radioterapia sullo stato infiammatorio per sviluppare trattamenti adiuvanti che prevengano un'infiammazione eccessiva.",
  },
  "ricerca-di-nuove-prospettive-terapeutiche-per-il-mesotelioma-il-tumore-dellamianto": {
    partner: "U.O. Chirurgia Toracica",
  },
  "identificazioni-di-nuovi-assi-molecolari-come-target-per-il-tumore-al-polmone-e-il-melanoma": {
    partner: "U.O. Chirurgia Toracica e U.O. Dermatologia",
  },
  "ricerca-di-fattori-di-rischio-per-fenomeni-cardiovascolari-dopo-trattamenti-antitumorali": {
    partner: "U.O. Fisica Medica",
  },
};
