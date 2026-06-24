import type { Metadata } from "next";
import { AuthForms } from "@/components/auth/auth-forms";
import { PersonalDashboard } from "@/components/auth/personal-dashboard";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Area personale | A-ROSE ODV",
  description:
    "Accedi o registrati all'area personale A-ROSE ODV per gestire raccolte fondi e azioni di sostegno.",
  robots: { index: false, follow: false },
};

export default async function PersonalAreaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select(
        "first_name,last_name,donor_code,birth_date,biological_sex,phone,fiscal_code,address,street_number,city,postal_code,province,privacy_accepted_at,marketing_accepted_at",
      )
      .eq("id", user.id)
      .maybeSingle();

    const fullName = [
      profile?.first_name ?? user.user_metadata?.first_name,
      profile?.last_name ?? user.user_metadata?.last_name,
    ]
      .filter(Boolean)
      .join(" ");
    const displayName = fullName || user.email?.split("@")[0] || "utente";

    const [{ data: campaigns, count: campaignsCount }, { count: donationsCount }] =
      await Promise.all([
        supabase
          .from("fundraising_campaigns")
          .select(
            "id, slug, title, end_date, goal_cents, raised_cents, cover_preset, cover_url, status",
            { count: "exact" },
          )
          .eq("owner_id", user.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("donations")
          .select("id", { count: "exact", head: true })
          .eq("donor_id", user.id),
      ]);

    return (
      <main id="contenuto">
        <section className="bg-ivory px-5 py-16 text-center sm:px-8 lg:py-24">
          <div className="mx-auto max-w-site">
            <h1 className="font-serif text-5xl leading-none text-ink sm:text-6xl lg:text-7xl">
              Area riservata
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-7 text-wine">
              Ti diamo il benvenuto nella tua area personale A-ROSE.
            </p>
          </div>
        </section>

        <PersonalDashboard
          campaignsCount={campaignsCount ?? 0}
          displayName={displayName}
          donationsCount={donationsCount ?? 0}
          email={user.email}
          campaigns={campaigns ?? []}
          profile={profile}
        />
      </main>
    );
  }

  return (
    <main id="contenuto">
      <section className="bg-ivory px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-site text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-wine">
            Area riservata
          </p>
          <h1 className="mx-auto mt-5 max-w-4xl font-serif text-5xl leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
            Accedi o registrati al tuo spazio{" "}
            <em className="font-normal text-rose">A-ROSE.</em>
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            Potrai creare e gestire raccolte fondi, salvare iniziative e
            accedere alle funzionalità dedicate ai sostenitori.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-site">
          <AuthForms />
          <div className="mt-10 rounded-3xl bg-ivory p-6 text-sm leading-7 text-muted sm:p-8">
            <p>
              L&apos;area personale è pensata per strumenti di partecipazione e
              sostegno. A-ROSE non fornisce consulenze mediche, diagnosi o
              indicazioni terapeutiche personalizzate attraverso questo spazio.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
