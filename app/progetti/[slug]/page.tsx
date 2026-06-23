import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialDetail } from "@/components/editorial/editorial-detail";
import { RelatedGrid } from "@/components/editorial/related-grid";
import { Icon } from "@/components/home/icons";
import { textLink } from "@/components/home/styles";
import { outreachProjectContent } from "@/components/projects/outreach-project-data";
import { OutreachProjectDetail } from "@/components/projects/outreach-project-detail";
import { WordPressContent } from "@/components/ui/wordpress-content";
import { getProjectBySlug, getProjects } from "@/lib/wordpress";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function cleanProjectContent(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, "");
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const project = await getProjectBySlug((await params).slug);

  return project
    ? {
        title: `${project.title} | Progetti A-ROSE ODV`,
        description: project.excerpt,
      }
    : { title: "Progetto non trovato | A-ROSE ODV" };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([getProjectBySlug(slug), getProjects()]);

  if (!project) notFound();

  const outreachContent = outreachProjectContent[project.slug];
  if (outreachContent) return <OutreachProjectDetail content={outreachContent} />;

  const relatedProjects = projects
    .filter((item) => item.slug !== project.slug && item.kind === project.kind)
    .slice(0, 3);

  return (
    <main id="contenuto">
      <EditorialDetail
        aside={
          <Link className={`${textLink} text-sm`} href="/sostieni-la-ricerca#donazione">
            Sostieni questo impegno <Icon className="size-4" name="heart" />
          </Link>
        }
        backHref="/la-ricerca/progetti"
        backLabel="Tutti i progetti"
        category={project.kind}
        date={project.date}
        eyebrow="Progetti A-ROSE"
        excerpt={project.excerpt}
        image={project.image}
        imageAlt={project.imageAlt}
        imageVariant={project.kind === "Divulgazione e raccolta fondi" ? "contained" : "wide"}
        title={project.title}
        related={
          relatedProjects.length ? (
            <RelatedGrid
              items={relatedProjects.map((item) => ({
                href: `/la-ricerca/progetti/${item.slug}`,
                category: item.kind,
                title: item.title,
              }))}
            />
          ) : null
        }
      >
        {project.contentHtml ? (
          <section aria-label={`Contenuto del progetto ${project.title}`}>
            <WordPressContent html={cleanProjectContent(project.contentHtml)} />
          </section>
        ) : (
          <section className="border-l-2 border-rose bg-ivory p-7 sm:p-9">
            <h2 className="font-serif text-3xl font-normal text-ink">Contenuto in aggiornamento</h2>
            <p className="mt-4 text-base leading-[1.8] text-muted">
              Stiamo completando la scheda approfondita di questo progetto. Nel frattempo puoi
              contattarci per ricevere informazioni scientifiche e aggiornamenti.
            </p>
            <Link className={`${textLink} mt-6`} href="/contatti">
              Contatta A-ROSE <Icon className="size-4" name="arrow" />
            </Link>
          </section>
        )}
      </EditorialDetail>
    </main>
  );
}
