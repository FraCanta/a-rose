import Image from "next/image";
import { Eyebrow } from "@/components/home/eyebrow";
import { container, heading, section } from "@/components/home/styles";
import { MobilePartnersMarquee } from "./mobile-partners-marquee";

type AboutPartnersProps = {
  partners: Array<{
    name: string;
    image: string;
  }>;
};

export function AboutPartners({ partners }: AboutPartnersProps) {
  return (
    <section className={`${section} border-y border-line bg-ivory`}>
      <div className={container}>
        <div className="mx-auto max-w-[850px] text-center">
          <Eyebrow centered>Collaborazioni</Eyebrow>
          <h2 className={heading}>
            Le nostre partnership con istituzioni,
            <br className="max-md:hidden" /> università e altre organizzazioni
          </h2>
        </div>
        <div className="mt-12 lg:hidden">
          <MobilePartnersMarquee partners={partners} />
        </div>
        <div className="mx-auto mt-16 hidden max-w-[1320px] items-center gap-x-16 gap-y-16 lg:grid lg:grid-cols-3">
          {partners.map((partner) => (
            <div
              className="flex h-32 items-center justify-center sm:h-40 lg:h-44"
              key={partner.name}
            >
              <Image
                className="h-full w-full object-contain opacity-65 grayscale transition hover:opacity-100"
                src={partner.image}
                alt={partner.name}
                width={300}
                height={100}
                sizes="(max-width: 1023px) 50vw, 40vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
