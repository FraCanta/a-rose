import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow } from "@/components/home/eyebrow";
import { FounderProfiles } from "@/components/team/founder-profiles";
import { TeamDirectory } from "@/components/team/team-directory";
import { TeamVolunteerCta } from "@/components/team/team-volunteer-cta";
import { Entrance } from "@/components/ui/entrance";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "Team | A-ROSE ODV",
  description:
    "Conosci ricercatori, clinici e collaboratori che uniscono scienza, cura e umanità nella missione di A-ROSE ODV.",
};

export default function TeamPage() {
  return (
    <main id="contenuto">
      <section className="overflow-hidden border-b border-line bg-paper">
        <div className="grid min-h-[calc(100svh-96px)] w-full grid-cols-1 lg:grid-cols-2">
          <Entrance
            className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-12 lg:py-20 2xl:pr-20 2xl:pl-[calc((100vw-1420px)/2+10px)]"
            delay={0.08}
            direction="up"
          >
            <Eyebrow>Il team A-ROSE</Eyebrow>
            <h1 className="font-serif text-[clamp(48px,5.5vw,82px)] font-normal leading-[0.98] tracking-[-0.045em] text-ink">
              Le <em className="font-normal text-rose">menti brillanti</em> dietro le nostre
              <br />
              <em className="font-normal text-rose">ricerche</em> innovative
            </h1>
            <p className="mt-8 max-w-[720px] text-lg leading-[1.8] text-muted">
              Ogni membro combina esperienze, competenze specializzate e un impegno profondo contro il cancro. La collaborazione interdisciplinare unisce scienza, clinica e umanità.
            </p>
          </Entrance>

          <Entrance
            className="relative min-h-[460px] w-full overflow-hidden bg-ivory sm:min-h-[560px] lg:min-h-[680px]"
            delay={0.04}
            direction="fade"
            scaleFrom={1.025}
          >
            <Image
              className="object-cover object-[center_42%]"
              src="/images/A-ROSE_group.jpg"
              alt="Carlotta Giorgi, Paolo Pinton, Gabriele Anania e Francesco Fiorica"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#fffdf9_0%,rgba(255,253,249,0.68)_3%,rgba(255,253,249,0.08)_13%,transparent_24%)] max-lg:bg-[linear-gradient(180deg,#fffdf9_0%,rgba(255,253,249,0.18)_10%,transparent_28%)]"
              aria-hidden="true"
            />
          </Entrance>
        </div>
      </section>

      <ScrollReveal>
        <FounderProfiles />
      </ScrollReveal>
      <ScrollReveal>
        <TeamDirectory />
      </ScrollReveal>
      <ScrollReveal>
        <TeamVolunteerCta />
      </ScrollReveal>
    </main>
  );
}
