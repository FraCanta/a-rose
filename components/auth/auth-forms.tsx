"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";

const fieldClass =
  "min-h-12 w-full border border-wine/25 bg-white px-4 py-3 text-ink outline-none transition placeholder:text-muted/60 focus:border-wine focus:ring-2 focus:ring-rose-soft";

const buttonClass =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full bg-wine px-6 font-bold text-white transition hover:bg-wine-deep disabled:cursor-not-allowed disabled:opacity-55";

type Status = { type: "success" | "error"; text: string } | null;

export function AuthForms() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/area-personale";
  const [loginStatus, setLoginStatus] = useState<Status>(null);
  const [signupStatus, setSignupStatus] = useState<Status>(null);
  const [isLoginPending, setIsLoginPending] = useState(false);
  const [isSignupPending, setIsSignupPending] = useState(false);

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
    const { error } = await supabase.auth.signUp({
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
        text: error.message || "Registrazione non riuscita. Riprova.",
      });
      return;
    }

    setSignupStatus({
      type: "success",
      text: "Registrazione inviata. Se Supabase richiede conferma email, controlla la casella di posta.",
    });
    form.reset();
  }

  async function handlePasswordReset(email: string) {
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setLoginStatus({
        type: "error",
        text: "Inserisci prima la tua email nel campo di accesso.",
      });
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: `${window.location.origin}/area-personale`,
    });

    setLoginStatus(
      error
        ? { type: "error", text: "Non è stato possibile inviare il recupero password." }
        : { type: "success", text: "Se l’email è registrata, riceverai il link di recupero." },
    );
  }

  return (
    <div className="grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
      <form className="border border-wine/30 bg-white p-7 shadow-sm sm:p-10 lg:p-14" onSubmit={handleLogin}>
        <h2 className="font-serif text-5xl leading-none text-wine">Accedi</h2>
        <p className="mt-4 max-w-md text-base leading-7 text-ink">
          Inserisci le tue credenziali per accedere alle funzionalità riservate e gestire le tue iniziative.
        </p>

        <div className="mt-8 grid gap-5">
          <label className="grid gap-2 text-sm font-bold text-wine">
            Email
            <input autoComplete="email" className={fieldClass} name="loginEmail" required type="email" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-wine">
            Password
            <input autoComplete="current-password" className={fieldClass} name="loginPassword" required type="password" />
          </label>
        </div>

        <button
          className="mt-4 text-sm font-bold text-wine underline underline-offset-4 transition hover:text-wine-deep"
          type="button"
          onClick={(event) => {
            const form = event.currentTarget.form;
            const email = form?.querySelector<HTMLInputElement>('input[name="loginEmail"]')?.value || "";
            void handlePasswordReset(email);
          }}
        >
          Password dimenticata?
        </button>

        {loginStatus ? <StatusMessage status={loginStatus} /> : null}

        <button className={`${buttonClass} mt-8`} disabled={isLoginPending} type="submit">
          {isLoginPending ? "Accesso in corso..." : "Accedi"}
        </button>
      </form>

      <form className="border border-wine/30 bg-white p-7 shadow-sm sm:p-10 lg:p-14" onSubmit={handleSignup}>
        <h2 className="font-serif text-5xl leading-none text-wine">Registrati</h2>
        <p className="mt-4 max-w-md text-base leading-7 text-ink">
          Crea il tuo profilo per preparare raccolte fondi, salvare iniziative e accedere alle funzioni dedicate.
        </p>

        <div className="mt-8 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-wine">
              Nome
              <input autoComplete="given-name" className={fieldClass} name="firstName" required />
            </label>
            <label className="grid gap-2 text-sm font-bold text-wine">
              Cognome
              <input autoComplete="family-name" className={fieldClass} name="lastName" required />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-bold text-wine">
            Email
            <input autoComplete="email" className={fieldClass} name="signupEmail" required type="email" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-wine">
            Conferma email
            <input autoComplete="email" className={fieldClass} name="signupEmailConfirm" required type="email" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-wine">
            Password
            <input autoComplete="new-password" className={fieldClass} minLength={8} name="signupPassword" required type="password" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-wine">
            Conferma password
            <input autoComplete="new-password" className={fieldClass} minLength={8} name="signupPasswordConfirm" required type="password" />
          </label>
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
      </form>
    </div>
  );
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
