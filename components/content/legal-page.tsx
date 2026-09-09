import type { ReactNode } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { container } from "@/components/home/styles";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

export function LegalPage({
  eyebrow,
  title,
  introduction,
  sections,
}: {
  eyebrow: string;
  title: string;
  introduction?: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <main id="contenuto">
      <header className="border-b border-line bg-ivory px-5 py-16 sm:px-8 lg:py-24">
        <div className={container}>
          <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-2 text-xs text-muted">
            <Link className="transition hover:text-wine" href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink">{title}</span>
          </nav>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 font-serif text-[clamp(46px,7vw,84px)] leading-none tracking-[-0.05em] text-ink">{title}</h1>
        </div>
      </header>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className={`${container} grid gap-14 lg:grid-cols-[240px_minmax(0,820px)] lg:justify-between lg:gap-24`}>
          <aside className="lg:sticky lg:top-32 lg:self-start" aria-label={`Indice ${title}`}>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">In questa pagina</p>
            <nav className="mt-5 border-l border-line">
              {sections.map((section) => (
                <a className="block border-l-2 border-transparent py-2 pl-4 text-sm leading-5 text-muted transition hover:border-rose hover:text-wine" href={`#${section.id}`} key={section.id}>
                  {section.title.replace(/^\d+\.\s*/, "")}
                </a>
              ))}
            </nav>
          </aside>

          <article className="min-w-0 text-[15px] leading-7 text-muted sm:text-base">
            {introduction ? <div className="mb-12 border-l-2 border-rose bg-ivory px-6 py-5 italic sm:px-8">{introduction}</div> : null}
            {sections.map((section, index) => (
              <section className={`${index ? "mt-14 border-t border-line pt-12" : ""} scroll-mt-32 [&_a]:font-semibold [&_a]:text-wine [&_a]:underline [&_a]:underline-offset-4 [&_li]:pl-1 [&_ol]:mt-4 [&_ol]:space-y-2 [&_ol]:pl-6 [&_p+p]:mt-4 [&_strong]:text-ink [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6`} id={section.id} key={section.id}>
                <h2 className="font-serif text-[clamp(27px,3vw,38px)] leading-tight tracking-[-0.025em] text-ink">{section.title}</h2>
                <div className="mt-6">{section.content}</div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}
