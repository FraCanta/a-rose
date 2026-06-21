import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageGallery } from "@/components/editorial/image-gallery";
import { RelatedGrid } from "@/components/editorial/related-grid";
import { ShareActions } from "@/components/editorial/share-actions";
import { Icon } from "@/components/home/icons";
import { container, textLink } from "@/components/home/styles";
import { WordPressContent } from "@/components/ui/wordpress-content";
import { getEventBySlug, getEvents } from "@/lib/wordpress";

type EventDetailPageProps = { params: Promise<{ slug: string }> };

function formatDate(date: string) {
  return new Intl.DateTimeFormat("it-IT", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(date));
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat("it-IT", { hour: "2-digit", minute: "2-digit" }).format(new Date(date));
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const event = await getEventBySlug((await params).slug);
  return event
    ? { title: `${event.title} | A-ROSE ODV`, description: event.excerpt }
    : { title: "Evento non trovato | A-ROSE ODV" };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const [event, allEvents] = await Promise.all([getEventBySlug(slug), getEvents(7)]);
  if (!event) notFound();

  const gallery = event.gallery.filter((image) => image !== event.image);

  return (
    <main id="contenuto">
      <article>
        <header className="border-b border-line bg-paper py-14 sm:py-20 lg:py-24">
          <div className={container}>
            <Link className={`${textLink} mb-9 text-xs sm:text-sm`} href="/eventi">
              <Icon className="size-4 rotate-180" name="arrow" /> Tutti gli eventi
            </Link>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose">
              {event.isUpcoming ? "Prossimo appuntamento" : "Archivio eventi"}
            </p>
            <h1 className="mt-5 max-w-[1100px] font-serif text-[clamp(42px,6vw,82px)] font-normal leading-[0.98] tracking-[-0.045em] text-ink">
              {event.title}
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6">
              <span className="rounded-full bg-rose-soft px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-wine">{event.category}</span>
              <time className="text-sm text-muted" dateTime={event.date}>{formatDate(event.date)}</time>
              <div className="sm:ml-auto"><ShareActions title={event.title} /></div>
            </div>
          </div>
        </header>

        <section className="bg-white py-14 sm:py-20">
          <div className={`${container} grid items-start gap-10 lg:grid-cols-[minmax(320px,0.82fr)_minmax(0,1.18fr)] lg:gap-20`}>
            <div className="lg:sticky lg:top-32">
              {event.image ? <ImageGallery contain images={[event.image]} title={`Locandina: ${event.title}`} /> : null}
              <aside className="mt-6 border border-line bg-paper p-6 sm:p-7">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-rose">Informazioni</p>
                <dl className="mt-5 grid gap-4 text-sm text-muted">
                  <div><dt className="font-bold text-ink">Data e ora</dt><dd className="mt-1">{formatDate(event.date)}, {formatTime(event.date)}{event.endDate ? ` – ${formatTime(event.endDate)}` : null}</dd></div>
                  {event.venue ? <div><dt className="font-bold text-ink">Luogo</dt><dd className="mt-1">{event.venue}</dd>{event.address ? <dd className="mt-1">{event.address}</dd> : null}</div> : null}
                </dl>
              </aside>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">L’evento</p>
              <h2 className="mt-3 font-serif text-[clamp(34px,4vw,54px)] font-normal tracking-[-0.035em] text-ink">Descrizione e programma</h2>
              <div className="mt-7"><WordPressContent html={event.contentHtml} /></div>
              {gallery.length ? (
                <section className="mt-14 border-t border-line pt-10" aria-labelledby="event-gallery-title">
                  <h2 className="font-serif text-3xl font-normal text-ink" id="event-gallery-title">Immagini dell’evento</h2>
                  <div className="mt-6"><ImageGallery compact images={gallery} title={event.title} /></div>
                </section>
              ) : null}
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-ivory py-16 sm:py-20">
          <div className={container}>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose">Altri appuntamenti</p>
            <h2 className="mt-3 font-serif text-[clamp(34px,4vw,54px)] font-normal text-ink">Continua dal calendario A-ROSE</h2>
            <div className="mt-9">
              <RelatedGrid items={allEvents.filter((item) => item.id !== event.id).slice(0, 3).map((item) => ({ href: `/eventi/${item.slug || item.id}`, category: item.category, title: item.title }))} />
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
