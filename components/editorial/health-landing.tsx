import Image from "next/image";
import Link from "next/link";
import { container } from "@/components/home/styles";
import { wellbeingTopics } from "@/lib/wellbeing-content";

const base = "/prevenzione-e-salute";
const paths = [
  { title: "Conosci", intro: "Le parole giuste aiutano a fare domande e a comprendere le risposte.", links: [
    ["Cosa sono i tumori", `${base}/conoscere-i-tumori/cosa-sono`, "Una prima introduzione alle differenze e ai concetti fondamentali."],
    ["Patologie e ricerca A-ROSE", `${base}/conoscere-i-tumori/ricerca-e-patologie`, "Le domande scientifiche alla base dei nostri progetti."],
    ["Glossario", `${base}/conoscere-i-tumori/glossario`, "Un aiuto per orientarsi nel linguaggio della diagnosi."],
  ] },
  { title: "Previeni", intro: "Abitudini quotidiane e percorsi sanitari: conoscere le possibilità è il primo passo.", links: [
    ["Prevenzione oncologica", "/prevenzione/prevenzione-oncologica", "Riduzione dei rischi e informazioni per orientarsi."],
    ["Screening e controlli", "/prevenzione/screening-e-controlli", "Comprendere i programmi e rivolgersi ai servizi del territorio."],
    ["HPV e tumore cervicale", "/prevenzione/hpv-e-tumore-cervicale", "Informarsi su infezione, vaccinazione e screening."],
  ] },
];

export function HealthLanding() {
  return <main id="contenuto">
    <header className="bg-wine pt-14 text-white sm:pt-24">
      <div className={`${container} grid gap-10 lg:grid-cols-[2fr_1fr]`}>
        <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#efabb6]">Prevenzione e salute</p><h1 className="mt-6 max-w-4xl font-serif text-[clamp(44px,6vw,84px)] leading-[1.04]">Conoscere, prevenire.<br /><em className="font-normal text-[#efabb6]">Prendersi cura.</em></h1></div>
        <div className="self-end border-l border-white/30 pl-7"><p className="max-w-sm text-lg leading-relaxed text-white/85">Informazioni comprensibili per orientarsi nella prevenzione e trovare spazio per le proprie domande.</p><a href="#conosci" className="mt-6 inline-block py-3 font-bold">Esplora i percorsi ↓</a></div>
        <figure className="relative -mb-16 mt-3 lg:col-span-2 lg:ml-[16%]"><Image src="/images/prevenzione-dialogo.webp" alt="Un momento di dialogo tra una professionista sanitaria e una donna" width={1448} height={1086} sizes="(max-width: 1023px) 100vw, 80vw" priority className="max-h-[480px] w-full object-cover object-center" /><figcaption className="bg-ivory px-4 py-2 text-xs text-muted">Immagine illustrativa. Non rappresenta un servizio clinico A-ROSE.</figcaption></figure>
      </div>
    </header>
    <div className={`${container} pb-16 pt-28 sm:pb-24`}><p className="max-w-4xl border-l-2 border-rose pl-7 text-xl leading-relaxed text-wine lg:ml-[16%]">La salute riguarda anche il modo in cui comprendiamo le informazioni. Qui trovi percorsi per conoscere i tumori, orientarti nei controlli e affrontare i bisogni quotidiani insieme ai professionisti che ti seguono.</p><p className="mt-5 text-sm text-muted lg:ml-[16%]">I nuovi approfondimenti sono bozze in attesa di revisione scientifica.</p></div>
    {paths.map((path, index) => <section id={index === 0 ? "conosci" : "previeni"} key={path.title} className={`scroll-mt-28 py-16 sm:py-24 ${index === 0 ? "bg-ivory" : "bg-white"}`}>
      <div className={container}><h2 className="font-serif text-5xl text-wine sm:text-6xl">{path.title}</h2><div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20"><div><p className="mb-8 max-w-xl text-lg leading-relaxed text-muted">{path.intro}</p><ul className="divide-y divide-line border-t border-line">{path.links.map(([label, href, detail]) => <li key={href}><Link href={href} className="group block py-6"><h3 className="font-serif text-2xl text-wine group-hover:underline">{label}</h3><p className="mt-2 max-w-lg leading-relaxed text-muted">{detail}</p><span className="mt-3 inline-block text-sm font-bold text-wine">Scopri di più →</span></Link></li>)}</ul></div><div className="flex flex-col justify-center bg-rose-soft p-8 sm:p-12"><p className="text-xs font-bold uppercase tracking-widest text-wine">{index === 0 ? "Una domanda alla volta" : "Un percorso personale"}</p><h3 className="mt-6 font-serif text-4xl leading-tight text-wine">{index === 0 ? "Capire non significa dover sapere già tutto." : "I controlli giusti, con le informazioni giuste."}</h3><p className="mt-6 text-lg leading-relaxed text-ink">{index === 0 ? "Puoi chiedere di spiegare una parola, ripetere un’informazione o chiarire un passaggio. Preparare le domande può rendere più utile il confronto con il medico." : "Per indicazioni personali e appuntamenti fai riferimento al tuo medico e ai programmi ufficiali della tua ASL. Un contenuto online non sostituisce una visita."}</p></div></div>
      {index === 1 && <Link href={`${base}/stili-di-vita`} className="mt-14 grid overflow-hidden bg-ivory sm:grid-cols-2"><Image src="/images/editorial/movimento.svg" alt="" width={800} height={500} sizes="50vw" className="h-full w-full object-cover" /><div className="self-center p-8 sm:p-12"><h3 className="font-serif text-4xl text-wine">Vivere sano</h3><p className="mt-5 leading-relaxed text-muted">Alimentazione, movimento, fumo, alcol e protezione dal sole: esplora gli approfondimenti sulle abitudini quotidiane.</p><span className="mt-5 inline-block font-bold text-wine">Esplora gli stili di vita →</span></div></Link>}
      </div>
    </section>)}
    <section id="approfondimenti-salute" className="scroll-mt-28 bg-ivory py-16 sm:py-24"><div className={container}><p className="text-xs font-bold uppercase tracking-widest text-rose">La persona, oltre la diagnosi</p><h2 className="mt-5 font-serif text-5xl text-wine sm:text-6xl">Approfondimenti</h2><p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted">Alimentazione, movimento, pelle ed emozioni. Quattro percorsi per riconoscere le proprie esigenze e parlarne con chi può aiutare.</p><div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{wellbeingTopics.filter((topic) => !topic.group).map((topic) => <Link key={topic.slug} href={`${base}/${topic.slug}`} className="site-card group flex flex-col overflow-hidden"><Image src={topic.image} alt="" width={800} height={500} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" className="aspect-[8/5] w-full object-cover" /><div className="site-card-body flex flex-1 flex-col"><h3 className="font-serif text-2xl text-wine group-hover:underline">{topic.title}</h3><p className="mb-6 mt-4 text-sm leading-relaxed text-muted">{topic.description}</p><span className="site-card-action mt-auto">Approfondisci →</span></div></Link>)}</div></div></section>
    <nav aria-label="Risorse trasversali" className={`${container} flex flex-wrap gap-8 py-12 text-lg font-bold text-wine`}><Link className="underline underline-offset-4" href="/prevenzione/guide-e-approfondimenti">Guide e approfondimenti →</Link><Link className="underline underline-offset-4" href="/prevenzione/faq">Domande frequenti →</Link></nav>
  </main>;
}
