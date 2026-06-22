import type { Metadata } from "next";
import { NewsCategoryPage } from "@/components/editorial/news-category-page";
export const metadata: Metadata = { title: "Comunicati | A-ROSE ODV", description: "Comunicati e aggiornamenti istituzionali di A-ROSE ODV." };
export default function PressReleasesPage() { return <NewsCategoryPage title="Comunicati" accent="istituzionali." intro="Comunicazioni ufficiali, aggiornamenti associativi e materiali destinati alla stampa." filter={(category) => /comunicat/i.test(category)} />; }
