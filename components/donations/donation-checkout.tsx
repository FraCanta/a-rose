"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/home/icons";

export type DonationCheckoutType = "generale" | "regalo" | "raccolta";

type DonationCheckoutProps = {
  publishableKey?: string;
  donationType?: DonationCheckoutType;
  occasion?: string;
  campaignName?: string;
  initialAmount?: number | "custom";
};

const fieldClass =
  "min-h-12 w-full border border-line bg-white px-4 py-3 text-ink outline-none transition placeholder:text-muted/60 focus:border-wine focus:ring-2 focus:ring-rose-soft";
const amounts = [10, 25, 50, 100, 250, 500] as const;
const giftOccasions = [
  "Compleanno",
  "Matrimonio",
  "Anniversario",
  "Laurea",
  "Natale",
  "In memoria",
  "Altro",
] as const;
const giftCards = [
  { id: "rosa", label: "Rosa A-ROSE", className: "from-rose-soft to-white" },
  { id: "ricerca", label: "Ricerca", className: "from-[#f6d8dd] to-[#fff8f5]" },
  { id: "speranza", label: "Speranza", className: "from-[#eadbd2] to-white" },
] as const;

function StepLabel({ number, title }: { number: number; title: string }) {
  return (
    <div className="mb-5 grid grid-cols-[auto_1fr] items-center gap-4">
      <span className="grid size-8 place-items-center rounded-full bg-rose-soft text-sm font-extrabold text-wine">
        {number}
      </span>
      <h3 className="font-serif text-2xl font-normal text-ink">{title}</h3>
    </div>
  );
}

export function DonationCheckout({
  donationType = "generale",
  occasion,
  campaignName,
  initialAmount,
}: DonationCheckoutProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(
    initialAmount ?? (donationType === "regalo" ? 40 : 50),
  );
  const [customAmount, setCustomAmount] = useState("");
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
          donationType,
          occasion: occasion ?? data.get("giftOccasion"),
          campaignName: campaignName ?? data.get("campaignName"),
          donationFrequency: data.get("donationFrequency"),
          giftSenderName: data.get("giftSenderName"),
          giftRecipient: data.get("giftRecipient"),
          giftRecipientEmail: data.get("giftRecipientEmail"),
          giftCardStyle: data.get("giftCardStyle"),
          sendDate: data.get("sendDate"),
          dedicationMessage: data.get("dedicationMessage"),
          hideGiftAmount: data.get("hideGiftAmount") === "on",
          sendGiftCopy: data.get("sendGiftCopy") === "on",
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          company: data.get("company"),
          fiscalCode: data.get("fiscalCode"),
          phone: data.get("phone"),
          birthDate: data.get("birthDate"),
          address: data.get("address"),
          city: data.get("city"),
          postalCode: data.get("postalCode"),
          province: data.get("province"),
          comment: data.get("comment"),
          anonymous: data.get("anonymous") === "on",
          consent: data.get("consent") === "on",
          website: data.get("website"),
        }),
      });
      const payload = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !payload.url) {
        throw new Error(payload.error ?? "Impossibile avviare il pagamento");
      }
      window.location.assign(payload.url);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Impossibile avviare il pagamento");
    } finally {
      setPending(false);
    }
  }

  if (process.env.NEXT_PUBLIC_DISABLE_DONATION_FORM === "1") {
    return (
      <div className="border border-coral/35 bg-[#fff7f3] p-6 text-sm leading-relaxed text-muted" role="status">
        <strong className="block text-ink">Pagamento online in configurazione</strong>
        Il modulo sarà disponibile dopo aver configurato le chiavi Stripe. Nel frattempo puoi usare il bonifico indicato qui sotto.
      </div>
    );
  }

  if (process.env.NEXT_PUBLIC_DISABLE_DONATION_FORM === "embedded") {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">Pagamento sicuro</p>
            <h3 className="mt-1 font-serif text-2xl font-normal text-ink">Completa la donazione</h3>
          </div>
          <button className="text-xs font-bold text-wine underline underline-offset-4" type="button" onClick={() => undefined}>
            Modifica dati
          </button>
        </div>
        <div />
      </div>
    );
  }

  if (donationType === "regalo") {
    return (
      <form className="grid gap-10" onSubmit={submit} noValidate>
        <section className="border-b border-line pb-8">
          <StepLabel number={1} title="La tua buona occasione" />
          <label className="grid gap-2 text-sm font-bold text-ink">
            Occasione*
            <select className={fieldClass} name="giftOccasion" defaultValue={occasion ?? ""} required>
              <option value="">Seleziona un’occasione</option>
              {giftOccasions.map((giftOccasion) => (
                <option key={giftOccasion}>{giftOccasion}</option>
              ))}
            </select>
          </label>
        </section>

        <section className="border-b border-line pb-8">
          <StepLabel number={2} title="La tua donazione" />
          <fieldset>
            <legend className="sr-only">Importo della donazione</legend>
            <div className="mb-5 flex flex-wrap gap-5 text-sm text-muted">
              {["Singola", "Mensile", "Annuale"].map((frequency) => (
                <label className="inline-flex items-center gap-2" key={frequency}>
                  <input
                    className="size-3.5 accent-wine"
                    type="radio"
                    name="donationFrequency"
                    value={frequency}
                    defaultChecked={frequency === "Singola"}
                  />
                  {frequency}
                </label>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[40, 70, 100].map((amount) => (
                <label className="cursor-pointer" key={amount}>
                  <input
                    className="peer sr-only"
                    type="radio"
                    name="amountChoice"
                    checked={selectedAmount === amount}
                    onChange={() => setSelectedAmount(amount)}
                  />
                  <span className="grid min-h-14 place-items-center border border-line bg-white font-serif text-2xl text-wine transition peer-checked:border-wine peer-checked:bg-wine peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rose">
                    {amount} €
                  </span>
                </label>
              ))}
            </div>
            <label className="mt-3 block cursor-pointer">
              <input
                className="peer sr-only"
                type="radio"
                name="amountChoice"
                checked={selectedAmount === "custom"}
                onChange={() => setSelectedAmount("custom")}
              />
              <span className="grid min-h-12 place-items-center border border-line bg-white text-sm font-bold text-wine transition peer-checked:border-wine peer-checked:bg-rose-soft peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rose">
                Importo libero
              </span>
            </label>
            {selectedAmount === "custom" ? (
              <label className="mt-3 grid gap-2 text-sm font-bold text-ink">
                Importo in euro
                <input
                  className={fieldClass}
                  type="number"
                  min="1"
                  max="100000"
                  step="0.01"
                  inputMode="decimal"
                  value={customAmount}
                  onChange={(event) => setCustomAmount(event.target.value)}
                  required
                />
              </label>
            ) : null}
            <label className="mt-3 grid gap-2 text-sm font-bold text-ink">
              Progetto sostenuto*
              <select className={fieldClass} name="comment" required>
                <option value="">Seleziona un progetto</option>
                <option value="Regalo solidale - ricerca oncologica traslazionale">
                  Ricerca oncologica traslazionale
                </option>
                <option value="Regalo solidale - formazione specialistica">
                  Formazione specialistica
                </option>
                <option value="Regalo solidale - prevenzione e divulgazione">
                  Prevenzione e divulgazione
                </option>
              </select>
            </label>
          </fieldset>
        </section>

        <section className="border-b border-line pb-8">
          <StepLabel number={3} title="La tua e-card regalo" />
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-bold text-ink">
              Nome/i del mittente/i*
              <input
                className={fieldClass}
                name="giftSenderName"
                placeholder="Nome che comparirà sulla e-card"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-ink">
              Nome/i del destinatario/i*
              <input
                className={fieldClass}
                name="giftRecipient"
                placeholder="Nome della persona a cui dedichi il regalo"
                required
              />
            </label>
            <div>
              <p className="text-sm font-bold text-ink">
                Seleziona la e-card che preferisci*
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {giftCards.map((card) => (
                  <label className="cursor-pointer" key={card.id}>
                    <input
                      className="peer sr-only"
                      type="radio"
                      name="giftCardStyle"
                      value={card.label}
                      required
                    />
                    <span
                      className={`grid aspect-[0.72] place-items-end rounded-2xl border border-line bg-gradient-to-br ${card.className} p-4 font-serif text-xl text-wine transition peer-checked:border-wine peer-checked:ring-4 peer-checked:ring-rose-soft`}
                    >
                      {card.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-ink">
                E-mail del destinatario*
                <input className={fieldClass} name="giftRecipientEmail" type="email" required />
              </label>
              <label className="grid gap-2 text-sm font-bold text-ink">
                Scegli la data di invio*
                <input className={fieldClass} name="sendDate" type="date" required />
              </label>
            </div>
            <div className="grid gap-3 text-sm leading-relaxed text-muted">
              <label className="flex items-start gap-3">
                <input className="mt-1 size-4 shrink-0 accent-wine" type="checkbox" name="hideGiftAmount" />
                Nascondi importo della donazione.
              </label>
              <label className="flex items-start gap-3">
                <input className="mt-1 size-4 shrink-0 accent-wine" type="checkbox" name="sendGiftCopy" />
                Inviami una copia della mail.
              </label>
            </div>
            <label className="grid gap-2 text-sm font-bold text-ink">
              Messaggio di dedica{" "}
              <span className="font-normal text-muted">(facoltativo)</span>
              <textarea
                className={`${fieldClass} min-h-24 resize-y`}
                name="dedicationMessage"
                maxLength={500}
                placeholder="Scrivi un breve messaggio per accompagnare la donazione."
              />
            </label>
          </div>
        </section>

        <section className="border-b border-line pb-8">
          <StepLabel number={4} title="I tuoi dati anagrafici" />
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-ink">
              Cognome/Ragione sociale*
              <input className={fieldClass} name="lastName" autoComplete="family-name" required />
            </label>
            <label className="grid gap-2 text-sm font-bold text-ink">
              Nome*
              <input className={fieldClass} name="firstName" autoComplete="given-name" required />
            </label>
            <label className="grid gap-2 text-sm font-bold text-ink">
              E-mail*
              <input className={fieldClass} name="email" type="email" autoComplete="email" required />
            </label>
            <label className="grid gap-2 text-sm font-bold text-ink">
              Codice fiscale*
              <input className={fieldClass} name="fiscalCode" autoComplete="off" required />
            </label>
            <label className="grid gap-2 text-sm font-bold text-ink">
              Cellulare*
              <input className={fieldClass} name="phone" type="tel" autoComplete="tel" required />
            </label>
            <label className="grid gap-2 text-sm font-bold text-ink">
              Data di nascita*
              <input className={fieldClass} name="birthDate" type="date" required />
            </label>
            <label className="grid gap-2 text-sm font-bold text-ink">
              Indirizzo*
              <input className={fieldClass} name="address" autoComplete="street-address" required />
            </label>
            <div className="grid gap-5 sm:grid-cols-[1fr_0.7fr]">
              <label className="grid gap-2 text-sm font-bold text-ink">
                Città*
                <input className={fieldClass} name="city" autoComplete="address-level2" required />
              </label>
              <label className="grid gap-2 text-sm font-bold text-ink">
                CAP*
                <input className={fieldClass} name="postalCode" autoComplete="postal-code" required />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-bold text-ink">
              Provincia*
              <input className={fieldClass} name="province" autoComplete="address-level1" required />
            </label>
          </div>
          <label className="mt-5 grid gap-2 text-sm font-bold text-ink">
            Azienda <span className="font-normal text-muted">(facoltativa)</span>
            <input className={fieldClass} name="company" autoComplete="organization" />
          </label>
        </section>

        <section>
          <StepLabel number={5} title="Metodo di pagamento" />
          <fieldset className="mb-5 flex flex-wrap gap-5 text-sm text-muted">
            <legend className="sr-only">Metodo di pagamento</legend>
            <label className="inline-flex items-center gap-2">
              <input className="size-3.5 accent-wine" type="radio" name="paymentMethod" value="card" defaultChecked />
              Carta di credito
            </label>
            <label className="inline-flex items-center gap-2 opacity-45">
              <input className="size-3.5" type="radio" name="paymentMethod" value="paypal" disabled />
              Paypal
            </label>
            <label className="inline-flex items-center gap-2 opacity-45">
              <input className="size-3.5" type="radio" name="paymentMethod" value="satispay" disabled />
              Satispay
            </label>
          </fieldset>
          <div className="grid gap-4">
            <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
              <input className="mt-1 size-4 shrink-0 accent-wine" type="checkbox" name="anonymous" />
              Non mostrare pubblicamente il mio nome.
            </label>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
              <input className="mt-1 size-4 shrink-0 accent-wine" type="checkbox" name="consent" required />
              Accetto che i dati siano trattati per gestire la donazione, inviare la e-card e adempiere agli obblighi amministrativi.
            </label>
            <label className="sr-only" aria-hidden="true">
              Sito web<input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          {error ? <p className="mt-5 border-l-2 border-coral bg-[#fff7f3] p-4 text-sm text-wine" role="alert">{error}</p> : null}
          <button
            className="mt-7 inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-full bg-wine px-8 font-bold text-white transition hover:bg-wine-deep disabled:cursor-wait disabled:opacity-65"
            type="submit"
            disabled={pending}
          >
            {pending ? "Preparazione del pagamento…" : "Dona ora"}
            <Icon className="size-5" name="heart" />
          </button>
        </section>
      </form>
    );
  }

  return (
    <form className="grid gap-7" onSubmit={submit} noValidate>
      {donationType === "raccolta" ? (
        <fieldset className="grid gap-5 border-b border-line pb-6">
          <legend className="px-2 text-sm font-bold text-ink">
            {campaignName ? "Raccolta fondi" : "Dati della raccolta fondi"}
          </legend>
          {campaignName ? (
            <div className="rounded-2xl border border-line bg-paper p-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">
                Stai donando per
              </p>
              <p className="mt-2 font-serif text-2xl text-ink">{campaignName}</p>
              <p className="mt-3 text-sm leading-7 text-muted">
                La donazione sarà registrata come contributo a questa raccolta.
              </p>
            </div>
          ) : (
            <label className="grid gap-2 text-sm font-bold text-ink">
              Titolo della raccolta
              <input
                className={fieldClass}
                name="campaignName"
                placeholder="Es. Il mio compleanno per A-ROSE"
                required
              />
            </label>
          )}
          <label className="grid gap-2 text-sm font-bold text-ink">
            Occasione
            <input
              className={fieldClass}
              name="occasionDisplay"
              value={occasion ?? "Raccolta fondi"}
              readOnly
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-ink">
            Messaggio per la condivisione{" "}
            <span className="font-normal text-muted">(facoltativo)</span>
            <textarea
              className={`${fieldClass} min-h-24 resize-y`}
              name="dedicationMessage"
              maxLength={500}
              placeholder="Scrivi il testo che vorresti associare alla raccolta."
            />
          </label>
        </fieldset>
      ) : null}

      {false ? (
        <fieldset className="grid gap-5 border-b border-line pb-6">
          <legend className="px-2 text-sm font-bold text-ink">
            Dati del regalo solidale
          </legend>
          <label className="grid gap-2 text-sm font-bold text-ink">
            La tua buona occasione
            <select className={fieldClass} name="giftOccasion" defaultValue={occasion ?? ""}>
              <option value="">Seleziona un’occasione</option>
              {giftOccasions.map((giftOccasion) => (
                <option key={giftOccasion}>{giftOccasion}</option>
              ))}
            </select>
          </label>
          <div className="grid gap-3">
            <p className="text-sm font-bold text-ink">Seleziona la e-card</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {giftCards.map((card) => (
                <label className="cursor-pointer" key={card.id}>
                  <input
                    className="peer sr-only"
                    type="radio"
                    name="giftCardStyle"
                    value={card.label}
                    required
                  />
                  <span
                    className={`grid aspect-[0.72] place-items-end rounded-2xl border border-line bg-gradient-to-br ${card.className} p-4 font-serif text-xl text-wine transition peer-checked:border-wine peer-checked:ring-4 peer-checked:ring-rose-soft`}
                  >
                    {card.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <label className="grid gap-2 text-sm font-bold text-ink">
            Nome del destinatario*
            <input
              className={fieldClass}
              name="giftRecipient"
              placeholder="Nome della persona a cui dedichi il regalo"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-ink">
            E-mail del destinatario{" "}
            <span className="font-normal text-muted">(facoltativa)</span>
            <input
              className={fieldClass}
              name="giftRecipientEmail"
              type="email"
              placeholder="email@esempio.it"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-ink">
            Messaggio di dedica{" "}
            <span className="font-normal text-muted">(facoltativo)</span>
            <textarea
              className={`${fieldClass} min-h-24 resize-y`}
              name="dedicationMessage"
              maxLength={500}
              placeholder="Scrivi un breve messaggio per accompagnare la donazione."
            />
          </label>
        </fieldset>
      ) : null}

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
