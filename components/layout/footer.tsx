import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/home/icons";
import { container } from "@/components/home/styles";

const footerColumns = [
  {
    title: "Conosci A-ROSE",
    links: [
      ["Chi siamo", "/chi-siamo"],
      ["La nostra associazione", "/chi-siamo/la-nostra-associazione"],
      ["Team scientifico", "/chi-siamo/team-scientifico"],
      ["Partner", "/chi-siamo/partner-e-sostenitori"],
      ["Trasparenza", "/trasparenza"],
      ["Come usiamo i fondi", "/come-sostenerci/come-usiamo-i-fondi"],
      ["Benefici fiscali", "/chi-siamo/benefici-fiscali"],
    ],
  },
  {
    title: "Ricerca e prevenzione",
    links: [
      ["La ricerca", "/la-ricerca"],
      ["Progetti", "/la-ricerca/progetti-di-ricerca"],
      ["Formazione", "/la-ricerca/formazione"],
      ["Prevenzione", "/prevenzione-e-salute"],
      ["Guide e FAQ", "/prevenzione/guide-e-approfondimenti"],
    ],
  },
  {
    title: "Partecipa e sostieni",
    links: [
      ["Eventi", "/partecipa/eventi"],
      ["Diventa volontario", "/partecipa/diventa-volontario"],
      ["Dona ora", "/sostieni-la-ricerca"],
      ["5×1000", "/come-sostenerci/5x1000"],
      ["Regala una donazione", "/come-sostenerci/regala-una-donazione"],
      ["Organizza una raccolta fondi", "/come-sostenerci/raccolta-fondi"],
      ["Aziende e partner", "/come-sostenerci/aziende-e-partner"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-[#062f33] pt-20 text-white max-sm:pt-16" id="trasparenza">
      <div
        className={`${container} grid grid-cols-1 gap-x-8 gap-y-10 pb-16 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[1.3fr_repeat(4,1fr)] xl:gap-x-10`}
      >
        <div className="max-xl:col-span-full">
          <Link
            className="block w-40"
            href="/"
            aria-label="A-ROSE ODV, torna alla homepage"
          >
            <Image
              src="/brand/a-rose-odv-negativo.png"
              alt="A-ROSE ODV"
              width={1065}
              height={932}
              sizes="160px"
            />
          </Link>
          <p className="mt-6 font-serif text-lg leading-relaxed text-white/70">
            Ricerca che diventa cura.
            <br />
            Conoscenza che diventa futuro.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div className="flex flex-col gap-3" key={column.title}>
            <h2 className="mb-2 font-sans text-xs font-extrabold uppercase leading-relaxed tracking-[0.12em] text-[#e9a5b2]">
              {column.title}
            </h2>
            {column.links.map(([label, href]) => (
              <Link
                className="text-[15px] leading-relaxed text-white/75 transition hover:text-white"
                href={href}
                key={label}
              >
                {label}
              </Link>
            ))}
          </div>
        ))}

        <div className="flex flex-col gap-3" id="footer-contact">
          <h2 className="mb-2 font-sans text-xs font-extrabold uppercase leading-relaxed tracking-[0.12em] text-[#e9a5b2]">
            Contatti
          </h2>
          <Link className="break-words text-[15px] leading-relaxed text-white/75 transition hover:text-white" href="mailto:info@a-roseodv.org">
            info@a-roseodv.org
          </Link>
          <p className="text-[15px] leading-relaxed text-white/75">Ferrara, Italia</p>
          <Link
            className="mt-3 inline-flex w-fit items-center gap-2 border-b border-[#e9a5b2] pb-1 text-[15px] font-bold leading-relaxed text-[#e9a5b2]"
            href="/sostieni-la-ricerca"
          >
            Sostieni A-ROSE <Icon className="size-4" name="arrow" />
          </Link>
        </div>
      </div>

      <div
        className={`${container} flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-white/10 py-6 text-sm leading-relaxed text-white/65`}
      >
        <p>© {new Date().getFullYear()} A-ROSE ODV. Tutti i diritti riservati.</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link className="hover:text-white" href="/termini-e-condizioni">Termini e condizioni</Link>
          <Link className="hover:text-white" href="/privacy-policy">Privacy</Link>
          <Link className="hover:text-white" href="/cookie-policy">Cookie policy</Link>
          <Link className="inline-flex items-center gap-1.5 text-[#e9a5b2] transition hover:text-white" href="/ecosostenibilita">
            <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 4c-8.5.4-14 4.6-14 10.3 0 3.1 2.3 5.7 5.4 5.7C17.8 20 20 12 20 4Z" />
              <path d="M4 21c2.5-6.3 7-9.7 12.5-12" />
            </svg>
            Questo sito rispetta i principi dell’ecosostenibilità
          </Link>
        </div>
      </div>
    </footer>
  );
}
