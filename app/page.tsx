import Image from "next/image";
import type { SVGProps } from "react";

type IconName =
  | "arrow"
  | "book"
  | "calendar"
  | "heart"
  | "people"
  | "search"
  | "shield";

function Icon({
  name,
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
        <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    people: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

const navigation = [
  ["Chi siamo", "#missione"],
  ["Progetti", "#ricerca"],
  ["Team", "#team"],
  ["Come sostenerci", "#dona"],
  ["Eventi", "#eventi"],
  ["News", "#news"],
  ["Contatti", "#contatti"],
];

const pillars = [
  {
    icon: "search" as const,
    number: "01",
    title: "Ricerca",
    text: "Sosteniamo progetti traslazionali per portare le scoperte dal laboratorio alla pratica clinica.",
  },
  {
    icon: "people" as const,
    number: "02",
    title: "Formazione",
    text: "Promuoviamo competenze specialistiche, confronto e crescita per chi lavora nella ricerca e nella cura.",
  },
  {
    icon: "shield" as const,
    number: "03",
    title: "Prevenzione",
    text: "Diffondiamo conoscenze e buone pratiche per rendere la prevenzione più vicina e consapevole.",
  },
  {
    icon: "book" as const,
    number: "04",
    title: "Divulgazione",
    text: "Traduciamo la complessità scientifica in informazioni chiare, affidabili e accessibili.",
  },
];

const articles = [
  {
    category: "Prevenzione",
    title: "Screening oncologici: quando e perché farli",
    text: "Conoscere tempi, modalità e benefici degli screening aiuta a compiere scelte più consapevoli.",
    image: "/images/prevenzione-dialogo.jpg",
    alt: "Medica che illustra informazioni di prevenzione a una paziente",
  },
  {
    category: "Stili di vita",
    title: "Alimentazione e stile di vita nella prevenzione",
    text: "Le evidenze scientifiche e i comportamenti quotidiani che possono contribuire alla prevenzione.",
    image: "/images/sostegno-cuore.jpg",
    alt: "Mani che custodiscono un piccolo cuore rosa",
  },
  {
    category: "Approfondimento",
    title: "Tumori e prevenzione: cosa possiamo fare ogni giorno",
    text: "Piccole azioni, informazioni affidabili e controlli appropriati: una guida per orientarsi.",
    image: "/images/ricerca-dettaglio.jpg",
    alt: "Ricercatrice al lavoro su campioni di laboratorio",
  },
];

const team = [
  {
    name: "Prof.ssa Carlotta Giorgi",
    qualification: "Professore Ordinario di Patologia Generale",
    role: "Presidente dell’associazione e coordinatrice dei progetti di ricerca.",
    image: "/images/team/carlotta-giorgi.jpg",
  },
  {
    name: "Prof. Paolo Pinton",
    qualification: "Professore Ordinario di Patologia Generale",
    role: "Supervisore scientifico e responsabile della ricerca traslazionale.",
    image: "/images/team/paolo-pinton.jpg",
  },
  {
    name: "Dott. Francesco Fiorica",
    qualification:
      "Radio-Oncologo, Direttore UOC Radioterapia e Medicina Nucleare, Direttore Dipartimento di Oncologia Clinica, Oncologo Nutrizionista",
    role: "Consulente clinico e responsabile del collegamento tra ricerca e pazienti.",
    image: "/images/team/francesco-fiorica.jpg",
  },
  {
    name: "Prof. Gabriele Anania",
    qualification: "Chirurgo Oncologico, Dirigente Medico Chirurgia Generale",
    role: "Consulente clinico e responsabile del collegamento tra ricerca e pazienti.",
    image: "/images/team/gabriele-anania.jpg",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#contenuto">
        Vai al contenuto
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="A-ROSE ODV, homepage">
            <Image
              className="brand-logo"
              src="/brand/logo2_arose_positivo.png"
              alt="A-ROSE ODV"
              width={900}
              height={300}
              priority
              unoptimized
            />
          </a>
          <nav className="desktop-nav" aria-label="Navigazione principale">
            {navigation.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <a className="button button-small button-heart" href="#dona">
            Sostieni la ricerca <Icon name="heart" />
          </a>
          <details className="mobile-menu">
            <summary aria-label="Apri il menu">
              <span />
              <span />
              <span />
            </summary>
            <nav aria-label="Navigazione mobile">
              {navigation.map(([label, href]) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
              <a className="button button-heart" href="#dona">
                Sostieni la ricerca <Icon name="heart" />
              </a>
            </nav>
          </details>
        </div>
      </header>

      <main id="contenuto">
        <section className="hero w-full" id="top">
          <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
            <div className="hero-copy-content flex flex-col justify-center px-6 py-14 sm:px-10 sm:py-16 lg:px-12 lg:py-20 2xl:pr-20 2xl:pl-[calc((100vw-1420px)/2+36px)]">
              <p className="eyebrow">
                <span /> Ricerca, formazione, divulgazione
              </p>
              <h1>
                Ci si cura meglio,
                <br />
                dove si fa <em>buona ricerca.</em>
              </h1>
              <p className="hero-lead">
                A-ROSE ODV sostiene la ricerca oncologica traslazionale, la
                formazione e la prevenzione per costruire un futuro in cui
                ricerca e cura siano sempre più vicine.
              </p>
              <div className="button-row">
                <a className="button button-heart" href="#dona">
                  Sostieni la ricerca <Icon name="heart" />
                </a>
                <a className="text-link" href="#ricerca">
                  Scopri i progetti <Icon name="arrow" />
                </a>
              </div>
              <div className="trust-note">
                <span className="trust-icon">
                  <Icon name="shield" />
                </span>
                <span>
                  <strong>Trasparenza, impegno e risultati concreti.</strong>
                  <br />
                  <a href="#trasparenza">
                    Scopri come utilizziamo le donazioni <Icon name="arrow" />
                  </a>
                </span>
              </div>
            </div>
            <div className="relative min-h-[440px] w-full overflow-hidden sm:min-h-[520px] lg:min-h-[650px]">
              <Image
                className="object-cover object-[56%_center]"
                src="/images/hero-laboratorio.jpg"
                alt="Ricercatrice oncologica al lavoro con un microscopio"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
              <div
                className="hero-image-fade pointer-events-none absolute inset-0"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        <section className="mission section" id="missione">
          <div className="container">
            <div className="section-intro split-intro">
              <div>
                <p className="eyebrow">
                  <span /> La nostra missione
                </p>
                <h2>
                  Dalla ricerca alla cura:
                  <br />
                  <em>il nostro impegno nasce qui</em>
                </h2>
              </div>
              <p>
                Crediamo in una ricerca capace di generare nuove possibilità per
                i pazienti. Per questo sosteniamo progetti scientifici, percorsi
                formativi e iniziative di prevenzione e divulgazione, creando un
                ponte tra laboratorio, clinica e comunità.
              </p>
            </div>
            <div className="pillar-grid">
              {pillars.map((item) => (
                <article className="pillar-card" key={item.title}>
                  <div className="pillar-top">
                    <span className="icon-wrap">
                      <Icon name={item.icon} />
                    </span>
                    <span className="card-number">{item.number}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <a
                    href="#contatti"
                    aria-label={`Approfondisci: ${item.title}`}
                  >
                    <Icon name="arrow" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="partners" aria-labelledby="partner-title">
          <div className="container partners-inner">
            <p id="partner-title">In rete con chi crede nella ricerca</p>
            <div className="partner-list" aria-label="Partner di A-ROSE ODV">
              <div className="partner-logo partner-logo-emblem">
                <Image
                  src="/images/partners/comune-copparo-transparent.png"
                  alt="Comune di Copparo"
                  width={250}
                  height={249}
                />
              </div>
              <div className="partner-logo">
                <Image
                  src="/images/partners/comune-ferrara-gray.png"
                  alt="Comune di Ferrara"
                  width={240}
                  height={130}
                />
              </div>
              <div className="partner-logo">
                <Image
                  src="/images/partners/palio-ferrara-gray.png"
                  alt="Il Palio di Ferrara"
                  width={240}
                  height={130}
                />
              </div>
              <div className="partner-logo">
                <Image
                  src="/images/partners/lions-international-gray.png"
                  alt="Lions International"
                  width={240}
                  height={130}
                />
              </div>
              <div className="partner-logo">
                <Image
                  src="/images/partners/grandi-riso-gray.png"
                  alt="Grandi Riso"
                  width={240}
                  height={130}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="research section" id="ricerca">
          <div className="container research-grid">
            <div className="research-art">
              <Image
                className="research-photo-main"
                src="/images/ricerca-team.jpg"
                alt="Gruppo di ricercatori che analizza insieme immagini scientifiche"
                fill
                sizes="(max-width: 820px) 100vw, 50vw"
              />
            </div>
            <div className="research-copy">
              <p className="eyebrow light">
                <span /> La ricerca diventa vita
              </p>
              <h2>
                Dal laboratorio alla
                <br />
                <em>vita delle persone</em>
              </h2>
              <p>
                La ricerca traslazionale è il ponte tra scoperta scientifica e
                cura: parte dal lavoro dei laboratori e punta a trasformare
                nuove conoscenze in strumenti utili per diagnosi, prevenzione e
                terapie.
              </p>
              <div className="research-steps">
                <span>Scoperta</span>
                <i />
                <span>Conoscenza</span>
                <i />
                <span>Cura</span>
              </div>
              <a className="button button-light" href="#contatti">
                Scopri i progetti <Icon name="arrow" />
              </a>
            </div>
          </div>
        </section>

        <section className="donation section" id="dona">
          <div className="container donation-grid">
            <div className="donation-copy">
              <p className="eyebrow">
                <span /> Sostieni il cambiamento
              </p>
              <h2>
                Il tuo contributo
                <br />
                <em>accelera la ricerca</em>
              </h2>
              <p>
                Donare ad A-ROSE significa sostenere progetti scientifici,
                formazione specialistica e attività di prevenzione. Ogni
                contributo aiuta a trasformare la conoscenza in nuove
                possibilità per il futuro della cura.
              </p>
              <ul className="benefit-list">
                <li>
                  <Icon name="search" /> Progetti scientifici concreti
                </li>
                <li>
                  <Icon name="people" /> Formazione specialistica
                </li>
                <li>
                  <Icon name="shield" /> Prevenzione sul territorio
                </li>
              </ul>
            </div>
            <form
              className="donation-form"
              action="#"
              aria-labelledby="donation-title"
            >
              <div className="form-heading">
                <span className="icon-wrap">
                  <Icon name="heart" />
                </span>
                <div>
                  <p>Fai la tua parte</p>
                  <h3 id="donation-title">Scegli il tuo contributo</h3>
                </div>
              </div>
              <fieldset>
                <legend>Importo della donazione</legend>
                <div className="amount-grid">
                  {[25, 50, 100, 250].map((amount) => (
                    <label key={amount}>
                      <input
                        type="radio"
                        name="amount"
                        value={amount}
                        defaultChecked={amount === 50}
                      />
                      <span>{amount}€</span>
                    </label>
                  ))}
                  <label className="custom-amount">
                    <input type="radio" name="amount" value="custom" />
                    <span>Importo libero</span>
                  </label>
                </div>
              </fieldset>
              <button className="button button-heart form-button" type="submit">
                Dona ora <Icon name="heart" />
              </button>
              <a className="form-link" href="#trasparenza">
                Scopri come usiamo le donazioni <Icon name="arrow" />
              </a>
              <p className="form-microcopy">
                <Icon name="shield" /> Le donazioni sono tracciabili e
                rendicontate. Puoi consultare documenti, bilanci e informazioni
                fiscali nella sezione Trasparenza.
              </p>
            </form>
          </div>
        </section>

        <section className="impact section" id="impatto">
          <div className="container">
            <div className="impact-heading">
              <div>
                <p className="eyebrow light">
                  <span /> Il valore della partecipazione
                </p>
                <h2>
                  L’impatto
                  <br />
                  <em>costruito insieme</em>
                </h2>
              </div>
              <p>
                Ogni progetto, incontro e attività nasce da una rete di persone
                che sceglie di credere nel valore della ricerca.
              </p>
            </div>
            <div className="stats-grid">
              <div>
                <strong>+700</strong>
                <span>
                  persone
                  <br />
                  raggiunte
                </span>
              </div>
              <div>
                <strong>+200</strong>
                <span>
                  partecipanti
                  <br />
                  coinvolti
                </span>
              </div>
              <div>
                <strong>+50</strong>
                <span>
                  eventi e<br />
                  iniziative
                </span>
              </div>
              <div>
                <strong>+X</strong>
                <span>
                  progetti
                  <br />
                  sostenuti
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="team section" id="team">
          <div className="container">
            <div className="centered">
              <p className="eyebrow">
                <span /> La nostra squadra
              </p>
              <h2>
                Le persone dietro <em>la ricerca</em>
              </h2>
              <p>
                Ricercatori, professionisti e volontari lavorano ogni giorno per
                trasformare conoscenza scientifica, prevenzione e solidarietà in
                azioni concrete.
              </p>
            </div>
            <div className="team-grid">
              {team.map((member) => (
                <article className="team-card" key={member.name}>
                  <div className="portrait">
                    <Image
                      src={member.image}
                      alt={`Ritratto di ${member.name}`}
                      fill
                      sizes="(max-width: 560px) 100vw, (max-width: 820px) 50vw, 25vw"
                    />
                  </div>
                  <div className="team-card-body">
                    <h3>{member.name}</h3>
                    <p className="team-qualification">{member.qualification}</p>
                    <p className="team-role">{member.role}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="center-action">
              <a className="text-link" href="#contatti">
                Conosci tutta la squadra <Icon name="arrow" />
              </a>
            </div>
          </div>
        </section>

        <section className="events section" id="eventi">
          <div className="container events-grid">
            <div className="event-feature">
              <div className="event-visual">
                <Image
                  src="/images/evento-scientifico.jpg"
                  alt="Relatrice durante un incontro di divulgazione scientifica"
                  fill
                  sizes="(max-width: 560px) 100vw, 30vw"
                />
                <span className="event-date">
                  <strong>18</strong> OTT
                </span>
              </div>
              <div className="event-info">
                <span>Prossimo appuntamento</span>
                <h3>Il prossimo evento A-ROSE</h3>
                <p>
                  Uno spazio predisposto per il prossimo incontro dedicato a
                  scienza, prevenzione e futuro.
                </p>
              </div>
            </div>
            <div className="events-copy">
              <p className="eyebrow">
                <span /> Incontri e comunità
              </p>
              <h2>
                Portiamo la ricerca
                <br />
                <em>fuori dai laboratori</em>
              </h2>
              <p>
                Organizziamo eventi, incontri e iniziative per diffondere
                cultura scientifica, promuovere la prevenzione e raccogliere
                fondi a sostegno della ricerca oncologica.
              </p>
              <a className="button" href="#contatti">
                Scopri gli eventi <Icon name="arrow" />
              </a>
            </div>
          </div>
        </section>

        <section className="news section" id="news">
          <div className="container">
            <div className="news-heading">
              <div>
                <p className="eyebrow">
                  <span /> Prevenzione e conoscenza
                </p>
                <h2>
                  Informare è già
                  <br />
                  <em>una forma di cura</em>
                </h2>
              </div>
              <a className="text-link" href="#contatti">
                Tutti gli approfondimenti <Icon name="arrow" />
              </a>
            </div>
            <div className="article-grid">
              {articles.map((article, index) => (
                <article className="article-card" key={article.title}>
                  <div className="article-visual">
                    <Image
                      src={article.image}
                      alt={article.alt}
                      fill
                      sizes="(max-width: 560px) 100vw, (max-width: 820px) 50vw, 33vw"
                    />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="article-body">
                    <span className="article-category">{article.category}</span>
                    <h3>{article.title}</h3>
                    <p>{article.text}</p>
                    <a
                      href="#contatti"
                      aria-label={`Leggi l'articolo: ${article.title}`}
                    >
                      Leggi l’articolo <Icon name="arrow" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section" id="contatti">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">
                <span /> Parliamone
              </p>
              <h2>
                Vuoi conoscere o<br />
                <em>sostenere A-ROSE?</em>
              </h2>
              <p>
                Scrivici per ricevere informazioni sui nostri progetti, sulle
                iniziative in programma, sulle modalità di donazione o sulle
                possibilità di collaborazione.
              </p>
              <a className="button" href="#footer-contact">
                Vedi i contatti <Icon name="arrow" />
              </a>
            </div>
            <aside className="contact-note">
              <span className="icon-wrap">
                <Icon name="shield" />
              </span>
              <div>
                <strong>Una precisazione importante</strong>
                <p>
                  A-ROSE non fornisce consulenze mediche, diagnosi o indicazioni
                  terapeutiche personalizzate.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="final-cta">
          <Image
            className="final-cta-photo"
            src="/images/evento-serale.jpg"
            alt=""
            fill
            sizes="100vw"
          />
          <div className="final-dots" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="container">
            <p className="eyebrow light">
              <span /> Ogni passo conta
            </p>
            <h2>
              Insieme possiamo avvicinare
              <br />
              <em>la ricerca alla cura.</em>
            </h2>
            <a className="button button-light button-heart" href="#dona">
              Sostieni la ricerca <Icon name="heart" />
            </a>
          </div>
        </section>
      </main>

      <footer className="footer" id="trasparenza">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a
              className="footer-logo"
              href="#top"
              aria-label="A-ROSE ODV, torna all’inizio"
            >
              <Image
                src="/brand/arose_logo_negativo.png"
                alt="A-ROSE ODV"
                width={900}
                height={300}
                unoptimized
              />
            </a>
            <p>
              Ricerca che diventa cura.
              <br />
              Conoscenza che diventa futuro.
            </p>
          </div>
          <div>
            <h2>Esplora</h2>
            <a href="#missione">Chi siamo</a>
            <a href="#ricerca">La ricerca</a>
            <a href="#eventi">Eventi</a>
            <a href="#news">News</a>
          </div>
          <div>
            <h2>Trasparenza</h2>
            <a href="#trasparenza">Bilanci e documenti</a>
            <a href="#trasparenza">5×1000</a>
            <a href="#trasparenza">Privacy</a>
            <a href="#trasparenza">Cookie policy</a>
          </div>
          <div id="footer-contact">
            <h2>Contatti</h2>
            <p>Email istituzionale da inserire</p>
            <p>Ferrara, Italia</p>
            <a className="footer-donate" href="#dona">
              Sostieni A-ROSE <Icon name="arrow" />
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>
            © {new Date().getFullYear()} A-ROSE ODV. Tutti i diritti riservati.
          </p>
          <p>Associazione Ricerca Oncologica Sperimentale Estense</p>
        </div>
      </footer>
    </>
  );
}
