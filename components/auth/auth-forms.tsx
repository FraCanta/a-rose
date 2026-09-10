"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { PasswordField } from "@/components/auth/password-field";
import { createClient } from "@/utils/supabase/client";

const fieldClass =
  "min-h-12 w-full rounded-lg border border-wine/25 bg-white px-4 py-3 text-ink outline-none transition placeholder:text-muted/60 focus:border-wine focus:ring-2 focus:ring-rose-soft";

const buttonClass =
  "inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-wine px-6 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-wine-deep hover:shadow-md disabled:cursor-not-allowed disabled:opacity-55";

type Status = { type: "success" | "error"; text: string } | null;
type AuthMode = "login" | "signup" | "recovery";

export function AuthForms() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/area-personale";
  const [mode, setMode] = useState<AuthMode>(() =>
    searchParams.get("mode") === "signup" ? "signup" : "login",
  );
  const [loginStatus, setLoginStatus] = useState<Status>(null);
  const [signupStatus, setSignupStatus] = useState<Status>(null);
  const [isLoginPending, setIsLoginPending] = useState(false);
  const [isSignupPending, setIsSignupPending] = useState(false);
  const [signupPassword, setSignupPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryStatus, setRecoveryStatus] = useState<Status>(null);
  const [isRecoveryPending, setIsRecoveryPending] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginStatus(null);
    setIsLoginPending(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("loginEmail") || "").trim();
    const password = String(formData.get("loginPassword") || "");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setIsLoginPending(false);

    if (error) {
      setLoginStatus({
        type: "error",
        text: "Credenziali non valide. Controlla email e password.",
      });
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSignupStatus(null);
    setIsSignupPending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("signupEmail") || "").trim();
    const emailConfirm = String(formData.get("signupEmailConfirm") || "").trim();
    const password = String(formData.get("signupPassword") || "");
    const passwordConfirm = String(formData.get("signupPasswordConfirm") || "");

    if (email !== emailConfirm) {
      setSignupStatus({ type: "error", text: "Le email non coincidono." });
      setIsSignupPending(false);
      return;
    }

    if (password !== passwordConfirm) {
      setSignupStatus({ type: "error", text: "Le password non coincidono." });
      setIsSignupPending(false);
      return;
    }

    if (!formData.get("privacy")) {
      setSignupStatus({
        type: "error",
        text: "Per registrarti devi accettare l’informativa privacy.",
      });
      setIsSignupPending(false);
      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          privacy_accepted: true,
        },
        emailRedirectTo: `${window.location.origin}${redirectTo}`,
      },
    });

    setIsSignupPending(false);

    if (error) {
      setSignupStatus({
        type: "error",
        text: isExistingAccountError(error)
          ? "Esiste già un account associato a questa email. Torna al login oppure usa “Password dimenticata?”."
          : "Non è stato possibile completare la registrazione. Controlla i dati e riprova.",
      });
      return;
    }

    if (data.user?.identities?.length === 0) {
      setSignupStatus({
        type: "error",
        text: "Esiste già un account associato a questa email. Torna al login oppure usa “Password dimenticata?”.",
      });
      return;
    }

    setSignupStatus({
      type: "success",
      text: "Controlla la tua email: ti abbiamo inviato un link per confermare l’indirizzo e completare la registrazione. Se non lo trovi, verifica anche la cartella Spam.",
    });
    setSignupPassword("");
    form.reset();
  }

  async function handlePasswordReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isRecoveryPending) return;
    setRecoveryStatus(null);
    setIsRecoveryPending(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(recoveryEmail.trim(), {
      redirectTo: `${window.location.origin}/reimposta-password`,
    });

    setRecoveryStatus(
      error
        ? { type: "error", text: "Non è stato possibile inviare il recupero password." }
        : { type: "success", text: "Controlla la tua email. Se l’indirizzo è associato a un account, troverai il link per scegliere una nuova password. Verifica anche la cartella Spam." },
    );
    } catch {
      setRecoveryStatus({ type: "error", text: "Invio non riuscito. Controlla la connessione e riprova tra qualche istante." });
    } finally {
      setIsRecoveryPending(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[560px]">
      {mode === "login" ? (
      <form aria-label="Accedi al tuo profilo" onSubmit={handleLogin}>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose">Il tuo spazio A‑ROSE</p>
        <h2 className="mt-3 font-serif text-5xl leading-none text-ink sm:text-6xl">Bentornato/a.</h2>
        <p className="mt-4 max-w-md text-base leading-7 text-muted">Accedi per gestire il tuo profilo e le raccolte fondi che hai creato.</p>

        <div className="mt-8 grid gap-5">
          <label className="grid gap-2 text-sm font-bold text-ink">
            Email
            <input autoComplete="email" className={fieldClass} name="loginEmail" required type="email" />
          </label>
          <PasswordField autoComplete="current-password" label="Password" name="loginPassword" required />
        </div>

        <button
          className="mt-4 block w-fit text-sm font-bold text-wine underline underline-offset-4 transition hover:text-wine-deep sm:ml-auto"
          type="button"
          onClick={(event) => {
            const form = event.currentTarget.form;
            const email = form?.querySelector<HTMLInputElement>('input[name="loginEmail"]')?.value || "";
            setRecoveryEmail(email);
            setRecoveryStatus(null);
            setMode("recovery");
          }}
        >
          Password dimenticata?
        </button>

        {loginStatus ? <StatusMessage status={loginStatus} /> : null}

        <button className={`${buttonClass} mt-8`} disabled={isLoginPending} type="submit">
          {isLoginPending ? "Accesso in corso..." : "Accedi"}
        </button>
        <p className="mt-7 text-center text-sm text-muted">Non hai ancora un account? <button className="font-bold text-wine underline underline-offset-4 transition hover:text-wine-deep" onClick={() => setMode("signup")} type="button">Crea account</button></p>
      </form>
      ) : mode === "recovery" ? (
      <form aria-label="Recupera la password" onSubmit={handlePasswordReset}>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose">Il tuo spazio A‑ROSE</p>
        <h2 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">Password dimenticata?</h2>
        <p className="mt-4 text-base leading-7 text-muted">Inserisci l’email usata per creare il tuo account. Riceverai un link per scegliere una nuova password.</p>
        <label className="mt-8 grid gap-2 text-sm font-bold text-ink">
          Email del tuo account
          <input autoComplete="email" className={fieldClass} name="recoveryEmail" required type="email" value={recoveryEmail} onChange={(event) => { setRecoveryEmail(event.currentTarget.value); setRecoveryStatus(null); }} />
        </label>
        {recoveryStatus ? <StatusMessage status={recoveryStatus} /> : null}
        <button className={`${buttonClass} mt-8`} disabled={isRecoveryPending || recoveryStatus?.type === "success"} type="submit">
          {isRecoveryPending ? "Invio in corso…" : recoveryStatus?.type === "success" ? "Richiesta inviata" : "Invia il link di recupero"}
        </button>
        <p className="mt-7 text-center text-sm"><button className="font-bold text-wine underline underline-offset-4" onClick={() => setMode("login")} type="button">Torna al login</button></p>
        <p className="mt-6 text-sm leading-6 text-muted">Non ricordi quale email hai usato? <Link className="font-bold text-wine underline underline-offset-4" href="/contatti">Contattaci per assistenza</Link>.</p>
      </form>
      ) : (
      <form aria-label="Crea il tuo profilo" onSubmit={handleSignup}>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose">Partecipa in prima persona</p>
        <h2 className="mt-3 font-serif text-5xl leading-none text-ink sm:text-6xl">Crea il tuo profilo.</h2>
        <p className="mt-4 max-w-lg text-base leading-7 text-muted">Bastano pochi minuti per iniziare una raccolta fondi e sostenere concretamente la ricerca.</p>

        <div className="mt-8 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-ink">
              Nome
              <input autoComplete="given-name" className={fieldClass} name="firstName" required />
            </label>
            <label className="grid gap-2 text-sm font-bold text-ink">
              Cognome
              <input autoComplete="family-name" className={fieldClass} name="lastName" required />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-bold text-ink">
            Email
            <input autoComplete="email" className={fieldClass} name="signupEmail" required type="email" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-ink">
            Conferma email
            <input autoComplete="email" className={fieldClass} name="signupEmailConfirm" required type="email" />
          </label>
          <PasswordField autoComplete="new-password" label="Password" minLength={8} name="signupPassword" onChange={(event) => setSignupPassword(event.currentTarget.value)} required showStrength value={signupPassword} />
          <PasswordField autoComplete="new-password" label="Conferma password" minLength={8} name="signupPasswordConfirm" required />
        </div>

        <p className="mt-5 text-sm leading-6 text-ink">
          La password deve contenere almeno 8 caratteri. Ti consigliamo di usare lettere maiuscole, minuscole, numeri e un carattere speciale.
        </p>

        <div className="mt-8 border-t border-line pt-6">
          <label className="flex items-start gap-3 text-sm leading-6 text-ink">
            <input className="mt-1 size-4 shrink-0 accent-wine" name="privacy" required type="checkbox" />
            <span>
              Dichiaro di aver letto e compreso l’
              <Link className="font-bold text-wine underline underline-offset-4" href="/privacy-policy">
                informativa privacy
              </Link>{" "}
              sui trattamenti dei dati personali effettuati da A-ROSE ODV.
            </span>
          </label>
        </div>

        {signupStatus ? <StatusMessage status={signupStatus} /> : null}

        <button className={`${buttonClass} mt-8`} disabled={isSignupPending} type="submit">
          {isSignupPending ? "Registrazione in corso..." : "Registrati"}
        </button>
        <p className="mt-7 text-center text-sm text-muted">Hai già un account? <button className="font-bold text-wine underline underline-offset-4 transition hover:text-wine-deep" onClick={() => setMode("login")} type="button">Torna al login</button></p>
      </form>
      )}

      <div className="mt-9 flex items-center justify-center gap-2 border-t border-line pt-7 text-xs text-muted">
        <svg aria-hidden="true" className="size-4 text-wine" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>
        I tuoi dati sono protetti
      </div>
    </div>
  );
}

function isExistingAccountError(error: { code?: string; message?: string }) {
  const message = error.message?.toLowerCase() ?? "";
  return error.code === "user_already_exists" || message.includes("already registered") || message.includes("already exists");
}

function StatusMessage({ status }: { status: Exclude<Status, null> }) {
  return (
    <p
      className={`mt-5 rounded-2xl px-4 py-3 text-sm font-semibold ${
        status.type === "success" ? "bg-rose-soft text-wine" : "bg-red-50 text-red-700"
      }`}
      role="status"
    >
      {status.text}
    </p>
  );
}
