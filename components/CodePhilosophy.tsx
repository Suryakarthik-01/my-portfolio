"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const principles = [
  {
    symbol: "{}",
    title: "Clean Code",
    description:
      "Code is read far more than it is written. Every function, variable, and module should communicate intent clearly without needing a comment.",
  },
  {
    symbol: "<>",
    title: "Composability",
    description:
      "Build small, focused components that do one thing well. System complexity should come from composition, not from individual component complexity.",
  },
  {
    symbol: "//",
    title: "Performance",
    description:
      "Every millisecond matters. I profile before optimizing, measure what matters, and make deliberate choices about what ships to production.",
  },
  {
    symbol: "=>",
    title: "Pragmatism",
    description:
      "The best solution is the simplest one that correctly solves the problem. Over-engineering is a form of waste — ship, learn, iterate.",
  },
];

export default function CodePhilosophy() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-40 bg-[#111111] overflow-hidden"
      aria-label="Code Philosophy"
    >
      {/* Blueprint grid on dark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-20">
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#444444]">
            05 — Philosophy
          </span>
          <div className="flex-1 h-px bg-[#222222]" />
          <span className="font-mono text-[11px] text-[#333333]">
            {"/* how I think about code */"}
          </span>
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <h2 className="text-[clamp(40px,6vw,88px)] font-black leading-[0.9] tracking-tight">
            <span className="text-white">CODE</span>
            <br />
            <span
              style={{
                WebkitTextStroke: "1.5px #444444",
                color: "transparent",
              }}
            >
              PHILOSOPHY
            </span>
          </h2>
        </motion.div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a1a]">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.1 + i * 0.08,
              }}
              className="bg-[#111111] p-8 flex flex-col gap-5 group hover:bg-[#161616] transition-colors duration-200"
            >
              <span
                className="font-mono text-3xl font-bold text-[#333333] group-hover:text-[#555555] transition-colors duration-200"
                aria-hidden="true"
              >
                {p.symbol}
              </span>
              <div>
                <h3 className="text-white font-semibold text-lg tracking-tight mb-2">
                  {p.title}
                </h3>
                <p className="text-[#555555] text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 border-l-2 border-[#333333] pl-8"
        >
          <blockquote className="text-[#444444] text-lg font-mono leading-relaxed max-w-2xl">
            &ldquo;Any fool can write code that a computer can understand. Good programmers write
            code that humans can understand.&rdquo;
          </blockquote>
          <cite className="block mt-3 font-mono text-xs text-[#333333] not-italic tracking-widest uppercase">
            — Martin Fowler
          </cite>
        </motion.div>
      </div>
    </section>
  );
}
