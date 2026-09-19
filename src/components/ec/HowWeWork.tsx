function StepNumber({ n }: { n: string }) {
  return (
    <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-[#F5F5F5] font-[family-name:var(--font-pt-serif)] text-[28px] font-bold text-[#0B0B0B] max-[800px]:h-[48px] max-[800px]:w-[48px] max-[800px]:text-[16px]">
      {n}
    </span>
  );
}

function OperationMap() {
  return (
    <svg
      viewBox="0 0 420 320"
      className="mx-auto h-auto w-[420px] max-w-full"
      aria-hidden="true"
    >
      <line
        x1="210"
        y1="20"
        x2="210"
        y2="300"
        stroke="#F5F5F5"
        strokeWidth="2"
      />
      <line
        x1="40"
        y1="160"
        x2="380"
        y2="160"
        stroke="#F5F5F5"
        strokeWidth="2"
      />
      <circle cx="300" cy="90" r="36" fill="#F5F5F5" />
      <text
        x="338"
        y="58"
        fill="#F5F5F5"
        fontFamily="Georgia, serif"
        fontSize="16"
      >
        You
      </text>
      <path d="M328 68 L300 82" stroke="#F5F5F5" strokeWidth="1.5" fill="none" />
      <text
        x="52"
        y="198"
        fill="#F5F5F5"
        fontFamily="Georgia, serif"
        fontSize="13"
      >
        Day-to-day work
      </text>
      <circle cx="88" cy="228" r="10" fill="#F5F5F5" />
      <circle cx="132" cy="252" r="10" fill="#F5F5F5" />
      <circle cx="108" cy="278" r="10" fill="#F5F5F5" />
      <circle cx="164" cy="222" r="10" fill="#F5F5F5" />
      <circle cx="156" cy="270" r="10" fill="#F5F5F5" />
      <circle cx="72" cy="258" r="10" fill="#F5F5F5" />
      <circle cx="186" cy="248" r="10" fill="#F5F5F5" />
    </svg>
  );
}

export function HowWeWork() {
  return (
    <>
      <div className="mt-[70px] hidden min-[801px]:block">
        <section className="px-[40px] pt-[50px] pb-[43px]">
          <div className="mx-auto w-full max-w-[905px]">
            <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[48px] leading-[56px] font-bold text-[#F5F5F5]">
              This Is How We Work:
            </h2>

            <div className="mt-[72px]">
              <div className="border-t border-[#F5F5F5] pt-[36px] pb-[48px]">
                <div className="flex items-center gap-[28px]">
                  <StepNumber n="01" />
                  <h3 className="font-[family-name:var(--font-pt-serif)] text-[32px] leading-[40px] font-bold text-[#F5F5F5]">
                    We analyze the day-to-day operations
                  </h3>
                </div>
                <div className="mt-[48px]">
                  <OperationMap />
                </div>
                <p className="mt-[36px] text-center font-[family-name:var(--font-pt-serif)] text-[22px] leading-[30px] text-[#F5F5F5]">
                  <strong className="font-bold">
                    The work the company already does.
                  </strong>
                </p>
              </div>

              <div className="border-t border-[#F5F5F5] py-[36px]">
                <div className="flex items-center gap-[28px]">
                  <StepNumber n="02" />
                  <h3 className="font-[family-name:var(--font-pt-serif)] text-[32px] leading-[40px] font-bold text-[#F5F5F5]">
                    We write the assessment: what can be automated, and the ROI
                    on each
                  </h3>
                </div>
              </div>

              <div className="border-y border-[#F5F5F5] py-[36px]">
                <div className="flex items-center gap-[28px]">
                  <StepNumber n="03" />
                  <h3 className="font-[family-name:var(--font-pt-serif)] text-[32px] leading-[40px] font-bold text-[#F5F5F5]">
                    We implement it, or we give you the plan to do it yourself
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="max-[800px]:block min-[801px]:hidden">
        <section className="mt-[65px] px-[20px] py-[20px]">
          <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[40px] leading-[46px] font-bold text-[#F5F5F5]">
            This Is How We Work:
          </h2>
          <div className="mt-[40px]">
            <div className="border-t border-[#F5F5F5] py-[24px]">
              <div className="flex items-start gap-[16px]">
                <StepNumber n="01" />
                <h3 className="font-[family-name:var(--font-pt-serif)] text-[22px] leading-[28px] font-bold text-[#F5F5F5]">
                  We analyze the day-to-day operations
                </h3>
              </div>
              <div className="mt-[24px]">
                <OperationMap />
              </div>
              <p className="mt-[16px] text-center font-[family-name:var(--font-pt-serif)] text-[18px] leading-[24px] text-[#F5F5F5]">
                The work the company already does.
              </p>
            </div>
            <div className="border-t border-[#F5F5F5] py-[24px]">
              <div className="flex items-start gap-[16px]">
                <StepNumber n="02" />
                <h3 className="font-[family-name:var(--font-pt-serif)] text-[22px] leading-[28px] font-bold text-[#F5F5F5]">
                  We write the assessment: what can be automated, and the ROI on
                  each
                </h3>
              </div>
            </div>
            <div className="border-y border-[#F5F5F5] py-[24px]">
              <div className="flex items-start gap-[16px]">
                <StepNumber n="03" />
                <h3 className="font-[family-name:var(--font-pt-serif)] text-[22px] leading-[28px] font-bold text-[#F5F5F5]">
                  We implement it, or we give you the plan to do it yourself
                </h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
