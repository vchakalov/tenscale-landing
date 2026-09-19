import type { ReactNode } from "react";

/**
 * What to bring, in three lines.
 *
 * Not objections: the visitor has already booked, so there is nothing left to
 * argue. This is expectation setting, and it is here because a call where the
 * owner has Ads Manager open is a different call from one where they do not.
 *
 * Numbered discs instead of the landing's icons. Three drawn marks would be
 * three more things to read; a numeral says "this is a short list, in order"
 * and nothing else, and it reuses the same circle the landing already uses.
 */
const STEPS = [
  {
    id: "account",
    title: "Bring one account.",
    body: (
      <>
        Pick the client that costs your team the most hours. We look at that one,
        not at a demo account.
      </>
    ),
  },
  {
    id: "ads-manager",
    title: "Have Ads Manager open.",
    body: (
      <>
        We show you the install on your own numbers, live, while you watch.
      </>
    ),
  },
  {
    id: "cost",
    title: "Know your cost to fulfil.",
    body: (
      <>
        What one account costs you per month in people. That number decides
        whether any of this is worth doing.
      </>
    ),
  },
] as const;

function StepDisc({ index, className }: { index: number; className: string }) {
  return (
    <span className={className}>
      <span className="font-[family-name:var(--font-pt-serif)] font-bold text-[#F5F5F5]">
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
        className="flex h-[92px] w-[92px] items-center justify-center rounded-full border-[1.5px] border-[#F5F5F5] bg-[#0B0B0B] text-[34px] leading-none transition-[box-shadow,transform] duration-200 hover:-translate-y-px hover:shadow-[8px_10px_0_0_rgba(245,245,245,0.12)]"
      />
      <p className="mt-[26px] font-[family-name:var(--font-pt-serif)] text-[clamp(20px,1.55vw,28px)] leading-[1.28] font-bold text-[#F5F5F5]">
        {title}
      </p>
      <p className="mt-[12px] font-[family-name:var(--font-inter)] text-[clamp(15px,1.12vw,19px)] leading-[1.6] font-normal text-[rgba(245,245,245,0.78)]">
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
    <div className="flex items-start gap-[16px] border-t border-[rgba(245,245,245,0.16)] pt-[22px]">
      <StepDisc
        index={index}
        className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#F5F5F5] text-[19px] leading-none"
      />
      <div className="min-w-0">
        <p className="font-[family-name:var(--font-pt-serif)] text-[19px] leading-[26px] font-bold text-[#F5F5F5]">
          {title}
        </p>
        <p className="mt-[5px] font-[family-name:var(--font-inter)] text-[16px] leading-[24px] font-normal text-[rgba(245,245,245,0.78)]">
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
        <section className="bg-[#0B0B0B] px-[40px] py-0">
          <div className="mx-auto w-full max-w-[1320px]">
            <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[clamp(34px,3vw,52px)] leading-[1.18] font-bold text-[#F5F5F5]">
              How To Get The Most Out Of It.
            </h2>
            <div className="mt-[64px] grid grid-cols-3 items-start gap-[clamp(32px,3.8vw,72px)]">
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
          <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[34px] leading-[40px] font-bold text-[#F5F5F5]">
            How To Get The Most
            <br />
            Out Of It.
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
