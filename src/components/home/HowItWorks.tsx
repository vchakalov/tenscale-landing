import Image from "next/image";
import { ProofButton } from "@/components/home/Proof";
import { Reveal } from "@/components/home/Reveal";

/**
 * The process, in the order the engine runs it, written the way Hyros writes
 * theirs: a step number, a headline of three short beats, what happens, the
 * checks, and a real message straight after, so every promise is followed by
 * someone saying it happened.
 *
 * The numbering is real: angles feed the creatives, the creatives feed the
 * pages, and the rules run what the first three built. The bonus is the
 * Messenger agent, which sits beside the funnel rather than in it.
 */

interface Step {
  label: string;
  title: string;
  body: string;
  points: string[];
  quote?: { text: string; who: string };
  /** A slab of lime that stops the scroll: the one idea in the step worth shouting. */
  callout?: { eyebrow: string; headline: string; body: string };
  proofLine?: string;
  proof: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  path: string;
}

const STEPS: Step[] = [
  {
    label: "Step 1",
    title: "Our AI Engine Finds The Angles. Based On Your Offer.",
    body: "It scans what's winning on Meta and TikTok and turns your offer into dozens of angles. You set the rules. Hit your CPA? Winner. No results? Cut.",
    points: ["Scans Meta and TikTok", "New angles, nonstop", "Your rules pick the winners"],
    quote: { text: "First 80k day in the books. Zero new hires.", who: "Pete, marketing agency" },
    proof: "/proof/80k-day.webp",
    image: "/images/tenscale/tour-angles.webp",
    width: 1600,
    height: 894,
    alt: "Angle Evaluator with winning, testing and losing angles",
    path: "angles",
  },
  {
    label: "Step 2",
    title: "Unlimited Ads. Better Ads. Higher CTR.",
    body: "Every angle gets images and video built on ads that already win. One buyer. One problem. At a volume no design team can match.",
    points: ["Built on proven winners", "Images and video", "The variety Andromeda rewards"],
    proofLine: "We're seeing ridiculously high CTRs across our accounts. Best one so far: 8.47%. Wow.",
    proof: "/proof/ctr-three-months.webp",
    image: "/images/tenscale/tour-creatives.webp",
    width: 1600,
    height: 968,
    alt: "Creative library with ready ads for each angle",
    path: "creatives",
  },
  {
    label: "Step 3",
    title: "Every Ad. Its Own Page. Up To 300% More Conversions.",
    body: "The page keeps the exact promise of the ad they clicked. Cold traffic gets educated. Hot traffic gets the offer.",
    callout: {
      eyebrow: "The holy grail of sales",
      headline: "Message match.",
      body: "Same ad. Same budget. Same click. Only the page changes, and now it says exactly what the ad promised, to exactly the person who clicked. Most funnels never get there. Every Tenscale ad does.",
    },
    points: ["Matched to every ad", "Facts and prices locked", "One line of code"],
    quote: {
      text: "Every one of these has its own landing page, that's the difference.",
      who: "Andre, marketing agency · £1.46 per purchase on the top ad",
    },
    proof: "/proof/ads-manager.webp",
    image: "/images/tenscale/tour-pages.webp",
    width: 1600,
    height: 894,
    alt: "One landing page personalized for Audi owners and for Honda owners",
    path: "pages",
  },
  {
    label: "Step 4",
    title: "Zero Manual Work. Winners Scaled Overnight.",
    body: "Set your rules once. The engine pauses, replaces and scales around the clock, inside your budget limits. There is no step five. It just keeps going.",
    points: ["Losers paused", "Tired ads replaced", "Winners scaled overnight"],
    quote: {
      text: "Their highest weekly ad spend EVER (outside of Q4) at 41k, CPA flat! The engine kept scaling winners all week.",
      who: "Maya, marketing agency",
    },
    proof: "/proof/record-spend.webp",
    image: "/images/tenscale/tour-rules.webp",
    width: 1600,
    height: 894,
    alt: "A workflow rule that pauses and recreates an ad with no results",
    path: "rules",
  },
  {
    label: "Bonus",
    title: "An AI That Answers Your Leads And Books The Call.",
    body: "A sales agent in Messenger answers every lead in seconds, handles objections and books the call into your calendar.",
    points: ["Replies day and night", "Qualifies every lead", "No warm lead goes cold"],
    proof: "",
    image: "/images/tenscale/tour-messenger.webp",
    width: 1600,
    height: 961,
    alt: "Messenger sales agent: the bot's settings and a live preview of a conversation that ends with a captured lead",
    path: "messenger",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="w-full scroll-mt-24 px-4 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto w-full max-w-[1240px]">
        <Reveal className="mx-auto flex max-w-[780px] flex-col items-center text-center">
          <span className="rounded-full bg-black/[0.04] px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-[#3a3a3d] uppercase ring-1 ring-black/[0.06] sm:text-[11px]">
            The process
          </span>
          <h2 className="mt-6 font-[family-name:var(--font-gelica)] text-[38px] leading-[1.05] font-light text-balance text-[#0e0e0f] sm:text-[60px]">
            Here&apos;s How We&apos;ll Grow Your Ads
          </h2>
        </Reveal>

        <div className="mt-20 flex flex-col gap-24 sm:mt-28 sm:gap-36">
          {STEPS.map((step, i) => (
            <article
              key={step.label}
              className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16"
            >
              <Reveal className={`min-w-0 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <p className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-[11px] tracking-[0.18em] uppercase ${
                      step.label === "Bonus" ? "bg-[#e2f93b] text-[#0b0b0c]" : "bg-[#0e0e0f] text-white"
                    }`}
                  >
                    {step.label}
                  </span>
                </p>
                <h3 className="mt-5 font-[family-name:var(--font-gelica)] text-[32px] leading-[1.1] font-light text-balance text-[#0e0e0f] sm:text-[42px]">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-[520px] text-[16px] leading-[26px] text-[#2e2e30] sm:text-[17px] sm:leading-[28px]">
                  {step.body}
                </p>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-[15px] leading-[22px] font-medium text-[#0e0e0f]">
                      <span className="mt-[1px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#e2f93b] text-[#0b0b0c]">
                        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
                          <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                {step.callout && (
                  <div className="mt-8 rounded-[1.5rem] bg-[#e2f93b] p-6 text-[#0b0b0c] sm:p-8">
                    <p className="inline-block rounded-full bg-[#0b0b0c] px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-[#e2f93b] uppercase sm:text-[11px]">
                      {step.callout.eyebrow}
                    </p>
                    <p className="mt-4 font-[family-name:var(--font-gelica)] text-[34px] leading-[1.05] font-light sm:text-[44px]">
                      {step.callout.headline}
                    </p>
                    <p className="mt-3 text-[15px] leading-[24px] font-medium text-black/80 sm:text-[16px] sm:leading-[25px]">
                      {step.callout.body}
                    </p>
                  </div>
                )}

                {/* Straight after the promise, the evidence for it. */}
                {step.proof && (
                  <div className="mt-8 rounded-[1.25rem] bg-black/[0.03] p-1 ring-1 ring-black/[0.06]">
                    <div className="flex flex-col gap-3 rounded-[calc(1.25rem-0.25rem)] bg-white px-5 py-4 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset]">
                      {step.quote ? (
                        <>
                          <p className="font-[family-name:var(--font-gelica)] text-[18px] leading-[26px] font-light text-[#0e0e0f]">
                            “{step.quote.text}”
                          </p>
                          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#5c5c60]">
                            {step.quote.who}
                            <SeeIt src={step.proof} />
                          </p>
                        </>
                      ) : (
                        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] leading-[23px] text-[#0e0e0f]">
                          {step.proofLine}
                          <SeeIt src={step.proof} />
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </Reveal>

              <Reveal delay={120} className={`min-w-0 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="rounded-[1.75rem] bg-[#f1f1ef] p-1.5 ring-1 ring-black/[0.05]">
                  <div className="home-tour-field overflow-hidden rounded-[calc(1.75rem-0.375rem)] p-1.5 sm:p-3">
                    <div className="overflow-hidden rounded-[12px] bg-white shadow-[0_30px_70px_-34px_rgba(14,14,15,0.45),0_0_0_1px_rgba(14,14,15,0.07)]">
                      <div className="flex items-center gap-3 border-b border-black/[0.06] bg-[#fbfaf8] px-4 py-2">
                        <span className="flex gap-1.5" aria-hidden="true">
                          <span className="h-2 w-2 rounded-full bg-black/10" />
                          <span className="h-2 w-2 rounded-full bg-black/10" />
                          <span className="h-2 w-2 rounded-full bg-black/10" />
                        </span>
                        <span className="mx-auto font-mono text-[11px] text-[#5c5c60]">app.tenscale.ai/{step.path}</span>
                        <span className="w-[34px]" aria-hidden="true" />
                      </div>
                      <div className="aspect-[5/4] w-full bg-[#f5f4f1] sm:aspect-[1600/894]">
                        <Image
                          src={step.image}
                          alt={step.alt}
                          width={step.width}
                          height={step.height}
                          loading="lazy"
                          className="h-full w-full object-cover object-left-top sm:object-top"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SeeIt({ src }: { src: string }) {
  return (
    <ProofButton src={src} className="home-mark group inline-flex items-center gap-1 text-[13px] font-semibold">
      See it
      <span className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">↗</span>
    </ProofButton>
  );
}
