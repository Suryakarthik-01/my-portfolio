"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

    const section = document.querySelector(href);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-300 ease-in-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        isScrolled
          ? "border-b border-neutral-200/70 bg-white/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* Logo */}

        <Link
          href="/"
          className="group flex items-center"
          aria-label="Homepage"
        >
          <span className="text-[34px] font-black tracking-[-0.06em]">
            K
          </span>

          <span className="text-[34px] font-black transition-transform duration-300 group-hover:-translate-y-1">
            .
          </span>
        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-12 lg:flex">
          {navigation.map((item) => {
            const active = activeSection === item.href;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) =>
                  handleScrollToSection(e, item.href)
                }
                className="group relative text-[15px] font-medium tracking-wide text-neutral-700 transition-colors duration-300 hover:text-black"
              >
                {item.label}

                <span
                  className={`absolute -bottom-2 left-0 h-[1.5px] bg-black transition-all duration-300 ${
                    active
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* CTA */}

        <a
          href="#contact"
          onClick={(e) =>
            handleScrollToSection(e, "#contact")
          }
          className="group hidden items-center gap-2 rounded-full border border-black bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black lg:inline-flex"
        >
          Let's Talk

          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>
      </div>
    </header>
  );
}