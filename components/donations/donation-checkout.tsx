"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo, useState, type FormEvent } from "react";
import { Icon } from "@/components/home/icons";

type DonationCheckoutProps = { publishableKey: string };

const fieldClass =
  "min-h-12 w-full border border-line bg-white px-4 py-3 text-ink outline-none transition placeholder:text-muted/60 focus:border-wine focus:ring-2 focus:ring-rose-soft";
const amounts = [10, 25, 50, 100, 250, 500] as const;

export function DonationCheckout({ publishableKey }: DonationCheckoutProps) {
  const stripePromise = useMemo(
    () => (publishableKey ? loadStripe(publishableKey) : null),
    [publishableKey],
  );
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(50);
  const [customAmount, setCustomAmount] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const data = new FormData(event.currentTarget);
    const amount = selectedAmount === "custom" ? Number(customAmount) : selectedAmount;

    try {
      const response = await fetch("/api/donations/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          company: data.get("company"),
          comment: data.get("comment"),
          anonymous: data.get("anonymous") === "on",
          consent: data.get("consent") === "on",
          website: data.get("website"),
        }),
      });
      const payload = (await response.json()) as { clientSecret?: string; error?: string };
      if (!response.ok || !payload.clientSecret) {
        throw new Error(payload.error ?? "Impossibile avviare il pagamento");
      }
      setClientSecret(payload.clientSecret);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Impossibile avviare il pagamento");
    } finally {
      setPending(false);
    }
  }

  if (!publishableKey || !stripePromise) {
    return (
      <div className="border border-coral/35 bg-[#fff7f3] p-6 text-sm leading-relaxed text-muted" role="status">
        <strong className="block text-ink">Pagamento online in configurazione</strong>
        Il modulo sarà disponibile dopo aver configurato le chiavi Stripe. Nel frattempo puoi usare il bonifico indicato qui sotto.
      </div>
    );
  }

  if (clientSecret) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">Pagamento sicuro</p>
            <h3 className="mt-1 font-serif text-2xl font-normal text-ink">Completa la donazione</h3>
          </div>
          <button className="text-xs font-bold text-wine underline underline-offset-4" type="button" onClick={() => setClientSecret(null)}>
            Modifica dati
          </button>
        </div>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    );
  }

  return (
    <form className="grid gap-7" onSubmit={submit} noValidate>
      <fieldset>
        <legend className="text-sm font-bold text-ink">Importo della donazione</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {amounts.map((amount) => (
            <label className="cursor-pointer" key={amount}>
              <input className="peer sr-only" type="radio" name="amountChoice" checked={selectedAmount === amount} onChange={() => setSelectedAmount(amount)} />
              <span className="grid min-h-12 place-items-center border border-line bg-white font-serif text-lg text-wine transition peer-checked:border-wine peer-checked:bg-wine peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rose">{amount} €</span>
            </label>
          ))}
        </div>
        <label className="mt-2 block cursor-pointer">
          <input className="peer sr-only" type="radio" name="amountChoice" checked={selectedAmount === "custom"} onChange={() => setSelectedAmount("custom")} />
          <span className="grid min-h-12 place-items-center border border-line bg-white text-sm font-bold text-wine transition peer-checked:border-wine peer-checked:bg-rose-soft peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rose">Importo libero</span>
        </label>
        {selectedAmount === "custom" ? (
          <label className="mt-3 grid gap-2 text-sm font-bold text-ink">
            Importo in euro
            <input className={fieldClass} type="number" min="1" max="100000" step="0.01" inputMode="decimal" value={customAmount} onChange={(event) => setCustomAmount(event.target.value)} required />
          </label>
        ) : null}
      </fieldset>

      <fieldset className="grid gap-5 border-t border-line pt-6">
        <legend className="px-2 text-sm font-bold text-ink">I tuoi dati</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-ink">Nome<input className={fieldClass} name="firstName" autoComplete="given-name" required /></label>
          <label className="grid gap-2 text-sm font-bold text-ink">Cognome<input className={fieldClass} name="lastName" autoComplete="family-name" /></label>
        </div>
        <label className="grid gap-2 text-sm font-bold text-ink">Email<input className={fieldClass} name="email" type="email" autoComplete="email" required /></label>
        <label className="grid gap-2 text-sm font-bold text-ink">Azienda <span className="font-normal text-muted">(facoltativa)</span><input className={fieldClass} name="company" autoComplete="organization" /></label>
        <label className="grid gap-2 text-sm font-bold text-ink">Commento <span className="font-normal text-muted">(facoltativo)</span><textarea className={`${fieldClass} min-h-28 resize-y`} name="comment" maxLength={500} /></label>
      </fieldset>

      <div className="grid gap-4 border-t border-line pt-6">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
          <input className="mt-1 size-4 shrink-0 accent-wine" type="checkbox" name="anonymous" />
          Rendi anonima la donazione nelle comunicazioni pubbliche.
        </label>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
          <input className="mt-1 size-4 shrink-0 accent-wine" type="checkbox" name="consent" required />
          Accetto che i dati siano trattati per gestire la donazione, emettere la ricevuta e adempiere agli obblighi amministrativi.
        </label>
        <label className="sr-only" aria-hidden="true">Sito web<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {error ? <p className="border-l-2 border-coral bg-[#fff7f3] p-4 text-sm text-wine" role="alert">{error}</p> : null}
      <button className="inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-full bg-wine px-8 font-bold text-white transition hover:bg-wine-deep disabled:cursor-wait disabled:opacity-65" type="submit" disabled={pending}>
        {pending ? "Preparazione del pagamento…" : "Continua al pagamento"}
        <Icon className="size-5" name="heart" />
      </button>
      <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
        <Icon className="mt-0.5 size-4 shrink-0 text-rose" name="shield" />
        I dati della carta vengono gestiti esclusivamente da Stripe e non transitano sui server A-ROSE.
      </p>
    </form>
  );
}
