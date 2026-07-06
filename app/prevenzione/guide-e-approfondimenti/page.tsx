import type { Metadata } from "next";
import Link from "next/link";
import { PreventionMagazine } from "@/components/editorial/prevention-magazine";
import { Eyebrow } from "@/components/home/eyebrow";
import { container, section } from "@/components/home/styles";
import { getAllPosts, getPostCategories } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Guide e approfondimenti | A-ROSE ODV",
  description:
    "Articoli A-ROSE dedicati alla prevenzione oncologica e alla consapevolezza.",
};

export default async function PreventionGuidesPage() {
  const [posts, categories] = await Promise.all([getAllPosts(), getPostCategories()]);

  return (
    <main id="contenuto">
      <header className="border-b border-line bg-paper py-14 sm:py-20">
        <div className={container}>
          <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-2 text-xs text-muted"><Link href="/">Home</Link><span>/</span><Link href="/prevenzione">Prevenzione</Link><span>/</span><span aria-current="page" className="text-ink">Guide e approfondimenti</span></nav>
          <Eyebrow>Magazine della prevenzione</Eyebrow>
          <h1 className="mt-5 max-w-5xl font-serif text-[clamp(46px,7vw,92px)] font-normal leading-[0.94] tracking-[-0.05em] text-ink">Conoscere aiuta a <em className="font-normal text-rose">prevenire.</em></h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-muted sm:text-lg">Guide, approfondimenti e informazioni affidabili per orientarsi tra prevenzione, diagnosi e consapevolezza oncologica. I contenuti sono divulgativi e non sostituiscono il parere medico.</p>
        </div>
      </header>
      <section className={`${section} bg-white`}><div className={container}><PreventionMagazine posts={posts} availableCategories={categories} /></div></section>
    </main>
  );
}
