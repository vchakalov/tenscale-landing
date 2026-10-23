import { ProofButton } from "@/components/home/Proof";
import { Reveal } from "@/components/home/Reveal";

/**
 * One agency's first 90 days, line by line.
 *
 * It replaces a drawing of "a whole stack vs one engine" that asked to be
 * believed. These are the agency's own figures, from the report on the wall.
 */

const ROWS = [
  { label: "Clients", before: "12", after: "24", change: "2×" },
  { label: "Team", before: "4 people", after: "4 people", change: "No hires" },
  { label: "Ads live", before: "190", after: "1,900", change: "10×" },
  { label: "Hours per account a week", before: "9", after: "3.6", change: "−60%" },
  { label: "Onboarding a new client", before: "2 weeks", after: "Hours", change: "Same day" },
];

export function BeforeAfter() {
  return (
    <section className="w-full px-4 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal className="min-w-0">
          <span className="rounded-full bg-black/[0.04] px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-[#3a3a3d] uppercase ring-1 ring-black/[0.06] sm:text-[11px]">
            One agency, 90 days in
          </span>
          <h2 className="mt-6 font-[family-name:var(--font-gelica)] text-[38px] leading-[1.05] font-light text-balance text-[#0e0e0f] sm:text-[56px]">
            Twice the clients. Same team.
          </h2>
          <p className="mt-5 max-w-[440px] text-[16px] leading-[26px] text-[#2e2e30] sm:text-[17px] sm:leading-[28px]">
            Nobody builds ads by hand, so a new client stops meaning a new hire. The engine takes the production,
            the testing and the scaling; the team keeps the clients.
          </p>
          <div className="mt-7">
            <ProofButton src="/proof/ops-before-after.webp">See their report</ProofButton>
          </div>
        </Reveal>

        <Reveal delay={120} className="min-w-0">
          <div className="rounded-[2rem] bg-black/[0.03] p-1.5 ring-1 ring-black/[0.06]">
            <div className="overflow-hidden rounded-[calc(2rem-0.375rem)] bg-white shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_30px_70px_-40px_rgba(14,14,15,0.35)]">
              {/* A phone gets the same rows as a list, so nothing scrolls sideways. */}
              <ul className="divide-y divide-black/[0.05] sm:hidden">
                {ROWS.map((row) => (
                  <li key={row.label} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div className="min-w-0">
                      <p className="text-[13px] text-[#5c5c60]">{row.label}</p>
                      <p className="mt-1 flex items-baseline gap-2">
                        <span className="font-mono text-[13px] text-[#8a8a8e]">{row.before}</span>
                        <span className="text-[#8a8a8e]" aria-hidden="true">→</span>
                        <span className="font-[family-name:var(--font-gelica)] text-[22px] font-light text-[#0e0e0f]">{row.after}</span>
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#e2f93b] px-2.5 py-1 font-mono text-[12px] whitespace-nowrap text-[#0b0b0c]">
                      {row.change}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="hidden overflow-x-auto sm:block">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-black/[0.06] text-[11px] tracking-[0.16em] text-[#5c5c60] uppercase">
                      <th className="px-6 py-4 font-medium sm:px-8">&nbsp;</th>
                      <th className="px-4 py-4 font-medium">Before</th>
                      <th className="px-4 py-4 font-medium text-[#0e0e0f]">With Tenscale</th>
                      <th className="px-6 py-4 text-right font-medium sm:px-8">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((row) => (
                      <tr key={row.label} className="border-b border-black/[0.05] last:border-b-0">
                        <th scope="row" className="px-6 py-5 text-[15px] font-normal text-[#2e2e30] sm:px-8">
                          {row.label}
                        </th>
                        <td className="px-4 py-5 font-mono text-[15px] text-[#8a8a8e] tabular-nums">{row.before}</td>
                        <td className="px-4 py-5 font-[family-name:var(--font-gelica)] text-[24px] font-light text-[#0e0e0f] tabular-nums">
                          {row.after}
                        </td>
                        <td className="px-6 py-5 text-right sm:px-8">
                          <span className="rounded-full bg-[#e2f93b] px-2.5 py-1 font-mono text-[12px] whitespace-nowrap text-[#0b0b0c]">
                            {row.change}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
