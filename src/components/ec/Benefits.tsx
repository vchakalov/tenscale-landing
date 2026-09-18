import type { ReactNode } from "react";

/**
 * The four points.
 *
 * Same component shape as the source's results row, so the circles, the
 * hover lift and the serif caption all match the rest of the page.
 *
 * Three outcomes, not four.
 *
 * Only the first carries a coloured hook before its body. The cost-per-result
 * claim is the one a skimming agency owner stops on, so it is pulled out of the
 * sentence and set in the accent; the other two say enough in plain body copy,
 * and a hook on every item would turn the device back into noise.
 *
 * No bold inside the bodies at all. Each column had a different amount of it,
 * one had a coloured lead as well, and three columns carrying three different
 * weights read as noise rather than as emphasis. The titles carry the weight,
 * the bodies stay one even tone, and the single coloured lead on the first
 * column is then legible as a deliberate exception.
 */

const BENEFITS = [
  {
    id: "cpr",
    Icon: AnglesMark,
    title: "Better Delivery.",
    hook: "Lower cost per result.",
    body: (
      <>Andromeda rewards variety and volume. Agentica gives it both, at 30% lower CPRs on average.</>
    ),
  },
  {
    id: "onboarding",
    Icon: MatchMark,
    title: "Faster Onboarding.",
    body: (
      <>Go from signed client to live campaigns the same day, and get paid faster.</>
    ),
  },
  {
    id: "churn",
    Icon: RulesMark,
    title: "Less Churn.",
    body: <>Make your offer better without making it more expensive.</>,
  },
] as const;

function AnglesMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="14" cy="32" r="7" fill="#001232" />
      <path
        d="M21 32h10M31 32l14-16M31 32l14 16M31 32h14"
        stroke="#001232"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="49" cy="14" r="6" fill="#001232" />
      <circle cx="49" cy="32" r="6" fill="#001232" />
      <circle cx="49" cy="50" r="6" fill="#001232" />
    </svg>
  );
}

function MatchMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="6" y="14" width="22" height="30" rx="3" fill="#001232" />
      <rect x="36" y="14" width="22" height="30" rx="3" fill="#001232" />
      <path
        d="M28 29h8"
        stroke="#001232"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M11 22h12M11 28h12M41 22h12M41 28h12"
        stroke="#f4f1ea"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RulesMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M10 46h8v10h-8zM26 34h8v22h-8z" fill="#001232" />
      <path d="M42 18h8v38h-8z" fill="#001232" />
      <path
        d="M10 30l14-10 12 8 14-16"
        fill="none"
        stroke="#001232"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Mark = ({ className }: { className: string }) => ReactNode;

/**
 * Desktop: three columns, ranged left under a hairline.
 *
 * Centred, the three read as chaos: paragraphs of different lengths with no
 * shared left edge and ragged bottoms. The left edge is what fixes that, not a
 * rule above each column; the rules were a crutch while the text was still
 * centred, and once the text has an edge they only add ink.
 */
function BenefitCard({
  Icon,
  title,
  hook,
  body,
}: {
  Icon: Mark;
  title: string;
  hook?: string;
  body: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start text-left">
      <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full border-[1.5px] border-[#001232] bg-[#f4f1ea] transition-[box-shadow,transform] duration-200 hover:-translate-y-px hover:shadow-[8px_10px_0_0_rgba(0,18,50,0.12)]">
        <Icon className="h-[48px] w-[48px]" />
      </div>
      <p className="mt-[26px] font-[family-name:var(--font-pt-serif)] text-[clamp(20px,1.55vw,28px)] leading-[1.28] font-bold text-[#001232]">
        {title}
      </p>
      <p className="mt-[12px] font-[family-name:var(--font-inter)] text-[clamp(15px,1.12vw,19px)] leading-[1.6] font-normal text-[rgba(0,18,50,0.78)]">
        {hook && (
          <span className="font-semibold text-[#0158ff]">{hook} </span>
        )}
        {body}
      </p>
    </div>
  );
}

/**
 * Phone: the same mark as punctuation, not as a poster.
 *
 * Stacked at desktop size the four circles cost a screen and a half of scroll
 * for four sentences, and they carry nothing the sentence does not already
 * carry. Set small and to the left of the text they keep the section's rhythm
 * and the whole block reads as one list instead of four posters.
 */
function BenefitRow({
  Icon,
  title,
  hook,
  body,
}: {
  Icon: Mark;
  title: string;
  hook?: string;
  body: ReactNode;
}) {
  return (
    <div className="flex items-start gap-[16px] border-t border-[rgba(0,18,50,0.16)] pt-[22px]">
      <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#001232]">
        <Icon className="h-[25px] w-[25px]" />
      </span>
      <div className="min-w-0">
        <p className="font-[family-name:var(--font-pt-serif)] text-[19px] leading-[26px] font-bold text-[#001232]">
          {title}
        </p>
        <p className="mt-[5px] font-[family-name:var(--font-inter)] text-[16px] leading-[24px] font-normal text-[rgba(0,18,50,0.78)]">
          {hook && (
          <span className="font-semibold text-[#0158ff]">{hook} </span>
        )}
        {body}
        </p>
      </div>
    </div>
  );
}

export function Benefits() {
  return (
    <>
      <div className="mt-[150px] hidden min-[801px]:block">
        <section className="bg-[#f4f1ea] px-[40px] py-0">
          <div className="mx-auto w-full max-w-[1320px]">
            {/* Centred, because the rest of the page runs on a centre line and
                this was the only section off it. The columns below stay ranged
                left: a heading belongs to the spine, body copy needs an edge. */}
            <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[clamp(34px,3vw,52px)] leading-[1.18] font-bold text-[#001232]">
              What Changes You Will Notice.
            </h2>
            <div className="mt-[64px] grid grid-cols-3 items-start gap-[clamp(32px,3.8vw,72px)]">
              {BENEFITS.map((benefit) => (
                <BenefitCard
                  key={benefit.id}
                  Icon={benefit.Icon}
                  title={benefit.title}
                  hook={"hook" in benefit ? benefit.hook : undefined}
                  body={benefit.body}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="max-[800px]:block min-[801px]:hidden">
        <section className="mt-[65px] px-[5px] py-[20px]">
          <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[36px] leading-[42px] font-bold text-[#001232]">
            What Changes
            <br />
            You Will Notice.
          </h2>
        </section>
        <section className="mt-[28px] flex flex-col gap-[22px] px-[20px] pb-[10px]">
          {BENEFITS.map((benefit) => (
            <BenefitRow
              key={benefit.id}
              Icon={benefit.Icon}
              title={benefit.title}
              hook={"hook" in benefit ? benefit.hook : undefined}
              body={benefit.body}
            />
          ))}
        </section>
      </div>
    </>
  );
}
