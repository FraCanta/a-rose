import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { container, heading, section } from "@/components/home/styles";
import type { InstitutionalPageData } from "@/lib/institutional-pages";

type PageFamily = "about" | "research" | "prevention" | "participation" | "support";

function getPageFamily(path: string): PageFamily {
  if (path.startsWith("/la-ricerca")) return "research";
  if (path.startsWith("/prevenzione")) return "prevention";
  if (path.startsWith("/partecipa")) return "participation";
  if (path.startsWith("/come-sostenerci")) return "support";
  return "about";
}

export function InstitutionalPage({ page }: { page: InstitutionalPageData }) {
  const isMacroArea = page.parent.href === "/" && page.parent.label === "Home";
  const family = getPageFamily(page.path);

  return (
    <main id="contenuto">
      <header className={`relative overflow-hidden border-b border-line py-14 sm:py-20 lg:py-24 ${family === "prevention" ? "bg-wine text-white" : "bg-paper"}`}>
        <div aria-hidden="true" className="absolute -right-20 -top-20 size-72 rounded-full border-[58px] border-rose/10 sm:size-96 sm:border-[78px]" />
        <div className={`${container} relative`}>
          {!isMacroArea ? (
            <nav aria-label="Breadcrumb" className={`mb-10 flex flex-wrap items-center gap-2 text-xs ${family === "prevention" ? "text-white/70" : "text-muted"}`}>
              <Link className="transition hover:text-rose" href="/">Home</Link><span aria-hidden="true">/</span>
              <Link className="transition hover:text-rose" href={page.parent.href}>{page.parent.label}</Link><span aria-hidden="true">/</span>
              <span aria-current="page" className={family === "prevention" ? "text-white" : "text-ink"}>{page.title} {page.accent}</span>
            </nav>
          ) : null}
          <Eyebrow light={family === "prevention"}>{page.eyebrow}</Eyebrow>
          <h1 className={`mt-6 max-w-5xl font-serif text-[clamp(44px,6.2vw,84px)] font-normal leading-[0.96] tracking-[-0.045em] ${family === "prevention" ? "text-white" : "text-ink"}`}>
            {page.title} <em className={`font-normal ${family === "prevention" ? "text-[#efabb6]" : "text-rose"}`}>{page.accent}</em>
          </h1>
          <p className={`mt-7 max-w-3xl text-base leading-[1.85] sm:text-lg ${family === "prevention" ? "text-white/75" : "text-muted"}`}>{page.intro}</p>
        </div>
      </header>

      <InstitutionalBody family={family} page={page} />

      <section className="bg-wine py-16 text-white sm:py-20">
        <div className={`${container} flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center`}>
          <div><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#efabb6]">Prossimo passo</p><h2 className="mt-3 max-w-3xl font-serif text-3xl font-normal leading-tight sm:text-4xl">{page.cta.text}</h2></div>
          <Link className="inline-flex min-h-13 shrink-0 items-center gap-3 rounded-full bg-white px-7 font-bold text-wine transition hover:-translate-y-0.5 hover:text-wine-deep" href={page.cta.href}>{page.cta.label} <Icon className="size-4" name="arrow" /></Link>
        </div>
      </section>
    </main>
  );
}

function InstitutionalBody({ family, page }: { family: PageFamily; page: InstitutionalPageData }) {
  if (family === "research") return <ResearchBody page={page} />;
  if (family === "prevention") return <PreventionBody page={page} />;
  if (family === "participation") return <ParticipationBody page={page} />;
  if (family === "support") return <SupportBody page={page} />;
  return <AboutBody page={page} />;
}

function AboutBody({ page }: { page: InstitutionalPageData }) {
  return (
    <section className={`${section} bg-white`}>
      <div className={`${container} grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24`}>
        <div className="lg:sticky lg:top-28 lg:self-start"><Eyebrow>Il nostro percorso</Eyebrow><h2 className={heading}>Un’identità costruita <em className="font-normal text-rose">nel tempo.</em></h2><p className="mt-7 text-base leading-[1.9] text-muted">{page.description}</p></div>
        <ol className="border-t border-line">
          {page.points.map((point, index) => (
            <li className="grid gap-5 border-b border-line py-8 sm:grid-cols-[72px_1fr] sm:py-10" key={point.title}>
              <span className="font-serif text-4xl text-rose/70">{String(index + 1).padStart(2, "0")}</span>
              <div><h3 className="font-serif text-3xl font-normal text-ink">{point.title}</h3><p className="mt-3 max-w-2xl text-base leading-[1.8] text-muted">{point.text}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ResearchBody({ page }: { page: InstitutionalPageData }) {
  return (
    <>
      <section className={`${section} bg-white`}>
        <div className={container}>
          <div className="grid gap-8 border-b border-line pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><Eyebrow>Metodo e prospettiva</Eyebrow><h2 className={heading}>Dalle domande alle <em className="font-normal text-rose">nuove possibilità.</em></h2></div><p className="max-w-3xl text-base leading-[1.9] text-muted sm:text-lg">{page.description}</p></div>
          <ol className="mt-12 grid gap-5 lg:grid-cols-3">
            {page.points.map((point, index) => (
              <li className="relative min-h-72 overflow-hidden border border-line bg-paper p-7 sm:p-9" key={point.title}>
                <span aria-hidden="true" className="absolute -right-3 -top-8 font-serif text-9xl text-wine/[0.06]">{index + 1}</span>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose">Fase {String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-14 font-serif text-3xl font-normal leading-tight text-ink">{point.title}</h3><p className="mt-4 text-sm leading-[1.8] text-muted">{point.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="bg-ivory py-14 sm:py-16"><div className={`${container} grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10`}><span className="grid size-16 place-items-center rounded-full bg-rose-soft font-serif text-3xl text-wine" aria-hidden="true">i</span><div><h2 className="font-serif text-2xl font-normal text-ink">Ricerca significa verifica, confronto e tempo.</h2><p className="mt-2 max-w-4xl text-sm leading-[1.8] text-muted">I contenuti descrivono finalità e percorsi scientifici in modo divulgativo; non anticipano risultati né sostituiscono le fonti originali.</p></div></div></section>
    </>
  );
}

function PreventionBody({ page }: { page: InstitutionalPageData }) {
  return (
    <>
      <section className={`${section} bg-ivory`}>
        <div className={`${container} grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20`}>
          <div><Eyebrow>Orientarsi</Eyebrow><h2 className={heading}>Informazioni da leggere con <em className="font-normal text-rose">consapevolezza.</em></h2><p className="mt-7 max-w-xl text-base leading-[1.9] text-muted">{page.description}</p></div>
          <ul className="grid gap-4">
            {page.points.map((point, index) => (
              <li className="grid grid-cols-[48px_1fr] gap-5 rounded-2xl border border-line bg-white p-6 shadow-soft sm:grid-cols-[60px_1fr] sm:p-8" key={point.title}>
                <span className="grid size-12 place-items-center rounded-full bg-rose-soft text-sm font-bold text-wine sm:size-14" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div><h3 className="font-serif text-2xl font-normal text-ink">{point.title}</h3><p className="mt-3 text-sm leading-[1.8] text-muted">{point.text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <aside className="border-y border-line bg-white py-10" aria-label="Nota informativa sanitaria"><div className={`${container} flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-8`}><p className="shrink-0 text-[10px] font-extrabold uppercase tracking-[0.18em] text-wine">Nota importante</p><p className="max-w-4xl text-sm leading-[1.8] text-muted">Questi contenuti hanno finalità informative generali e non sostituiscono il medico, una diagnosi o le indicazioni dei programmi sanitari ufficiali.</p></div></aside>
    </>
  );
}

function ParticipationBody({ page }: { page: InstitutionalPageData }) {
  return (
    <section className={`${section} bg-white`}>
      <div className={container}>
        <div className="max-w-3xl"><Eyebrow>Prendi parte</Eyebrow><h2 className={heading}>C’è più di un modo per <em className="font-normal text-rose">esserci.</em></h2><p className="mt-7 text-base leading-[1.9] text-muted">{page.description}</p></div>
        <div className="mt-14 grid gap-5 md:grid-cols-12">
          {page.points.map((point, index) => (
            <article className={`flex min-h-64 flex-col justify-between rounded-[2rem] p-7 sm:p-9 ${index === 0 ? "bg-wine text-white md:col-span-7" : index === 1 ? "bg-rose-soft text-ink md:col-span-5" : "border border-line bg-paper text-ink md:col-span-12 md:min-h-48"}`} key={point.title}>
              <span className={`text-[10px] font-extrabold uppercase tracking-[0.18em] ${index === 0 ? "text-[#efabb6]" : "text-wine"}`}>Possibilità {String(index + 1).padStart(2, "0")}</span>
              <div><h3 className="font-serif text-3xl font-normal">{point.title}</h3><p className={`mt-3 max-w-2xl text-sm leading-[1.8] ${index === 0 ? "text-white/75" : "text-muted"}`}>{point.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportBody({ page }: { page: InstitutionalPageData }) {
  return (
    <section className={`${section} bg-paper`}>
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"><div><Eyebrow>Un contributo concreto</Eyebrow><h2 className={heading}>Dal gesto individuale a un <em className="font-normal text-rose">impatto condiviso.</em></h2></div><p className="max-w-3xl text-base leading-[1.9] text-muted sm:text-lg">{page.description}</p></div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-3">
          {page.points.map((point, index) => (
            <article className="bg-white p-7 sm:p-9" key={point.title}>
              <div className="flex items-center justify-between"><span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-wine">Passaggio</span><span className="font-serif text-3xl text-rose/70">{String(index + 1).padStart(2, "0")}</span></div>
              <h3 className="mt-10 font-serif text-3xl font-normal leading-tight text-ink">{point.title}</h3><p className="mt-4 text-sm leading-[1.8] text-muted">{point.text}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-4xl border-l-2 border-rose pl-5 text-sm leading-[1.8] text-muted">Per importi, documentazione o modalità specifiche è sempre possibile contattare direttamente A-ROSE e ricevere le informazioni appropriate.</p>
      </div>
    </section>
  );
}
