import type { MetadataRoute } from "next";
import { allNavigationLinks } from "@/components/layout/navigation-data";
import { institutionalPages } from "@/lib/institutional-pages";
import { getEvents, getPosts, getProjects } from "@/lib/wordpress";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://a-roseodv.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, events, projects] = await Promise.all([getPosts(100), getEvents(100), getProjects()]);
  const staticPaths = new Set([
    "/",
    ...allNavigationLinks.map((link) => link.href),
    ...institutionalPages.map((page) => page.path),
    "/news/articoli",
    "/news/comunicati",
  ]);

  const staticEntries: MetadataRoute.Sitemap = [...staticPaths].map((path) => ({
    url: new URL(path, baseUrl).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  return [
    ...staticEntries,
    ...posts.map((post) => ({ url: new URL(`/news/${post.slug}`, baseUrl).toString(), lastModified: post.date, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...events.map((event) => ({ url: new URL(`/eventi/${event.slug}`, baseUrl).toString(), lastModified: event.date, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...projects.filter((project) => project.kind === "Divulgazione e raccolta fondi").map((project) => ({ url: new URL(`/progetti/${project.slug}`, baseUrl).toString(), lastModified: project.date, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
