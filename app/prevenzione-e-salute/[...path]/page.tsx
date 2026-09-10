import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { wellbeingTopics } from "@/lib/wellbeing-content";
import { container } from "@/components/home/styles";

type Props = { params: Promise<{ path?: string[] }> };
const base = "/prevenzione-e-salute";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path = [] } = await params;
  const topic = wellbeingTopics.find((item) => item.slug === path[0]);
  const article = topic?.articles.find((item) => item.slug === path[1]);
  return { title: `${article?.title ?? topic?.title ?? "Prevenzione e salute"} | A-ROSE`, robots: { index: false, follow: false } };
}

export default async function HealthContentPage({ params }: Props) {
  const { path = [] } = await params;
  const topic = wellbeingTopics.find((item) => item.slug === path[0]);
  const article = topic?.articles.find((item) => item.slug === path[1]);
  if (path.length > 2 || (path.length > 0 && !topic) || (path.length === 2 && !article)) notFound();
  const title = article?.title ?? topic?.title ?? "Prevenzione e salute";
  const description = article?.description ?? topic?.description ?? "Informarsi, prendersi cura della propria salute e trovare supporto. Tre percorsi per orientarsi, con il tempo e l’attenzione che ogni domanda merita.";
  const cards = topic ? topic.articles.map((item) => ({ ...item, image: topic.image, href: `${base}/${topic.slug}/${item.slug}` })) : wellbeingTopics.filter((item) => !item.group).map((item) => ({ ...item, href: `${base}/${item.slug}` }));

  return (
    <main id="contenuto">
      <div className="bg-rose-soft px-5 py-3 text-center text-sm text-wine">Contenuti informativi in attesa di revisione scientifica · Illustrazioni tematiche</div>
      <header className="border-b border-line bg-ivory py-14 sm:py-20">
        <div className={container}>
          <nav aria-label="Breadcrumb" className="mb-9 flex flex-wrap gap-2 text-sm text-wine">
            <Link href="/">Home</Link><span aria-hidden="true">/</span>
            {path.length ? <Link href={base}>Prevenzione e salute</Link> : <span aria-current="page">Prevenzione e salute</span>}
            {topic && <><span aria-hidden="true">/</span>{article ? <Link href={`${base}/${topic.slug}`}>{topic.title}</Link> : <span aria-current="page">{topic.title}</span>}</>}
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-wine">{topic ? topic.group === "conoscere" ? "Conoscere i tumori" : topic.group === "prevenire" ? "Prevenzione e controlli" : "Approfondimenti" : "Conoscere. Prevenire. Prendersi cura."}</p>
          <h1 className="mt-5 max-w-4xl font-serif text-[clamp(40px,5.5vw,76px)] leading-[1.07] tracking-tight text-wine">{title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted">{description}</p>
        </div>
      </header>

      {!topic && <section className={`${container} grid gap-6 py-12 lg:grid-cols-3`} aria-label="I tre percorsi">
        <div className="rounded-2xl border border-line bg-paper p-8 text-wine"><h2 className="font-serif text-3xl">Conoscere i tumori</h2><p className="mt-4 leading-relaxed text-muted">Concetti, parole e progetti per capire meglio.</p><ul className="mt-6 space-y-4 underline underline-offset-4"><li><Link href={`${base}/conoscere-i-tumori/cosa-sono`}>Cosa sono i tumori</Link></li><li><Link href={`${base}/conoscere-i-tumori/glossario`}>Glossario</Link></li><li><Link href={`${base}/conoscere-i-tumori/ricerca-e-patologie`}>Patologie e progetti A-ROSE</Link></li></ul></div>
        <div className="rounded-2xl bg-wine p-8 text-white"><h2 className="font-serif text-3xl">Prevenzione e controlli</h2><p className="mt-4 leading-relaxed text-white/85">Abitudini quotidiane e percorsi di prevenzione.</p><ul className="mt-6 space-y-4 underline underline-offset-4"><li><Link href="/prevenzione/prevenzione-oncologica">Prevenzione oncologica</Link></li><li><Link href={`${base}/stili-di-vita`}>Stili di vita</Link></li><li><Link href="/prevenzione/hpv-e-tumore-cervicale">HPV e tumore cervicale</Link></li><li><Link href="/prevenzione/screening-e-controlli">Screening e controlli</Link></li></ul></div>
        <div className="rounded-2xl bg-rose-soft p-8 text-wine"><h2 className="font-serif text-3xl">Approfondimenti</h2><p className="mt-4 leading-relaxed">La persona al centro, anche nelle difficoltà quotidiane.</p><ul className="mt-6 space-y-4 underline underline-offset-4">{wellbeingTopics.filter((item) => !item.group).map((item) => <li key={item.slug}><Link href={`${base}/${item.slug}`}>{item.title}</Link></li>)}</ul></div>
      </section>}

      {article && topic ? (
        <article className={`${container} grid gap-10 py-16 lg:grid-cols-[240px_1fr] lg:gap-20`}>
          <aside className="self-start lg:sticky lg:top-28"><p className="font-bold text-wine">In questa pagina</p><nav aria-label="Indice dell’approfondimento" className="mt-5 flex flex-col gap-4 text-sm text-wine"><a href="#informazioni">Per orientarti</a><a href="#domande">Domande da portare alla visita</a><a href="#fonti">Fonti e responsabilità</a></nav></aside>
          <div className="max-w-3xl">
            <Image src={topic.image} alt="" width={800} height={500} className="mb-10 w-full rounded-2xl" sizes="(max-width: 1023px) 100vw, 750px" />
            <section id="informazioni" className="scroll-mt-28"><h2 className="font-serif text-3xl text-wine">Per orientarti</h2>{article.paragraphs.map((text) => <p key={text} className="mt-6 text-lg leading-8 text-muted">{text}</p>)}</section>
            <section id="domande" className="mt-12 scroll-mt-28 rounded-2xl bg-ivory p-7 sm:p-9"><h2 className="font-serif text-3xl text-wine">Da portare alla visita</h2><ul className="mt-6 list-disc space-y-4 pl-5 leading-relaxed text-ink">{article.questions.map((question) => <li key={question}>{question}</li>)}</ul></section>
            <section id="fonti" className="mt-12 scroll-mt-28 border-t border-line pt-8"><h2 className="font-serif text-2xl text-wine">Fonti e responsabilità</h2><a href={article.source} className="mt-4 inline-block text-wine underline underline-offset-4">{article.source.startsWith("/") ? "A-ROSE — progetti di ricerca" : article.source.includes("iarc") ? "IARC — Codice europeo contro il cancro" : "National Cancer Institute — approfondimento di riferimento (inglese)"}</a><p className="mt-4 text-sm leading-relaxed text-muted">Fonti consultate il 10 settembre 2026. Bozza non revisionata: informazioni generali, non una valutazione clinica né indicazioni personalizzate. Rivolgiti al team che ti segue.</p></section>
            <Link href={`${base}/${topic.slug}`} className="mt-10 inline-block font-bold text-wine underline underline-offset-4">← Tutti gli approfondimenti: {topic.title}</Link>
          </div>
        </article>
      ) : (
        <section className={`${container} py-16 sm:py-20`} aria-label="Approfondimenti">
          {!topic && <h2 id="approfondimenti-salute" className="mb-10 scroll-mt-28 font-serif text-4xl text-wine">Approfondimenti</h2>}
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {topic?.slug === "alimentazione-durante-le-cure" && <div className="border-t-2 border-rose pt-6"><h2 className="font-serif text-3xl text-wine">Ogni persona ha bisogni diversi.</h2><p className="mt-5 leading-7 text-muted">Non servono regole rigide uguali per tutti. Parti dalle difficoltà che incontri e dalle domande che vuoi fare: queste guide sono un punto di partenza per il confronto con il team.</p></div>}
            {cards.map((card, index) => <Link key={card.slug} href={card.href} className={`site-card group block overflow-hidden ${topic?.slug === "supporto-psicologico-e-psiconcologia" && index === 0 ? "sm:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-2 lg:items-center " : ""}`}>
              <div className="overflow-hidden bg-ivory"><Image src={card.image} alt="" width={800} height={500} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="aspect-[8/5] w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105" /></div>
              <div className="site-card-body"><h2 className="mt-0 font-serif text-2xl leading-tight text-wine group-hover:underline">{card.title}</h2><p className="mt-3 leading-relaxed text-muted">{card.description}</p><span className="site-card-action mt-5">Approfondisci <span aria-hidden="true">→</span></span></div>
            </Link>)}
          </div>
          <p className="mt-16 border-t border-line pt-7 text-sm leading-relaxed text-muted">Informazioni generali, non sostitutive del parere medico. Non sono proposti servizi clinici A-ROSE o iniziative non confermate. Ogni approfondimento riporta la propria fonte.</p>
          {!topic && <nav aria-label="Risorse trasversali" className="mt-8 flex flex-wrap gap-8 font-bold text-wine"><Link className="underline underline-offset-4" href="/prevenzione/guide-e-approfondimenti">Guide e approfondimenti</Link><Link className="underline underline-offset-4" href="/prevenzione/faq">Domande frequenti</Link></nav>}
        </section>
      )}
    </main>
  );
}
