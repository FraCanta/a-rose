import Image from "next/image";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { container } from "@/components/home/styles";

type AboutHeroProps = {
  intro: string;
  image: string;
};

export function AboutHero({ image, intro }: AboutHeroProps) {
  return (
    <section className="overflow-hidden bg-white">
      <div className={`${container} grid min-h-[680px] items-center gap-14 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-24`}>
        <div className="relative z-10 max-w-[680px]">
          <Eyebrow>Chi siamo</Eyebrow>
          <h1 className="font-serif text-[clamp(48px,6vw,86px)] font-normal leading-[0.98] tracking-[-0.045em] text-ink">
            La ricerca nasce
            <br />
            <em className="font-normal text-rose">dalle persone.</em>
          </h1>
          <p className="mt-8 max-w-[590px] text-lg leading-[1.8] text-muted">
            {intro}
          </p>
          <p className="mt-4 max-w-[590px] text-sm font-semibold leading-relaxed text-ink">
            Associazione Ricerca Oncologica Sperimentale Estense
          </p>
          <div className="mt-10 flex max-w-[590px] items-center gap-4 border-t border-line pt-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-rose-soft text-wine">
              <Icon className="size-5" name="calendar" />
            </span>
            <div>
              <p className="font-serif text-xl leading-tight text-ink">
                Scienza, cura e comunità nella stessa direzione.
              </p>
              <p className="mt-1 text-xs font-semibold text-muted">
                A Ferrara dal 2019
              </p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[540px] overflow-hidden bg-rose-soft lg:min-h-[620px]">
          <Image
            className="object-cover"
            src={image}
            alt="Nastro rosa, simbolo della prevenzione oncologica"
            fill
            sizes="(max-width: 1023px) 100vw, 52vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
