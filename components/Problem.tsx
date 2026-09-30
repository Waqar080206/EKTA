"use client";

import { SECTION_NUMBERS, problemPanels } from "@/lib/data";

export function Problem() {
  return (
    <section id="problem" className="section relative">
      <div className="glow glow-center" aria-hidden="true" />
      <div className="shell relative z-10">
        <div className="grid-12">
          <div className="col-span-full md:col-span-10">
            <p className="mono-label text-faint">{SECTION_NUMBERS.problem}</p>
            <h2 className="display-lg mt-5" data-reveal>
              Same material.
              <br />
              Different identities.
            </h2>
            <p className="lede mt-6 max-w-[46rem]" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              Across large industrial organisations, the same physical material
              can exist under multiple codes, descriptions and specifications.
            </p>
          </div>
        </div>

        <div
          className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
          data-stagger
        >
          {problemPanels.map((p, i) => (
            <article
              key={p.index}
              className="panel panel-hover group relative flex h-full flex-col"
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className="panel-inner flex h-full flex-col px-6 py-7 md:px-7 md:py-8">
                <div className="flex items-start justify-between">
                  <span className="mono-label text-faint">{p.index}</span>
                  <span className="tag-illustrative">ILLUSTRATIVE / SAMPLE DATA</span>
                </div>
                <h3 className="display-sm mt-6">
                  {p.title.map((t, j) => (
                    <span key={j} className="block">
                      {t}
                    </span>
                  ))}
                </h3>
                <div className="mt-8">
                  <p className="display-md leading-none tracking-[-0.02em]">
                    {p.metric}
                  </p>
                  <p className="mono-label mt-2 text-muted">{p.metricUnit}</p>
                </div>
                <p className="body-sm mt-6">{p.note}</p>
                <div className="mt-auto pt-8">
                  <span className="rule-amber block w-16" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
