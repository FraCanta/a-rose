import type { Metadata } from "next";
import Link from "next/link";
import {
  DonationCheckout,
  type DonationCheckoutType,
} from "@/components/donations/donation-checkout";
import { FundraisingCampaignForm } from "@/components/donations/fundraising-campaign-form";
import { Icon } from "@/components/home/icons";
import { container, section } from "@/components/home/styles";

export const metadata: Metadata = {
  title: "Donazione | A-ROSE ODV",
  description:
    "Completa una donazione, un regalo solidale o una raccolta fondi a sostegno di A-ROSE ODV.",
};

type DonationPageProps = {
  searchParams: Promise<{
    tipo?: string;
    occasione?: string;
    campagna?: string;
  }>;
};

const pageCopy: Record<
  DonationCheckoutType,
  { eyebrow: string; title: string; accent: string; intro: string }
> = {
  generale: {
    eyebrow: "Sostieni la ricerca",
    title: "Completa la",
    accent: "donazione.",
    intro:
      "Scegli l’importo, inserisci i dati necessari e completa il pagamento sicuro con Stripe.",
  },
  regalo: {
    eyebrow: "Regalo solidale",
    title: "Regala una",
    accent: "donazione.",
    intro:
      "Dedica una donazione a una persona o a una ricorrenza speciale. Il contributo sostiene la ricerca e le attività A-ROSE.",
  },
  raccolta: {
    eyebrow: "Raccolta fondi",
    title: "Crea una",
    accent: "raccolta fondi.",
    intro:
      "Imposta i dati essenziali della raccolta, completa la prima donazione e condividi l’iniziativa con la tua rete.",
  },
};

function normalizeType(value?: string): DonationCheckoutType {
  if (value === "regalo" || value === "raccolta") return value;
  return "generale";
}

function normalizeOccasion(value?: string) {
  return value ? value.replaceAll("-", " ") : undefined;
}

function normalizeCampaignTitle(value?: string) {
  return value ? value.slice(0, 160) : undefined;
}

export default async function DonationPage({
  searchParams,
}: DonationPageProps) {
  const params = await searchParams;
  const donationType = normalizeType(params.tipo);
  const occasion = normalizeOccasion(params.occasione);
  const campaignTitle = normalizeCampaignTitle(params.campagna);
  const copy = pageCopy[donationType];
  void copy;
  const isCampaignCreation = donationType === "raccolta" && !campaignTitle;

  return (
    <main id="contenuto">
      <section className={`${section} bg-ivory`}>
        <div className={`${container}  `}>
          <article
            className="border border-line bg-white p-7 shadow-soft sm:p-10"
            id="checkout"
          >
            <div className="mb-8 border-b border-line pb-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">
                {isCampaignCreation
                  ? "Creazione raccolta"
                  : "Pagamento interno"}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-normal text-ink">
                {isCampaignCreation
                  ? "Compila la tua campagna"
                  : campaignTitle
                    ? `Dona per: ${campaignTitle}`
                    : "Dona in modo semplice e sicuro"}
              </h2>
              <p className="mt-4 text-sm leading-[1.8] text-muted">
                {isCampaignCreation
                  ? "Al termine verrà generato un link da condividere con chi vuole sostenere la raccolta."
                  : "I dati della carta sono gestiti da Stripe. A-ROSE riceve solo le informazioni necessarie per registrare e rendicontare la donazione."}
              </p>
            </div>
            {isCampaignCreation ? (
              <FundraisingCampaignForm occasion={occasion} />
            ) : (
              <DonationCheckout
                publishableKey={
                  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
                }
                donationType={donationType}
                occasion={occasion}
                campaignName={campaignTitle}
              />
            )}
          </article>
        </div>
      </section>

      <section className="bg-white py-14">
        <div
          className={`${container} flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center`}
        >
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">
              Dopo il pagamento
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl font-normal text-ink sm:text-4xl">
              Potrai condividere il gesto o concordare i dettagli con A-ROSE.
            </h2>
          </div>
          <Link
            className="flex items-center gap-2 text-sm font-bold text-wine"
            href="/contatti"
          >
            Hai bisogno di aiuto? <Icon className="size-4" name="arrow" />
          </Link>
        </div>
      </section>
    </main>
  );
}
