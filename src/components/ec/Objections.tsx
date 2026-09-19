/**
 * The objections.
 *
 * Order matters and is not the order they occur to us. Category scepticism
 * ("another AI tool") sits third because it is the first thing an owner who has
 * tried AdCreative or ChatGPT actually thinks, and nothing below it gets read
 * until it is answered.
 *
 * Visually this reuses the source's numbered-row rhythm from "This Is How We
 * Work": hairline rule, navy disc, serif question, Inter body. The disc is
 * hidden on a phone, where it is decoration and the column it occupies is worth
 * a line or two off every answer.
 */

const OBJECTIONS = [
  {
    question: "Will the creatives actually be good?",
    answer: [
      "No generic AI. We have a dedicated team of AI engineers focused solely on making better ads. They study millions of data points and break winning creatives down across dozens of variables, from the hook and promise to the visual, format, audience, and everything in between.",
    ],
  },
  {
    question: "Can I trust automation with my clients' ad spend?",
    answer: [
      "You stay in control. You set the rules, budgets, and limits. The system handles the repetitive work, testing, pausing, launching, and scaling campaigns within those rules. It runs through Meta's official APIs, so AI never gets control of your budgets.",
    ],
  },
  {
    question: "Isn't this just another AI tool?",
    answer: [
      "No. AI creative is only 10% of what happens inside the system.",
      "The other 90% is the infrastructure behind it: connecting your angles to creatives, landing pages, campaigns, testing, and scaling, so the whole process works as one system instead of a pile of separate tools.",
    ],
  },
  {
    question: "Will this work for all my clients?",
    answer: [
      "Absolutely. It doesn't matter if your clients are HVAC companies, plumbers, insurance brokers, dentists, roofers, ecom brands, or something completely different.",
      "You don't need a different system for every niche. Run all your clients through the same engine.",
    ],
  },
] as const;

function ObjectionRow({
  index,
  question,
  answer,
}: {
  index: number;
  question: string;
  answer: readonly string[];
}) {
  return (
    <div className="border-t border-[#001232] pt-[36px] max-[800px]:pt-[22px]">
      <div className="flex items-start gap-[28px]">
        <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-[#001232] font-[family-name:var(--font-pt-serif)] text-[28px] font-bold text-[#f4f1ea] max-[800px]:hidden">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0">
          <h3 className="font-[family-name:var(--font-pt-serif)] text-[30px] leading-[38px] font-bold text-[#001232] max-[800px]:text-[24px] max-[800px]:leading-[32px]">
            &ldquo;{question}&rdquo;
          </h3>

          {answer.map((paragraph, i) => (
            <p
              key={paragraph}
              className={`${i === 0 ? "mt-[16px]" : "mt-[14px]"} font-[family-name:var(--font-inter)] text-[17px] leading-[27px] font-normal text-[rgba(0,18,50,0.8)] max-[800px]:text-[17px] max-[800px]:leading-[27px]`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Objections() {
  return (
    <section
      id="objections"
      className="mt-[150px] px-[40px] max-[800px]:mt-[70px] max-[800px]:px-[20px]"
    >
      <div className="mx-auto w-full max-w-[905px]">
        <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[48px] leading-[56px] font-bold text-[#001232] max-[800px]:text-[36px] max-[800px]:leading-[42px]">
          What You Are Probably Thinking:
        </h2>

        <div className="mt-[56px] flex flex-col gap-[48px] max-[800px]:mt-[26px] max-[800px]:gap-[26px]">
          {OBJECTIONS.map((item, i) => (
            <ObjectionRow
              key={item.question}
              index={i}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
