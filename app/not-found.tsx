import Link from "next/link";
import { Eyebrow } from "@/components/home/eyebrow";
import { container } from "@/components/home/styles";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-ivory py-20 sm:py-28" id="contenuto">
      <div
        aria-hidden="true"
        className="absolute -right-24 top-1/2 -z-10 size-80 -translate-y-1/2 rounded-full border-[64px] border-rose-soft/70 sm:right-[4%] sm:size-[460px] sm:border-[92px]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[12%] right-[20%] -z-10 size-5 rounded-full bg-rose sm:size-7"
      />

      <div className={`${container} grid items-center gap-12 lg:grid-cols-[1fr_0.7fr] lg:gap-20`}>
        <div className="max-w-3xl">
          <Eyebrow>Errore 404</Eyebrow>
          <h1 className="font-serif text-[clamp(48px,7vw,96px)] font-normal leading-[0.96] tracking-[-0.05em] text-ink">
            Oops…
            <em className="block font-normal text-rose">pagina non trovata.</em>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-[1.8] text-muted sm:text-lg">
            La pagina che cerchi potrebbe essere stata spostata, rinominata o non
            essere più disponibile.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-wine bg-wine px-8 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:border-wine-deep hover:bg-wine-deep"
              href="/"
            >
              Torna alla homepage
            </Link>
            <Link
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-wine px-8 py-3 font-bold text-wine transition hover:-translate-y-0.5 hover:bg-wine hover:text-white"
              href="/contatti"
            >
              Contattaci
            </Link>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="hidden select-none text-right font-serif text-[clamp(160px,22vw,340px)] leading-none tracking-[-0.08em] text-wine/10 lg:block"
        >
          404
        </p>
      </div>
    </main>
  );
}
