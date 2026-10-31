import { Clip } from "@/components/home/Clip";
import { Shout, Tick } from "@/components/offer/parts";

/**
 * The engine in three parts, each next to the home page's clip of it running,
 * each said the same way: a name with a line in brackets, the problem with
 * its conclusion underlined, and the fix as three short points. Ben's words
 * (2026-10-30) on the copywriter's third pass (2026-10-28).
 *
 * The note on personalized funnels says "up to", as the home page's step 3
 * does: the clip's two pages went from 0.9% to 3.8% and from 0.8% to 3.3%.
 */
type Part = {
  name: string;
  tag: string;
  /** A small aside under the tag, for the one number worth pointing out. */
  note?: { text: string; figure: string };
  problem: React.ReactNode;
  fix: string[];
  clip: string;
  alt: string;
};

const PARTS: Part[] = [
  {
    name: "Angles & Ads",
    tag: "Not Just Pretty Ads… Converting Ads, In Unlimited Amounts",
    problem: (
      <>
        Meta&apos;s Andromeda runs on creatives, and they <strong className="font-bold text-[#0b0b0c]">burn out FAST</strong>{" "}
        (you practically need new ones every day). But new ads aren&apos;t enough…{" "}
        <strong className="font-bold text-[#0b0b0c] underline decoration-[#0b0b0c] decoration-2 underline-offset-4">
          you need new angles
        </strong>
        , because 50 versions of one idea look like a single ad to Meta.
      </>
    ),
    fix: [
      "Finds what’s winning on Meta and TikTok right now",
      "Turns your offer into dozens of different buyer angles",
      "Makes AI images & videos (UGC, B‑roll, talking heads and 11 more) for every angle",
    ],
    clip: "tour-creatives",
    alt: "Generating creatives: the engine reads the best hooks and winning ads, then six new creatives land in the library",
  },
  {
    name: "Personalized Funnels",
    tag: "Angle → Ad → Landing Page… One Message, All The Way Through",
    note: { text: "BTW, this ALONE =", figure: "up to 300% more conversions" },
    problem: (
      <>
        Meta is going hyper-personal, so every buyer expects a journey built for them. You KNOW each angle (and awareness
        level) needs its own landing page… but building them all by hand was impossible.{" "}
        <strong className="font-bold text-[#0b0b0c] underline decoration-[#0b0b0c] decoration-2 underline-offset-4">
          Until now.
        </strong>
      </>
    ),
    fix: [
      "Every ad gets its own landing page",
      "Each page repeats the exact promise of its ad",
      "Full CRO from one line of code: AI changes elements, split tests them and keeps what converts",
    ],
    clip: "tour-pages",
    alt: "Two ads for two angles go through a router to the same landing page, rewritten for each angle, and the conversion rate climbs over 300%",
  },
  {
    name: "Rule-Based Automation",
    tag: "We Monitor & Operate Your Ads 24/7",
    problem: (
      <>
        You have to monitor, scale, duplicate, manage budgets and launch new ads EVERY day…{" "}
        <strong className="font-bold text-[#0b0b0c] underline decoration-[#0b0b0c] decoration-2 underline-offset-4">
          doing all that by hand is <em>unreasonable</em>.
        </strong>
      </>
    ),
    fix: [
      "Set rules on ANY metric (CTR, CPA, ROAS and 60 more)",
      "Stops bad ads, replaces tired ones, scales budgets, duplicates winners and more",
      // Not "Meta-Partner approved" until that status is confirmed: the page must not suggest a partnership with Meta.
      "Runs through Meta’s official API (as safe as it gets)",
    ],
    clip: "tour-rules",
    alt: "Building a rule that replaces creatives when ROAS drops below 1.5",
  },
];

export function Core() {
  return (
    <section className="w-full bg-white px-4 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto flex max-w-[960px] flex-col items-center text-center">
        <Shout className="text-[clamp(32px,5.6vw,60px)] leading-[1.02] text-[#0b0b0c]">
          Here&apos;s How The Tenscale AI Engine Does{" "}
          <span className="text-[#6a2cff]">The Work Of An Entire Marketing Team:</span>
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
                  {/* A tag with an ellipsis breaks after it, so the line turns where the sentence does. */}
                  <p className="mt-2 text-[17px] leading-[24px] font-bold text-balance text-[#6a2cff] sm:text-[19px] sm:leading-[27px]">
                    ({part.tag.split("… ").map((line, n) => (n === 0 ? line : <span key={n}>…<br />{line}</span>))})
                  </p>
                  {part.note && (
                    // Black with a lime figure: a lime fill is kept for the buttons (Ben, 2026-10-30).
                    <p className="mt-5 inline-flex max-w-full items-baseline gap-x-1.5 rounded-2xl bg-[#0b0b0c] px-4 py-2 text-[15px] leading-[21px] font-semibold text-white sm:rounded-full sm:text-[16px]">
                      <span>
                        {part.note.text} <span className="font-black whitespace-nowrap text-[#e2f93b]">{part.note.figure}</span>
                      </span>
                    </p>
                  )}
                </div>

                <div className="mt-7 flex flex-col gap-6 text-left">
                  <div>
                    <p className="text-[12px] font-black tracking-[0.14em] text-[#8a8a90] uppercase sm:text-[13px]">The Problem</p>
                    <p className="mt-1.5 text-[17px] leading-[27px] text-pretty text-[#3a3a3d] sm:text-[18px] sm:leading-[29px]">{part.problem}</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-black tracking-[0.14em] text-[#0b0b0c] uppercase sm:text-[13px]">How We Fix It</p>
                    <ul className="mt-2.5 flex flex-col gap-2.5">
                      {part.fix.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-[17px] leading-[25px] font-semibold text-pretty text-[#0b0b0c] sm:text-[18px] sm:leading-[27px]">
                          <Tick className="mt-0.5 h-6 w-6 bg-[#6a2cff] text-white" />
                          {point}
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
