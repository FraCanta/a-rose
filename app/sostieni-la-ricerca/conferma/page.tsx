import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/home/icons";
import { container } from "@/components/home/styles";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Conferma donazione | A-ROSE ODV",
  robots: { index: false, follow: false },
};

type ConfirmationPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const sessionId = (await searchParams).session_id;
  let session = null;

  if (sessionId) {
    try {
      session = await getStripe().checkout.sessions.retrieve(sessionId);
    } catch {
      session = null;
    }
  }

  const paid = session?.payment_status === "paid";

  return (
    <main className="bg-paper py-20 sm:py-28" id="contenuto">
      <div className={`${container} max-w-[840px] text-center`}>
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-rose-soft text-wine">
          <Icon className="size-7" name={paid ? "heart" : "shield"} />
        </span>
        <p className="mt-7 text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose">
          {paid ? "Donazione completata" : "Stato della donazione"}
        </p>
        <h1 className="mt-4 font-serif text-[clamp(42px,6vw,72px)] font-normal leading-[1.02] tracking-[-0.04em] text-ink">
          {paid ? "Grazie per il tuo sostegno." : "Il pagamento non risulta completato."}
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-[1.8] text-muted sm:text-lg">
          {paid
            ? "Il tuo contributo sostiene la ricerca oncologica, la formazione e le attività di prevenzione A-ROSE. Riceverai la conferma all’indirizzo email indicato."
            : "Se hai interrotto il pagamento puoi tornare al modulo e riprovare. Nessun importo viene registrato come donazione finché Stripe non conferma il pagamento."}
        </p>
        {paid && session?.amount_total ? (
          <p className="mt-6 font-serif text-3xl text-wine">
            {new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(session.amount_total / 100)}
          </p>
        ) : null}
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-wine px-7 font-bold text-white" href="/">Torna alla home</Link>
          {!paid ? (
            <Link className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-wine px-7 font-bold text-wine" href="/sostieni-la-ricerca#donazione">Riprova</Link>
          ) : null}
        </div>
      </div>
    </main>
  );
}
