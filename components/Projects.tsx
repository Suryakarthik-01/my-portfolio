"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

interface Project {
  index: string;
  title: string;
  subtitle: string;
  role: string;
  problem: string;
  solution: string;
  outcome: string;
  stack: string[];
  year: string;
  type: string;
  featured: boolean;
  color: string;
}

const projects: Project[] = [
  {
    index: "01",
    title: "SwiftCart",
    subtitle: "E-commerce Platform",
    role: "Full Stack Engineer",
    problem:
      "Small businesses lacked an affordable, scalable storefront solution with modern UX.",
    solution:
      "Built a full-stack Next.js e-commerce platform with real-time inventory, Stripe payments, and an intuitive admin dashboard.",
    outcome:
      "Handles 500+ daily transactions with sub-200ms response times across all API endpoints.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Tailwind"],
    year: "2024",
    type: "Web Application",
    featured: true,
    color: "#f8f8f8",
  },
  {
    index: "02",
    title: "TrackSync",
    subtitle: "Fitness & Habit Tracker",
    role: "Mobile Developer",
    problem:
      "Users wanted a single app for tracking workouts, habits, and nutrition without subscription paywalls.",
    solution:
      "Developed a React Native app with offline-first architecture, local SQLite storage, and health API integrations.",
    outcome:
      "4.7-star rating on Play Store with 2,000+ active users and zero crash rate in production.",
    stack: ["React Native CLI", "TypeScript", "SQLite", "Node.js", "Express"],
    year: "2024",
    type: "Mobile Application",
    featured: true,
    color: "#f5f5f5",
  },
  {
    index: "03",
    title: "DevBoard",
    subtitle: "Project Management Tool",
    role: "Full Stack Engineer",
    problem:
      "Development teams needed a lightweight Jira alternative with Git integration and code review workflows.",
    solution:
      "Architected a real-time collaborative board with WebSocket updates, GitHub webhooks, and automated sprint metrics.",
    outcome:
      "Adopted by 3 development teams, reducing sprint planning time by 40%.",
    stack: ["React", "Node.js", "MongoDB", "Socket.io", "Docker"],
    year: "2023",
    type: "SaaS Platform",
    featured: false,
    color: "#f8f8f8",
  },
  {
    index: "04",
    title: "PulseAPI",
    subtitle: "REST API Monitoring Service",
    role: "Backend Engineer",
    problem:
      "Developers had no simple, free solution to monitor API uptime and response quality.",
    solution:
      "Built a Node.js monitoring service with cron-based health checks, email/SMS alerts, and a status-page generator.",
    outcome:
      "Monitors 80+ endpoints for active users with 99.9% uptime on the monitoring service itself.",
    stack: ["Node.js", "Express", "MySQL", "Redis", "TypeScript"],
    year: "2023",
    type: "Developer Tool",
    featured: false,
    color: "#f5f5f5",
  },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-32 md:py-40 bg-[#fafafa]"
      aria-label="Projects"
    >
      <div className="relative max-w-[1400px] mx-auto px-8 md:px-16 lg:pr-64 xl:pr-80">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-20">
          <span className="section-label">04 — Projects</span>
          <div className="flex-1 h-px bg-[#eaeaea]" />
          <span className="code-comment">{"projects.map(p => <CaseStudy />)"}</span>
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-[clamp(40px,5vw,72px)] font-black leading-[0.95] tracking-tight text-[#111111]">
            SELECTED
            <br />
            <span className="text-outline">WORKS</span>
          </h2>
        </motion.div>

        {/* Projects list */}
        <div className="flex flex-col gap-0">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.index}
              project={project}
              index={i}
              isInView={isInView}
              isActive={activeProject === i}
              onToggle={() =>
                setActiveProject(activeProject === i ? null : i)
              }
            />
          ))}
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
            04
          </span>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isInView,
  isActive,
  onToggle,
}: {
  project: Project;
  index: number;
  isInView: boolean;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: "easeOut",
        delay: 0.1 + index * 0.1,
      }}
      className="border-t border-[#eaeaea] last:border-b"
    >
      {/* Project header — always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-8 group text-left"
        aria-expanded={isActive}
      >
        <div className="flex items-baseline gap-6 flex-1">
          <span className="font-mono text-xs text-[#cccccc] tracking-wider w-6 flex-shrink-0">
            {project.index}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#111111] tracking-tight group-hover:opacity-70 transition-opacity">
              {project.title}
            </h3>
            <span className="text-sm text-[#999999]">{project.subtitle}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <span className="hidden sm:block font-mono text-[10px] tracking-widest uppercase border border-[#eaeaea] px-2.5 py-1 text-[#999999]">
            {project.type}
          </span>
          <span className="font-mono text-xs text-[#999999]">{project.year}</span>
          <div
            className={`w-8 h-8 border border-[#eaeaea] flex items-center justify-center transition-all duration-300 ${
              isActive
                ? "bg-[#111111] border-[#111111] rotate-45"
                : "group-hover:border-[#111111]"
            }`}
          >
            <ArrowUpRight
              size={14}
              className={isActive ? "text-white -rotate-45" : "text-[#111111]"}
            />
          </div>
        </div>
      </button>

      {/* Expanded case study */}
      <motion.div
        initial={false}
        animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <div className="pb-12 pl-12">
          {/* Case study grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {[
              { label: "Problem", content: project.problem },
              { label: "Solution", content: project.solution },
              { label: "Outcome", content: project.outcome },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-px bg-[#111111]" />
                  <span className="section-label">{item.label}</span>
                </div>
                <p className="text-[#666666] text-sm leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>

          {/* Role + Stack + Links */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-[#eaeaea]">
            <div className="flex items-center gap-4">
              <div>
                <p className="section-label mb-1">Role</p>
                <p className="text-sm text-[#111111] font-medium">{project.role}</p>
              </div>
              <div className="w-px h-10 bg-[#eaeaea]" />
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] tracking-widest uppercase bg-white border border-[#eaeaea] px-2.5 py-1 text-[#666666]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex items-center gap-1.5 text-xs font-mono tracking-wide text-[#666666] hover:text-[#111111] transition-colors"
                aria-label={`View ${project.title} on GitHub`}
              >
                <FaGithub size={14} />
                Code
              </a>
              <a
                href="#"
                className="flex items-center gap-1.5 text-xs font-mono tracking-wide border border-[#111111] px-4 py-2 text-[#111111] hover:bg-[#111111] hover:text-white transition-all"
                aria-label={`View ${project.title} live`}
              >
                <ExternalLink size={12} />
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
