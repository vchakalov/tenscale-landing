"use client";

import { useState } from "react";
import { WHATSAPP_URL } from "@/components/agentica/CtaButtons";
import { cn } from "@/lib/utils";

type QA = {
  q: string;
  a: string;
};

const faqs: QA[] = [
  {
    q: "What exactly does Agentica do?",
    a: "It builds a personalized ad funnel for each angle: fresh creatives plus a landing page that mirrors the ad's exact promise. Then it runs those ads in your Meta account and keeps optimizing them. One coherent funnel per buyer, instead of one generic page for everyone.",
  },
  {
    q: "How is this different from an agency?",
    a: "An agency sells you hours; Agentica is an engine. It scales horizontally — more angles and funnels rather than more budget on one — and it never stops testing, promoting winners and cutting losers. There's no queue and no waiting on a person to make the next change.",
  },
  {
    q: "Do I need to rebuild my landing page?",
    a: "No. You add one line of code, and Agentica reads your existing page and rewrites only the persuasion copy for each angle — the hero, benefits and CTA. It never touches your facts, prices or page structure, so nothing about the offer itself changes.",
  },
  {
    q: "Does it touch my ad account directly?",
    a: "Yes, securely, through the official Meta Ads API. Everything runs inside your own account, and you stay in control the whole time — you can approve, pause or scale anything, and nothing goes live without your sign-off.",
  },
  {
    q: "What does ‘+300% conversion’ actually mean?",
    a: "Message-matched pages can lift conversion up to roughly 3× because the buyer feels the funnel was built specifically for them, not bolted on after the click. It's a positioning claim, not a guarantee — real results vary by offer, audience and starting point.",
  },
  {
    q: "How do we start?",
    a: "Book a call or message us on WhatsApp. We look at your offer, your angles and your current funnel, then set up your first personalized funnels so you can see the engine working on your own account.",
  },
];

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-full py-24 sm:py-32">
      <div className="container-default">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">FAQ</p>
          <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-[2.5rem]">
            Questions, answered.
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-border border-y border-border sm:mt-14">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-foreground"
                  >
                    <span className="text-base font-semibold text-foreground sm:text-lg">
                      {item.q}
                    </span>
                    <ChevronIcon
                      className={cn(
                        "h-5 w-5 shrink-0 text-foreground-tertiary transition-transform duration-200",
                        isOpen && "rotate-180 text-[var(--color-accent)]",
                      )}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="pb-6 pr-10"
                >
                  <p className="text-pretty leading-relaxed text-foreground-secondary">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-foreground-tertiary">
          Still have a question?{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-accent)] underline-offset-4 hover:underline"
          >
            Message us on WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  );
}
