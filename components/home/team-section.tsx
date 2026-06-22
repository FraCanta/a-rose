import Link from "next/link";
import { team } from "./data";
import { Eyebrow } from "./eyebrow";
import { Icon } from "./icons";
import { container, heading, section, textLink } from "./styles";
import { TeamCard } from "./team-card";

export function TeamSection({
  aboutVariant = false,
  showCta = true,
}: {
  aboutVariant?: boolean;
  showCta?: boolean;
}) {
  return (
    <section className={section} id="team">
      <div className={container}>
        <div className="mx-auto max-w-[760px] text-center">
          <Eyebrow centered>
            {aboutVariant ? "I volti della ricerca" : "La nostra squadra"}
          </Eyebrow>
          <h2 className={heading}>
            {aboutVariant ? (
              <>
                I professionisti che trasformano
                <br />
                <em className="font-normal text-rose">
                  la scienza in speranza
                </em>
              </>
            ) : (
              <>
                Le persone dietro{" "}
                <em className="font-normal text-rose">la ricerca</em>
              </>
            )}
          </h2>
          <p className="mx-auto mt-6 max-w-[680px] text-muted">
            Ricercatori, professionisti e volontari lavorano ogni giorno per
            trasformare conoscenza scientifica, prevenzione e solidarietà in
            azioni concrete.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <TeamCard
              index={index}
              key={member.name}
              member={
                aboutVariant
                  ? {
                      ...member,
                      image: member.hoverImage,
                      hoverImage: member.image,
                    }
                  : member
              }
            />
          ))}
        </div>
        {showCta ? (
          <div className="mt-12 text-center">
            <Link className={textLink} href="/chi-siamo/team-scientifico">
              Scopri tutto il team <Icon className="size-4" name="arrow" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
