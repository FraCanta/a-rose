import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CampaignCountdown } from "@/components/donations/campaign-countdown";
import { Icon } from "@/components/home/icons";
import { createClient } from "@/utils/supabase/server";

type CampaignPageProps = {
  params: Promise<{ slug: string }>;
};

const presetCovers: Record<string, string> = {
  compleanno: "/images/fundraising-covers/compleanno.svg",
  matrimonio: "/images/fundraising-covers/matrimonio.svg",
  memoria: "/images/fundraising-covers/memoria.svg",
  comunita: "/images/fundraising-covers/comunita.svg",
};

export async function generateMetadata({
  params,
}: CampaignPageProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = await getCampaign(slug);

  if (!campaign) {
    return {
      title: "Raccolta non trovata | A-ROSE ODV",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${campaign.title} | A-ROSE ODV`,
    description: campaign.description,
    openGraph: {
      title: campaign.title,
      description: campaign.description,
      images: [getCampaignCover(campaign)],
    },
  };
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { slug } = await params;
  const campaign = await getCampaign(slug);

  if (!campaign) notFound();

  const cover = getCampaignCover(campaign);
  const goal = Number(campaign.goal_cents || 0);
  const raised = Number(campaign.raised_cents || 0);
  const progress =
    goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;
  const donationHref = `/donazione?tipo=raccolta&campagna=${encodeURIComponent(campaign.title)}#checkout`;

  return (
    <main id="contenuto" className="bg-white">
      <section className="px-5 py-12 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-site gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
          <div className="relative aspect-[1.25] overflow-hidden rounded-4xl bg-rose-soft">
            <Image
              className="object-cover"
              src={cover}
              alt={`Immagine della raccolta fondi ${campaign.title}`}
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              unoptimized={
                cover.startsWith("blob:") || cover.includes("supabase.co")
              }
            />
          </div>

          <article>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-wine">
              Raccolta fondi A-ROSE
            </p>
            <h1 className="mt-5 font-serif text-[clamp(46px,6vw,46px)] font-normal leading-[0.95] tracking-[-0.055em] text-ink">
              {campaign.title}
            </h1>
            <p className="mt-7 whitespace-pre-line text-base leading-8 text-muted sm:text-base">
              {campaign.description}
            </p>

            <div className="mt-9 rounded-3xl border border-line bg-paper p-6 sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="text-sm font-bold text-muted">Raccolti</p>
                  <p className="mt-2 font-serif text-5xl text-wine">
                    {formatCurrency(raised)}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm font-bold text-muted">Obiettivo</p>
                  <p className="mt-2 text-2xl font-bold text-ink">
                    {formatCurrency(goal)}
                  </p>
                </div>
              </div>
              <div className="mt-7 h-3 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-wine"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-3 text-sm font-bold text-wine">
                {progress}% dell’obiettivo raggiunto
              </p>
              <CampaignCountdown
                className="mt-6 border-t border-line pt-6"
                endDate={campaign.end_date}
              />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-wine px-8 font-bold text-white transition hover:bg-wine-deep"
                href={donationHref}
              >
                Dona a questa raccolta <Icon className="size-4" name="heart" />
              </Link>
              <a
                className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-wine px-8 font-bold text-wine transition hover:bg-rose-soft"
                href={`https://wa.me/?text=${encodeURIComponent(`Sostieni questa raccolta A-ROSE: ${campaign.title}`)}`}
              >
                Condividi su WhatsApp
              </a>
            </div>

            <dl className="mt-9 grid gap-4 border-t border-line pt-7 text-sm sm:grid-cols-2">
              {campaign.honoree_name ? (
                <div>
                  <dt className="font-bold text-ink">Referente</dt>
                  <dd className="mt-1 text-muted">{campaign.honoree_name}</dd>
                </div>
              ) : null}
              {campaign.project_label ? (
                <div>
                  <dt className="font-bold text-ink">Progetto sostenuto</dt>
                  <dd className="mt-1 text-muted">{campaign.project_label}</dd>
                </div>
              ) : null}
              {campaign.end_date ? (
                <div>
                  <dt className="font-bold text-ink">Data fine raccolta</dt>
                  <dd className="mt-1 text-muted">
                    {formatDate(campaign.end_date)}
                  </dd>
                </div>
              ) : null}
              {campaign.region ? (
                <div>
                  <dt className="font-bold text-ink">Luogo</dt>
                  <dd className="mt-1 text-muted">{campaign.region}</dd>
                </div>
              ) : null}
            </dl>
          </article>
        </div>
      </section>
    </main>
  );
}

async function getCampaign(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("fundraising_campaigns")
    .select(
      "title, description, goal_cents, raised_cents, honoree_name, project_label, end_date, region, cover_preset, cover_url",
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) return null;
  return data;
}

function getCampaignCover(
  campaign: NonNullable<Awaited<ReturnType<typeof getCampaign>>>,
) {
  if (campaign.cover_url) return campaign.cover_url;
  if (campaign.cover_preset && presetCovers[campaign.cover_preset]) {
    return presetCovers[campaign.cover_preset];
  }
  return presetCovers.comunita;
}

function formatCurrency(cents: number) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}
