"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/home/icons";
import { Entrance } from "@/components/ui/entrance";
import { AuthProfileLink } from "./auth-profile-link";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import { navigation } from "./navigation-data";

export function Header() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsCompact(window.scrollY > 80);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-wine/10 bg-white">
      <Entrance className="hidden xl:block" direction="down">
        <div
          className={`overflow-hidden transition-[height,opacity] duration-300 ease-out ${isCompact ? "h-0 opacity-0" : "h-28 opacity-100"}`}
        >
          <div className="mx-auto flex h-full w-full max-w-site items-center justify-between px-8 2xl:px-0">
            <BrandLogo active={!isCompact} desktop />

            <div className="flex items-center gap-10">
              <Link
                className="text-sm font-semibold text-ink transition hover:text-wine"
                href="/come-sostenerci/aziende-e-partner"
                tabIndex={isCompact ? -1 : undefined}
              >
                Sostienici con la tua azienda
              </Link>
              <Link
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-wine px-7 text-base font-bold text-white transition hover:bg-wine-deep"
                href="/sostieni-la-ricerca"
                tabIndex={isCompact ? -1 : undefined}
              >
                Sostieni la ricerca{" "}
                <Icon className="size-[18px]" name="heart" />
              </Link>
            </div>
          </div>
        </div>
        <div className="h-20 border-t border-wine/10">
          <div
            className={`mx-auto grid h-full w-full max-w-site items-center px-8 transition-[grid-template-columns,gap] duration-300 2xl:px-0 ${isCompact ? "grid-cols-[auto_1fr_auto] gap-6" : "grid-cols-[0fr_1fr_auto] gap-0"}`}
          >
            <div
              className={`min-w-0 overflow-hidden transition-opacity duration-200 ${isCompact ? "opacity-100" : "opacity-0"}`}
              aria-hidden={!isCompact}
            >
              <BrandLogo active={isCompact} compact />
            </div>

            <DesktopNavigation compact={isCompact} items={navigation} />

            <div className="min-w-0 overflow-hidden">
              {isCompact ? (
                <div className="flex items-center gap-5">
                  <AuthProfileLink className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink transition hover:text-wine" />
                  <Link
                    className="inline-flex min-h-12 whitespace-nowrap items-center gap-2.5 rounded-full bg-wine px-6 text-sm font-bold text-white transition hover:bg-wine-deep"
                    href="/sostieni-la-ricerca"
                  >
                    Sostieni la ricerca <Icon className="size-4" name="heart" />
                  </Link>
                </div>
              ) : (
                <AuthProfileLink
                  className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink transition hover:text-wine"
                />
              )}
            </div>
          </div>
        </div>
      </Entrance>

      <Entrance
        className="relative z-[60] mx-auto grid min-h-[84px] w-full max-w-site grid-cols-[auto_1fr_auto] items-center gap-2 px-4 sm:px-8 xl:hidden"
        direction="down"
      >
        <BrandLogo />
        <Link
          className="inline-flex min-h-11 justify-self-end items-center gap-2 whitespace-nowrap rounded-full bg-wine px-4 text-sm font-bold text-white transition hover:bg-wine-deep 2xs:px-3 xs:px-4"
          href="/sostieni-la-ricerca"
        >
          Dona ora <Icon className=" size-4 block" name="heart" />
        </Link>
        <MobileNavigation items={navigation} />
      </Entrance>
    </header>
  );
}

function BrandLogo({
  active = true,
  compact = false,
  desktop = false,
}: {
  active?: boolean;
  compact?: boolean;
  desktop?: boolean;
}) {
  return (
    <Link
      className="flex shrink-0 items-center"
      href="/"
      aria-label="A-ROSE ODV, homepage"
      tabIndex={active ? undefined : -1}
    >
      <Image
        className={`block h-auto object-contain ${compact ? "w-40" : desktop ? "w-52" : "w-32 xs:w-36 sm:w-40"}`}
        src="/brand/logo2_arose_positivo.png"
        alt="A-ROSE ODV"
        width={1200}
        height={400}
        sizes={desktop && !compact ? "208px" : "160px"}
        loading="eager"
      />
    </Link>
  );
}
