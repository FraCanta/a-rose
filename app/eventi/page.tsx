import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import {
  container,
  heading,
  section,
  textLink,
} from "@/components/home/styles";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getEvents } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Eventi | A-ROSE ODV",
  description:
    "Eventi, incontri e iniziative A-ROSE ODV per divulgazione, prevenzione e sostegno alla ricerca oncologica.",
};

function getEventDateParts(date: string) {
  const eventDate = new Date(date);

  return {
    day: new Intl.DateTimeFormat("it-IT", { day: "2-digit" }).format(eventDate),
    month: new Intl.DateTimeFormat("it-IT", { month: "short" })
      .format(eventDate)
      .replace(".", "")
      .toUpperCase(),
    full: new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(eventDate),
  };
}

export default async function EventsPage() {
  const events = await getEvents(12);

  return (
    <main id="contenuto">
      <ScrollReveal>
        <section className={`${section} bg-ivory`}>
          <div className={container}>
            <div className="flex items-end justify-between gap-8 max-sm:flex-col max-sm:items-start">
              <div>
                <Eyebrow>Eventi A-ROSE</Eyebrow>
                <h1 className={heading}>
                  Appuntamenti e iniziative
                  <br />
                  <em className="font-normal text-rose">dal territorio</em>
                </h1>
              </div>
              <Link className={textLink} href="/partecipa">
                Torna a Partecipa <Icon className="size-4" name="arrow" />
              </Link>
            </div>

            {events.length ? (
              <div className="mt-16 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                {events.map((event) => {
                  const date = getEventDateParts(event.date);

                  return (
                    <article
                      className="group flex h-full flex-col overflow-hidden border border-line bg-white transition hover:-translate-y-2 hover:shadow-soft"
                      key={event.id}
                    >
                      <div className="relative h-[250px] overflow-hidden bg-[linear-gradient(145deg,#d99891,#0f5c63)]">
                        {event.image ? (
                          <Image
                            className="object-cover transition duration-500 group-hover:scale-[1.035]"
                            src={event.image}
                            alt={`Immagine dell'evento ${event.title}`}
                            fill
                            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                          />
                        ) : null}
                        <time
                          className="absolute left-5 top-5 z-10 grid w-[72px] bg-paper p-2.5 text-center text-[9px] font-extrabold text-wine shadow-soft"
                          dateTime={event.date}
                        >
                          <strong className="font-serif text-3xl font-normal leading-none">
                            {date.day}
                          </strong>
                          {date.month}
                        </time>
                      </div>
                      <div className="flex flex-1 flex-col p-7 sm:p-8">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-rose-soft px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-wine">
                            {event.category}
                          </span>
                          <time
                            className="text-[11px] font-medium text-muted"
                            dateTime={event.date}
                          >
                            {date.full}
                          </time>
                        </div>
                        <h2 className="mt-4 min-h-[3.1em] font-serif text-[28px] font-normal leading-[1.04] tracking-[-0.025em] text-ink">
                          {event.title}
                        </h2>

                        <Link
                          className={`${textLink} mt-auto pt-6 text-xs`}
                          href={`/partecipa/eventi/${event.slug || event.id}`}
                          aria-label={`Leggi l'evento: ${event.title}`}
                        >
                          Leggi evento <Icon className="size-4" name="arrow" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-14 border border-line bg-white p-8 text-muted">
                Al momento non sono disponibili eventi importabili da WordPress.
              </div>
            )}
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
