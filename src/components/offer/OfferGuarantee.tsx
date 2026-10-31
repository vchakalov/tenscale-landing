import { Shout } from "@/components/offer/parts";

/**
 * The risk taken away. The guarantee is Ben's (2026-10-31): if, by any means,
 * a client is not happy and we can't deliver what we promised, a full refund,
 * for the whole time they work with us and written into the contract. It names
 * no period. Change every copy of it together (the hero, the process section
 * and the line under the booking button). Black with lime, not a lime box: a
 * lime fill is kept for the buttons (Ben, 2026-10-30). The team follows it
 * (offer/Team.tsx), where the screenshot wall used to be.
 */
export function OfferGuarantee() {
  return (
    <section className="w-full bg-white px-4 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto flex w-full max-w-[1080px] flex-col items-center gap-8 rounded-[28px] bg-[#0b0b0c] px-6 py-12 text-center text-white sm:px-14 sm:py-16 lg:flex-row lg:items-start lg:gap-14 lg:text-left">
        <Seal />
        <div className="min-w-0">
          <Shout className="text-[clamp(28px,4.6vw,48px)] leading-[1.04]">
            Protected By Our “No‑Brainer” <span className="text-[#e2f93b]">100% Money‑Back Guarantee</span>
          </Shout>
          <p className="mt-5 text-[17px] leading-[28px] text-white/75 sm:text-[19px] sm:leading-[30px]">
            We want to make this a no-brainer for you. So here’s the deal: if, BY ANY MEANS, you’re not happy and we
            can’t deliver what we promised, you get a full 100% refund.
          </p>
        </div>
      </div>

    </section>
  );
}

/** A round guarantee seal, its border text set along the circle. */
function Seal() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-[170px] w-[170px] shrink-0 sm:h-[210px] sm:w-[210px]"
      role="img"
      aria-label="100% money-back guarantee, written into your contract"
    >
      <defs>
        <path id="offer-seal-ring" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
      </defs>
      <circle cx="100" cy="100" r="97" fill="#18181a" stroke="#e2f93b" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="#e2f93b" strokeWidth="1.5" strokeDasharray="2 5" />
      <text fill="#e2f93b" fontSize="12.5" fontWeight="800" letterSpacing="2.4" style={{ fontFamily: "inherit" }}>
        <textPath href="#offer-seal-ring" textLength="470" lengthAdjust="spacing">
          MONEY-BACK GUARANTEE • WRITTEN INTO YOUR CONTRACT •
        </textPath>
      </text>
      <text x="100" y="108" textAnchor="middle" fill="#ffffff" fontSize="38" fontWeight="900" style={{ fontFamily: "inherit", letterSpacing: "-1.5px" }}>
        100%
      </text>
      <text x="100" y="131" textAnchor="middle" fill="#e2f93b" fontSize="14" fontWeight="800" letterSpacing="5" style={{ fontFamily: "inherit" }}>
        REFUND
      </text>
    </svg>
  );
}
