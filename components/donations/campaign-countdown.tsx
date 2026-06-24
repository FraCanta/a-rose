"use client";

import { useEffect, useMemo, useState } from "react";

type CampaignCountdownProps = {
  endDate?: string | null;
  className?: string;
  compact?: boolean;
};

type RemainingTime = {
  isExpired: boolean;
  days: number;
  hours: number;
  minutes: number;
};

export function CampaignCountdown({
  endDate,
  className = "",
  compact = false,
}: CampaignCountdownProps) {
  const targetDate = useMemo(() => parseEndDate(endDate), [endDate]);
  const [now, setNow] = useState(() => Date.now());
  const remaining = useMemo(
    () => getRemainingTime(targetDate, now),
    [targetDate, now],
  );

  useEffect(() => {
    if (!targetDate) return;

    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 60_000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  if (!targetDate) {
    return (
      <p className={`text-sm font-bold text-muted ${className}`}>
        Scadenza non impostata
      </p>
    );
  }

  if (remaining.isExpired) {
    return (
      <p className={`text-sm font-bold text-wine ${className}`}>
        Raccolta conclusa
      </p>
    );
  }

  if (compact) {
    return (
      <p className={`text-sm font-bold text-wine ${className}`}>
        Mancano {formatRemainingLabel(remaining)}
      </p>
    );
  }

  return (
    <div className={className} aria-label={`Mancano ${formatRemainingLabel(remaining)} alla fine della raccolta`}>
      <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-rose">
        Tempo rimanente
      </p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <CountdownBox label="Giorni" value={remaining.days} />
        <CountdownBox label="Ore" value={remaining.hours} />
        <CountdownBox label="Minuti" value={remaining.minutes} />
      </div>
    </div>
  );
}

function CountdownBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-wine/20 bg-white px-4 py-3 text-center">
      <p className="font-serif text-3xl leading-none text-wine">{value}</p>
      <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
    </div>
  );
}

function parseEndDate(value?: string | null) {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day, 23, 59, 59, 999);
}

function getRemainingTime(targetDate: Date | null, now: number): RemainingTime {
  if (!targetDate) return { isExpired: false, days: 0, hours: 0, minutes: 0 };

  const difference = targetDate.getTime() - now;
  if (difference <= 0) {
    return { isExpired: true, days: 0, hours: 0, minutes: 0 };
  }

  const totalMinutes = Math.floor(difference / 60_000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  return { isExpired: false, days, hours, minutes };
}

function formatRemainingLabel(remaining: RemainingTime) {
  const parts = [];

  if (remaining.days > 0) parts.push(`${remaining.days} giorni`);
  if (remaining.hours > 0) parts.push(`${remaining.hours} ore`);
  if (remaining.days === 0 && remaining.minutes > 0) {
    parts.push(`${remaining.minutes} minuti`);
  }

  return parts.join(" e ") || "meno di un minuto";
}
