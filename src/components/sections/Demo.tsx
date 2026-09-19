'use client';

import { BookCallButton } from '@/components/agentica/CtaButtons';

export function Demo() {
  return (
    <section className="section-full py-24 md:py-28 overflow-hidden" id="video">
      <div className="container-small flex flex-col gap-12">
        <div className="flex flex-col lg:items-start lg:justify-between gap-6">
          <p className="text-black sm:text-5xl sm:leading-5xl text-4xl leading-4xl font-serif">
            See Agentica in action
          </p>
          <div className="w-full flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
            <p className="text-neutral-dark leading-[1.55] sm:max-w-[416px]">
              Watch how Agentica turns one angle into a personalized, message-matched funnel.
            </p>
            <div className="grid grid-cols-1 max-sm:w-full">
              <BookCallButton>Book a personal demo</BookCallButton>
            </div>
          </div>
        </div>
        <div className="relative w-full max-w-[1078px]">
          <div className="absolute -inset-4 opacity-70 rounded-3xl bg-linear-to-r from-[#E7EDFB] to-[#E7EDFB] blur-lg" />
          <div className="relative">
            <img
              src="/images/agentica/demo-funnel.png"
              alt="Agentica funnel builder"
              width={2752}
              height={1536}
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
