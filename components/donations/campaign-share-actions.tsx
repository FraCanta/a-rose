"use client";

import { useState } from "react";
import { Icon } from "@/components/home/icons";

type CampaignShareActionsProps = {
  title: string;
  text: string;
  url: string;
};

export function CampaignShareActions({
  title,
  text,
  url,
}: CampaignShareActionsProps) {
  const [copied, setCopied] = useState(false);

  async function shareNative() {
    const shareData = { title, text, url };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2" aria-label="Condividi raccolta">
      <button
        className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-wine px-6 font-bold text-wine transition hover:bg-rose-soft"
        type="button"
        onClick={shareNative}
      >
        Condividi <Icon className="size-4" name="arrow" />
      </button>

      <button
        className="inline-flex min-h-13 items-center justify-center rounded-full border border-wine/35 px-6 font-bold text-wine transition hover:bg-rose-soft"
        type="button"
        onClick={copyLink}
      >
        {copied ? "Link copiato" : "Copia link"}
      </button>
    </div>
  );
}
