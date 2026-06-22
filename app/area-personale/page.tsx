import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/home/icons";

export const metadata: Metadata = {
  title: "Area personale | A-ROSE ODV",
  description: "Area personale A-ROSE ODV in preparazione per sostenitori e donatori.",
  robots: { index: false, follow: false },
};

export default function PersonalAreaPage() {
  return (
    <main id="contenuto">
      <section className="bg-ivory px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-wine">Area personale</p>
          <h1 className="mt-5 font-serif text-5xl leading-[0.98] text-ink sm:text-6xl">
            Uno spazio dedicato ai <em className="font-normal text-rose">sostenitori.</em>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            L’area personale è in preparazione. In futuro permetterà di gestire il proprio profilo e consultare le informazioni legate al sostegno ad A-ROSE.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-wine px-7 font-bold text-white transition hover:bg-wine-deep" href="/contatti">
              Contattaci <Icon className="size-4" name="arrow" />
            </Link>
            <Link className="inline-flex min-h-12 items-center justify-center rounded-full border border-wine px-7 font-bold text-wine transition hover:bg-rose-soft" href="/sostieni-la-ricerca">
              Sostieni la ricerca
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
