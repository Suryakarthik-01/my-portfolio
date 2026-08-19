"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let rafId: number;

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
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
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

    document.addEventListener("mousemove", onMouseMove);
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
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" aria-hidden="true" />
      <div ref={followerRef} className="cursor-follower" aria-hidden="true" />
    </>
  );
}
