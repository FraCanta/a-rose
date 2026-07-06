"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ImageGalleryProps = {
  images: string[];
  title: string;
  contain?: boolean;
  compact?: boolean;
};

export function ImageGallery({
  images,
  title,
  contain = false,
  compact = false,
}: ImageGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!activeImage) return;
    const previousOverflow = document.body.style.overflow;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", close);
    };
  }, [activeImage]);

  if (!images.length) return null;

  return (
    <>
      <div
        className={`grid gap-3 sm:gap-4 ${compact ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-1"}`}
      >
        {images.map((image, index) => (
          <button
            className={`group relative overflow-hidden bg-rose-soft ${contain ? "aspect-square border border-line bg-ivory" : compact ? "aspect-square sm:aspect-[4/3]" : "aspect-[4/3]"}`}
            type="button"
            aria-label={`Ingrandisci immagine ${index + 1} di ${title}`}
            key={image}
            onClick={() => setActiveImage(image)}
          >
            <Image
              className={`${contain ? "object-cover" : "object-cover"} transition duration-500 group-hover:scale-[1.03]`}
              src={image}
              alt={`Galleria dell'evento ${title}, immagine ${index + 1}`}
              fill
              sizes={
                compact
                  ? "(max-width: 639px) 46vw, (max-width: 1023px) 100vw, 430px"
                  : "(max-width: 639px) calc(100vw - 32px), 510px"
              }
            />
          </button>
        ))}
      </div>
      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {activeImage ? (
                <motion.div
                  className="fixed inset-0 z-[120] grid place-items-center bg-[#031f22]/95 p-4 sm:p-8"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Anteprima immagine"
                  initial={reducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveImage(null)}
                >
                  <button
                    className="absolute right-5 top-5 grid size-12 place-items-center rounded-full border border-white/30 text-3xl text-white"
                    type="button"
                    aria-label="Chiudi anteprima"
                    onClick={() => setActiveImage(null)}
                  >
                    &times;
                  </button>
                  <motion.div
                    className="relative h-[min(82vh,900px)] w-[min(92vw,1400px)]"
                    initial={reducedMotion ? false : { scale: 0.97 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.97 }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Image
                      className="object-contain"
                      src={activeImage}
                      alt={`Immagine ingrandita: ${title}`}
                      fill
                      sizes="92vw"
                      priority
                    />
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
