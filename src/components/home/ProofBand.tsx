import { BookCallButton } from "@/components/home/BookButton";
import { ProofButton } from "@/components/home/Proof";
import { Reveal } from "@/components/home/Reveal";

/**
 * The numbers, each with the screenshot it was read from.
 *
 * This replaces a row of round claims (3×, 50+, 100s) that had nothing behind
 * them. Every figure here is on a screenshot in the proof wall; the cost per
 * lead card lists all five accounts so the 43% can be checked by hand.
 *
 * Dark, because it is the one section that is evidence rather than argument,
 * and because the page needed one hard change of contrast below the fold.
 */

const ACCOUNTS = [
  { before: "$24.48", after: "$14.69", change: "−40%", proof: "/proof/cpl-compare.webp" },
  { before: "$39.20", after: "$21.46", change: "−45%", proof: "/proof/client-a.webp" },
  { before: "$61.46", after: "$38.12", change: "−38%", proof: "/proof/client-b.webp" },
  { before: "$17.86", after: "$7.13", change: "−60%", proof: "/proof/client-c.webp" },
  { before: "$30.00", after: "$20.30", change: "−32%", proof: "/proof/client-d.webp" },
];

const STATS = [
  {
    value: "6.65%",
    label: "average click-through rate across an account in August",
    note: "Best campaign 8.47%, a video hook.",
    proof: "/proof/ctr-three-months.webp",
  },
  {
    value: "2×",
    label: "the clients, with the same four-person team",
    note: "12 → 24 clients in the first 90 days.",
    proof: "/proof/ops-before-after.webp",
  },
  {
    value: "112",
    label: "ads live the day a client signed",
    note: "Signed at 9:00, live at 13:40.",
    proof: "/proof/onboarded-before-lunch.webp",
  },
  {
    value: "+74%",
    label: "total sales month over month, from ads only",
    note: "140 ads across 7 angles, none built by hand.",
    proof: "/proof/month-one-report.webp",
  },
];

export function ProofBand() {
  return (
    <section id="results" className="w-full scroll-mt-24 px-2 sm:px-4">
      <div className="mx-auto w-full max-w-[1400px] rounded-[2rem] bg-[#0e0e0f] px-4 py-20 text-[#f4f2ee] sm:rounded-[2.5rem] sm:px-10 sm:py-28 lg:px-14">
        <Reveal className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <span className="rounded-full bg-white/[0.06] px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-white/70 uppercase ring-1 ring-white/10 sm:text-[11px]">
            The proof
          </span>
          <h2 className="mt-6 font-[family-name:var(--font-gelica)] text-[38px] leading-[1.05] font-light text-balance sm:text-[60px]">
            Skeptical? Good. Here Are The Screenshots.
          </h2>
          <p className="mt-5 max-w-[600px] text-[16px] leading-[26px] text-white/65 sm:text-[17px]">
            300+ client accounts and $3M+ in Meta ad spend a month run on Tenscale. These are the most recent, straight out of Ads Manager and Slack.
            Every number opens the screenshot it comes from.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-12">
          {/* The headline number, worked out in full. */}
          <Reveal className="h-full min-w-0 lg:col-span-6 lg:row-span-2">
            <Card className="h-full">
              <div className="flex h-full flex-col">
                <p className="font-[family-name:var(--font-gelica)] text-[88px] leading-[0.9] font-light tracking-[-0.02em] text-[#e2f93b] sm:text-[120px]">
                  −43%
                </p>
                <p className="mt-4 text-[18px] leading-[26px] text-white sm:text-[20px]">cost per lead, blended across the five most recent accounts</p>
                <p className="mt-2 text-[14px] leading-[22px] text-white/55">
                  One month before the install against one month after: 1,230 leads on $39.2k, then 2,301 leads on
                  $41.8k. Nearly twice the leads for 7% more spend.
                </p>

                <ul className="mt-8 flex flex-col divide-y divide-white/[0.07] border-y border-white/[0.07] lg:mt-auto">
                  {ACCOUNTS.map((a, i) => (
                    <li key={a.proof}>
                      <ProofButton
                        src={a.proof}
                        className="group flex w-full min-w-0 items-center gap-2 py-3 text-left text-[13px] sm:gap-3 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/[0.03] sm:text-[15px]"
                      >
                        <span className="w-[22px] shrink-0 font-mono text-[11px] text-white/40 sm:w-[72px] sm:tracking-wide sm:uppercase">
                          <span className="hidden sm:inline">Account </span>
                          {i + 1}
                        </span>
                        <span className="font-mono text-white/45 tabular-nums line-through decoration-white/25">{a.before}</span>
                        <span className="text-white/35" aria-hidden="true">→</span>
                        <span className="font-mono text-white tabular-nums">{a.after}</span>
                        <span className="ml-auto rounded-full bg-[#e2f93b] px-2 py-0.5 font-mono text-[12px] text-[#0b0b0c] tabular-nums">
                          {a.change}
                        </span>
                        <span className="hidden text-[12px] text-white/40 transition-colors duration-300 group-hover:text-white/80 sm:inline">↗</span>
                      </ProofButton>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Reveal>

          {STATS.map((s, i) => (
            <Reveal key={s.proof} delay={(i % 2) * 90} className="h-full min-w-0 lg:col-span-3">
              <Card className="h-full">
                <div className="flex h-full flex-col">
                  <p className="font-[family-name:var(--font-gelica)] text-[56px] leading-none font-light tracking-[-0.02em] sm:text-[64px]">
                    {s.value}
                  </p>
                  <p className="mt-4 text-[15px] leading-[22px] text-white">{s.label}</p>
                  <p className="mt-1.5 text-[13px] leading-[20px] text-white/50">{s.note}</p>
                  <div className="mt-6 pt-1 lg:mt-auto">
                    <ProofButton src={s.proof} tone="dark" />
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-center gap-4 text-center sm:mt-16">
          <BookCallButton size="lg" tone="light">
            Book a demo
          </BookCallButton>
          <p className="text-[13px] text-white/50">Results vary with the offer, the traffic and the sales process.</p>
        </Reveal>
      </div>
    </section>
  );
}

/** Machined tray around a dark core: the double bezel, on black. */
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[1.75rem] bg-white/[0.035] p-1.5 ring-1 ring-white/[0.08] ${className ?? ""}`}>
      <div className="h-full rounded-[calc(1.75rem-0.375rem)] bg-[#161618] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-8">
        {children}
      </div>
    </div>
  );
}
