import { permanentRedirect } from "next/navigation";

export default function LegacyProjectsPage() {
  permanentRedirect("/la-ricerca/progetti-di-ricerca");
}
