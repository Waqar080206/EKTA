"use client";

import { governancePrinciples, SECTION_NUMBERS } from "@/lib/data";

const icons: Record<string, React.ReactNode> = {
  human: (
    <path
      d="M10 3.2a2.1 2.1 0 100 4.2 2.1 2.1 0 000-4.2zM5 16.4c0-2.6 2.2-4.4 5-4.4s5 1.8 5 4.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  audit: (
    <>
      <circle cx="10" cy="10" r="6.4" />
      <path d="M10 6.2V10l2.6 1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  access: (
    <>
      <rect x="4" y="8.6" width="12" height="8" rx="1.4" />
      <path d="M7 8.6V6.8a3 3 0 016 0v1.8" strokeLinecap="round" />
    </>
  ),
};

export function Governance() {
  return (
    <section id="governance" className="section relative hairline-t">
      <div className="glow glow-center" aria-hidden="true" />
      <div className="shell relative z-10">
        <div className="grid-12">
          <div className="col-span-full md:col-span-9">
            <p className="mono-label text-faint">{SECTION_NUMBERS.governance}</p>
            <h2 className="display-lg mt-5" data-reveal>
              Intelligence with accountability.
            </h2>
            <p className="lede mt-6 max-w-[44rem]" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              EKTA is decision support, not an autonomous system. Three
              commitments govern how a recommendation becomes a standard.
            </p>
          </div>
        </div>

        <ol
          className="mt-12 grid grid-cols-1 divide-y divide-white/8 border-t border-white/8 md:grid-cols-3 md:divide-x md:divide-y-0"
          data-stagger
        >
          {governancePrinciples.map((p, i) => (
            <li
              key={p.id}
              className="group py-8 md:px-8 md:py-10 first:md:pl-0 last:md:pr-0"
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center border border-amber/30 bg-amber/8">
                  <svg
                    className="h-4 w-4 text-amber"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    aria-hidden="true"
                  >
                    {icons[p.id]}
                  </svg>
                </span>
                <span className="mono-label text-amber">{p.label}</span>
              </div>
              <h3 className="display-sm mt-6">{p.title}</h3>
              <p className="body-sm mt-4">{p.body}</p>
              <ul className="mt-6 space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5">
                    <span className="mt-[0.5em] h-px w-3 shrink-0 bg-teal/60" />
                    <span className="body-sm text-[0.8125rem]">{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <span className="rule-amber block w-10" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
