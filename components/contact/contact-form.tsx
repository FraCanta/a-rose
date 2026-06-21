"use client";

import type { FormEvent } from "react";

const fieldClass =
  "min-h-12 w-full border border-line bg-white px-4 py-3 text-ink outline-none transition placeholder:text-muted/60 focus:border-wine focus:ring-2 focus:ring-rose-soft";

export function ContactForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Richiesta dal sito A-ROSE — ${name}`);
    const body = encodeURIComponent(`${message}\n\nNome: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:info@a-roseodv.org?subject=${subject}&body=${body}`;
  }

  return (
    <form className="grid gap-5" onSubmit={submit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-ink">
          Nome
          <input className={fieldClass} name="name" autoComplete="name" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-ink">
          Email
          <input className={fieldClass} name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-bold text-ink">
        Messaggio
        <textarea className={`${fieldClass} min-h-44 resize-y`} name="message" required />
      </label>
      <label className="flex items-start gap-3 text-xs leading-relaxed text-muted">
        <input className="mt-0.5 size-4 accent-wine" type="checkbox" required />
        Acconsento al trattamento dei dati personali ai sensi del Regolamento UE 2016/679.
      </label>
      <button
        className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-wine px-8 font-bold text-white transition hover:bg-wine-deep sm:w-fit"
        type="submit"
      >
        Prepara il messaggio
      </button>
      <p className="text-xs leading-relaxed text-muted">
        Il pulsante apre il programma email del dispositivo: nessun dato viene salvato dal sito.
      </p>
    </form>
  );
}
