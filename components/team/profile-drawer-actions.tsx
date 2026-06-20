"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/home/icons";
import type { WordPressPublication } from "@/lib/wordpress";

type DrawerView = "curriculum" | "publications";

type ProfileDrawerActionsProps = {
  curriculumKey: string;
  curriculumUrl: string;
  name: string;
  publicationPageUrl: string;
  publications: WordPressPublication[];
};

const actionClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-wine px-5 py-2.5 text-sm font-bold text-wine transition hover:bg-wine hover:text-white";

export function ProfileDrawerActions({
  curriculumKey,
  curriculumUrl,
  name,
  publicationPageUrl,
  publications,
}: ProfileDrawerActionsProps) {
  const [view, setView] = useState<DrawerView | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!view) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setView(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [view]);

  const drawer = (
    <AnimatePresence>
      {view ? (
        <>
          <motion.button
            className="fixed inset-0 z-[90] cursor-default bg-wine-deep/55 backdrop-blur-[2px]"
            type="button"
            aria-label="Chiudi il pannello"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setView(null)}
          />
          <motion.aside
            className="fixed bottom-0 right-0 top-0 z-[100] flex w-[min(100vw,760px)] flex-col bg-paper shadow-[-24px_0_70px_rgba(74,18,36,0.22)]"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-drawer-title"
            initial={reducedMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="flex items-start justify-between gap-6 border-b border-line px-6 py-6 sm:px-9">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose">
                  {view === "curriculum" ? "Curriculum" : "Pubblicazioni"}
                </p>
                <h2 className="mt-2 font-serif text-3xl font-normal text-ink" id="profile-drawer-title">
                  {name}
                </h2>
              </div>
              <button
                className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-wine transition hover:bg-rose-soft"
                type="button"
                aria-label="Chiudi"
                ref={closeButtonRef}
                onClick={() => setView(null)}
              >
                <span className="text-2xl leading-none" aria-hidden="true">&times;</span>
              </button>
            </header>

            {view === "curriculum" ? (
              <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-6">
                <iframe
                  className="min-h-0 flex-1 border border-line bg-white"
                  src={`/api/curriculum/${curriculumKey}`}
                  title={`Curriculum di ${name}`}
                />
                <Link
                  className="mt-4 inline-flex items-center justify-center gap-2 font-bold text-wine"
                  href={curriculumUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Apri il PDF in una nuova scheda <Icon className="size-4" name="arrow" />
                </Link>
              </div>
            ) : (
              <div
                className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-6 py-7 sm:px-9"
                data-lenis-prevent
              >
                {publications.length > 0 ? (
                  <>
                    <p className="mb-6 text-xs font-semibold text-muted">
                      Fonte: PubMed, tramite le pagine editoriali A-ROSE.
                    </p>
                    <ol className="grid gap-4">
                    {publications.map((publication, index) => (
                      <li className="border-b border-line pb-5" key={`${publication.href}-${index}`}>
                        <span className="text-[10px] font-bold text-rose">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-2 font-serif text-xl leading-snug text-ink">
                          {publication.title}
                        </h3>
                        {publication.summary ? (
                          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                            {publication.summary}
                          </p>
                        ) : null}
                        <Link
                          className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-wine"
                          href={publication.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Approfondisci <Icon className="size-4" name="arrow" />
                        </Link>
                      </li>
                    ))}
                    </ol>
                  </>
                ) : (
                  <p className="text-base leading-relaxed text-muted">
                    L&apos;elenco aggiornato è disponibile nella pagina delle pubblicazioni.
                  </p>
                )}
                <Link
                  className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-wine px-6 font-bold text-white"
                  href={publicationPageUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Vedi tutte le pubblicazioni <Icon className="size-4" name="arrow" />
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-3">
        <button className={actionClass} type="button" onClick={() => setView("curriculum")}>
          Curriculum <Icon className="size-4" name="arrow" />
        </button>
        <button className={actionClass} type="button" onClick={() => setView("publications")}>
          Pubblicazioni <Icon className="size-4" name="arrow" />
        </button>
      </div>
      {view && typeof document !== "undefined"
        ? createPortal(drawer, document.body)
        : null}
    </>
  );
}
