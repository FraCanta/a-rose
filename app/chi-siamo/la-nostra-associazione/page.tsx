import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutBreadcrumbs } from "@/components/about/about-breadcrumbs";
import { Eyebrow } from "@/components/home/eyebrow";
import { container, heading, section, textLink } from "@/components/home/styles";
import { founders } from "@/components/team/data";
import { getAboutContent } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "La nostra associazione | A-ROSE ODV",
  description: "Le origini di A-ROSE a Ferrara, la presidente Carlotta Giorgi, l’identità dell’associazione e i documenti istituzionali.",
};

export default async function AssociationPage() {
  const content = await getAboutContent();
  const president = founders[0];

  return (
    <main id="contenuto">
      <header className="bg-paper pt-8 sm:pt-12">
        <div className={container}>
          <AboutBreadcrumbs current="La nostra associazione" />
          <div className="grid gap-8 pb-12 lg:grid-cols-[1.5fr_0.7fr] lg:gap-20 lg:pb-16">
            <div>
              <Eyebrow>La nostra associazione</Eyebrow>
              <h1 className="max-w-4xl font-serif text-[clamp(42px,5vw,76px)] font-normal leading-[1.08] tracking-[-0.035em] text-wine">A Ferrara dal 2019,<br />insieme per la ricerca.</h1>
            </div>
            <div className="self-end border-l border-rose pl-6">
              <p className="text-lg leading-relaxed text-muted">{content.intro}</p>
              <a className={`${textLink} mt-5`} href="#identita">Conosci l’associazione <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <Image src="/images/A-ROSE_group.webp" alt="I quattro fondatori di A-ROSE: Carlotta Giorgi, Paolo Pinton, Gabriele Anania e Francesco Fiorica" width={1440} height={960} priority sizes="(max-width: 1023px) 100vw, 80vw" className="aspect-[4/3] w-full object-cover object-top sm:aspect-[2/1] lg:ml-[16%] lg:w-[84%]" />
        </div>
      </header>

      <section id="identita" className="scroll-mt-28 py-16 sm:py-24">
        <div className={`${container} grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20`}>
          <div><Eyebrow>Le origini</Eyebrow><h2 className={heading}>Un’idea condivisa,<br /><em className="font-normal text-rose">un impegno comune.</em></h2></div>
          <div className="space-y-6 border-l border-rose/40 pl-6 sm:pl-10">
            <p className="text-lg leading-relaxed text-wine">{content.origins}</p>
            {content.vision.map((paragraph) => <p className="text-base leading-7 text-muted" key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-24">
        <div className={`${container} grid items-center gap-10 lg:grid-cols-2 lg:gap-24`}>
          <div>
            <Eyebrow>La presidente</Eyebrow>
            <h2 className={heading}>{president.name}</h2>
            <p className="mt-7 text-lg leading-relaxed text-wine">{president.role}</p>
            <p className="mt-5 text-base leading-7 text-muted">{president.skills}</p>
            <p className="mt-5 text-base leading-7 text-muted">{president.goals}</p>
            <Link className={`${textLink} mt-8`} href="/chi-siamo/team-scientifico">Conosci i fondatori e il team scientifico <span aria-hidden="true">→</span></Link>
          </div>
          <Image src={president.image} alt={`Ritratto di ${president.name}`} width={640} height={800} sizes="(max-width: 1023px) 100vw, 40vw" className="mx-auto aspect-[4/5] w-full max-w-md object-cover object-top" />
        </div>
      </section>

      <section className={section}>
        <div className={container}>
          <Eyebrow>Documenti e responsabilità</Eyebrow>
          <h2 className={heading}>Un’associazione <em className="font-normal text-rose">aperta e trasparente.</em></h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-muted">Lo statuto e i rendiconti raccontano come è costituita A-ROSE e come vengono impiegate le risorse. Puoi consultarli nella sezione Trasparenza.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <Link href="/trasparenza" className="site-card site-card-body group"><h3>Statuto e rendiconti</h3><p className="mt-4 leading-7 text-muted">Consulta i documenti associativi e l’archivio dei bilanci pubblicati.</p><span className="site-card-action">Vai ai documenti <span aria-hidden="true">→</span></span></Link>
            <Link href="/come-sostenerci/come-usiamo-i-fondi" className="site-card site-card-body group"><h3>Come usiamo i fondi</h3><p className="mt-4 leading-7 text-muted">Scopri le finalità e le attività a cui contribuiscono le donazioni.</p><span className="site-card-action">Scopri l’impiego dei fondi <span aria-hidden="true">→</span></span></Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line pb-20 pt-12 sm:pb-28">
        <div className={container}>
          <h2 className={heading}>Le persone e l’impegno.</h2>
          <div className="mt-10 divide-y divide-line border-y border-line">
            <details className="group py-6"><summary className="cursor-pointer text-xl font-semibold text-wine">I fondatori</summary><ul className="mt-5 grid gap-4 sm:grid-cols-2">{founders.map((founder) => <li key={founder.key}><h3 className="font-serif text-2xl">{founder.name}</h3><p className="mt-2 leading-7 text-muted">{founder.role}</p></li>)}</ul><Link href="/chi-siamo/team-scientifico" className={`${textLink} mt-6`}>Profili, curriculum e pubblicazioni <span aria-hidden="true">→</span></Link></details>
            <details className="py-6"><summary className="cursor-pointer text-xl font-semibold text-wine">L’impegno nella ricerca</summary><p className="mt-5 max-w-4xl leading-7 text-muted">{content.objective}</p><Link href="/la-ricerca/progetti-di-ricerca" className={`${textLink} mt-6`}>Esplora i progetti <span aria-hidden="true">→</span></Link></details>
            <details className="py-6"><summary className="cursor-pointer text-xl font-semibold text-wine">La rete di collaborazioni</summary><p className="mt-5 max-w-4xl leading-7 text-muted">Istituzioni, laboratori, associazioni e imprese affiancano A-ROSE nelle attività di ricerca e nelle iniziative sul territorio.</p><Link href="/chi-siamo/partner-e-sostenitori" className={`${textLink} mt-6`}>Conosci partner e sostenitori <span aria-hidden="true">→</span></Link></details>
          </div>
          <Link href="/chi-siamo" className={`${textLink} mt-10`}>Torna alla panoramica Chi siamo <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
