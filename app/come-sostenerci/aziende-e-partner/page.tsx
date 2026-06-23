import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CompanyPartnershipForm } from "@/components/support/company-partnership-form";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon, type IconName } from "@/components/home/icons";
import { container, section, textLink } from "@/components/home/styles";

export const metadata: Metadata = {
  title: "Aziende e partner | A-ROSE ODV",
  description:
    "Scopri come aziende, enti e organizzazioni possono collaborare con A-ROSE ODV per sostenere ricerca, formazione, prevenzione e divulgazione.",
};

const reasons: Array<{
  title: string;
  text: string;
  icon: IconName;
}> = [
  {
    title: "Impatto concreto",
    text: "Il sostegno può contribuire a progetti di ricerca, formazione specialistica e iniziative di prevenzione sul territorio.",
    icon: "shield",
  },
  {
    title: "Valore per la comunità",
    text: "Una collaborazione ben costruita permette di avvicinare cittadini, imprese e istituzioni alla cultura scientifica.",
    icon: "people",
  },
  {
    title: "Trasparenza",
    text: "Le iniziative devono essere tracciabili, coerenti con la missione associativa e comunicabili con chiarezza.",
    icon: "book",
  },
];

const supportWays: Array<{
  title: string;
  text: string;
  image: string;
  imageAlt: string;
}> = [
  {
    title: "Sostegno alla ricerca",
    text: "Una donazione aziendale o una partnership dedicata può contribuire ai progetti scientifici sostenuti dall’associazione.",
    image: "/images/ricerca-dettaglio.webp",
    imageAlt: "Attività di laboratorio con materiali di ricerca",
  },
  {
    title: "Cause related marketing",
    text: "Un prodotto o servizio può diventare parte di una campagna solidale, con modalità chiare e rendicontabili.",
    image: "/images/sostegno-cuore.webp",
    imageAlt: "Cuore rosa tra le mani",
  },
  {
    title: "Eventi e iniziative",
    text: "Aziende ed enti possono sostenere incontri, eventi culturali e momenti di divulgazione scientifica.",
    image: "/images/evento-serale.webp",
    imageAlt: "Evento serale con pubblico",
  },
  {
    title: "Coinvolgimento delle persone",
    text: "Dipendenti, clienti o comunità aziendali possono essere coinvolti in raccolte fondi e iniziative di sensibilizzazione.",
    image: "/images/A-ROSE_group.webp",
    imageAlt: "Team A-ROSE",
  },
  {
    title: "Territorio e scuole",
    text: "Le collaborazioni possono sostenere percorsi informativi vicini alle comunità, alle scuole e agli spazi pubblici.",
    image: "/images/prevenzione-dialogo.webp",
    imageAlt: "Dialogo di prevenzione tra professionista e paziente",
  },
  {
    title: "Strumenti e materiali",
    text: "Alcuni contributi possono aiutare a rendere operative iniziative, campagne informative e attività associative.",
    image: "/images/evento-scientifico.jpg",
    imageAlt: "Incontro scientifico e divulgativo",
  },
];

export default function CompaniesAndPartnersPage() {
  return (
    <main id="contenuto">
      <header className="border-b border-line bg-white py-12 sm:py-16 lg:py-20">
        <div className={container}>
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-xs text-muted"
          >
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/come-sostenerci">Sostienici</Link>
            <span>/</span>
            <span aria-current="page" className="text-ink">
              Aziende e partner
            </span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Eyebrow>Aziende e partner</Eyebrow>
              <h1 className="mt-5 max-w-4xl font-serif text-[clamp(44px,6vw,82px)] font-normal leading-[0.96] tracking-[-0.05em] text-ink">
                Aziende per{" "}
                <em className="font-normal text-rose">la ricerca.</em>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-[1.85] text-muted sm:text-lg">
                Un’impresa, un ente o un’organizzazione possono sostenere
                A-ROSE attraverso progetti condivisi, campagne solidali,
                iniziative territoriali e donazioni tracciabili.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-wine px-8 font-bold text-white transition hover:bg-wine-deep"
                  href="#contatto-aziende"
                >
                  Contattaci <Icon className="size-4" name="arrow" />
                </Link>
                <Link
                  className={`${textLink} min-h-13 items-center border-b-0 px-1`}
                  href="/chi-siamo/partner-e-sostenitori"
                >
                  Vedi partner e sostenitori <Icon className="size-4" name="arrow" />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] bg-rose-soft sm:min-h-[420px]">
              <Image
                className="object-cover"
                src="/images/evento-serale.webp"
                alt="Iniziativa pubblica A-ROSE con partecipanti e sostenitori"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-wine/45 via-wine/10 to-transparent" />
              <div className="absolute bottom-6 left-6 max-w-sm rounded-2xl bg-white/92 p-5 shadow-[0_20px_60px_rgba(87,22,41,0.18)] backdrop-blur">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-wine">
                  Collaborazioni
                </p>
                <p className="mt-2 font-serif text-2xl leading-tight text-ink">
                  Ogni progetto funziona meglio quando obiettivi e responsabilità
                  sono chiari.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className={`${section} bg-white`}>
        <div className={container}>
          <div className="border-t border-line pt-12">
            <Eyebrow>Perché collaborare</Eyebrow>
            <div className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-3">
              {reasons.map((reason) => (
                <article className="bg-paper p-8 sm:p-10" key={reason.title}>
                  <span className="grid size-12 place-items-center rounded-full bg-rose-soft text-wine">
                    <Icon className="size-5" name={reason.icon} />
                  </span>
                  <h2 className="mt-8 font-serif text-3xl font-normal text-ink">
                    {reason.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted">{reason.text}</p>
                </article>
              ))}
            </div>
          </div>

          <blockquote className="mx-auto mt-14 max-w-4xl border-y border-line py-10 text-center">
            <p className="font-serif text-[clamp(28px,4vw,48px)] font-normal leading-tight text-ink">
              “La ricerca non cresce da sola: ha bisogno di alleanze
              responsabili, competenze e fiducia.”
            </p>
          </blockquote>
        </div>
      </section>

      <section className={`${section} bg-ivory`}>
        <div className={container}>
          <div className="mb-12 max-w-3xl">
            <Eyebrow>Modalità di sostegno</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(38px,5vw,66px)] font-normal leading-[1.02] tracking-[-0.045em] text-ink">
              Scegli una collaborazione{" "}
              <em className="font-normal text-rose">coerente e utile.</em>
            </h2>
          </div>

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {supportWays.map((way) => (
              <article
                className="group overflow-hidden border border-line bg-white transition hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(87,22,41,0.1)]"
                key={way.title}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-rose-soft">
                  <Image
                    className="object-cover transition duration-700 group-hover:scale-105"
                    src={way.image}
                    alt={way.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-3xl font-normal leading-tight text-ink">
                    {way.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{way.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${section} bg-white`} id="contatto-aziende">
        <div className={`${container} grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20`}>
          <div>
            <Eyebrow>Costruiamo insieme</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(36px,4.6vw,62px)] font-normal leading-[1.02] tracking-[-0.04em] text-ink">
              Raccontaci la tua{" "}
              <em className="font-normal text-rose">idea di collaborazione.</em>
            </h2>
            <p className="mt-6 text-base leading-[1.85] text-muted">
              Il primo passo è capire obiettivi, contesto e modalità. A-ROSE
              valuterà la coerenza dell’iniziativa con la propria missione e le
              condizioni necessarie per comunicarla correttamente.
            </p>
            <div className="mt-8 border-t border-line pt-6 text-sm leading-7 text-muted">
              <p>
                Se vuoi solo consultare la rete già presente nella pagina
                istituzionale, visita{" "}
                <Link className="font-bold text-wine underline-offset-4 hover:underline" href="/chi-siamo/partner-e-sostenitori">
                  Partner e sostenitori
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="border border-line bg-paper p-6 shadow-soft sm:p-10">
            <CompanyPartnershipForm />
          </div>
        </div>
      </section>

      <section className="bg-wine py-16 text-white sm:py-20">
        <div
          className={`${container} flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center`}
        >
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#efabb6]">
              Trasparenza
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl font-normal leading-tight sm:text-4xl">
              Prima di collaborare, verifica come A-ROSE utilizza e rendiconta i fondi.
            </h2>
          </div>
          <Link
            className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-white px-8 font-bold text-wine"
            href="/come-sostenerci/come-usiamo-i-fondi"
          >
            Come usiamo i fondi <Icon className="size-4" name="arrow" />
          </Link>
        </div>
      </section>
    </main>
  );
}
