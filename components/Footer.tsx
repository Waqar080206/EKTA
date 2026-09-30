import { imageCredits, projectMeta } from "@/lib/data";

export function Footer() {
  return (
    <footer id="sih" className="relative hairline-t bg-bg-elevated">
      <div className="glow glow-amber" aria-hidden="true" />
      <div className="shell relative z-10">
        {/* Large statement */}
        <div className="pt-20 pb-14 md:pt-28 md:pb-20">
          <p className="mono-label text-faint">
            {projectMeta.organization} · {projectMeta.agency}
          </p>
          <p className="display-lg mt-7 max-w-[16ch]">
            One Nation. One Material Code.
          </p>
          <p className="lede mt-6 max-w-[42rem]">
            {projectMeta.descriptor}. AI-assisted material intelligence for
            India&apos;s Central Public Sector Enterprises.
          </p>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/8 py-12 md:grid-cols-4 md:py-16">
          <div>
            <p className="mono-label text-faint">Theme</p>
            <p className="body-sm mt-3 text-ink/90">{projectMeta.theme}</p>
          </div>
          <div>
            <p className="mono-label text-faint">Event</p>
            <p className="body-sm mt-3 text-ink/90">{projectMeta.hackathon}</p>
          </div>
          <div>
            <p className="mono-label text-faint">Problem statement</p>
            <p className="body-sm mt-3 text-ink/90">{projectMeta.problemStatement}</p>
          </div>
          <div>
            <p className="mono-label text-faint">Team</p>
            <p className="body-sm mt-3 text-ink/90">{projectMeta.team}</p>
          </div>
          <div className="col-span-2 md:col-span-4">
            <p className="mono-label text-faint">Organisation</p>
            <p className="body-sm mt-3 text-ink/90">
              {projectMeta.organization}
              <br />
              {projectMeta.agency}
            </p>
          </div>
        </div>

        {/* Image credits */}
        <div className="border-t border-white/8 py-10">
          <p className="mono-label text-faint">Image credits</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {imageCredits.map((c) => (
              <li key={c} className="body-sm text-[0.75rem] text-faint">
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Base row */}
        <div className="flex flex-col gap-4 border-t border-white/8 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-label text-faint">
            {projectMeta.descriptor.toUpperCase()}
          </p>
          <p className="body-sm text-[0.75rem] text-faint">
            All figures shown are illustrative sample data for demonstration
            purposes.
          </p>
          <p className="mono-label text-faint">
            {projectMeta.hackathon} · {projectMeta.problemStatement}
          </p>
        </div>
      </div>
    </footer>
  );
}
