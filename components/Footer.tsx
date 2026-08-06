"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] border-t border-[#1a1a1a] py-10">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[#333333] text-sm">K.</span>
          <span className="text-[#2a2a2a] text-xs font-mono">
            © {year} Karthik Kumar. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] text-[#2a2a2a] tracking-widest uppercase">
            Built with Next.js &amp; TypeScript
          </span>
          <a
            href="#"
            className="font-mono text-[10px] text-[#333333] hover:text-white transition-colors tracking-widest uppercase"
            aria-label="Back to top"
          >
            ↑ Top
          </a>
        </div>
      </div>
    </footer>
  );
}
