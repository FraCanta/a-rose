"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";

type MobilePartnersMarqueeProps = {
  partners: Array<{ name: string; image: string }>;
};

export function MobilePartnersMarquee({ partners }: MobilePartnersMarqueeProps) {
  const reducedMotion = useReducedMotion();
  const [viewportRef] = useEmblaCarousel(
    { align: "start", dragFree: true, loop: true },
    [
      AutoScroll({
        playOnInit: !reducedMotion,
        speed: 0.75,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  return (
    <div aria-label="Partner A-ROSE" className="overflow-hidden lg:hidden" ref={viewportRef} role="region">
      <div className="flex touch-pan-y">
        {partners.map((partner) => (
          <div className="min-w-0 flex-[0_0_72%] px-2 xs:flex-[0_0_58%] sm:flex-[0_0_42%] md:flex-[0_0_34%]" key={partner.name}>
            <div className="flex h-36 items-center justify-center border border-line bg-white p-5 sm:h-40">
              <Image
                className="h-full w-full object-contain opacity-70 grayscale"
                src={partner.image}
                alt={partner.name}
                width={360}
                height={180}
                sizes="(max-width: 374px) 72vw, (max-width: 639px) 58vw, 42vw"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
