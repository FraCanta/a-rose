import type { Metadata } from "next";
import { getInstitutionalPage } from "@/lib/institutional-pages";
import { HealthLanding } from "@/components/editorial/health-landing";
const page = getInstitutionalPage("/prevenzione")!;
export const metadata: Metadata = { title: "Prevenzione e salute | A-ROSE ODV", description: page.metaDescription, alternates: { canonical: "/prevenzione-e-salute" } };
export default function PreventionLandingPage() {
  return <HealthLanding />;
}
