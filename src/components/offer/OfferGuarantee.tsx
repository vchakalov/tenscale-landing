import { Shout } from "@/components/offer/parts";

/**
 * The risk taken away, in the copywriter's words. The guarantee is Ben's
 * (2026-10-23): not happy after 30 days, a full refund, no questions asked.
 * Change every copy of it together. The team follows it (offer/Team.tsx),
 * where the screenshot wall used to be.
 */
export function OfferGuarantee() {
  return (
    <section className="w-full bg-white px-4 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto flex w-full max-w-[1080px] flex-col items-center gap-8 rounded-[28px] bg-[#e2f93b] px-6 py-12 text-center text-[#0b0b0c] sm:px-14 sm:py-16 lg:flex-row lg:items-start lg:gap-14 lg:text-left">
        <Seal />
        <div className="min-w-0">
          <Shout className="text-[clamp(28px,4.6vw,48px)] leading-[1.04]">
            Protected By Our 30-Day “No-Questions-Asked” 100% Money-Back Guarantee
          </Shout>
          <p className="mt-5 text-[17px] leading-[28px] text-black/75 sm:text-[19px] sm:leading-[30px]">
            Here’s the deal: We don’t believe in trapping you in long-term contracts. When we install Tenscale in your
            business, you get a full 30 days to see the speed, creative volume, and results inside your own accounts.
          </p>
          <p className="mt-4 text-[17px] leading-[28px] text-black/75 sm:text-[19px] sm:leading-[30px]">
            You stay in 100% control through the official Meta API. A human approves every ad, and you can pause anything
            at any time. If you aren’t blown away in your first 30 days, tell us and we’ll refund 100% of your money, no
            questions asked.
          </p>
        </div>
      </div>

    </section>
  );
}

/** A round guarantee seal, its border text set along the circle. */
function Seal() {
  return (
    <svg viewBox="0 0 200 200" className="h-[170px] w-[170px] shrink-0 sm:h-[210px] sm:w-[210px]" role="img" aria-label="30-day money-back guarantee">
      <defs>
        <path id="offer-seal-ring" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
      </defs>
      <circle cx="100" cy="100" r="98" fill="#0b0b0c" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="#e2f93b" strokeWidth="1.5" strokeDasharray="2 5" />
      <text fill="#e2f93b" fontSize="12.5" fontWeight="800" letterSpacing="2.4" style={{ fontFamily: "inherit" }}>
        <textPath href="#offer-seal-ring" textLength="470" lengthAdjust="spacing">
          100% MONEY-BACK GUARANTEE • NO QUESTIONS ASKED •
        </textPath>
      </text>
      <text x="100" y="112" textAnchor="middle" fill="#ffffff" fontSize="60" fontWeight="900" style={{ fontFamily: "inherit", letterSpacing: "-2px" }}>
        30
      </text>
      <text x="100" y="136" textAnchor="middle" fill="#e2f93b" fontSize="14" fontWeight="800" letterSpacing="5" style={{ fontFamily: "inherit" }}>
        DAYS
      </text>
    </svg>
  );
}
