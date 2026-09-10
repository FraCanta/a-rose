import type { Metadata } from "next";
import { AreaHero, AreaPaths } from "@/components/content/area-hero";
import { navigation } from "@/components/layout/navigation-data";
import { AboutObjective } from "@/components/about/about-objective";
import { AboutPartners } from "@/components/about/about-partners";
import { AboutStory } from "@/components/about/about-story";
import { AboutVision } from "@/components/about/about-vision";
import { FinalCta } from "@/components/home/final-cta";
import { TeamSection } from "@/components/home/team-section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getAboutContent } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Chi siamo | A-ROSE ODV",
  description:
    "Scopri le origini, la visione e gli obiettivi di A-ROSE ODV, associazione ferrarese dedicata alla ricerca oncologica traslazionale.",
};

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <main id="contenuto">
      <AreaHero label="Chi siamo" title="La ricerca nasce dalle persone." image={content.visionImage} imageAlt="Nastro rosa, simbolo della prevenzione oncologica" intro={content.intro} note="Associazione Ricerca Oncologica Sperimentale Estense. Scienza, cura e comunità nella stessa direzione. A Ferrara dal 2019." />
      <AreaPaths title="Conosci A-ROSE" links={navigation[0].children ?? []} />
      <ScrollReveal>
        <AboutStory origins={content.origins} />
      </ScrollReveal>
      <ScrollReveal>
        <AboutVision
          activities={content.activities}
          vision={content.vision}
        />
      </ScrollReveal>
      <ScrollReveal>
        <AboutObjective image={content.objectiveImage} objective={content.objective} />
      </ScrollReveal>
      <ScrollReveal>
        <TeamSection />
      </ScrollReveal>
      <ScrollReveal>
        <AboutPartners partners={content.partners} />
      </ScrollReveal>
      <ScrollReveal>
        <FinalCta />
      </ScrollReveal>
    </main>
  );
}
