import type Stripe from "stripe";

export const GIVEWP_FORM_ID = 28216;

export type DonationCheckoutInput = {
  amount: number;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  fiscalCode?: string;
  phone?: string;
  birthDate?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  province?: string;
  comment?: string;
  donationType: "generale" | "regalo" | "raccolta";
  occasion?: string;
  campaignName?: string;
  donationFrequency?: string;
  giftSenderName?: string;
  giftRecipient?: string;
  giftRecipientEmail?: string;
  giftCardStyle?: string;
  sendDate?: string;
  dedicationMessage?: string;
  hideGiftAmount?: boolean;
  sendGiftCopy?: boolean;
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
  const fiscalCode = cleanText(input.fiscalCode, 32);
  const phone = cleanText(input.phone, 40);
  const birthDate = cleanText(input.birthDate, 20);
  const address = cleanText(input.address, 180);
  const city = cleanText(input.city, 120);
  const postalCode = cleanText(input.postalCode, 20);
  const province = cleanText(input.province, 80);
  const comment = cleanText(input.comment, 500);
  const donationType =
    input.donationType === "regalo" || input.donationType === "raccolta"
      ? input.donationType
      : "generale";
  const occasion = cleanText(input.occasion, 120);
  const campaignName = cleanText(input.campaignName, 160);
  const donationFrequency = cleanText(input.donationFrequency, 40);
  const giftSenderName = cleanText(input.giftSenderName, 160);
  const giftRecipient = cleanText(input.giftRecipient, 160);
  const giftRecipientEmail = cleanText(input.giftRecipientEmail, 254).toLowerCase();
  const giftCardStyle = cleanText(input.giftCardStyle, 80);
  const sendDate = cleanText(input.sendDate, 20);
  const dedicationMessage = cleanText(input.dedicationMessage, 500);

  if (cleanText(input.website, 200)) throw new Error("Richiesta non valida");
  if (!Number.isFinite(amount) || amount < 1 || amount > 100000) {
    throw new Error("Inserisci un importo compreso tra 1 € e 100.000 €");
  }
  if (!firstName) throw new Error("Il nome è obbligatorio");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Inserisci un indirizzo email valido");
  }
  if (input.consent !== true) throw new Error("Devi accettare i termini della donazione");
  if (donationType === "regalo") {
    if (!lastName) throw new Error("Il cognome o la ragione sociale sono obbligatori");
    if (!fiscalCode) throw new Error("Il codice fiscale è obbligatorio");
    if (!phone) throw new Error("Il cellulare è obbligatorio");
    if (!birthDate) throw new Error("La data di nascita è obbligatoria");
    if (!address || !city || !postalCode || !province) {
      throw new Error("Completa i dati di indirizzo");
    }
    if (!giftSenderName) throw new Error("Il nome del mittente è obbligatorio");
    if (!giftRecipient) throw new Error("Il nome del destinatario è obbligatorio");
    if (!giftRecipientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(giftRecipientEmail)) {
      throw new Error("Inserisci l'email del destinatario");
    }
    if (!giftCardStyle) throw new Error("Seleziona una e-card regalo");
    if (!sendDate) throw new Error("Scegli la data di invio della e-card");
  }

  return {
    amount: Math.round(amount * 100) / 100,
    firstName,
    lastName,
    email,
    company: company || undefined,
    fiscalCode: fiscalCode || undefined,
    phone: phone || undefined,
    birthDate: birthDate || undefined,
    address: address || undefined,
    city: city || undefined,
    postalCode: postalCode || undefined,
    province: province || undefined,
    comment: comment || undefined,
    donationType,
    occasion: occasion || undefined,
    campaignName: campaignName || undefined,
    donationFrequency: donationFrequency || undefined,
    giftSenderName: giftSenderName || undefined,
    giftRecipient: giftRecipient || undefined,
    giftRecipientEmail: giftRecipientEmail || undefined,
    giftCardStyle: giftCardStyle || undefined,
    sendDate: sendDate || undefined,
    dedicationMessage: dedicationMessage || undefined,
    hideGiftAmount: input.hideGiftAmount === true,
    sendGiftCopy: input.sendGiftCopy === true,
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
