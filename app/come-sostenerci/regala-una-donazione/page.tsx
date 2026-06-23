import type { Metadata } from "next";
import Link from "next/link";
import { DonationCheckout } from "@/components/donations/donation-checkout";
import { Eyebrow } from "@/components/home/eyebrow";
import { container, section } from "@/components/home/styles";

export const metadata: Metadata = {
  title: "Regala una donazione | A-ROSE ODV",
  description:
    "Dedica una donazione A-ROSE a una persona o a una ricorrenza speciale, sostenendo la ricerca oncologica.",
};

export default function GiftDonationPage() {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

  return (
    <main id="contenuto">
      <section className="border-b border-line bg-white py-14 sm:py-16 lg:py-20">
        <div className={container}>
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-xs text-muted"
          >
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/come-sostenerci">Sostienici</Link>
            <span>/</span>
            <span aria-current="page" className="text-ink">
              Regala una donazione
            </span>
          </nav>
          <div className="grid items-end gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div>
              <Eyebrow>Sostienici</Eyebrow>
              <h1 className="mt-5 max-w-5xl font-serif text-[clamp(42px,6vw,78px)] font-normal leading-[0.98] tracking-[-0.045em] text-ink">
                Regala una <em className="font-normal text-rose">donazione.</em>
              </h1>
            </div>
            <p className="max-w-3xl text-base leading-8 text-muted sm:text-lg">
              Una donazione può diventare un regalo significativo: scegli
              l’occasione, indica destinatario e mittente, seleziona una e-card
              e completa il pagamento in modo sicuro.
            </p>
          </div>
        </div>
      </section>
      <section className={`${section} bg-white`}>
        <div className={`${container} grid gap-10 lg:grid-cols-3`}>
          {[
            [
              "Scegli il contributo",
              "Seleziona importo, ricorrenza e progetto da sostenere.",
            ],
            [
              "Personalizza la e-card",
              "Inserisci mittente, destinatario, email e data di invio.",
            ],
            [
              "Completa il pagamento",
              "La donazione viene gestita in modo sicuro tramite Stripe.",
            ],
          ].map(([title, text], index) => (
            <article className="pt-7" key={title}>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">
                0{index + 1}
              </span>
              <h2 className="mt-4 font-serif text-3xl font-normal text-ink">
                {title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={`${section} bg-ivory`}>
        <div className={`${container}`}>
          <article className="border border-line bg-paper p-5 shadow-[0_24px_80px_rgba(80,45,35,0.08)] sm:p-8 lg:p-10">
            <DonationCheckout
              donationType="regalo"
              publishableKey={publishableKey}
            />
          </article>
        </div>
      </section>

      {/* <section className="bg-wine py-16 text-white sm:py-20">
        <div
          className={`${container} flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center`}
        >
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#efabb6]">
              Dona e dedica
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl font-normal leading-tight sm:text-4xl">
              Trasforma un regalo in nuove possibilità.
            </h2>
          </div>
          <Link
            className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-white px-8 font-bold text-wine"
            href="#contenuto"
          >
            Torna al modulo <Icon className="size-5" name="heart" />
          </Link>
        </div>
      </section> */}
    </main>
  );
}
