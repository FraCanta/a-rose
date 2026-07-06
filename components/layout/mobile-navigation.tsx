"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/home/icons";
import { AuthProfileLink } from "./auth-profile-link";
import type { NavigationGroup } from "./navigation-data";

type MobileNavigationProps = { items: readonly NavigationGroup[] };

export function MobileNavigation({ items }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const firstControlRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const closeMenu = () => {
    setIsOpen(false);
    setExpanded(null);
  };

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    firstControlRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className="xl:hidden">
      <button
        className="relative grid size-12 place-items-center text-wine transition hover:text-wine-deep"
        type="button"
        aria-controls="menu-mobile"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Chiudi il menu" : "Apri il menu"}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span
          className={`absolute h-0.5 w-5 bg-current transition-transform duration-300 ${isOpen ? "rotate-45" : "-translate-y-1.5"}`}
        />
        <span
          className={`absolute h-0.5 w-5 bg-current transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`absolute h-0.5 w-5 bg-current transition-transform duration-300 ${isOpen ? "-rotate-45" : "translate-y-1.5"}`}
        />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-[84px] z-50 flex flex-col overflow-hidden bg-paper"
            id="menu-mobile"
            initial={reducedMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav
              className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-8"
              aria-label="Navigazione mobile"
              data-lenis-prevent
            >
              {items.map((item, index) => {
                const isExpanded = expanded === item.label;
                const panelId = `mobile-${item.label.toLowerCase().replaceAll(" ", "-")}`;
                return (
                  <div className="border-b border-line" key={item.label}>
                    {item.children ? (
                      <button
                        ref={index === 0 ? firstControlRef : undefined}
                        className="flex min-h-14 w-full items-center gap-4 py-3 text-left"
                        type="button"
                        aria-controls={panelId}
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpanded(isExpanded ? null : item.label)
                        }
                      >
                        <span className="w-6 text-[10px] font-bold tracking-wider text-rose">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-base font-semibold uppercase tracking-[0.12em] text-ink">
                          {item.label}
                        </span>
                        <span
                          className={`ml-auto text-xl text-wine transition-transform ${isExpanded ? "rotate-45" : ""}`}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </button>
                    ) : (
                      <Link
                        className="flex min-h-14 items-center gap-4 py-3"
                        href={item.href}
                        onClick={closeMenu}
                      >
                        <span className="w-6 text-[10px] font-bold tracking-wider text-rose">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-base font-semibold uppercase tracking-[0.12em] text-ink">
                          {item.label}
                        </span>
                        <Icon
                          className="ml-auto size-4 text-wine"
                          name="arrow"
                        />
                      </Link>
                    )}

                    <AnimatePresence initial={false}>
                      {item.children && isExpanded ? (
                        <motion.div
                          className="overflow-hidden"
                          id={panelId}
                          initial={
                            reducedMotion ? false : { height: 0, opacity: 0 }
                          }
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="grid gap-1 pb-4 pl-10">
                            {item.children.map((child) => (
                              <Link
                                className="rounded-lg px-3 py-2.5 text-sm font-semibold tracking-[0.035em] text-ink transition hover:bg-rose-soft hover:text-wine"
                                href={child.href}
                                key={child.href}
                                onClick={closeMenu}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="border-t border-line bg-white px-5 py-4 sm:px-8">
              <AuthProfileLink
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-wine px-6 font-bold text-wine transition hover:bg-rose-soft"
                onClick={closeMenu}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
