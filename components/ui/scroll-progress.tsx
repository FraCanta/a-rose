"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { damping: 28, stiffness: 180, mass: 0.25 });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-rose"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
