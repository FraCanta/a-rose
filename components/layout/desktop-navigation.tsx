"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icon as IconifyIcon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/home/icons";
import type { NavigationGroup } from "./navigation-data";

type DesktopNavigationProps = {
  compact?: boolean;
  items: readonly NavigationGroup[];
};

export function DesktopNavigation({ compact = false, items }: DesktopNavigationProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const navigationRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const close = (event: KeyboardEvent | MouseEvent) => {
      if (event instanceof KeyboardEvent && event.key === "Escape") setActiveMenu(null);
      if (event instanceof MouseEvent && !navigationRef.current?.contains(event.target as Node)) setActiveMenu(null);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", close);
    };
  }, []);

  return (
    <nav ref={navigationRef} className={`hidden h-full items-center gap-1 xl:flex ${compact ? "justify-center" : "justify-start"}`} aria-label="Navigazione principale">
      {items.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
        const isOpen = activeMenu === item.label;
        return (
          <div className="relative flex h-full items-center" key={item.label} onMouseEnter={() => item.children && setActiveMenu(item.label)}>
            {item.children ? (
              <button
                className={`inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap px-2.5 text-[11px] font-extrabold uppercase tracking-[0.08em] transition xl:px-3 xl:text-[12px] ${isActive || isOpen ? "text-wine" : "text-ink hover:text-wine"}`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`menu-${item.label.toLowerCase().replaceAll(" ", "-")}`}
                onClick={() => setActiveMenu(isOpen ? null : item.label)}
              >
                {item.label}
                <IconifyIcon
                  aria-hidden="true"
                  icon="solar:alt-arrow-down-linear"
                  className={`size-3.5 shrink-0 stroke-[1.8] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            ) : (
              <Link className={`inline-flex min-h-11 items-center px-2.5 text-[11px] font-extrabold uppercase tracking-[0.08em] transition xl:px-3 xl:text-[12px] ${isActive ? "text-wine" : "text-ink hover:text-wine"}`} href={item.href} onClick={() => setActiveMenu(null)}>{item.label}</Link>
            )}

            <AnimatePresence>
              {item.children && isOpen ? (
                <motion.div
                  className={`fixed inset-x-0 z-50 border-y border-line bg-white shadow-[0_28px_70px_rgba(55,18,31,0.14)] ${compact ? "top-20" : "top-[192px]"}`}
                  id={`menu-${item.label.toLowerCase().replaceAll(" ", "-")}`}
                  initial={reducedMotion ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <div className="mx-auto grid w-[min(1420px,calc(100%-72px))] grid-cols-[260px_1fr] gap-14 py-8">
                    <div className="border-r border-line pr-10">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose">{item.label}</p>
                      <p className="mt-4 font-serif text-2xl leading-tight text-ink">{item.description}</p>
                    </div>
                    <ul className="grid grid-cols-3 gap-x-5 gap-y-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link className="group flex min-h-[88px] items-start justify-between gap-4 border-b border-line px-3 py-4 transition hover:border-rose hover:bg-ivory focus-visible:bg-ivory" href={child.href} onClick={() => setActiveMenu(null)}>
                            <span><span className="block text-sm font-bold text-ink group-hover:text-wine">{child.label}</span><span className="mt-1.5 block text-xs leading-relaxed text-muted">{child.description}</span></span>
                            <Icon className="mt-1 size-3.5 shrink-0 text-rose transition-transform group-hover:translate-x-1" name="arrow" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}
