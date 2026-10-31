import { BonusVisual, type BonusVisualKind } from "@/components/offer/BonusVisuals";
import { OfferButton } from "@/components/offer/OfferButton";
import { Shout } from "@/components/offer/parts";

/**
 * Russell Brunson's stack: every extra named and shown as it looks when you
 * have it (offer/BonusVisuals.tsx). Ben's list (2026-10-28) splits the weekly
 * 1-on-1 calls and the chat support out as assets of their own; the install
 * and the training are in the section before (offer/OfferProcess.tsx). No
 * values and no total: Tenscale shows no prices.
 */
type Bonus = {
  title: string;
  /** Short lines, each its own paragraph. */
  lines: React.ReactNode[];
  visual: BonusVisualKind;
};

const BONUSES: Bonus[] = [
  {
    title: "Weekly 1-on-1 Calls With A Top-Rated Meta Ad Expert",
    lines: [
      <>
        Every week, you get a private 1-on-1 strategy session with an elite Meta advertising expert to audit your
        accounts, brainstorm ideas with you and give you non‑obvious insights on the newest trends.
      </>,
      <>
        <em>(It&apos;s like having an A+ Marketing Expert on your team, without the salary.)</em>
      </>,
    ],
    visual: "call",
  },
  {
    title: "24/7 Private Chat Support (Slack, Discord, Telegram)",
    lines: [
      <>
        Every client gets a private channel on Slack, Discord or Telegram, built just for their team. Whenever you hit a
        problem or have a question, message us and a real person jumps in to help, on average in under 17 minutes.
      </>,
      <>
        <em>(It&apos;s like having our whole team in the next room.)</em>
      </>,
    ],
    visual: "support",
  },
  {
    title: "Our Internal AI Workflows",
    lines: [
      <>
        We&apos;ve automated 80% of our own businesses, from lead gen to customer support… and you get every one of
        those systems, ready to plug straight into yours.
      </>,
      <>
        <em>(If one doesn&apos;t quite fit, we&apos;ll help you model it around your processes.)</em>
      </>,
    ],
    visual: "workflow",
  },
  {
    title: "Live US Market Intelligence",
    lines: [
      <>
        We have TERABYTES of data on what&apos;s happening in the US market at any moment, thanks to our attribution
        partnerships.
      </>,
      <>So we&apos;ll tell you which formats, hooks and trends are winning right now… and how the algorithm is changing.</>,
      <>
        <em>(Skip months of expensive testing.)</em>
      </>,
    ],
    visual: "report",
  },
];

export function Bonuses() {
  return (
    <section className="w-full bg-[#0b0b0c] px-4 py-20 text-white sm:px-8 sm:py-32">
      <div className="mx-auto flex max-w-[980px] flex-col items-center text-center">
        <Shout className="text-[clamp(30px,5.8vw,62px)] leading-[1.02] uppercase">
          Everything You Get On Top Of The AI Engine <span className="text-[#e2f93b]">(Included FREE)</span>
        </Shout>
      </div>

      <ol className="mx-auto mt-14 flex w-full max-w-[1000px] flex-col gap-4 sm:mt-20 sm:gap-5">
        {BONUSES.map((bonus, i) => (
          <li key={bonus.title}>
            <div>
              <div className="grid items-center gap-7 rounded-[24px] bg-white p-5 text-[#0b0b0c] sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10 md:p-10">
                <BonusVisual kind={bonus.visual} />
                <div className="min-w-0 text-center md:text-left">
                  {/* Numbered as Brunson does, so a reader knows each card is a bonus (Ben, 2026-10-31). */}
                  <p className="text-[13px] font-black tracking-[0.14em] text-[#6a2cff] uppercase sm:text-[15px]">Bonus #{i + 1}</p>
                  <h3 className="mt-2 text-[24px] leading-[1.08] font-black tracking-[-0.02em] sm:text-[32px]">{bonus.title}</h3>
                  <div className="mt-4 flex flex-col gap-2.5 text-[16px] leading-[26px] text-pretty text-[#3a3a3d] sm:text-[17px] sm:leading-[28px]">
                    {bonus.lines.map((line, n) => (
                      <p key={n}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mx-auto mt-10 flex w-full max-w-[1000px] flex-col items-center text-center sm:mt-14">
        <OfferButton source="offer_bonuses" />
        <p className="mt-5 max-w-[560px] text-[15px] leading-[23px] text-balance text-white/60 sm:text-[16px]">
          Find out how much of your team&apos;s week AI can take over, starting this month.
        </p>
      </div>
    </section>
  );
}
