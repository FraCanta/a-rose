import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/content/institutional-page";
import { getInstitutionalPage } from "@/lib/institutional-pages";
const page = getInstitutionalPage("/partecipa")!;
export const metadata: Metadata = { title: page.metaTitle, description: page.metaDescription };
export default function ParticipationLandingPage() { return <InstitutionalPage page={page} />; }
