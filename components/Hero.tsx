"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { FaReact } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import HeroGlobe from "./HeroGlobe";

function useTypewriter(text: string, speed = 45, startDelay = 300) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let charIndex = 0;
    let interval: ReturnType<typeof setInterval>;

    const start = setTimeout(() => {
      interval = setInterval(() => {
        charIndex += 1;
        setDisplayed(text.slice(0, charIndex));

        if (charIndex >= text.length) {
          clearInterval(interval);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return displayed;
}

// Equalizes the visual width of two headline lines by nudging letter-spacing
// on the shorter one, so short/long lines read as the same measure.
function useEqualizeWidth(
  referenceRef: React.RefObject<HTMLElement | null>,
  targetRef: React.RefObject<HTMLElement | null>
) {
  const [tracking, setTracking] = useState(0);

  useEffect(() => {
    const equalize = () => {
      const reference = referenceRef.current;
      const target = targetRef.current;

      if (!reference || !target) return;

      target.style.letterSpacing = "0px";

      const widthReference = reference.getBoundingClientRect().width;
      const widthTarget = target.getBoundingClientRect().width;
      const chars = (target.textContent || "").length;

      const extra =
        chars > 1 ? Math.max(0, (widthReference - widthTarget) / (chars - 1)) : 0;

      setTracking(extra);
    };

    equalize();
    window.addEventListener("resize", equalize);

    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(equalize);
    }

    return () => window.removeEventListener("resize", equalize);
  }, [referenceRef, targetRef]);

  return tracking;
}

const techStack = [
  { icon: <FaReact size={16} />, label: "React" },
  { icon: <span className="text-[13px] font-bold">N</span>, label: "Next.js" },
  { icon: <span className="text-[11px] font-bold">TS</span>, label: "TypeScript" },
  { icon: <SiTailwindcss size={15} />, label: "Tailwind CSS" },
];

type ProjectTheme = "dark" | "light" | "wave" | "shapes";

const featuredProjects: {
  name: string;
  desc: string;
  theme: ProjectTheme;
}[] = [
  { name: "LUMEN", desc: "AI SaaS Platform", theme: "dark" },
  { name: "ECHO", desc: "Real-time Chat App", theme: "light" },
  { name: "NEXORA", desc: "Modern Landing Page", theme: "wave" },
  { name: "PIXELAB", desc: "Design Studio Website", theme: "shapes" },
];

const CONTAINER = "mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8";

function ProjectCard({
  name,
  desc,
  theme,
}: {
  name: string;
  desc: string;
  theme: ProjectTheme;
}) {
  const isDark = theme === "dark" || theme === "wave";

  return (
    <Link
      href="#projects"
      className={`group relative flex aspect-[4/3] flex-col justify-between overflow-hidden border-l border-neutral-200 p-5 transition-colors sm:aspect-auto sm:h-full ${
        isDark ? "bg-neutral-950" : "bg-neutral-100"
      }`}
    >
      {/* Decorative background per theme */}
      {theme === "dark" && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neutral-700/40 via-neutral-950 to-black" />
      )}
      {theme === "wave" && (
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(100deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 10px)",
          }}
        />
      )}
      {theme === "shapes" && (
        <div className="pointer-events-none absolute right-3 top-3 h-16 w-16 rotate-12 border border-neutral-400/60" />
      )}

      <div className="relative z-10">
        <p
          className={`text-sm font-extrabold uppercase tracking-wide ${
            isDark ? "text-white" : "text-neutral-900"
          }`}
        >
          {name}
        </p>
        <p
          className={`mt-1 text-xs ${
            isDark ? "text-neutral-400" : "text-neutral-500"
          }`}
        >
          {desc}
        </p>
      </div>

      <span
        className={`relative z-10 ml-auto flex h-8 w-8 items-center justify-center rounded-full border transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
          isDark
            ? "border-white/20 text-white"
            : "border-neutral-300 text-neutral-700"
        }`}
      >
        <ArrowUpRight size={14} />
      </span>
    </Link>
  );
}

export default function Hero() {
  const typedGreeting = useTypewriter("Hey, I'm Karthik", 45, 300);
  const typingDone = typedGreeting.length === "Hey, I'm Karthik".length;

  const lineARef = useRef<HTMLSpanElement>(null);
  const lineBRef = useRef<HTMLSpanElement>(null);
  const lineBTracking = useEqualizeWidth(lineARef, lineBRef);

  return (
    <section id="home" className="relative w-full bg-white pt-20">
      {/* HEADLINE + GLOBE */}
      <div className={`relative grid grid-cols-1 gap-y-10 py-6 lg:grid-cols-2 lg:gap-x-16 lg:py-8 ${CONTAINER}`}>
        {/* LEFT — copy */}
        <div className="relative flex flex-col justify-center pl-2 sm:pl-4 lg:pl-10 xl:pl-16">
          {/* decorative sparkle rail */}
          <div className="pointer-events-none absolute -left-6 top-1/4 hidden flex-col items-center xl:flex">
            <span className="h-16 w-px bg-neutral-300" />
            <Sparkles className="my-2 h-3.5 w-3.5 text-neutral-400" />
          </div>

          <p className="flex items-center text-xs font-medium uppercase tracking-[0.35em] text-neutral-700">
            {typedGreeting}
            <span
              className={`ml-1 inline-block h-3 w-[2px] bg-neutral-700 ${
                typingDone ? "animate-blink" : "opacity-100"
              }`}
            />
          </p>

          <h1
            className="mt-4 flex flex-col items-start gap-1 uppercase leading-[1.05] tracking-tight text-neutral-950 lg:gap-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span
              ref={lineARef}
              className="block whitespace-nowrap text-[clamp(2.25rem,5vw,4.75rem)]"
            >
              I Build Digital
            </span>
            <span
              ref={lineBRef}
              className="block whitespace-nowrap text-[clamp(2.25rem,5vw,4.75rem)]"
              style={{ letterSpacing: `${lineBTracking}px` }}
            >
              Experiences
            </span>
            <span className="block text-[clamp(1.65rem,3.5vw,3rem)] text-neutral-300">
              That make an impact
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-neutral-600">
            Full-stack developer crafting clean, interactive and
            performance-driven web experiences.
          </p>

          <div className="mt-8 flex items-center gap-6">
            <Link
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-md bg-black px-7 py-4 text-xs font-semibold uppercase tracking-wide text-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-12px_rgba(0,0,0,0.55)]"
            >
              Explore My Work
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#about"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-neutral-900"
            >
              About Me
              <span className="h-1 w-1 rounded-full bg-neutral-900" />
            </Link>
          </div>
        </div>

        {/* RIGHT — globe + floating cards */}
        <div className="relative flex min-h-[480px] items-center justify-center lg:min-h-[560px]">
          <div className="lg:-translate-x-8 lg:-translate-y-4 xl:-translate-x-12 xl:-translate-y-6">
            <HeroGlobe />
          </div>

          {/* Interactive globe / tech stack card — pinned to the top edge of the globe */}
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.9, rotate: -8 }}
            animate={{
              opacity: 1,
              y: [0, -8, 0],
              scale: 1,
              rotate: -3,
            }}
            transition={{
              opacity: { duration: 0.6, ease: "easeOut" },
              scale: { duration: 0.6, ease: "easeOut" },
              rotate: { duration: 0.6, ease: "easeOut" },
              y: {
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.7,
              },
            }}
            className="absolute -top-8 right-0 z-10 w-[210px] rounded-2xl border border-neutral-200 bg-white p-5 shadow-lg sm:right-2"
          >
            {/* pin — anchors the card to the globe like a pinned note */}
            <span className="absolute -top-2 left-6 h-3.5 w-3.5 rounded-full border-2 border-white bg-neutral-900 shadow" />

            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
              Interactive Globe
              <span className="h-1 w-1 rounded-full bg-neutral-900" />
            </div>

            <p className="mt-3 text-sm leading-5 text-neutral-700">
              Drag to explore the connections I build.
            </p>

            <div className="mt-4 border-t border-neutral-100 pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
                Tech Stack
              </p>

              <div className="mt-3 flex items-center gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech.label}
                    title={tech.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-800"
                  >
                    {tech.icon}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured projects strip */}
      <div className="relative border-t border-neutral-200">
        <div className={`grid grid-cols-1 sm:grid-cols-5 ${CONTAINER}`}>
          <div className="flex flex-col justify-between gap-6 border-b border-neutral-200 py-8 pr-6 sm:border-b-0 sm:border-r sm:py-10">
            <p className="text-sm font-bold uppercase tracking-wide text-neutral-900">
              Featured
              <br />
              Projects
            </p>

            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                <ArrowUpRight size={16} />
              </span>
              <span className="text-xs text-neutral-500">
                Hover to preview
              </span>
            </div>
          </div>

          {featuredProjects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
