"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Icon } from "@/components/home/icons";

const fieldClass =
  "min-h-12 w-full border border-line bg-white px-4 py-3 text-ink outline-none transition placeholder:text-muted/60 focus:border-wine focus:ring-2 focus:ring-rose-soft";

const projectOptions = [
  "Ricerca oncologica traslazionale",
  "Formazione specialistica",
  "Prevenzione e divulgazione",
  "Attività generali A-ROSE",
] as const;

const imageOptions = [
  {
    id: "cuore",
    label: "Cuore solidale",
    className: "from-rose-soft to-white",
  },
  {
    id: "ricerca",
    label: "Ricerca",
    className: "from-[#f6d8dd] to-[#fff8f5]",
  },
  {
    id: "comunita",
    label: "Comunità",
    className: "from-[#eadbd2] to-white",
  },
] as const;

type FundraisingCampaignFormProps = {
  occasion?: string;
};

export function FundraisingCampaignForm({ occasion }: FundraisingCampaignFormProps) {
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const readableOccasion = occasion ?? "Raccolta fondi";

  const defaultTitle = useMemo(
    () => `La mia raccolta per A-ROSE${occasion ? ` - ${occasion}` : ""}`,
    [occasion],
  );

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("campaignTitle") || defaultTitle).trim();
    const params = new URLSearchParams({
      tipo: "raccolta",
      campagna: title,
      occasione: readableOccasion,
    });
    const origin = window.location.origin;
    setGeneratedLink(`${origin}/donazione?${params.toString()}#checkout`);
    setCopied(false);
  }

  async function copyLink() {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
  }

  return (
    <div className="grid gap-8">
      <section className="rounded-3xl border border-line bg-paper p-6 sm:p-8">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">
          Accesso richiesto
        </p>
        <h2 className="mt-3 font-serif text-3xl font-normal text-ink">
          Prima di pubblicare la raccolta serve un profilo.
        </h2>
        <p className="mt-4 text-sm leading-7 text-muted">
          In produzione questo passaggio dovrà essere collegato all’area
          personale: chi crea la raccolta deve accedere, gestire il link e
          seguirne l’andamento. Qui puoi già compilare il modello e generare il
          link di donazione.
        </p>
        <a
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-wine px-6 text-sm font-bold text-wine transition hover:bg-wine hover:text-white"
          href="/area-personale"
        >
          Accedi / registrati
        </a>
      </section>

      <form className="grid gap-8" onSubmit={submit}>
        <section className="grid gap-5 border-b border-line pb-8">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">
              Stai creando una raccolta per
            </p>
            <h2 className="mt-2 font-serif text-4xl font-normal leading-tight text-ink">
              {readableOccasion}
            </h2>
          </div>
          <label className="grid gap-2 text-sm font-bold text-ink">
            Titolo della raccolta*
            <input
              className={fieldClass}
              name="campaignTitle"
              defaultValue={defaultTitle}
              maxLength={120}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-ink">
            Perché hai scelto questa occasione?*
            <textarea
              className={`${fieldClass} min-h-40 resize-y`}
              name="campaignDescription"
              maxLength={1500}
              placeholder="Racconta in poche righe perché vuoi trasformare questo momento in un gesto di solidarietà."
              required
            />
            <span className="text-xs font-normal text-muted">
              Testo consigliato: breve, personale e chiaro. Sarà utile per
              presentare la raccolta quando condividi il link.
            </span>
          </label>
        </section>

        <section className="grid gap-5 border-b border-line pb-8 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-ink">
            Obiettivo di raccolta*
            <input
              className={fieldClass}
              name="goal"
              type="number"
              min="1"
              inputMode="numeric"
              placeholder="Es. 5000"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-ink">
            Data di fine raccolta*
            <input className={fieldClass} name="endDate" type="date" required />
          </label>
          <label className="grid gap-2 text-sm font-bold text-ink sm:col-span-2">
            Progetto da sostenere*
            <select className={fieldClass} name="project" required>
              <option value="">Seleziona un progetto</option>
              {projectOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-ink">
            Nome del festeggiato o referente*
            <input className={fieldClass} name="ownerName" required />
          </label>
          <label className="grid gap-2 text-sm font-bold text-ink">
            Regione o luogo dell’evento{" "}
            <span className="font-normal text-muted">(facoltativo)</span>
            <input className={fieldClass} name="region" />
          </label>
        </section>

        <section className="grid gap-5 border-b border-line pb-8">
          <div>
            <h3 className="font-serif text-3xl font-normal text-ink">
              Scegli un’immagine per la raccolta*
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              Potrai sostituirla con una foto reale quando la gestione profilo
              sarà collegata.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {imageOptions.map((option) => (
              <label className="cursor-pointer" key={option.id}>
                <input
                  className="peer sr-only"
                  type="radio"
                  name="campaignImage"
                  value={option.id}
                  required
                />
                <span
                  className={`grid aspect-[1.25] place-items-center rounded-2xl border border-line bg-gradient-to-br ${option.className} p-5 text-center font-serif text-xl text-wine transition peer-checked:border-wine peer-checked:ring-4 peer-checked:ring-rose-soft`}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
          <label className="grid gap-2 text-sm font-bold text-ink">
            Video YouTube o Vimeo{" "}
            <span className="font-normal text-muted">(facoltativo)</span>
            <input className={fieldClass} name="videoUrl" type="url" />
          </label>
        </section>

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs leading-6 text-muted">* Campo obbligatorio</p>
          <button
            className="inline-flex min-h-13 items-center justify-center rounded-full bg-wine px-10 font-bold text-white transition hover:bg-wine-deep"
            type="submit"
          >
            Genera il link
          </button>
        </div>
      </form>

      {generatedLink ? (
        <section
          className="rounded-3xl border border-wine/25 bg-rose-soft p-6 sm:p-8"
          aria-live="polite"
        >
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-wine">
            Link generato
          </p>
          <h2 className="mt-3 font-serif text-3xl font-normal text-ink">
            Condividi questa raccolta.
          </h2>
          <p className="mt-4 break-all rounded-2xl bg-white p-4 font-mono text-xs leading-6 text-muted">
            {generatedLink}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-wine px-6 text-sm font-bold text-white"
              type="button"
              onClick={copyLink}
            >
              {copied ? "Link copiato" : "Copia link"}
            </button>
            <a
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-wine px-6 text-sm font-bold text-wine"
              href={generatedLink}
            >
              Apri pagina donazione <Icon className="size-4" name="arrow" />
            </a>
          </div>
        </section>
      ) : null}
    </div>
  );
}
