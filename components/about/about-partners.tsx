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
      </div>
      <div className="mt-12 sm:mt-16">
        <MobilePartnersMarquee partners={partners} />
      </div>
    </section>
  );
}
