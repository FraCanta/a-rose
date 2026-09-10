"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

type MobilePartnersMarqueeProps = {
  partners: Array<{ name: string; image: string }>;
};

export function MobilePartnersMarquee({ partners }: MobilePartnersMarqueeProps) {
  const reducedMotion = useReducedMotion();
  const [viewportRef, carousel] = useEmblaCarousel(
    { align: "start", dragFree: true, loop: true },
    [
      AutoScroll({
        active: reducedMotion === false,
        playOnInit: false,
        speed: 0.75,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  useEffect(() => {
    const autoScroll = carousel?.plugins().autoScroll;
    if (reducedMotion !== false) {
      autoScroll?.stop();
      return;
    }
    autoScroll?.play();
    return () => {
      autoScroll?.stop();
    };
  }, [carousel, reducedMotion]);

  return (
    <div aria-label="Partner A-ROSE" role="region">
    <div
      className="cursor-grab overflow-hidden active:cursor-grabbing"
      ref={viewportRef}
      tabIndex={0}
      aria-label="Loghi delle collaborazioni. Usa le frecce destra e sinistra per scorrere."
      onFocus={() => carousel?.plugins().autoScroll?.stop()}
      onBlur={() => {
        if (reducedMotion === false) carousel?.plugins().autoScroll?.play();
      }}
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        carousel?.plugins().autoScroll?.stop();
        if (event.key === "ArrowLeft") carousel?.scrollPrev();
        else carousel?.scrollNext();
      }}
    >
      <div className="flex touch-pan-y">
        {partners.map((partner) => (
          <div className="min-w-0 flex-[0_0_80%] px-3 sm:flex-[0_0_48%] lg:flex-[0_0_32%] xl:flex-[0_0_26%]" key={partner.name}>
            <div className="flex h-48 items-center justify-center border border-line bg-white p-5 sm:h-56 lg:h-64 lg:p-7">
              <Image
                className="h-full w-full object-contain opacity-70 grayscale"
                src={partner.image}
                alt={partner.name}
                width={480}
                height={240}
                sizes="(max-width: 639px) 80vw, (max-width: 1023px) 48vw, (max-width: 1279px) 32vw, 26vw"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
