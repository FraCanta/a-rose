"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/home/icons";

type MobileNavigationProps = {
  items: ReadonlyArray<readonly [string, string]>;
};

export function MobileNavigation({ items }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    firstLinkRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className="ml-auto lg:hidden">
      <button
        className="relative grid size-12 place-items-center rounded-full border border-wine/15 bg-wine text-white shadow-soft transition hover:bg-wine-deep"
        type="button"
        aria-controls="menu-mobile"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Chiudi il menu" : "Apri il menu"}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className={`absolute h-0.5 w-5 bg-current transition-transform duration-300 ${isOpen ? "rotate-45" : "-translate-y-1.5"}`} />
        <span className={`absolute h-0.5 w-5 bg-current transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
        <span className={`absolute h-0.5 w-5 bg-current transition-transform duration-300 ${isOpen ? "-rotate-45" : "translate-y-1.5"}`} />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              className="fixed inset-0 top-[84px] z-40 cursor-default bg-wine-deep/45 backdrop-blur-[2px]"
              type="button"
              aria-label="Chiudi il menu"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed bottom-0 right-0 top-[84px] z-50 flex w-[min(92vw,430px)] flex-col overflow-y-auto bg-paper shadow-[-24px_0_60px_rgba(74,18,36,0.18)]"
              id="menu-mobile"
              initial={reducedMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="border-b border-line px-6 py-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-rose">Esplora A-ROSE</p>
                <p className="mt-1.5 font-serif text-xl leading-tight text-ink">Ricerca, persone e futuro della cura.</p>
              </div>

              <nav className="grid min-h-0 flex-1 overflow-y-auto px-6 py-2" aria-label="Navigazione mobile">
                {items.map(([label, href], index) => (
                  <motion.div
                    key={href}
                    initial={reducedMotion ? false : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + index * 0.045, duration: 0.35 }}
                  >
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      className="group flex items-center gap-3 border-b border-line py-2.5 min-[375px]:py-3"
                      href={`/${href}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="w-6 text-[10px] font-bold tracking-wider text-rose">{String(index + 1).padStart(2, "0")}</span>
                      <span className="font-sans text-[17px] font-bold text-ink transition-colors min-[375px]:text-lg group-hover:text-wine">{label}</span>
                      <Icon className="ml-auto size-4 text-wine transition-transform group-hover:translate-x-1" name="arrow" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto bg-wine-deep px-6 py-5 text-white">
                <p className="mb-3 max-w-[290px] text-xs leading-relaxed text-white/75 [@media(max-height:650px)]:hidden">Ogni contributo avvicina la ricerca alla vita delle persone.</p>
                <Link
                  className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-white px-6 font-bold text-wine transition hover:bg-rose-soft"
                  href="/#dona"
                  onClick={() => setIsOpen(false)}
                >
                  Sostieni la ricerca <Icon className="size-[18px]" name="heart" />
                </Link>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
