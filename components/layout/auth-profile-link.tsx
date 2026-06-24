"use client";

import { Icon as IconifyIcon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState, type MouseEventHandler } from "react";
import { createClient } from "@/utils/supabase/client";

export function AuthProfileLink({
  className,
  iconClassName = "size-5",
  onClick,
}: {
  className?: string;
  iconClassName?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) setIsLoggedIn(Boolean(data.user));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session?.user));
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
      {isLoggedIn ? "Il tuo profilo" : "Accedi / Registrati"}
    </Link>
  );
}
