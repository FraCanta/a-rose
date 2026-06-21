import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { container, heading, section, textLink } from "@/components/home/styles";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getPosts } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "News | A-ROSE ODV",
  description:
    "News, approfondimenti e contenuti divulgativi di A-ROSE ODV su ricerca oncologica, prevenzione e comunità.",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function NewsPage() {
  const posts = await getPosts(12);

  return (
    <main id="contenuto">
      <ScrollReveal>
        <section className={`${section} bg-white`}>
          <div className={container}>
            <div className="flex items-end justify-between gap-8 max-sm:flex-col max-sm:items-start">
              <div>
                <Eyebrow>News e approfondimenti</Eyebrow>
                <h1 className={heading}>
                  Informazione scientifica,
                  <br />
                  <em className="font-normal text-rose">prevenzione e comunità</em>
                </h1>
              </div>
              <Link className={textLink} href="/#news">
                Torna alla home <Icon className="size-4" name="arrow" />
              </Link>
            </div>

            {posts.length ? (
              <div className="mt-16 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                {posts.map((post, index) => (
                  <article
                    className="group flex h-full flex-col overflow-hidden border border-line bg-paper transition hover:-translate-y-2 hover:shadow-soft"
                    key={post.id}
                  >
                    <div className="relative h-[250px] overflow-hidden bg-rose-soft">
                      {post.image ? (
                        <Image
                          className="object-cover transition duration-500 group-hover:scale-[1.035]"
                          src={post.image}
                          alt={post.imageAlt}
                          fill
                          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                        />
                      ) : null}
                      <span className="absolute left-5 top-4 grid size-8 place-items-center rounded-full bg-wine-deep/80 font-serif text-xs text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-7 sm:p-8">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-rose">
                          {post.category}
                        </span>
                        <time
                          className="border-l border-line pl-3 text-[11px] font-medium text-muted"
                          dateTime={post.date}
                        >
                          {formatDate(post.date)}
                        </time>
                      </div>
                      <h2 className="mt-4 min-h-[3.1em] font-serif text-[28px] font-normal leading-[1.04] tracking-[-0.025em] text-ink">
                        {post.title}
                      </h2>
                      <p className="mt-4 line-clamp-3 min-h-[5.25em] text-sm leading-[1.75] text-muted">
                        {post.excerpt}
                      </p>
                      <Link
                        className={`${textLink} mt-auto pt-6 text-xs`}
                        href={`/news/${post.slug}`}
                        aria-label={`Leggi l'articolo: ${post.title}`}
                      >
                        Leggi articolo <Icon className="size-4" name="arrow" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-14 border border-line bg-ivory p-8 text-muted">
                Al momento non sono disponibili news importabili da WordPress.
              </div>
            )}
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
