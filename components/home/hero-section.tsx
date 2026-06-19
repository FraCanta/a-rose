import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "./eyebrow";
import { Icon } from "./icons";
import { button, outlineButton } from "./styles";

export function HeroSection() {
  return (
    <section className="overflow-hidden border-b border-line bg-paper" id="top">
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 sm:py-16 lg:px-12 lg:py-20 2xl:pr-20 2xl:pl-[calc((100vw-1420px)/2+36px)]">
          <Eyebrow>Ricerca, formazione, divulgazione</Eyebrow>
          <h1 className="m-0 max-w-[760px] font-serif text-[clamp(44px,8vw,44px)] xs:text-[clamp(46px,8vw,76px)] font-normal leading-[1.05] tracking-[-0.035em] text-ink">
            Ci si cura meglio,
            <br />
            dove si fa <em className="font-normal text-rose">buona ricerca.</em>
          </h1>
          <p className="my-8 max-w-[650px] text-[clamp(15px,1.5vw,16px)] leading-[1.7] text-muted">
            A-ROSE ODV sostiene la ricerca oncologica traslazionale, la
            formazione e la prevenzione per costruire un futuro in cui ricerca e
            cura siano sempre più vicine.
          </p>
          <div className="flex flex-wrap items-center gap-2 max-sm:flex-col max-sm:items-stretch">
            <Link
              className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-wine bg-wine px-7 py-3 font-bold leading-tight text-white transition hover:-translate-y-0.5 hover:border-wine-deep hover:bg-wine-deep"
              href="#dona"
            >
              Sostieni la ricerca <Icon className="size-[18px]" name="heart" />
            </Link>
            <Link className={outlineButton} href="#ricerca">
              Scopri i progetti <Icon className="size-5" name="arrow" />
            </Link>
          </div>
          <div className="mt-12 flex items-center gap-4 text-[13px] leading-normal text-muted max-sm:mt-9">
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
                href="#trasparenza"
              >
                Scopri come utilizziamo le donazioni{" "}
                <Icon className="size-3.5" name="arrow" />
              </Link>
            </span>
          </div>
        </div>

        <div className="relative min-h-[440px] w-full overflow-hidden sm:min-h-[520px] lg:min-h-[650px]">
          <Image
            className="object-cover object-[56%_center]"
            src="/images/hero-laboratorio.jpg"
            alt="Ricercatrice oncologica al lavoro con un microscopio"
            fill
            priority
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#fffdf9_0%,rgba(255,253,249,0.82)_9%,rgba(255,253,249,0.18)_34%,transparent_55%)] max-md:bg-[linear-gradient(180deg,#fffdf9_0%,rgba(255,253,249,0.35)_18%,transparent_42%)]"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
