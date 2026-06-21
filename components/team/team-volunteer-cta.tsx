import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { button, container } from "@/components/home/styles";

export function TeamVolunteerCta() {
  return (
    <section className="bg-rose-soft py-24 text-center lg:py-28">
      <div className={`${container} mx-auto max-w-[900px]`}>
        <Eyebrow centered>Unisciti al nostro team di volontari</Eyebrow>
        <h2 className="font-serif text-[clamp(38px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.04em] text-ink">
          Dona il tuo tempo e le tue competenze per supportare
          <br className="max-md:hidden" />
          <em className="font-normal text-rose"> la nostra missione.</em>
        </h2>
        <Link className={`${button} mt-9 !inline-flex`} href="/contatti">
          Diventa volontario <Icon className="size-5" name="arrow" />
        </Link>
      </div>
    </section>
  );
}
