import Image from "next/image";
import { Eyebrow } from "@/components/home/eyebrow";
import { container, heading, section } from "@/components/home/styles";
import { collaborators } from "./data";

export function TeamDirectory() {
  return (
    <section className={`${section} bg-ivory`}>
      <div className={container}>
        <div className="max-w-[820px]">
          <Eyebrow>Ricercatori e collaboratori</Eyebrow>
          <h2 className={heading}>
            Giovani ricercatori e volontari
            <br />
            <em className="font-normal text-rose">che collaborano con A-ROSE.</em>
          </h2>
        </div>
        <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {collaborators.map((member) => (
            <article className="group" key={member.name}>
              <div className="relative aspect-square overflow-hidden bg-rose-soft">
                <Image
                  className="object-cover object-top transition duration-700 group-hover:scale-[1.025]"
                  src={member.image}
                  alt={`Ritratto di ${member.name}`}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                />
              </div>
              <div className="border-x border-b border-line bg-paper px-5 py-6">
                <h3 className="font-serif text-xl font-normal leading-tight text-ink">
                  {member.name}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  {member.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
