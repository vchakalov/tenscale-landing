import { OfferButton } from "@/components/offer/OfferButton";
import { Shout, Tick } from "@/components/offer/parts";

/**
 * What the engine adds up to for an agency, one number per card, in the
 * copywriter's second pass (2026-10-28). The numbers are set heavy so a
 * phone reader gets the block from them alone.
 *
 * Every number is on the proof wall: 112 ads in under five hours
 * (/proof/onboarded-before-lunch.webp), cost per lead down 32% to 60% across
 * the five newest accounts, and one agency's first 90 days
 * (/proof/ops-before-after.webp), and the record $41k week with flat CPA
 * (/proof/record-spend.webp). Cards 3, 4 and 5 are that same agency, so
 * cards 4 and 5 say so rather than promising its figures to everyone.
 */
function N({ children }: { children: React.ReactNode }) {
  return <strong className="font-black text-[#0b0b0c]">{children}</strong>;
}

const OUTCOMES: { title: string; body: React.ReactNode }[] = [
  {
    title: "A Better Offer To Sell",
    body: (
      <>
        Pitch <N>hundreds of custom ads</N> and <N>personalized landing pages</N> instead of “4 creatives a month.” Go
        from signed contract to <N>112 live ads in under 5 hours</N>.
      </>
    ),
  },
  {
    title: "Clients Who Stay Longer",
    body: (
      <>
        Clients churn when ad fatigue hits and CPAs climb. The Engine swaps fatigued ads automatically and matches every
        click to its own page. Our 5 newest accounts cut cost per lead by <N>32% to 60%</N>.
      </>
    ),
  },
  {
    title: "Scale Without Hiring",
    body: (
      <>
        Add clients without adding media buyers or designers. One agency went from <N>12 to 24 clients in 90 days</N>{" "}
        with the exact same <N><span className="whitespace-nowrap">4-person</span> team</N>.
      </>
    ),
  },
  {
    title: "10x Live Ad Capacity",
    body: (
      <>
        The Engine does the heavy lifting while your team steers the strategy. The same agency scaled from{" "}
        <N>190 to 1,900 live ads</N> and cut weekly work from <N>9 hours to 3.6 hours</N> per account.
      </>
    ),
  },
  {
    title: "Same-Day Client Onboarding",
    body: (
      <>
        Stop losing momentum in strategy calls, client briefs and designer revisions. The same agency cut onboarding
        from <N>2 weeks to the same day</N>.
      </>
    ),
  },
  {
    title: "Scale Spend Without Breaking CPA",
    body: (
      <>
        Rules pause the losers and push budget into the winners around the clock. One client hit a record{" "}
        <N>$41k week (outside Q4) with CPA flat</N>.
      </>
    ),
  },
];

export function Means() {
  return (
    <section className="w-full bg-[#f3f3ef] px-4 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto flex max-w-[960px] flex-col items-center text-center">
        <Shout className="text-[clamp(34px,7vw,72px)] leading-[0.98] text-[#0b0b0c] uppercase">
          What This Means <span className="text-[#6a2cff]">For You</span>
        </Shout>
        <p className="mt-5 max-w-[640px] text-[18px] leading-[28px] font-semibold text-[#2e2e30] sm:text-[21px] sm:leading-[31px]">
          Break the agency trap where every new client requires a new employee:
        </p>
      </div>

      <ul className="mx-auto mt-14 grid w-full max-w-[1080px] gap-3 sm:mt-20 sm:grid-cols-2 sm:gap-4">
        {OUTCOMES.map((outcome) => (
          <li key={outcome.title} className="min-w-0">
            <div className="h-full">
              <div className="flex h-full gap-5 rounded-[24px] bg-white p-7 shadow-[0_24px_50px_-40px_rgba(14,14,15,0.4)] ring-1 ring-black/[0.06] sm:p-9">
                <Tick className="h-11 w-11 bg-[#e2f93b] text-[#0b0b0c] sm:h-12 sm:w-12" />
                <div className="min-w-0">
                  <h3 className="text-[24px] leading-[1.05] font-black tracking-[-0.02em] text-[#0b0b0c] uppercase sm:text-[28px]">
                    {outcome.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[26px] text-[#4a4a4e] sm:text-[17px] sm:leading-[28px]">{outcome.body}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-14 flex flex-col items-center text-center sm:mt-20">
        <OfferButton source="offer_means" />
        <p className="mt-5 max-w-[560px] text-[15px] leading-[23px] text-[#4a4a4e] sm:text-[16px]">
          Find out how many hours per week we can save your team in the next 30 days.
        </p>
      </div>
    </section>
  );
}
