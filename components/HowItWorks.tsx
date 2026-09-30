"use client";

import { SECTION_NUMBERS, processStages } from "@/lib/data";

export function HowItWorks() {
  return (
    <section id="system" className="section relative hairline-t hairline-b bg-bg/70">
      <div className="glow glow-amber" aria-hidden="true" />
      <div className="shell relative z-10">
        <div className="grid-12">
          <div className="col-span-full md:col-span-10">
            <p className="mono-label text-faint">{SECTION_NUMBERS.system}</p>
            <h2 className="display-lg mt-5" data-reveal>
              From fragmented records
              <br />
              to one trusted standard.
            </h2>
          </div>
        </div>

        {/* Desktop horizontal */}
        <div className="mt-10 hidden md:block">
          <div className="relative grid grid-cols-4 gap-0" data-stagger>
            {processStages.map((s, i) => (
              <div key={s.index} className="group relative flex h-full flex-col">
                {/* Connector line */}
                {i < processStages.length - 1 && (
                  <div className="pointer-events-none absolute top-8 left-[calc(100%_-_8px)] z-0 hidden h-[1px] w-[calc(100%_+_8px)] bg-white/12 md:block">
                    <span
                      className="absolute inset-0 block origin-left bg-amber/40"
                      data-draw
                      style={{ "--draw-delay": `${200 + i * 120}ms` } as React.CSSProperties}
                    />
                  </div>
                )}
                <div
                  className="relative z-10 flex h-full flex-col px-5 pb-0 pt-1"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <div className="flex items-center justify-between">
                    <span className="mono-label text-faint">{s.index}</span>
                    <span className="mono-label text-muted">{s.label}</span>
                  </div>
                  <h3 className="display-sm mt-5">{s.title}</h3>
                  <p className="body-sm mt-4 max-w-[22ch]">{s.body}</p>
                  <div className="mt-6 flex flex-wrap gap-x-2 gap-y-1">
                    {s.meta.map((m) => (
                      <span key={m} className="tag-illustrative">
                        {m}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-10">
                    <div className="relative mx-auto h-6 w-6">
                      <span className="absolute inset-0 rounded-full border border-amber/40" />
                      <span className="absolute inset-[5px] rounded-full bg-amber transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="mt-10 md:hidden">
          <ol className="space-y-8" data-stagger>
            {processStages.map((s, i) => (
              <li
                key={s.index}
                className="relative panel px-5 py-6"
                style={{ "--i": i } as React.CSSProperties}
              >
                {i < processStages.length - 1 && (
                  <div className="pointer-events-none absolute -bottom-8 left-6 top-auto h-8 w-[1px]">
                    <span
                      className="block h-full w-full origin-top bg-amber/40"
                      data-draw="v"
                      style={{ "--draw-delay": `${220 + i * 120}ms` } as React.CSSProperties}
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="mono-label text-faint">{s.index}</span>
                  <span className="mono-label text-muted">{s.label}</span>
                </div>
                <h3 className="display-sm mt-4">{s.title}</h3>
                <p className="body-sm mt-3">{s.body}</p>
                <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1">
                  {s.meta.map((m) => (
                    <span key={m} className="tag-illustrative">
                      {m}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
