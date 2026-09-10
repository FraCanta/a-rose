import type { Metadata } from "next";
import { AreaHero } from "@/components/content/area-hero";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon, type IconName } from "@/components/home/icons";
import { container, section } from "@/components/home/styles";

export const metadata: Metadata = {
  title: "Come sostenerci | A-ROSE ODV",
  description:
    "Tutti i modi per sostenere A-ROSE ODV: donazioni, 5x1000, raccolte fondi, aziende e regali solidali.",
};

const mainActions: Array<{
  title: string;
  text: string;
  href: string;
  label: string;
  image: string;
  imageAlt: string;
}> = [
  {
    title: "Fai una donazione",
    text: "Sostieni direttamente progetti di ricerca oncologica, formazione, prevenzione e divulgazione scientifica.",
    href: "/sostieni-la-ricerca#donazione",
    label: "Dona ora",
    image: "/images/sostegno-cuore.webp",
    imageAlt: "Mani che sostengono un cuore rosa",
  },
  {
    title: "Destina il 5×1000",
    text: "Una firma nella dichiarazione dei redditi può trasformarsi in sostegno concreto ad A-ROSE.",
    href: "/come-sostenerci/5x1000",
    label: "Scopri come fare",
    image: "/images/ricerca-dettaglio.webp",
    imageAlt: "Attività di laboratorio con provette e campioni",
  },
  {
    title: "Organizza una raccolta fondi",
    text: "Trasforma un evento, una ricorrenza o un’iniziativa locale in un gesto a favore della ricerca.",
    href: "/come-sostenerci/raccolta-fondi",
    label: "Crea la tua iniziativa",
    image: "/images/evento-serale.webp",
    imageAlt: "Evento serale di divulgazione e raccolta fondi",
  },
] as const;

const supportCards: Array<{
  title: string;
  text: string;
  href: string;
  icon: IconName;
}> = [
  {
    title: "Regala una donazione",
    text: "Dedica un gesto solidale a una persona, a una ricorrenza o a un momento speciale.",
    href: "/come-sostenerci/regala-una-donazione",
    icon: "heart",
  },
  {
    title: "Aziende e partner",
    text: "Costruisci con A-ROSE una collaborazione responsabile, coerente e rendicontabile.",
    href: "/come-sostenerci/aziende-e-partner",
    icon: "shield",
  },
] as const;

const processSteps = [
  {
    title: "Scegli come contribuire",
    text: "Donazione, 5×1000, raccolta fondi o collaborazione: ogni forma di sostegno ha un percorso chiaro.",
    icon: "heart",
  },
  {
    title: "Usa canali tracciabili",
    text: "Le donazioni e le iniziative devono essere documentabili e coerenti con le finalità dell’associazione.",
    icon: "shield",
  },
  {
    title: "Segui l’impatto",
    text: "Rendiconti, bilanci e aggiornamenti aiutano a capire come il sostegno ricevuto viene utilizzato.",
    icon: "book",
  },
] satisfies Array<{ title: string; text: string; icon: IconName }>;

export default function SupportPage() {
  return (
    <main id="contenuto">
      <AreaHero label="Sostienici" title="Sostieni la ricerca." intro="Ogni contributo può sostenere progetti scientifici, formazione specialistica e attività di prevenzione. Scegli il modo più adatto: una donazione, il 5×1000, una raccolta fondi, un regalo solidale o una collaborazione." image="/images/sostegno-cuore.webp" imageAlt="Mani che sostengono un cuore rosa" />
      <div id="percorsi" className="scroll-mt-28" />

      <section className={`${section} bg-ivory`}>
        <div className={container}>
          <div className="mb-12 max-w-3xl">
            <Eyebrow>Come aiutare</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(38px,5vw,66px)] font-normal leading-[1.02] tracking-[-0.045em] text-ink">
              Scegli il modo più adatto{" "}
              <em className="font-normal text-rose">per contribuire.</em>
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {mainActions.map((action) => (
              <Link
                className="site-card group overflow-hidden"
                href={action.href}
                key={action.title}
              >
                <span className="relative block aspect-[1.45] overflow-hidden bg-rose-soft">
                  <Image
                    src={action.image}
                    alt={action.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-wine/35 to-transparent" />
                </span>
                <span className="site-card-body block">
                  <span className="site-card-title block">
                    {action.title}
                  </span>
                  <span className="mt-4 block text-sm leading-7 text-muted">
                    {action.text}
                  </span>
                  <span className="site-card-action mt-5">
                    {action.label}
                    <Icon
                      className="size-4 transition group-hover:translate-x-1"
                      name="arrow"
                    />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${section} border-b border-line bg-white`}>
        <div className={container}>
          <div className="border-y border-line py-12">
            <h2 className="font-serif text-[clamp(34px,4vw,54px)] font-normal leading-tight text-ink">
              Contribuire è semplice, se il percorso è chiaro.
            </h2>
            <div className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-3">
              {processSteps.map((step, index) => (
                <article className="bg-paper p-8 sm:p-10" key={step.title}>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">
                    0{index + 1}
                  </span>
                  <span className="mx-auto mt-8 grid size-24 place-items-center rounded-full border border-rose text-wine">
                    <Icon className="size-9" name={step.icon} />
                  </span>
                  <h3 className="mt-8 text-center font-serif text-2xl text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-center text-sm leading-7 text-muted">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${section} bg-white`}>
        <div className={container}>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <Eyebrow>Altri percorsi</Eyebrow>
              <h2 className="mt-5 font-serif text-[clamp(36px,4.8vw,62px)] font-normal leading-[1.03] tracking-[-0.04em] text-ink">
                Gesti solidali e{" "}
                <em className="font-normal text-rose">collaborazioni.</em>
              </h2>
            </div>
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {supportCards.map((action) => (
                <Link
                  className="site-card site-card-body group grid min-h-60 grid-cols-[auto_1fr] gap-5"
                  href={action.href}
                  key={action.title}
                >
                  <span className="grid size-11 place-items-center rounded-full bg-rose-soft text-wine">
                    <Icon className="size-5" name={action.icon} />
                  </span>
                  <span>
                    <span className="block font-serif text-2xl text-ink">
                      {action.title}
                    </span>
                    <span className="mt-3 block text-sm leading-7 text-muted">
                      {action.text}
                    </span>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-wine">
                      Approfondisci
                      <Icon
                        className="size-4 transition group-hover:translate-x-1"
                        name="arrow"
                      />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-wine py-16 text-white sm:py-20">
        <div
          className={`${container} grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-20`}
        >
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#efabb6]">
              Trasparenza
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl font-normal leading-tight sm:text-4xl">
              Ogni donazione è tracciabile e rendicontata.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
              Consulta rendiconti, bilanci e informazioni fiscali per capire
              come A-ROSE organizza e documenta il sostegno ricevuto.
            </p>
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
