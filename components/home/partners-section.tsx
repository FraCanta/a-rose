import Image from "next/image";
import { partners } from "./data";
import { container } from "./styles";

export function PartnersSection() {
  return (
    <section className="border-y border-line bg-paper py-12" aria-labelledby="partner-title">
      <div className={`${container} grid items-center gap-12 md:grid-cols-[250px_1fr] max-md:gap-6`}>
        <p id="partner-title" className="font-serif text-[17px] italic text-muted">
          In rete con chi crede nella ricerca
        </p>
        <div className="grid grid-cols-5 items-center gap-[clamp(24px,3vw,52px)] max-md:grid-cols-3 max-sm:grid-cols-2">
          {partners.map((partner, index) => (
            <div
              className={`flex h-[100px] items-center justify-center max-sm:h-[72px] ${
                index === partners.length - 1
                  ? "max-sm:col-span-2 max-sm:mx-auto max-sm:max-w-[180px]"
                  : ""
              }`}
              key={partner.name}
            >
              <Image
                className={`h-full w-full object-contain grayscale transition-opacity hover:opacity-85 ${
                  index === 0 ? "max-h-24 max-w-24" : "opacity-70"
                }`}
                src={partner.image}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
