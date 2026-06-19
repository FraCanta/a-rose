import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "./eyebrow";
import { Icon } from "./icons";
import { button, container, heading, section } from "./styles";

export function ResearchSection() {
  return (
    <section className={`${section} bg-white`} id="ricerca">
      <div
        className={`${container} grid items-center gap-28 lg:grid-cols-[1fr_0.86fr] max-lg:gap-16 max-md:grid-cols-1`}
      >
        <div className="relative h-[510px] overflow-hidden border border-line bg-ivory max-md:order-2 max-sm:h-[390px]">
          <Image
            className="object-cover object-center"
            src="/images/A-Rose_PicWebsite_Fiorica.jpg"
            alt="Gruppo di ricercatori che analizza insieme immagini scientifiche"
            fill
            sizes="(max-width: 820px) 100vw, 50vw"
          />
        </div>
        <div>
          <Eyebrow>La ricerca diventa vita</Eyebrow>
          <h2 className={heading}>
            Dal laboratorio alla
            <br />
            <em className="font-normal text-rose">vita delle persone</em>
          </h2>
          <p className="my-8 text-[17px] leading-[1.8] text-muted">
            La ricerca traslazionale è il ponte tra scoperta scientifica e cura:
            parte dal lavoro dei laboratori e punta a trasformare nuove
            conoscenze in strumenti utili per diagnosi, prevenzione e terapie.
          </p>
          <div className="my-9 flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted max-sm:gap-2">
            <span>Scoperta</span>
            <i className="h-px w-6 bg-rose max-sm:w-3" />
            <span>Conoscenza</span>
            <i className="h-px w-6 bg-rose max-sm:w-3" />
            <span>Cura</span>
          </div>
          <Link className={button} href="#contatti">
            Scopri i progetti <Icon className="size-5" name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
