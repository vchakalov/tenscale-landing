import { Reveal } from "@/components/home/Reveal";

/**
 * Why the engine is built for Andromeda, Meta's ad retrieval model.
 *
 * Andromeda picks who sees an ad from the creative itself, groups near
 * identical ads as one, and favours accounts that feed it many genuinely
 * different ideas. Each card names one of those facts and what Tenscale does
 * about it. The safeguards that used to fill this section are one line of
 * chips at the bottom now.
 *
 * The ground is the page's light grey with wide, soft bands curving across
 * it, Hyros' lavender waves in our neutral. Decoration only, hidden from
 * readers, and still: nothing here moves.
 */

const FACTS = [
  {
    title: "Creative is the new targeting.",
    body: "Andromeda reads the ad to decide who sees it. Tenscale writes an angle for every buyer, so every ad finds its own people.",
  },
  {
    title: "Similar ads count as one.",
    body: "Fifty versions of one idea get grouped together. Every Tenscale angle is a different idea: new hook, new visual, new promise.",
  },
  {
    title: "Volume wins the auction.",
    body: "More distinct ads enter more auctions. Hundreds of images and videos, launched constantly, never a handful.",
  },
  {
    title: "Fatigue kills.",
    body: "The same ad, shown too often, gets expensive. Tired ads are replaced before they burn the budget.",
  },
];

const SAFEGUARDS = ["Runs in your Meta account", "You approve every ad", "Facts and prices locked"];

export function Andromeda() {
  return (
    <section id="andromeda" className="w-full scroll-mt-24 px-2 sm:px-4">
      <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-[2rem] bg-[#efefec] px-4 py-20 text-[#0e0e0f] sm:rounded-[2.5rem] sm:px-10 sm:py-28 lg:px-14">
        <Waves />

        <Reveal className="relative mx-auto flex max-w-[780px] flex-col items-center text-center">
          <span className="rounded-full bg-white px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-[#3a3a3d] uppercase ring-1 ring-black/[0.06] sm:text-[11px]">
            Meta&apos;s new ad AI
          </span>
          <h2 className="mt-6 font-[family-name:var(--font-gelica)] text-[40px] leading-[1.04] font-light text-balance sm:text-[64px]">
            Built For <span className="home-mark">Andromeda.</span>
          </h2>
          <p className="mt-5 max-w-[580px] text-[16px] leading-[26px] text-[#3a3a3d] sm:text-[18px] sm:leading-[28px]">
            Andromeda now decides who sees your ads, and it decides from the creative. The accounts that win feed it
            many different ideas. That is exactly what Tenscale makes.
          </p>
        </Reveal>

        <div className="relative mt-14 grid gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {FACTS.map((fact, i) => (
            <Reveal key={fact.title} delay={i * 80} className="h-full">
              <div className="h-full rounded-[1.75rem] bg-white/60 p-1.5 ring-1 ring-black/[0.05]">
                <div className="h-full rounded-[calc(1.75rem-0.375rem)] bg-white p-6 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_16px_40px_-30px_rgba(14,14,15,0.3)] sm:p-7">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e2f93b]">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                      <path d={SPARKLE_PATH} fill="#0b0b0c" />
                    </svg>
                  </span>
                  <h3 className="mt-6 text-[18px] leading-[25px] font-semibold">{fact.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-[24px] text-[#3a3a3d]">{fact.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <ul className="relative mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-12">
          {SAFEGUARDS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] text-[#2e2e30] ring-1 ring-black/[0.06]"
            >
              <span className="grid h-4 w-4 place-items-center rounded-full bg-[#e2f93b] text-[#0b0b0c]">
                <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5" aria-hidden="true">
                  <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** A four-point star. */
const SPARKLE_PATH = "M12 0C12.9 6.6 17.4 11.1 24 12C17.4 12.9 12.9 17.4 12 24C11.1 17.4 6.6 12.9 0 12C6.6 11.1 11.1 6.6 12 0Z";

/** Wide soft bands sweeping across the panel, and two hairlines riding them. */
function Waves() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1400 800"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
    >
      <path d="M-100 620 C 250 470, 520 760, 860 560 S 1350 360, 1520 470" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="90" strokeLinecap="round" />
      <path d="M-100 250 C 220 120, 560 360, 900 190 S 1320 40, 1520 140" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="60" strokeLinecap="round" />
      <path d="M-100 430 C 300 300, 600 560, 980 380 S 1380 240, 1520 300" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="130" strokeLinecap="round" />
      <path d="M-100 700 C 320 560, 640 800, 1000 640 S 1360 520, 1520 590" stroke="#0e0e0f" strokeOpacity="0.06" strokeWidth="1.5" />
      <path d="M-100 330 C 260 200, 600 440, 940 270 S 1340 120, 1520 210" stroke="#0e0e0f" strokeOpacity="0.06" strokeWidth="1.5" />
    </svg>
  );
}
