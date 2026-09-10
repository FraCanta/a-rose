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

export const dynamic = "force-dynamic";

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
    <main className="bg-paper" id="contenuto">
      <section className="flex min-h-[760px] items-center justify-center bg-white px-5 py-14 sm:px-10 lg:py-20">
        <div className="w-full max-w-[680px] rounded-2xl border border-line bg-white p-7 shadow-elevated sm:p-12 lg:p-16">
          <AuthForms />
        </div>
      </section>
    </main>
  );
}
