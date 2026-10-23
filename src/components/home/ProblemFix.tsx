import { ProofButton } from "@/components/home/Proof";
import { Reveal } from "@/components/home/Reveal";

/**
 * The problem and the fix, Hyros' way: short sentences, a blunt "the result"
 * line, one wry aside, then the fix in the same rhythm.
 *
 * The chain in the fix card is one real onboarding, the one in Jon's message:
 * 6 angles, 18 audiences, 112 ads, and a page for every ad.
 */

const OLD_WAY = ["1 offer", "3 ads", "1 page", "Everyone"];
const NEW_WAY = ["1 offer", "6 angles", "18 audiences", "112 ads", "112 pages"];

export function ProblemFix() {
  return (
    <section className="w-full px-4 pb-24 sm:px-8 sm:pb-36">
      <div className="mx-auto grid w-full max-w-[1240px] gap-3 sm:gap-4 lg:grid-cols-2">
        <Reveal className="min-w-0">
          <div className="h-full rounded-[2rem] bg-black/[0.03] p-1.5 ring-1 ring-black/[0.06]">
            <div className="flex h-full flex-col rounded-[calc(2rem-0.375rem)] bg-[#f2f2f0] p-7 sm:p-10">
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#6b6b70] uppercase">The problem</p>
              <h2 className="mt-5 font-[family-name:var(--font-gelica)] text-[34px] leading-[1.08] font-light text-[#0e0e0f] sm:text-[44px]">
                One page. One message. Everyone.
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-[16px] leading-[26px] text-[#2e2e30] sm:text-[17px] sm:leading-[28px]">
                <p>
                  Meta&apos;s Andromeda decides who sees your ad from the creative itself. Run three or four ads and it
                  shows them to the same people, again and again. Frequency climbs. Costs climb.
                </p>
                <p>Then every click lands on the same page, which has no idea what the ad promised.</p>
                <p className="font-semibold text-[#0e0e0f]">
                  The result: Tired ads. Wasted clicks. A cost per lead that only goes one way.
                </p>
              </div>
              <Chain steps={OLD_WAY} tone="old" />
              <p className="mt-6 text-[15px] text-[#6b6b70] italic">Your one landing page… is trying to talk to everyone.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="min-w-0">
          <div className="h-full rounded-[2rem] bg-white/5 p-1.5 ring-1 ring-black/[0.08]">
            <div className="flex h-full flex-col rounded-[calc(2rem-0.375rem)] bg-[#0e0e0f] p-7 text-[#f4f2ee] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-10">
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#e2f93b] uppercase">The fix</p>
              <h2 className="mt-5 font-[family-name:var(--font-gelica)] text-[34px] leading-[1.08] font-light sm:text-[44px]">
                Every buyer gets their own funnel.
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-[16px] leading-[26px] text-white/75 sm:text-[17px] sm:leading-[28px]">
                <p>
                  Dozens of angles. Ads built on structures that already win. A landing page for every ad that keeps its
                  exact promise. Rules that pause the losers and scale the winners, around the clock.
                </p>
                <p className="font-semibold text-white">
                  You get more leads. Cheaper. Your team stops building ads by hand.
                </p>
              </div>
              <Chain steps={NEW_WAY} tone="new" />
              <div className="mt-6 flex flex-wrap items-center gap-3 text-[15px] text-white/70">
                <span className="italic">“Noise angle scaled overnight. Best CPL on the account!”</span>
                <ProofButton src="/proof/scaled-overnight.webp" tone="dark">
                  See it
                </ProofButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Chain({ steps, tone }: { steps: string[]; tone: "old" | "new" }) {
  return (
    <ol className="mt-8 flex flex-wrap items-center gap-x-1.5 gap-y-2 lg:mt-auto lg:pt-8">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-1.5">
          <span
            className={`rounded-full px-3 py-1.5 font-mono text-[12px] whitespace-nowrap ${
              tone === "old"
                ? "bg-white text-[#3a3a3d] ring-1 ring-black/[0.08]"
                : i === steps.length - 1
                  ? "bg-[#e2f93b] text-[#0b0b0c]"
                  : "bg-white/[0.08] text-white ring-1 ring-white/10"
            }`}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className={tone === "old" ? "text-[#8a8a8e]" : "text-white/40"}>
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
