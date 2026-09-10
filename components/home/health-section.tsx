import Image from "next/image";
import Link from "next/link";
import { wellbeingTopics } from "@/lib/wellbeing-content";
import { Eyebrow } from "./eyebrow";
import { Icon } from "./icons";
import { container, heading, textLink } from "./styles";

const base = "/prevenzione-e-salute";
const paths = [
  { title: "Conoscere i tumori", text: "Parole, domande e concetti per iniziare a orientarsi.", href: `${base}#conosci` },
  { title: "Prevenzione e controlli", text: "Un punto di partenza per informarsi su prevenzione e screening.", href: `${base}#previeni` },
  { title: "Approfondimenti per il paziente", text: "Alimentazione, movimento ed emozioni: gli argomenti della vita quotidiana.", href: `${base}#approfondimenti-salute` },
] as const;
const featuredSlugs = ["alimentazione-durante-le-cure", "attivita-fisica", "supporto-psicologico-e-psiconcologia"];
const featuredTopics = featuredSlugs.flatMap((slug) => {
  const topic = wellbeingTopics.find((item) => item.slug === slug);
  return topic ? [topic] : [];
});

export function HealthSection() {
  return (
    <section className="bg-paper py-16 sm:py-20 lg:py-24" aria-labelledby="home-health-title">
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>Prevenzione e salute</Eyebrow>
            <h2 id="home-health-title" className={heading}>
              Conoscere, prevenire.<br />
              <em className="font-normal text-rose">Prendersi cura.</em>
            </h2>
          </div>
          <div>
            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Uno spazio per le tue domande: esplora i percorsi dedicati alla
              prevenzione e agli aspetti quotidiani della malattia.
            </p>
            <Link href={base} className={`${textLink} mt-5`}>
              Esplora prevenzione e salute <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        </div>

        <nav aria-label="Percorsi di prevenzione e salute" className="mt-10 grid divide-y divide-line border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {paths.map((path, index) => (
            <Link key={path.href} href={path.href} className="group p-6 transition-colors hover:bg-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine lg:p-8">
              <span className="text-xs tracking-widest text-wine" aria-hidden="true">0{index + 1}</span>
              <h3 className="mt-4 font-serif text-2xl font-normal text-wine group-hover:underline">{path.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{path.text}</p>
              <Icon name="arrow" className="mt-5 size-5 text-wine" />
            </Link>
          ))}
        </nav>

        <div className="mt-12">
          <h3 className="font-serif text-3xl font-normal text-wine">Argomenti da esplorare</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            I nuovi approfondimenti sono bozze in attesa di revisione scientifica.
            Non sostituiscono il confronto con i professionisti che ti seguono.
          </p>
          <div className="mt-7 grid gap-7 md:grid-cols-3">
            {featuredTopics.map((topic) => (
              <Link key={topic.slug} href={`${base}/${topic.slug}`} className="site-card group flex flex-col overflow-hidden">
                <div className="overflow-hidden bg-ivory">
                  <Image src={topic.image} alt="" width={800} height={500} sizes="(max-width: 767px) 100vw, 33vw" className="aspect-[8/5] w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.03]" />
                </div>
                <div className="site-card-body flex flex-1 flex-col"><h4 className="mt-0 font-serif text-2xl font-normal text-wine group-hover:underline">{topic.title}</h4>
                <span className="site-card-action mt-auto">Esplora l’argomento <Icon name="arrow" className="size-4" /></span></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
