import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { container, lightButton } from "@/components/home/styles";

type AboutObjectiveProps = {
  image: string;
  objective: string;
};

export function AboutObjective({ image, objective }: AboutObjectiveProps) {
  return (
    <section className="bg-wine-deep py-24 text-white lg:py-32">
      <div className={`${container} grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24`}>
        <div className="relative min-h-[430px] overflow-hidden lg:min-h-[560px]">
          <Image
            className="object-cover"
            src={image}
            alt="Attività di ricerca nel laboratorio oncologico"
            fill
            sizes="(max-width: 1023px) 100vw, 52vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/45 to-transparent" />
        </div>
        <div>
          <Eyebrow light>Cosa facciamo</Eyebrow>
          <h2 className="font-serif text-[clamp(40px,4.5vw,68px)] font-normal leading-[1.02] tracking-[-0.04em]">
            I nostri
            <br />
            <em className="font-normal text-[#efabb6]">obiettivi.</em>
          </h2>
          <p className="mt-8 text-[17px] leading-[1.85] text-white/72">
            {objective}
          </p>
          <Link className={`${lightButton} mt-8`} href="/la-ricerca/progetti">
            Esplora i progetti <Icon className="size-5" name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
