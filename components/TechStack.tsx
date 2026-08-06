"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiTypescript,
  SiTailwindcss,
  SiGit,
  SiDocker,
} from "react-icons/si";

interface Tech {
  name: string;
  icon: React.ElementType;
  category: string;
  description: string;
}

const techStack: Tech[] = [
  {
    name: "React",
    icon: SiReact,
    category: "Frontend",
    description: "Component architecture & hooks",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    category: "Framework",
    description: "Full-stack React framework",
  },
  {
    name: "React Native",
    icon: SiReact,
    category: "Mobile",
    description: "Cross-platform mobile apps",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    category: "Backend",
    description: "Server-side JavaScript runtime",
  },
  {
    name: "Express",
    icon: SiExpress,
    category: "Backend",
    description: "RESTful API development",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    category: "Database",
    description: "NoSQL document database",
  },
  {
    name: "MySQL",
    icon: SiMysql,
    category: "Database",
    description: "Relational database management",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    category: "Language",
    description: "Type-safe JavaScript",
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    category: "Styling",
    description: "Utility-first CSS framework",
  },
  {
    name: "Git",
    icon: SiGit,
    category: "Tools",
    description: "Version control system",
  },
  {
    name: "Docker",
    icon: SiDocker,
    category: "DevOps",
    description: "Containerized deployments",
  },
];

const categories = ["All", "Frontend", "Backend", "Mobile", "Database", "Tools", "DevOps", "Language", "Styling", "Framework"];

export default function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? techStack
      : techStack.filter((t) => t.category === activeCategory);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-32 md:py-40"
      aria-label="Tech Stack"
    >
      <div className="relative max-w-[1400px] mx-auto px-8 md:px-16 lg:pr-64 xl:pr-80">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-20">
          <span className="section-label">03 — Tech Stack</span>
          <div className="flex-1 h-px bg-[#eaeaea]" />
          <span className="code-comment">{"import { skills } from './engineer'"}</span>
        </div>

        {/* Heading + filter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-[clamp(36px,4vw,60px)] font-black leading-[0.95] tracking-tight text-[#111111]">
              TOOLS
              <br />
              <span className="text-outline">OF THE</span>
              <br />
              TRADE
            </h2>
          </motion.div>

          <motion.div
            className="lg:col-span-8 flex flex-col justify-end"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {categories.filter(cat => cat === "All" || techStack.some(t => t.category === cat)).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 border transition-all duration-200 ${
                    activeCategory === cat
                      ? "border-[#111111] bg-[#111111] text-white"
                      : "border-[#eaeaea] text-[#666666] hover:border-[#111111] hover:text-[#111111]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tech grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-px bg-[#eaeaea]"
          layout
        >
          {filtered.map((tech, i) => (
            <TechCard key={tech.name} tech={tech} delay={i * 0.04} isInView={isInView} />
          ))}
        </motion.div>

        {/* Decorative number */}
        <div
          className="absolute right-8 top-24 hidden text-[150px] font-black text-[#f5f5f5] leading-none select-none pointer-events-none lg:block xl:text-[200px]"
          aria-hidden="true"
        >
          03
        </div>
      </div>
    </section>
  );
}

function TechCard({
  tech,
  delay,
  isInView,
}: {
  tech: Tech;
  delay: number;
  isInView: boolean;
}) {
  const Icon = tech.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      layout
      className={`tech-card bg-white p-6 flex flex-col gap-3 group cursor-default transition-all duration-250 ${
        hovered ? "bg-[#111111]" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon
        size={22}
        className={`transition-colors duration-200 ${
          hovered ? "text-white" : "text-[#111111]"
        }`}
        aria-hidden="true"
      />
      <div>
        <p
          className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${
            hovered ? "text-white" : "text-[#111111]"
          }`}
        >
          {tech.name}
        </p>
        <p
          className={`text-[10px] font-mono mt-0.5 transition-colors duration-200 ${
            hovered ? "text-[#999999]" : "text-[#999999]"
          }`}
        >
          {tech.description}
        </p>
      </div>
      <span
        className={`font-mono text-[9px] tracking-widest uppercase border px-1.5 py-0.5 w-fit transition-all duration-200 ${
          hovered
            ? "border-[#333333] text-[#666666]"
            : "border-[#eaeaea] text-[#cccccc]"
        }`}
      >
        {tech.category}
      </span>
    </motion.div>
  );
}
