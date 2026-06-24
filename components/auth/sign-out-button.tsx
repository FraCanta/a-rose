"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function signOut() {
    setIsPending(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/area-personale");
    router.refresh();
  }

  return (
    <button
      className={className}
      disabled={isPending}
      type="button"
      onClick={signOut}
    >
      {isPending ? "Uscita..." : "Esci"}
    </button>
  );
}
