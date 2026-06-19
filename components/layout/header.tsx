"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/components/home/data";
import { Icon } from "@/components/home/icons";
import { button } from "@/components/home/styles";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-wine/10 bg-white">
      <div className="relative z-[60] mx-auto grid min-h-24 w-full max-w-site grid-cols-[auto_1fr_auto] items-center px-4 lg:px-12 2xl:px-0 max-sm:min-h-[84px]">
        <Link
          className="flex shrink-0 items-center"
          href="/"
          aria-label="A-ROSE ODV, homepage"
          onClick={closeMenu}
        >
          <Image
            className="block h-auto w-44 object-contain max-sm:w-32"
            src="/brand/logo2_arose_positivo.png"
            alt="A-ROSE ODV"
            width={1200}
            height={1300}
            priority
          />
        </Link>

        <nav
          className="hidden items-center justify-center gap-6 text-[13px] font-bold lg:flex xl:gap-9"
          aria-label="Navigazione principale"
        >
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              className="whitespace-nowrap font-sans transition-colors hover:text-wine"
              href={`/${href}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link className={`${button} hidden lg:inline-flex`} href="/#dona">
          Sostieni la ricerca <Icon className="size-[18px]" name="heart" />
        </Link>

        <button
          type="button"
          className="relative ml-auto grid size-11 place-content-center lg:hidden"
          aria-label={menuOpen ? "Chiudi il menu" : "Apri il menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 bg-ink transition duration-300 ${
              menuOpen
                ? "-translate-y-1/2 rotate-45"
                : "-translate-y-[9px] rotate-0"
            }`}
          />

          <span
            className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 bg-ink transition duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />

          <span
            className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 bg-ink transition duration-300 ${
              menuOpen
                ? "-translate-y-1/2 -rotate-45"
                : "translate-y-[7px] rotate-0"
            }`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-paper px-4 pt-[110px] transition duration-300 lg:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <nav
          className="mx-auto flex h-full max-w-site flex-col"
          aria-label="Navigazione mobile"
        >
          <div className="grid gap-1">
            {navigation.map(([label, href]) => (
              <Link
                key={href}
                className=" py-3 text-xl font-bold text-ink transition-colors hover:text-wine"
                href={`/${href}`}
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}
          </div>

          <Link
            className="mt-8 inline-flex min-h-[56px] items-center justify-center gap-3 rounded-full border border-wine bg-wine px-7 py-3 font-bold leading-tight text-white transition hover:-translate-y-0.5 hover:border-wine-deep hover:bg-wine-deep"
            href="/#dona"
            onClick={closeMenu}
          >
            Sostieni la ricerca <Icon className="size-[18px]" name="heart" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
