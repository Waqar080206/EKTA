"use client";

import { useEffect, useRef, useState } from "react";

import {
  legacyRecords,
  nationalCode,
  standardDescription,
  projectMeta,
} from "@/lib/data";

const HERO_SEQ = {
  eyebrow: 120,
  h1: 320,
  lede: 620,
  ctas: 920,
  cards: 1220,
  sweep: 1600,
  converge: 2200,
  lines: 2500,
  strike: 2900,
  unify: 3400,
  meta: 4000,
};

export function Hero() {
  const [phase, setPhase] = useState<"init" | "visible" | "converge">("init");
  const [unifiedIn, setUnifiedIn] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const onceRef = useRef(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (onceRef.current) return;
    onceRef.current = true;

    let raf: number | null = null;

    const start = () => {
      setPhase("visible");
      const timers: NodeJS.Timeout[] = [];

      timers.push(
        setTimeout(() => setPhase("converge"), HERO_SEQ.converge),
        setTimeout(() => setUnifiedIn(true), HERO_SEQ.unify),
      );

      if (!reduced) {
        timers.push(
          setTimeout(() => {
            let startVal = 0;
            const end = 97.4;
            const dur = 1200;
            const t0 = performance.now();
            const tick = (t: number) => {
              const elapsed = t - t0;
              const p = Math.min(1, elapsed / dur);
              const eased = 1 - Math.pow(1 - p, 4);
              startVal = end * eased;
              setConfidence(
                Math.round(startVal * 10) / 10,
              );
              if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
          }, HERO_SEQ.meta),
        );
      } else {
        setConfidence(97.4);
      }

      return () => {
        timers.forEach((id) => clearTimeout(id));
        if (raf) cancelAnimationFrame(raf);
      };
    };

    const cleanup = start();
    return cleanup;
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative flex min-h-[100svh] items-center pb-[5vh] pt-[calc(var(--nav-h)+4vh)] ${
        phase !== "init" ? "hero-visible" : ""
      } ${phase === "converge" ? "hero-converge" : ""}`}
    >
      <div className="glow glow-amber-left" aria-hidden="true" />
      <div className="glow glow-teal" aria-hidden="true" />

      <div className="shell relative z-10">
        <div className="grid-12 items-center gap-y-12 md:gap-y-16">
          {/* LEFT ~55% */}
          <div className="col-span-full md:col-span-7">
            <p
              className="eyebrow hero-step"
              style={{ "--seq": `${HERO_SEQ.eyebrow}ms` } as React.CSSProperties}
            >
              NATIONAL MATERIAL INTELLIGENCE
            </p>
            <h1
              className="display-xl mt-6 hero-step"
              style={{ "--seq": `${HERO_SEQ.h1}ms` } as React.CSSProperties}
            >
              One Nation.
              <br />
              One Material Code.
            </h1>
            <p
              className="lede mt-7 max-w-[36rem] hero-step"
              style={{ "--seq": `${HERO_SEQ.lede}ms` } as React.CSSProperties}
            >
              {projectMeta.descriptor}. EKTA unifies fragmented material masters
              across India&apos;s CPSEs, transforming inconsistent codes and
              descriptions into one traceable national standard.
            </p>
            <div
              className="mt-8 flex flex-wrap items-center gap-3 hero-step"
              style={{ "--seq": `${HERO_SEQ.ctas}ms` } as React.CSSProperties}
            >
              <button
                type="button"
                onClick={() =>
                  document.getElementById("system")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                className="btn btn-primary"
              >
                See how it works
                <svg
                  className="btn-arrow h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M11 3l7 7-7 7M5 10h13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() =>
                  document.getElementById("product")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                className="btn btn-ghost"
              >
                View dashboard preview
                <svg
                  className="btn-arrow h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M11 3l7 7-7 7M5 10h13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p className="body-sm mt-6 hero-step" style={{ "--seq": `${HERO_SEQ.meta - 160}ms` } as React.CSSProperties}>
              AI recommends. Humans approve.
            </p>
          </div>

          {/* RIGHT ~45% */}
          <div className="col-span-full md:col-span-5">
            <div className="relative mx-auto max-w-[22rem] md:max-w-none">
              {/* Ambient subtle glow behind viz */}
              <div
                className="pointer-events-none absolute -inset-x-2 -inset-y-8 -z-10 rounded-[32%] bg-amber/5 blur-[80px] md:-inset-8"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-[24%] bg-teal/4 blur-[60px]"
                aria-hidden="true"
              />

              {/* Viz stack */}
              <div className="relative grid grid-cols-1 gap-4">
                {/* Connector vertical (behind cards) */}
                <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 flex justify-center">
                  <div
                    className="hero-connector h-40 w-[1px] bg-gradient-to-b from-amber/40 via-amber/20 to-transparent"
                    style={{ "--seq": `${HERO_SEQ.lines}ms` } as React.CSSProperties}
                  />
                </div>

                {legacyRecords.map((r, i) => {
                  const offset =
                    i === 0 ? "hero-card-a" : i === 1 ? "hero-card-b" : "hero-card-c";
                  return (
                    <div
                      key={r.org}
                      className={`hero-step hero-card ${offset} relative z-10 panel px-5 py-5 md:px-6 md:py-6`}
                      style={{
                        "--seq": `${HERO_SEQ.cards + i * 240}ms`,
                      } as React.CSSProperties}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="mono-label text-faint">{r.org}</p>
                          <p className="mono-code mt-2 text-ink line-clamp-1 md:line-clamp-none code-hover group-hover:text-amber transition-colors duration-400">
                            {r.code}
                          </p>
                        </div>
                        <span className="tag-illustrative">LEGACY</span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1 attr-sweep"
                        style={{ "--seq": `${r.sweepAt}ms` } as React.CSSProperties}
                      >
                        {r.tokens.map((t, j) => {
                          const lit = r.lit.includes(j);
                          return (
                            <span
                              key={`${r.org}-t-${j}`}
                              className={`attr-token mono-code text-[0.71875rem] ${lit ? "attr-token-lit" : ""}`}
                              style={{ "--seq": `${r.sweepAt + j * 80}ms` } as React.CSSProperties}
                            >
                              {t}
                            </span>
                          );
                        })}
                      </div>
                      <span
                        className="hero-legacy-strike"
                        style={{ "--seq": `${HERO_SEQ.strike}ms` } as React.CSSProperties}
                      />
                    </div>
                  );
                })}

                {/* Unified card */}
                <div
                  className={`hero-step relative z-20 panel px-5 py-6 md:px-6 md:py-7 hero-unified ${unifiedIn ? "is-in" : ""}`}
                  style={{ "--seq": `${HERO_SEQ.unify}ms` } as React.CSSProperties}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="mono-label text-amber">NATIONAL CODE</p>
                      <p className="mono-code mt-3 text-lg md:text-xl tracking-[-0.01em] text-ink code-hover">
                        {nationalCode}
                      </p>
                    </div>
                    <span className="tag-illustrative">EKTA STANDARD</span>
                  </div>

                  <div className="mt-5 space-y-1">
                    {standardDescription.map((line, i) => (
                      <p
                        key={i}
                        className="mono-code text-[0.75rem] leading-relaxed text-muted hero-dim"
                        style={{ "--seq": `${HERO_SEQ.unify + 160 + i * 120}ms` } as React.CSSProperties}
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  <div className="mt-6 hairline-t pt-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="mono-label text-faint">CONFIDENCE</p>
                        <p className="mt-2 text-[2.25rem] font-[300] leading-none tracking-[-0.02em] tnum text-ink conf-value">
                          {confidence.toFixed(1)}%
                        </p>
                        <p className="body-sm mt-2">3 CODES MERGED</p>
                      </div>
                      <span className="tag-illustrative">SAMPLE DATA</span>
                    </div>
                    <div className="mt-3 conf-track">
                      <div
                        className="conf-fill"
                        style={{
                          width: `${Math.min(confidence, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
