import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/content/page-intro";
import { DonationCheckout } from "@/components/donations/donation-checkout";
import { Eyebrow } from "@/components/home/eyebrow";
import { Icon } from "@/components/home/icons";
import { container, heading, section } from "@/components/home/styles";
import { getSitePage } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Sostieni la ricerca | A-ROSE ODV",
  description: "Dona ad A-ROSE ODV e sostieni progetti di ricerca oncologica, formazione e prevenzione.",
};

export default async function DonatePage() {
  const source = await getSitePage("come-sostenerci");

  return (
    <main id="contenuto">
      <PageIntro
        eyebrow="Dona ora"
        title="Il tuo contributo"
        accent="accelera la ricerca."
        text="Ogni donazione sostiene attività scientifiche, borse di studio e iniziative di prevenzione. Le donazioni sono tracciabili e rendicontate."
        image={source?.images.find((image) => image.includes("Ricerca.jpg")) ?? source?.images[1]}
        imageAlt="Ricerca oncologica sostenuta dalle donazioni"
      />

      <section className={`${section} scroll-mt-24 bg-ivory`} id="donazione">
        <div className={`${container} grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24`}>
          <div>
            <Eyebrow>Una scelta concreta</Eyebrow>
            <h2 className={heading}>Scegli come <em className="font-normal text-rose">contribuire.</em></h2>
            <p className="mt-7 text-base leading-[1.8] text-muted">Puoi donare online oppure tramite bonifico bancario. Per destinare il contributo a un progetto specifico, indicalo nella causale.</p>
          </div>
          <div className="grid gap-6">
            <article className="border border-line bg-white p-7 shadow-soft sm:p-10">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">Donazione online</p>
              <h3 className="mt-3 font-serif text-3xl font-normal text-ink">Dona in modo semplice e sicuro</h3>
              <p className="mt-4 text-sm leading-[1.8] text-muted">Scegli l’importo, inserisci i dati necessari e completa il pagamento protetto da Stripe.</p>
              <div className="mt-8">
                <DonationCheckout
                  publishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""}
                />
              </div>
            </article>
            <article className="border border-line bg-paper p-7 sm:p-10">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">Bonifico bancario</p>
              <h3 className="mt-3 font-serif text-3xl font-normal text-ink">A-ROSE ODV</h3>
              <dl className="mt-6 grid gap-4 text-sm text-muted">
                <div><dt className="font-bold text-ink">IBAN</dt><dd className="mt-1 break-all font-mono text-base">IT46A0301503200000003758386</dd></div>
                <div><dt className="font-bold text-ink">Causale</dt><dd className="mt-1">Erogazione liberale</dd></div>
              </dl>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={`${container} flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center`}>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose">Trasparenza</p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl font-normal text-ink sm:text-4xl">Scopri come vengono impiegate le donazioni.</h2>
          </div>
          <Link className="flex items-center gap-2 text-sm font-bold text-wine" href="/come-sostenerci">
            Informazioni e agevolazioni <Icon className="size-4" name="arrow" />
          </Link>
        </div>
      </section>
    </main>
  );
}
