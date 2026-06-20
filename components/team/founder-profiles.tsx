import Image from "next/image";
import { container } from "@/components/home/styles";
import { getPublications } from "@/lib/wordpress";
import { founders } from "./data";
import { ProfileDrawerActions } from "./profile-drawer-actions";

const detailLabels = {
  role: "Ruolo",
  skills: "Competenze",
  goals: "Obiettivi",
  traits: "Caratteristiche",
} as const;

export async function FounderProfiles() {
  const publicationsByFounder = await Promise.all(
    founders.map((founder) => getPublications(founder.publicationsSlug)),
  );

  return (
    <section aria-label="Profili dei fondatori A-ROSE">
      {founders.map((founder, index) => (
        <article
          className={`py-24 lg:py-28 ${index % 2 === 0 ? "bg-white" : "bg-rose-soft/45"}`}
          key={founder.name}
        >
          <div
            className={`${container} grid items-center gap-14 lg:grid-cols-2 lg:gap-24`}
          >
            <div
              className={`relative mx-auto aspect-square w-full max-w-[510px] ${index % 2 === 1 ? "lg:order-2" : ""}`}
            >
              <div className="absolute inset-[7%] rounded-[44%_56%_48%_52%/52%_42%_58%_48%] bg-rose-soft" />
              <div className="absolute inset-0 overflow-hidden rounded-[48%_52%_45%_55%/52%_45%_55%_48%]">
                <Image
                  className="object-cover object-top"
                  src={founder.image}
                  alt={`Ritratto di ${founder.name}`}
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                />
              </div>
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose">
                {founder.eyebrow}
              </p>
              <h2 className="mt-3 font-serif text-[clamp(36px,4vw,56px)] font-normal leading-tight tracking-[-0.035em] text-ink">
                {founder.name}
              </h2>
              <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                {Object.entries(detailLabels).map(([key, label]) => (
                  <div className="border-t border-line pt-4" key={key}>
                    <dt className="font-serif text-xl text-ink">{label}</dt>
                    <dd className="mt-2 text-sm leading-[1.75] text-muted">
                      {founder[key as keyof typeof detailLabels]}
                    </dd>
                  </div>
                ))}
              </dl>
              <ProfileDrawerActions
                curriculumKey={founder.key}
                curriculumUrl={founder.curriculum}
                name={founder.name}
                publicationPageUrl={founder.publications}
                publications={publicationsByFounder[index] ?? []}
              />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
