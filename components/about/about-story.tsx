import { Eyebrow } from "@/components/home/eyebrow";
import { container, heading, section } from "@/components/home/styles";

type AboutStoryProps = {
  origins: string;
};

const professionalNames = new Set([
  "Carlotta Giorgi",
  "Paolo Pinton",
  "Gabriele Anania",
  "Francesco Fiorica",
]);

const professionalNamesPattern =
  /(Carlotta Giorgi|Paolo Pinton|Gabriele Anania|Francesco Fiorica)/g;

export function AboutStory({ origins }: AboutStoryProps) {
  const paragraphs = origins.split(/\s+(?=L['’]anima)/);

  return (
    <section className={`${section} bg-ivory`}>
      <div className={`${container} grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28`}>
        <div>
          <Eyebrow>Le nostre origini</Eyebrow>
          <h2 className={heading}>
            Quattro professionisti,
            <br />
            <em className="font-normal text-rose">un impegno comune.</em>
          </h2>
        </div>
        <div className="max-w-[760px] border-l border-rose/45 pl-8 sm:pl-12">
          <p className="max-w-[680px] font-serif text-[clamp(23px,2.2vw,32px)] leading-[1.4] tracking-[-0.02em] text-ink">
            {paragraphs[0]}
          </p>
          {paragraphs[1] ? (
            <p className="mt-7 max-w-[650px] text-[17px] leading-[1.85] text-muted">
              {paragraphs[1]
                .split(professionalNamesPattern)
                .map((part, index) =>
                  professionalNames.has(part) ? (
                    <strong className="font-semibold text-wine" key={`${part}-${index}`}>
                      {part}
                    </strong>
                  ) : (
                    part
                  ),
                )}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
