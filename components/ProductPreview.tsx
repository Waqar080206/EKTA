"use client";

import {
  SECTION_NUMBERS,
  duplicateClusters,
  comparisonRecords,
  comparisonAttrs,
  dashMetrics,
  nationalCode,
  standardDescription,
} from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

const RATIONALIZED = 4821;

export function ProductPreview() {
  const { ref: secRef, inView } = useInView<HTMLElement>(0.15);

  const dupRate = useCountUp({
    target: dashMetrics[0].value,
    decimals: 1,
    enabled: inView,
  });
  const rationalized = useCountUp({
    target: RATIONALIZED,
    enabled: inView,
  });
  const mapped = useCountUp({
    target: dashMetrics[2].value,
    enabled: inView,
  });
  const pending = useCountUp({
    target: dashMetrics[3].value,
    enabled: inView,
  });

  const vals = [dupRate, rationalized, mapped, pending];

  return (
    <section id="product" ref={secRef} className="section relative">
      <div className="glow glow-center" aria-hidden="true" />
      <div className="shell relative z-10">
        <div className="grid-12">
          <div className="col-span-full md:col-span-10">
            <p className="mono-label text-faint">{SECTION_NUMBERS.product}</p>
            <h2 className="display-lg mt-5" data-reveal>
              See the intelligence
              <br />
              behind the standard.
            </h2>
            <p className="lede mt-6 max-w-[48rem]" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              A unified workspace for discovering duplicates, comparing
              specifications and approving standardised material mappings.
            </p>
          </div>
        </div>

        <div className="mt-10">
          {/* Desktop dashboard */}
          <div className="dash-frame hidden flex-col md:flex" data-reveal="scale">
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4 md:px-6">
              <div className="flex items-center gap-3">
                <span className="flex h-2 w-2 rounded-full bg-amber" />
                <p className="mono-label text-muted">MATERIAL INTELLIGENCE WORKSPACE</p>
              </div>
              <span className="tag-illustrative">SAMPLE DATA</span>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,0.95fr)] divide-x divide-white/6">
              {/* LEFT */}
              <div className="flex h-full flex-col border-r border-white/6">
                <div className="border-b border-white/6 px-5 py-4">
                  <p className="mono-label text-muted">DUPLICATE CLUSTERS</p>
                </div>
                <div className="flex-1 space-y-1 px-3 py-3">
                  {duplicateClusters.map((c, i) => (
                    <div
                      key={c.label}
                      className={`cluster-item flex items-center justify-between border border-transparent px-3 py-2 ${c.active ? "cluster-item-active" : ""}`}
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      <div>
                        <p className="mono-code text-[0.75rem]">{c.label}</p>
                        <p className="mono-code mt-0.5 text-[0.625rem] text-faint">{c.records} records</p>
                      </div>
                      {c.active && <span className="h-1.5 w-1.5 rounded-full bg-amber" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* CENTER */}
              <div className="flex h-full flex-col">
                <div className="border-b border-white/6 px-5 py-4">
                  <p className="mono-label text-muted">MATERIAL COMPARISON</p>
                </div>
                <div className="grid grid-cols-2 divide-x divide-white/6 border-b border-white/6">
                  {comparisonRecords.map((r) => (
                    <div key={r.org} className="px-5 py-4">
                      <p className="mono-label text-faint">{r.org}</p>
                      <p className="mono-code mt-2 text-[0.8125rem]">{r.code}</p>
                      <p className="mono-code mt-1 text-[0.625rem] text-faint">{r.system}</p>
                    </div>
                  ))}
                </div>
                <div className="flex-1 divide-y divide-white/6">
                  {comparisonAttrs.map((a) => (
                    <div key={a.key} className="attr-row px-5">
                      <span className="attr-key">{a.key}</span>
                      <div className="flex items-baseline justify-end gap-4">
                        <span className={`attr-val ${a.state === "match" ? "attr-match" : "attr-review"}`}>{a.a}</span>
                        <span className={`attr-val ${a.state === "match" ? "attr-match" : "attr-review"}`}>{a.b}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/6 px-5 py-3 text-right">
                  <span className="tag-illustrative">DIFFERENCES HIGHLIGHTED FOR REVIEW</span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex h-full flex-col">
                <div className="border-b border-white/6 px-5 py-4">
                  <p className="mono-label text-amber">EKTA RECOMMENDATION</p>
                </div>
                <div className="px-5 py-5">
                  <p className="mono-label text-faint">NATIONAL CODE</p>
                  <p className="mono-code mt-2 text-lg tracking-[-0.01em]">{nationalCode}</p>
                </div>
                <div className="px-5 pb-4">
                  <div className="space-y-1">
                    {standardDescription.map((l, i) => (
                      <p key={i} className="mono-code text-[0.72rem] leading-relaxed text-muted">
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="border-t border-white/6 px-5 py-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="mono-label text-faint">CONFIDENCE</p>
                      <p className="mt-1 text-2xl font-[300] leading-none tracking-[-0.02em] tnum">97.4%</p>
                    </div>
                    <span className="tag-illustrative">SAMPLE DATA</span>
                  </div>
                  <div className="mt-3 conf-track">
                    <div className="conf-fill" style={{ width: "97.4%" }} />
                  </div>
                </div>
                <div className="mt-auto grid grid-cols-3 gap-1.5 border-t border-white/6 p-3">
                  <button type="button" className="dash-btn dash-btn-approve">
                    Approve
                  </button>
                  <button type="button" className="dash-btn">
                    Edit
                  </button>
                  <button type="button" className="dash-btn">
                    Reject
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-white/8 bg-bg-panel/70 px-5 py-5 md:px-6 md:py-6">
              <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
                {dashMetrics.map((m, i) => (
                  <div key={m.label} className="flex flex-col">
                    <p className="mono-label text-faint">{m.label}</p>
                    <p className="dash-metric-value mt-3 tnum">
                      {Number.isInteger(vals[i]) ? Math.round(vals[i] as number).toLocaleString("en-IN") : (vals[i] as number).toFixed(m.decimals)}
                      {m.suffix}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile dashboard (recomposed) */}
          <div className="dash-frame flex flex-col md:hidden" data-reveal="scale">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
              <p className="mono-label text-muted">MATERIAL INTELLIGENCE</p>
              <span className="tag-illustrative">SAMPLE DATA</span>
            </div>

            <div className="border-b border-white/8 px-4 py-3">
              <p className="mono-label text-muted">DUPLICATE CLUSTERS</p>
              <div className="mt-2 space-y-1">
                {duplicateClusters.slice(0, 4).map((c) => (
                  <div key={c.label} className={`cluster-item flex items-center justify-between border border-transparent px-2 py-2 ${c.active ? "cluster-item-active" : ""}`}>
                    <p className="mono-code text-[0.72rem]">{c.label}</p>
                    <p className="mono-code text-[0.625rem] text-faint">{c.records}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-b border-white/8">
              <div className="px-4 py-3">
                <p className="mono-label text-muted">COMPARISON</p>
              </div>
              <div className="grid grid-cols-2 divide-x divide-white/6 border-t border-white/6">
                {comparisonRecords.map((r) => (
                  <div key={r.org} className="px-4 py-3">
                    <p className="mono-label text-faint">{r.org}</p>
                    <p className="mono-code mt-1 text-[0.72rem]">{r.code}</p>
                  </div>
                ))}
              </div>
              <div className="divide-y divide-white/6 border-t border-white/6">
                {comparisonAttrs.slice(0, 4).map((a) => (
                  <div key={a.key} className="attr-row px-4">
                    <span className="attr-key">{a.key}</span>
                    <div className="flex justify-end gap-3">
                      <span className={`attr-val ${a.state === "match" ? "attr-match" : "attr-review"}`}>{a.a}</span>
                      <span className={`attr-val ${a.state === "match" ? "attr-match" : "attr-review"}`}>{a.b}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-4 py-4">
              <p className="mono-label text-amber">EKTA RECOMMENDATION</p>
              <p className="mono-code mt-2 text-base">{nationalCode}</p>
              <div className="mt-2 space-y-0.5">
                {standardDescription.map((l, i) => (
                  <p key={i} className="mono-code text-[0.7rem] text-muted">
                    {l}
                  </p>
                ))}
              </div>
              <div className="mt-3 flex items-end justify-between">
                <p className="mono-code text-lg tnum">97.4%</p>
                <span className="tag-illustrative">CONFIDENCE</span>
              </div>
              <div className="mt-2 conf-track">
                <div className="conf-fill" style={{ width: "97.4%" }} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-1">
                <button type="button" className="dash-btn dash-btn-approve text-[0.625rem]">
                  Approve
                </button>
                <button type="button" className="dash-btn text-[0.625rem]">
                  Edit
                </button>
                <button type="button" className="dash-btn text-[0.625rem]">
                  Reject
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/8 bg-bg-panel/70 px-4 py-4">
              {dashMetrics.map((m, i) => (
                <div key={m.label}>
                  <p className="mono-label text-faint">{m.label}</p>
                  <p className="mono-code mt-1 text-lg tnum">
                    {Number.isInteger(vals[i]) ? Math.round(vals[i] as number).toLocaleString("en-IN") : (vals[i] as number).toFixed(m.decimals)}
                    {m.suffix}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
