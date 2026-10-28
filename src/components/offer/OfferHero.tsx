import Link from "next/link";
import { ProofButton } from "@/components/home/Proof";
import { Bundle } from "@/components/offer/Bundle";
import { OfferButton } from "@/components/offer/OfferButton";
import { SeeProof, Tick } from "@/components/offer/parts";

/**
 * What Tenscale is, the product, the ask, then the proof and the guarantee.
 * The words are the copywriter's (2026-10-28) under Ben's headline and
 * attention line.
 *
 * Two figures were corrected against their screenshots: 9:00 to 13:40 is
 * under five hours, not four, and the cost per lead compares the month
 * before the install with the month after it. Change these together with
 * the home page's.
 */
const FACTS: { lead: string; rest: string; proof?: string }[] = [
  { lead: "$3M+", rest: "in monthly Meta ad spend managed by the Engine" },
  {
    lead: "−43% Lower Cost-Per-Lead",
    rest: "across our 5 newest accounts (dropping between −32% and −60% in the first month)",
    proof: "/proof/cpl-compare.webp",
  },
  {
    lead: "112 Live Ads In Under 5 Hours:",
    rest: "Signed at 9:00 AM → 112 ads live across 6 angles by 1:40 PM",
    proof: "/proof/onboarded-before-lunch.webp",
  },
  {
    lead: "Protected By Our 30-Day, 100% Money-Back Guarantee",
    rest: "(No long-term contracts. You approve every ad.)",
  },
];

export function OfferHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0b0b0c] text-white">
      {/* The attention line across the top, as on every page of this kind. */}
      <p className="flex items-center justify-center gap-2 bg-[#e2f93b] px-4 py-2 text-center text-[11px] leading-[16px] font-bold tracking-[0.12em] text-[#0b0b0c] uppercase sm:text-[13px]">
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#6a2cff] opacity-60" />
          <span className="relative h-2 w-2 rounded-full bg-[#6a2cff]" />
        </span>
        Attention: US marketing agencies &amp; brands running Meta ads
      </p>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(106,44,255,0.28),transparent_70%)]"
      />

      <div className="relative mx-auto flex w-full max-w-[1180px] flex-col items-center px-4 pt-8 pb-16 text-center sm:px-8 sm:pt-10 sm:pb-24">
        <Link href="/" className="text-[22px] font-bold tracking-tight text-white">
          Tenscale
        </Link>

        <h1 className="mt-8 max-w-[1100px] text-[clamp(38px,9.4vw,96px)] leading-[0.94] font-black tracking-[-0.03em] text-balance uppercase sm:mt-12">
          We Automate Your Meta Ads With <span className="text-[#e2f93b]">Our AI Engine</span>
        </h1>

        <p className="mt-6 max-w-[820px] text-[17px] leading-[27px] text-white/75 sm:mt-8 sm:text-[21px] sm:leading-[33px]">
          Meta&apos;s new algorithm demands hundreds of fresh creatives, and doing it by hand is killing your margins.
          We install an end-to-end AI Engine inside your accounts that researches winning angles, produces
          high-converting ads, matches every click to a personalized landing page, and manages budgets 24/7.
        </p>

        <div className="mt-12 w-full sm:mt-16">
          <Bundle />
        </div>

        <OfferButton source="offer_hero" className="mt-12 sm:mt-14" />
        <p className="mt-5 max-w-[600px] text-[15px] leading-[23px] text-white/60 sm:text-[16px]">
          On this quick call, we&apos;ll map out your onboarding, find where your team loses hours, and show you what to
          automate first.
        </p>

        <div className="mt-12 w-full max-w-[860px] rounded-[24px] bg-white/[0.04] p-6 text-left ring-1 ring-white/10 sm:mt-16 sm:p-9">
          <p className="text-center text-[18px] leading-[26px] font-black tracking-[-0.01em] sm:text-[24px] sm:leading-[32px]">
            Backed By Real Data Across <span className="text-[#e2f93b]">300+ Client Accounts:</span>
          </p>
          <ul className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
            {FACTS.map((fact) => (
              <li key={fact.lead} className="flex gap-3.5 sm:gap-4">
                <Tick className="mt-0.5 h-7 w-7 bg-[#e2f93b] text-[#0b0b0c] sm:h-8 sm:w-8" />
                <p className="min-w-0 text-[16px] leading-[25px] text-white/75 sm:text-[18px] sm:leading-[28px]">
                  <span className="font-bold text-white">{fact.lead}</span> {fact.rest}
                  {fact.proof && (
                    <>
                      {" "}
                      <ProofButton
                        src={fact.proof}
                        className="-my-2.5 inline-block cursor-zoom-in py-2.5 text-[14px] font-semibold whitespace-nowrap text-[#e2f93b] underline decoration-[#e2f93b]/40 underline-offset-4 hover:opacity-75"
                      >
                        <SeeProof />
                      </ProofButton>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
