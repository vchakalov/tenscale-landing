import { ProofButton } from "@/components/home/Proof";
import { Reveal } from "@/components/home/Reveal";

/**
 * Name the mechanism, then put numbers on it.
 *
 * Hyros owns a word ("Swarm Tracking") and defines it like a dictionary
 * entry, so the reader has a name for what is different before reading how
 * it works. Ours is the personalized funnel: an ad and its own landing page
 * for every buyer, built and run automatically, which no team can do by hand.
 */
export function Mechanism() {
  return (
    <section className="w-full px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <Reveal className="min-w-0">
          <p className="font-[family-name:var(--font-gelica)] text-[38px] leading-[1.05] font-light text-[#0e0e0f] sm:text-[56px]">
            Personalized Funnels <span className="text-[#8a8a8e]">:</span>
          </p>
          <p className="mt-3 font-mono text-[13px] tracking-wide text-[#8a8a8e] italic">noun · the future of paid ads</p>
          <p className="mt-6 max-w-[600px] text-[18px] leading-[30px] text-[#2e2e30] sm:text-[20px] sm:leading-[33px]">
            A different ad for every buyer.{" "}
            <strong className="font-semibold text-[#0e0e0f]">A different landing page for every ad.</strong> Built,
            launched and optimized automatically, while your competitors still send everyone to the same page.
          </p>
          <p className="mt-5 max-w-[600px] text-[18px] leading-[30px] text-[#2e2e30] sm:text-[20px] sm:leading-[33px]">
            No team can build this by hand. Hundreds of ads, hundreds of pages, every one matched, every day.{" "}
            <span className="home-mark font-semibold">Tenscale does it on autopilot.</span>
          </p>
        </Reveal>

        <Reveal delay={120} className="min-w-0">
          <div className="rounded-[2rem] bg-black/[0.03] p-1.5 ring-1 ring-black/[0.06]">
            <div className="divide-y divide-black/[0.06] rounded-[calc(2rem-0.375rem)] bg-white shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_24px_60px_-40px_rgba(14,14,15,0.35)]">
              <Stat
                value="−32% to −60%"
                label="cost per lead, across our five most recent client accounts"
                proof="/proof/multiple-clients.webp"
              />
              <Stat value="10×" label="more ads live, with the same four-person team" proof="/proof/ops-before-after.webp" />
              <div className="grid grid-cols-2 divide-x divide-black/[0.06]">
                <div className="p-6 sm:p-8">
                  <p className="font-[family-name:var(--font-gelica)] text-[40px] leading-none font-light text-[#0e0e0f] sm:text-[52px]">300+</p>
                  <p className="mt-3 text-[15px] leading-[22px] text-[#0e0e0f]">client accounts running on Tenscale</p>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="font-[family-name:var(--font-gelica)] text-[40px] leading-none font-light text-[#0e0e0f] sm:text-[52px]">$3M+</p>
                  <p className="mt-3 text-[15px] leading-[22px] text-[#0e0e0f]">in Meta ad spend through it every month</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ value, label, proof }: { value: string; label: string; proof: string }) {
  return (
    <div className="flex flex-col gap-3 p-6 sm:p-8">
      <p className="font-[family-name:var(--font-gelica)] text-[44px] leading-none font-light whitespace-nowrap text-[#0b0b0c] sm:text-[52px]">
        <span className="home-mark">{value}</span>
      </p>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[16px] leading-[24px] text-[#0e0e0f]">{label}</p>
        <ProofButton src={proof} />
      </div>
    </div>
  );
}
