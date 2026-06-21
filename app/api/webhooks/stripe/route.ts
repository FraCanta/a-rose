import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { syncStripeDonationToGiveWp } from "@/lib/donations";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook Stripe non configurato" }, { status: 400 });
  }

  let event: Stripe.Event;
  const stripe = getStripe();

  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Firma webhook non valida" }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const eventSession = event.data.object;
    const session = await stripe.checkout.sessions.retrieve(eventSession.id);

    if (session.payment_status === "paid" && session.metadata?.giveWpSynced !== "true") {
      try {
        await syncStripeDonationToGiveWp(session);
        await stripe.checkout.sessions.update(session.id, {
          metadata: { ...session.metadata, giveWpSynced: "true" },
        });
      } catch (error) {
        console.error("Sincronizzazione GiveWP fallita", error);
        return NextResponse.json({ error: "Sincronizzazione GiveWP fallita" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
