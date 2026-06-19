import Image from "next/image";
import Link from "next/link";
import { team } from "./data";
import { Eyebrow } from "./eyebrow";
import { Icon } from "./icons";
import { container, heading, section, textLink } from "./styles";

export function TeamSection() {
  return (
    <section className={section} id="team">
      <div className={container}>
        <div className="mx-auto max-w-[760px] text-center">
          <Eyebrow centered>La nostra squadra</Eyebrow>
          <h2 className={heading}>
            Le persone dietro <em className="font-normal text-rose">la ricerca</em>
          </h2>
          <p className="mx-auto mt-6 max-w-[680px] text-muted">
            Ricercatori, professionisti e volontari lavorano ogni giorno per trasformare conoscenza
            scientifica, prevenzione e solidarietà in azioni concrete.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article className="group flex overflow-hidden border border-line bg-paper" key={member.name}>
              <div className="flex w-full flex-col">
                <div className="relative aspect-square overflow-hidden bg-[#eadbd3]">
                  <Image
                    className="object-cover object-[center_18%] transition group-hover:scale-[1.025]"
                    src={member.image}
                    alt={`Ritratto di ${member.name}`}
                    fill
                    sizes="(max-width: 560px) 100vw, (max-width: 820px) 50vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 font-serif text-[22px] font-normal leading-tight">
                    {member.name}
                  </h3>
                  <p className="m-0 text-xs font-semibold leading-relaxed text-ink">
                    {member.qualification}
                  </p>
                  <p className="mt-auto border-t border-rose-soft pt-5 text-[11px] font-bold leading-normal text-rose">
                    {member.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link className={textLink} href="#contatti">
            Conosci tutta la squadra <Icon className="size-4" name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
