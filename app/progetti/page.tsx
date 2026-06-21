import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ImageGallery } from "@/components/editorial/image-gallery";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { container, heading, section } from "@/components/home/styles";
import { ProjectCarousel } from "@/components/projects/project-carousel";
import type { WordPressProject } from "@/lib/wordpress";
import { getProjects, getSitePage } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Progetti di ricerca | A-ROSE ODV",
  description:
    "Ricerca preclinica, ricerca traslazionale e progetti sostenuti da A-ROSE ODV sul territorio ferrarese.",
};

const researchSteps = [
  {
    number: "01",
    eyebrow: "Ricerca preclinica",
    title: "Le basi della ricerca preclinica",
    image: "https://a-roseodv.org/wp-content/uploads/2025/03/Arose_PicWebsite_LiquidoProvetta.jpg",
    imageAlt: "Analisi di un campione durante un’attività di ricerca preclinica",
    paragraphs: [
      "La ricerca preclinica si occupa di biologia cellulare, biologia molecolare, biochimica, immunologia, genetica e patologia ed è alla base di scoperte che, dopo anni di lavoro in laboratorio, potrebbero essere utilizzate in ambito clinico per la cura dei pazienti.",
      "Questo tipo di ricerca ha l’obiettivo di capire la genesi, l’evoluzione e le possibilità terapeutiche per diverse malattie. Affinché la ricerca preclinica non rimanga fine a se stessa, è necessaria una corretta trasposizione — una traslazione — delle scoperte effettuate in ambito clinico, per ottenere cure più efficaci e diagnosi precoci.",
    ],
  },
  {
    number: "02",
    eyebrow: "Ricerca traslazionale",
    title: "Il passaggio alla ricerca traslazionale",
    image: "https://a-roseodv.org/wp-content/uploads/2025/03/Arose_PicWebsite_FioricaPinton.jpg",
    imageAlt: "Francesco Fiorica e Paolo Pinton durante un’attività di ricerca",
    paragraphs: [
      "Il passaggio dalla ricerca preclinica all’applicazione sperimentale sul paziente rappresenta il cuore della ricerca traslazionale.",
      "Tuttavia, ottenere finanziamenti per questo tipo di ricerca è particolarmente difficile, poiché è strettamente legata al contesto locale in cui viene realizzata. A-ROSE ODV nasce proprio per superare questo ostacolo, sostenendo attività di ricerca traslazionale sia sul territorio che per il territorio della città di Ferrara.",
      "Il nostro obiettivo principale è supportare progetti di ricerca traslazionale condotti nel laboratorio di Signal Transduction dell’Università di Ferrara, sotto la direzione del Prof. Pinton e della Prof.ssa Giorgi, collaborando strettamente con le diverse unità operative dell’Azienda Ospedaliera di Ferrara.",
    ],
  },
] as const;

const scientificOrder = [
  "correlazione-tra-obesita-infiammazione-e-sviluppo-tumorale-in-donne-affette-da-carcinoma-dellendometrio",
  "identificazione-di-un-nuovo-fattore-prognostico-nel-tumore-alla-mammella",
  "identificazione-di-un-nuovo-meccanismo-di-resistenza-ai-chemioterapici-nel-tumore-al-colon",
  "analisi-degli-effetti-della-radioterapia-sullo-stato-infiammatorio",
  "ricerca-di-nuove-prospettive-terapeutiche-per-il-mesotelioma-il-tumore-dellamianto",
  "identificazioni-di-nuovi-assi-molecolari-come-target-per-il-tumore-al-polmone-e-il-melanoma",
  "ricerca-di-fattori-di-rischio-per-fenomeni-cardiovascolari-dopo-trattamenti-antitumorali",
] as const;

const outreachOrder = [
  "pasta-della-vita",
  "mostra-su-liana-medici-pagnanelli",
  "ottobre-rosa-2024",
  "batteremo-il-cancro-storia-di-una-ricercatrice-mamma-di-cinque-figli",
  "elementor-28444",
] as const;

function orderProjects(projects: WordPressProject[], order: readonly string[]) {
  return [...projects].sort((first, second) => {
    const firstIndex = order.indexOf(first.slug);
    const secondIndex = order.indexOf(second.slug);
    return (firstIndex < 0 ? order.length : firstIndex) -
      (secondIndex < 0 ? order.length : secondIndex);
  });
}

export default async function ProjectsPage() {
  const [source, projects] = await Promise.all([getSitePage("progetti"), getProjects()]);
  const scientificProjects = orderProjects(
    projects.filter((project) => project.kind === "Ricerca scientifica"),
    scientificOrder,
  );
  const outreachProjects = orderProjects(
    projects.filter((project) => project.kind === "Divulgazione e raccolta fondi"),
    outreachOrder,
  );
  const researchImages =
    source?.images.filter((image) => image.includes("A-ROSE_Ricerca")).slice(0, 6) ?? [];

  return (
    <main id="contenuto">
      <header className="border-b border-line bg-paper py-14 sm:py-16 lg:py-20">
        <div className={`${container} text-center`}>
          <Eyebrow centered>I progetti di ricerca traslazionale</Eyebrow>
          <h1 className="mx-auto mt-6 max-w-[1040px] font-serif text-[clamp(42px,6vw,76px)] font-normal leading-[0.98] tracking-[-0.045em] text-ink">
            Dal laboratorio <em className="font-normal text-rose">alla vita reale.</em>
          </h1>
          <p className="mx-auto mt-7 max-w-[780px] text-base leading-[1.8] text-muted sm:text-lg">
            Sosteniamo la ricerca traslazionale sul territorio di Ferrara, creando connessioni tra
            laboratorio, ospedale e comunità e aprendoci a collaborazioni nazionali e internazionali.
          </p>
        </div>
      </header>

      <section className={`${section} bg-white`}>
        <div className={container}>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <Eyebrow>Il percorso della ricerca</Eyebrow>
              <h2 className={heading}>
                Una scoperta diventa <em className="font-normal text-rose">possibilità.</em>
              </h2>
            </div>
            <p className="max-w-[760px] text-base leading-[1.85] text-muted sm:text-lg">
              La ricerca non procede per compartimenti isolati. Ogni risultato preclinico acquista
              valore quando può essere verificato, condiviso e tradotto in strumenti utili per la
              diagnosi e la cura.
            </p>
          </div>

          <div className="mt-16 border-b border-line">
            {researchSteps.map((step, index) => (
              <article
                className="grid items-center gap-8 border-t border-line py-10 lg:grid-cols-2 lg:gap-20 lg:py-16"
                key={step.number}
              >
                <div className={`relative aspect-[4/3] min-w-0 overflow-hidden bg-rose-soft ${index % 2 ? "lg:order-2" : ""}`}>
                  <Image
                    className="object-cover"
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    sizes="(max-width: 1023px) calc(100vw - 32px), 50vw"
                  />
                </div>
                <div className={index % 2 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold tracking-[0.16em] text-rose">{step.number}</span>
                    <span className="h-px w-10 bg-line" aria-hidden="true" />
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-wine">
                      {step.eyebrow}
                    </p>
                  </div>
                  <h3 className="mt-5 font-serif text-[clamp(32px,3.6vw,52px)] font-normal leading-[1.06] tracking-[-0.035em] text-ink">
                    {step.title}
                  </h3>
                  <div className="mt-7 grid gap-5 text-base leading-[1.85] text-muted">
                    {step.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${section} overflow-hidden bg-wine-deep text-white`}>
        <div className={`${container} grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24`}>
          <div>
            <Eyebrow light>Il nostro metodo</Eyebrow>
            <h2 className="font-serif text-[clamp(38px,5vw,66px)] font-normal leading-[1.02] tracking-[-0.04em]">
              Verso una terapia <em className="font-normal text-[#efabb6]">su misura.</em>
            </h2>
            <div className="mt-8 grid max-w-[680px] gap-5 text-base leading-[1.85] text-white/78">
              <p>
                Come tutte le persone sono differenti tra loro pur avendo un patrimonio genetico
                simile, allo stesso modo anche i diversi tipi di tumore hanno delle diversità.
                Vorremmo caratterizzare le cellule tumorali del singolo paziente, partendo da
                piccole biopsie tissutali, creando una carta d’identità della cellula tumorale,
                specifica e unica per ogni paziente.
              </p>
              <p>
                Questo approccio ci permetterà di testare in vitro in laboratorio l’efficienza dei
                farmaci chemioterapici nell’indurre la morte delle cellule tumorali, individuando il
                miglior approccio terapeutico per ogni singolo paziente, evitando cure non efficaci
                e migliorando la qualità della vita.
              </p>
              <p>
                Questo rappresenterà il trampolino di lancio per una sfida ambiziosa: contribuire
                allo sviluppo di nuovi farmaci antitumorali che ristabilizzino la funzionalità
                mitocondriale, contrastando il meccanismo di resistenza alla morte delle cellule
                tumorali.
              </p>
            </div>
            <ol className="mt-9 grid gap-4 border-t border-white/20 pt-7 text-sm">
              <li className="flex gap-4"><span className="font-bold text-[#efabb6]">01</span>Caratterizzazione delle cellule tumorali</li>
              <li className="flex gap-4"><span className="font-bold text-[#efabb6]">02</span>Studio in vitro della risposta ai farmaci</li>
              <li className="flex gap-4"><span className="font-bold text-[#efabb6]">03</span>Ricerca di approcci terapeutici più mirati</li>
            </ol>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-white/10 lg:translate-x-8">
            <Image
              className="object-cover"
              src="https://a-roseodv.org/wp-content/uploads/2025/03/Arose_PicWebsite_Campioni.jpg"
              alt="Campioni biologici analizzati in laboratorio"
              fill
              sizes="(max-width: 1023px) calc(100vw - 32px), 52vw"
            />
          </div>
        </div>
      </section>

      <section className={`${section} bg-white`}>
        <div className={container}>
          <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:gap-24">
            <div>
              <Eyebrow>Esplora i progetti in corso</Eyebrow>
              <h2 className={heading}>
                Studi e progetti che <em className="font-normal text-rose">cambiano la vita.</em>
              </h2>
            </div>
            <p className="max-w-[760px] text-base leading-[1.85] text-muted sm:text-lg">
              Ogni progetto nasce da una domanda scientifica concreta e dalla collaborazione tra
              ricercatori preclinici e professionisti che operano in ambito oncologico.
            </p>
          </div>
          <div className="mt-12">
            {scientificProjects.length ? (
              <ProjectCarousel
                projects={scientificProjects}
                label="Progetti scientifici in corso: scorri orizzontalmente per esplorarli"
              />
            ) : (
              <p className="border-t border-line py-10 text-muted">
                I progetti sono in aggiornamento. Torna presto per consultarli.
              </p>
            )}
          </div>
        </div>
      </section>

      {outreachProjects.length ? (
        <section className={`${section} bg-ivory`}>
          <div className={container}>
            <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:gap-24">
              <div>
                <Eyebrow>Ricerca e comunità</Eyebrow>
                <h2 className={heading}>
                  Collaborazioni e progetti <em className="font-normal text-rose">di divulgazione.</em>
                </h2>
              </div>
              <p className="max-w-[760px] text-base leading-[1.85] text-muted sm:text-lg">
                Cultura, territorio e solidarietà diventano occasioni concrete per diffondere
                conoscenza e raccogliere risorse a sostegno della ricerca oncologica.
              </p>
            </div>
            <div className="mt-12">
              <ProjectCarousel
                projects={outreachProjects}
                label="Progetti di divulgazione: scorri orizzontalmente per esplorarli"
                showImages
              />
            </div>
          </div>
        </section>
      ) : null}

      {researchImages.length ? (
        <section className={`${section} bg-white`}>
          <div className={container}>
            <Eyebrow>Dentro la ricerca</Eyebrow>
            <h2 className={heading}>
              Luoghi, persone e <em className="font-normal text-rose">lavoro quotidiano.</em>
            </h2>
            <div className="mt-12">
              <ImageGallery compact images={researchImages} title="Momenti dalla ricerca A-ROSE" />
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-wine py-16 text-white sm:py-20">
        <div className={`${container} flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center`}>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#efabb6]">Supporta una scoperta</p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl font-normal leading-tight sm:text-4xl">
              Il tuo contributo accelera il progresso della ricerca.
            </h2>
          </div>
          <Link className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-white px-7 font-bold text-wine" href="/sostieni-la-ricerca#donazione">
            Sostieni la ricerca <Icon className="size-5" name="heart" />
          </Link>
        </div>
      </section>
    </main>
  );
}
