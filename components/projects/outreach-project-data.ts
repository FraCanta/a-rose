export type OutreachProjectContent = {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  gallery?: string[];
  meta: Array<{ label: string; value: string }>;
};

export const outreachProjectContent: Record<string, OutreachProjectContent> = {
  "pasta-della-vita": {
    title: "La Pasta della Vita",
    subtitle: "L'eccellenza incontra la solidarietà",
    image: "https://a-roseodv.org/wp-content/uploads/2025/10/LaPastaDellaVita.jpg",
    imageAlt: "Confezione dei cappellacci La Pasta della Vita",
    paragraphs: [
      "Nel 2025 nasce La Pasta della Vita, un progetto speciale frutto della collaborazione tra il pastificio La Lanterna e A-ROSE ODV. L'iniziativa unisce la tradizione della pasta fresca artigianale alla missione di sostenere la ricerca scientifica, trasformando un gesto quotidiano come gustare un piatto di pasta in un contributo concreto alla lotta contro il cancro.",
      "Protagonisti del progetto sono i cappellacci di zucca “La Pasta della Vita”, un prodotto che racchiude in sé il sapore autentico della tradizione ferrarese e un profondo valore solidale.",
      "A partire da fine ottobre 2025, i cappellacci saranno disponibili nei principali supermercati, permettendo a chi li sceglie di sostenere la ricerca semplicemente portando in tavola la bontà.",
      "Nell'ambito dell'iniziativa di cause related marketing, La Lanterna s.r.l. devolverà ad A-ROSE ODV il 5% del fatturato generato dalla vendita del prodotto, contribuendo al finanziamento delle attività di interesse generale dell'associazione.",
      "La Pasta della Vita è molto più di un alimento di qualità: è un simbolo di speranza, solidarietà e impegno condiviso. Perché ogni piatto può diventare un piccolo, grande gesto d'amore per la vita e per la ricerca.",
    ],
    meta: [
      { label: "Partner", value: "La Lanterna s.r.l." },
      { label: "Campagna", value: "La Pasta della Vita" },
      { label: "Anno", value: "2025" },
    ],
  },
  "mostra-su-liana-medici-pagnanelli": {
    title: "Mostra su Liana Medici Pagnanelli",
    subtitle: "Ad A-ROSE ODV i proventi del catalogo",
    image: "https://a-roseodv.org/wp-content/uploads/2025/04/Arose_PostArticolo_2025.jpg",
    imageAlt: "Mostra dedicata a Liana Medici Pagnanelli",
    paragraphs: [
      "Un gesto di profonda generosità ha avvicinato ancora una volta la cultura alla scienza: i proventi del catalogo della mostra dedicata all'artista copparese Liana Medici Pagnanelli sono stati devoluti ad A-ROSE ODV, a sostegno della ricerca oncologica ferrarese.",
      "L'antologica, curata da Chiara Guerzi e ospitata presso la Galleria Civica Alda Costa dall'8 al 30 marzo, ha rappresentato non solo un tributo all'opera e alla memoria di un'importante artista del territorio, ma anche un esempio concreto di come l'arte possa diventare strumento di solidarietà.",
      "Il contributo di 1.240 euro, raccolto attraverso il catalogo, è stato consegnato al ricercatore e cofondatore Paolo Pinton grazie all'impegno dell'assessore alla Cultura Francesca Buraschi e del vicepresidente della Pro Loco Armando Zanforlin.",
      "A-ROSE ODV ringrazia tutti coloro che hanno reso possibile questo risultato: Chiara Guerzi per la curatela, la Pro Loco di Copparo, l'Amministrazione comunale e tutte le persone che hanno partecipato e acquistato il catalogo.",
    ],
    meta: [
      { label: "Partner", value: "Comune di Copparo, Pro Loco di Copparo" },
      { label: "Periodo", value: "8–30 marzo 2025" },
    ],
  },
  "ottobre-rosa-2024": {
    title: "Ottobre Rosa 2024",
    subtitle: "Eventi e incontri per sensibilizzare sul cancro e sulla ricerca oncologica",
    image: "https://a-roseodv.org/wp-content/uploads/2025/02/463120849_122164980680239351_3938549547050941123_n.jpg",
    imageAlt: "Incontro di Ottobre Rosa 2024",
    gallery: ["https://a-roseodv.org/wp-content/uploads/2025/02/Halloween.jpg"],
    paragraphs: [
      "Anche quest'anno A-ROSE ODV ha promosso una serie di eventi in occasione di Ottobre Rosa, il mese dedicato alla prevenzione e sensibilizzazione sul cancro, coinvolgendo esperti e cittadini in incontri di grande valore scientifico e divulgativo.",
      "Il 3 ottobre a Voghiera il Prof. Stefano Ferretti ha affrontato il tema dei tumori nel territorio con un approccio di genere. Il 17 ottobre a Copparo il Dott. Francesco Fiorica e il Prof. Pantaleo Greco hanno discusso di medicina di precisione e stile di vita.",
      "Il 23 ottobre a Portomaggiore il Prof. Paolo Carcoforo ha guidato il pubblico in un viaggio nel territorio del cancro al seno. Il percorso si è concluso il 31 ottobre ad Argenta con Halloween Charity – Facciamo Paura al Tumore con la Ricerca.",
      "Gli incontri hanno riaffermato l'impegno di A-ROSE ODV nel diffondere conoscenza e promuovere la ricerca scientifica per un futuro senza cancro.",
    ],
    meta: [
      { label: "Partner", value: "Azienda USL Ferrara, Università di Ferrara" },
      { label: "Anno", value: "2024" },
    ],
  },
  "batteremo-il-cancro-storia-di-una-ricercatrice-mamma-di-cinque-figli": {
    title: "“Batteremo il cancro”",
    subtitle: "Storia di una ricercatrice mamma di cinque figli",
    image: "https://a-roseodv.org/wp-content/uploads/2025/03/PresentazioneLibro.jpg",
    imageAlt: "Presentazione del libro Batteremo il cancro",
    paragraphs: [
      "Venerdì 16 febbraio, presso la Galleria Alda Costa di Copparo, si è tenuta la presentazione del libro “Batteremo il cancro. Storia di una ricercatrice mamma di cinque figli”, dedicato all'esperienza personale e professionale di Carlotta Giorgi.",
      "Il libro, scritto da Renzo Agasso con la prefazione di Paolo Govoni, sensibilizza il pubblico sull'importanza della ricerca scientifica nel contrasto alle malattie oncologiche.",
      "L'incontro ha coinvolto i soci fondatori di A-ROSE ODV e numerosi ospiti, sottolineando il ruolo fondamentale della divulgazione per avvicinare le persone alla ricerca.",
      "L'iniziativa, realizzata con il Comune di Copparo e il Lions Club Copparo, si è conclusa con un messaggio di speranza e determinazione: attraverso l'impegno congiunto di scienza, istituzioni e cittadini è possibile cambiare il futuro della cura.",
    ],
    meta: [
      { label: "Partner", value: "Comune di Copparo, Lions Club Copparo" },
      { label: "Anno", value: "2024" },
    ],
  },
  "elementor-28444": {
    title: "Grandi Riso",
    subtitle: "La bontà nasce da un grande cuore",
    image: "https://a-roseodv.org/wp-content/uploads/2025/03/riso-grandi-a-rose.jpg",
    imageAlt: "Confezione di Riso Grandi dedicata ad A-ROSE",
    gallery: [
      "https://a-roseodv.org/wp-content/uploads/2025/03/RisoGrandi-a-rose.png",
      "https://a-roseodv.org/wp-content/uploads/2025/03/RisoGrandi2.jpg",
    ],
    paragraphs: [
      "Grandi Riso ha scelto di sostenere A-ROSE ODV attraverso una confezione speciale di Carnaroli dedicata alla ricerca oncologica.",
      "Il 10% del ricavato delle vendite è stato destinato alle attività di ricerca, contribuendo ai contratti dei ricercatori e all'acquisto delle strumentazioni necessarie al lavoro di laboratorio.",
    ],
    meta: [
      { label: "Partner", value: "Grandi Riso" },
      { label: "Campagna", value: "La bontà nasce da un grande cuore" },
      { label: "Anno", value: "2024" },
    ],
  },
};
