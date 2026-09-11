import { getAllPosts } from "@/lib/wordpress";

const associationCategories = new Set([
  "Iniziative", "Collaborazioni", "Ricerca", "Progetti", "Premi",
]);

export async function getAssociationNews() {
  const posts = await getAllPosts();
  return posts
    .filter((post) => post.categories.some((category) => associationCategories.has(category)))
    .sort((first, second) => Date.parse(second.date) - Date.parse(first.date));
}
