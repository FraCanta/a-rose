import { permanentRedirect } from "next/navigation";

export default function LegacyTaxBenefitsPage() {
  permanentRedirect("/chi-siamo/benefici-fiscali");
}
