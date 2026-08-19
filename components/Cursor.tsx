"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  // Only fine (mouse-class) pointers get the custom cursor — touch/coarse
  // pointers, and anyone with reduced-motion set, keep the native cursor.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isFinePointer && !prefersReducedMotion) {
      document.documentElement.classList.add("has-fine-cursor");
      // One-time client-only capability probe (matchMedia isn't available
      // during SSR) — not a synchronization loop, so this can't be derived
      // during render or moved out of an effect.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEnabled(true);
    }

    return () => {
      document.documentElement.classList.remove("has-fine-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let rafId: number;
    let visible = false;

    // `html` is rendered with a CSS `zoom` factor (see globals.css), which
    // scales `position: fixed` pixel values on render. `MouseEvent.clientX/Y`
    // are reported in real, unzoomed viewport pixels, so raw coordinates
    // must be divided by the zoom factor before being used as fixed offsets,
    // or the cursor drifts away from the real pointer as it moves.
    const zoom =
      parseFloat(getComputedStyle(document.documentElement).zoom) || 1;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / zoom;
      mouseY = e.clientY / zoom;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;

      if (!visible) {
        visible = true;
        cursor.style.opacity = "1";
        follower.style.opacity = "1";
        followerX = mouseX;
        followerY = mouseY;
      }
    };

    const onMouseLeaveWindow = () => {
      visible = false;
      cursor.style.opacity = "0";
      follower.style.opacity = "0";
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      rafId = requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => {
      cursor.classList.add("cursor-hover");
      follower.classList.add("cursor-hover");
    };
    const onMouseLeaveLink = () => {
      cursor.classList.remove("cursor-hover");
      follower.classList.remove("cursor-hover");
    };

    cursor.style.opacity = "0";
    follower.style.opacity = "0";

    document.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeaveWindow);
    animate();

    const addHoverListeners = () => {
      document
        .querySelectorAll("a, button, [data-cursor-hover]")
        .forEach((el) => {
          el.addEventListener("mouseenter", onMouseEnterLink);
          el.addEventListener("mouseleave", onMouseLeaveLink);
        });
    };
    addHoverListeners();

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        onMouseLeaveWindow
      );
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={cursorRef} className="cursor" aria-hidden="true" />
      <div ref={followerRef} className="cursor-follower" aria-hidden="true" />
    </>
  );
}
