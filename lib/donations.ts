import type Stripe from "stripe";

export const GIVEWP_FORM_ID = 28216;

export type DonationCheckoutInput = {
  amount: number;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  comment?: string;
  anonymous?: boolean;
  consent: boolean;
  website?: string;
};

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function validateDonationInput(value: unknown): DonationCheckoutInput {
  if (!value || typeof value !== "object") throw new Error("Dati della donazione mancanti");

  const input = value as Record<string, unknown>;
  const amount = Number(input.amount);
  const firstName = cleanText(input.firstName, 100);
  const lastName = cleanText(input.lastName, 100);
  const email = cleanText(input.email, 254).toLowerCase();
  const company = cleanText(input.company, 160);
  const comment = cleanText(input.comment, 500);

  if (cleanText(input.website, 200)) throw new Error("Richiesta non valida");
  if (!Number.isFinite(amount) || amount < 1 || amount > 100000) {
    throw new Error("Inserisci un importo compreso tra 1 € e 100.000 €");
  }
  if (!firstName) throw new Error("Il nome è obbligatorio");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Inserisci un indirizzo email valido");
  }
  if (input.consent !== true) throw new Error("Devi accettare i termini della donazione");

  return {
    amount: Math.round(amount * 100) / 100,
    firstName,
    lastName,
    email,
    company: company || undefined,
    comment: comment || undefined,
    anonymous: input.anonymous === true,
    consent: true,
  };
}

function getWordPressCredentials() {
  const username = process.env.WORDPRESS_API_USERNAME;
  const password = process.env.WORDPRESS_APP_PASSWORD;

  if (!username || !password) {
    throw new Error("Credenziali WordPress per GiveWP non configurate");
  }

  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}

export async function syncStripeDonationToGiveWp(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid" || !session.amount_total) return;

  const metadata = session.metadata ?? {};
  const paymentIntent =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? session.id;

  const response = await fetch("https://a-roseodv.org/wp-json/givewp/v3/donations", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: getWordPressCredentials(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: metadata.firstName || session.customer_details?.name || "Donatore",
      lastName: metadata.lastName || null,
      email: session.customer_details?.email || session.customer_email,
      company: metadata.company || null,
      amount: {
        value: session.amount_total / 100,
        currency: (session.currency ?? "eur").toUpperCase(),
      },
      status: "publish",
      type: "single",
      gatewayId: "stripe",
      mode: session.livemode ? "live" : "test",
      anonymous: metadata.anonymous === "true",
      formId: GIVEWP_FORM_ID,
      formTitle: "Modulo di donazione generale",
      gatewayTransactionId: paymentIntent,
      purchaseKey: session.id,
      comment: metadata.comment || null,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`GiveWP ha rifiutato la sincronizzazione: ${response.status} ${message.slice(0, 300)}`);
  }
}
