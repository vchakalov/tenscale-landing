/**
 * What happens between now and a decision, and what it is guaranteed by.
 *
 * A timeline rather than a paragraph, because the visitor comes back to this
 * block the day before the call to check what they agreed to, and a list of
 * four moments is found again at a glance. It is left open, not boxed: the
 * page already has enough containers, and this block is for reading.
 *
 * The guarantee closes the page as the one filled navy panel after the fold,
 * on its own. It is the last objection a buyer carries into the call ("what
 * if it does not work for us?"). The wording must match the VSL: two months,
 * all of the money back.
 */
const MOMENTS = [
  {
    when: "Right now",
    what: "A text from +1 (305) 589-2275 and a confirmation email. Accept the calendar invitation in it.",
  },
  {
    when: "A day before, and an hour before",
    what: "A reminder with the Google Meet link, so you don't have to look for it.",
  },
  {
    when: "Our call · 30 minutes",
    what: "You walk me through how your agency delivers today. I tell you honestly whether Tenscale is a fit. No logins, no pitch deck.",
  },
  {
    when: "If it fits · 45 minutes",
    what: "A second call on one of your real client accounts, so you see exactly what the next 30 days look like before you decide.",
  },
] as const;

export function NextSteps() {
  return (
    <section className="bg-[#f4f1ea] px-[40px] pt-[130px] max-[800px]:px-[14px] max-[800px]:pt-[72px]">
      <div className="mx-auto w-full max-w-[1080px]">
        <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[clamp(30px,3vw,52px)] leading-[1.18] font-bold text-[#001232] max-[800px]:text-[32px] max-[800px]:leading-[38px]">
          What Happens Next.
        </h2>

        <ol className="mx-auto mt-[48px] max-w-[820px] max-[800px]:mt-[28px]">
          {MOMENTS.map((moment, index) => (
            <li
              key={moment.when}
              className="relative flex gap-[20px] pb-[30px] text-left last:pb-0"
            >
              {index < MOMENTS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-[34px] bottom-0 left-[16px] w-[1.5px] bg-[rgba(0,18,50,0.2)]"
                />
              )}
              <span className="relative flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#001232] bg-[#f4f1ea] font-[family-name:var(--font-pt-serif)] text-[16px] leading-none font-bold text-[#001232]">
                {index + 1}
              </span>
              <div className="min-w-0 pt-[4px]">
                <p className="font-[family-name:var(--font-pt-serif)] text-[clamp(19px,1.45vw,24px)] leading-[1.3] font-bold text-[#001232]">
                  {moment.when}
                </p>
                <p className="mt-[6px] text-pretty font-[family-name:var(--font-inter)] text-[clamp(17px,1.25vw,20px)] leading-[1.6] text-[rgba(0,18,50,0.75)]">
                  {moment.what}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-[64px] max-w-[900px] rounded-[16px] bg-[#001232] px-[clamp(24px,3vw,56px)] py-[clamp(30px,3vw,48px)] text-center shadow-[0_10px_0_0_rgba(0,18,50,0.12)] max-[800px]:mt-[44px]">
          <p className="font-[family-name:var(--font-inter)] text-[13px] leading-[18px] font-medium tracking-[0.12em] text-[rgba(244,241,234,0.6)] uppercase">
            Our guarantee
          </p>
          <p className="mt-[12px] text-balance font-[family-name:var(--font-pt-serif)] text-[clamp(26px,2.5vw,44px)] leading-[1.2] font-bold text-[#f4f1ea]">
            Two Months. Or 100% Of Your Money Back.
          </p>
          <p className="mx-auto mt-[14px] max-w-[640px] text-pretty font-[family-name:var(--font-inter)] text-[clamp(17px,1.25vw,20px)] leading-[1.6] text-[rgba(244,241,234,0.8)]">
            If after two months you don&apos;t believe Tenscale helps your
            agency, you get every dollar back. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
