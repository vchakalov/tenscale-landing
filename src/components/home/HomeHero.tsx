import { BookCallButton } from "@/components/home/BookButton";
import { ProductTour } from "@/components/home/ProductTour";
import { ProofButton } from "@/components/home/Proof";
import { Roulette } from "@/components/home/Roulette";
import { RESULTS } from "@/components/home/results";

/**
 * The first screen, in Hyros' shape and Hyros' voice: a fixed half-line and a
 * result that turns underneath it, what the engine does in one sentence, the
 * proof in numbers, two ways in, three frictions removed, and the product on
 * the right.
 *
 * The scale figures and the averages are the company's own count across the
 * 300+ client accounts (Ben, 2026-10-23). Where a screenshot backs a figure,
 * the figure opens it.
 */
const FIRST_FOLD: { value: string; label: string; proof?: string }[] = [
  { value: "$3M+", label: "Meta ad spend a month" },
  { value: "300+", label: "client accounts" },
  { value: "−60%", label: "lower CPA on average", proof: "/proof/multiple-clients.webp" },
  { value: "4.3%+", label: "CTR on average", proof: "/proof/ctr-three-months.webp" },
];

const FRICTIONS = ["Set up for you", "Results in days", "No changes to your ads"];

export function HomeHero() {
  return (
    <section className="w-full px-4 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
        <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
          <span className="rounded-full bg-black/[0.04] px-3 py-1 text-[10px] font-medium tracking-[0.14em] text-[#3a3a3d] uppercase ring-1 ring-black/[0.06] sm:text-[11px] sm:tracking-[0.2em]">
            For marketing agencies running Meta ads
          </span>

          {/* The first line holds; the second turns. A screen reader gets
              every result once, in a sentence, instead of the reel. */}
          <h1 className="mt-6 w-full font-[family-name:var(--font-gelica)] text-[clamp(30px,8.6vw,46px)] leading-[1.04] font-light tracking-[-0.01em] text-[#0e0e0f] sm:text-[60px] lg:text-[clamp(40px,3.9vw,58px)]">
            <span className="block whitespace-nowrap">Our AI Engine.</span>
            <span className="sr-only">{RESULTS.join(" ")}</span>
            <Roulette className="text-[#0b0b0c]" />
          </h1>

          <p className="mt-5 max-w-[520px] text-[16px] leading-[25px] text-[#2e2e30] sm:mt-6 sm:text-[19px] sm:leading-[30px]">
            Tenscale writes the angles, makes the creatives, gives every ad its own landing page and runs it
            all 24/7, inside your Meta account.
          </p>

          {/* The proof, before the ask: the biggest numbers there are, each
              one a click from its screenshot where there is one. */}
          <div className="mt-6 w-full max-w-[600px] rounded-[1.5rem] sm:mt-8 bg-black/[0.03] p-1.5 ring-1 ring-black/[0.06]">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[calc(1.5rem-0.375rem)] bg-black/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] sm:grid-cols-4">
              {FIRST_FOLD.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center bg-white px-3 py-3 text-center sm:py-4 lg:items-start lg:px-4 lg:text-left">
                  <dt className="order-2 mt-1.5 text-[12px] leading-[16px] text-[#4a4a4e]">{stat.label}</dt>
                  <dd className="order-1 font-[family-name:var(--font-gelica)] text-[30px] leading-none font-light whitespace-nowrap text-[#0e0e0f] sm:text-[32px]">
                    {stat.proof ? (
                      <ProofButton src={stat.proof} className="home-mark cursor-zoom-in underline decoration-dotted decoration-1 underline-offset-[6px] transition-opacity duration-300 hover:opacity-70">
                        {stat.value}
                      </ProofButton>
                    ) : (
                      stat.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Two ways in, side by side: the call, and a quieter way down
              the page for whoever is not ready. */}
          <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <BookCallButton size="lg">Book a demo</BookCallButton>
            <a
              href="#how"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full px-7 text-[17px] font-semibold text-[#0e0e0f] ring-1 ring-black/15 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/[0.04] active:scale-[0.98]"
            >
              Show me how
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0.5"
                aria-hidden="true"
              >
                <path d="M12 5v14M12 19l-6-6M12 19l6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[14px] text-[#3a3a3d] lg:justify-start">
            {FRICTIONS.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
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

        <div className="min-w-0">
          <ProductTour />
        </div>
      </div>
    </section>
  );
}
