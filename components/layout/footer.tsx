import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/home/icons";
import { container } from "@/components/home/styles";

const footerColumns = [
  {
    title: "Esplora",
    links: [
      ["Chi siamo", "/#missione"],
      ["La ricerca", "/#ricerca"],
      ["Eventi", "/#eventi"],
      ["News", "/#news"],
    ],
  },
  {
    title: "Trasparenza",
    links: [
      ["Bilanci e documenti", "/#trasparenza"],
      ["5×1000", "/#trasparenza"],
      ["Privacy", "/#trasparenza"],
      ["Cookie policy", "/#trasparenza"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-[#28141c] pt-20 text-white max-sm:pt-16" id="trasparenza">
      <div
        className={`${container} grid gap-16 pb-16 md:grid-cols-[1.5fr_repeat(3,1fr)] max-md:grid-cols-[1.5fr_1fr_1fr] max-sm:grid-cols-2 max-sm:gap-x-8 max-sm:gap-y-11`}
      >
        <div className="max-md:col-span-full">
          <Link
            className="block w-[205px]"
            href="/"
            aria-label="A-ROSE ODV, torna alla homepage"
          >
            <Image
              src="/brand/arose_logo_negativo.png"
              alt="A-ROSE ODV"
              width={900}
              height={300}
              unoptimized
            />
          </Link>
          <p className="mt-6 font-serif text-[17px] leading-normal text-white/55">
            Ricerca che diventa cura.
            <br />
            Conoscenza che diventa futuro.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div className="flex flex-col gap-2" key={column.title}>
            <h2 className="mb-3 mt-1 font-sans text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#e9a5b2]">
              {column.title}
            </h2>
            {column.links.map(([label, href]) => (
              <Link
                className="text-xs text-white/65 transition hover:text-white"
                href={href}
                key={label}
              >
                {label}
              </Link>
            ))}
          </div>
        ))}

        <div className="flex flex-col gap-2 max-sm:col-span-full" id="footer-contact">
          <h2 className="mb-3 mt-1 font-sans text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#e9a5b2]">
            Contatti
          </h2>
          <p className="text-xs text-white/65">Email istituzionale da inserire</p>
          <p className="text-xs text-white/65">Ferrara, Italia</p>
          <Link
            className="mt-3 inline-flex w-fit items-center gap-2 border-b border-[#e9a5b2] font-bold text-[#e9a5b2]"
            href="/#dona"
          >
            Sostieni A-ROSE <Icon className="size-4" name="arrow" />
          </Link>
        </div>
      </div>

      <div
        className={`${container} flex justify-between gap-2 border-t border-white/10 py-6 text-[10px] text-white/35 max-sm:flex-col`}
      >
        <p>© {new Date().getFullYear()} A-ROSE ODV. Tutti i diritti riservati.</p>
        <p>Associazione Ricerca Oncologica Sperimentale Estense</p>
      </div>
    </footer>
  );
}
