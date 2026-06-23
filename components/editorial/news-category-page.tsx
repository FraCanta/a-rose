import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { container, section, textLink } from "@/components/home/styles";
import { getPosts } from "@/lib/wordpress";

type NewsCategoryPageProps = {
  title: string;
  accent: string;
  intro: string;
  filter: (category: string) => boolean;
  parent?: { href: string; label: string };
  eyebrow?: string;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export async function NewsCategoryPage({
  title,
  accent,
  intro,
  filter,
  parent = { href: "/news", label: "News" },
  eyebrow = "News",
}: NewsCategoryPageProps) {
  const posts = (await getPosts(30)).filter((post) => filter(post.category));
  return (
    <main id="contenuto">
      <header className="border-b border-line bg-paper py-14 sm:py-20">
        <div className={container}>
          <nav
            aria-label="Breadcrumb"
            className="mb-9 flex items-center gap-2 text-xs text-muted"
          >
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href={parent.href}>{parent.label}</Link>
            <span>/</span>
            <span aria-current="page" className="text-ink">
              Guide e approfondimenti
            </span>
          </nav>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 font-serif text-[clamp(44px,6vw,78px)] font-normal leading-none tracking-[-0.045em] text-ink">
            {title} <em className="font-normal text-rose">{accent}</em>
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-[1.8] text-muted sm:text-lg">
            {intro}
          </p>
        </div>
      </header>
      <section className={`${section} bg-white`}>
        <div className={container}>
          {posts.length ? (
            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <article
                  className="group flex h-full flex-col overflow-hidden border border-line bg-paper"
                  key={post.id}
                >
                  {post.image ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-rose-soft">
                      <Image
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        sizes="(max-width: 767px) 100vw, 33vw"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-rose">
                        {post.category}
                      </span>
                      <time
                        className="border-l border-line pl-3 text-[11px] text-muted"
                        dateTime={post.date}
                      >
                        {formatDate(post.date)}
                      </time>
                    </div>
                    <h2 className="mt-4 font-serif text-3xl font-normal leading-tight text-ink">
                      {post.title}
                    </h2>
                    <p className="mt-4 line-clamp-3 text-sm leading-[1.75] text-muted">
                      {post.excerpt}
                    </p>
                    <Link
                      className={`${textLink} mt-auto pt-6 text-xs`}
                      href={`/news/${post.slug}`}
                    >
                      Leggi <Icon className="size-4" name="arrow" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-line bg-ivory p-8 sm:p-12">
              <h2 className="font-serif text-3xl text-ink">
                Archivio in aggiornamento
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-[1.8] text-muted">
                Non ci sono ancora contenuti classificati in questa sezione. Le
                prossime pubblicazioni saranno raccolte qui.
              </p>
              <Link className={`${textLink} mt-6`} href={parent.href}>
                Torna a {parent.label.toLowerCase()}{" "}
                <Icon className="size-4" name="arrow" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
