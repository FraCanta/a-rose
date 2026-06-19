import { Eyebrow } from "./eyebrow";
import { container, heading, section } from "./styles";

const stats = [
  ["+700", "persone", "raggiunte"],
  ["+200", "partecipanti", "coinvolti"],
  ["+50", "eventi e", "iniziative"],
  ["+X", "progetti", "sostenuti"],
] as const;

export function ImpactSection() {
  return (
    <section className={`${section} border-y border-line bg-white`} id="impatto">
      <div className={container}>
        <div className="grid items-end gap-20 md:grid-cols-[1fr_0.55fr] max-md:gap-6">
          <div>
            <Eyebrow>Il valore della partecipazione</Eyebrow>
            <h2 className={heading}>
              L’impatto
              <br />
              <em className="font-normal text-rose">costruito insieme</em>
            </h2>
          </div>
          <p className="m-0 text-[17px] text-muted">
            Ogni progetto, incontro e attività nasce da una rete di persone che sceglie di credere
            nel valore della ricerca.
          </p>
        </div>
        <div className="mt-20 grid border-t border-line md:grid-cols-4 max-md:grid-cols-2 max-sm:mt-14">
          {stats.map(([value, line1, line2]) => (
            <div
              className="flex items-end gap-4 border-line px-6 pb-1 pt-11 md:border-r md:last:border-r-0 max-md:border-r max-md:[&:nth-child(2n)]:border-r-0 max-md:[&:nth-child(n+3)]:border-t max-sm:grid max-sm:gap-2 max-sm:px-4 max-sm:py-8"
              key={value}
            >
              <strong className="font-serif text-[clamp(47px,5vw,68px)] font-normal leading-none text-wine">
                {value}
              </strong>
              <span className="text-[11px] font-bold uppercase leading-snug text-muted">
                {line1}
                <br />
                {line2}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
