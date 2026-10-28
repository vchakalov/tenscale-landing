import { Clip } from "@/components/home/Clip";
import { Shout, Tick } from "@/components/offer/parts";

/**
 * The engine in three parts, each next to the home page's clip of it running,
 * each said the same way: the problem in a sentence or two, the fix as three
 * short points, and the manual work it replaces as tags. The copywriter's
 * third pass (2026-10-28), cut down by Ben to be quicker to read.
 *
 * The note on personalized funnels says "up to", as the home page's step 3
 * does: the clip's two pages went from 0.9% to 3.8% and from 0.8% to 3.3%.
 */
type Part = {
  name: string;
  tag: string;
  /** A small aside under the tag, for the one number worth pointing out. */
  note?: { text: string; figure: string };
  problem: string;
  fix: string[];
  replaces: string[];
  clip: string;
  alt: string;
};

const PARTS: Part[] = [
  {
    name: "Angles & Ad Creatives",
    tag: "How The Engine Builds Your Ads",
    problem:
      "Meta now picks who sees your ad based on the creative. 3 or 4 ads per client, or 50 copies of one idea, burn out fast and get expensive.",
    fix: [
      "Finds what’s winning on Meta and TikTok right now",
      "Turns your offer into dozens of different buyer angles",
      "Makes images and AI UGC videos for every angle, in any language",
    ],
    replaces: ["Strategy calls", "Briefs", "Designers", "Freelancers", "UGC creators", "Video editors"],
    clip: "tour-creatives",
    alt: "Generating creatives: the engine reads the best hooks and winning ads, then six new creatives land in the library",
  },
  {
    name: "Personalized Funnels",
    tag: "How The Engine Converts The Clicks",
    note: { text: "Btw, this alone boosts conversions by", figure: "up to 300%" },
    problem:
      "Different ads, same landing page. The page doesn’t say what the ad promised, so clicks you already paid for leave.",
    fix: [
      "Every ad gets its own landing page",
      "Each page repeats the exact promise of its ad",
      "One line of code. Your layout, facts and prices stay the same",
    ],
    replaces: ["One page for everyone", "Page variants built by hand"],
    clip: "tour-pages",
    alt: "Two ads for two angles go through a router to the same landing page, rewritten for each angle, and the conversion rate climbs over 300%",
  },
  {
    name: "Rule-Based Automation",
    tag: "How The Engine Runs The Account 24/7",
    problem:
      "Someone has to sit in Ads Manager every day. Bad ads usually get caught after the budget is already gone.",
    fix: [
      "Set your rules once, like a target CPA",
      "Losers paused, tired ads replaced, winners scaled, 24/7",
      "Runs through the official Meta API. You approve every ad",
    ],
    replaces: ["Daily Ads Manager checks", "Manual budget changes"],
    clip: "tour-rules",
    alt: "Building a rule that replaces creatives when ROAS drops below 1.5",
  },
];

export function Core() {
  return (
    <section className="w-full bg-white px-4 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto flex max-w-[960px] flex-col items-center text-center">
        <Shout className="text-[clamp(32px,5.6vw,60px)] leading-[1.02] text-[#0b0b0c]">
          Here&apos;s How The Tenscale AI Engine Replaces <span className="text-[#6a2cff]">Weeks Of Manual Agency Work:</span>
        </Shout>
      </div>

      <ol className="mx-auto mt-16 flex w-full max-w-[1320px] flex-col gap-20 sm:mt-24 sm:gap-32">
        {PARTS.map((part, i) => (
          <li key={part.name}>
            {/* The clip takes the wider column, on whichever side it sits. */}
            <div
              className={`grid items-center gap-8 lg:gap-14 ${
                i % 2 === 1 ? "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]"
              }`}
            >
              <div className={`flex min-w-0 flex-col ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-[#0b0b0c] text-[22px] font-black text-[#e2f93b] sm:h-16 sm:w-16 sm:text-[26px]">
                    {i + 1}
                  </span>
                  <h3 className="mt-6 text-[30px] leading-[1.02] font-black tracking-[-0.025em] text-[#0b0b0c] sm:text-[42px]">{part.name}</h3>
                  <p className="mt-2 text-[17px] leading-[24px] font-bold text-[#6a2cff] sm:text-[19px] sm:leading-[27px]">({part.tag})</p>
                  {part.note && (
                    <p className="mt-5 inline-flex max-w-full -rotate-1 items-baseline gap-x-1.5 rounded-full bg-[#e2f93b] px-4 py-2 text-[15px] leading-[21px] font-semibold text-[#0b0b0c] sm:text-[16px]">
                      <span>
                        {part.note.text} <span className="font-black whitespace-nowrap text-[#6a2cff]">{part.note.figure}</span>
                      </span>
                    </p>
                  )}
                </div>

                <div className="mt-7 flex flex-col gap-6 text-left">
                  <div>
                    <p className="text-[12px] font-black tracking-[0.14em] text-[#8a8a90] uppercase sm:text-[13px]">The Problem</p>
                    <p className="mt-1.5 text-[17px] leading-[27px] text-[#3a3a3d] sm:text-[18px] sm:leading-[29px]">{part.problem}</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-black tracking-[0.14em] text-[#6a2cff] uppercase sm:text-[13px]">How We Fix It</p>
                    <ul className="mt-2.5 flex flex-col gap-2.5">
                      {part.fix.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-[17px] leading-[25px] font-semibold text-[#0b0b0c] sm:text-[18px] sm:leading-[27px]">
                          <Tick className="mt-0.5 h-6 w-6 bg-[#e2f93b] text-[#0b0b0c]" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[12px] font-black tracking-[0.14em] text-[#0b0b0c] uppercase sm:text-[13px]">Replaces</p>
                    <ul className="mt-2.5 flex flex-wrap gap-2">
                      {part.replaces.map((item) => (
                        <li
                          key={item}
                          className="rounded-full bg-[#f3f3ef] px-3.5 py-1.5 text-[14px] font-semibold text-[#6a6a70] line-through decoration-[#6a2cff]/70 decoration-2 ring-1 ring-black/[0.06] sm:text-[15px]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="rounded-[24px] bg-black/[0.04] p-1.5 ring-1 ring-black/[0.07] sm:p-2">
                <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_30px_60px_-36px_rgba(14,14,15,0.45)] ring-1 ring-black/[0.06]">
                  <Clip
                    src={`/videos/${part.clip}.mp4`}
                    poster={`/videos/${part.clip}.webp`}
                    label={part.alt}
                    className="block aspect-[1280/716] h-auto w-full bg-white"
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
