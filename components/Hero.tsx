"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FaReact } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import HeroGlobe from "./HeroGlobe";
import { scrollToSection } from "@/lib/smoothScroll";

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

const EASE = [0.16, 1, 0.3, 1] as const;

const CONTAINER = "mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10";

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
      className={`group relative flex aspect-[4/3] flex-col justify-between overflow-hidden border-l border-neutral-200 p-5 transition-colors duration-300 sm:aspect-auto sm:h-full ${
        isDark ? "bg-neutral-950" : "bg-neutral-100"
      }`}
    >
      {/* Decorative background per theme */}
      {theme === "dark" && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neutral-700/40 via-neutral-950 to-black transition-opacity duration-300 group-hover:opacity-80" />
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
        <div className="pointer-events-none absolute right-3 top-3 h-16 w-16 rotate-12 border border-neutral-400/60 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45" />
      )}

      <div className="relative z-10">
        <p
          className={`text-sm font-semibold uppercase tracking-[0.08em] ${
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
        className={`relative z-10 ml-auto flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
          isDark
            ? "border-white/20 text-white group-hover:border-white/40"
            : "border-neutral-300 text-neutral-700 group-hover:border-neutral-400"
        }`}
      >
        <ArrowUpRight size={14} />
      </span>
    </Link>
  );
}

export default function Hero() {
  const lineARef = useRef<HTMLSpanElement>(null);
  const lineBRef = useRef<HTMLSpanElement>(null);
  const lineBTracking = useEqualizeWidth(lineARef, lineBRef);

  return (
    <section id="home" className="relative w-full bg-white pt-28 lg:pt-32">
      {/* HEADLINE + GLOBE */}
      <div className={`relative grid grid-cols-1 gap-y-12 py-6 lg:grid-cols-2 lg:gap-x-16 lg:py-8 ${CONTAINER}`}>
        {/* LEFT — copy */}
        <div className="relative flex flex-col justify-center lg:-translate-y-4 xl:-translate-y-6">
          {/* eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-[13px] font-semibold uppercase tracking-[0.18em] text-neutral-400"
          >
            Hey, I&apos;m Karthik
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="mt-7 flex flex-col items-start gap-1.5 leading-[0.95] tracking-tight text-[#111111]"
          >
            <span
              ref={lineARef}
              className="block whitespace-nowrap text-[clamp(2.25rem,5vw,4.25rem)] font-black"
            >
              I BUILD DIGITAL
            </span>
            <span
              ref={lineBRef}
              className="text-outline block whitespace-nowrap text-[clamp(2.25rem,5vw,4.25rem)] font-black"
              style={{ letterSpacing: `${lineBTracking}px` }}
            >
              EXPERIENCES
            </span>
            <span className="mt-1.5 block text-[clamp(1.25rem,2.75vw,2rem)] font-black text-neutral-400">
              THAT MAKE AN IMPACT
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            className="relative mt-8 max-w-md border-l-2 border-neutral-200 pl-4 text-[15px] leading-7 tracking-[-0.01em] text-neutral-600"
          >
            Full-stack developer crafting clean, interactive and
            performance-driven web experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.24 }}
            className="mt-10 flex items-center gap-8"
          >
            <Link
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#projects");
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3.5 text-[13.5px] font-medium tracking-[-0.01em] text-white shadow-[0_1px_1px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.18)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_1px_1px_rgba(0,0,0,0.05),0_14px_24px_-6px_rgba(0,0,0,0.24)]"
            >
              Explore my work
              <ArrowRight
                size={14}
                className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#about");
              }}
              className="group inline-flex items-center gap-2 text-[13.5px] font-medium tracking-[-0.01em] text-neutral-700 transition-colors duration-200 hover:text-neutral-950"
            >
              <span className="relative">
                About me
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-neutral-950 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — globe + floating card */}
        <div className="relative flex min-h-[440px] items-center justify-center lg:min-h-[520px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="lg:-translate-x-14 lg:-translate-y-4 xl:-translate-x-20 xl:-translate-y-6"
          >
            <HeroGlobe />
          </motion.div>

          {/* Tech stack card — pinned to the top edge of the globe */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: [0, -5, 0], scale: 1 }}
            transition={{
              opacity: { duration: 0.6, ease: EASE, delay: 0.3 },
              scale: { duration: 0.6, ease: EASE, delay: 0.3 },
              y: {
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9,
              },
            }}
            className="absolute -top-6 right-0 z-10 w-[208px] rounded-2xl border border-neutral-200 bg-white/95 p-5 shadow-[0_1px_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.03),0_16px_32px_-8px_rgba(0,0,0,0.1)] backdrop-blur-sm sm:right-2"
          >
            <div className="flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.12em] text-neutral-500">
              Interactive globe
              <span className="h-1 w-1 rounded-full bg-neutral-950" />
            </div>

            <p className="mt-3 text-[13.5px] leading-5 tracking-[-0.01em] text-neutral-700">
              Drag to explore the connections I build.
            </p>

            <div className="mt-4 border-t border-neutral-100 pt-4">
              <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                Tech stack
              </p>

              <div className="mt-3 flex items-center gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech.label}
                    title={tech.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-800 transition-colors duration-200 hover:border-neutral-300 hover:bg-white"
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
            <p className="text-[13.5px] font-semibold uppercase tracking-[0.08em] text-neutral-900">
              Featured
              <br />
              Projects
            </p>

            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-950 text-white">
                <ArrowUpRight size={16} />
              </span>
              <span className="text-xs tracking-[-0.01em] text-neutral-500">
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
