import type { ReactNode } from "react";

const RESULTS = [
  {
    id: "support",
    Icon: SupportMark,
    lines: ["Customer support system.", "Does the work of 3 agents."],
  },
  {
    id: "sales",
    Icon: SalesMark,
    lines: [
      "Sales system. Time-to-lead 4 hours → 4 minutes.",
      "Close rate 19% → 28%.",
    ],
  },
  {
    id: "quoting",
    Icon: QuoteMark,
    lines: ["Quoting system.", "Two-day estimates now go out in 4 hours."],
  },
  {
    id: "onboarding",
    Icon: OnboardMark,
    lines: [
      "Onboarding system.",
      "A 3-day client setup now takes 40 minutes.",
    ],
  },
] as const;

function SupportMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-[78px] w-[78px]" aria-hidden="true">
      <path
        d="M10 26c0-11 10-20 22-20s22 9 22 20v8c0 5.5-4.2 10-9.5 10H40v12L26 44h-4.5C16.2 44 10 39.5 10 34v-8z"
        fill="#0c0a08"
      />
    </svg>
  );
}

function SalesMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-[78px] w-[78px]" aria-hidden="true">
      <path d="M8 54 L32 8 L56 54 Z" fill="#0c0a08" />
      <path d="M24 54 L32 32 L40 54 Z" fill="#f4f2f0" />
    </svg>
  );
}

function QuoteMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-[78px] w-[78px]" aria-hidden="true">
      <path
        d="M14 6h36a4 4 0 0 1 4 4v44a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z"
        fill="#0c0a08"
      />
      <path
        d="M22 20h20M22 32h20M22 44h12"
        stroke="#f4f2f0"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OnboardMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-[78px] w-[78px]" aria-hidden="true">
      <circle cx="16" cy="32" r="11" fill="#0c0a08" />
      <circle cx="48" cy="32" r="11" fill="#0c0a08" />
      <path
        d="M26 32h10"
        stroke="#0c0a08"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M33 22l14 10-14 10"
        fill="#0c0a08"
      />
    </svg>
  );
}

function ResultCard({
  Icon,
  lines,
}: {
  Icon: () => ReactNode;
  lines: readonly string[];
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-[145px] w-[145px] items-center justify-center rounded-full border border-[#e5e7eb] bg-[#f4f2f0] transition-[box-shadow,transform] duration-200 hover:-translate-y-px hover:shadow-[10px_12px_0_0_rgba(12,10,8,0.14)]">
        <Icon />
      </div>
      <p className="mt-[16px] max-w-[230px] font-[family-name:var(--font-pt-serif)] text-[15px] leading-[20px] font-normal text-[#0c0a08]">
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}

export function Results() {
  return (
    <>
      <div className="mt-[180px] hidden min-[801px]:block">
        <section className="bg-[#f4f2f0] px-[40px] py-0">
          <div className="mx-auto w-full max-w-[1120px]">
            <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[48px] leading-[48px] font-bold text-[#0c0a08]">
              Some of Our Recent Results:
            </h2>
            <div className="mt-[56px] grid grid-cols-4 gap-[24px]">
              {RESULTS.map((result) => (
                <ResultCard
                  key={result.id}
                  Icon={result.Icon}
                  lines={result.lines}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="max-[800px]:block min-[801px]:hidden">
        <section className="mt-[65px] px-[5px] py-[20px]">
          <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[40px] leading-[46px] font-bold text-[#0c0a08]">
            Some of Our
            <br />
            Recent Results
          </h2>
        </section>
        <section className="mt-[40px] flex flex-col items-center gap-[48px] px-[20px] pb-[20px]">
          {RESULTS.map((result) => (
            <ResultCard
              key={result.id}
              Icon={result.Icon}
              lines={result.lines}
            />
          ))}
        </section>
      </div>
    </>
  );
}
