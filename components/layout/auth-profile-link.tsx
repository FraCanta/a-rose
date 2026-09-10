"use client";

import { Icon as IconifyIcon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState, type MouseEventHandler } from "react";
import type { User } from "@supabase/supabase-js";
import {
  createClient,
  isSupabaseConfigured,
} from "@/utils/supabase/client";

export function AuthProfileLink({
  className,
  iconClassName = "size-5",
  onClick,
}: {
  className?: string;
  iconClassName?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const supabase = createClient();
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (active) setUserName(getUserName(data.session?.user));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserName(getUserName(session?.user));
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Link className={className} href="/area-personale" onClick={onClick}>
      <IconifyIcon
        aria-hidden="true"
        className={iconClassName}
        icon="solar:user-rounded-linear"
      />
      {userName ?? "Accedi / Registrati"}
    </Link>
  );
}

function getUserName(user?: User): string | null {
  if (!user) return null;

  const firstName = user.user_metadata?.first_name;
  if (typeof firstName === "string" && firstName.trim()) return firstName.trim();

  return user.email?.split("@")[0] || "Il tuo profilo";
}
