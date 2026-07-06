"use client";

import { Icon as IconifyIcon } from "@iconify/react";
import { useState } from "react";

const iban = "IT46A0301503200000003758386";

export function IbanCopy() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copyIban() {
    try {
      await navigator.clipboard.writeText(iban);
      setStatus("copied");
    } catch {
      setStatus("error");
    }

    window.setTimeout(() => setStatus("idle"), 2200);
  }

  const label = status === "copied" ? "IBAN copiato" : status === "error" ? "Copia non riuscita" : "Copia IBAN";

  return (
    <>
      <button
        className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-wine px-5 text-sm font-bold text-wine transition hover:bg-wine hover:text-white"
        type="button"
        onClick={copyIban}
      >
        <IconifyIcon
          aria-hidden="true"
          className="size-4"
          icon={status === "copied" ? "solar:check-circle-linear" : "solar:copy-linear"}
        />
        {label}
      </button>
      <span className="sr-only" aria-live="polite">
        {status === "copied" ? "IBAN copiato negli appunti" : status === "error" ? "Impossibile copiare l’IBAN" : ""}
      </span>
    </>
  );
}
