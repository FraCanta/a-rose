import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { container, primaryButton, lightButton } from "@/components/home/styles";
import { VolunteerForm } from "@/components/volunteers/volunteer-form";

export const metadata: Metadata = {
  title: "Diventa volontario | A-ROSE ODV",
  description: "Metti a disposizione tempo, competenze ed energia per A-ROSE. Scopri come proporti come volontario e raccontaci la tua disponibilità.",
  alternates: { canonical: "/partecipa/diventa-volontario" },
};

const opportunities = [
  { title: "Eventi e incontri", description: "Supporto organizzativo e accoglienza: scopri le iniziative dell’associazione e proponi la tua disponibilità.", image: "/images/evento-serale.webp", href: "/partecipa/eventi" },
  { title: "Scuole e territorio", description: "Collaborare alla diffusione delle iniziative e avvicinare la cultura scientifica alla comunità.", image: "/images/prevenzione-dialogo.webp", href: "/partecipa/scuole-e-territorio" },
  { title: "Iniziative solidali", description: "Un’occasione per coinvolgere la tua rete e sostenere la ricerca attraverso una raccolta fondi.", image: "/images/sostegno-cuore.webp", href: "/come-sostenerci/raccolta-fondi" },
];

export default function VolunteerPage() {
  return (
    <main id="contenuto">
      <header className="bg-paper py-12 sm:py-16 lg:py-20">
        <div className={container}>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-wine"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/partecipa">Partecipa</Link><span aria-hidden="true">/</span><span aria-current="page">Diventa volontario</span></nav>
              <h1 className="font-serif text-[clamp(44px,5.5vw,76px)] font-normal leading-[1.04] text-wine">Diventa volontario</h1>
            </div>
            <Image src="/images/evento-serale.webp" alt="Un incontro dedicato alla ricerca e alla comunità" width={1200} height={800} sizes="(max-width: 1023px) 100vw, 50vw" preload className="aspect-[3/2] w-full object-cover" />
          </div>
          <div className="mt-10 border-t border-line pt-8 sm:mt-14">
            <p className="max-w-6xl font-serif text-2xl leading-relaxed text-wine sm:text-3xl">Il volontariato inizia da ciò che puoi condividere: il tuo tempo, le tue competenze, la voglia di esserci. Con A-ROSE, questo impegno può diventare un sostegno concreto alla ricerca.</p>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-muted">
              <p>Metti a disposizione tempo, competenze ed energia per sostenere le attività A-ROSE.</p>
              <p>Le esigenze possono cambiare in base a eventi e progetti. Scrivici indicando disponibilità e interessi: valuteremo insieme il contributo più adatto.</p>
              <a href="#candidatura" className={primaryButton}>Proponi la tua disponibilità →</a>
            </div>
          </div>
        </div>
      </header>

      <section className={`${container} grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-20`} aria-labelledby="volunteer-value">
        <Image src="/images/A-ROSE_group.webp" alt="Il gruppo scientifico A-ROSE" width={750} height={750} sizes="(max-width: 1023px) 100vw, 50vw" className="aspect-[4/3] w-full object-cover" />
        <div><p className="text-xs uppercase tracking-widest text-wine">Persone, prima di tutto</p><h2 id="volunteer-value" className="mt-5 font-serif text-4xl font-normal leading-tight text-wine sm:text-5xl">Il tuo tempo.<br />Un valore da condividere.</h2><p className="mt-6 leading-relaxed text-muted">Non serve presentarsi con tutte le risposte. Raccontaci cosa ti interessa e quali competenze vorresti mettere a disposizione: il primo passo è conoscerci.</p><p className="mt-4 leading-relaxed text-muted">Organizzazione, comunicazione, accoglienza o competenze professionali: il contributo va concordato con l’associazione, in base alle attività e alle necessità del momento.</p></div>
      </section>

      <section className={`${container} pb-16`} aria-labelledby="volunteer-initiative">
        <div className="grid bg-wine text-white lg:grid-cols-2">
          <div className="self-center p-7 sm:p-12 lg:p-16"><p className="text-xs uppercase tracking-widest text-white/80">Dalle idee alla partecipazione</p><h2 id="volunteer-initiative" className="mt-6 font-serif text-4xl font-normal leading-tight sm:text-5xl">Un’iniziativa solidale,<br />insieme alla tua comunità.</h2><p className="mt-6 max-w-xl leading-relaxed text-white/85">Hai un’idea per coinvolgere amici, colleghi o un’associazione? Scopri il percorso per organizzare una raccolta fondi e confrontati con A-ROSE.</p><Link href="/come-sostenerci/raccolta-fondi" className={`${lightButton} mt-7 text-center`}>Scopri come partecipare →</Link></div>
          <Image src="/images/sostegno-cuore.webp" alt="Mani che sostengono un cuore rosa" width={1200} height={900} sizes="(max-width: 1023px) 100vw, 50vw" className="h-full min-h-64 w-full object-cover" />
        </div>
        <ol className="mt-10 grid gap-7 sm:grid-cols-3">
          {[
            ["Presentati", "Raccontaci interessi, competenze e disponibilità."],
            ["Confrontiamoci", "Valutiamo insieme le esigenze delle attività associative."],
            ["Definiamo il contributo", "Concordiamo modalità e impegno prima di iniziare."],
          ].map(([title, text], index) => <li key={title} className="border-y border-line py-6"><span aria-hidden="true" className="font-serif text-4xl text-wine">0{index + 1}</span><h3 className="mt-3 font-serif text-2xl font-normal text-wine">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted">{text}</p></li>)}
        </ol>
      </section>

      <section className="bg-ivory py-14 sm:py-20" aria-labelledby="volunteer-contact">
        <div className={`${container} grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-20`}>
          <h2 id="volunteer-contact" className="font-serif text-4xl font-normal text-wine">Informazioni e contatti</h2>
          <div className="space-y-7 leading-relaxed text-muted">
            <p>Per domande sul volontariato scrivi a <a href="mailto:info@a-roseodv.org" className="break-all text-wine underline underline-offset-4">info@a-roseodv.org</a>.</p>
            <div><h3 className="font-serif text-2xl font-normal text-wine">Sei un’azienda?</h3><p className="mt-2">Per proposte che coinvolgono colleghi e collaboratori, consulta le <Link href="/come-sostenerci/aziende-e-partner" className="text-wine underline underline-offset-4">possibilità di collaborazione</Link>.</p></div>
            <div><h3 className="font-serif text-2xl font-normal text-wine">Rappresenti una scuola o un’associazione?</h3><p className="mt-2">Presentaci la tua realtà e l’idea che vorresti condividere. Tempi e modalità saranno da valutare insieme, senza dare per attive iniziative non ancora concordate.</p></div>
          </div>
        </div>
      </section>

      <section className={`${container} py-16 sm:py-20`} aria-labelledby="volunteer-opportunities">
        <h2 id="volunteer-opportunities" className="font-serif text-4xl font-normal text-wine">Da dove puoi iniziare</h2>
        <div className="mt-9 grid gap-7 md:grid-cols-3">{opportunities.map((item) => <Link key={item.href} href={item.href} className="site-card group flex flex-col overflow-hidden"><Image src={item.image} alt="" width={800} height={500} sizes="(max-width: 767px) 100vw, 33vw" className="aspect-[8/5] w-full object-cover" /><div className="site-card-body flex flex-1 flex-col"><h3>{item.title}</h3><p className="mb-5 mt-4 text-sm leading-relaxed text-muted">{item.description}</p><span className="site-card-action mt-auto">Scopri di più →</span></div></Link>)}</div>
      </section>

      <section id="candidatura" className="scroll-mt-28 bg-paper py-16 sm:py-20" aria-labelledby="volunteer-form-title">
        <div className="mx-auto w-[min(680px,calc(100%-32px))]">
          <h2 id="volunteer-form-title" className="font-serif text-4xl font-normal text-wine sm:text-5xl">Vuoi essere dei nostri?</h2>
          <p className="mt-5 leading-relaxed text-muted">Presentati e raccontaci come vorresti contribuire. La richiesta è un primo contatto, non una conferma di inserimento nelle attività.</p>
          <VolunteerForm />
        </div>
      </section>
    </main>
  );
}
