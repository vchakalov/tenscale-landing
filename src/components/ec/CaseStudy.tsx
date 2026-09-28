import Image from "next/image";

/**
 * One account, before and after, told in its own numbers.
 *
 * The wall above is volume: it is for the visitor who scrolls and judges by how
 * much there is. This is for the one who reads. Every figure here is on the
 * screenshot below it, in Ads Manager's own compare view, so nothing on the
 * page asks to be taken on trust. The annotated before/after of the same
 * account already opens the wall above; this shows the raw comparison instead
 * of repeating it. The campaign names in it are what the paragraph
 * describes, and nothing is described that is not in them.
 */
const FIGURES = [
  {
    before: "$24.48",
    after: "$14.69",
    label: "cost per lead",
    changed: true,
  },
  {
    before: "270",
    after: "446",
    label: "leads a month",
    changed: true,
  },
  {
    before: "$6,609",
    after: "$6,551",
    label: "spent, the same budget",
    changed: false,
  },
] as const;

export function CaseStudy() {
  return (
    <section className="bg-[#f4f1ea] px-[40px] pt-[130px] max-[800px]:px-[14px] max-[800px]:pt-[72px]">
      <div className="mx-auto w-full max-w-[1080px]">
        <p className="text-center font-[family-name:var(--font-inter)] text-[13px] leading-[18px] font-medium tracking-[0.12em] text-[rgba(0,18,50,0.5)] uppercase">
          One account, up close
        </p>
        <h2 className="mt-[12px] text-center font-[family-name:var(--font-pt-serif)] text-[clamp(30px,3vw,52px)] leading-[1.18] font-bold text-[#001232] max-[800px]:text-[32px] max-[800px]:leading-[38px]">
          Same Budget.{" "}
          <span className="text-[#0158ff]">40% Cheaper Leads.</span>
        </h2>

        <div className="mt-[44px] grid grid-cols-3 gap-[18px] max-[800px]:mt-[28px] max-[800px]:grid-cols-1 max-[800px]:gap-[12px]">
          {FIGURES.map((figure) => (
              <div
                key={figure.label}
                className="rounded-[16px] border-[1.5px] border-[#001232] bg-[#f4f1ea] px-[22px] py-[22px] text-center shadow-[0_10px_0_0_rgba(0,18,50,0.12)]"
              >
                <p className="font-[family-name:var(--font-pt-serif)] text-[clamp(24px,2.2vw,38px)] leading-[1.15] font-bold text-[#001232] tabular-nums">
                  {/* Spend did not change, so it is not struck through: a
                    crossed-out number reads as "we cut this", which is the
                    opposite of the point. */}
                  <span
                    className={`text-[rgba(0,18,50,0.4)] ${figure.changed ? "line-through decoration-[1.5px]" : ""}`}
                  >
                    {figure.before}
                  </span>{" "}
                  <span className="text-[#0158ff]">
                    {figure.changed ? "\u2192" : "\u2248"}
                  </span>{" "}
                  {figure.after}
                </p>
                <p className="mt-[8px] font-[family-name:var(--font-inter)] text-[17px] leading-[24px] text-[rgba(0,18,50,0.7)]">
                  {figure.label}
                </p>
              </div>
          ))}
        </div>

        <p className="mx-auto mt-[36px] max-w-[820px] text-center text-pretty font-[family-name:var(--font-inter)] text-[clamp(18px,1.3vw,21px)] leading-[1.65] text-[rgba(0,18,50,0.8)]">
          In March the account ran three broad campaigns. By June it ran four,
          each built for one kind of buyer with its own funnel: a quiz page, a
          video page for parents and caregivers, a lead form for warm engagers,
          and a local offer within 25 miles. Spend stayed at about $6,600 a month
          while leads went from 270 to 446.
        </p>

        <a
          href="/proof/cpl-compare.webp"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-[36px] block max-w-[900px] overflow-hidden rounded-[14px] border-[1.5px] border-[#001232] shadow-[0_10px_0_0_rgba(0,18,50,0.12)]"
        >
          <Image
            src="/proof/cpl-compare.webp"
            width={1400}
            height={541}
            alt="Ads Manager comparing June with March: the three broad campaigns off, four segmented campaigns on, 446 leads against 270 and $14.69 per lead against $24.48"
            className="block h-auto w-full"
          />
        </a>
        <p className="mt-[12px] text-center font-[family-name:var(--font-inter)] text-[14px] leading-[20px] text-[rgba(0,18,50,0.5)]">
          Click to open it full size.
        </p>
      </div>
    </section>
  );
}
