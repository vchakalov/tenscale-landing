'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'What exactly does Tenscale do?',
    answer:
      "Tenscale builds a personalized ad funnel for each angle: fresh creatives plus a landing page that matches the ad's exact promise. Then it runs and optimizes the ads for you, so the same message carries from the first impression all the way to checkout.",
  },
  {
    question: 'How is this different from an agency?',
    answer:
      "It's an engine, not hours. Instead of one team working one funnel, Tenscale scales across many angles at once and never stops testing and optimizing.",
  },
  {
    question: 'Do I need to rebuild my landing page?',
    answer:
      'No. One line of code lets Tenscale read your existing page and rewrite only the persuasion copy for each angle. It never changes your facts, prices or page structure.',
  },
  {
    question: 'Does it touch my ad account directly?',
    answer:
      'Yes, securely through the official Meta API. You stay in control at all times and can approve, pause or stop anything.',
  },
  {
    question: "What does '+300% conversion' actually mean?",
    answer:
      'Message-matched pages can lift conversion by up to roughly 3 times, because the buyer feels the funnel was built specifically for them. Results always vary by offer and audience.',
  },
  {
    question: 'How do we start?',
    answer:
      'Book a call. We review your offer, angles and current funnel, then set up your first personalized funnels.',
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-full bg-(--ec-bg) py-12 md:py-20 lg:py-28" id="faq">
      <div className="container-default flex flex-col items-start gap-8 md:gap-12 lg:gap-20">
        <div className="flex-col items-end self-stretch max-w-6xl mx-auto flex relative">
          <div className="flex flex-col lg:flex-row items-start gap-8 md:gap-12 lg:gap-20 relative self-stretch w-full">
            <div className="flex flex-col items-start relative flex-1 self-stretch">
              <h2 className="font-[family-name:var(--font-libre-baskerville)] font-bold text-[32px] sm:text-[48px] leading-[1.15] tracking-tight relative self-stretch text-(--ec-ink)">
                Questions, <span className="ec-mark">answered.</span>
              </h2>
              <div className="font-[family-name:var(--font-inter)] font-normal text-[15px] sm:text-[17px] leading-[24px] sm:leading-[27px] mt-4 text-[rgba(var(--ec-ink-rgb),0.7)]">
                Still have a question? Ask it on the call.
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-[616px] items-start relative">
              <div className="w-full border-b-[1.5px] border-[rgba(var(--ec-ink-rgb),0.85)]" data-orientation="vertical">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div
                      key={faq.question}
                      data-state={isOpen ? 'open' : 'closed'}
                      data-orientation="vertical"
                      className={
                        index === 0
                          ? 'border-t-[1.5px] border-[rgba(var(--ec-ink-rgb),0.85)]'
                          : 'border-t border-[rgba(var(--ec-ink-rgb),0.2)]'
                      }
                    >
                      <h3 data-orientation="vertical" data-state={isOpen ? 'open' : 'closed'} className="flex">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          data-state={isOpen ? 'open' : 'closed'}
                          data-orientation="vertical"
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                          className="group flex flex-1 items-center justify-between gap-6 md:gap-12 px-0 py-6 md:py-7 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--ec-ink)"
                        >
                          <span className="font-[family-name:var(--font-libre-baskerville)] font-bold text-[17px] sm:text-[20px] leading-[1.35] flex-1 text-left text-(--ec-ink)">
                            {faq.question}
                          </span>
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-(--ec-ink) text-(--ec-ink) transition-colors duration-200 ${
                              isOpen ? 'bg-(--ec-accent)' : 'bg-transparent group-hover:bg-[rgba(var(--ec-accent-rgb),0.45)]'
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </span>
                        </button>
                      </h3>
                      {isOpen && (
                        <div role="region" data-orientation="vertical" className="overflow-hidden">
                          <div className="pt-0 pb-6 md:pb-7 pr-12 md:pr-[84px]">
                            <div className="font-[family-name:var(--font-inter)] font-normal text-[15px] sm:text-[17px] leading-[24px] sm:leading-[27px] text-[rgba(var(--ec-ink-rgb),0.7)]">
                              {faq.answer}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
