"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LANDING_FAQ } from "@/lib/ec/landing-faq";
import type { FaqParagraph } from "@/types/landing";
import { ChevronDownIcon } from "./icons";

/** Renders one answer paragraph, preserving the source's <strong> runs. */
function AnswerParagraph({ paragraph }: { paragraph: FaqParagraph }) {
  return (
    <p>
      {paragraph.map((run, index) =>
        run.bold ? (
          <strong key={index} className="font-bold">
            {run.text}
          </strong>
        ) : (
          <span key={index}>{run.text}</span>
        ),
      )}
    </p>
  );
}

/**
 * Per-breakpoint type/colour values. The two variants render as independent
 * trees (each behind its own visibility wrapper) so the measured type sizes
 * are exact rather than inherited through a media query on one node.
 */
interface FaqVariantStyles {
  /** Question row typography. */
  question: string;
  /** Answer panel typography. */
  answer: string;
  /** Vertical gap between answer paragraphs (one line-height). */
  paragraphGap: string;
  /** Full-width rule under every item, navy on desktop, #444444 on mobile. */
  divider: string;
  /** Item wrapper padding, 15/15/15/20 desktop, 10/10/10/15 mobile. */
  itemPadding: string;
  /** Space between an item and the rule beneath it. */
  dividerTop: string;
  /** Space between a rule and the next item. */
  dividerBottom: string;
  /** Space after the final rule (desktop), mobile has no trailing rule. */
  lastDividerBottom: string;
  /** Desktop draws a rule under the last item too; mobile only between items. */
  dividerAfterLast: boolean;
  /** Chevron box, 26x30 desktop, 15x20 mobile. */
  chevron: string;
}

interface FaqAccordionProps {
  styles: FaqVariantStyles;
  idPrefix: string;
  openIndex: number | null;
  onToggle: (index: number) => void;
}

function FaqAccordion({
  styles,
  idPrefix,
  openIndex,
  onToggle,
}: FaqAccordionProps) {
  return (
    <div className="flex flex-col">
      {LANDING_FAQ.map((item, index) => {
        const isOpen = openIndex === index;
        const isLast = index === LANDING_FAQ.length - 1;
        const panelId = `${idPrefix}-panel-${index}`;
        const buttonId = `${idPrefix}-button-${index}`;

        return (
          <div key={item.question}>
            {/* Item wrapper, radius 5px, transparent; padding differs per breakpoint */}
            <div
              className={cn(
                "rounded-[5px] bg-transparent",
                styles.itemPadding,
              )}
            >
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => onToggle(index)}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between border-0 bg-transparent p-0 text-left text-[#0c0a08]",
                  styles.question,
                )}
              >
                <span>{item.question}</span>
                <ChevronDownIcon
                  className={cn(
                    "shrink-0 transition-transform duration-300",
                    styles.chevron,
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              {/*
                The source declares `transition: all` with no duration on this
                panel, so the height change is effectively instant while the
                chevron animates over 300ms. Reproduced exactly.
              */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={cn(
                  isOpen ? "h-auto overflow-visible" : "h-0 overflow-hidden",
                )}
              >
                <div
                  className={cn(
                    "text-left text-[#0c0a08]",
                    styles.answer,
                    styles.paragraphGap,
                  )}
                >
                  {item.answer.map((paragraph, paragraphIndex) => (
                    <AnswerParagraph key={paragraphIndex} paragraph={paragraph} />
                  ))}
                  {item.list && item.list.length > 0 && (
                    <ul className="mt-[24px] grid grid-cols-2 gap-x-[40px] gap-y-[14px] max-[800px]:mt-[22px] max-[800px]:grid-cols-1 max-[800px]:gap-y-[12px]">
                      {item.list.map((line) => (
                        <li key={line} className="flex gap-[10px]">
                          <span
                            aria-hidden
                            className="mt-[11px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#0c0a08] max-[800px]:mt-[8px]"
                          />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.footerLink && (
                    <p className="mt-[24px] max-[800px]:mt-[22px]">
                      <Link
                        href={item.footerLink.href}
                        className="text-[#0c0a08] underline underline-offset-[3px]"
                      >
                        {item.footerLink.label}
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Divider, sibling of the item wrapper so it spans the full container */}
            {(!isLast || styles.dividerAfterLast) && (
              <div
                className={cn(
                  "border-t-2",
                  styles.divider,
                  styles.dividerTop,
                  isLast ? styles.lastDividerBottom : styles.dividerBottom,
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Measured item rhythm (desktop, all items closed): wrapper 69.5px, then 33.5px
 * to the rule, the 2px rule, then 58px to the next wrapper, a uniform 162.5px
 * pitch. The final rule is followed by only 8px before the section ends.
 */
const DESKTOP_STYLES: FaqVariantStyles = {
  question:
    "font-[family-name:var(--font-pt-serif)] text-[30px] leading-[normal] font-bold",
  // The answer text sits 51px below the question row (measured 9215.5 -> 9267).
  // Clipped by the h-0 panel when closed, so it only shows when open.
  answer:
    "pt-[51px] font-[family-name:var(--font-inter)] text-[18px] leading-[24px] font-normal",
  paragraphGap: "[&>p+p]:mt-[24px]",
  divider: "border-[#0c0a08]",
  itemPadding: "pt-[15px] pr-[15px] pb-[15px] pl-[20px]",
  dividerTop: "mt-[33.5px]",
  dividerBottom: "mb-[58px]",
  lastDividerBottom: "mb-[8px]",
  dividerAfterLast: true,
  chevron: "h-[30px] w-[26px]",
};

/**
 * Mobile rhythm differs in every dimension: wrapper padding is 10/10/10/15
 * (46.5px tall for a one-line question), the rule sits 38px below the item and
 * 8px above the next, and there is no rule after the last item.
 */
const MOBILE_STYLES: FaqVariantStyles = {
  question:
    "font-[family-name:var(--font-pt-serif)] text-[20px] leading-[normal] font-bold",
  // Mobile puts the same ~50px between the question row and the answer.
  answer:
    "pt-[50px] font-[family-name:var(--font-inter)] text-[16px] leading-[22px] font-normal",
  paragraphGap: "[&>p+p]:mt-[22px]",
  divider: "border-[#444444]",
  itemPadding: "pt-[10px] pr-[10px] pb-[10px] pl-[15px]",
  dividerTop: "mt-[38px]",
  dividerBottom: "mb-[8px]",
  lastDividerBottom: "mb-0",
  dividerAfterLast: false,
  chevron: "h-[20px] w-[15px]",
};

/**
 * Faq, click-driven, single-open accordion. First item starts open.
 */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <>
      {/* ---------- Desktop (>= 801px) ---------- */}
      <div className="mt-[200px] hidden min-[801px]:block">
        <section className="px-0 pt-[21px] pb-0">
          <div className="mx-auto max-w-[1120px]">
            <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[42px] leading-[48px] font-normal text-[#0c0a08]">
              Frequently Asked Questions
            </h2>
            {/* First item wrapper sits 129px below the heading block (measured 9032 -> 9161) */}
            <div className="mt-[129px]">
              <FaqAccordion
                styles={DESKTOP_STYLES}
                idPrefix="faq-desktop"
                openIndex={openIndex}
                onToggle={toggle}
              />
            </div>
          </div>
        </section>
      </div>

      {/* ---------- Mobile (<= 800px) ---------- */}
      <div className="max-[800px]:block min-[801px]:hidden">
        <div className="mt-[50px]">
          <section className="px-[5px] py-[10px]">
            <h2 className="text-center font-[family-name:var(--font-pt-serif)] text-[40px] leading-[46px] font-bold text-[#0c0a08]">
              Frequently Asked Questions
            </h2>
          </section>
        </div>
        <div className="mt-[50px]">
          <section className="px-[20px] py-[5px]">
            <FaqAccordion
              styles={MOBILE_STYLES}
              idPrefix="faq-mobile"
              openIndex={openIndex}
              onToggle={toggle}
            />
          </section>
        </div>
      </div>
    </>
  );
}
