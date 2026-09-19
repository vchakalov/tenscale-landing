'use client'

import { BookCallButton } from '@/components/agentica/CtaButtons'

export function Pricing() {
  return (
    <section className="section-full" id="pricing">
      <div className="container-default">
        <div className="flex flex-col items-start relative w-full rounded-3xl overflow-hidden border border-solid border-[#071B3D0d] bg-[linear-gradient(179deg,rgba(255,255,255,1)_0%,rgba(253,231,233,1)_84%)]">
          <div className="flex-col gap-12 lg:gap-20 pt-16 lg:pt-20 pb-0 px-2.5 lg:px-16 flex items-center relative self-stretch w-full flex-[0_0_auto]">
            <h2 className="font-serif text-[36px] lg:text-[56px] text-center font-light leading-[40px] lg:leading-[68px] max-w-[700px]">
              How we start working together
            </h2>
          </div>
          <div className="flex flex-col items-start gap-12 lg:gap-20 pt-16 lg:pt-20 pb-16 lg:pb-[88px] px-4 lg:px-16 relative self-stretch w-full flex-[0_0_auto]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative self-stretch w-full">
              {/* Step 2 - We build your engine (featured) */}
              <div className="flex flex-col items-center gap-2 pt-2 pb-0 px-0 relative flex-1 grow order-1 lg:order-2 rounded-3xl shadow-xl bg-[linear-gradient(108deg,rgba(17,17,17,1)_0%,rgba(17,17,17,1)_36%,rgba(253,176,184,1)_100%)]">
                <div className="font-[family-name:var(--font-inter)] text-[14px] sm:text-[16px] leading-[18px] sm:leading-[26px] font-medium text-white">
                  Step 2
                </div>
                <div className="flex items-start justify-center grow-1 gap-2 relative self-stretch w-full flex-[0_0_auto] rounded-3xl overflow-hidden bg-white">
                  <div className="rounded-xl border border-[#071B3D0d] flex flex-col items-start gap-6 p-6 flex-1 grow relative h-full border-none bg-linear-[25deg,white_70%,transparent_140%]">
                    <div className="flex flex-col p-0 space-y-1 z-10">
                      <div className="font-[family-name:var(--font-inter)] font-medium text-[18px] sm:text-[24px] leading-[26px] sm:leading-[32px] relative self-stretch text-gray-500">
                        We build your engine
                      </div>
                    </div>
                    <div className="p-0 flex flex-col flex-1 self-stretch w-full z-10">
                      <div className="font-[family-name:var(--font-inter)] font-medium text-[16px] sm:text-[18px] leading-[20px] sm:leading-[28px] !font-normal relative self-stretch text-gray-600">
                        In a few working sessions we map your product, the problems it solves and your audiences, then build the ideal angle, creative, page and automation setup for your needs.
                      </div>
                    </div>
                    <div className="flex p-0 flex-col items-start gap-3 relative self-stretch w-full z-10">
                      <BookCallButton className="w-full" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Step 1 - Book a call */}
              <div className="border border-solid border-[#071B3D0d] mt-0 lg:mt-10 flex flex-col items-start gap-6 p-6 flex-1 grow order-2 lg:order-1 bg-white rounded-3xl shadow-xl">
                <div className="flex flex-col p-0 space-y-1 z-10">
                  <div className="font-[family-name:var(--font-inter)] font-medium text-[18px] sm:text-[24px] leading-[26px] sm:leading-[32px] relative self-stretch text-gray-500">
                    Book a call
                  </div>
                </div>
                <div className="p-0 flex flex-col flex-1 self-stretch w-full z-10">
                  <div className="font-[family-name:var(--font-inter)] font-medium text-[16px] sm:text-[18px] leading-[20px] sm:leading-[28px] !font-normal relative self-stretch text-gray-600">
                    You book a call and we look at your offer, angles and current funnel.
                  </div>
                </div>
              </div>
              {/* Step 3 - We optimize and scale */}
              <div className="border border-solid border-[#071B3D0d] mt-0 lg:mt-10 flex flex-col items-start gap-6 p-6 flex-1 grow order-3 lg:order-3 bg-white rounded-3xl shadow-xl">
                <div className="flex flex-col p-0 space-y-1 z-10">
                  <div className="font-[family-name:var(--font-inter)] font-medium text-[18px] sm:text-[24px] leading-[26px] sm:leading-[32px] relative self-stretch text-gray-500">
                    We optimize and scale
                  </div>
                </div>
                <div className="p-0 flex flex-col flex-1 self-stretch w-full z-10">
                  <div className="font-[family-name:var(--font-inter)] font-medium text-[16px] sm:text-[18px] leading-[20px] sm:leading-[28px] !font-normal relative self-stretch text-gray-600">
                    New winning angles compound while automation pauses the losers, so results grow with minimal risk.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
