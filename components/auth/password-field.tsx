"use client";

import { useState, type InputHTMLAttributes } from "react";

const fieldClass =
  "min-h-12 w-full rounded-lg border border-wine/25 bg-white px-4 py-3 text-ink outline-none transition placeholder:text-muted/60 focus:border-wine focus:ring-2 focus:ring-rose-soft";

type PasswordFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "className"
> & {
  label: string;
  showStrength?: boolean;
};

export function PasswordField({
  label,
  showStrength = false,
  value,
  ...inputProps
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const password = typeof value === "string" ? value : "";

  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}
      <span className="relative block">
        <input
          {...inputProps}
          className={`${fieldClass} pr-12`}
          type={isVisible ? "text" : "password"}
          value={value}
        />
        <button
          aria-label={isVisible ? `Nascondi ${label.toLowerCase()}` : `Mostra ${label.toLowerCase()}`}
          aria-pressed={isVisible}
          className="absolute inset-y-0 right-0 grid w-12 place-items-center rounded-r-lg text-muted transition hover:text-wine focus-visible:outline-offset-[-3px]"
          onClick={() => setIsVisible((visible) => !visible)}
          type="button"
        >
          <EyeIcon hidden={isVisible} />
        </button>
      </span>
      {showStrength ? <PasswordStrength password={password} /> : null}
    </label>
  );
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {hidden ? (
        <><path d="m3 3 18 18" /><path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" /><path d="M9.9 4.2A10.7 10.7 0 0 1 12 4c6 0 9 8 9 8a16.8 16.8 0 0 1-2.1 3.3M6.6 6.6C4.2 8.2 3 12 3 12s3 8 9 8a9.8 9.8 0 0 0 4.2-.9" /></>
      ) : (
        <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>
      )}
    </svg>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const score = getPasswordStrength(password);
  const labels = ["Da compilare", "Debole", "Discreta", "Buona", "Forte"];
  const colors = ["bg-line", "bg-red-400", "bg-amber-400", "bg-rose", "bg-wine"];

  return (
    <span aria-live="polite" className="mt-1 block font-normal" role="status">
      <span aria-hidden="true" className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((segment) => (
          <span className={`h-1.5 rounded-full transition-colors ${segment <= score ? colors[score] : "bg-line"}`} key={segment} />
        ))}
      </span>
      <span className="mt-2 flex flex-col justify-between gap-1 text-xs text-muted sm:flex-row sm:gap-4">
        <span>Almeno 8 caratteri, con maiuscola, minuscola, numero e simbolo.</span>
        <strong className="shrink-0 text-ink">{labels[score]}</strong>
      </span>
    </span>
  );
}

function getPasswordStrength(password: string) {
  if (!password) return 0;

  return [
    password.length >= 8,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password) || password.length >= 12,
  ].filter(Boolean).length;
}
