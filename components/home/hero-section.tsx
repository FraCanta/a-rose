import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "./eyebrow";
import { Icon } from "./icons";
import { outlineButton } from "./styles";
import { Entrance } from "@/components/ui/entrance";

export function HeroSection() {
  return (
    <section className="overflow-hidden border-b border-line bg-paper">
      <div className="grid w-full grid-cols-1 lg:grid-cols-2">
        <Entrance
          className="flex flex-col justify-center px-4 pb-8 pt-10 sm:px-10 sm:py-12 lg:px-12 lg:py-24 2xl:pr-20 2xl:pl-[max(48px,calc((100vw-1420px)/2))]"
          delay={0.08}
          direction="up"
        >
          <Eyebrow>Ricerca, formazione, divulgazione</Eyebrow>
          <h1 className="m-0 max-w-[760px] font-serif text-[clamp(36px,6vw,60px)] font-normal leading-[1.05] tracking-[-0.035em] text-ink lg:text-[clamp(48px,4.4vw,76px)]">
            Ci si cura meglio,
            <br />
            dove si fa <em className="font-normal text-rose">buona ricerca.</em>
          </h1>
          <p className="my-6 max-w-[650px] text-base leading-[1.7] text-muted sm:my-7">
            A-ROSE ODV sostiene la ricerca oncologica traslazionale, la
            formazione e la prevenzione per costruire un futuro in cui ricerca e
            cura siano sempre più vicine.
          </p>
          <div className="flex flex-wrap items-center gap-2 max-sm:flex-col max-sm:items-stretch">
            <Link
              className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-wine bg-wine px-7 py-3 font-bold leading-tight text-white transition hover:-translate-y-0.5 hover:border-wine-deep hover:bg-wine-deep"
              href="/sostieni-la-ricerca"
            >
              Sostieni la ricerca <Icon className="size-[18px]" name="heart" />
            </Link>
            <Link className={outlineButton} href="/la-ricerca/progetti">
              Scopri i progetti <Icon className="size-5" name="arrow" />
            </Link>
          </div>
          <div className="mt-7 flex items-center gap-3 text-xs leading-relaxed text-muted sm:mt-8">
            <span className="grid size-[42px] shrink-0 place-items-center rounded-full border border-rose-soft text-rose">
              <Icon className="size-5" name="shield" />
            </span>
            <span>
              <strong className="text-ink">
                Trasparenza, impegno e risultati concreti.
              </strong>
              <br />
              <Link
                className="inline-flex items-center gap-2 font-bold text-wine"
                href="/come-sostenerci/come-usiamo-i-fondi"
              >
                Scopri come utilizziamo le donazioni{" "}
                <Icon className="size-3.5" name="arrow" />
              </Link>
            </span>
          </div>
        </Entrance>
        <Entrance
          className="relative h-[280px] w-full overflow-hidden sm:h-[380px] lg:h-auto lg:min-h-[640px]"
          delay={0.04}
          direction="fade"
          scaleFrom={1.025}
        >
          <Image
            className="object-cover object-[56%_center]"
            src="/images/hero_image.webp"
            alt="Ricercatrice oncologica al lavoro con un microscopio"
            fill
            preload
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#fffdf9_0%,rgba(255,253,249,0.82)_9%,rgba(255,253,249,0.18)_34%,transparent_55%)] max-lg:bg-[linear-gradient(180deg,#fffdf9_0%,rgba(255,253,249,0.35)_18%,transparent_42%)]"
            aria-hidden="true"
          />
        </Entrance>
      </div>
    </section>
  );
}
