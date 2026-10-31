import { Shout } from "@/components/offer/parts";

/**
 * What actually happens after someone joins. A buyer cannot picture an
 * "install" and assumes they will be left with a login (Ben, 2026-10-28), so
 * the steps are spelled out before the bonuses: first the install, then what
 * carries on every day. Drawn like The Core: numbered black discs, heavy type.
 * The words are Ben's (2026-10-30), in short lines for the eye.
 * The refund line names no period, like the guarantee section.
 */
const PHASES: { title: string; steps: { title: string; lines: React.ReactNode[] }[] }[] = [
  {
    title: "First, We Install It",
    steps: [
      {
        title: "Our People Join Your Team",
        lines: [
          <>
            Our developers and media buyers work <em>side by side</em> with yours… from DAY ONE.
          </>,
        ],
      },
      {
        title: "We Set It ALL Up",
        lines: [
          <>
            Your accounts, offers and pages, moved over and running. <em>(You don&apos;t lift a finger.)</em>
          </>,
        ],
      },
      {
        title: "We Train Your Team Until They Don’t Need Us",
        lines: [
          <>
            Live sessions… until your people run the Engine <em className="whitespace-nowrap">on their own</em>.
          </>,
        ],
      },
      {
        title: "We Document EVERYTHING",
        lines: [
          <>
            Video courses, call recordings, consultations… and your own <em>personal AI</em>{" "}
            to help whenever you&apos;re stuck.
          </>,
          <>
            <em>(So nothing lives in one person&apos;s head.)</em>
          </>,
        ],
      },
    ],
  },
  {
    title: "Then, We Stay",
    steps: [
      {
        title: "We’re On Call 24/7",
        lines: [
          <>
            Your own private group on Slack, Telegram or Discord <em>(whichever your team uses)</em>… where we talk,
            plan and solve problems with you.
          </>,
          <>A real person answers, every time.</>,
        ],
      },
      {
        title: "Your Engine Gets Better EVERY Month",
        lines: [
          <>New features land in your account the day we ship them.</>,
          <>
            And we&apos;ve got a LOT lined up for the coming months (stuff that will change how you market)…{" "}
            <em>you get every single one.</em>
          </>,
        ],
      },
      {
        title: "Our AI Team Helps With Everything Else",
        lines: [
          <>
            Anywhere else AI can help your business, we&apos;ll show you how <em>(not just your ads)</em>.
          </>,
        ],
      },
    ],
  },
];

export function OfferProcess() {
  return (
    <section className="w-full bg-white px-4 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto flex max-w-[960px] flex-col items-center text-center">
        <Shout className="text-[clamp(34px,7vw,72px)] leading-[0.98] text-[#0b0b0c] uppercase">
          Here’s Exactly What Happens <span className="text-[#6a2cff]">When You Join</span>
        </Shout>
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-[1120px] gap-4 sm:mt-16 lg:grid-cols-2">
        {PHASES.map((phase, p) => (
          // Numbering runs on across both cards: 1–4, then 5–7.
          <div key={phase.title} className="rounded-[28px] bg-[#f3f3ef] p-6 sm:p-10">
            <h3 className="text-[28px] leading-[1.05] font-black tracking-[-0.025em] text-[#0b0b0c] uppercase sm:text-[36px]">
              {phase.title}
            </h3>
            <ol className="mt-8 flex flex-col gap-6">
              {phase.steps.map((step, i) => {
                const n = PHASES.slice(0, p).reduce((sum, earlier) => sum + earlier.steps.length, 0) + i + 1;
                return (
                  <li key={step.title} className="flex items-start gap-4 sm:gap-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0b0b0c] text-[18px] font-black text-[#e2f93b] sm:h-12 sm:w-12 sm:text-[20px]">
                      {n}
                    </span>
                    <div className="min-w-0 pt-1">
                      <p className="text-[19px] leading-[25px] font-black tracking-[-0.01em] text-balance text-[#0b0b0c] sm:text-[22px] sm:leading-[28px]">
                        {step.title}
                      </p>
                      <div className="mt-1.5 flex flex-col gap-1.5 text-[16px] leading-[25px] text-pretty text-[#4a4a4e] sm:text-[17px] sm:leading-[27px]">
                        {step.lines.map((line, k) => (
                          <p key={k}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>

      {/* The guarantee as words, not another box, with the promise itself set large (Ben, 2026-10-30). */}
      <div className="mx-auto mt-14 flex w-full max-w-[1120px] flex-col items-center text-center sm:mt-16">
        <p className="text-[clamp(34px,5.6vw,60px)] leading-[0.98] font-black tracking-[-0.025em] text-balance text-[#0b0b0c] uppercase">
          <span className="text-[#6a2cff]">100%</span> Of Your Money Back
        </p>
        <p className="mt-3 text-[18px] leading-[26px] font-semibold text-balance text-[#3a3a3d] sm:text-[22px] sm:leading-[30px]">
          If you&apos;re not happy.
        </p>
      </div>
    </section>
  );
}
