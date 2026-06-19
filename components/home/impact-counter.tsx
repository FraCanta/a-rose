"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./icons";

type ImpactCounterProps = {
  icon: IconName;
  label: string;
  value: number;
};

export function ImpactCounter({ icon, label, value }: ImpactCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.65, once: true });
  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView || reducedMotion) return;

    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, reducedMotion, value]);

  const visibleValue = reducedMotion ? value : displayValue;

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center px-6 py-12 text-center max-sm:py-9"
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="mb-5 grid size-14 place-items-center rounded-full bg-rose-soft text-rose">
        <Icon className="size-7" name={icon} />
      </span>
      <strong
        className="font-serif text-[clamp(52px,5vw,72px)] font-normal leading-none tabular-nums text-wine"
        aria-label={`Più di ${value} ${label}`}
      >
        <span aria-hidden="true">+</span>
        <span aria-hidden="true">{visibleValue.toLocaleString("it-IT")}</span>
      </strong>
      <span className="mt-3 text-sm font-bold text-ink">{label}</span>
    </motion.div>
  );
}
