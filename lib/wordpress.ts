const WORDPRESS_ORIGIN = "https://a-roseodv.org";
const WORDPRESS_API_URL = `${WORDPRESS_ORIGIN}/wp-json/wp/v2/posts`;
const EVENTS_API_URL = `${WORDPRESS_ORIGIN}/wp-json/tribe/events/v1/events`;
const ABOUT_API_URL = `${WORDPRESS_ORIGIN}/wp-json/wp/v2/pages`;

type WordPressRendered = {
  rendered: string;
};

type WordPressMedia = {
  alt_text?: string;
  source_url?: string;
  media_details?: {
    sizes?: Record<string, { source_url?: string }>;
  };
};

type WordPressTerm = {
  name?: string;
  taxonomy?: string;
};

type WordPressPostResponse = {
  id: number;
  date: string;
  link: string;
  title: WordPressRendered;
  excerpt: WordPressRendered;
  _embedded?: {
    "wp:featuredmedia"?: WordPressMedia[];
    "wp:term"?: WordPressTerm[][];
  };
};

type WordPressPageResponse = {
  link: string;
  content: WordPressRendered;
};

type WordPressEventImage = {
  url?: string;
  sizes?: Record<string, { url?: string }>;
};

type WordPressEventResponse = {
  id: number;
  title: string;
  url: string;
  start_date: string;
  excerpt?: string;
  description?: string;
  image?: WordPressEventImage;
};

type WordPressEventsResponse = {
  events?: WordPressEventResponse[];
};

export type WordPressPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string | null;
  imageAlt: string;
  href: string;
};

export type WordPressEvent = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string | null;
  href: string;
  isUpcoming: boolean;
};

export type WordPressPublication = {
  title: string;
  summary: string;
  href: string;
};

export type AboutContent = {
  sourceUrl: string;
  intro: string;
  origins: string;
  vision: string[];
  activities: Array<{
    title: string;
    text: string;
  }>;
  objective: string;
  visionImage: string;
  objectiveImage: string;
  teamImages: string[];
  partners: Array<{
    name: string;
    image: string;
  }>;
};

const wordpressPartners = [
  ["Signal Transduction Lab", "2025/05/Signal-transduction-lab.png"],
  ["Comune di Ferrara", "2025/02/ComuneFerrara.png"],
  ["Comune di Copparo", "2025/02/ComuneCopparo.png"],
  ["Grandi Riso", "2025/02/RisoGrandi.png"],
  ["Lions International", "2025/02/Lions.png"],
  ["Ente Palio di Ferrara", "2025/02/EntePalio.png"],
  ["Comune di Portomaggiore", "2025/05/Comune-Portomaggiore.png"],
  ["Comune di Voghiera", "2025/05/Comune-Voghiera.png"],
  ["Iosco Group", "2025/05/Iosco-Group.png"],
  ["Bulzoni", "2025/05/Bulzoni.png"],
  ["Fermac", "2025/05/Fermac.png"],
  ["Rotary", "2025/05/Rotary.png"],
  ["Slam Jam", "2025/05/Slam-Jam.png"],
  ["Deva Wall", "2025/05/Deva-wall.png"],
] as const;

const aboutFallback: AboutContent = {
  sourceUrl: `${WORDPRESS_ORIGIN}/about/`,
  intro:
    "Organizzazione di Volontariato dedicata alla ricerca oncologica e alla diffusione della consapevolezza.",
  origins:
    "A-ROSE ODV, Associazione Ricerca Oncologica Estense, nasce nel 2019 dall'idea di quattro ricercatori ferraresi di realizzare qualcosa per la loro città. L'anima dell'associazione è formata da Carlotta Giorgi e Paolo Pinton, scienziati nell'ambito della ricerca preclinica, e da Gabriele Anania e Francesco Fiorica, medici che operano in ambito clinico oncologico.",
  vision: [
    "A-ROSE ODV è un'associazione di volontariato libera, apartitica e senza scopo di lucro che persegue finalità civiche, solidaristiche e di utilità sociale, promuovendo lo sviluppo della conoscenza nel settore oncologico e sostenendo la ricerca attraverso raccolta fondi, formazione e divulgazione.",
  ],
  activities: [
    {
      title: "Ricerca",
      text: "Uno dei nostri scopi principali è procurare sostegno finanziario alla ricerca scientifica sul cancro nei suoi aspetti traslazionali e clinici, finanziando progetti di ricerca.",
    },
    {
      title: "Formazione",
      text: "Promuoviamo la formazione attraverso l'istituzione di borse di studio a supporto di attività di ricerca presso istituti nazionali e internazionali.",
    },
    {
      title: "Divulgazione",
      text: "Divulghiamo la conoscenza in ambito oncologico su prevenzione, diagnosi precoce e nuove terapie attraverso seminari, incontri nelle scuole ed eventi aperti al pubblico.",
    },
  ],
  objective:
    "A-ROSE ODV sostiene progetti di ricerca traslazionale del laboratorio Signal Transduction dell'Università di Ferrara, in collaborazione con diverse unità operative dell'Azienda Ospedaliera di Ferrara. L'obiettivo è contribuire allo sviluppo di terapie sempre più vicine alle caratteristiche del singolo paziente.",
  visionImage: `${WORDPRESS_ORIGIN}/wp-content/uploads/2025/03/Arose_PicWebsite_Nastro.jpg`,
  objectiveImage: `${WORDPRESS_ORIGIN}/wp-content/uploads/2025/03/Arose_PicWebsite_AnaniaLaboratorio.jpg`,
  teamImages: [
    `${WORDPRESS_ORIGIN}/wp-content/uploads/2025/03/Arose_PicWebsiteT-ShirtA-Rose_Giorgi.jpg`,
    `${WORDPRESS_ORIGIN}/wp-content/uploads/2025/03/Arose_PicWebsiteT-ShirtA-Rose_Pinton.jpg`,
    `${WORDPRESS_ORIGIN}/wp-content/uploads/2025/03/Arose_PicWebsiteT-ShirtA-Rose_Fiorica.jpg`,
    `${WORDPRESS_ORIGIN}/wp-content/uploads/2025/03/Arose_PicWebsiteT-ShirtA-Rose_Anania.jpg`,
  ],
  partners: wordpressPartners.map(([name, path]) => ({
    name,
    image: `${WORDPRESS_ORIGIN}/wp-content/uploads/${path}`,
  })),
};

function decodeEntities(value: string) {
  const namedEntities: Record<string, string> = {
    amp: "&",
    apos: "'",
    hellip: "…",
    laquo: "«",
    ldquo: "“",
    lsquo: "‘",
    nbsp: " ",
    quot: '"',
    raquo: "»",
    rdquo: "”",
    rsquo: "’",
  };

  return value.replace(/&(#x?[\da-f]+|[a-z]+);/gi, (entity, code: string) => {
    if (code.startsWith("#")) {
      const hexadecimal = code[1]?.toLowerCase() === "x";
      const numericValue = Number.parseInt(code.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);

      return Number.isNaN(numericValue) ? entity : String.fromCodePoint(numericValue);
    }

    return namedEntities[code.toLowerCase()] ?? entity;
  });
}

function plainText(value: string) {
  return decodeEntities(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function extractTextBetween(value: string, start: string, end: string) {
  const startIndex = value.indexOf(start);
  if (startIndex < 0) return null;

  const endIndex = value.indexOf(end, startIndex + start.length);
  if (endIndex < 0) return null;

  return value.slice(startIndex, endIndex + end.length).trim();
}

function getEventImage(image?: WordPressEventImage) {
  return (
    image?.sizes?.medium_large?.url ??
    image?.sizes?.large?.url ??
    image?.url ??
    null
  );
}

function mapEvent(event: WordPressEventResponse, isUpcoming: boolean): WordPressEvent {
  return {
    id: event.id,
    title: plainText(event.title),
    excerpt:
      plainText(event.excerpt ?? event.description ?? "") ||
      "Un'iniziativa A-ROSE dedicata a ricerca, prevenzione e comunità.",
    date: event.start_date.replace(" ", "T"),
    image: getEventImage(event.image),
    href: event.url,
    isUpcoming,
  };
}

function getFeaturedImage(media?: WordPressMedia) {
  if (!media) return null;

  return (
    media.media_details?.sizes?.medium_large?.source_url ??
    media.media_details?.sizes?.large?.source_url ??
    media.source_url ??
    null
  );
}

function getCategory(terms?: WordPressTerm[][]) {
  return terms?.flat().find((term) => term.taxonomy === "category")?.name ?? "News";
}

export async function getLatestPosts(limit = 3): Promise<WordPressPost[]> {
  const params = new URLSearchParams({
    _embed: "1",
    order: "desc",
    orderby: "date",
    per_page: String(limit),
  });

  try {
    const response = await fetch(`${WORDPRESS_API_URL}?${params}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return [];

    const posts = (await response.json()) as WordPressPostResponse[];

    return posts.slice(0, limit).map((post) => {
      const media = post._embedded?.["wp:featuredmedia"]?.[0];

      return {
        id: post.id,
        title: plainText(post.title.rendered),
        excerpt: plainText(post.excerpt.rendered),
        date: post.date,
        category: decodeEntities(getCategory(post._embedded?.["wp:term"])),
        image: getFeaturedImage(media),
        imageAlt: plainText(media?.alt_text ?? "") || `Immagine dell’articolo ${plainText(post.title.rendered)}`,
        href: post.link,
      };
    });
  } catch {
    return [];
  }
}

async function fetchEvents(params: URLSearchParams) {
  const response = await fetch(`${EVENTS_API_URL}?${params}`, {
    next: { revalidate: 3600 },
    headers: { Accept: "application/json" },
  });

  if (!response.ok) return [];

  const payload = (await response.json()) as WordPressEventsResponse;
  return payload.events ?? [];
}

export async function getFeaturedEvent(): Promise<WordPressEvent | null> {
  const today = new Date().toISOString().slice(0, 10);

  try {
    const upcomingParams = new URLSearchParams({
      per_page: "1",
      start_date: `${today} 00:00:00`,
    });
    const upcoming = await fetchEvents(upcomingParams);

    if (upcoming[0]) return mapEvent(upcoming[0], true);

    const pastParams = new URLSearchParams({
      per_page: "50",
      start_date: "2019-01-01 00:00:00",
      end_date: `${today} 23:59:59`,
    });
    const past = await fetchEvents(pastParams);
    const latestPast = past.sort((a, b) => b.start_date.localeCompare(a.start_date))[0];

    return latestPast ? mapEvent(latestPast, false) : null;
  } catch {
    return null;
  }
}

export async function getAboutContent(): Promise<AboutContent> {
  const params = new URLSearchParams({ slug: "about", per_page: "1" });

  try {
    const response = await fetch(`${ABOUT_API_URL}?${params}`, {
      next: { revalidate: 86400 },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return aboutFallback;

    const [page] = (await response.json()) as WordPressPageResponse[];
    if (!page) return aboutFallback;

    const text = plainText(page.content.rendered);
    const origins = extractTextBetween(
      text,
      "A-ROSE ODV, Associazione Ricerca Oncologica Estense",
      "ambito clinico oncologico.",
    );
    const firstVision = extractTextBetween(
      text,
      "A-ROSE ODV è un’associazione di volontariato",
      "opere di raccolta fondi, formazione e divulgazione.",
    );
    const objective = extractTextBetween(
      text,
      "A-ROSE ODV ha come attuale obiettivo",
      "singolo paziente.",
    );
    const researchActivity = extractTextBetween(
      text,
      "Uno dei nostri scopi principali",
      "finanziando progetti di ricerca.",
    );
    const trainingActivity = extractTextBetween(
      text,
      "Promuoviamo la formazione",
      "istituti nazionali e internazionali.",
    );
    const outreachActivity = extractTextBetween(
      text,
      "Abbiamo il fine di divulgare",
      "eventi aperti al pubblico.",
    );
    const visionImage = page.content.rendered.match(
      /https:\/\/a-roseodv\.org\/wp-content\/uploads\/[^"']*Arose_PicWebsite_Nastro\.jpg/i,
    )?.[0];
    const objectiveImage = page.content.rendered.match(
      /https:\/\/a-roseodv\.org\/wp-content\/uploads\/[^"']*Arose_PicWebsite_AnaniaLaboratorio\.jpg/i,
    )?.[0];
    const teamImages = Array.from(
      page.content.rendered.matchAll(
        /https:\/\/a-roseodv\.org\/wp-content\/uploads\/[^"']*Arose_PicWebsiteT-ShirtA-Rose_(?:Giorgi|Pinton|Fiorica|Anania)\.jpg/gi,
      ),
      (match) => match[0],
    ).filter((image, index, images) => images.indexOf(image) === index);

    return {
      sourceUrl: page.link,
      intro: aboutFallback.intro,
      origins: origins ?? aboutFallback.origins,
      vision: firstVision ? [firstVision] : aboutFallback.vision,
      activities:
        researchActivity && trainingActivity && outreachActivity
          ? [
              { title: "Ricerca", text: researchActivity },
              { title: "Formazione", text: trainingActivity },
              { title: "Divulgazione", text: outreachActivity },
            ]
          : aboutFallback.activities,
      objective: objective ?? aboutFallback.objective,
      visionImage: visionImage ?? aboutFallback.visionImage,
      objectiveImage: objectiveImage ?? aboutFallback.objectiveImage,
      teamImages:
        teamImages.length === aboutFallback.teamImages.length
          ? teamImages
          : aboutFallback.teamImages,
      partners: aboutFallback.partners,
    };
  } catch {
    return aboutFallback;
  }
}

export async function getPublications(
  slug: string,
  limit = 100,
): Promise<WordPressPublication[]> {
  const params = new URLSearchParams({ slug, per_page: "1" });

  try {
    const response = await fetch(`${ABOUT_API_URL}?${params}`, {
      next: { revalidate: 86400 },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return [];

    const [page] = (await response.json()) as WordPressPageResponse[];
    if (!page) return [];

    const listItems = Array.from(
      page.content.rendered.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi),
      (match) => match[1],
    );

    return listItems.slice(0, limit).map((item, index) => {
      const link = item.match(
        /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i,
      );
      const title = plainText(link?.[2] ?? item).replace(
        /\s+(?:CONCLUSIONS?|BACKGROUND|INTRODUCTION):.*$/i,
        "",
      );
      const fullText = plainText(item);
      const summary = (fullText.startsWith(title)
        ? fullText.slice(title.length).trim()
        : fullText).slice(0, 600);

      return {
        title: title || `Pubblicazione ${index + 1}`,
        summary,
        href: link?.[1] ?? page.link,
      };
    });
  } catch {
    return [];
  }
}
