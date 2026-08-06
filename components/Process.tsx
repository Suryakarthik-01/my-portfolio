"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    phase: "Discovery",
    label: "understand();",
    description:
      "Deep dive into the problem space. User interviews, competitor analysis, and defining success metrics before writing a single line of code.",
    duration: "1–2 weeks",
  },
  {
    number: "02",
    phase: "Architecture",
    label: "design();",
    description:
      "System design, database modeling, API contracts, and component architecture. Decisions made here compound — I take them seriously.",
    duration: "3–5 days",
  },
  {
    number: "03",
    phase: "Development",
    label: "build();",
    description:
      "Iterative development with CI/CD from day one. Consistent code review, automated tests, and regular client syncs to stay aligned.",
    duration: "Varies",
  },
  {
    number: "04",
    phase: "Refinement",
    label: "polish();",
    description:
      "Performance profiling, accessibility audit, edge case handling, and UX polish. The difference between good and great is in the details.",
    duration: "1 week",
  },
  {
    number: "05",
    phase: "Deploy",
    label: "ship();",
    description:
      "Zero-downtime deployment, monitoring, alerting, and thorough documentation. Launch is not the end — it&apos;s the beginning of learning.",
    duration: "1–2 days",
  },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-40"
      aria-label="Development Process"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-20">
          <span className="section-label">06 — Process</span>
          <div className="flex-1 h-px bg-[#eaeaea]" />
          <span className="code-comment">{"function buildProduct() {"}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left heading */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-[clamp(36px,4vw,60px)] font-black leading-[0.95] tracking-tight text-[#111111]">
              HOW I
              <br />
              <span className="text-outline">BUILD</span>
              <br />
              THINGS
            </h2>
            <p className="mt-6 text-[#666666] text-sm leading-relaxed max-w-xs">
              A repeatable process refined over hundreds of features and dozens
              of shipped products.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="lg:col-span-8">
            <div className="relative">
              {/* Vertical connecting line */}
              <div
                className="absolute left-5 top-5 bottom-5 w-px bg-[#eaeaea]"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-0">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: 24 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: 0.15 + i * 0.1,
                    }}
                    className="flex gap-8 pb-10 last:pb-0 group"
                  >
                    {/* Step number bubble */}
                    <div className="flex-shrink-0 w-10 h-10 border border-[#eaeaea] flex items-center justify-center bg-white group-hover:border-[#111111] group-hover:bg-[#111111] transition-all duration-200 z-10">
                      <span className="font-mono text-[10px] tracking-wider text-[#999999] group-hover:text-white transition-colors">
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1.5 pb-4 border-b border-[#eaeaea] last:border-b-0">
                      <div className="flex items-baseline justify-between gap-4 mb-2">
                        <div className="flex items-baseline gap-3">
                          <h3 className="font-semibold text-[#111111] text-lg tracking-tight">
                            {step.phase}
                          </h3>
                          <span className="font-mono text-xs text-[#cccccc]">
                            {step.label}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-[#cccccc] tracking-wide flex-shrink-0">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-[#666666] text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
