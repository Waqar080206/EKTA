"use client";

import { SECTION_NUMBERS, capabilities } from "@/lib/data";

function MatchFragment() {
  return (
    <div className="mt-5 space-y-2">
      <div className="flex items-end justify-between">
        <div>
          <p className="mono-label text-faint">CONFIDENCE</p>
          <p className="mt-1 text-2xl font-[300] leading-none tracking-[-0.02em] tnum text-ink">
            97.4%
          </p>
        </div>
        <span className="tag-illustrative">SAMPLE DATA</span>
      </div>
      <div className="conf-track">
        <div className="conf-fill" style={{ width: "97.4%" }} />
      </div>
      <div className="mt-3 flex items-center justify-between border border-white/8 bg-bg/40 px-3 py-2">
        <p className="mono-code text-[0.7rem]">3 candidate records</p>
        <span className="mono-code text-[0.7rem] text-amber">→ 1 normalized material</span>
      </div>
    </div>
  );
}

function DuplicateFragment() {
  return (
    <div className="mt-5 space-y-2">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
        <p className="mono-code text-[0.72rem]">Cluster detection</p>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[6, 8, 12].map((v) => (
          <div key={v} className="border border-white/8 bg-bg/40 px-2 py-2 text-center">
            <p className="mono-code text-[0.65rem] text-faint">RECORDS</p>
            <p className="mono-code mt-1 text-base tnum">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeFragment() {
  return (
    <div className="mt-5">
      <p className="mono-label text-amber">NATIONAL CODE</p>
      <p className="mono-code mt-2 text-lg tracking-[-0.01em] code-hover">EKTA-VLV-GAT-000482</p>
      <p className="body-sm mt-2">Stable, deterministic and reversible.</p>
    </div>
  );
}

function DashboardFragment() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-1.5">
      {["Pending 143", "Mapped 12", "Rationalized 4.8K", "Clusters 124"].map((t) => (
        <div key={t} className="border border-white/8 bg-bg/40 px-2 py-2">
          <p className="mono-code text-[0.68rem] text-muted">{t}</p>
        </div>
      ))}
    </div>
  );
}

function IntegrationFragment() {
  return (
    <div className="mt-5 flex flex-wrap gap-1.5">
      {["SAP", "ERP", "CSV", "API"].map((t) => (
        <span key={t} className="tag-illustrative">
          {t}
        </span>
      ))}
      <p className="body-sm mt-2 w-full">Source systems remain the system of record.</p>
    </div>
  );
}

function iconBox() {
  return (
    <svg
      className="h-5 w-5 text-amber"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
    >
      <path d="M4 10h12M10 4v12" strokeLinecap="round" />
    </svg>
  );
}

export function Capabilities() {
  return (
    <section id="capabilities" className="section relative">
      <div className="glow glow-amber-left" aria-hidden="true" />
      <div className="shell relative z-10">
        <div className="grid-12">
          <div className="col-span-full md:col-span-10">
            <p className="mono-label text-faint">{SECTION_NUMBERS.capabilities}</p>
            <h2 className="display-lg mt-5" data-reveal>
              Built for the complexity
              <br />
              of industrial material data.
            </h2>
          </div>
        </div>

        <div
          className="mt-10 grid grid-cols-4 gap-4 md:grid-cols-12 md:gap-5 md:[grid-auto-rows:minmax(11rem,auto)]"
          data-stagger
        >
          {capabilities.map((c, i) => (
            <article
              key={c.id}
              className={`panel panel-hover group relative col-span-4 ${c.col} ${c.row}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className="panel-inner flex h-full flex-col justify-between px-5 py-6 md:px-6 md:py-7">
                <div>
                  <div className="flex items-start justify-between">
                    <span className="flex h-8 w-8 items-center justify-center border border-amber/30 bg-amber/8">
                      {iconBox()}
                    </span>
                    <span className="tag-illustrative">CAPABILITY</span>
                  </div>
                  <h3 className="display-sm mt-5">{c.title}</h3>
                  <p className="body-sm mt-3 max-w-[40ch]">{c.body}</p>
                  {c.fragment === "match" && <MatchFragment />}
                  {c.fragment === "duplicate" && <DuplicateFragment />}
                  {c.fragment === "code" && <CodeFragment />}
                  {c.fragment === "dashboard" && <DashboardFragment />}
                  {c.fragment === "integration" && <IntegrationFragment />}
                </div>
                <div className="mt-6">
                  <span className="rule-amber block w-12" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
