"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icon as IconifyIcon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavigationGroup } from "./navigation-data";
import { HealthMenu } from "./health-menu";

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
                className={`inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap px-2.5 text-[11px] font-semibold uppercase tracking-[0.13em] transition xl:px-3 xl:text-[12px] ${isActive || isOpen ? "text-wine" : "text-ink hover:text-wine"}`}
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
              <Link className={`inline-flex min-h-11 items-center px-2.5 text-[11px] font-semibold uppercase tracking-[0.13em] transition xl:px-3 xl:text-[12px] ${isActive ? "text-wine" : "text-ink hover:text-wine"}`} href={item.href} onClick={() => setActiveMenu(null)}>{item.label}</Link>
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
                  <div className={`mx-auto w-[min(1600px,calc(100%-72px))] overflow-y-auto py-9 ${compact ? "max-h-[calc(100dvh-80px)]" : "max-h-[calc(100dvh-192px)]"}`}>
                    <HealthMenu group={item} links={item.children} onNavigate={() => setActiveMenu(null)} />
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
