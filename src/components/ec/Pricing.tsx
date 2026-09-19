import { CtaButton } from "./CtaButton";

const CHECKLIST = [
  "A fit call. We see if we can help.",
  "If we can, we run the assessment. Someone from our team goes into your business.",
  "In five days you get a written report. What AI can do. What each change is worth. How much money you can save or make.",
  "We find at least $50,000 a year. Money you save, or money you make.",
  "If we don't, the assessment is free.",
  "You leave with a plan. You do it, or we do.",
] as const;

const BODY_COPY =
  "Once filled, we won't be accepting new projects for the next 12 months. By the time you next visit this page, the opportunity may be gone.";

function NoticePill() {
  return (
    <div className="ec-notice-box">
      <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#ff3b30]" />
      <span className="font-[family-name:var(--font-inter)] text-[16px] leading-normal font-normal tracking-[-0.32px] text-[#000000]">
        Only <strong className="font-semibold">2 spots left</strong>
      </span>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-[3px] h-[22px] w-[22px] shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="11" fill="#EDE8DF" />
      <path
        d="M7 12.5l3 3 7-7"
        fill="none"
        stroke="#0A0908"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Heading({ className }: { className: string }) {
  return (
    <h2 className={className}>
      Scale Your Business.
      <br />
      Become <span className="underline">AI-FIRST</span> Company
    </h2>
  );
}

export function Pricing() {
  return (
    <>
      <div className="mt-[200px] hidden min-[801px]:block">
        <section className="p-0">
          <div className="mx-auto w-full max-w-[1120px]">
            <div className="rounded-[20px] border-2 border-[#EDE8DF] bg-transparent px-[150px] py-[100px] shadow-[0_1px_5px_0_rgba(0,0,0,0.4)]">
              {/*
                Source geometry: the headline/checklist block is a 725px column
                centred inside the card's 820px content box, so it sits 48px in
                from the padding edge (measured live: inset 198px on a card with
                150px padding). Without this the copy hugs the left border.
              */}
              <div className="mx-auto w-[725px]">
              <Heading className="font-[family-name:var(--font-pt-serif)] text-[56px] leading-[64px] font-bold text-[#EDE8DF]" />

              <p className="mt-[28px] font-[family-name:var(--font-pt-serif)] text-[22px] leading-[30px] text-[#EDE8DF]">
                This is how we work.
              </p>

              <ul className="mt-[32px] flex flex-col gap-[22px]">
                {CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-[14px]">
                    <CheckIcon />
                    <span className="font-[family-name:var(--font-pt-serif)] text-[22px] leading-[30px] font-normal text-[#EDE8DF]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-[56px] font-[family-name:var(--font-pt-serif)] text-[40px] leading-[48px] font-bold text-[#EDE8DF]">
                If we don&apos;t find at least $50,000 a year, the assessment is free.
              </h3>
              <p className="mt-[20px] font-[family-name:var(--font-inter)] text-[16px] leading-[22px] font-normal text-[#EDE8DF]">
                Money you save, or money you make.
              </p>

              </div>

              <div className="mx-auto mt-[115px] w-[816px] rounded-[10px] bg-[#EDE8DF] pt-[75px] pr-[75px] pb-[85px] pl-[75px]">
                <NoticePill />

                <h2 className="mt-[32px] text-left font-[family-name:var(--font-pt-serif)] text-[62px] leading-[72px] font-normal text-[#0A0908]">
                  Book a Call <span className="font-bold underline">TODAY</span>
                </h2>

                <p className="mt-[27px] max-w-[558px] text-left font-[family-name:var(--font-poppins)] text-[22px] leading-[35px] font-normal text-[#0A0908]">
                  {BODY_COPY}
                </p>

                <div className="mt-[62px]">
                  <CtaButton variant="cream">Let&apos;s talk</CtaButton>
                </div>

                <span className="mt-[16px] block text-left font-[family-name:var(--font-inter)] text-[10px] leading-[14px] font-normal text-[#0A0908]">
                  Limited spots available.
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="max-[800px]:block min-[801px]:hidden">
        <section className="mt-[80px] px-[15px] pt-0 pb-[80px]">
          <div className="rounded-[10px] border border-[#EDE8DF] bg-transparent px-[30px] py-[40px] shadow-[0_1px_5px_0_rgba(0,0,0,0.2)]">
            <Heading className="text-left font-[family-name:var(--font-pt-serif)] text-[40px] leading-[46px] font-bold text-[#EDE8DF]" />

            <p className="mt-[24px] font-[family-name:var(--font-pt-serif)] text-[20px] leading-[28px] text-[#EDE8DF]">
              This is how we work.
            </p>

            <ul className="mt-[32px] flex flex-col gap-[22px]">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-[12px]">
                  <CheckIcon />
                  <span className="font-[family-name:var(--font-pt-serif)] text-[20px] leading-[28px] font-normal text-[#EDE8DF]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="mt-[46px] text-left font-[family-name:var(--font-pt-serif)] text-[28px] leading-[36px] font-bold text-[#EDE8DF]">
              If we don&apos;t find at least $50,000 a year, the assessment is free.
            </h3>
            <p className="mt-[20px] text-left font-[family-name:var(--font-inter)] text-[16px] leading-[22px] font-normal text-[#EDE8DF]">
              Money you save, or money you make.
            </p>

            <div className="mt-[115px] w-full rounded-[7px] bg-[#EDE8DF] px-[30px] py-[20px]">
              <NoticePill />

              <h2 className="mt-[32px] text-left font-[family-name:var(--font-pt-serif)] text-[36px] leading-[48px] font-bold text-[#0A0908]">
                Book a Call <span className="underline">TODAY</span>
              </h2>

              <p className="mt-[27px] text-left font-[family-name:var(--font-inter)] text-[18px] leading-[24px] font-normal text-[#0A0908]">
                {BODY_COPY}
              </p>

              <div className="mt-[62px]">
                <CtaButton
                  variant="cream"
                  className="block w-[238px] px-0 py-[15px] text-[16px] leading-[20px]"
                >
                  Let&apos;s talk
                </CtaButton>
              </div>

              <span className="mt-[16px] block text-center font-[family-name:var(--font-inter)] text-[9px] leading-[12px] font-normal text-[#0A0908]">
                Limited spots available
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
