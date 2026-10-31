import { Bundle } from "@/components/offer/Bundle";
import { OfferButton } from "@/components/offer/OfferButton";
import { Tick } from "@/components/offer/parts";

/**
 * What Tenscale is, the product, the ask, then the proof and the guarantee.
 * The headline, attention line and subhead (2026-10-30) are Ben's; the rest
 * is the copywriter's (2026-10-28). The subhead says "up to 300%", as The
 * Core's note does.
 *
 * Why to trust us, in Ben's three points (2026-10-30). The proof of results
 * (112 ads in under five hours, cost per lead down) is in What This Means.
 * The spend and accounts match the market intel bonus, 2016 is Alex's start
 * in Team.tsx and ChatGPT came out in November 2022. Change them together.
 * The guarantee points to the signed contract here, as the guarantee section
 * further down does.
 */
const FACTS: { lead: string; rest: React.ReactNode }[] = [
  {
    lead: "300+ client accounts",
    rest: (
      <>
        spend a combined{" "}
        <em>
          <strong className="font-bold text-white">$3M+</strong> every month
        </em>{" "}
        through our Engine.
      </>
    ),
  },
  {
    lead: "We’ve been building AI since 2016",
    rest: (
      <>
        (6 years before ChatGPT), with 20+ AI systems live in 7- and{" "}
        <span className="whitespace-nowrap">8-figure</span> companies.
      </>
    ),
  },
  {
    lead: "100% money-back guarantee",
    rest: (
      <>
        if you’re not happy, no questions asked (it’s written into the official contract).
      </>
    ),
  },
];

export function OfferHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0b0b0c] text-white">
      {/* The attention line across the top, as on every page of this kind. */}
      <p className="relative z-10 flex items-center justify-center gap-2 bg-[#e2f93b] px-4 py-2 text-center text-[11px] leading-[15px] font-bold tracking-[0.1em] text-[#0b0b0c] uppercase sm:py-2.5 sm:text-[13px] sm:tracking-[0.12em]">
        {/* On the narrowest phones the line wraps and the dot would float beside it, so it shows from sm up. */}
        <span className="relative hidden h-2 w-2 shrink-0 sm:flex" aria-hidden="true">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#6a2cff] opacity-60" />
          <span className="relative h-2 w-2 rounded-full bg-[#6a2cff]" />
        </span>
        Attention: Marketing teams running Meta ads
      </p>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(106,44,255,0.28),transparent_70%)]"
      />

      <div className="relative mx-auto flex w-full max-w-[1180px] flex-col items-center px-4 pt-10 pb-16 text-center sm:px-8 sm:pt-14 sm:pb-24">
        <h1 className="max-w-[1100px] text-[clamp(38px,9.4vw,96px)] leading-[0.94] font-black tracking-[-0.03em] text-balance uppercase">
          We Automate Your Meta Ads With <span className="text-[#e2f93b]">Our AI Engine</span>
        </h1>

        {/* Short paragraphs, asides in brackets and an ellipsis carrying one line into the next: Halbert's eye relief. */}
        <div className="mt-6 flex max-w-[820px] flex-col gap-3 text-[17px] leading-[27px] text-balance text-white/75 sm:mt-8 sm:gap-4 sm:text-[21px] sm:leading-[33px]">
          <p>Meta ads are getting more expensive (and more unpredictable).</p>
          <p>
            They want MORE creatives… more angles… and more <em>effort</em> than your team can give.
          </p>
          <p>So we install a full AI Engine that finds the winning angles and makes ads (that actually convert)…</p>
          <p>
            …then lifts conversions by <span className="font-bold whitespace-nowrap text-[#e2f93b]">up to 300%</span>{" "}
            with <span className="font-bold text-[#e2f93b]">PERSONALIZED</span> landing pages for each ad.
          </p>
        </div>

        <div className="mt-12 w-full sm:mt-16">
          <Bundle />
        </div>

        <OfferButton source="offer_hero" className="mt-12 sm:mt-14" />
        <p className="mt-5 max-w-[600px] text-[15px] leading-[23px] text-white/60 sm:text-[16px]">
          On this quick call, we&apos;ll show you where AI fits in your marketing
          <span className="block">(and where it doesn&apos;t).</span>
        </p>

        <div className="mt-12 w-full max-w-[860px] rounded-[24px] bg-white/[0.04] p-6 text-left ring-1 ring-white/10 sm:mt-16 sm:p-9">
          <p className="text-center text-[18px] leading-[26px] font-black tracking-[-0.01em] sm:text-[24px] sm:leading-[32px]">
            You Can <span className="text-[#6a2cff]">TRUST US</span> Because:
          </p>
          <ul className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
            {FACTS.map((fact) => (
              <li key={fact.lead} className="flex gap-3.5 sm:gap-4">
                <Tick className="mt-0.5 h-7 w-7 bg-[#6a2cff] text-white sm:h-8 sm:w-8" />
                <p className="min-w-0 text-[16px] leading-[25px] text-pretty text-white/75 sm:text-[18px] sm:leading-[28px]">
                  <span className="font-bold text-white">{fact.lead}</span> {fact.rest}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
