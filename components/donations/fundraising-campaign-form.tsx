"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Icon } from "@/components/home/icons";
import { createClient } from "@/utils/supabase/client";

const fieldClass =
  "min-h-12 w-full border border-line bg-white px-4 py-3 text-ink outline-none transition placeholder:text-muted/60 focus:border-wine focus:ring-2 focus:ring-rose-soft";

const projectOptions = [
  "Ricerca oncologica traslazionale",
  "Formazione specialistica",
  "Prevenzione e divulgazione",
  "AttivitÃ  generali A-ROSE",
] as const;

const imageOptions = [
  {
    id: "compleanno",
    label: "Compleanno",
    image: "/images/fundraising-covers/compleanno.svg",
  },
  {
    id: "matrimonio",
    label: "Matrimonio",
    image: "/images/fundraising-covers/matrimonio.svg",
  },
  {
    id: "memoria",
    label: "In memoria",
    image: "/images/fundraising-covers/memoria.svg",
  },
  {
    id: "comunita",
    label: "Comunità",
    image: "/images/fundraising-covers/comunita.svg",
  },
] as const;

type FundraisingCampaignFormProps = {
  occasion?: string;
};

export function FundraisingCampaignForm({
  occasion,
}: FundraisingCampaignFormProps) {
  const router = useRouter();
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCover, setSelectedCover] = useState<
    (typeof imageOptions)[number]["id"] | "custom"
  >("compleanno");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const readableOccasion = occasion ?? "Raccolta fondi";

  const defaultTitle = useMemo(
    () => `La mia raccolta per A-ROSE${occasion ? ` - ${occasion}` : ""}`,
    [occasion],
  );

  useEffect(() => {
    return () => {
      if (uploadedPreview) URL.revokeObjectURL(uploadedPreview);
    };
  }, [uploadedPreview]);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) setIsLoggedIn(Boolean(data.user));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session?.user));
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (uploadedPreview) URL.revokeObjectURL(uploadedPreview);

    setUploadedPreview(URL.createObjectURL(file));
    setUploadedFile(file);
    setUploadedFileName(file.name);
    setSelectedCover("custom");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setStatusMessage("");
    setCopied(false);
    setIsSubmitting(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const redirectTo = encodeURIComponent(
        `${window.location.pathname}${window.location.search}`,
      );
      setIsSubmitting(false);
      router.push(`/area-personale?redirectTo=${redirectTo}`);
      return;
    }

    const form = new FormData(event.currentTarget);
    const title = String(form.get("campaignTitle") || defaultTitle).trim();
    const description = String(form.get("campaignDescription") || "").trim();
    const goal = Number(form.get("goal"));
    const endDate = String(form.get("endDate") || "");
    const project = String(form.get("project") || "");
    const ownerName = String(form.get("ownerName") || "").trim();
    const region = String(form.get("region") || "").trim();
    const videoUrl = String(form.get("videoUrl") || "").trim();
    const slug = createCampaignSlug(title);

    try {
      let coverStoragePath: string | null = null;
      let coverUrl: string | null = null;

      if (selectedCover === "custom" && uploadedFile) {
        const extension = getSafeExtension(uploadedFile.name);
        coverStoragePath = `${user.id}/${slug}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from("fundraising-covers")
          .upload(coverStoragePath, uploadedFile, {
            cacheControl: "31536000",
            upsert: true,
          });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("fundraising-covers")
          .getPublicUrl(coverStoragePath);

        coverUrl = data.publicUrl;
      }

      const { error: insertError } = await supabase
        .from("fundraising_campaigns")
        .insert({
          owner_id: user.id,
          slug,
          title,
          description,
          occasion: normalizeOccasionForDatabase(readableOccasion),
          honoree_name: ownerName,
          project_label: project,
          goal_cents: Math.round(goal * 100),
          end_date: endDate || null,
          region: region || null,
          video_url: videoUrl || null,
          cover_type: selectedCover === "custom" ? "custom" : "preset",
          cover_preset: selectedCover === "custom" ? null : selectedCover,
          cover_storage_path: coverStoragePath,
          cover_url: coverUrl,
          status: "published",
          published_at: new Date().toISOString(),
        });

      if (insertError) throw insertError;

      const publicLink = `${window.location.origin}/raccolte/${slug}`;
      setGeneratedLink(publicLink);
      setStatusMessage("Raccolta pubblicata. Ora puoi condividere il link.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Non è stato possibile creare la raccolta. Riprova.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function copyLink() {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
  }

  return (
    <div className="grid gap-8">
      {isLoggedIn === false ? (
        <section className="rounded-3xl border border-line bg-paper p-6 sm:p-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">
            Accesso richiesto
          </p>
          <h2 className="mt-3 font-serif text-3xl font-normal text-ink">
            Prima di pubblicare la raccolta serve un profilo.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Puoi compilare il modulo. Al momento della pubblicazione, se non hai
            ancora effettuato l’accesso, ti porteremo alla pagina Accedi /
            Registrati e poi potrai completare la creazione.
          </p>
          <a
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-wine px-6 text-sm font-bold text-wine transition hover:bg-wine hover:text-white"
            href="/area-personale"
          >
            Accedi / registrati
          </a>
        </section>
      ) : null}

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
            PerchÃ© hai scelto questa occasione?*
            <textarea
              className={`${fieldClass} min-h-40 resize-y`}
              name="campaignDescription"
              maxLength={1500}
              placeholder="Racconta in poche righe perchÃ© vuoi trasformare questo momento in un gesto di solidarietÃ ."
              required
            />
            <span className="text-xs font-normal text-muted">
              Testo consigliato: breve, personale e chiaro. SarÃ  utile per
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
            Regione o luogo dellâ€™evento{" "}
            <span className="font-normal text-muted">(facoltativo)</span>
            <input className={fieldClass} name="region" />
          </label>
        </section>

        <section className="grid gap-5 border-b border-line pb-8">
          <div>
            <h3 className="font-serif text-3xl font-normal text-ink">
              Scegli unâ€™immagine per la raccolta*
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              Scegli una cover pronta oppure carica una tua immagine personale.
              L’anteprima è immediata; in produzione il file andrà salvato
              nell’area personale o nello storage collegato.
            </p>
          </div>
          <input name="campaignImage" type="hidden" value={selectedCover} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {imageOptions.map((option) => (
              <label className="cursor-pointer" key={option.id}>
                <input
                  className="peer sr-only"
                  type="radio"
                  name="campaignImageChoice"
                  value={option.id}
                  checked={selectedCover === option.id}
                  onChange={() => setSelectedCover(option.id)}
                />
                <span className="relative block aspect-[1.35] overflow-hidden rounded-2xl border border-line bg-white transition peer-checked:border-wine peer-checked:ring-4 peer-checked:ring-rose-soft peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rose">
                  <Image
                    className="object-cover"
                    src={option.image}
                    alt={`Cover raccolta fondi: ${option.label}`}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                  />
                </span>
              </label>
            ))}
          </div>
          <div className="grid gap-4 rounded-3xl border border-dashed border-rose bg-rose-soft/35 p-5 sm:grid-cols-[minmax(0,1fr)_220px] sm:items-center">
            <div>
              <h4 className="font-serif text-2xl font-normal text-ink">
                Vuoi usare una foto personale?
              </h4>
              <p className="mt-2 text-sm leading-7 text-muted">
                Carica un’immagine orizzontale, idealmente almeno 1200×800 px.
                Formati supportati: JPG, PNG o WebP.
              </p>
              {uploadedFileName ? (
                <p className="mt-3 text-xs font-bold text-wine">
                  Immagine selezionata: {uploadedFileName}
                </p>
              ) : null}
            </div>
            <div className="grid gap-3">
              <label className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full bg-wine px-6 text-sm font-bold text-white transition hover:bg-wine-deep">
                Carica immagine
                <input
                  className="sr-only"
                  type="file"
                  name="customCampaignImage"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                />
              </label>
              {uploadedPreview ? (
                <div className="relative aspect-[1.35] overflow-hidden rounded-2xl border border-wine bg-white">
                  <Image
                    className="object-cover"
                    src={uploadedPreview}
                    alt="Anteprima immagine personale caricata"
                    fill
                    unoptimized
                  />
                </div>
              ) : null}
            </div>
          </div>
          <label className="grid gap-2 text-sm font-bold text-ink">
            Video YouTube o Vimeo{" "}
            <span className="font-normal text-muted">(facoltativo)</span>
            <input className={fieldClass} name="videoUrl" type="url" />
          </label>
        </section>

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs leading-6 text-muted">* Campo obbligatorio</p>
          {statusMessage ? (
            <p className="rounded-2xl bg-rose-soft px-4 py-3 text-sm font-bold text-wine" role="status">
              {statusMessage}
            </p>
          ) : null}
          {errorMessage ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700" role="alert">
              {errorMessage}
            </p>
          ) : null}
          <button
            className="inline-flex min-h-13 items-center justify-center rounded-full bg-wine px-10 font-bold text-white transition hover:bg-wine-deep disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Pubblicazione..." : "Pubblica la raccolta"}
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
              Apri la raccolta <Icon className="size-4" name="arrow" />
            </a>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function createCampaignSlug(title: string) {
  const base = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 72);

  return `${base || "raccolta"}-${Date.now().toString(36)}`;
}

function getSafeExtension(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase();
  if (extension === "png" || extension === "webp") return extension;
  return "jpg";
}

function normalizeOccasionForDatabase(value: string) {
  const normalized = value.toLowerCase().replaceAll(" ", "_").replaceAll("-", "_");

  if (normalized.includes("compleanno")) return "compleanno";
  if (normalized.includes("battesimo")) return "battesimo";
  if (normalized.includes("matrimonio")) return "matrimonio";
  if (normalized.includes("memoria")) return "memoria";
  if (normalized.includes("sportivo")) return "evento_sportivo";
  if (normalized.includes("iscrizione")) return "evento_iscrizione";
  if (normalized.includes("personale")) return "raccolta_personale";
  if (normalized.includes("ricevi")) return "dona_e_ricevi";

  return "altro";
}
