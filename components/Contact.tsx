"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

const socialLinks = [
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/Suryakarthik-01",
    handle: "github.com/Suryakarthik-01",
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/surya-karthik-kumar/",
    handle: "surya-karthik-kumar",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:karthikkumar9393@gmail.com",
    handle: "karthikkumar9393@gmail.com",
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-[#111111] overflow-hidden"
      aria-label="Contact"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 py-20 md:py-24">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-500">
            07 — Contact
          </span>
          <div className="flex-1 h-px bg-neutral-800" />
          <span className="font-mono text-[11px] text-neutral-600">
            {"sendMessage({ from: 'you' });"}
          </span>
        </div>

        {/* Two-column grid — both cols same height via items-stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

          {/* ── LEFT: heading + social links ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-between"
          >
            {/* Heading */}
            <div>
              <h2
                className="font-black leading-[0.9] tracking-tight"
                style={{ fontSize: "clamp(44px, 6vw, 80px)" }}
              >
                <span className="text-white">LET&apos;S</span>
                <br />
                <span
                  style={{
                    WebkitTextStroke: "1.5px rgba(255,255,255,0.3)",
                    color: "transparent",
                  }}
                >
                  WORK
                </span>
                <br />
                <span className="text-white">TOGETHER</span>
              </h2>

              <p className="mt-6 text-neutral-400 text-sm leading-relaxed max-w-xs">
                Have a project in mind or looking for a developer to join your
                team? I&apos;m currently available for new opportunities.
              </p>
            </div>

            {/* Social links */}
            <div className="mt-10 space-y-0">
              {socialLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.label !== "Email" ? "_blank" : undefined}
                    rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                    className="flex items-center justify-between py-4 border-b border-neutral-800 hover:border-neutral-600 group transition-colors"
                    aria-label={`${link.label}: ${link.handle}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={14}
                        className="text-neutral-500 group-hover:text-white transition-colors flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-neutral-400 group-hover:text-white text-sm font-mono transition-colors truncate">
                        {link.handle}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={12}
                      className="text-neutral-600 group-hover:text-white transition-all opacity-0 group-hover:opacity-100 flex-shrink-0 ml-2"
                      aria-hidden="true"
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* ── RIGHT: form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col justify-between"
          >
            {submitted ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-16">
                <div className="font-mono text-4xl text-neutral-600">{"{}"}</div>
                <h3 className="text-white text-2xl font-semibold">Message sent.</h3>
                <p className="text-neutral-400 text-sm">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-[10px] tracking-widest uppercase text-neutral-500 mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-transparent border-b border-neutral-800 focus:border-neutral-500 py-3 text-white text-sm outline-none placeholder-neutral-700 transition-colors"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-[10px] tracking-widest uppercase text-neutral-500 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-transparent border-b border-neutral-800 focus:border-neutral-500 py-3 text-white text-sm outline-none placeholder-neutral-700 transition-colors"
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-[10px] tracking-widest uppercase text-neutral-500 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-transparent border-b border-neutral-800 focus:border-neutral-500 py-3 text-white text-sm outline-none placeholder-neutral-700 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 border border-white text-white font-mono text-xs tracking-[0.12em] uppercase py-4 hover:bg-white hover:text-[#111111] transition-all duration-200"
                  >
                    Send Message
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                </div>

                <p className="font-mono text-[10px] text-neutral-600 text-center">
                  // Or reach me at{" "}
                  <a
                    href="mailto:karthikkumar9393@gmail.com"
                    className="text-neutral-400 hover:text-white transition-colors underline underline-offset-2"
                  >
                    karthikkumar9393@gmail.com
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
