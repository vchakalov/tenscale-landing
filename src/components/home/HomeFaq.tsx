'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'What exactly is the guarantee?',
    answer:
      "We automate your client fulfillment in 30 days and make it better. If we don't, you don't pay. Period.",
  },
  {
    question: 'Where can I see results?',
    answer:
      'On this page. Every number opens the Ads Manager or Slack screenshot it came from, and the wall has the rest. We run 300+ client accounts and $3M+ in Meta ad spend a month; the ones shown are the most recent.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'We build the engine with you in a few working sessions. After that a new client can go live the same day: one agency signed a client at 9am and had 112 ads live by 1:40pm.',
  },
  {
    question: 'What exactly does Tenscale do?',
    answer:
      "Tenscale builds a personalized ad funnel for each angle: fresh creatives plus a landing page that matches the ad's exact promise. Then it runs and optimizes the ads for you, so the same message carries from the first impression all the way to checkout.",
  },
  {
    question: 'How is this different from hiring more media buyers?',
    answer:
      "It's an engine, not hours. Instead of one person working one funnel, Tenscale runs many angles at once and never stops testing and optimizing.",
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
    question: 'What results should I expect?',
    answer:
      'Across our five most recent client accounts, cost per lead fell between 32% and 60% after the install, 43% blended. Results depend on the offer, the traffic and the sales process, and on the call we look at yours.',
  },
  {
    question: 'How do we start?',
    answer:
      'Book a call. We review your offer, angles and current funnel, then set up your first personalized funnels.',
  },
];

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-full scroll-mt-24 py-24 md:py-32" id="faq">
      <div className="container-default flex flex-col items-start gap-8 md:gap-12 lg:gap-20">
        <div className="flex-col items-end self-stretch max-w-6xl mx-auto flex relative">
          <div className="flex flex-col lg:flex-row items-start gap-8 md:gap-12 lg:gap-20 relative self-stretch w-full">
            <div className="flex flex-col items-start relative flex-1 self-stretch">
              <h2 className="font-[family-name:var(--font-gelica)] text-[30px] sm:text-[48px] leading-[38px] sm:leading-[58px] relative self-stretch font-light sm:font-light">
                Questions, answered.
              </h2>
              <div className="font-[family-name:var(--font-geist-sans)] font-normal text-[14px] sm:text-[16px] leading-[18px] sm:leading-[26px] mt-4 text-foreground-secondary">
                Still have a question? Ask it on the call.
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
                        <div className={`border-t border-black/[0.08] ${isOpen ? 'border-b' : ''}`}>
                          <h3 data-orientation="vertical" data-state={isOpen ? 'open' : 'closed'} className="flex">
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              data-state={isOpen ? 'open' : 'closed'}
                              data-orientation="vertical"
                              onClick={() => setOpenIndex(isOpen ? null : index)}
                              className="flex-1 justify-between text-sm font-medium transition-all text-left [&[data-state=open]>svg]:rotate-180 flex items-center gap-6 md:gap-12 px-0 py-6 md:py-8 hover:no-underline"
                            >
                              <span className="font-[family-name:var(--font-geist-sans)] text-[16px] sm:text-[18px] leading-[24px] sm:leading-[28px] flex-1 text-left text-[#0e0e0f] font-medium">
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
                                <div className="font-[family-name:var(--font-geist-sans)] font-normal text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#3a3a3d] [&>*]:inline [&>br]:block [&>strong]:font-semibold [&>a]:text-[#8B1120] [&>a]:hover:text-[#000000] [&>a]:underline">
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
