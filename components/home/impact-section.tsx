import { Eyebrow } from "./eyebrow";
import { ImpactCounter } from "./impact-counter";
import { container, heading, section } from "./styles";

const stats = [
  { icon: "book", label: "Pubblicazioni", value: 700 },
  { icon: "search", label: "Progetti approvati", value: 200 },
  { icon: "calendar", label: "Eventi presenziati", value: 50 },
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
        <div className="mt-20 grid divide-y divide-line border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0 max-sm:mt-14">
          {stats.map((stat) => (
            <ImpactCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
