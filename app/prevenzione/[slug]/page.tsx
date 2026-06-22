import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstitutionalPage } from "@/components/content/institutional-page";
import { getInstitutionalPage, institutionalPages } from "@/lib/institutional-pages";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return institutionalPages.filter((page) => page.path.startsWith("/prevenzione/")).map((page) => ({ slug: page.path.split("/").at(-1)! })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const page = getInstitutionalPage(`/prevenzione/${(await params).slug}`); return page ? { title: page.metaTitle, description: page.metaDescription } : {}; }
export default async function PreventionSubpage({ params }: Props) { const page = getInstitutionalPage(`/prevenzione/${(await params).slug}`); if (!page) notFound(); return <InstitutionalPage page={page} />; }
