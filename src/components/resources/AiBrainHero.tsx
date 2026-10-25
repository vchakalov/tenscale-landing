import { BrainScene } from "@/components/resources/BrainScene";
import { TemplateGate } from "@/components/resources/TemplateGate";

/**
 * The whole page: what the template is, the email that unlocks it, what is inside it,
 * and the template at work on the right.
 *
 * The words are the video's (the script, 2026-10-18) and the list is the
 * template's own index, so the page promises exactly what the click opens.
 */
const INSIDE = [
  "A home page that maps your whole agency",
  "Company, Acquisition and Fulfillment, each with an index",
  "An inbox for call notes, transcripts and files",
  "A log of what changed, when, and where from",
  "The instruction to paste into your Claude Project",
  "A setup guide for Notion, Google Drive or a folder",
];

export function AiBrainHero() {
  return (
    <section className="w-full overflow-x-clip px-4 pb-24 sm:px-8 sm:pb-32">
      {/* A phone reads the pitch, sees the template at work, then the list; a
          desktop keeps the list under the pitch and the scene beside both. */}
      <div className="mx-auto grid w-full max-w-[1320px] gap-x-20 gap-y-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-[auto_auto] lg:gap-y-10">
        <div className="flex min-w-0 flex-col items-center text-center lg:col-start-1 lg:row-start-1 lg:items-start lg:self-end lg:text-left">
          <span className="rounded-full bg-black/[0.04] px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-[#3a3a3d] uppercase ring-1 ring-black/[0.06] sm:text-[11px]">
            Free Notion template
          </span>

          <h1 className="mt-6 font-[family-name:var(--font-gelica)] text-[clamp(36px,10vw,52px)] leading-[1.02] font-light tracking-[-0.01em] text-balance text-[#0e0e0f] sm:text-[64px] lg:text-[clamp(48px,4.6vw,68px)]">
            Build An <span className="home-mark">AI Brain</span> For Your Agency.
          </h1>

          <p className="mt-6 max-w-[520px] font-[family-name:var(--font-gelica)] text-[21px] leading-[29px] font-light text-[#0e0e0f] sm:text-[24px] sm:leading-[33px]">
            AI doesn&apos;t need to know everything you know. It needs to know where to look.
          </p>
          <p className="mt-4 max-w-[500px] text-[16px] leading-[26px] text-[#3a3a3d] sm:text-[17px] sm:leading-[28px]">
            This is the template from the video. One page maps your whole agency, Claude reads it first, opens only the
            pages it needs, and keeps them up to date for you.
          </p>

          <div className="mt-8 flex w-full justify-center lg:justify-start">
            <TemplateGate resource="ai-brain" source="hero" />
          </div>
        </div>

        <div className="min-w-0 pt-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center lg:pt-0">
          <BrainScene />
        </div>

        <div className="flex min-w-0 justify-center lg:col-start-1 lg:row-start-2 lg:justify-start lg:self-start">
          <div className="w-full max-w-[580px] rounded-[1.5rem] bg-black/[0.03] p-1.5 ring-1 ring-black/[0.06]">
            <p className="px-4 pt-2.5 pb-2 text-left text-[10px] font-medium tracking-[0.2em] text-[#6b6b70] uppercase sm:text-[11px]">
              What&apos;s inside
            </p>
            <ul className="grid gap-px overflow-hidden rounded-[calc(1.5rem-0.375rem)] bg-black/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] sm:grid-cols-2">
              {INSIDE.map((item) => (
                <li key={item} className="flex items-start gap-2.5 bg-white px-4 py-3 text-left text-[14px] leading-[20px] text-[#2e2e30]">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#e2f93b] text-[#0b0b0c]">
                    <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5" aria-hidden="true">
                      <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
