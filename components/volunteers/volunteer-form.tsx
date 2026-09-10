"use client";

import Link from "next/link";
import { primaryButton } from "@/components/home/styles";
import { useState, type FormEvent } from "react";

const fieldClass = "min-h-12 w-full border border-line bg-white px-4 py-3 text-ink focus:border-wine";

export function VolunteerForm() {
  const [prepared, setPrepared] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const read = (name: string) => String(data.get(name) ?? "").trim();
    const subject = encodeURIComponent(`Candidatura volontariato A-ROSE — ${read("firstName")} ${read("lastName")}`);
    const body = encodeURIComponent([
      "Vorrei conoscere le possibilità di volontariato con A-ROSE.",
      `Nome: ${read("firstName")}`, `Cognome: ${read("lastName")}`,
      `Email: ${read("email")}`, `Telefono: ${read("phone") || "Non indicato"}`,
      `Località: ${read("city")}`, `Disponibilità: ${read("availability") || "Da concordare"}`,
      "", read("message"),
    ].join("\n"));
    window.location.href = `mailto:info@a-roseodv.org?subject=${subject}&body=${body}`;
    setPrepared(true);
  }

  return (
    <form onSubmit={submit} className="mt-10 grid gap-6" aria-describedby="volunteer-form-note">
      <p className="text-sm leading-relaxed text-muted" id="volunteer-form-note">
        I campi con * sono obbligatori. Il pulsante prepara un’email: dovrai inviarla
        dal tuo programma di posta. Il sito non salva questi dati.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-ink">Nome *<input className={fieldClass} name="firstName" autoComplete="given-name" maxLength={80} required /></label>
        <label className="grid gap-2 text-sm text-ink">Cognome *<input className={fieldClass} name="lastName" autoComplete="family-name" maxLength={80} required /></label>
        <label className="grid gap-2 text-sm text-ink">Email *<input className={fieldClass} name="email" type="email" autoComplete="email" maxLength={160} required /></label>
        <label className="grid gap-2 text-sm text-ink">Telefono (facoltativo)<input className={fieldClass} name="phone" type="tel" autoComplete="tel" maxLength={30} /></label>
        <label className="grid gap-2 text-sm text-ink">Località *<input className={fieldClass} name="city" autoComplete="address-level2" maxLength={100} required /></label>
        <label className="grid gap-2 text-sm text-ink">Disponibilità (facoltativa)<input className={fieldClass} name="availability" placeholder="Es. nel fine settimana" maxLength={120} /></label>
      </div>
      <label className="grid gap-2 text-sm text-ink">Raccontaci qualcosa di te *
        <textarea className={`${fieldClass} min-h-40 resize-y`} name="message" maxLength={1000} required aria-describedby="volunteer-message-help" />
        <span id="volunteer-message-help" className="text-xs leading-relaxed text-muted">Interessi, competenze e come vorresti contribuire. Non inserire informazioni sanitarie o altri dati sensibili. Massimo 1.000 caratteri.</span>
      </label>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
        <input className="mt-1 size-4 shrink-0 accent-wine" type="checkbox" required />
        <span>Ho letto l’<Link href="/privacy-policy" className="text-wine underline underline-offset-4">informativa privacy</Link>. *</span>
      </label>
      <button type="submit" className={`${primaryButton} sm:justify-self-start`}>Prepara la candidatura via email →</button>
      <p role="status" className="text-sm leading-relaxed text-wine">
        {prepared ? "Messaggio preparato. Completa l’invio nel programma di posta: la candidatura non è stata inviata automaticamente. Se non si è aperto, scrivi all’indirizzo qui sotto." : ""}
      </p>
      <p className="text-sm leading-relaxed text-muted">Preferisci scriverci direttamente? <a className="break-all text-wine underline underline-offset-4" href="mailto:info@a-roseodv.org">info@a-roseodv.org</a></p>
    </form>
  );
}
