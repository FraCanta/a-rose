import Link from "next/link";
import { pillars } from "./data";
import { Eyebrow } from "./eyebrow";
import { Icon } from "./icons";
import { container, heading, iconWrap, section } from "./styles";

export function MissionSection() {
  return (
    <section className={`${section} bg-ivory`} id="missione">
      <div className={container}>
        <div className="grid items-end gap-24 md:grid-cols-[1.15fr_0.85fr] max-md:gap-9">
          <div>
            <Eyebrow>La nostra missione</Eyebrow>
            <h2 className={heading}>
              Dalla ricerca alla cura:
              <br />
              <em className="font-normal text-rose">
                il nostro impegno nasce qui
              </em>
            </h2>
          </div>
          <p className="m-0 text-lg leading-[1.8] text-muted max-sm:text-base">
            Crediamo in una ricerca capace di generare nuove possibilità per i
            pazienti. Per questo sosteniamo progetti scientifici, percorsi
            formativi e iniziative di prevenzione e divulgazione, creando un
            ponte tra laboratorio, clinica e comunità.
          </p>
        </div>

        <div className="mt-16 grid border border-line bg-paper/70 md:grid-cols-2 lg:grid-cols-4 max-sm:grid-cols-1">
          {pillars.map((item) => (
            <article
              className="flex min-h-[305px] flex-col border-line p-8 lg:border-r lg:last:border-r-0 md:[&:nth-child(odd)]:border-r md:[&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0 max-sm:min-h-0 max-sm:border-b max-sm:last:border-b-0"
              key={item.title}
            >
              <div className="flex items-center justify-between">
                <span className={iconWrap}>
                  <Icon className="size-[22px]" name={item.icon} />
                </span>
                <span className="font-serif text-[13px] italic text-[#9b928b]">
                  {item.number}
                </span>
              </div>
              <h3 className="mb-3 mt-7 font-serif text-[27px] font-normal leading-tight">
                {item.title}
              </h3>
              <p className="m-0 min-h-[78px] text-sm leading-[1.75] text-muted max-lg:min-h-[122px] max-md:min-h-[78px] max-sm:min-h-0">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-wine px-8 py-3 text-center font-bold text-white transition hover:-translate-y-0.5 hover:bg-wine-deep"
            href="/chi-siamo/la-nostra-associazione"
          >
            Scopri la nostra associazione
            <Icon className="size-4" name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
