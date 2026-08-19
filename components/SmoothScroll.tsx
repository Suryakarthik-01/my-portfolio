"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenisInstance } from "@/lib/smoothScroll";

// Replaces native CSS scroll-behavior with an inertia-based scroll engine
// (matches the fluid, weighted scroll feel of Vercel / Framer marketing
// pages). Kept as a single instance shared via lib/smoothScroll so anchor
// links (Navbar, Hero CTAs) animate through the same engine instead of
// fighting the browser's native smooth-scroll.
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    setLenisInstance(lenis);

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return null;
}
