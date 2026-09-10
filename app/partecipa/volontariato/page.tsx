import { permanentRedirect } from "next/navigation";

export default function LegacyVolunteerPage() {
  permanentRedirect("/partecipa/diventa-volontario");
}
