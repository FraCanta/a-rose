"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/home/icons";
import type { WordPressPost } from "@/lib/wordpress";

const detailPrefix = "/prevenzione/guide-e-approfondimenti";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("it-IT", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(date));
}

function Meta({ post, light = false }: { post: WordPressPost; light?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.12em] ${light ? "text-white/75" : "text-muted"}`}>
      <span className={light ? "font-bold text-[#efabb6]" : "font-bold text-rose"}>{post.category}</span>
      <time className="border-l border-current/25 pl-3" dateTime={post.date}>{formatDate(post.date)}</time>
      <span className="border-l border-current/25 pl-3">{post.readingMinutes} min</span>
    </div>
  );
}

function ArticleImage({ post, sizes, priority = false }: { post: WordPressPost; sizes: string; priority?: boolean }) {
  return post.image ? (
    <Image className="object-cover transition duration-500 group-hover:scale-[1.025]" src={post.image} alt={post.imageAlt} fill sizes={sizes} priority={priority} />
  ) : (
    <div className="grid h-full place-items-center bg-rose-soft px-8 text-center font-serif text-3xl text-wine">A‑ROSE magazine</div>
  );
}

export function PreventionMagazine({ posts, availableCategories }: { posts: WordPressPost[]; availableCategories: string[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tutti");
  const [visibleCount, setVisibleCount] = useState(9);
  const categories = useMemo(() => ["Tutti", ...availableCategories], [availableCategories]);
  const normalizedQuery = query.trim().toLocaleLowerCase("it-IT");
  const filteredPosts = useMemo(
    () => posts.filter((post) => (category === "Tutti" || post.categories.includes(category)) && (!normalizedQuery || `${post.title} ${post.excerpt}`.toLocaleLowerCase("it-IT").includes(normalizedQuery))),
    [category, normalizedQuery, posts],
  );
  const isBrowsing = category !== "Tutti" || normalizedQuery !== "";
  const featured = posts[0];
  const highlights = posts.slice(1, 3);
  const latest = (isBrowsing ? filteredPosts : posts.slice(3)).slice(0, visibleCount);

  function selectCategory(value: string) {
    setCategory(value);
    setVisibleCount(9);
  }

  if (!posts.length) return <div className="border border-line bg-ivory p-8 text-muted">Il magazine è in aggiornamento.</div>;

  return (
    <>
      {!isBrowsing && featured ? (
        <div className="grid gap-5 lg:grid-cols-[1.45fr_0.75fr]">
          <article className="group relative min-h-[520px] overflow-hidden bg-wine-deep text-white sm:min-h-[620px]">
            <ArticleImage post={featured} sizes="(max-width: 1023px) 100vw, 65vw" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-wine-deep via-wine-deep/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10 lg:p-12">
              <Meta post={featured} light />
              <h2 className="mt-5 max-w-4xl font-serif text-[clamp(38px,5vw,66px)] font-normal leading-[0.98] tracking-[-0.04em]">{featured.title}</h2>
              <p className="mt-5 max-w-2xl line-clamp-2 text-sm leading-7 text-white/75 sm:text-base">{featured.excerpt}</p>
              <Link className="mt-7 inline-flex items-center gap-2 border-b border-white pb-1 text-sm font-bold" href={`${detailPrefix}/${featured.slug}`}>Leggi l’approfondimento <Icon className="size-4" name="arrow" /></Link>
            </div>
          </article>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {highlights.map((post) => (
              <article className="group grid overflow-hidden border border-line bg-paper sm:grid-rows-[190px_1fr]" key={post.id}>
                <div className="relative min-h-48 overflow-hidden"><ArticleImage post={post} sizes="(max-width: 1023px) 50vw, 30vw" /></div>
                <div className="flex flex-col p-6 sm:p-7">
                  <Meta post={post} />
                  <h2 className="mt-4 font-serif text-2xl font-normal leading-tight text-ink">{post.title}</h2>
                  <Link className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-bold text-wine" href={`${detailPrefix}/${post.slug}`}>Leggi <Icon className="size-4" name="arrow" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      <div className={`${isBrowsing ? "mt-0" : "mt-16"} flex flex-col gap-6 border-y border-line py-7 lg:flex-row lg:items-center lg:justify-between`}>
        <div className="flex flex-wrap gap-2" aria-label="Filtra per categoria">
          {categories.map((item) => (
            <button className={`min-h-10 rounded-full border px-4 text-xs font-bold transition ${category === item ? "border-wine bg-wine text-white" : "border-line bg-white text-ink hover:border-wine"}`} type="button" key={item} onClick={() => selectCategory(item)}>{item}</button>
          ))}
        </div>
        <label className="relative block w-full lg:max-w-sm">
          <span className="sr-only">Cerca nel magazine</span>
          <input className="min-h-12 w-full border border-line bg-white px-4 pr-11 text-sm text-ink outline-none placeholder:text-muted/60 focus:border-wine focus:ring-2 focus:ring-rose-soft" type="search" placeholder="Cerca nel magazine" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(9); }} />
          <Icon className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-wine" name="search" />
        </label>
      </div>

      <section className="mt-12" aria-labelledby="ultimi-approfondimenti">
        <div className="flex items-end justify-between gap-5">
          <div><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose">{isBrowsing ? "Risultati" : "Dal magazine"}</p><h2 className="mt-3 font-serif text-4xl font-normal text-ink sm:text-5xl" id="ultimi-approfondimenti">{isBrowsing ? `${filteredPosts.length} contenuti trovati` : "Ultimi approfondimenti"}</h2></div>
        </div>
        {latest.length ? (
          <div className="mt-9 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {latest.map((post) => (
              <article className="group flex h-full flex-col overflow-hidden border border-line bg-paper" key={post.id}>
                <div className="relative aspect-[16/10] overflow-hidden"><ArticleImage post={post} sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" /></div>
                <div className="flex flex-1 flex-col p-7"><Meta post={post} /><h3 className="mt-4 font-serif text-3xl font-normal leading-tight text-ink">{post.title}</h3><p className="mt-4 line-clamp-3 text-sm leading-7 text-muted">{post.excerpt}</p><Link className="mt-auto inline-flex items-center gap-2 pt-7 text-xs font-bold text-wine" href={`${detailPrefix}/${post.slug}`}>Leggi l’articolo <Icon className="size-4" name="arrow" /></Link></div>
              </article>
            ))}
          </div>
        ) : <div className="mt-9 border border-line bg-ivory p-8 text-muted">Nessun contenuto corrisponde alla ricerca.</div>}
        {latest.length < (isBrowsing ? filteredPosts.length : posts.slice(3).length) ? <div className="mt-10 text-center"><button className="min-h-12 rounded-full border border-wine px-7 text-sm font-bold text-wine transition hover:bg-wine hover:text-white" type="button" onClick={() => setVisibleCount((count) => count + 6)}>Carica altri</button></div> : null}
      </section>
    </>
  );
}
