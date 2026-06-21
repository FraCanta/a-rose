import Image from "next/image";
import { Eyebrow } from "@/components/home/eyebrow";
import { container } from "@/components/home/styles";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  accent: string;
  text: string;
  image?: string | null;
  imageAlt?: string;
};

export function PageIntro({ eyebrow, title, accent, text, image, imageAlt }: PageIntroProps) {
  return (
    <section className="border-b border-line bg-paper py-16 sm:py-20 lg:py-24">
      <div className={`${container} grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20`}>
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-serif text-[clamp(42px,6vw,78px)] font-normal leading-[0.98] tracking-[-0.045em] text-ink">
            {title}
            <br />
            <em className="font-normal text-rose">{accent}</em>
          </h1>
          <p className="mt-7 max-w-[650px] text-base leading-[1.8] text-muted sm:text-lg">
            {text}
          </p>
        </div>
        {image ? (
          <div className="relative aspect-[4/3] min-w-0 overflow-hidden bg-rose-soft sm:min-h-[420px] lg:aspect-[16/11]">
            <Image
              className="object-cover"
              src={image}
              alt={imageAlt ?? ""}
              fill
              sizes="(max-width: 1023px) calc(100vw - 32px), 55vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-paper/25 via-transparent to-transparent" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
