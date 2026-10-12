import { BookCallButton } from "@/components/v2/CtaButtons";

const STEPS = [
  {
    title: "Describe your offer",
    body: "Describe your offer once. Tenscale maps it into dozens of angles and sorts them into losing, testing and winning branches.",
    image: "/images/tenscale/reclaim-describe.png",
  },
  {
    title: "Generate angles & creatives",
    body: "It automatically generates new angles and winning-structured creatives for each one.",
    image: "/images/tenscale/reclaim-creatives.png",
  },
  {
    title: "Launch personalized funnels",
    body: "Each angle gets a message-matched landing page and goes live, optimized 24/7.",
    image: "/images/tenscale/reclaim-funnels.png",
  },
];

export function Reclaim() {
  return (
    <section className="section-full pt-14 pb-24 md:pt-16 md:pb-28">
      <div className="container-default flex flex-col items-stretch gap-16">
        <div className="flex flex-col lg:items-start lg:justify-between gap-6">
          <p className="text-(--ec-ink) font-[family-name:var(--font-libre-baskerville)] font-bold text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-tight">
            One system that <span className="ec-mark">replaces your media-buying team</span>.
          </p>
          <div className="w-full flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
            <p className="font-[family-name:var(--font-inter)] text-[rgba(var(--ec-ink-rgb),0.7)] leading-[1.55] sm:max-w-[416px]">
              Tenscale turns your offer into many personalized funnels, then runs and optimizes them.
            </p>
            <div className="grid grid-cols-1 max-sm:w-full">
              <BookCallButton>Book a call</BookCallButton>
            </div>
          </div>
        </div>
        {/* The three steps share one grid so their pictures start on the same
            line: the copy runs to different lengths, and with each column
            stacking on its own the frames came out staggered. */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto] gap-x-4 gap-y-12 w-full">
          {STEPS.map((step) => (
            <div key={step.title} className="flex flex-col gap-6 md:row-span-2 md:grid md:grid-rows-subgrid">
              <div className="flex flex-col items-start gap-4 pl-2">
                <h3 className="font-[family-name:var(--font-libre-baskerville)] font-bold text-[20px] sm:text-[22px] leading-[1.3] tracking-tight w-full text-(--ec-ink)">
                  {step.title}
                </h3>
                <p className="w-full font-[family-name:var(--font-inter)] text-[rgba(var(--ec-ink-rgb),0.7)] leading-[160%]">
                  {step.body}
                </p>
              </div>
              <img src={step.image} alt="" className="v2-frame w-full h-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
