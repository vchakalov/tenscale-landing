import { BookCallButton } from '@/components/v2/CtaButtons'

export function Pricing() {
  return (
    <section className="section-full bg-(--ec-bg)" id="pricing">
      <div className="container-default">
        <div className="flex flex-col items-start relative w-full rounded-[24px] border-[1.5px] border-solid border-(--ec-ink) bg-(--ec-bg)">
          <div className="flex-col gap-12 lg:gap-20 pt-16 lg:pt-20 pb-0 px-4 lg:px-16 flex items-center relative self-stretch w-full flex-[0_0_auto]">
            <h2 className="text-balance font-[family-name:var(--font-libre-baskerville)] font-bold text-[32px] lg:text-[48px] leading-[1.15] tracking-tight text-center max-w-[700px] text-(--ec-ink)">
              How we <span className="ec-mark">start working together</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-12 lg:gap-20 pt-16 lg:pt-20 pb-16 lg:pb-[88px] px-4 lg:px-16 relative self-stretch w-full flex-[0_0_auto]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 relative self-stretch w-full">
              {/* Step 2 - We build your engine (featured) */}
              <div className="v2-dark flex flex-col items-start gap-6 p-6 flex-1 grow order-1 lg:order-2 rounded-[20px] border-[1.5px] border-(--ec-ink) shadow-[0_8px_0_0_var(--ec-shadow)]">
                <div className="inline-flex items-center rounded-full bg-(--ec-accent) px-3 py-1 font-[family-name:var(--font-inter)] text-[13px] leading-[18px] font-semibold text-(--ec-ink)">
                  Step 2
                </div>
                <div className="flex flex-col p-0 space-y-1">
                  <h3 className="font-[family-name:var(--font-libre-baskerville)] font-bold text-[20px] sm:text-[24px] leading-[1.25] text-(--ec-on-frame)">
                    We build your engine
                  </h3>
                </div>
                <div className="p-0 flex flex-col flex-1 self-stretch w-full">
                  <p className="font-[family-name:var(--font-inter)] font-normal text-[16px] sm:text-[17px] leading-[1.6] text-[rgba(var(--ec-on-frame-rgb),0.75)]">
                    In a few working sessions we map your product, the problems it solves and your audiences, then build the ideal angle, creative, page and automation setup for your needs.
                  </p>
                </div>
                <div className="flex p-0 flex-col items-start gap-3 relative self-stretch w-full">
                  <BookCallButton className="w-full" />
                </div>
              </div>
              {/* Step 1 - Book a call */}
              <div className="v2-card mt-0 lg:mt-10 flex flex-col items-start gap-6 p-6 flex-1 grow order-2 lg:order-1">
                <div className="flex flex-col p-0 space-y-1">
                  <h3 className="font-[family-name:var(--font-libre-baskerville)] font-bold text-[20px] sm:text-[24px] leading-[1.25] text-(--ec-ink)">
                    Book a call
                  </h3>
                </div>
                <div className="p-0 flex flex-col flex-1 self-stretch w-full">
                  <p className="font-[family-name:var(--font-inter)] font-normal text-[16px] sm:text-[17px] leading-[1.6] text-[rgba(var(--ec-ink-rgb),0.7)]">
                    You book a call and we look at your offer, angles and current funnel.
                  </p>
                </div>
              </div>
              {/* Step 3 - We optimize and scale */}
              <div className="v2-card mt-0 lg:mt-10 flex flex-col items-start gap-6 p-6 flex-1 grow order-3 lg:order-3">
                <div className="flex flex-col p-0 space-y-1">
                  <h3 className="font-[family-name:var(--font-libre-baskerville)] font-bold text-[20px] sm:text-[24px] leading-[1.25] text-(--ec-ink)">
                    We optimize and scale
                  </h3>
                </div>
                <div className="p-0 flex flex-col flex-1 self-stretch w-full">
                  <p className="font-[family-name:var(--font-inter)] font-normal text-[16px] sm:text-[17px] leading-[1.6] text-[rgba(var(--ec-ink-rgb),0.7)]">
                    New winning angles compound while automation pauses the losers, so results grow with minimal risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
