import { Shout, Tick } from "@/components/offer/parts";

/**
 * What actually happens after someone joins. A buyer cannot picture an
 * "install" and assumes they will be left with a login (Ben, 2026-10-28), so
 * the steps are spelled out before the bonuses: first the install, then what
 * carries on every day. Drawn like The Core: numbered black discs, heavy type.
 * The refund line says 30 days, like the guarantee; change them together.
 */
const PHASES = [
  {
    title: "First, We Install It",
    steps: [
      { title: "We embed our people in your team", body: "A few of our developers and media buyers work alongside yours from day one." },
      { title: "We install, migrate and set up everything", body: "Your accounts, offers and pages, moved over and running. You don’t lift a finger." },
      { title: "We train your team", body: "Live sessions until your people run the engine on their own." },
      { title: "We document everything", body: "Every process written down, so nothing lives in one person’s head." },
    ],
  },
  {
    title: "Then, We Stay",
    steps: [
      { title: "We’re on call 24/7, every day", body: "A real person answers, every time." },
      { title: "The software gets better every month", body: "New features land in your account as we ship them." },
      { title: "Our AI team helps with the rest", body: "Anywhere else in your business AI can help, we’ll show you how." },
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
        <p className="mt-6 max-w-[680px] text-[18px] leading-[28px] font-semibold text-[#2e2e30] sm:text-[21px] sm:leading-[31px]">
          You don’t get a login and a “good luck” email. You get our team, inside yours:
        </p>
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
                      <p className="text-[19px] leading-[25px] font-black tracking-[-0.01em] text-[#0b0b0c] sm:text-[22px] sm:leading-[28px]">
                        {step.title}
                      </p>
                      <p className="mt-1.5 text-[16px] leading-[25px] text-[#4a4a4e] sm:text-[17px] sm:leading-[27px]">{step.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-4 flex w-full max-w-[1120px] items-center justify-center gap-4 rounded-[28px] bg-[#e2f93b] px-6 py-6 text-left sm:px-10 sm:py-8">
        <Tick className="h-11 w-11 bg-[#0b0b0c] text-[#e2f93b] sm:h-12 sm:w-12" />
        <p className="text-[20px] leading-[26px] font-black tracking-[-0.01em] text-[#0b0b0c] sm:text-[28px] sm:leading-[34px]">
          Not happy in your first 30 days? We give you your money back.
        </p>
      </div>
    </section>
  );
}
