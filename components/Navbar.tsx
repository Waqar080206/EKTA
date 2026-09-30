"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { SECTIONS, type SectionId } from "@/lib/data";

const NAV_H = 76;

const smoothScrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - NAV_H - 12;
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId | "top">("top");
  const headerRef = useRef<HTMLElement | null>(null);
  const lockRef = useRef(false);

  // Scroll background opacity
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section highlight
  useEffect(() => {
    const targets = [
      { id: "hero", key: "top" as const },
      { id: "system", key: "system" as const },
      { id: "product", key: "product" as const },
      { id: "impact", key: "impact" as const },
      { id: "sih", key: "sih" as const },
    ];

    const obs = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return;
        let best: { key: typeof active; ratio: number } | null = null;
        for (const entry of entries) {
          const t = targets.find((x) => x.id === entry.target.id);
          if (!t) continue;
          if (
            best === null ||
            entry.intersectionRatio > best.ratio ||
            (entry.intersectionRatio === best.ratio && best.key === "top")
          ) {
            best = { key: t.key, ratio: entry.intersectionRatio };
          }
        }
        if (best) setActive(best.key);
      },
      {
        root: null,
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-20% 0px -40% 0px",
      },
    );

    targets.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Close mobile on escape / route change
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (id: string) => {
    lockRef.current = true;
    setOpen(false);
    setTimeout(() => (lockRef.current = false), 900);
    smoothScrollTo(id);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "bg-bg/92 backdrop-blur-[8px] supports-[backdrop-filter]:bg-bg/84 border-b border-white/8"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="shell flex h-[var(--nav-h)] items-center justify-between gap-4">
        <Link
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNav("hero");
          }}
          className="group relative inline-flex h-11 items-center gap-2 md:h-9"
          aria-label="EKTA home"
        >
          <span className="mono-label text-ink flex items-center gap-2 tracking-[0.16em] md:tracking-[0.2em]">
            <span className="relative inline-block">
              EKTA
              <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-amber/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <span className="h-1 w-1 rounded-full bg-amber transition-transform duration-500 group-hover:scale-110" />
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <Link
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(s.id);
                }}
                className="group relative flex items-center px-3 py-2"
                aria-current={isActive ? "location" : undefined}
              >
                <span
                  className={`mono-label transition-colors duration-400 ${
                    isActive ? "text-ink" : "text-muted group-hover:text-ink"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`absolute inset-x-2 -bottom-1 h-[1px] origin-center scale-x-0 bg-amber/70 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive ? "scale-x-100" : "group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
          <div className="ml-1 flex items-center pl-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleNav("sih");
              }}
              className="btn btn-ghost h-9 px-3 py-0 text-[0.6875rem] tracking-[0.08em]"
              aria-label="Jump to SIH 2026"
            >
              <span className="mono-label">SIH 2026</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          className="group relative flex h-9 w-9 items-center justify-center border border-white/12 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-controls="mobile-nav"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          <span className="absolute inset-x-1 top-2 h-[1px] bg-ink/90 transition-all duration-500 group-hover:bg-amber" />
          <span className="absolute inset-x-1 top-4 h-[1px] bg-ink/70 transition-all duration-500 group-hover:bg-amber" />
          <span className="absolute inset-x-1 top-6 h-[1px] bg-ink/50 transition-all duration-500 group-hover:bg-amber" />
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-[var(--nav-h)] z-40 bg-bg/94 backdrop-blur-[10px] md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="shell flex h-full flex-col gap-6 overflow-y-auto pt-8 pb-10">
            <ul className="flex flex-col gap-2">
              {SECTIONS.map((s) => {
                const isActive = active === s.id;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => handleNav(s.id)}
                      className="group flex w-full items-center justify-between border-b border-white/6 px-1 py-4"
                    >
                      <span className="display-sm group-hover:text-amber transition-colors duration-500">
                        {s.label}
                      </span>
                      <span
                        className={`mono-label ${
                          isActive ? "text-amber" : "text-faint"
                        }`}
                      >
                        0{s.id === "system" ? "2" : s.id === "product" ? "4" : s.id === "impact" ? "6" : "0"}
                        {s.id === "sih" ? "" : " / SECTION"}
                      </span>
                    </button>
                  </li>
                );
              })}
              <li>
                <button
                  type="button"
                  onClick={() => handleNav("sih")}
                  className="group flex w-full items-center justify-between border-b border-white/6 px-1 py-4"
                >
                  <span className="display-sm group-hover:text-amber transition-colors duration-500">
                    SIH 2026
                  </span>
                  <span className="mono-label text-faint">PS 6099</span>
                </button>
              </li>
            </ul>

            <div className="mt-auto space-y-3">
              <p className="body-sm max-w-[28ch]">
                AI recommends. Humans approve.
              </p>
              <button
                type="button"
                onClick={() => handleNav("product")}
                className="btn btn-primary w-full justify-center"
              >
                See how it works
                <svg
                  className="btn-arrow h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M11 3l7 7-7 7M5 10h13" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
