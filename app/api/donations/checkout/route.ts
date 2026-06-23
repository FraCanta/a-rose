import { NextResponse } from "next/server";
import { validateDonationInput } from "@/lib/donations";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    const requestOrigin = new URL(request.url).origin;
    if (origin && origin !== requestOrigin) {
      return NextResponse.json({ error: "Origine della richiesta non valida" }, { status: 403 });
    }

    const donation = validateDonationInput(await request.json());
    const stripe = getStripe();
    const donationLabels = {
      generale: "Donazione ad A-ROSE ODV",
      regalo: "Regalo solidale A-ROSE ODV",
      raccolta: "Raccolta fondi A-ROSE ODV",
    } as const;
    const contextComment = [
      donation.comment,
      donation.donationType !== "generale" ? `Tipo: ${donation.donationType}` : "",
      donation.occasion ? `Occasione: ${donation.occasion}` : "",
      donation.campaignName ? `Titolo raccolta: ${donation.campaignName}` : "",
      donation.donationFrequency ? `Frequenza: ${donation.donationFrequency}` : "",
      donation.giftSenderName ? `Mittente regalo: ${donation.giftSenderName}` : "",
      donation.giftRecipient ? `Destinatario regalo: ${donation.giftRecipient}` : "",
      donation.giftRecipientEmail ? `Email destinatario regalo: ${donation.giftRecipientEmail}` : "",
      donation.giftCardStyle ? `E-card: ${donation.giftCardStyle}` : "",
      donation.sendDate ? `Data invio e-card: ${donation.sendDate}` : "",
      donation.hideGiftAmount ? "Importo nascosto nella e-card" : "",
      donation.sendGiftCopy ? "Copia e-card richiesta dal donatore" : "",
      donation.dedicationMessage ? `Messaggio: ${donation.dedicationMessage}` : "",
      donation.fiscalCode ? `Codice fiscale: ${donation.fiscalCode}` : "",
      donation.phone ? `Telefono: ${donation.phone}` : "",
      donation.birthDate ? `Data di nascita: ${donation.birthDate}` : "",
      donation.address || donation.city || donation.postalCode || donation.province
        ? `Indirizzo: ${[donation.address, donation.postalCode, donation.city, donation.province]
            .filter(Boolean)
            .join(" ")}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");
    const safeContextComment = contextComment.slice(0, 500);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "it",
      customer_email: donation.email,
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: Math.round(donation.amount * 100),
            product_data: {
              name: donationLabels[donation.donationType],
              description:
                donation.donationType === "raccolta"
                  ? "Sostegno tramite raccolta fondi a favore della ricerca oncologica."
                  : donation.donationType === "regalo"
                    ? "Donazione dedicata a una persona o a una ricorrenza."
                    : "Sostegno alla ricerca oncologica traslazionale, alla formazione e alla prevenzione.",
            },
          },
        },
      ],
      payment_intent_data: {
        description: donationLabels[donation.donationType],
        metadata: {
          giveWpFormId: "28216",
          donationType: donation.donationType,
          occasion: donation.occasion ?? "",
        },
      },
      metadata: {
        firstName: donation.firstName,
        lastName: donation.lastName,
        company: donation.company ?? "",
        fiscalCode: donation.fiscalCode ?? "",
        phone: donation.phone ?? "",
        birthDate: donation.birthDate ?? "",
        address: donation.address ?? "",
        city: donation.city ?? "",
        postalCode: donation.postalCode ?? "",
        province: donation.province ?? "",
        comment: safeContextComment,
        donationType: donation.donationType,
        occasion: donation.occasion ?? "",
        campaignName: donation.campaignName ?? "",
        donationFrequency: donation.donationFrequency ?? "",
        giftSenderName: donation.giftSenderName ?? "",
        giftRecipient: donation.giftRecipient ?? "",
        giftRecipientEmail: donation.giftRecipientEmail ?? "",
        giftCardStyle: donation.giftCardStyle ?? "",
        sendDate: donation.sendDate ?? "",
        dedicationMessage: donation.dedicationMessage ?? "",
        hideGiftAmount: String(Boolean(donation.hideGiftAmount)),
        sendGiftCopy: String(Boolean(donation.sendGiftCopy)),
        anonymous: String(Boolean(donation.anonymous)),
        giveWpFormId: "28216",
      },
      success_url: `${requestOrigin}/sostieni-la-ricerca/conferma?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${requestOrigin}/donazione?annullata=1`,
    });

    if (!session.url) {
      throw new Error("Stripe non ha restituito l'URL del checkout");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Impossibile avviare la donazione";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
