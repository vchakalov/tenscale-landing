import type { ReactNode } from "react";

/**
 * What we will go through on the call, in the four parts Ben's own emails use:
 * onboarding, month-to-month work, who does what, and what has to grow. The
 * page and the emails say the same thing in the same words.
 *
 * Not objections: the visitor has already booked, so there is nothing left to
 * argue. This is expectation setting for the first call, which is about the
 * agency, not about an ad account. The owner walks Ben through how the agency
 * delivers today; logins and Ads Manager come on the second call, if there is
 * one. Asking for account access here would ask for trust the first call has
 * not earned yet.
 *
 * Numbered discs instead of the landing's icons. Three drawn marks would be
 * three more things to read; a numeral says "this is a short list, in order"
 * and nothing else, and it reuses the same circle the landing already uses.
 */
const STEPS = [
  {
    id: "onboarding",
    title: "How a new client gets onboarded.",
    body: (
      <>
        From signed contract to first ads live: who does it, and how long it
        takes.
      </>
    ),
  },
  {
    id: "monthly",
    title: "How the work runs month to month.",
    body: (
      <>
        New creatives, launches, testing and reports, and who on the team owns
        each one.
      </>
    ),
  },
  {
    id: "team",
    title: "Who does what.",
    body: (
      <>
        Your people, your freelancers and the tools they use. Nothing has to
        change for the call.
      </>
    ),
  },
  {
    id: "growth",
    title: "What has to grow when you add clients.",
    body: (
      <>
        Usually it&apos;s more people or more of your own time. That&apos;s
        where we look first.
      </>
    ),
  },
] as const;

function StepDisc({ index, className }: { index: number; className: string }) {
  return (
    <span className={className}>
      <span className="font-[family-name:var(--font-pt-serif)] font-bold text-[#001232]">
        {index + 1}
      </span>
    </span>
  );
}

function StepCard({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start text-left">
      <StepDisc
        index={index}
        className="flex h-[92px] w-[92px] items-center justify-center rounded-full border-[1.5px] border-[#001232] bg-[#f4f1ea] text-[34px] leading-none transition-[box-shadow,transform] duration-200 hover:-translate-y-px hover:shadow-[8px_10px_0_0_rgba(0,18,50,0.12)]"
      />
      <p className="mt-[26px] font-[family-name:var(--font-pt-serif)] text-[clamp(20px,1.55vw,28px)] leading-[1.28] font-bold text-[#001232]">
        {title}
      </p>
      <p className="mt-[12px] font-[family-name:var(--font-inter)] text-[clamp(17px,1.25vw,20px)] leading-[1.6] font-normal text-[rgba(0,18,50,0.78)]">
        {body}
      </p>
    </div>
  );
}

function StepRow({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: ReactNode;
}) {
  return (
    <div className="flex items-start gap-[16px] border-t border-[rgba(0,18,50,0.16)] pt-[22px]">
      <StepDisc
        index={index}
        className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#001232] text-[19px] leading-none"
      />
      <div className="min-w-0">
        <p className="font-[family-name:var(--font-pt-serif)] text-[19px] leading-[26px] font-bold text-[#001232]">
          {title}
        </p>
        <p className="mt-[5px] font-[family-name:var(--font-inter)] text-[17px] leading-[26px] font-normal text-[rgba(0,18,50,0.78)]">
          {body}
        </p>
      </div>
    </div>
  );
}

export function CallPrep() {
  return (
    <>
      <div className="mt-[150px] hidden min-[801px]:block">
        <section className="bg-[#f4f1ea] px-[40px] py-0">
          <div className="mx-auto w-full max-w-[1080px]">
            <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[clamp(34px,3vw,52px)] leading-[1.18] font-bold text-[#001232]">
              How To Get The Most Out Of Our Call.
            </h2>
            <div className="mt-[64px] grid grid-cols-4 items-start gap-[clamp(24px,2.8vw,48px)]">
              {STEPS.map((step, index) => (
                <StepCard
                  key={step.id}
                  index={index}
                  title={step.title}
                  body={step.body}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="max-[800px]:block min-[801px]:hidden">
        <section className="mt-[72px] px-[5px] py-[20px]">
          <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[34px] leading-[40px] font-bold text-[#001232]">
            How To Get The Most
            <br />
            Out Of Our Call.
          </h2>
        </section>
        <section className="mt-[28px] flex flex-col gap-[22px] px-[20px] pb-[10px]">
          {STEPS.map((step, index) => (
            <StepRow
              key={step.id}
              index={index}
              title={step.title}
              body={step.body}
            />
          ))}
        </section>
      </div>
    </>
  );
}
