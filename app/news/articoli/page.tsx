import type { Metadata } from "next";
import { NewsCategoryPage } from "@/components/editorial/news-category-page";
export const metadata: Metadata = { title: "Articoli | A-ROSE ODV", description: "Articoli e approfondimenti A-ROSE su ricerca, prevenzione e comunità." };
export default function ArticlesPage() { return <NewsCategoryPage title="Articoli e" accent="approfondimenti." intro="Contenuti editoriali per avvicinare ricerca, prevenzione e vita quotidiana con un linguaggio accessibile." filter={(category) => !/comunicat/i.test(category)} />; }
