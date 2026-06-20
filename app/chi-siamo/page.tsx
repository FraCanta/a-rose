import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
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
      <AboutHero image={content.visionImage} intro={content.intro} />
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
