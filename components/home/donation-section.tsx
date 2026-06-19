import Link from "next/link";
import { Eyebrow } from "./eyebrow";
import { Icon } from "./icons";
import { button, container, heading, iconWrap, section, textLink } from "./styles";

const benefits = [
  ["search", "Progetti scientifici concreti"],
  ["people", "Formazione specialistica"],
  ["shield", "Prevenzione sul territorio"],
] as const;

export function DonationSection() {
  return (
    <section className={`${section} bg-ivory`} id="dona">
      <div className={`${container} grid items-center gap-28 lg:grid-cols-[0.93fr_1.07fr] max-lg:gap-16 max-md:grid-cols-1`}>
        <div>
          <Eyebrow>Sostieni il cambiamento</Eyebrow>
          <h2 className={heading}>
            Il tuo contributo
            <br />
            <em className="font-normal text-rose">accelera la ricerca</em>
          </h2>
          <p className="my-9 max-w-xl text-[17px] leading-[1.85] text-muted">
            Donare ad A-ROSE significa sostenere progetti scientifici, formazione specialistica e
            attività di prevenzione. Ogni contributo aiuta a trasformare la conoscenza in nuove
            possibilità per il futuro della cura.
          </p>
          <ul className="grid gap-4 p-0">
            {benefits.map(([icon, label]) => (
              <li className="flex items-center gap-3 text-sm font-bold" key={label}>
                <Icon className="size-4 text-rose" name={icon} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <form
          className="relative bg-paper p-12 shadow-elevated before:absolute before:inset-3 before:border before:border-rose-soft before:content-[''] max-sm:p-7"
          action="#"
          aria-labelledby="donation-title"
        >
          <div className="relative mb-8 flex items-center gap-5">
            <span className={iconWrap}>
              <Icon className="size-[22px]" name="heart" />
            </span>
            <div>
              <p className="m-0 text-[10px] font-extrabold uppercase tracking-[0.15em] text-wine">
                Fai la tua parte
              </p>
              <h3
                className="mt-1 font-serif text-[29px] font-normal leading-tight max-sm:text-[25px]"
                id="donation-title"
              >
                Scegli il tuo contributo
              </h3>
            </div>
          </div>

          <fieldset className="relative m-0 border-0 p-0">
            <legend className="mb-3 text-xs font-bold">Importo della donazione</legend>
            <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-2">
              {[25, 50, 100, 250].map((amount) => (
                <label className="cursor-pointer" key={amount}>
                  <input
                    className="peer sr-only"
                    type="radio"
                    name="amount"
                    value={amount}
                    defaultChecked={amount === 50}
                  />
                  <span className="grid min-h-[55px] place-items-center border border-line bg-white font-serif text-xl text-wine transition peer-checked:border-wine peer-checked:bg-wine peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#ef9bae]">
                    {amount}€
                  </span>
                </label>
              ))}
              <label className="col-span-full cursor-pointer">
                <input className="peer sr-only" type="radio" name="amount" value="custom" />
                <span className="grid min-h-[55px] place-items-center border border-line bg-white text-sm font-bold text-wine transition peer-checked:border-wine peer-checked:bg-wine peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#ef9bae]">
                  Importo libero
                </span>
              </label>
            </div>
          </fieldset>

          <button className={`${button} relative mt-5 w-full`} type="submit">
            Dona ora <Icon className="size-[18px]" name="heart" />
          </button>
          <Link className={`${textLink} relative mx-auto mt-5 text-xs`} href="#trasparenza">
            Scopri come usiamo le donazioni <Icon className="size-4" name="arrow" />
          </Link>
          <p className="relative mt-6 flex gap-2 border-t border-line pt-5 text-[10px] leading-relaxed text-muted">
            <Icon className="size-4 shrink-0 text-rose" name="shield" />
            Le donazioni sono tracciabili e rendicontate. Puoi consultare documenti, bilanci e
            informazioni fiscali nella sezione Trasparenza.
          </p>
        </form>
      </div>
    </section>
  );
}
