import { Eyebrow } from "@/components/home/eyebrow";
import { Icon, type IconName } from "@/components/home/icons";
import { container, heading, section } from "@/components/home/styles";

type AboutVisionProps = {
  activities: Array<{
    title: string;
    text: string;
  }>;
  vision: string[];
};

const icons: IconName[] = ["search", "people", "book"];

export function AboutVision({ activities, vision }: AboutVisionProps) {
  return (
    <section className={`${section} bg-white`}>
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <Eyebrow>La nostra visione</Eyebrow>
            <h2 className={heading}>
              Conoscenza che crea
              <br />
              <em className="font-normal text-rose">nuove possibilità.</em>
            </h2>
          </div>
          <div className="border-l border-rose/40 pl-8 sm:pl-12">
            {vision.map((paragraph) => (
              <p className="text-lg leading-[1.85] text-muted" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-px bg-line lg:grid-cols-3">
          {activities.map((activity, index) => (
            <article className="flex min-h-[310px] flex-col bg-paper p-9" key={activity.title}>
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-full bg-rose-soft text-wine">
                  <Icon className="size-5" name={icons[index] ?? "search"} />
                </span>
                <span className="font-serif text-sm italic text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-8 font-serif text-3xl font-normal text-ink">
                {activity.title}
              </h3>
              <p className="mt-4 text-sm leading-[1.8] text-muted">
                {activity.text}
              </p>
              <span className="mt-auto h-px w-12 bg-rose" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
