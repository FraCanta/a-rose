import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialDetail } from "@/components/editorial/editorial-detail";
import { RelatedGrid } from "@/components/editorial/related-grid";
import { WordPressContent } from "@/components/ui/wordpress-content";
import { getPostBySlug, getPosts } from "@/lib/wordpress";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return post
    ? { title: `${post.title} | A-ROSE ODV`, description: post.excerpt }
    : { title: "Articolo non trovato | A-ROSE ODV" };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getPosts(7)]);

  if (!post) notFound();

  return (
    <main id="contenuto">
      <EditorialDetail
        backHref="/news"
        backLabel="Tutte le news"
        category={post.category}
        date={post.date}
        eyebrow="A-ROSE magazine"
        excerpt={post.excerpt}
        image={post.image}
        imageAlt={post.imageAlt}
        title={post.title}
        related={
          <RelatedGrid
            items={allPosts
              .filter((item) => item.id !== post.id)
              .slice(0, 3)
              .map((item) => ({
                href: `/news/${item.slug}`,
                category: item.category,
                title: item.title,
              }))}
          />
        }
      >
        <section aria-label="Contenuto dell'articolo">
          <WordPressContent html={post.contentHtml} />
        </section>
      </EditorialDetail>
    </main>
  );
}
