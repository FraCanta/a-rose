import type { Metadata } from "next";
import { AboutBreadcrumbs } from "@/components/about/about-breadcrumbs";
import { AssociationNewsGrid } from "@/components/about/association-news";
import { container, section } from "@/components/home/styles";
import { getAssociationNews } from "@/lib/association-news";

export const metadata: Metadata = {
  title: "Notizie dall’associazione | A-ROSE ODV",
  description: "Iniziative, collaborazioni, progetti, premi e aggiornamenti della ricerca A-ROSE.",
};

export default async function AssociationNewsPage() {
  const posts = await getAssociationNews();
  return (
    <main id="contenuto">
      <header className="bg-ivory py-12 sm:py-20"><div className={container}><AboutBreadcrumbs current="Notizie" /><h1 className="max-w-4xl font-serif text-[clamp(42px,5vw,76px)] leading-tight tracking-[-0.035em] text-wine">Notizie dall’associazione</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">La ricerca, le persone e le iniziative che fanno crescere A-ROSE. Tutti gli aggiornamenti, dal più recente.</p></div></header>
      <section aria-label="Archivio delle notizie" className={section}><div className={container}><AssociationNewsGrid posts={posts} /></div></section>
    </main>
  );
}
