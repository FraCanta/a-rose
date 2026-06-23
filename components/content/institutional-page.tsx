import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { container, heading, section } from "@/components/home/styles";
import type { InstitutionalPageData } from "@/lib/institutional-pages";

export function InstitutionalPage({ page }: { page: InstitutionalPageData }) {
  const isMacroArea = page.parent.href === "/" && page.parent.label === "Home";

  return (
    <main id="contenuto">
      <header className="border-b border-line bg-paper py-14 sm:py-20 lg:py-24">
        <div className={container}>
          {!isMacroArea ? (
            <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-xs text-muted">
              <Link className="transition hover:text-wine" href="/">Home</Link><span aria-hidden="true">/</span>
              <Link className="transition hover:text-wine" href={page.parent.href}>{page.parent.label}</Link><span aria-hidden="true">/</span>
              <span aria-current="page" className="text-ink">{page.title} {page.accent}</span>
            </nav>
          ) : null}
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-5xl font-serif text-[clamp(44px,6.2vw,84px)] font-normal leading-[0.96] tracking-[-0.045em] text-ink">
            {page.title} <em className="font-normal text-rose">{page.accent}</em>
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-[1.85] text-muted sm:text-lg">{page.intro}</p>
        </div>
      </header>

      <section className={`${section} bg-white`}>
        <div className={`${container} grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24`}>
          <div><Eyebrow>In sintesi</Eyebrow><h2 className={heading}>Una pagina pensata per <em className="font-normal text-rose">orientarti.</em></h2></div>
          <div>
            <p className="max-w-3xl text-base leading-[1.9] text-muted sm:text-lg">{page.description}</p>
            <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
              {page.points.map((point, index) => (
                <article className="flex min-h-56 flex-col bg-paper p-6 sm:p-7" key={point.title}>
                  <span className="text-[10px] font-bold tracking-[0.14em] text-rose">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 font-serif text-2xl font-normal leading-tight text-ink">{point.title}</h3>
                  <p className="mt-4 text-sm leading-[1.75] text-muted">{point.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-wine py-16 text-white sm:py-20">
        <div className={`${container} flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center`}>
          <div><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#efabb6]">Prossimo passo</p><h2 className="mt-3 max-w-3xl font-serif text-3xl font-normal leading-tight sm:text-4xl">{page.cta.text}</h2></div>
          <Link className="inline-flex min-h-13 shrink-0 items-center gap-3 rounded-full bg-white px-7 font-bold text-wine" href={page.cta.href}>{page.cta.label} <Icon className="size-4" name="arrow" /></Link>
        </div>
      </section>
    </main>
  );
}
