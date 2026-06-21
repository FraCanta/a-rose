import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/home/icons";
import { container, textLink } from "@/components/home/styles";
import { ShareActions } from "./share-actions";

type EditorialDetailProps = {
  backHref: string;
  backLabel: string;
  category: string;
  date: string;
  eyebrow: string;
  title: string;
  excerpt?: string;
  image?: string | null;
  imageAlt: string;
  imageVariant?: "wide" | "contained";
  aside?: ReactNode;
  children: ReactNode;
  related?: ReactNode;
};

export function EditorialDetail({
  backHref,
  backLabel,
  category,
  date,
  eyebrow,
  title,
  excerpt,
  image,
  imageAlt,
  imageVariant = "wide",
  aside,
  children,
  related,
}: EditorialDetailProps) {
  return (
    <article>
      <header className="border-b border-line bg-paper py-14 sm:py-20 lg:py-24">
        <div className={container}>
          <Link className={`${textLink} mb-9 text-xs sm:text-sm`} href={backHref}>
            <Icon className="size-4 rotate-180" name="arrow" /> {backLabel}
          </Link>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end xl:gap-20">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose">
                {eyebrow}
              </p>
              <h1 className="mt-5 max-w-[1050px] font-serif text-[clamp(40px,6.2vw,84px)] font-normal leading-[0.98] tracking-[-0.045em] text-ink">
                {title}
              </h1>
              {excerpt ? (
                <p className="mt-7 max-w-[780px] text-base leading-[1.75] text-muted sm:text-xl">
                  {excerpt}
                </p>
              ) : null}
            </div>
            <div className="border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-wine">
                {category}
              </p>
              <time className="mt-2 block font-serif text-lg text-ink" dateTime={date}>
                {new Intl.DateTimeFormat("it-IT", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(date))}
              </time>
              <div className="mt-5">
                <ShareActions title={title} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {image ? (
        <div className={`${container} py-8 sm:py-12`}>
          <div
            className={
              imageVariant === "contained"
                ? "relative mx-auto aspect-[4/3] w-full max-w-[760px] overflow-hidden border border-line bg-ivory sm:aspect-[16/10]"
                : "relative aspect-[16/9] overflow-hidden bg-rose-soft lg:aspect-[2/1]"
            }
          >
            <Image
              className={imageVariant === "contained" ? "object-contain" : "object-cover"}
              src={image}
              alt={imageAlt}
              fill
              sizes={imageVariant === "contained" ? "(max-width: 799px) calc(100vw - 32px), 760px" : "(max-width: 1499px) calc(100vw - 72px), 1420px"}
              priority
            />
          </div>
        </div>
      ) : null}

      <div className={`${container} grid gap-12 py-14 sm:py-20 lg:grid-cols-[220px_minmax(0,820px)] lg:justify-center lg:gap-16`}>
        <aside className="h-fit border-y border-line py-6 lg:sticky lg:top-32">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">
            In questo contenuto
          </p>
          <p className="mt-3 font-serif text-xl leading-snug text-ink">
            Ricerca, persone e impatto sul territorio.
          </p>
          {aside ? <div className="mt-6">{aside}</div> : null}
        </aside>
        <div className="min-w-0">{children}</div>
      </div>

      {related ? (
        <section className="border-t border-line bg-ivory py-16 sm:py-20">
          <div className={container}>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose">
              Continua a leggere
            </p>
            <h2 className="mt-3 font-serif text-[clamp(34px,4vw,54px)] font-normal tracking-[-0.035em] text-ink">
              Dal magazine A-ROSE
            </h2>
            <div className="mt-9">{related}</div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
