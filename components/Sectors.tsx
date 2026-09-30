"use client";

import { SECTION_NUMBERS, sectors } from "@/lib/data";

export function Sectors() {
  return (
    <section id="sectors" className="section relative">
      <div className="glow glow-amber-left" aria-hidden="true" />
      <div className="shell relative z-10">
        <div className="grid-12">
          <div className="col-span-full md:col-span-9">
            <p className="mono-label text-faint">{SECTION_NUMBERS.sectors}</p>
            <h2 className="display-lg mt-5" data-reveal>
              Designed across the industrial backbone.
            </h2>
          </div>
        </div>
      </div>

      {/* Full-bleed strip */}
      <div className="mt-10 md:mt-14">
        <ul
          className="flex snap-x snap-mandatory gap-px overflow-x-auto scroll-smooth px-1.5 pb-2 [scrollbar-width:none] md:px-6 md:pb-3 lg:grid lg:grid-cols-5 lg:gap-px lg:overflow-visible"
          data-stagger
        >
          {sectors.map((s, i) => (
            <li
              key={s.id}
              className="w-[78vw] shrink-0 snap-center sm:w-[62vw] md:w-[46vw] lg:w-auto"
              style={{ "--i": i } as React.CSSProperties}
            >
              <article className="sector-tile group flex h-[16rem] flex-col justify-between border border-white/8 p-6 sm:h-[19rem] md:h-[26rem] md:p-7">
                {/* CSS gradient fallback behind image */}
                <div
                  className="absolute inset-0 -z-10"
                  style={{
                    background:
                      "linear-gradient(160deg, #0E1420 0%, #0B101B 55%, #14100A 100%)",
                  }}
                  aria-hidden="true"
                />
                {/* eslint-disable-next-line @next/next/no-img-element --
                    Images are served directly from the Unsplash CDN with
                    fit=crop and width/quality parameters applied at the source.
                    next/image would add a runtime optimizer route without
                    changing the delivered asset. */}
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                  className="sector-img absolute inset-0 -z-10 h-full w-full"
                  width={1200}
                  height={800}
                />
                <div className="flex items-start justify-between">
                  <span className="mono-label text-ink/75">{s.index}</span>
                  <span className="h-1 w-1 rounded-full bg-amber/70" />
                </div>
                <div className="sector-label">
                  <h3 className="display-sm text-ink">{s.name}</h3>
                  <p className="body-sm mt-2 max-w-[24ch] text-ink/70">{s.note}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
