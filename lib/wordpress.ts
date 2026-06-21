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
  slug: string;
  title: WordPressRendered;
  content?: WordPressRendered;
  excerpt: WordPressRendered;
  _embedded?: {
    "wp:featuredmedia"?: WordPressMedia[];
    "wp:term"?: WordPressTerm[][];
  };
};

type WordPressPageResponse = {
  link: string;
  title?: WordPressRendered;
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
  slug: string;
  start_date: string;
  end_date?: string;
  excerpt?: string;
  description?: string;
  image?: WordPressEventImage;
  categories?: Array<{ name?: string }>;
  venue?: {
    venue?: string;
    address?: string;
    city?: string;
    province?: string;
    country?: string;
  };
};

type WordPressEventsResponse = {
  events?: WordPressEventResponse[];
};

export type WordPressPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string | null;
  imageAlt: string;
  href: string;
};

export type WordPressPostDetail = WordPressPost & {
  contentHtml: string;
};

export type WordPressProject = WordPressPostDetail & {
  kind: "Ricerca scientifica" | "Divulgazione e raccolta fondi";
};

export type WordPressEvent = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  endDate: string | null;
  image: string | null;
  href: string;
  isUpcoming: boolean;
  category: string;
  venue: string | null;
  address: string | null;
  contentHtml: string;
  gallery: string[];
};

export type WordPressPublication = {
  title: string;
  summary: string;
  href: string;
  sourceLabel: string | null;
};

export type WordPressPublicationSource = {
  label: string;
  href: string;
};

export type WordPressSitePage = {
  title: string;
  text: string;
  contentHtml: string;
  sourceUrl: string;
  images: string[];
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
  const venueParts = [
    event.venue?.address,
    event.venue?.city,
    event.venue?.province,
    event.venue?.country,
  ].filter(Boolean);

  const gallery = Array.from(
    (event.description ?? "").matchAll(
      /https:\/\/a-roseodv\.org\/wp-content\/uploads\/[^"'\s<]+\.(?:avif|gif|jpe?g|png|webp)/gi,
    ),
    (match) => decodeEntities(match[0]),
  ).filter((image, index, images) => images.indexOf(image) === index);

  return {
    id: event.id,
    slug: event.slug,
    title: plainText(event.title),
    excerpt:
      plainText(event.excerpt ?? event.description ?? "") ||
      "Un'iniziativa A-ROSE dedicata a ricerca, prevenzione e comunità.",
    date: event.start_date.replace(" ", "T"),
    endDate: event.end_date ? event.end_date.replace(" ", "T") : null,
    image: getEventImage(event.image),
    href: event.url,
    isUpcoming,
    category: event.categories?.[0]?.name ?? "Evento",
    venue: event.venue?.venue ?? null,
    address: venueParts.length ? venueParts.join(", ") : null,
    contentHtml: (event.description ?? "")
      .replace(/<figure[\s\S]*?<\/figure>/gi, "")
      .replace(/<img[^>]*>/gi, ""),
    gallery,
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

function getProjectKind(title: string): WordPressProject["kind"] {
  return /pasta della vita|liana medici pagnanelli|ottobre rosa|batteremo il cancro|grandi riso/i.test(
    title,
  )
    ? "Divulgazione e raccolta fondi"
    : "Ricerca scientifica";
}

const projectCardSummaries: Record<string, string> = {
  "correlazione-tra-obesita-infiammazione-e-sviluppo-tumorale-in-donne-affette-da-carcinoma-dellendometrio":
    "In collaborazione con U.O. Ginecologia ed Ostetricia. L’obiettivo è identificare un nuovo bersaglio terapeutico per sviluppare trattamenti personalizzati.",
  "identificazione-di-un-nuovo-fattore-prognostico-nel-tumore-alla-mammella":
    "In collaborazione con U.O. Chirurgia e Anatomia Patologica. Lo studio cerca un fattore prognostico utile a scegliere il chemioterapico più adatto per ogni donna.",
  "identificazione-di-un-nuovo-meccanismo-di-resistenza-ai-chemioterapici-nel-tumore-al-colon":
    "In collaborazione con U.O. Chirurgia Generale. Il progetto studia un meccanismo di resistenza da colpire con terapie farmacologiche specifiche per il singolo paziente.",
  "analisi-degli-effetti-della-radioterapia-sullo-stato-infiammatorio":
    "In collaborazione con U.O. Oncologia Radioterapica. Lo studio valuta gli effetti della radioterapia sull’infiammazione per sviluppare trattamenti adiuvanti mirati.",
  "ricerca-di-nuove-prospettive-terapeutiche-per-il-mesotelioma-il-tumore-dellamianto":
    "In collaborazione con U.O. Chirurgia Toracica, il progetto esplora nuove prospettive terapeutiche per il mesotelioma, il tumore associato all’amianto.",
  "identificazioni-di-nuovi-assi-molecolari-come-target-per-il-tumore-al-polmone-e-il-melanoma":
    "In collaborazione con U.O. Chirurgia Toracica e U.O. Dermatologia, lo studio ricerca nuovi assi molecolari da utilizzare come bersagli terapeutici.",
  "ricerca-di-fattori-di-rischio-per-fenomeni-cardiovascolari-dopo-trattamenti-antitumorali":
    "In collaborazione con U.O. Fisica Medica, il progetto ricerca fattori di rischio cardiovascolare successivi ai trattamenti antitumorali.",
  "pasta-della-vita":
    "La tradizione della pasta fresca incontra la ricerca: un progetto con il pastificio La Lanterna che trasforma un gesto quotidiano in un sostegno concreto.",
  "mostra-su-liana-medici-pagnanelli":
    "Cultura e solidarietà si incontrano: i proventi del catalogo della mostra dedicata a Liana Medici Pagnanelli sostengono la ricerca oncologica ferrarese.",
  "ottobre-rosa-2024":
    "Una serie di incontri nelle terre degli Estensi per parlare di salute, prevenzione e ricerca oncologica insieme a esperti e comunità.",
  "batteremo-il-cancro-storia-di-una-ricercatrice-mamma-di-cinque-figli":
    "Dall’esperienza della ricercatrice Carlotta Giorgi nasce una pubblicazione che sensibilizza sull’importanza della ricerca oncologica.",
  "elementor-28444":
    "La collaborazione con Grandi Riso ha destinato il 10% delle vendite del Carnaroli A-ROSE alla ricerca, ai contratti dei ricercatori e alle strumentazioni di laboratorio.",
};

function extractProjectsFromHtml(html: string): WordPressProject[] {
  const headingMatches = Array.from(
    html.matchAll(/<h2[^>]*class=["'][^"']*entry-title[^"']*["'][^>]*>([\s\S]*?)<\/h2>/gi),
  );

  return headingMatches
    .flatMap((match, index): WordPressProject[] => {
      const headingHtml = match[1] ?? "";
      const link = headingHtml.match(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
      if (!link) return [];

      const sourceUrl = decodeEntities(link[1]);
      const slug = new URL(sourceUrl).pathname.split("/").filter(Boolean).at(-1) ?? "";
      const title = plainText(link[2]);
      if (!slug || !title) return [];

      const segmentStart = html.lastIndexOf('class="col-lg-4 col-md-6"', match.index);
      const nextSegment = html.indexOf('class="col-lg-4 col-md-6"', (match.index ?? 0) + match[0].length);
      const segment = html.slice(Math.max(0, segmentStart), nextSegment > 0 ? nextSegment : undefined);
      const image = segment.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] ?? null;
      const afterHeading = segment.slice(segment.indexOf(match[0]) + match[0].length);
      const excerpt = plainText(afterHeading.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? "");

      return [{
        id: index + 1,
        slug,
        title,
        excerpt: projectCardSummaries[slug] ?? excerpt,
        date: "2025-01-01T00:00:00",
        category: getProjectKind(title),
        kind: getProjectKind(title),
        image: image ? decodeEntities(image) : null,
        imageAlt: `Immagine del progetto ${title}`,
        href: sourceUrl,
        contentHtml: "",
      } satisfies WordPressProject];
    })
    .filter(
      (project, index, projects) =>
        projects.findIndex((item) => item.slug === project.slug) === index,
    );
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
        slug: post.slug,
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

export async function getPosts(limit = 9): Promise<WordPressPost[]> {
  return getLatestPosts(limit);
}

export async function getPostBySlug(slug: string): Promise<WordPressPostDetail | null> {
  const params = new URLSearchParams({
    _embed: "1",
    slug,
    per_page: "1",
  });

  try {
    const response = await fetch(`${WORDPRESS_API_URL}?${params}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return null;

    const [post] = (await response.json()) as WordPressPostResponse[];
    if (!post) return null;

    const media = post._embedded?.["wp:featuredmedia"]?.[0];

    return {
      id: post.id,
      slug: post.slug,
      title: plainText(post.title.rendered),
      excerpt: plainText(post.excerpt.rendered),
      date: post.date,
      category: decodeEntities(getCategory(post._embedded?.["wp:term"])),
      image: getFeaturedImage(media),
      imageAlt:
        plainText(media?.alt_text ?? "") ||
        `Immagine dell'articolo ${plainText(post.title.rendered)}`,
      href: post.link,
      contentHtml: post.content?.rendered ?? "",
    };
  } catch {
    return null;
  }
}

export async function getProjects(): Promise<WordPressProject[]> {
  const page = await getSitePage("progetti");
  if (!page) return [];

  const paginationPages = Array.from(
    page.contentHtml.matchAll(/ekit-blog-posts-paged=(\d+)/gi),
    (match) => Number.parseInt(match[1], 10),
  ).filter((value) => Number.isFinite(value) && value > 1);
  const lastPage = Math.min(Math.max(1, ...paginationPages), 10);
  const archivePages = await Promise.all(
    Array.from({ length: lastPage - 1 }, (_, index) => index + 2).map(async (pageNumber) => {
      try {
        const response = await fetch(
          `${WORDPRESS_ORIGIN}/progetti/?ekit-blog-posts-paged=${pageNumber}`,
          {
            next: { revalidate: 3600 },
            headers: { Accept: "text/html" },
          },
        );

        return response.ok ? extractProjectsFromHtml(await response.text()) : [];
      } catch {
        return [];
      }
    }),
  );
  const projects = [
    ...extractProjectsFromHtml(page.contentHtml),
    ...archivePages.flat(),
  ].filter(
    (project, index, allProjects) =>
      allProjects.findIndex((item) => item.slug === project.slug) === index,
  );
  const enrichedProjects = await Promise.all(
    projects.map(async (project) => {
      const post = await getPostBySlug(project.slug);
      if (!post) return project;

      return {
        ...post,
        category: project.kind,
        kind: project.kind,
        excerpt:
          projectCardSummaries[project.slug] ||
          post.excerpt ||
          project.excerpt ||
          plainText(post.contentHtml).replace(post.title, "").trim().slice(0, 260) ||
          "Un progetto A-ROSE a sostegno della ricerca oncologica e della comunità.",
        image: post.image ?? project.image,
      } satisfies WordPressProject;
    }),
  );

  return enrichedProjects;
}

export async function getProjectBySlug(slug: string): Promise<WordPressProject | null> {
  const [post, projects] = await Promise.all([getPostBySlug(slug), getProjects()]);
  const project = projects.find((item) => item.slug === slug);

  if (post) {
    const kind = project?.kind ?? getProjectKind(post.title);
    return {
      ...post,
      category: kind,
      kind,
      excerpt: post.excerpt || project?.excerpt || "",
      image: post.image ?? project?.image ?? null,
    };
  }

  return project ?? null;
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

export async function getEvents(limit = 9): Promise<WordPressEvent[]> {
  const today = new Date().toISOString().slice(0, 10);

  try {
    const upcomingParams = new URLSearchParams({
      per_page: String(limit),
      start_date: `${today} 00:00:00`,
    });
    const upcoming = (await fetchEvents(upcomingParams)).map((event) =>
      mapEvent(event, true),
    );

    if (upcoming.length >= limit) return upcoming.slice(0, limit);

    const pastParams = new URLSearchParams({
      per_page: String(Math.max(limit, 20)),
      start_date: "2019-01-01 00:00:00",
      end_date: `${today} 23:59:59`,
    });
    const past = (await fetchEvents(pastParams))
      .sort((a, b) => b.start_date.localeCompare(a.start_date))
      .map((event) => mapEvent(event, false));

    return [...upcoming, ...past].slice(0, limit);
  } catch {
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<WordPressEvent | null> {
  try {
    const eventId = Number.parseInt(slug, 10);

    if (!Number.isNaN(eventId)) {
      const response = await fetch(`${EVENTS_API_URL}/${eventId}`, {
        next: { revalidate: 3600 },
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        const event = (await response.json()) as WordPressEventResponse;
        return mapEvent(event, new Date(event.start_date) >= new Date());
      }
    }

    const events = await getEvents(50);
    return events.find((event) => event.slug === slug || String(event.id) === slug) ?? null;
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
      const href = link?.[1] ?? "";
      const title = plainText(link?.[2] ?? item).replace(
        /\s+(?:CONCLUSIONS?|BACKGROUND|INTRODUCTION):.*$/i,
        "",
      );
      const fullText = plainText(item);
      const summary = (fullText.startsWith(title)
        ? fullText.slice(title.length).trim()
        : fullText).slice(0, 600);
      const sourceLabel = href
        ? decodeEntities(
            href
              .replace(/^https?:\/\/(?:www\.)?/i, "")
              .replace(/\/.*$/, "")
              .replace(/^pubmed\.ncbi\.nlm\.nih\.gov$/i, "PubMed"),
          )
        : null;

      return {
        title: title || `Pubblicazione ${index + 1}`,
        summary,
        href,
        sourceLabel,
      };
    });
  } catch {
    return [];
  }
}

export async function getPublicationSources(
  slug: string,
): Promise<WordPressPublicationSource[]> {
  const params = new URLSearchParams({ slug, per_page: "1" });

  try {
    const response = await fetch(`${ABOUT_API_URL}?${params}`, {
      next: { revalidate: 86400 },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return [];

    const [page] = (await response.json()) as WordPressPageResponse[];
    if (!page) return [];

    const sources = Array.from(
      page.content.rendered.matchAll(
        /<a[^>]+href=["']([^"']+)["'][^>]*>[\s\S]*?<span class=["']elementor-button-text["']>([\s\S]*?)<\/span>[\s\S]*?<\/a>/gi,
      ),
      (match) => ({
        href: decodeEntities(match[1]),
        label: plainText(match[2]),
      }),
    ).filter((source) =>
      ["PubMed", "Google Scholar", "Scopus"].includes(source.label),
    );

    return sources.filter(
      (source, index, allSources) =>
        allSources.findIndex((item) => item.href === source.href) === index,
    );
  } catch {
    return [];
  }
}

export async function getSitePage(slug: string): Promise<WordPressSitePage | null> {
  const params = new URLSearchParams({ slug, per_page: "1" });

  try {
    const response = await fetch(`${ABOUT_API_URL}?${params}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return null;

    const [page] = (await response.json()) as WordPressPageResponse[];
    if (!page) return null;

    const images = Array.from(
      page.content.rendered.matchAll(
        /https:\/\/a-roseodv\.org\/wp-content\/uploads\/[^"'\s<]+\.(?:avif|gif|jpe?g|png|webp)/gi,
      ),
      (match) => decodeEntities(match[0]),
    ).filter((image, index, allImages) => allImages.indexOf(image) === index);

    return {
      title: plainText(page.title?.rendered ?? ""),
      text: plainText(page.content.rendered),
      contentHtml: page.content.rendered,
      sourceUrl: page.link,
      images,
    };
  } catch {
    return null;
  }
}
