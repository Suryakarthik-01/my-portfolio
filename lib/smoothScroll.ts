import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function scrollToSection(target: string) {
  if (typeof document === "undefined") return;

  if (instance) {
    instance.scrollTo(target, { offset: -72, duration: 1.1 });
    return;
  }

  document.querySelector(target)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
