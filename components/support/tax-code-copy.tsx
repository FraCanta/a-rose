"use client";

import { Icon as IconifyIcon } from "@iconify/react";
import { useState } from "react";

const taxCode = "93096710384";

export function TaxCodeCopy() {
  const [copied, setCopied] = useState(false);

  async function copyTaxCode() {
    await navigator.clipboard.writeText(taxCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-wine transition hover:bg-rose-soft" type="button" onClick={copyTaxCode}>
        <IconifyIcon aria-hidden="true" className="size-4" icon={copied ? "solar:check-circle-linear" : "solar:copy-linear"} />
        {copied ? "Codice copiato" : "Copia il codice fiscale"}
      </button>
      <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/55 px-6 text-sm font-bold text-white transition hover:bg-white/10" href={`mailto:?subject=5x1000 ad A-ROSE ODV&body=Per destinare il 5x1000 ad A-ROSE ODV usa il codice fiscale ${taxCode}.`}>
        <IconifyIcon aria-hidden="true" className="size-4" icon="solar:letter-linear" />
        Invia un promemoria
      </a>
      <span className="sr-only" aria-live="polite">{copied ? "Codice fiscale copiato negli appunti" : ""}</span>
    </div>
  );
}
