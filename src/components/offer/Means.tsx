import { OfferButton } from "@/components/offer/OfferButton";
import { Shout, Tick } from "@/components/offer/parts";
import { ProofCase, type ProofStep } from "@/components/offer/ProofCase";

/**
 * What the engine adds up to, in Ben's four benefits (2026-10-30): a title,
 * "Because…" with the reason, and a link to the screenshots behind it.
 *
 * Every number is on a proof screenshot. The 43% is the mean of the five
 * newest accounts (−40%, −45%, −38%, −60%, −32%; the same five as the home
 * page's proof band), and their totals are 1,230 leads on $39.2k before and
 * 2,301 on $41.8k after. "Dozens" of projects per person and "a couple"
 * before are Ben's figures; no screenshot shows them yet, so the proof for
 * that card is the agency that doubled its clients with the same team.
 */
function N({ children }: { children: React.ReactNode }) {
  return <strong className="font-black text-[#0b0b0c]">{children}</strong>;
}

const BENEFITS: {
  id: string;
  title: string;
  /** Short lines, each its own paragraph, the proof link at the end of the last. */
  lines: React.ReactNode[];
  proof: { steps: ProofStep[]; lesson: React.ReactNode };
}[] = [
  {
    id: "more-money",
    title: "Make More Money",
    lines: [
      <>
        Because… our AI builds <em>hyper‑personal</em> funnels (unlimited angles, each with its own ads and landing
        page).
      </>,
      <>
        On average, that&apos;s <N>43% lower cost per result.</N>
      </>,
      <>
        Same ad spend… <em>more money.</em>
      </>,
    ],
    proof: {
      steps: [
        {
          text: (
            <>
              Our 5 newest accounts, one month before the install against one month after: 1,230 leads on $39.2k, then
              2,301 leads on $41.8k. Cost per result fell in every one of them (−40%, −45%, −38%, −60% and −32%), 43% on
              average.
            </>
          ),
          shots: ["/proof/cpl-compare.webp", "/proof/multiple-clients.webp"],
        },
      ],
      lesson: "nearly twice the results for 7% more spend.",
    },
  },
  {
    id: "without-people",
    title: "Grow Without People",
    lines: [
      <>
        Because… one operator can run <N><span className="whitespace-nowrap">DOZENS of projects.</span></N>
      </>,
      <>They just load the offers… the Engine builds and manages every angle and page.</>,
      <>
        <em>(Before, it was a couple of projects, tops.)</em>
      </>,
    ],
    proof: {
      steps: [
        {
          text: (
            <>
              One agency&apos;s first 90 days on Tenscale. Before: 4 people, 12 clients, 190 live ads and 9 hours per
              account every week. After: the same 4 people, 24 clients, 1,900 live ads and 3.6 hours per account.
            </>
          ),
          shots: ["/proof/ops-before-after.webp"],
        },
      ],
      lesson: "60% less work per account, so the same team took on twice the clients (zero new hires).",
    },
  },
  {
    id: "more-clients",
    title: "Get More Clients",
    lines: [
      <>
        Because… selling marketing services makes you a <em>commodity</em>{" "}
        (it&apos;s hard to stand out).
      </>,
      <>
        With the Engine, you offer <N>unlimited creatives, unlimited landing pages</N> and real business insight…
      </>,
      <>
        …at a <em>better price</em>, because it&apos;s automated.
      </>,
    ],
    proof: {
      steps: [
        {
          text: (
            <>
              A client signed at 9:00 AM. By 1:40 PM they had 112 live ads across 6 angles and 18 audiences, every ad
              with its own landing page. Nobody built a single ad by hand.
            </>
          ),
          shots: ["/proof/onboarded-before-lunch.webp"],
        },
      ],
      lesson: "show a prospect that, and you're not just another agency anymore.",
    },
  },
  {
    id: "best-avatar",
    title: "Uncover Hidden Secrets",
    lines: [
      <>
        Because… the Engine tests angles you&apos;ve <N>NEVER</N> thought of, and tracks which angle (avatar) makes you{" "}
        <N><span className="whitespace-nowrap">the most money.</span></N>
      </>,
      <>
        Then you <em>transform your business</em> around them.
      </>,
    ],
    proof: {
      steps: [
        {
          heading: "Same product, 8× apart",
          text: (
            <>
              The “storm nights” angle sold at £1.46 a sale. The “first dog” angle cost £11.85 a sale. The Engine scaled
              the top three overnight.
            </>
          ),
          shots: ["/proof/ads-manager.webp"],
        },
        {
          heading: "The CTR that found the message",
          text: (
            <>
              In June the parents angle hit 7.64% CTR at $10.26 a lead, while the broad “one ad for everyone” got 3.02%
              at $22.25. So in July the broad ad went, and a new angle (newly diagnosed) took its place: 7.08% CTR in its
              first month. Over 3 months, CTR climbed from 5.06% to 6.65% and cost per result fell from $13.68 to
              $11.22.
            </>
          ),
          shots: ["/proof/ctr-three-months.webp"],
        },
      ],
      lesson: "once you know which avatar pays the most, you know who to build the next offer, ad and page for. That's where the gold is.",
    },
  },
];

export function Means() {
  return (
    <section className="w-full bg-[#f3f3ef] px-4 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto flex max-w-[960px] flex-col items-center text-center">
        <Shout className="text-[clamp(34px,7vw,72px)] leading-[0.98] text-[#0b0b0c] uppercase">
          What This Means <span className="text-[#6a2cff]">For You</span>
        </Shout>
      </div>

      <ul className="mx-auto mt-14 grid w-full max-w-[1080px] gap-3 sm:mt-20 sm:grid-cols-2 sm:gap-4">
        {BENEFITS.map((benefit) => (
          <li key={benefit.id} className="min-w-0">
            <div className="h-full">
              <div className="flex h-full gap-5 rounded-[24px] bg-white p-7 shadow-[0_24px_50px_-40px_rgba(14,14,15,0.4)] ring-1 ring-black/[0.06] sm:p-9">
                <Tick className="h-11 w-11 bg-[#6a2cff] text-white sm:h-12 sm:w-12" />
                <div className="min-w-0">
                  <h3 className="text-[24px] leading-[1.05] font-black tracking-[-0.02em] text-balance text-[#0b0b0c] uppercase sm:text-[28px]">
                    {benefit.title}
                  </h3>
                  <div className="mt-3 flex flex-col gap-2.5 text-[16px] leading-[26px] text-pretty text-[#4a4a4e] sm:text-[17px] sm:leading-[28px]">
                    {benefit.lines.map((line, n) => (
                      <p key={n}>
                        {line}
                        {n === benefit.lines.length - 1 && (
                          <>
                            {" "}
                            <ProofCase id={benefit.id} title={benefit.title} steps={benefit.proof.steps} lesson={benefit.proof.lesson} />
                          </>
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-14 flex flex-col items-center text-center sm:mt-20">
        <OfferButton source="offer_means" />
        <p className="mt-5 max-w-[560px] text-[15px] leading-[23px] text-balance text-[#4a4a4e] sm:text-[16px]">
          Find out how many hours per week we can save your team in the next 30 days.
        </p>
      </div>
    </section>
  );
}
