'use client';

import { BookCallButton } from '@/components/v2/CtaButtons';

export function Demo() {
  return (
    <section className="section-full py-24 md:py-28 overflow-hidden" id="video">
      <div className="container-small flex flex-col gap-12">
        <div className="flex flex-col lg:items-start lg:justify-between gap-6">
          <p className="text-(--ec-ink) font-[family-name:var(--font-libre-baskerville)] font-bold text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-tight">
            See Tenscale <span className="ec-mark">in action</span>
          </p>
          <div className="w-full flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
            <p className="font-[family-name:var(--font-inter)] text-[rgba(var(--ec-ink-rgb),0.7)] leading-[1.55] sm:max-w-[416px]">
              Watch how Tenscale turns one angle into a personalized, message-matched funnel.
            </p>
            <div className="grid grid-cols-1 max-sm:w-full">
              <BookCallButton>Book a personal demo</BookCallButton>
            </div>
          </div>
        </div>
        <div className="relative w-full max-w-[1078px]">
          <div className="relative">
            <img
              src="/images/tenscale/demo-funnel.png"
              alt="Tenscale funnel builder"
              width={2752}
              height={1536}
              className="v2-frame w-full h-auto shadow-[0_8px_0_0_var(--ec-shadow)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
