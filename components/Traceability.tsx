"use client";

import { nationalCode, legacyMappings, SECTION_NUMBERS } from "@/lib/data";

export function Traceability() {
  const cx = 240;
  const cy = 240;
  const rOuter = 170;
  const hubR = 72;

  const positions = legacyMappings.map((_, i) => {
    const angle = (i / legacyMappings.length) * Math.PI * 2 - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * rOuter,
      y: cy + Math.sin(angle) * rOuter,
      angle,
    };
  });

  return (
    <section id="traceability" className="section relative hairline-t">
      <div className="glow glow-teal" aria-hidden="true" />
      <div className="shell relative z-10">
        <div className="grid-12">
          <div className="col-span-full md:col-span-9">
            <p className="mono-label text-faint">{SECTION_NUMBERS.trace}</p>
            <h2 className="display-lg mt-5" data-reveal>
              One code.
              <br />
              Every CPSE code still traceable.
            </h2>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <div className="relative aspect-square w-full max-w-[26rem] md:max-w-[30rem]">
            <svg
              viewBox="0 0 480 480"
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label="Traceability hub showing legacy CPSE codes connected to the national EKTA code"
            >
              <defs>
                <linearGradient id="traceGrad" x1="0" y1="0" x2="480" y2="480">
                  <stop offset="0%" stopColor="rgba(245,158,11,0.18)" />
                  <stop offset="100%" stopColor="rgba(77,182,168,0.12)" />
                </linearGradient>
                <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Radial halo */}
              <circle cx={cx} cy={cy} r={hubR + 48} fill="url(#traceGrad)" opacity={0.08} />
              <circle cx={cx} cy={cy} r={hubR + 28} stroke="rgba(255,255,255,0.05)" strokeWidth={1} fill="none" />

              {/* Connector paths */}
              {positions.map((p, i) => (
                <path
                  key={i}
                  className="draw-path"
                  d={`M ${p.x} ${p.y} L ${cx} ${cy}`}
                  stroke="rgba(245,158,11,0.38)"
                  strokeWidth={1.2}
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ "--draw-delay": `${160 + i * 120}ms` } as React.CSSProperties}
                />
              ))}

              {/* Orb nodes */}
              {positions.map((p, i) => (
                <g key={i} className="origin-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                  <circle cx={p.x} cy={p.y} r={18} fill="rgba(11,16,27,0.92)" stroke="rgba(245,158,11,0.42)" strokeWidth={1} />
                  <circle cx={p.x} cy={p.y} r={6} fill="#f59e0b" filter="url(#softGlow)" />
                </g>
              ))}

              {/* Hub */}
              <circle cx={cx} cy={cy} r={hubR} fill="rgba(11,16,27,0.96)" stroke="rgba(245,158,11,0.5)" strokeWidth={1.5} />
              <circle cx={cx} cy={cy} r={hubR - 10} stroke="rgba(255,255,255,0.06)" strokeWidth={1} fill="none" />
              <circle cx={cx} cy={cy} r={10} fill="#f59e0b" filter="url(#softGlow)" />
            </svg>

            {/* Labels overlay (desktop) */}
            <div className="pointer-events-none absolute inset-0 hidden md:block">
              {positions.map((p, i) => {
                const left = (p.x / 480) * 100;
                const top = (p.y / 480) * 100;
                const offsetX = Math.cos(p.angle) > 0 ? "8px" : "-8px";
                const offsetY = Math.sin(p.angle) < -0.1 ? "-4px" : "4px";
                return (
                  <div
                    key={i}
                    className="absolute flex flex-col"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      transform: `translate(calc(-50% + ${offsetX}), calc(-50% + ${offsetY}))`,
                    }}
                  >
                    <span className="mono-label text-faint text-center">
                      {legacyMappings[i].org}
                    </span>
                    <span className="mono-code mt-1 max-w-[12ch] truncate text-center text-[0.72rem] text-ink/90">
                      {legacyMappings[i].code}
                    </span>
                  </div>
                );
              })}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="mono-label text-amber">NATIONAL CODE</p>
                <p className="mono-code mt-2 text-lg tracking-[-0.01em] text-ink">
                  {nationalCode}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile labels */}
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 md:hidden">
            {legacyMappings.map((m, i) => (
              <div key={i} className="border border-white/8 bg-bg-panel/70 px-3 py-2">
                <p className="mono-label text-faint">{m.org}</p>
                <p className="mono-code mt-1 truncate text-[0.72rem]">{m.code}</p>
              </div>
            ))}
            <div className="col-span-2 border border-amber/30 bg-amber/8 px-3 py-3 text-center">
              <p className="mono-label text-amber">NATIONAL CODE</p>
              <p className="mono-code mt-1 text-base">{nationalCode}</p>
            </div>
          </div>

          <p className="lede mt-8 max-w-[40rem] text-center" data-reveal style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
            A common national code does not erase legacy systems. It creates a
            traceable bridge between them.
          </p>
        </div>
      </div>
    </section>
  );
}
