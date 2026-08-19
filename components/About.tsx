"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "2+", label: "Years of\nExperience" },
  { value: "20+", label: "Projects\nShipped" },
  { value: "8+", label: "Technologies\nMastered" },
  { value: "100%", label: "Passion for\nCraft" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 md:py-40 overflow-hidden"
      aria-label="About"
    >
      <div className="relative max-w-[1400px] mx-auto px-8 md:px-16 lg:pr-64 xl:pr-80">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-20">
          <span className="section-label">01 — About</span>
          <div className="flex-1 h-px bg-[#eaeaea]" />
          <span className="code-comment">{"<AboutSection />"}</span>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left col — big heading */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-[clamp(48px,6vw,80px)] font-black leading-[0.95] tracking-tight text-[#111111]">
              CRAFTING
              <br />
              <span className="text-outline">DIGITAL</span>
              <br />
              PRODUCTS
            </h2>

            <div className="mt-8 flex items-start gap-3">
              <div className="w-6 h-px bg-[#111111] mt-3 flex-shrink-0" />
              <p className="text-[#666666] text-sm leading-relaxed font-mono">
                // I believe in the intersection of{" "}
                <span className="text-[#111111]">engineering excellence</span> and{" "}
                <span className="text-[#111111]">thoughtful design</span>.
              </p>
            </div>
          </motion.div>

          {/* Right col — story + stats */}
          <motion.div
            className="lg:col-span-7 space-y-12"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            {/* Story */}
            <div
              className="max-w-xl space-y-5 border-l border-[#eaeaea] pl-8"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              <p className="text-[#111111] text-xl leading-[1.6] tracking-[-0.01em]">
                A full-stack developer and mobile engineer with a deep obsession
                for clean architecture and performant systems. I don&apos;t just
                write code — I build experiences that users remember.
              </p>
              <p className="text-[#666666] leading-relaxed">
                From designing scalable APIs to crafting pixel-perfect mobile
                interfaces, I treat every project as an opportunity to raise the
                bar. My approach blends engineering rigor with product thinking
                — because great software is both technically sound and deeply
                human.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#eaeaea]">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.3 + i * 0.08,
                  }}
                  className="bg-white p-6 flex flex-col gap-1"
                >
                  <span className="text-[clamp(28px,3vw,40px)] font-black text-[#111111] leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-mono text-[#999999] tracking-widest uppercase whitespace-pre-line leading-relaxed">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Values strip */}
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                "Clean Architecture",
                "Performance First",
                "User Empathy",
                "Continuous Shipping",
              ].map((val) => (
                <div key={val} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#111111]" />
                  <span className="text-xs text-[#666666] tracking-wide">{val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative large number */}
        <div
          className="absolute right-8 top-24 hidden select-none pointer-events-none lg:block"
          aria-hidden="true"
        >
          <span
            className="block text-[150px] font-black leading-none text-[#f0f0f0] xl:text-[200px]"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent, black 55%)",
              maskImage: "linear-gradient(to right, transparent, black 55%)",
            }}
          >
            01
          </span>
        </div>
      </div>
    </section>
  );
}
