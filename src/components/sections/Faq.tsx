'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'What exactly does Agentica do?',
    answer:
      "Agentica builds a personalized ad funnel for each angle: fresh creatives plus a landing page that matches the ad's exact promise. Then it runs and optimizes the ads for you, so the same message carries from the first impression all the way to checkout.",
  },
  {
    question: 'How is this different from an agency?',
    answer:
      "It's an engine, not hours. Instead of one team working one funnel, Agentica scales across many angles at once and never stops testing and optimizing.",
  },
  {
    question: 'Do I need to rebuild my landing page?',
    answer:
      'No. One line of code lets Agentica read your existing page and rewrite only the persuasion copy for each angle. It never changes your facts, prices or page structure.',
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
      'Book a call or send a message on WhatsApp. We review your offer, angles and current funnel, then set up your first personalized funnels.',
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-full py-12 md:py-20 lg:py-28" id="faq">
      <div className="container-default flex flex-col items-start gap-8 md:gap-12 lg:gap-20">
        <div className="flex-col items-end self-stretch max-w-6xl mx-auto flex relative">
          <div className="flex flex-col lg:flex-row items-start gap-8 md:gap-12 lg:gap-20 relative self-stretch w-full">
            <div className="flex flex-col items-start relative flex-1 self-stretch">
              <h2 className="font-[family-name:var(--font-pt-serif)] text-[30px] sm:text-[48px] leading-[38px] sm:leading-[58px] relative self-stretch font-light sm:font-light">
                Questions, answered.
              </h2>
              <div className="font-[family-name:var(--font-inter)] font-normal text-[14px] sm:text-[16px] leading-[18px] sm:leading-[26px] mt-4 text-foreground-secondary">
                Still have a question?{' '}
                <a
                  href="https://wa.me/359877895554" target="_blank" rel="noopener noreferrer"
                  className="underline hover:no-underline transition-colors cursor-pointer"
                >
                  Message us on WhatsApp
                </a>
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-[616px] items-start relative">
              <div className="w-full" data-orientation="vertical">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div
                      key={faq.question}
                      data-state={isOpen ? 'open' : 'closed'}
                      data-orientation="vertical"
                      className="border-0"
                    >
                      <div className="px-3 md:px-6 py-0">
                        <div className={`border-t border-[#DED8CC] ${isOpen ? 'border-b' : ''}`}>
                          <h3 data-orientation="vertical" data-state={isOpen ? 'open' : 'closed'} className="flex">
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              data-state={isOpen ? 'open' : 'closed'}
                              data-orientation="vertical"
                              onClick={() => setOpenIndex(isOpen ? null : index)}
                              className="flex-1 justify-between text-sm font-medium transition-all text-left [&[data-state=open]>svg]:rotate-180 flex items-center gap-6 md:gap-12 px-0 py-6 md:py-8 hover:no-underline"
                            >
                              <span className="font-[family-name:var(--font-inter)] text-[16px] sm:text-[18px] leading-[20px] sm:leading-[28px] flex-1 text-left text-foreground-secondary font-medium">
                                {faq.question}
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-chevron-down h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                                aria-hidden="true"
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </button>
                          </h3>
                          {isOpen && (
                            <div
                              role="region"
                              data-orientation="vertical"
                              className="overflow-hidden text-sm"
                            >
                              <div className="pt-0 pb-3 md:pb-4">
                                <div className="font-[family-name:var(--font-inter)] font-normal text-[14px] sm:text-[16px] leading-[18px] sm:leading-[26px] [&>*]:inline [&>br]:block [&>strong]:font-semibold [&>a]:text-[#0158ff] [&>a]:hover:text-[#000000] [&>a]:underline">
                                  {faq.answer}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
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
