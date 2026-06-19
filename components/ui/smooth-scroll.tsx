"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) return;

    const lenis = new Lenis({
      anchors: true,
      autoRaf: true,
      duration: 1.1,
      smoothWheel: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
