import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { ImpactCounter } from "@/components/home/impact-counter";
import { container, section } from "@/components/home/styles";

export const metadata: Metadata = {
  title: "Partecipa | A-ROSE ODV",
  description:
    "Eventi, volontariato, scuole e iniziative territoriali per partecipare alle attività di A-ROSE ODV.",
};

const participationCards = [
  {
    title: "Eventi e incontri",
    text: "Appuntamenti pubblici, iniziative solidali e momenti di divulgazione scientifica.",
    image: "/images/evento-serale.webp",
    href: "/partecipa/eventi",
  },
  {
    title: "Scuole e territorio",
    text: "Percorsi e collaborazioni per avvicinare la cultura scientifica alla comunità.",
    image: "/images/prevenzione-dialogo.webp",
    href: "/partecipa/scuole-e-territorio",
  },
  {
    title: "Volontariato",
    text: "Tempo, competenze e presenza concreta per sostenere eventi e progetti.",
    image: "/images/Arose_PicWebsite_Bambina.webp",
    href: "/partecipa/volontariato",
  },
  {
    title: "Raccolte fondi",
    text: "Occasioni personali e iniziative condivise che diventano sostegno alla ricerca.",
    image: "/images/sostegno-cuore.webp",
    href: "/come-sostenerci/raccolta-fondi",
  },
] as const;

const stats = [
  { icon: "book", label: "Pubblicazioni", value: 700 },
  { icon: "search", label: "Progetti approvati", value: 200 },
  { icon: "calendar", label: "Eventi presenziati", value: 50 },
] as const;

export default function ParticipationLandingPage() {
  return (
    <main id="contenuto">
      <section className="overflow-hidden bg-wine-deep text-white">
        <div
          className={`${container} grid gap-10 py-14 sm:py-16 lg:grid-cols-[0.9fr_0.46fr] lg:py-20`}
        >
          <div>
            <Eyebrow light>Partecipa</Eyebrow>
            <h1 className="mt-6 max-w-[850px] font-serif text-[clamp(46px,6.6vw,86px)] font-normal leading-[0.96] tracking-[-0.05em]">
              Un nuovo modo per sostenere:
              <br />
              <em className="font-normal text-[#efabb6]">partecipare.</em>
            </h1>
          </div>
          <div className="self-end border-l border-white/20 pl-7 text-sm leading-7 text-white/72 max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-6">
            <p>
              Eventi, volontariato, scuole e territorio: ogni iniziativa è un
              modo concreto per avvicinare la ricerca alla vita delle persone.
            </p>
            <Link
              className="mt-6 inline-flex size-11 items-center justify-center rounded-full bg-white text-wine transition hover:-translate-y-0.5"
              href="#iniziative"
              aria-label="Vai alle iniziative"
            >
              <Icon className="size-5 rotate-90" name="arrow" />
            </Link>
          </div>
        </div>
        <div className={`${container} pb-14 lg:pb-20`}>
          <div className="relative mx-auto aspect-[16/7] max-w-[1120px] overflow-hidden bg-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.22)] max-md:aspect-[4/3]">
            <Image
              className="object-cover"
              src="/images/evento-serale.webp"
              alt="Evento A-ROSE con pubblico e intervento divulgativo"
              fill
              priority
              sizes="(max-width: 768px) calc(100vw - 32px), 1120px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/30 to-transparent" />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white py-14 sm:py-16">
        <div className={container}>
          <p className="mx-auto max-w-[980px] border-l-2 border-rose pl-7 font-serif text-[clamp(28px,3.2vw,45px)] leading-tight tracking-[-0.035em] text-wine">
            Partecipare significa trasformare un incontro, una competenza o una
            rete di relazioni in un gesto concreto a favore della ricerca
            oncologica traslazionale.
          </p>
        </div>
      </section>

      <section className={`${section} border-b border-line bg-white`}>
        <div className={container}>
          <div className="grid divide-y divide-line border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {stats.map((stat) => (
              <ImpactCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <section className={`${section} bg-white`} id="iniziative">
        <div className={container}>
          <div className="flex items-end justify-between gap-8 max-md:flex-col max-md:items-start">
            <div>
              <Eyebrow>Iniziative</Eyebrow>
              <h2 className="mt-5 max-w-[760px] font-serif text-[clamp(38px,5vw,66px)] font-normal leading-[1.02] tracking-[-0.04em] text-ink">
                Scegli come essere
                <br />
                <em className="font-normal text-rose">parte della rete.</em>
              </h2>
            </div>
          </div>

          <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2">
            {participationCards.map((card) => (
              <article className="group" key={card.title}>
                <Link
                  className="block focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-rose"
                  href={card.href}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ivory">
                    <Image
                      className="object-cover transition duration-500 group-hover:scale-[1.035]"
                      src={card.image}
                      alt=""
                      fill
                      sizes="(max-width: 767px) calc(100vw - 32px), 50vw"
                    />
                  </div>
                  <h3 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink transition group-hover:text-wine">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-[620px] text-sm leading-7 text-muted">
                    {card.text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-wine px-5 py-3 text-xs font-bold text-white transition group-hover:bg-wine-deep">
                    Scopri di più <Icon className="size-4" name="arrow" />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
