import Image from "next/image";
import Link from "next/link";
import { getFeaturedEvent } from "@/lib/wordpress";
import { Eyebrow } from "./eyebrow";
import { Icon } from "./icons";
import { container, heading, section } from "./styles";

const fallbackEvent = {
  title: "Incontri, divulgazione e comunità",
  excerpt:
    "Segui le iniziative A-ROSE dedicate a scienza, prevenzione e sostegno alla ricerca oncologica.",
  image: "/images/Arose_PicWebsite_Bambina.jpg",
  href: "https://a-roseodv.org/eventi/",
  isUpcoming: false,
  date: null,
};

export async function EventsSection() {
  const wordpressEvent = await getFeaturedEvent();
  const event = wordpressEvent ?? fallbackEvent;
  const eventDate = event.date ? new Date(event.date) : null;
  const day = eventDate
    ? new Intl.DateTimeFormat("it-IT", { day: "2-digit" }).format(eventDate)
    : "—";
  const month = eventDate
    ? new Intl.DateTimeFormat("it-IT", { month: "short" })
        .format(eventDate)
        .replace(".", "")
        .toUpperCase()
    : "DATA";

  return (
    <section className={`${section} bg-ivory`} id="eventi">
      <div
        className={`${container} grid items-center gap-28 lg:grid-cols-[1.05fr_0.95fr] max-lg:gap-16 max-md:grid-cols-1`}
      >
        <article className="grid min-h-[500px] grid-cols-[1.2fr_0.8fr] shadow-soft max-sm:grid-cols-1">
          <div className="relative min-h-[500px] overflow-hidden bg-[linear-gradient(145deg,#d99891,#9d3e55)] max-sm:min-h-[340px]">
            <Image
              className="object-cover object-center"
              src={event.image ?? fallbackEvent.image}
              alt={`Immagine dell'evento ${event.title}`}
              fill
              sizes="(max-width: 560px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-wine-deep/5 to-wine-deep/35" />
            <time
              className="absolute left-6 top-6 z-10 grid w-[68px] bg-paper p-2.5 text-center text-[9px] font-extrabold text-wine"
              dateTime={event.date ?? undefined}
            >
              <strong className="font-serif text-3xl font-normal leading-none">
                {day}
              </strong>
              {month}
            </time>
          </div>
          <div className="flex flex-col justify-end bg-wine-deep p-8 text-white max-sm:min-h-[235px]">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#e9a5b2]">
              {event.isUpcoming ? "Prossimo appuntamento" : "Dal nostro calendario"}
            </span>
            <h3 className="my-3 font-serif text-[29px] font-normal leading-tight">
              {event.title}
            </h3>
            <p className="m-0 line-clamp-4 text-xs leading-relaxed text-white/70">
              {event.excerpt}
            </p>
            <Link
              className="mt-6 inline-flex w-fit items-center gap-2 border-b border-white/50 pb-1 text-xs font-bold text-white transition hover:border-white"
              href={event.href}
              target="_blank"
              rel="noreferrer"
            >
              Leggi l&apos;evento <Icon className="size-4" name="arrow" />
            </Link>
          </div>
        </article>
        <div className="max-md:order-first">
          <Eyebrow>Incontri e comunità</Eyebrow>
          <h2 className={heading}>
            Portiamo la ricerca
            <br />
            <em className="font-normal text-rose">fuori dai laboratori</em>
          </h2>
          <p className="my-8 text-[17px] leading-[1.8] text-muted">
            Dagli eventi divulgativi ai progetti educativi nelle scuole, fino ai
            temporary store, coinvolgiamo la comunità e raccogliamo fondi a
            sostegno della ricerca.
          </p>
          <Link
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full border border-wine bg-wine px-8 py-3 font-bold leading-tight text-white transition hover:-translate-y-0.5 hover:border-wine-deep hover:bg-wine-deep lg:max-w-max"
            href="https://a-roseodv.org/eventi/"
            target="_blank"
            rel="noreferrer"
          >
            Scopri gli eventi <Icon className="size-5" name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
