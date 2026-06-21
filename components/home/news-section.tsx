import Image from "next/image";
import Link from "next/link";
import { getLatestPosts } from "@/lib/wordpress";
import { articles } from "./data";
import { Eyebrow } from "./eyebrow";
import { Icon } from "./icons";
import { container, heading, section, textLink } from "./styles";

export async function NewsSection() {
  const latestPosts = await getLatestPosts(3);
  const visibleArticles = latestPosts.length
    ? latestPosts.map((post, index) => ({
        ...post,
        alt: post.imageAlt,
        image: post.image ?? articles[index]?.image ?? "/images/ricerca-dettaglio.jpg",
        text: post.excerpt,
      }))
    : articles.map((article, index) => ({
        ...article,
        date: null,
        href: "/news",
        id: `fallback-${index}`,
      }));

  return (
    <section className={section} id="news">
      <div className={container}>
        <div className="flex items-end justify-between gap-8 max-sm:flex-col max-sm:items-start">
          <div>
            <Eyebrow>Prevenzione e conoscenza</Eyebrow>
            <h2 className={heading}>
              Informare è già
              <br />
              <em className="font-normal text-rose">una forma di cura</em>
            </h2>
          </div>
          <Link className={textLink} href="/news">
            Tutti gli approfondimenti <Icon className="size-4" name="arrow" />
          </Link>
        </div>
        <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {visibleArticles.map((article, index) => (
            <article
              className={`group flex h-full flex-col bg-paper transition hover:-translate-y-2 hover:shadow-soft ${
                index === visibleArticles.length - 1
                  ? "max-md:max-w-[calc(50%-14px)] max-sm:max-w-none md:max-lg:col-span-2"
                  : ""
              }`}
              key={article.id}
            >
              <div className="relative h-[235px] overflow-hidden bg-[#d9979c]">
                <Image
                  className="object-cover transition group-hover:scale-[1.035]"
                  src={article.image}
                  alt={article.alt}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 820px) 50vw, 33vw"
                />
                <span className="absolute left-5 top-4 grid size-7 place-items-center rounded-full bg-wine-deep/75 font-serif text-xs text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-8">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-rose">
                    {article.category}
                  </span>
                  {article.date ? (
                    <time
                      className="border-l border-line pl-3 text-[11px] font-medium normal-case tracking-normal text-muted"
                      dateTime={article.date}
                    >
                      {new Intl.DateTimeFormat("it-IT", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(article.date))}
                    </time>
                  ) : null}
                </div>
                <h3 className="my-3 line-clamp-2 min-h-[2.5em] font-serif text-[25px] font-normal leading-tight">
                  {article.title}
                </h3>
                <p className="line-clamp-3 min-h-[4.875em] text-[13px] leading-relaxed text-muted">
                  {article.text}
                </p>
                <Link
                  className={`${textLink} mt-auto pt-5 text-xs`}
                  href={typeof article.id === "number" && "slug" in article ? `/news/${article.slug}` : article.href}
                  aria-label={`Leggi l'articolo: ${article.title}`}
                >
                  Leggi l’articolo <Icon className="size-4" name="arrow" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
