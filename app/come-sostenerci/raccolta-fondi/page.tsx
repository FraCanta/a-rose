import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon, type IconName } from "@/components/home/icons";
import { container, section } from "@/components/home/styles";

export const metadata: Metadata = {
  title: "Organizza una raccolta fondi | A-ROSE ODV",
  description:
    "Come proporre e organizzare una raccolta fondi a sostegno della ricerca oncologica A-ROSE.",
};

const steps: Array<{ title: string; icon: IconName }> = [
  { title: "Scegli l’occasione", icon: "heart" },
  { title: "Crea la tua campagna", icon: "book" },
  { title: "Condividi", icon: "arrow" },
];

const occasions = [
  {
    title: "Compleanno",
    text: "Festeggia con un gesto che sostiene la ricerca.",
    image: "/images/Arose_PicWebsite_Bambina.webp",
    alt: "Bambina sorridente durante un momento di festa",
  },
  {
    title: "Matrimonio",
    text: "Trasforma una ricorrenza importante in un gesto solidale.",
    image: "/images/sostegno-cuore.webp",
    alt: "Cuore rosa tra le mani",
  },
  {
    title: "Evento territoriale",
    text: "Coinvolgi comunità, amici o realtà locali in un’iniziativa condivisa.",
    image: "/images/evento-serale.webp",
    alt: "Evento serale con pubblico",
  },
  {
    title: "In memoria",
    text: "Ricorda una persona cara sostenendo nuove possibilità di cura.",
    image: "/images/prevenzione-dialogo.webp",
    alt: "Dialogo tra professionista e persona assistita",
  },
  {
    title: "Evento sportivo",
    text: "Unisci partecipazione, energia e solidarietà.",
    image: "/images/evento-scientifico.jpg",
    alt: "Incontro pubblico di divulgazione scientifica",
  },
  {
    title: "Raccolta personale",
    text: "Ogni occasione può diventare una piccola campagna a favore di A-ROSE.",
    image: "/images/ricerca-dettaglio.webp",
    alt: "Dettaglio di attività di laboratorio",
  },
] as const;

function toOccasionParam(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

export default function FundraisingPage() {
  return (
    <main id="contenuto">
      <section className="border-b border-line bg-paper py-14 sm:py-16 lg:py-20">
        <div className={container}>
          <nav
            aria-label="Breadcrumb"
            className="mb-9 flex flex-wrap items-center gap-2 text-xs text-muted"
          >
            <Link className="transition hover:text-wine" href="/">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              className="transition hover:text-wine"
              href="/come-sostenerci"
            >
              Sostienici
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink">
              Organizza una raccolta fondi
            </span>
          </nav>

          <div className="grid items-end gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div>
              <Eyebrow>Sostienici</Eyebrow>
              <h1 className="mt-6 max-w-4xl font-serif text-[clamp(46px,6vw,86px)] font-normal leading-[0.95] tracking-[-0.055em] text-ink">
                Organizza una{" "}
                <em className="font-normal text-rose">raccolta fondi.</em>
              </h1>
            </div>
            <div className="relative min-h-[260px] overflow-hidden rounded-[1.8rem] bg-rose-soft sm:min-h-[340px]">
              <Image
                src="/images/evento-serale.webp"
                alt="Evento di comunità a sostegno di A-ROSE"
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-wine/35 via-transparent to-white/10" />
            </div>
          </div>

          <p className="mt-10 border-t border-line pt-8 text-[clamp(24px,3vw,38px)] font-medium leading-tight text-wine">
            Rendi speciale ogni occasione. Crea una raccolta fondi a favore
            della ricerca coinvolgendo amici, famiglia e territorio.
          </p>
        </div>
      </section>

      <section className={`${section} bg-white`}>
        <div
          className={`${container} grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-28`}
        >
          <div className="relative aspect-[1.45] overflow-hidden rounded-[1.7rem] bg-rose-soft">
            <Image
              src="/images/sostegno-cuore.webp"
              alt="Gesto simbolico di sostegno e solidarietà"
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <Eyebrow>Un gesto condiviso</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(36px,4.8vw,62px)] font-normal leading-[1.02] tracking-[-0.045em] text-ink">
              Festeggia con il regalo{" "}
              <em className="font-normal text-rose">più utile.</em>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.85] text-muted">
              Una raccolta fondi deve essere semplice da comprendere, coerente
              con la missione di A-ROSE e concordata prima dell’avvio. Ti
              aiutiamo a definire obiettivo, testi essenziali e modalità
              tracciabili.
            </p>
            <Link
              className="mt-8 inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-wine px-8 font-bold text-white transition hover:bg-wine-deep"
              href="/contatti"
            >
              Proponi l’iniziativa <Icon className="size-4" name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className={`${section} border-y border-line bg-white`}>
        <div className={container}>
          <h2 className="font-serif text-[clamp(34px,4.5vw,58px)] font-normal leading-tight text-ink">
            Creare la tua campagna è semplice e veloce.
          </h2>
          <div className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-3">
            {steps.map((step, index) => (
              <article
                className="flex min-h-72 flex-col items-center bg-paper p-8 text-center sm:p-10"
                key={step.title}
              >
                <span className="self-start text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">
                  0{index + 1}
                </span>
                <span className="mt-6 grid size-24 place-items-center rounded-full border border-rose text-wine">
                  <Icon className="size-9" name={step.icon} />
                </span>
                <h3 className="mt-8 font-serif text-2xl text-ink">
                  {step.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${section} bg-ivory`}>
        <div className={container}>
          <div className="mb-10 max-w-3xl">
            <Eyebrow>Occasioni</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(36px,4.8vw,62px)] font-normal leading-[1.03] tracking-[-0.04em] text-ink">
              Scegli la tua{" "}
              <em className="font-normal text-rose">occasione.</em>
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              Le card sono esempi utili per impostare la comunicazione. Ogni
              iniziativa va poi concordata con A-ROSE prima della pubblicazione.
            </p>
          </div>
          <div className="grid gap-x-7 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map((occasion) => (
              <Link
                className="group block focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-rose"
                href={`/donazione?tipo=raccolta&occasione=${toOccasionParam(occasion.title)}`}
                key={occasion.title}
              >
                <div className="relative aspect-[1.5] overflow-hidden rounded-2xl bg-rose-soft">
                  <Image
                    src={occasion.image}
                    alt={occasion.alt}
                    fill
                    sizes="(min-width: 1024px) 29vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 font-serif text-2xl leading-tight text-wine">
                  {occasion.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {occasion.text}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-wine">
                  Apri il modulo
                  <Icon
                    className="size-4 transition group-hover:translate-x-1"
                    name="arrow"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-wine py-16 text-white sm:py-20">
        <div
          className={`${container} flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center`}
        >
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#efabb6]">
              Prima di iniziare
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl font-normal leading-tight sm:text-4xl">
              Raccontaci cosa vorresti organizzare.
            </h2>
          </div>
          <Link
            className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-white px-8 font-bold text-wine"
            href="/contatti"
          >
            Contatta A-ROSE <Icon className="size-4" name="arrow" />
          </Link>
        </div>
      </section>
    </main>
  );
}
