import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reimposta password | A-ROSE ODV",
  description: "Scegli una nuova password per il tuo profilo A-ROSE.",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <main id="contenuto" className="bg-ivory px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-wine">Area personale</p>
          <h1 className="mt-5 font-serif text-5xl leading-none text-ink sm:text-6xl">Reimposta la <em className="font-normal text-rose">password.</em></h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted">Questa pagina è accessibile dal link personale ricevuto via email.</p>
        </div>

        <div className="mt-12 border border-wine/25 bg-white p-7 shadow-soft sm:p-10 lg:p-14">
          <ResetPasswordForm />
        </div>
      </div>
    </main>
  );
}
