import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "./eyebrow";
import { Icon } from "./icons";
import { container, lightButton } from "./styles";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-wine py-28 text-center text-white max-sm:py-24">
      <Image
        className="object-cover object-[center_47%] opacity-55"
        src="/images/evento-serale.webp"
        alt=""
        fill
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-wine-deep/80" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <i className="absolute left-[8%] top-[22%] size-[18px] rounded-full bg-white/20" />
        <i className="absolute bottom-[20%] left-[14%] size-[9px] rounded-full bg-white/20" />
        <i className="absolute right-[10%] top-[18%] size-[13px] rounded-full bg-white/20" />
        <i className="absolute bottom-[18%] right-[17%] size-5 rounded-full bg-white/20" />
        <i className="absolute right-[29%] top-[15%] size-[9px] rounded-full bg-white/20" />
      </div>
      <div className={`${container} relative z-10`}>
        <Eyebrow light centered>
          Ogni passo conta
        </Eyebrow>
        <h2 className="mb-9 font-serif text-[clamp(36px,4.3vw,40px)] font-normal leading-[1.05] tracking-[-0.035em]">
          Insieme possiamo avvicinare
          <br className="max-sm:hidden" />
          <em className="font-normal text-[#efabb6]"> la ricerca alla cura.</em>
        </h2>
        <Link className={lightButton} href="/sostieni-la-ricerca">
          Sostieni la ricerca <Icon className="size-[18px]" name="heart" />
        </Link>
      </div>
    </section>
  );
}
