"use client";

import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { impactOutcomes, SECTION_NUMBERS } from "@/lib/data";

export function Impact() {
  const { ref, inView } = useInView<HTMLOListElement>(0.15);

  // A single illustrative figure — clearly labelled, not a financial claim.
  const rationalized = useCountUp({ target: 4821, enabled: inView });

  return (
    <section id="impact" className="section relative hairline-t hairline-b">
      <div className="glow glow-amber" aria-hidden="true" />
      <div className="shell relative z-10">
        <div className="grid-12">
          <div className="col-span-full md:col-span-9">
            <p className="mono-label text-faint">{SECTION_NUMBERS.impact}</p>
            <h2 className="display-lg mt-5" data-reveal>
              Standardization compounds.
            </h2>
          </div>
        </div>

        <ol
          ref={ref}
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          data-stagger
        >
          {impactOutcomes.map((o, i) => (
            <li
              key={o.index}
              className="group relative flex flex-col"
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className="flex items-center gap-3">
                <svg
                  className="h-4 w-4 shrink-0 text-teal"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path
                    className="checkmark-path"
                    d="M4 10.5l4 4 8-9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ "--draw-delay": `${160 + i * 90}ms` } as React.CSSProperties}
                  />
                </svg>
                <span className="mono-label text-faint">{o.index}</span>
              </div>
              <h3 className="display-sm mt-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0.5">
                {o.title}
              </h3>
              <p className="body-sm mt-3 max-w-[38ch]">{o.body}</p>
              <span className="mt-6 block h-[1px] w-full bg-white/8" />
            </li>
          ))}
        </ol>

        {/* Single illustrative figure */}
        <div className="mt-14 border-t border-white/8 pt-8">
          <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-[auto_1fr] md:gap-12">
            <div>
              <p className="mono-label text-faint">CODES RATIONALIZED</p>
              <p className="display-lg mt-3 tnum leading-none">
                {rationalized.toLocaleString("en-IN")}
              </p>
              <p className="tag-illustrative mt-4">ILLUSTRATIVE · SAMPLE DATA</p>
            </div>
            <p className="body-sm max-w-[42rem] md:pb-2">
              Rationalisation compounds. Each merged code reduces the number of
              records to reconcile on the next ingest, which makes the following
              pass cheaper and the catalogue more accurate. No financial saving
              figure is asserted here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
