"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    period: "Mar 2026 — Present",
    role: "Software Development Engineer",
    company: "Salam Kisan · Pune, Maharashtra",
    type: "Full-time",
    description:
      "Building and maintaining a production React Native application — from responsive, scalable UI components to end-to-end REST API integrations. Focused on performance, debugging, and application reliability while collaborating with the team to ship production-ready features.",
    stack: ["React Native", "TypeScript", "REST APIs"],
  },
  {
    period: "Feb 2025 — Mar 2026",
    role: "Junior Full Stack Developer",
    company: "PRYM Aerospace Pvt. Ltd. · Jalna, Maharashtra",
    type: "Full-time",
    description:
      "Developed and maintained modern web applications with React.js and Next.js, building reusable, responsive UI components with a focus on performance and user experience. Owned features end-to-end — from REST API integration to debugging, optimization, and deployment — as part of a collaborative product team.",
    stack: ["React.js", "Next.js", "REST APIs", "JavaScript"],
  },
  {
    period: "Apr 2024 — Jan 2025",
    role: "Student Intern",
    company: "Vector India · Hyderabad",
    type: "Internship",
    description:
      "Gained hands-on experience across the MERN stack and Python, working on application development fundamentals, backend integration, and problem-solving. Built a practical foundation in full-stack workflows and software engineering practices.",
    stack: ["MongoDB", "Express.js", "React", "Node.js", "Python"],
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-32 md:py-40 bg-[#fafafa]"
      aria-label="Experience"
    >
      <div className="relative max-w-[1400px] mx-auto px-8 md:px-16 lg:pr-64 xl:pr-80">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-20">
          <span className="section-label">02 — Experience</span>
          <div className="flex-1 h-px bg-[#eaeaea]" />
          <span className="code-comment">{"// career timeline"}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left label */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-[clamp(38px,4.5vw,64px)] font-black leading-[0.95] tracking-tight text-[#111111]">
              WHERE
              <br />
              <span className="text-outline">I&apos;VE</span>
              <br />
              WORKED
            </h2>
          </motion.div>

          {/* Timeline */}
          <div ref={timelineRef} className="lg:col-span-9 relative">
            {/* Vertical line */}
            <div className="absolute left-0 top-3 bottom-0 w-px bg-[#eaeaea]" aria-hidden="true" />
            {/* Scroll-filled progress line */}
            <motion.div
              className="absolute left-0 top-3 bottom-0 w-px bg-[#111111] origin-top"
              style={{ scaleY: lineProgress }}
              aria-hidden="true"
            />

            <div className="flex flex-col gap-0">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                    delay: i * 0.08,
                  }}
                  className="relative pl-10 pb-16 last:pb-0 group"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-[-4.5px] top-2 w-2.5 h-2.5 rounded-full border-2 border-[#111111] bg-white group-hover:bg-[#111111] transition-colors duration-200"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 + 0.15 }}
                    aria-hidden="true"
                  />

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="font-mono text-sm text-[#999999] tracking-wide">
                        {exp.period}
                      </span>
                      <span className="font-mono text-xs border border-[#eaeaea] px-2 py-0.5 text-[#666666] uppercase tracking-widest">
                        {exp.type}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-[#111111] tracking-tight">
                        {exp.role}
                      </h3>
                      <p className="text-base text-[#666666] mt-1">{exp.company}</p>
                    </div>

                    <p className="text-[#666666] text-base leading-relaxed max-w-2xl">
                      {exp.description}
                    </p>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs tracking-widest uppercase bg-white border border-[#eaeaea] px-2.5 py-1 text-[#666666]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative number */}
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
            02
          </span>
        </div>
      </div>
    </section>
  );
}
