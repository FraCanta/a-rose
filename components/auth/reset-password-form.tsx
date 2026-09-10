"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { PasswordField } from "@/components/auth/password-field";
import { createClient } from "@/utils/supabase/client";

type RecoveryState = "checking" | "ready" | "invalid" | "success";

export function ResetPasswordForm() {
  const router = useRouter();
  const [recoveryState, setRecoveryState] = useState<RecoveryState>("checking");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!active) return;
      setRecoveryState(!error && data.session ? "ready" : "invalid");
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === "PASSWORD_RECOVERY" || session) setRecoveryState("ready");
    });

    void checkSession();

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const newPassword = String(formData.get("password") || "");
    const passwordConfirm = String(formData.get("passwordConfirm") || "");

    if (newPassword.length < 8) {
      setErrorMessage("La password deve contenere almeno 8 caratteri.");
      return;
    }

    if (newPassword !== passwordConfirm) {
      setErrorMessage("Le password non coincidono.");
      return;
    }

    setIsPending(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setIsPending(false);

    if (error) {
      setErrorMessage(
        error.message.toLowerCase().includes("same password")
          ? "Scegli una password diversa da quella precedente."
          : "Non è stato possibile aggiornare la password. Il link potrebbe essere scaduto.",
      );
      return;
    }

    setRecoveryState("success");
    router.refresh();
  }

  if (recoveryState === "checking") {
    return <p className="text-center text-sm font-semibold text-muted" role="status">Verifica del link in corso…</p>;
  }

  if (recoveryState === "invalid") {
    return (
      <div className="text-center">
        <h2 className="font-serif text-3xl text-ink">Link non valido o scaduto</h2>
        <p className="mt-4 leading-7 text-muted">Richiedi un nuovo link dalla pagina di accesso inserendo prima il tuo indirizzo email.</p>
        <Link className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-wine px-7 font-bold text-white transition hover:bg-wine-deep" href="/area-personale">
          Torna all’accesso
        </Link>
      </div>
    );
  }

  if (recoveryState === "success") {
    return (
      <div className="text-center" role="status">
        <h2 className="font-serif text-3xl text-wine">Password aggiornata</h2>
        <p className="mt-4 leading-7 text-muted">La nuova password è attiva. Puoi continuare nella tua area personale.</p>
        <Link className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-wine px-7 font-bold text-white transition hover:bg-wine-deep" href="/area-personale">
          Vai all’area personale
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-serif text-4xl leading-none text-wine">Scegli una nuova password</h2>
      <p className="mt-4 leading-7 text-muted">Scegli una password unica e difficile da indovinare. L’indicatore ti aiuterà a renderla più sicura.</p>

      <div className="mt-8 grid gap-5">
        <PasswordField autoComplete="new-password" label="Nuova password" minLength={8} name="password" onChange={(event) => setPassword(event.currentTarget.value)} required showStrength value={password} />
        <PasswordField autoComplete="new-password" label="Conferma nuova password" minLength={8} name="passwordConfirm" required />
      </div>

      {errorMessage ? <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" role="alert">{errorMessage}</p> : null}

      <button className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-wine px-6 font-bold text-white transition hover:bg-wine-deep disabled:cursor-not-allowed disabled:opacity-55" disabled={isPending} type="submit">
        {isPending ? "Aggiornamento in corso…" : "Aggiorna password"}
      </button>
    </form>
  );
}
