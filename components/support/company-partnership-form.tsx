"use client";

import type { FormEvent } from "react";

const fieldClass =
  "min-h-12 w-full border border-line bg-white px-4 py-3 text-ink outline-none transition placeholder:text-muted/60 focus:border-wine focus:ring-2 focus:ring-rose-soft";

export function CompanyPartnershipForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const company = String(data.get("company") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const collaboration = String(data.get("collaboration") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent(
      `Richiesta collaborazione aziendale${company ? ` — ${company}` : ""}`,
    );
    const body = encodeURIComponent(
      [
        "Buongiorno A-ROSE,",
        "",
        "vorrei ricevere informazioni sulle possibilità di collaborazione aziendale.",
        "",
        `Azienda: ${company}`,
        `Referente: ${name}`,
        `Email: ${email}`,
        `Telefono: ${phone || "Non indicato"}`,
        `Modalità di interesse: ${collaboration}`,
        "",
        "Messaggio:",
        message,
      ].join("\n"),
    );

    window.location.href = `mailto:info@a-roseodv.org?subject=${subject}&body=${body}`;
  }

  return (
    <form className="grid gap-5" onSubmit={submit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-ink">
          Azienda / organizzazione
          <input className={fieldClass} name="company" autoComplete="organization" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-ink">
          Nome referente
          <input className={fieldClass} name="name" autoComplete="name" required />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-ink">
          Email
          <input className={fieldClass} name="email" type="email" autoComplete="email" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-ink">
          Telefono <span className="font-normal text-muted">(facoltativo)</span>
          <input className={fieldClass} name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-bold text-ink">
        Modalità di collaborazione
        <select className={fieldClass} name="collaboration" required defaultValue="">
          <option value="" disabled>
            Seleziona una modalità
          </option>
          <option value="Donazione aziendale">Donazione aziendale</option>
          <option value="Cause related marketing">Cause related marketing</option>
          <option value="Sponsorizzazione evento o iniziativa">
            Sponsorizzazione evento o iniziativa
          </option>
          <option value="Payroll giving / coinvolgimento dipendenti">
            Coinvolgimento dipendenti
          </option>
          <option value="Collaborazione territoriale">Collaborazione territoriale</option>
          <option value="Altro">Altro</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm font-bold text-ink">
        Raccontaci l’idea o l’esigenza
        <textarea
          className={`${fieldClass} min-h-36 resize-y`}
          name="message"
          placeholder="Ad esempio: campagna solidale, evento aziendale, prodotto dedicato, iniziativa con dipendenti..."
          required
        />
      </label>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-muted">
        <input className="mt-0.5 size-4 shrink-0 accent-wine" type="checkbox" required />
        Acconsento al trattamento dei dati personali ai sensi del Regolamento UE 2016/679.
      </label>

      <button
        className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-wine px-8 font-bold text-white transition hover:bg-wine-deep sm:w-fit"
        type="submit"
      >
        Prepara la richiesta
      </button>

      <p className="text-xs leading-relaxed text-muted">
        Il pulsante apre il programma email del dispositivo: nessun dato viene salvato dal sito.
      </p>
    </form>
  );
}
