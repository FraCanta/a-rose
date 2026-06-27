import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CampaignShareActions } from "@/components/donations/campaign-share-actions";
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

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://a-rose-tau.vercel.app/"
  ).replace(/\/$/, "");
}

function getAbsoluteUrl(value: string) {
  if (value.startsWith("http")) return value;
  return `${getSiteUrl()}${value.startsWith("/") ? value : `/${value}`}`;
}

function getCampaignUrl(slug: string) {
  return `${getSiteUrl()}/raccolte/${slug}`;
}

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

  const description =
    campaign.description ?? "Sostieni questa raccolta fondi A-ROSE ODV.";
  const image = getAbsoluteUrl(getCampaignCover(campaign));
  const url = getCampaignUrl(campaign.slug);

  return {
    title: `${campaign.title} | A-ROSE ODV`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: campaign.title,
      description,
      type: "website",
      url,
      images: [{ url: image, alt: `Raccolta fondi ${campaign.title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: campaign.title,
      description,
      images: [image],
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
  const campaignUrl = getCampaignUrl(campaign.slug);
  const shareText = `Sostieni questa raccolta fondi A-ROSE ODV: ${campaign.title}`;

  return (
    <main id="contenuto" className="min-h-screen overflow-hidden bg-ivory">
      <header className="relative z-20 border-b border-wine/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-20 max-w-site items-center justify-between gap-4 px-5 sm:px-8">
          <Link href="/" aria-label="A-ROSE ODV, homepage">
            <Image
              className="h-auto w-36 object-contain sm:w-44"
              src="/brand/logo2_arose_positivo.png"
              alt="A-ROSE ODV"
              width={1200}
              height={400}
              priority
            />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-[10px] font-extrabold uppercase tracking-[0.18em] text-wine sm:block">
              Raccolta solidale
            </span>
            <Link
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-wine px-5 text-sm font-bold text-white transition hover:bg-wine-deep"
              href={donationHref}
            >
              Dona ora <Icon className="size-4" name="heart" />
            </Link>
          </div>
        </div>
      </header>

      <section className="px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-12 lg:pb-24">
        <div className="mx-auto max-w-site overflow-hidden rounded-[2rem] border border-wine/10 bg-white shadow-elevated lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(390px,0.9fr)]">
          <div className="relative min-h-[320px] bg-rose-soft sm:min-h-[480px] lg:min-h-[680px]">
            <Image
              className="object-cover"
              src={cover}
              alt={`Immagine della raccolta fondi ${campaign.title}`}
              fill
              priority
              sizes="(min-width: 1024px) 56vw, 100vw"
              unoptimized={
                cover.startsWith("blob:") || cover.includes("supabase.co")
              }
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-wine-deep/45 to-transparent lg:hidden" />
          </div>

          <article className="flex flex-col p-6 sm:p-10 lg:p-12 xl:p-14">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-rose">
              Insieme per la ricerca
            </p>
            <h1 className="mt-5 text-balance font-serif text-[clamp(2.75rem,6vw,2.75rem)] font-normal leading-[0.96] tracking-[-0.055em] text-ink">
              {campaign.title}
            </h1>
            {campaign.organizer_name ? (
              <p className="mt-5 text-sm font-bold text-wine">
                Una raccolta ideata da {campaign.organizer_name}
              </p>
            ) : null}

            <div className="mt-8 border-y border-line py-7">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
                    Raccolti
                  </p>
                  <p className="mt-2 font-serif text-5xl leading-none text-wine sm:text-6xl">
                    {formatCurrency(raised)}
                  </p>
                </div>
                <div className="pb-1 text-right">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
                    Obiettivo
                  </p>
                  <p className="mt-2 text-xl font-bold text-ink">
                    {formatCurrency(goal)}
                  </p>
                </div>
              </div>

              <div
                className="mt-7 h-2.5 overflow-hidden rounded-full bg-rose-soft"
                role="progressbar"
                aria-label="Avanzamento della raccolta"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <div
                  className="h-full rounded-full bg-wine transition-[width] duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-3 text-sm font-bold text-wine">
                {progress}% dell’obiettivo raggiunto
              </p>
            </div>

            <div>
              <CampaignCountdown className="mt-7" endDate={campaign.end_date} />

              <div className="mt-9 grid gap-3">
                <Link
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-wine px-8 font-bold text-white transition hover:bg-wine-deep"
                  href={donationHref}
                >
                  Sostieni questa raccolta{" "}
                  <Icon className="size-4" name="heart" />
                </Link>
                <CampaignShareActions
                  text={shareText}
                  title={campaign.title}
                  url={campaignUrl}
                />
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-line bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-site gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-24">
          <article>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-rose">
              La storia della raccolta
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl">
              Perché questo gesto conta.
            </h2>
            <p className="mt-7 max-w-3xl whitespace-pre-line text-base leading-8 text-muted sm:text-lg sm:leading-9">
              {campaign.description}
            </p>
          </article>

          <aside className="self-start rounded-3xl border border-wine/15 bg-paper p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-normal text-ink">
              Dettagli
            </h2>
            <dl className="mt-6 grid gap-5 text-sm">
              {campaign.project_label ? (
                <Detail
                  label="Progetto sostenuto"
                  value={campaign.project_label}
                />
              ) : null}
              {campaign.honoree_name ? (
                <Detail
                  label="Raccolta dedicata a"
                  value={campaign.honoree_name}
                />
              ) : null}
              {campaign.end_date ? (
                <Detail
                  label="Termine della raccolta"
                  value={formatDate(campaign.end_date)}
                />
              ) : null}
              {campaign.region ? (
                <Detail label="Luogo" value={campaign.region} />
              ) : null}
            </dl>
            <p className="mt-7 border-t border-line pt-6 text-xs leading-6 text-muted">
              Le donazioni sono tracciabili e destinate alle attività di A-ROSE
              ODV.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-wine px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-site gap-8 md:grid-cols-[180px_minmax(0,1fr)] md:items-center lg:grid-cols-[220px_minmax(0,1fr)_auto] lg:gap-12">
          <div className="relative aspect-[1.35] overflow-hidden rounded-3xl bg-rose-soft">
            <Image
              className="object-cover"
              src={cover}
              alt=""
              fill
              sizes="(min-width: 1024px) 220px, (min-width: 768px) 180px, 100vw"
              unoptimized={cover.startsWith("blob:") || cover.includes("supabase.co")}
            />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-rose-soft">
              Sostieni questa raccolta
            </p>
            <h2 className="mt-4 line-clamp-3 max-w-3xl font-serif text-3xl font-normal leading-tight sm:text-4xl lg:text-5xl">
              {campaign.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-rose-soft">
              Ogni contributo sostiene il progetto scelto e avvicina la ricerca alla cura.
            </p>
          </div>
          <Link
            className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-white px-8 font-bold text-wine transition hover:bg-rose-soft"
            href={donationHref}
          >
            Dona ora <Icon className="size-4" name="heart" />
          </Link>
        </div>
      </section>

      <footer className="bg-wine-deep px-5 py-8 text-rose-soft sm:px-8">
        <div className="mx-auto flex max-w-site flex-col gap-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>Raccolta ospitata da A-ROSE ODV</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              className="underline-offset-4 hover:underline"
              href="/chi-siamo/la-nostra-associazione"
            >
              Conosci A-ROSE
            </Link>
            <Link
              className="underline-offset-4 hover:underline"
              href="/come-sostenerci/come-usiamo-i-fondi"
            >
              Come usiamo i fondi
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-line pb-5 last:border-0 last:pb-0">
      <dt className="font-bold text-ink">{label}</dt>
      <dd className="mt-1.5 leading-6 text-muted">{value}</dd>
    </div>
  );
}

async function getCampaign(slug: string) {
  const supabase = await createClient();
  const campaignFields =
    "slug, title, description, goal_cents, raised_cents, honoree_name, project_label, end_date, region, cover_preset, cover_url";
  const { data, error } = await supabase
    .from("fundraising_campaigns")
    .select(`${campaignFields}, organizer_name`)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!error && data) return data;

  if (error?.message.includes("organizer_name")) {
    const { data: legacyData, error: legacyError } = await supabase
      .from("fundraising_campaigns")
      .select(campaignFields)
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (!legacyError && legacyData) {
      return { ...legacyData, organizer_name: null };
    }
  }

  return null;
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
