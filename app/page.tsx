import { ContactSection } from "@/components/home/contact-section";
import { DonationSection } from "@/components/home/donation-section";
import { EventsSection } from "@/components/home/events-section";
import { FinalCta } from "@/components/home/final-cta";
import { HeroSection } from "@/components/home/hero-section";
import { ImpactSection } from "@/components/home/impact-section";
import { MissionSection } from "@/components/home/mission-section";
import { NewsSection } from "@/components/home/news-section";
import { PartnersSection } from "@/components/home/partners-section";
import { ResearchSection } from "@/components/home/research-section";
import { TeamSection } from "@/components/home/team-section";

export default function Page() {
  return (
    <main id="contenuto">
      <HeroSection />
      <MissionSection />
      <PartnersSection />
      <ResearchSection />
      <DonationSection />
      <ImpactSection />
      <TeamSection />
      <EventsSection />
      <NewsSection />
      <ContactSection />
      <FinalCta />
    </main>
  );
}
