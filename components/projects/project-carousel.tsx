"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/home/icons";
import { textLink } from "@/components/home/styles";

type ProjectCarouselItem = {
  slug: string;
  title: string;
  excerpt: string;
  kind: string;
  image: string | null;
  imageAlt: string;
};

type ProjectCarouselProps = {
  projects: ProjectCarouselItem[];
  label: string;
  showImages?: boolean;
};

export function ProjectCarousel({ projects, label, showImages = false }: ProjectCarouselProps) {
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateControls = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const animationFrame = window.requestAnimationFrame(updateControls);
    emblaApi.on("select", updateControls);
    emblaApi.on("reInit", updateControls);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      emblaApi.off("select", updateControls);
      emblaApi.off("reInit", updateControls);
    };
  }, [emblaApi, updateControls]);

  return (
    <div aria-label={label} className="relative" role="region">
      <div className="overflow-hidden" ref={viewportRef}>
        <div className="flex touch-pan-y gap-5 lg:gap-6">
          {projects.map((project, index) => (
            <article
              className="group flex min-w-0 flex-[0_0_88%] flex-col overflow-hidden border border-line bg-paper transition duration-300 hover:-translate-y-1 hover:border-rose/50 hover:shadow-[0_18px_50px_rgba(73,15,31,0.08)] xs:flex-[0_0_82%] sm:flex-[0_0_calc((100%_-_20px)/2)] lg:flex-[0_0_calc((100%_-_48px)/3)]"
              key={project.slug}
            >
              {showImages && project.image ? (
                <Link
                  className="relative block aspect-[16/9] overflow-hidden bg-rose-soft"
                  href={`/progetti/${project.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    className="object-cover transition duration-500 group-hover:scale-[1.035]"
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 639px) 82vw, (max-width: 1023px) 48vw, 31vw"
                  />
                </Link>
              ) : null}
              <div className="flex min-h-[330px] flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-wine">
                    {project.kind}
                  </p>
                  <span className="text-[10px] font-bold tracking-[0.14em] text-rose">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 line-clamp-4 font-serif text-[clamp(24px,2vw,31px)] font-normal leading-[1.08] tracking-[-0.025em] text-ink">
                  <Link className="transition-colors hover:text-wine" href={`/progetti/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-4 text-sm leading-[1.75] text-muted">
                  {project.excerpt || "Un progetto A-ROSE a sostegno della ricerca oncologica e della comunità."}
                </p>
                <Link className={`${textLink} mt-auto pt-7 text-sm`} href={`/progetti/${project.slug}`}>
                  Approfondisci <Icon className="size-4" name="arrow" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between gap-5 border-t border-line pt-5">
        <p aria-live="polite" className="text-xs font-bold tracking-[0.12em] text-muted">
          {String(selectedIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          <button
            aria-label="Mostra i progetti precedenti"
            className="grid size-11 place-items-center rounded-full border border-line text-wine transition hover:border-wine hover:bg-wine hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
            disabled={!canScrollPrev}
            onClick={() => emblaApi?.scrollPrev()}
            type="button"
          >
            <Icon className="size-4 rotate-180" name="arrow" />
          </button>
          <button
            aria-label="Mostra i progetti successivi"
            className="grid size-11 place-items-center rounded-full border border-line text-wine transition hover:border-wine hover:bg-wine hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
            disabled={!canScrollNext}
            onClick={() => emblaApi?.scrollNext()}
            type="button"
          >
            <Icon className="size-4" name="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
