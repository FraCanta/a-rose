"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { Icon } from "@/components/home/icons";
import { createClient } from "@/utils/supabase/client";

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

type ProfileDataFormProps = {
  email?: string;
  profile: ProfileData | null;
};

const inputClass =
  "min-h-12 w-full border border-wine/35 bg-white px-4 py-3 text-ink outline-none transition placeholder:text-muted/60 focus:border-wine focus:ring-2 focus:ring-rose-soft";

const provinces = [
  "FE",
  "BO",
  "MO",
  "RA",
  "RO",
  "MN",
  "PD",
  "VR",
  "MI",
  "RM",
  "Altro",
];

export function ProfileDataForm({ email, profile }: ProfileDataFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setError("");
    setIsSaving(true);

    const form = new FormData(event.currentTarget);
    const firstName = normalize(form.get("first_name"));
    const lastName = normalize(form.get("last_name"));
    const marketingAccepted = form.get("marketing_accepted") === "on";
    const privacyAccepted = form.get("privacy_accepted") === "on";

    if (!privacyAccepted) {
      setError("Per salvare i dati è necessario accettare l'informativa privacy.");
      setIsSaving(false);
      return;
    }

    const supabase = createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("Sessione non valida. Accedi di nuovo e riprova.");
      setIsSaving(false);
      return;
    }

    const payload = {
      id: user.id,
      email: user.email ?? email ?? null,
      first_name: firstName,
      last_name: lastName,
      birth_date: normalize(form.get("birth_date")),
      biological_sex: normalize(form.get("biological_sex")),
      phone: normalize(form.get("phone")),
      fiscal_code: normalize(form.get("fiscal_code"))?.toUpperCase() ?? null,
      address: normalize(form.get("address")),
      street_number: normalize(form.get("street_number")),
      city: normalize(form.get("city")),
      postal_code: normalize(form.get("postal_code")),
      province: normalize(form.get("province")),
      privacy_accepted_at: profile?.privacy_accepted_at ?? new Date().toISOString(),
      marketing_accepted_at: marketingAccepted
        ? profile?.marketing_accepted_at ?? new Date().toISOString()
        : null,
    };

    const { error: updateProfileError } = await supabase
      .from("profiles")
      .upsert(payload, { onConflict: "id" });

    if (updateProfileError) {
      setError(updateProfileError.message);
      setIsSaving(false);
      return;
    }

    await supabase.auth.updateUser({
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    });

    setStatus("Dati salvati correttamente.");
    setIsSaving(false);
    router.refresh();
  }

  return (
    <section className="max-w-3xl">
      <h2 className="font-serif text-5xl leading-tight text-ink">I tuoi dati</h2>
      <p className="mt-3 text-lg leading-8 text-ink">
        Da qui potrai modificare i tuoi dati personali.
      </p>

      <p className="mt-7 text-base leading-7 text-ink">
        Codice donatore:{" "}
        <strong className="text-wine">
          {profile?.donor_code || "Non ancora assegnato"}
        </strong>
      </p>

      <form className="mt-8 grid gap-7" onSubmit={submit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nome">
            <input
              className={inputClass}
              name="first_name"
              defaultValue={profile?.first_name ?? ""}
              autoComplete="given-name"
            />
          </Field>
          <Field label="Cognome">
            <input
              className={inputClass}
              name="last_name"
              defaultValue={profile?.last_name ?? ""}
              autoComplete="family-name"
            />
          </Field>
        </div>

        <Divider />

        <div>
          <p className="text-base font-semibold text-ink">
            Fornisci data di nascita e sesso per eventuali funzionalità dedicate.
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Data di nascita" optional>
              <input
                className={inputClass}
                name="birth_date"
                type="date"
                defaultValue={profile?.birth_date ?? ""}
              />
            </Field>
            <Field label="Sesso biologico">
              <div className="flex min-h-12 items-center gap-5">
                {[
                  ["donna", "Donna"],
                  ["uomo", "Uomo"],
                ].map(([value, label]) => (
                  <label
                    className="inline-flex items-center gap-2 text-sm font-semibold text-wine"
                    key={value}
                  >
                    <input
                      className="size-4 accent-wine"
                      type="radio"
                      name="biological_sex"
                      value={value}
                      defaultChecked={profile?.biological_sex === value}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </Field>
          </div>
        </div>

        <Divider />

        <Field label="Cellulare" optional>
          <input
            className={`${inputClass} sm:max-w-sm`}
            name="phone"
            type="tel"
            defaultValue={profile?.phone ?? ""}
            autoComplete="tel"
          />
        </Field>

        <Divider />

        <div>
          <p className="max-w-2xl text-sm font-semibold leading-6 text-ink">
            Il codice fiscale è necessario per la deducibilità fiscale. I dati
            relativi alle donazioni effettuate con sistemi di pagamento
            tracciabili possono essere comunicati agli enti competenti secondo
            la normativa applicabile.
          </p>
          <Field className="mt-5" label="Codice fiscale">
            <input
              className={`${inputClass} uppercase sm:max-w-lg`}
              name="fiscal_code"
              defaultValue={profile?.fiscal_code ?? ""}
              autoComplete="off"
              maxLength={16}
            />
          </Field>
        </div>

        <Divider />

        <div>
          <p className="text-base font-semibold text-ink">
            Inserisci il tuo indirizzo
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_140px]">
            <Field label="Indirizzo" optional>
              <input
                className={inputClass}
                name="address"
                defaultValue={profile?.address ?? ""}
                autoComplete="address-line1"
              />
            </Field>
            <Field label="Civico" optional>
              <input
                className={inputClass}
                name="street_number"
                defaultValue={profile?.street_number ?? ""}
                autoComplete="address-line2"
              />
            </Field>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_140px]">
            <Field label="Città">
              <input
                className={inputClass}
                name="city"
                defaultValue={profile?.city ?? ""}
                autoComplete="address-level2"
              />
            </Field>
            <Field label="CAP" optional>
              <input
                className={inputClass}
                name="postal_code"
                defaultValue={profile?.postal_code ?? ""}
                autoComplete="postal-code"
                inputMode="numeric"
              />
            </Field>
          </div>
          <Field className="mt-5 sm:max-w-sm" label="Provincia" optional>
            <select
              className={`${inputClass} appearance-none`}
              name="province"
              defaultValue={profile?.province ?? ""}
              autoComplete="address-level1"
            >
              <option value="">Seleziona</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Divider />

        <div className="grid gap-5 text-sm leading-6 text-wine">
          <label className="flex items-start gap-3">
            <input
              className="mt-1 size-4 shrink-0 accent-wine"
              name="privacy_accepted"
              type="checkbox"
              defaultChecked={Boolean(profile?.privacy_accepted_at)}
              required
            />
            <span>
              Dichiaro di aver letto e compreso l&apos;informativa privacy sui
              trattamenti di dati personali effettuati da A-ROSE ODV.
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input
              className="mt-1 size-4 shrink-0 accent-wine"
              name="marketing_accepted"
              type="checkbox"
              defaultChecked={Boolean(profile?.marketing_accepted_at)}
            />
            <span>
              Acconsento a ricevere comunicazioni istituzionali, informative e
              aggiornamenti sulle iniziative di A-ROSE.
            </span>
          </label>
        </div>

        {status ? (
          <p className="rounded-2xl bg-rose-soft px-4 py-3 text-sm font-bold text-wine">
            {status}
          </p>
        ) : null}
        {error ? (
          <p className="rounded-2xl border border-rose px-4 py-3 text-sm font-bold text-rose">
            {error}
          </p>
        ) : null}

        <button
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-wine px-6 text-sm font-extrabold text-white transition hover:bg-wine-deep disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSaving}
          type="submit"
        >
          {isSaving ? "Salvataggio..." : "Modifica e salva i dati"}
          <Icon className="size-4" name="arrow" />
        </button>
      </form>
    </section>
  );
}

function Field({
  label,
  optional,
  className = "",
  children,
}: {
  label: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`grid gap-2 text-sm font-bold text-wine ${className}`}>
      <span>
        {label}{" "}
        {optional ? (
          <span className="text-[11px] font-semibold uppercase tracking-wide text-wine/45">
            (opzionale)
          </span>
        ) : null}
      </span>
      {children}
    </label>
  );
}

function Divider() {
  return <hr className="border-line" />;
}

function normalize(value: FormDataEntryValue | null) {
  const text = typeof value === "string" ? value.trim() : "";
  return text || null;
}
