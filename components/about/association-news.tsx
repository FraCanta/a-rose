import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { container, heading, section, textLink } from "@/components/home/styles";
import { getAssociationNews } from "@/lib/association-news";
import type { WordPressPost } from "@/lib/wordpress";

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric", month: "long", year: "numeric",
});

export function AssociationNewsGrid({ posts }: { posts: WordPressPost[] }) {
  if (!posts.length) {
    return <p className="border-y border-line py-8 text-base leading-7 text-muted">Le notizie non sono disponibili in questo momento. Riprova più tardi oppure <Link href="/contatti" className="text-wine underline underline-offset-4">contatta l’associazione</Link>.</p>;
  }

  return (
    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.id} className="site-card flex flex-col overflow-hidden">
          {post.image ? <div className="relative aspect-[3/2] bg-ivory"><Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" /></div> : <div className="flex aspect-[3/2] items-center justify-center bg-rose-soft p-6 font-serif text-3xl text-wine" aria-hidden="true">A-ROSE</div>}
          <div className="site-card-body flex flex-1 flex-col">
            <p className="text-xs font-bold uppercase tracking-widest text-wine">{post.categories.filter((category) => category !== "Prevenzione").join(" · ")}</p>
            <time dateTime={post.date} className="mt-3 text-sm text-muted">{dateFormatter.format(new Date(post.date))}</time>
            <h3 className="mt-4">{post.title}</h3>
            <p className="mb-6 mt-4 line-clamp-3 text-base leading-7 text-muted">{post.excerpt}</p>
            <Link href={`/prevenzione/guide-e-approfondimenti/${post.slug}`} className="site-card-action mt-auto" aria-label={`Leggi la notizia: ${post.title}`}>Leggi la notizia <span aria-hidden="true">→</span></Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export async function AssociationNews() {
  const posts = (await getAssociationNews()).slice(0, 3);
  return (
    <section className={`${section} border-t border-line`} aria-labelledby="association-news-title">
      <div className={container}>
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-14 lg:flex-row lg:items-end">
          <div><Eyebrow>La vita di A-ROSE</Eyebrow><h2 id="association-news-title" className={heading}>Notizie <em className="font-normal text-rose">dall’associazione.</em></h2><p className="mt-5 max-w-2xl text-base leading-7 text-muted">Iniziative, collaborazioni e aggiornamenti dal mondo della ricerca A-ROSE.</p></div>
          <Link href="/chi-siamo/notizie" className={`${textLink} shrink-0`}>Tutte le notizie <span aria-hidden="true">→</span></Link>
        </div>
        <AssociationNewsGrid posts={posts} />
      </div>
    </section>
  );
}
