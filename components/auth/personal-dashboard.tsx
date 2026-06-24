"use client";

import Link from "next/link";
import { useState } from "react";
import { ProfileDataForm } from "@/components/auth/profile-data-form";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Icon } from "@/components/home/icons";

type DashboardTab =
  | "dashboard"
  | "raccolte"
  | "crea-raccolta"
  | "regalo"
  | "donazioni"
  | "profilo"
  | "contatti";

type ProfileData = {
  first_name?: string | null;
  last_name?: string | null;
  donor_code?: string | null;
  birth_date?: string | null;
  biological_sex?: string | null;
  phone?: string | null;
  fiscal_code?: string | null;
  address?: string | null;
  street_number?: string | null;
  city?: string | null;
  postal_code?: string | null;
  province?: string | null;
  privacy_accepted_at?: string | null;
  marketing_accepted_at?: string | null;
};

type PersonalDashboardProps = {
  displayName: string;
  email?: string;
  campaignsCount: number;
  donationsCount: number;
  profile: ProfileData | null;
};

const tabs: { id: DashboardTab; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "raccolte", label: "Le tue raccolte" },
  { id: "crea-raccolta", label: "Crea raccolta fondi" },
  { id: "regalo", label: "Regala una donazione" },
  { id: "donazioni", label: "Le tue donazioni" },
  { id: "profilo", label: "I tuoi dati" },
  { id: "contatti", label: "Contattaci" },
];

const dashboardCards = [
  {
    title: "Le tue raccolte fondi",
    text: "Crea una campagna personale, pubblicala e condividi il link con la tua rete.",
    cta: "Crea una raccolta",
    href: "/come-sostenerci/raccolta-fondi",
  },
  {
    title: "Regala una donazione",
    text: "Trasforma un'occasione speciale in una donazione con e-card dedicata.",
    cta: "Prepara il regalo",
    href: "/come-sostenerci/regala-una-donazione",
  },
  {
    title: "Sostieni la ricerca",
    text: "Fai una donazione diretta ad A-ROSE ODV tramite il modulo del sito.",
    cta: "Dona ora",
    href: "/sostieni-la-ricerca",
  },
  {
    title: "I tuoi dati",
    text: "Controlla e aggiorna i dati associati al tuo profilo.",
    cta: "Vai al profilo",
    tab: "profilo" as const,
  },
];

type DashboardCardItem = (typeof dashboardCards)[number];
type LinkedDashboardCardItem = DashboardCardItem & { href: string };

function isLinkedDashboardCard(
  item: DashboardCardItem,
): item is LinkedDashboardCardItem {
  return "href" in item && typeof item.href === "string";
}

export function PersonalDashboard({
  displayName,
  email,
  campaignsCount,
  donationsCount,
  profile,
}: PersonalDashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>("dashboard");

  return (
    <section className="overflow-hidden bg-white px-5 sm:px-8">
      <div className="mx-auto grid max-w-site gap-8 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside
          className="min-w-0 border-line py-5 lg:min-h-[760px] lg:border-r lg:py-8 lg:pr-8"
          aria-label="Menu area personale"
        >
          <nav className="flex max-w-full gap-2 overflow-x-auto pb-2 text-sm font-bold text-wine [-ms-overflow-style:none] [scrollbar-width:none] lg:grid lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
            {tabs.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  className={`min-h-11 shrink-0 rounded-full border px-4 text-left transition lg:min-h-0 lg:rounded-xl lg:border-0 lg:px-3 lg:py-2 ${
                    isActive
                      ? "border-wine bg-wine text-white lg:bg-rose-soft lg:text-wine lg:underline lg:decoration-wine lg:underline-offset-4"
                      : "border-line bg-white text-wine hover:bg-rose-soft"
                  }`}
                  key={item.id}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-2 flex justify-end lg:justify-start">
            <SignOutButton className="inline-flex min-h-10 items-center justify-center rounded-full border border-rose px-5 text-sm font-bold text-rose transition hover:bg-rose hover:text-white lg:min-h-0 lg:border-0 lg:px-3 lg:py-2" />
          </div>
        </aside>

        <div className="min-w-0 pb-14 pt-3 lg:py-16">
          {activeTab === "dashboard" ? (
            <DashboardOverview
              campaignsCount={campaignsCount}
              displayName={displayName}
              donationsCount={donationsCount}
              onProfileClick={() => setActiveTab("profilo")}
            />
          ) : null}

          {activeTab === "raccolte" ? (
            <EmptyArea
              title="Le tue raccolte fondi"
              count={campaignsCount}
              emptyText="Non hai ancora creato raccolte fondi."
              filledText="Hai già creato raccolte fondi. La gestione dettagliata verrà ampliata nelle prossime fasi."
              cta="Crea una raccolta"
              href="/come-sostenerci/raccolta-fondi"
            />
          ) : null}

          {activeTab === "crea-raccolta" ? (
            <ActionArea
              title="Crea una raccolta fondi"
              text="Prepara una campagna, scegli un'immagine, imposta un obiettivo e genera un link da condividere."
              cta="Vai al modulo"
              href="/come-sostenerci/raccolta-fondi"
            />
          ) : null}

          {activeTab === "regalo" ? (
            <ActionArea
              title="Regala una donazione"
              text="Scegli l'occasione, compila i dati del destinatario, seleziona una e-card e procedi con la donazione."
              cta="Prepara una e-card"
              href="/come-sostenerci/regala-una-donazione"
            />
          ) : null}

          {activeTab === "donazioni" ? (
            <EmptyArea
              title="Le tue donazioni"
              count={donationsCount}
              emptyText="Non risultano ancora donazioni associate al tuo profilo."
              filledText="Risultano donazioni associate al tuo profilo. La consultazione completa verrà collegata nelle prossime fasi."
              cta="Sostieni la ricerca"
              href="/sostieni-la-ricerca"
            />
          ) : null}

          {activeTab === "profilo" ? (
            <ProfileDataForm email={email} profile={profile} />
          ) : null}

          {activeTab === "contatti" ? (
            <ActionArea
              title="Contattaci"
              text="Per informazioni sulle donazioni, sulle raccolte fondi o sul tuo profilo puoi scrivere ad A-ROSE."
              cta="Vai ai contatti"
              href="/contatti"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function DashboardOverview({
  displayName,
  campaignsCount,
  donationsCount,
  onProfileClick,
}: {
  displayName: string;
  campaignsCount: number;
  donationsCount: number;
  onProfileClick: () => void;
}) {
  return (
    <>
      <div className="max-w-3xl">
        <h2 className="max-w-full break-words font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Ciao {displayName}
        </h2>
        <p className="mt-4 text-lg leading-8 text-ink">
          Da qui puoi gestire le azioni che richiedono un profilo: raccolte
          fondi, donazioni regalo, dati personali e strumenti collegati alla
          partecipazione.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatusBox label="Raccolte create" value={campaignsCount} />
        <StatusBox label="Donazioni registrate" value={donationsCount} />
        <StatusBox label="Profilo" value="Attivo" />
        <StatusBox label="Accesso" value="Protetto" />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {dashboardCards.map((item) =>
          isLinkedDashboardCard(item) ? (
            <DashboardCard item={item} key={item.title} />
          ) : (
            <button
              className="group flex min-h-48 min-w-0 flex-col justify-between border border-wine/55 bg-white p-6 text-left transition hover:border-wine hover:shadow-sm sm:p-7"
              key={item.title}
              type="button"
              onClick={onProfileClick}
            >
              <CardContent item={item} />
            </button>
          ),
        )}
      </div>
    </>
  );
}

function DashboardCard({ item }: { item: LinkedDashboardCardItem }) {
  return (
    <Link
      className="group flex min-h-48 min-w-0 flex-col justify-between border border-wine/55 bg-white p-6 transition hover:border-wine hover:shadow-sm sm:p-7"
      href={item.href}
    >
      <CardContent item={item} />
    </Link>
  );
}

function CardContent({
  item,
}: {
  item: { title: string; text: string; cta: string };
}) {
  return (
    <>
      <span>
        <h3 className="break-words font-serif text-3xl leading-tight text-wine sm:text-4xl">
          {item.title}
        </h3>
        <p className="mt-4 max-w-md break-words text-sm leading-7 text-ink sm:text-base">
          {item.text}
        </p>
      </span>
      <span className="mt-7 inline-flex w-fit min-h-11 items-center gap-2 rounded-md bg-wine px-5 text-sm font-extrabold text-white transition group-hover:bg-wine-deep">
        {item.cta}
        <Icon
          className="size-4 transition group-hover:translate-x-1"
          name="arrow"
        />
      </span>
    </>
  );
}

function EmptyArea({
  title,
  count,
  emptyText,
  filledText,
  cta,
  href,
}: {
  title: string;
  count: number;
  emptyText: string;
  filledText: string;
  cta: string;
  href: string;
}) {
  return (
    <section className="max-w-3xl border border-line bg-ivory p-7 sm:p-10">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-rose">
        Area personale
      </p>
      <h2 className="mt-3 font-serif text-5xl leading-tight text-ink">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-ink">
        {count > 0 ? filledText : emptyText}
      </p>
      <Link
        className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-wine px-6 text-sm font-bold text-white transition hover:bg-wine-deep"
        href={href}
      >
        {cta} <Icon className="size-4" name="arrow" />
      </Link>
    </section>
  );
}

function ActionArea({
  title,
  text,
  cta,
  href,
}: {
  title: string;
  text: string;
  cta: string;
  href: string;
}) {
  return (
    <section className="max-w-3xl border border-line bg-white p-7 sm:p-10">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-rose">
        Strumento dedicato
      </p>
      <h2 className="mt-3 font-serif text-5xl leading-tight text-ink">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-ink">{text}</p>
      <Link
        className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-wine px-6 text-sm font-bold text-white transition hover:bg-wine-deep"
        href={href}
      >
        {cta} <Icon className="size-4" name="arrow" />
      </Link>
    </section>
  );
}

function StatusBox({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="border border-line bg-paper p-5">
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-rose">
        {label}
      </p>
      <p className="mt-3 font-serif text-3xl text-ink">{value}</p>
    </div>
  );
}
