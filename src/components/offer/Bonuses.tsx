import { BonusVisual, type BonusVisualKind } from "@/components/offer/BonusVisuals";
import { OfferButton } from "@/components/offer/OfferButton";
import { Shout } from "@/components/offer/parts";

/**
 * Russell Brunson's stack: every extra named and shown as it looks when you
 * have it (offer/BonusVisuals.tsx). Ben's list (2026-10-28) splits the weekly
 * 1-on-1 calls and the chat support out as assets of their own; the install
 * and the training are in the section before (offer/OfferProcess.tsx). No
 * values and no total: Tenscale shows no prices.
 *
 * DRAFT: bonus #5 is a stand-in until Ben says what the bonus "from Meta" is.
 * Before it ships it must not read as a Meta partnership or endorsement: the
 * page runs on Meta ads.
 */
type Bonus = {
  title: string;
  body: string;
  visual: BonusVisualKind;
};

const BONUSES: Bonus[] = [
  {
    title: "Weekly 1-on-1 Calls With A Top-Rated Meta Ad Expert",
    body: "Never second-guess a campaign again. Every week, you get a private 1-on-1 strategy session with an elite Meta advertising expert to audit your accounts, optimize your angles, and scale winners faster.",
    visual: "call",
  },
  {
    title: "VIP Chat Support (Slack, Discord, Telegram)",
    body: "Need help mid-launch? Message your dedicated VIP channel on Slack, Discord, or Telegram and our team answers, fast.",
    visual: "support",
  },
  {
    title: "Our Internal E-Com & Lead Gen AI Systems",
    body: "Get the exact behind-the-scenes AI workflows, prompts, and strategies we use to scale our own e-commerce and lead generation brands, ready to plug straight into your accounts.",
    visual: "workflow",
  },
  {
    title: "Live US Market Intelligence (From $3M+/Mo & 300+ Accounts)",
    body: "Skip months of expensive testing. Get ongoing access to what works across our 300+ client accounts right now: the exact hooks, creative formats, and offers winning in the US market today.",
    visual: "report",
  },
  {
    title: "Exclusive Meta Execution Bonus",
    body: "Our insider playbook and frameworks for dominating Meta’s new creative-first algorithm without burning budget on dead tests.",
    visual: "playbook",
  },
];

export function Bonuses() {
  return (
    <section className="w-full bg-[#0b0b0c] px-4 py-20 text-white sm:px-8 sm:py-32">
      <div className="mx-auto flex max-w-[980px] flex-col items-center text-center">
        <Shout className="text-[clamp(30px,5.8vw,62px)] leading-[1.02] uppercase">
          Everything You Get On Top Of The AI Engine <span className="text-[#e2f93b]">(Included FREE)</span>
        </Shout>
        <p className="mt-6 max-w-[780px] text-[17px] leading-[28px] text-white/75 sm:text-[19px] sm:leading-[31px]">
          On top of the install, you get weekly 1-on-1 strategy calls, direct Slack/Telegram access, our internal AI
          systems and live US market intel:
        </p>
      </div>

      <ol className="mx-auto mt-14 flex w-full max-w-[1000px] flex-col gap-4 sm:mt-20 sm:gap-5">
        {BONUSES.map((bonus) => (
          <li key={bonus.title}>
            <div>
              <div className="grid items-center gap-7 rounded-[24px] bg-white p-5 text-[#0b0b0c] sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10 md:p-10">
                <BonusVisual kind={bonus.visual} />
                <div className="min-w-0 text-center md:text-left">
                  <h3 className="text-[24px] leading-[1.08] font-black tracking-[-0.02em] sm:text-[32px]">{bonus.title}</h3>
                  <p className="mt-4 text-[16px] leading-[26px] text-[#3a3a3d] sm:text-[17px] sm:leading-[28px]">{bonus.body}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mx-auto mt-10 flex w-full max-w-[1000px] flex-col items-center text-center sm:mt-14">
        <OfferButton source="offer_bonuses" />
        <p className="mt-5 max-w-[560px] text-[15px] leading-[23px] text-white/60 sm:text-[16px]">
          Find out how we can install this entire stack into your agency in days, not months.
        </p>
      </div>
    </section>
  );
}
