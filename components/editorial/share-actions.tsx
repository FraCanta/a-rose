"use client";

import { useState } from "react";

type ShareActionsProps = {
  title: string;
};

const shareButton =
  "inline-flex min-h-10 items-center justify-center rounded-full border border-line bg-white px-4 text-xs font-bold text-wine transition hover:border-wine hover:bg-rose-soft focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-rose";

export function ShareActions({ title }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Condividi questo contenuto">
      <button className={shareButton} type="button" onClick={share}>
        Condividi
      </button>
      <button className={shareButton} type="button" onClick={copyLink}>
        {copied ? "Link copiato" : "Copia link"}
      </button>
    </div>
  );
}
