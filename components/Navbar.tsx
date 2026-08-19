"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { scrollToSection } from "@/lib/smoothScroll";

const navigation = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Experience",
    href: "#experience",
  },
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "Skills",
    href: "#skills",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 40);

      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY < 80) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;

      let currentSection = "";

      navigation.forEach((item) => {
        const section = document.querySelector(item.href);

        if (!section) return;

        const top = (section as HTMLElement).offsetTop - 120;
        const height = (section as HTMLElement).offsetHeight;

        if (
          window.scrollY >= top &&
          window.scrollY < top + height
        ) {
          currentSection = item.href;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "border-b border-neutral-200 bg-white/75 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-10">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center"
            aria-label="Homepage"
          >
            <span className="text-[27px] font-semibold tracking-[-0.04em] text-neutral-950">
              K
            </span>
            <span className="text-[27px] font-semibold tracking-[-0.04em] text-neutral-950">
              .
            </span>
          </Link>

          {/* Navigation */}

          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => {
              const active = activeSection === item.href;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollToSection(e, item.href)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-200 hover:bg-neutral-100 ${
                    active ? "text-neutral-950" : "text-neutral-500 hover:text-neutral-950"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="h-[3px] w-[3px] rounded-full bg-neutral-950" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA */}

          <a
            href="#contact"
            onClick={(e) => handleScrollToSection(e, "#contact")}
            className="hidden items-center gap-1.5 rounded-full bg-neutral-950 py-3 pl-5 pr-4 text-[15px] font-medium tracking-[-0.01em] text-white transition-colors duration-200 hover:bg-neutral-800 lg:inline-flex"
          >
            Let&apos;s talk
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </header>
  );
}
