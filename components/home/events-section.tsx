import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "./eyebrow";
import { Icon } from "./icons";
import { button, container, heading, section } from "./styles";

export function EventsSection() {
  return (
    <section className={`${section} bg-ivory`} id="eventi">
      <div className={`${container} grid items-center gap-28 lg:grid-cols-[1.05fr_0.95fr] max-lg:gap-16 max-md:grid-cols-1`}>
        <div className="grid min-h-[500px] grid-cols-[1.2fr_0.8fr] shadow-soft max-sm:grid-cols-1">
          <div className="relative min-h-[500px] overflow-hidden bg-[linear-gradient(145deg,#d99891,#9d3e55)] max-sm:min-h-[340px]">
            <Image
              className="object-cover object-[53%_center]"
              src="/images/evento-scientifico.jpg"
              alt="Relatrice durante un incontro di divulgazione scientifica"
              fill
              sizes="(max-width: 560px) 100vw, 30vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-wine-deep/5 to-wine-deep/35" />
            <span className="absolute left-6 top-6 z-10 grid w-[68px] bg-paper p-2.5 text-center text-[9px] font-extrabold text-wine">
              <strong className="font-serif text-3xl font-normal leading-none">18</strong> OTT
            </span>
          </div>
          <div className="flex flex-col justify-end bg-wine-deep p-8 text-white max-sm:min-h-[235px]">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#e9a5b2]">
              Prossimo appuntamento
            </span>
            <h3 className="my-3 font-serif text-[29px] font-normal leading-tight">
              Il prossimo evento A-ROSE
            </h3>
            <p className="m-0 text-xs text-white/65">
              Uno spazio predisposto per il prossimo incontro dedicato a scienza, prevenzione e
              futuro.
            </p>
          </div>
        </div>
        <div className="max-md:order-first">
          <Eyebrow>Incontri e comunità</Eyebrow>
          <h2 className={heading}>
            Portiamo la ricerca
            <br />
            <em className="font-normal text-rose">fuori dai laboratori</em>
          </h2>
          <p className="my-8 text-[17px] leading-[1.8] text-muted">
            Organizziamo eventi, incontri e iniziative per diffondere cultura scientifica,
            promuovere la prevenzione e raccogliere fondi a sostegno della ricerca oncologica.
          </p>
          <Link className={button} href="#contatti">
            Scopri gli eventi <Icon className="size-5" name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
