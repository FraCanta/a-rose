import Image from "next/image";
import Link from "next/link";
import { ImageGallery } from "@/components/editorial/image-gallery";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { container, textLink } from "@/components/home/styles";
import type { OutreachProjectContent } from "./outreach-project-data";

type OutreachProjectDetailProps = {
  content: OutreachProjectContent;
};

export function OutreachProjectDetail({ content }: OutreachProjectDetailProps) {
  return (
    <main id="contenuto">
      <article className="bg-white py-10 sm:py-14 lg:py-20">
        <div className={container}>
          <Link className={`${textLink} text-sm`} href="/progetti">
            <Icon className="size-4 rotate-180" name="arrow" /> Tutti i progetti
          </Link>

          <div className="mt-9 grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.75fr)] lg:gap-16 2xl:gap-24">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-rose-soft lg:sticky lg:top-32">
              <Image
                className="object-cover"
                src={content.image}
                alt={content.imageAlt}
                fill
                priority
                sizes="(max-width: 1023px) calc(100vw - 32px), 54vw"
              />
            </figure>

            <div className="py-1 lg:py-6">
              <Eyebrow>Divulgazione e raccolta fondi</Eyebrow>
              <h1 className="mt-5 font-serif text-[clamp(42px,5.2vw,72px)] font-normal leading-[0.98] tracking-[-0.045em] text-ink">
                {content.title}
              </h1>
              <p className="mt-5 font-serif text-2xl italic leading-tight text-rose sm:text-3xl">
                {content.subtitle}
              </p>

              <div className="mt-8 grid gap-5 text-base leading-[1.82] text-muted">
                {content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>

              <dl className="mt-10 grid gap-3 border-y border-line py-6 text-sm sm:grid-cols-2">
                {content.meta.map((item) => (
                  <div className="grid grid-cols-[100px_1fr] gap-4 sm:col-span-2" key={item.label}>
                    <dt className="font-bold text-ink">{item.label}</dt>
                    <dd className="text-muted">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </article>

      {content.gallery?.length ? (
        <section className="bg-ivory py-14 sm:py-20" aria-labelledby="project-gallery-title">
          <div className={container}>
            <Eyebrow>Galleria</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-normal text-ink" id="project-gallery-title">
              Immagini del progetto
            </h2>
            <div className="mt-9 max-w-5xl">
              <ImageGallery compact images={[content.image, ...content.gallery]} title={content.title} />
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
