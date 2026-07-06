"use client";

import { useId, useMemo, useState } from "react";

const currencyFormatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const integerFormatter = new Intl.NumberFormat("it-IT", {
  maximumFractionDigits: 0,
});

function estimateGrossIrpef(income: number) {
  const firstBracket = Math.min(income, 28_000) * 0.23;
  const secondBracket = Math.min(Math.max(income - 28_000, 0), 22_000) * 0.33;
  const thirdBracket = Math.max(income - 50_000, 0) * 0.43;

  return firstBracket + secondBracket + thirdBracket;
}

export function FivePerThousandCalculator() {
  const inputId = useId();
  const hintId = useId();
  const [value, setValue] = useState("");

  const grossIncome = useMemo(() => {
    const normalized = value.replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
  }, [value]);

  const estimate = grossIncome === null ? null : estimateGrossIrpef(grossIncome) * 0.005;
  const hasError = value.trim() !== "" && grossIncome === null;

  function updateIncome(rawValue: string) {
    const digits = rawValue.replace(/\D/g, "");
    setValue(digits ? integerFormatter.format(Number(digits)) : "");
  }

  return (
    <div className="grid overflow-hidden border border-wine/20 bg-white shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
      <div className="p-7 sm:p-10 lg:p-12">
        <label className="block font-serif text-3xl leading-tight text-ink sm:text-4xl" htmlFor={inputId}>
          Inserisci il tuo reddito lordo annuo
        </label>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted" id={hintId}>
          Inserisci il reddito complessivo annuo prima di imposte e detrazioni.
        </p>
        <div className="relative mt-7 max-w-md">
          <span className="pointer-events-none absolute inset-y-0 left-5 flex items-center font-serif text-2xl text-wine" aria-hidden="true">
            €
          </span>
          <input
            className="min-h-16 w-full border border-line bg-paper py-3 pl-12 pr-5 font-mono text-2xl text-ink outline-none transition placeholder:text-muted/35 focus:border-wine focus:ring-2 focus:ring-rose-soft"
            id={inputId}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            aria-describedby={hintId}
            aria-invalid={hasError}
            placeholder="30.000"
            value={value}
            onChange={(event) => updateIncome(event.target.value)}
          />
        </div>
        {hasError ? <p className="mt-3 text-sm font-semibold text-red-700" role="alert">Inserisci un importo valido.</p> : null}
      </div>

      <div className="flex min-h-64 flex-col justify-center bg-wine p-7 text-white sm:p-10 lg:p-12" aria-live="polite">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#efabb6]">
          Il tuo 5×1000 stimato
        </p>
        <p className="mt-5 font-serif text-[clamp(48px,7vw,82px)] leading-none tracking-[-0.045em]">
          {estimate === null ? "—" : currencyFormatter.format(estimate)}
        </p>
        <p className="mt-6 max-w-lg text-sm leading-7 text-white/75">
          Stima basata sugli scaglioni IRPEF 2026. Detrazioni, deduzioni e situazione personale possono modificare l’importo effettivo. Non è un costo aggiuntivo.
        </p>
      </div>
    </div>
  );
}
