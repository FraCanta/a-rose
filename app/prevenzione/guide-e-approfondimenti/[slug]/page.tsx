import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialDetail } from "@/components/editorial/editorial-detail";
import { RelatedGrid } from "@/components/editorial/related-grid";
import { WordPressContent } from "@/components/ui/wordpress-content";
import { getPostBySlug, getPosts } from "@/lib/wordpress";

type PreventionGuideDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function isPreventionCategory(category: string) {
  const normalizedCategory = category.toLowerCase();
  return (
    normalizedCategory.includes("prevenzione") ||
    normalizedCategory.includes("consapevolezza")
  );
}

export async function generateMetadata({
  params,
}: PreventionGuideDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return post
    ? {
        title: `${post.title} | Guide e approfondimenti A-ROSE`,
        description: post.excerpt,
      }
    : { title: "Approfondimento non trovato | A-ROSE ODV" };
}

export default async function PreventionGuideDetailPage({
  params,
}: PreventionGuideDetailPageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getPosts(30)]);

  if (!post) notFound();

  const relatedPosts = allPosts
    .filter((item) => item.id !== post.id && isPreventionCategory(item.category))
    .slice(0, 3);

  return (
    <main id="contenuto">
      <EditorialDetail
        backHref="/prevenzione/guide-e-approfondimenti"
        backLabel="Guide e approfondimenti"
        category={post.category}
        date={post.date}
        eyebrow="Prevenzione"
        excerpt={post.excerpt}
        image={post.image}
        imageAlt={post.imageAlt}
        title={post.title}
        related={
          relatedPosts.length ? (
            <RelatedGrid
              items={relatedPosts.map((item) => ({
                href: `/prevenzione/guide-e-approfondimenti/${item.slug}`,
                category: item.category,
                title: item.title,
              }))}
            />
          ) : null
        }
      >
        <section aria-label="Contenuto dell'approfondimento">
          <WordPressContent html={post.contentHtml} />
        </section>
      </EditorialDetail>
    </main>
  );
}
