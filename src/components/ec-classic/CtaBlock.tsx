import { CtaButton } from "./CtaButton";

/**
 * Social proof under the button.
 *
 * Three numbers rather than a logo wall: the wall wrapped to three rows on a
 * phone and ate more of the fold than the player it was meant to support. Each
 * number answers a different doubt, so the order is deliberate: scale of the
 * book, throughput of the machine, size of the money it is trusted with.
 *
 * "Thousands" is a word where the others are numerals because we will not
 * invent a precise daily figure the business does not actually claim.
 *
 * No rules between the columns. Three hairlines plus three numbers plus three
 * labels is nine things in a 40px strip; space separates them better.
 */
const PROOF_STATS = [
  { value: "300+", label: "client accounts managed" },
  { value: "Thousands", label: "of new ads launched daily" },
  { value: "$3M+", label: "in monthly Meta ad spend" },
] as const;

export function ProofStats({
  valueClass,
  labelClass,
  gapClass,
}: {
  valueClass: string;
  labelClass: string;
  gapClass: string;
}) {
  return (
    <div className={`flex items-start justify-center ${gapClass}`}>
      {PROOF_STATS.map((stat) => (
        <div key={stat.value} className="min-w-0 text-center">
          <p className={valueClass}>{stat.value}</p>
          <p className={labelClass}>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * The ask, repeated down the page.
 *
 * The button and nothing else. The closing block used to be a dark panel with a
 * notice pill, a headline, body copy and a guarantee, which ended the page on a
 * second pitch rather than on an ask. The three numbers live in the fold, where
 * they are read once; repeating them under every button wears them out.
 */
export function CtaBlock() {
  return (
    <section className="mt-[130px] px-[40px] max-[800px]:mt-[64px] max-[800px]:px-[20px]">
      <div className="mx-auto w-full max-w-[1120px] text-center">
        <CtaButton
          variant="blueRaised"
          className="px-[clamp(30px,2.6vw,46px)] py-[clamp(12px,1vw,17px)] text-[clamp(16px,1.25vw,21px)] leading-[1.5] max-[800px]:rounded-[50px]"
        >
          Book Free Demo
        </CtaButton>
      </div>
    </section>
  );
}
