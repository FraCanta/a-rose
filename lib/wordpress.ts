const WORDPRESS_API_URL = "https://a-roseodv.org/wp-json/wp/v2/posts";

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
