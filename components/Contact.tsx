"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com", handle: "@karthikkumar" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com", handle: "Karthik Kumar" },
  { icon: FaXTwitter, label: "Twitter", href: "https://twitter.com", handle: "@karthikkumar" },
  { icon: Mail, label: "Email", href: "mailto:karthik@example.com", handle: "karthik@example.com" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission would go here
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 md:py-48 bg-[#111111] overflow-hidden"
      aria-label="Contact"
    >
      {/* Dot grid on dark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-20">
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#444444]">
            08 — Contact
          </span>
          <div className="flex-1 h-px bg-[#222222]" />
          <span className="font-mono text-[11px] text-[#333333]">
            {"sendMessage({ from: 'you' });"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left — CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-between gap-12"
          >
            <div>
              <h2 className="text-[clamp(48px,6vw,88px)] font-black leading-[0.9] tracking-tight">
                <span className="text-white">LET&apos;S</span>
                <br />
                <span
                  style={{
                    WebkitTextStroke: "1.5px #333333",
                    color: "transparent",
                  }}
                >
                  WORK
                </span>
                <br />
                <span className="text-white">TOGETHER</span>
              </h2>

              <p className="mt-8 text-[#666666] leading-relaxed max-w-sm">
                Have a project in mind or looking for a developer to join your
                team? I&apos;m currently available for new opportunities.
              </p>
            </div>

            {/* Social links */}
            <div className="space-y-1">
              {socialLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                    className="flex items-center justify-between py-3 border-b border-[#1e1e1e] hover:border-[#333333] group transition-colors"
                    aria-label={`${link.label}: ${link.handle}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={14}
                        className="text-[#444444] group-hover:text-white transition-colors"
                        aria-hidden="true"
                      />
                      <span className="text-[#444444] group-hover:text-white text-sm font-mono transition-colors">
                        {link.handle}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={12}
                      className="text-[#333333] group-hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-20">
                <div className="font-mono text-4xl text-[#333333]">{"{}"}</div>
                <h3 className="text-white text-2xl font-semibold">Message sent.</h3>
                <p className="text-[#555555] text-sm">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-[10px] tracking-widest uppercase text-[#444444] mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-[#222222] focus:border-[#555555] py-3 text-white text-sm outline-none placeholder-[#333333] transition-colors"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-[10px] tracking-widest uppercase text-[#444444] mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-[#222222] focus:border-[#555555] py-3 text-white text-sm outline-none placeholder-[#333333] transition-colors"
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-[10px] tracking-widest uppercase text-[#444444] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-[#222222] focus:border-[#555555] py-3 text-white text-sm outline-none placeholder-[#333333] transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="magnetic-btn w-full flex items-center justify-center gap-2 border border-white text-white font-mono text-xs tracking-[0.12em] uppercase py-4 hover:bg-white hover:text-[#111111] transition-all duration-200"
                  >
                    Send Message
                    <ArrowUpRight size={14} />
                  </button>
                </div>

                <p className="font-mono text-[10px] text-[#333333] text-center">
                  // Or email me directly at{" "}
                  <a
                    href="mailto:karthik@example.com"
                    className="text-[#555555] hover:text-white transition-colors underline underline-offset-2"
                  >
                    karthik@example.com
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
