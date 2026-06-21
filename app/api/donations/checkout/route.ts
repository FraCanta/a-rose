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
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded_page",
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
              name: "Donazione ad A-ROSE ODV",
              description: "Sostegno alla ricerca oncologica traslazionale, alla formazione e alla prevenzione.",
            },
          },
        },
      ],
      payment_intent_data: {
        description: "Donazione ad A-ROSE ODV",
        metadata: { giveWpFormId: "28216" },
      },
      metadata: {
        firstName: donation.firstName,
        lastName: donation.lastName,
        company: donation.company ?? "",
        comment: donation.comment ?? "",
        anonymous: String(Boolean(donation.anonymous)),
        giveWpFormId: "28216",
      },
      return_url: `${requestOrigin}/sostieni-la-ricerca/conferma?session_id={CHECKOUT_SESSION_ID}`,
    });

    if (!session.client_secret) {
      throw new Error("Stripe non ha restituito il client secret del checkout");
    }

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Impossibile avviare la donazione";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
