import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { syncStripeDonationToGiveWp } from "@/lib/donations";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/utils/supabase/admin";

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

    if (session.payment_status === "paid") {
      try {
        await recordPaidDonation(session);

        if (session.metadata?.giveWpSynced !== "true") {
          await syncStripeDonationToGiveWp(session);
          await stripe.checkout.sessions.update(session.id, {
            metadata: { ...session.metadata, giveWpSynced: "true" },
          });
        }
      } catch (error) {
        console.error("Sincronizzazione GiveWP fallita", error);
        return NextResponse.json({ error: "Sincronizzazione GiveWP fallita" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}

async function recordPaidDonation(session: Stripe.Checkout.Session) {
  if (!session.amount_total) return;

  const metadata = session.metadata ?? {};
  const campaignId = metadata.campaignId || null;
  const paymentIntent =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;
  const supabase = createAdminClient();
  const { error } = await supabase.from("donations").upsert(
    {
      campaign_id: campaignId,
      kind: campaignId ? "fundraising" : "direct",
      status: "paid",
      amount_cents: session.amount_total,
      currency: session.currency ?? "eur",
      donor_email: session.customer_details?.email ?? session.customer_email,
      donor_first_name: metadata.firstName || null,
      donor_last_name: metadata.lastName || null,
      donor_phone: metadata.phone || null,
      donor_fiscal_code: metadata.fiscalCode || null,
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: paymentIntent,
      metadata,
      paid_at: new Date().toISOString(),
    },
    { onConflict: "stripe_checkout_session_id" },
  );

  if (error) throw new Error(`Registrazione donazione fallita: ${error.message}`);
}
