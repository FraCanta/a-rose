import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/content/institutional-page";
import { AreaHero, AreaPaths } from "@/components/content/area-hero";
import { navigation } from "@/components/layout/navigation-data";
import { getInstitutionalPage } from "@/lib/institutional-pages";
const page = getInstitutionalPage("/la-ricerca")!;
export const metadata: Metadata = { title: page.metaTitle, description: page.metaDescription };
export default function ResearchLandingPage() { return <InstitutionalPage page={page} hero={<><AreaHero label="La ricerca" title={`${page.title} ${page.accent}`} intro={page.intro} note={page.description} image="/images/ricerca-dettaglio.webp" imageAlt="Attività di ricerca in laboratorio" /><AreaPaths title="Dal laboratorio alle persone" links={navigation.find((item) => item.href === "/la-ricerca")?.children ?? []} /></>} />; }
