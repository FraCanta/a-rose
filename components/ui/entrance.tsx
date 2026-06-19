"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type EntranceProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "down" | "fade" | "left" | "right" | "up";
  scaleFrom?: number;
};

const offsets = {
  down: { x: 0, y: -24 },
  fade: { x: 0, y: 0 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  up: { x: 0, y: 28 },
};

export function Entrance({
  children,
  className,
  delay = 0,
  direction = "up",
  scaleFrom = 1,
}: EntranceProps) {
  const reducedMotion = useReducedMotion();
  const offset = offsets[direction];

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, scale: scaleFrom, ...offset }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
