import Link from "next/link";
import { Eyebrow } from "./eyebrow";
import { Icon } from "./icons";
import { button, container, heading, iconWrap, section } from "./styles";

export function ContactSection() {
  return (
    <section className={`${section} border-t border-line bg-ivory`} id="contatti">
      <div className={`${container} grid items-center gap-28 md:grid-cols-[1fr_0.75fr] max-lg:gap-16 max-md:grid-cols-1`}>
        <div>
          <Eyebrow>Parliamone</Eyebrow>
          <h2 className={heading}>
            Vuoi conoscere o
            <br />
            <em className="font-normal text-rose">sostenere A-ROSE?</em>
          </h2>
          <p className="my-8 max-w-[660px] text-[17px] text-muted">
            Scrivici per ricevere informazioni sui nostri progetti, sulle iniziative in programma,
            sulle modalità di donazione o sulle possibilità di collaborazione.
          </p>
          <Link className={`${button} !inline-flex`} href="/contatti">
            Vedi i contatti <Icon className="size-5" name="arrow" />
          </Link>
        </div>
        <aside className="flex gap-6 border-l-[3px] border-rose bg-paper p-9 max-sm:flex-col max-sm:p-7">
          <span className={`${iconWrap} shrink-0`}>
            <Icon className="size-[22px]" name="shield" />
          </span>
          <div>
            <strong className="font-serif text-[21px] font-normal">
              Una precisazione importante
            </strong>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              A-ROSE non fornisce consulenze mediche, diagnosi o indicazioni terapeutiche
              personalizzate.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
