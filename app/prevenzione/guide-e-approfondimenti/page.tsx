import type { Metadata } from "next";
import { NewsCategoryPage } from "@/components/editorial/news-category-page";

export const metadata: Metadata = {
  title: "Guide e approfondimenti | A-ROSE ODV",
  description:
    "Articoli A-ROSE dedicati alla prevenzione oncologica e alla consapevolezza.",
};

export default function PreventionGuidesPage() {
  return (
    <NewsCategoryPage
      title="Guide e "
      accent="approfondimenti."
      intro="Articoli pubblicati da A-ROSE per rendere più accessibili i temi della prevenzione, della diagnosi e della consapevolezza oncologica. I contenuti sono divulgativi e non sostituiscono il parere medico."
      eyebrow="Prevenzione"
      parent={{ href: "/prevenzione", label: "Prevenzione" }}
      filter={(category) => {
        const normalizedCategory = category.toLowerCase();
        return (
          normalizedCategory.includes("prevenzione") ||
          normalizedCategory.includes("consapevolezza")
        );
      }}
    />
  );
}
