import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { PageIntro } from "@/components/content/page-intro";
import { Eyebrow } from "@/components/home/eyebrow";
import { container, heading, section } from "@/components/home/styles";
import { getSitePage } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Contatti | A-ROSE ODV",
  description: "Contatta A-ROSE ODV per progetti, donazioni, volontariato, collaborazioni e ufficio stampa.",
};

export default async function ContactsPage() {
  const source = await getSitePage("contatti");

  return (
    <main id="contenuto">
      <PageIntro
        eyebrow="Contattaci"
        title="Parliamo di"
        accent="ricerca e futuro."
        text="Hai una domanda, vuoi informazioni specifiche, lasciare un feedback o diventare volontario? Scrivici e ti risponderemo al più presto."
        image={source?.images.find((image) => image.includes("A-ROSE_cotatti")) ?? source?.images[0]}
        imageAlt="Attività e comunità A-ROSE"
      />

      <section className={`${section} bg-white`}>
        <div className={`${container} grid items-start gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24`}>
          <div>
            <Eyebrow>Scrivici</Eyebrow>
            <h2 className={heading}>Siamo qui per <em className="font-normal text-rose">ascoltarti.</em></h2>
            <div className="mt-8 border-t border-line pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-rose">Email</p>
              <Link className="mt-2 block font-serif text-2xl text-ink" href="mailto:info@a-roseodv.org">info@a-roseodv.org</Link>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-rose">Sede</p>
              <p className="mt-2 text-base text-muted">Ferrara, Italia</p>
            </div>
          </div>
          <div className="border border-line bg-paper p-6 shadow-soft sm:p-10">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className={`${section} bg-ivory`}>
        <div className={container}>
          <Eyebrow>Un aiuto per tutti</Eyebrow>
          <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
            {[ ["Donazioni", "Scopri i modi per contribuire alla ricerca oncologica.", "/come-sostenerci"], ["Suggerimenti", "Raccontaci la tua esperienza o proponi nuove iniziative.", "mailto:info@a-roseodv.org"], ["Ufficio stampa", "Scrivici per comunicati, interviste e richieste editoriali.", "mailto:info@a-roseodv.org?subject=Richiesta%20ufficio%20stampa"] ].map(([title, text, href]) => (
              <article className="bg-white p-8 sm:p-10" key={title}>
                <h3 className="font-serif text-3xl font-normal text-ink">{title}</h3>
                <p className="mt-4 text-sm leading-[1.8] text-muted">{text}</p>
                <Link className="mt-6 inline-flex text-xs font-bold text-wine" href={href}>Contattaci →</Link>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-sm leading-[1.8] text-muted">A-ROSE non fornisce consulenze mediche, diagnosi o indicazioni terapeutiche personalizzate.</p>
        </div>
      </section>
    </main>
  );
}
