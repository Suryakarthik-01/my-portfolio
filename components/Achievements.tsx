"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Star, Zap, Users } from "lucide-react";

const achievements = [
  {
    icon: Award,
    metric: "20+",
    label: "Projects Shipped",
    description: "Production-grade applications across web and mobile platforms.",
  },
  {
    icon: Star,
    metric: "4.7★",
    label: "App Store Rating",
    description: "Consistent quality and user experience across mobile products.",
  },
  {
    icon: Zap,
    metric: "<200ms",
    label: "API Response Times",
    description: "Relentless focus on performance in every backend service built.",
  },
  {
    icon: Users,
    metric: "5K+",
    label: "End Users Served",
    description: "Real people using real products built from scratch.",
  },
];

export default function Achievements() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-40 bg-[#fafafa]"
      aria-label="Achievements"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-20">
          <span className="section-label">07 — Achievements</span>
          <div className="flex-1 h-px bg-[#eaeaea]" />
          <span className="code-comment">{"console.log(results);"}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Heading */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-[clamp(36px,4vw,60px)] font-black leading-[0.95] tracking-tight text-[#111111]">
              RESULTS
              <br />
              <span className="text-outline">THAT</span>
              <br />
              MATTER
            </h2>
            <p className="mt-6 text-[#666666] text-sm leading-relaxed">
              Numbers tell part of the story. The rest is in the quality of
              problems solved and the people helped.
            </p>
          </motion.div>

          {/* Metrics grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#eaeaea]">
            {achievements.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.15 + i * 0.1,
                  }}
                  className="bg-white p-8 flex flex-col gap-4 group hover:bg-[#111111] transition-colors duration-300"
                >
                  <Icon
                    size={20}
                    className="text-[#cccccc] group-hover:text-[#444444] transition-colors"
                    aria-hidden="true"
                  />
                  <div>
                    <div className="text-[clamp(36px,4vw,52px)] font-black text-[#111111] group-hover:text-white leading-none transition-colors">
                      {item.metric}
                    </div>
                    <div className="text-sm font-semibold text-[#111111] group-hover:text-white mt-1 tracking-tight transition-colors">
                      {item.label}
                    </div>
                  </div>
                  <p className="text-xs text-[#999999] group-hover:text-[#555555] leading-relaxed transition-colors">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
