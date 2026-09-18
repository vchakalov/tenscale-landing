import { TRANSFORMATIONS } from "@/lib/ec/transformations";
import type { FaqItem } from "@/types/landing";

/**
 * The homepage FAQ.
 *
 * It lives here rather than inside the client component so the same entries can
 * feed the rendered accordion, the FAQPage JSON-LD on the homepage, and the
 * /faq page without the three drifting apart.
 */
export const LANDING_FAQ: FaqItem[] = [
  {
    question: "Why will AI scale my business?",
    answer: [
      [{ text: "Because it moves money faster.", bold: true }],
      [
        {
          text: "Quotes go out the same day instead of Thursday. You invoice when the job ships, not the week after. That is weeks of cash back in the account, and that cash buys next month's ads. Fewer things get dropped along the way, so fewer customers leave.",
        },
      ],
      [
        {
          text: "And the pile that lands on your desk every morning stops landing there. That is the part most owners underestimate.",
        },
      ],
    ],
  },
  {
    question: "What happens after I book?",
    answer: [
      [
        {
          text: "A fit call. We see if we can help.",
          bold: true,
        },
        {
          text: " If we can, someone from our team goes into your business. In five days you get a written report. What AI can do. What each change is worth. How much money you can save or make. If we don't find at least $50,000 a year, the assessment is free. Then you do the plan, or we do.",
        },
      ],
    ],
  },
  {
    question: "What is Eleven Cloud and who is it for?",
    answer: [
      [
        {
          text: "We find the operation that costs you the most and replace it with AI.",
          bold: true,
        },
        {
          text: " It fits companies around $3M to $10M best, where the owner is still in every decision and hiring has stopped helping. Below that it is usually a people problem, and there is a shorter version of this for you. Above it there is normally someone inside who should own this, and the work looks different: governance, data residency, and getting one operation out of pilot and into production.",
        },
      ],
    ],
  },
  {
    question: "What do you actually build?",
    answer: [
      [
        { text: "Whatever the assessment finds.", bold: true },
        {
          text: " Last time it was the thing answering customers. Before that, quoting. It has been invoicing, dispatch, onboarding. You will not get a product recommendation on the first call, because we do not have one yet.",
        },
      ],
    ],
  },
  {
    question: "Do you train this on our business?",
    answer: [
      [
        {
          text: "Yes, on your data and your rules, not on a generic prompt.",
          bold: true,
        },
        {
          text: " Then we sit with whoever will run it until they can run it without us.",
        },
      ],
    ],
  },
  {
    question: "What AI transformations have you done so far?",
    answer: [
      [
        { text: "Ten, live in real companies.", bold: true },
        { text: " Four of them are above. The other six:" },
      ],
    ],
    // Items 1 to 4 already carry the Results section. Repeating them here made
    // the answer a ten-row wall that restated the page.
    list: TRANSFORMATIONS.slice(4).map((item) => item.faqLine),
    footerLink: { href: "/transformations", label: "view all" },
  },
];

/** Flattens one FAQ answer to the plain string FAQPage schema expects. */
export function faqAnswerText(item: FaqItem): string {
  const paragraphs = item.answer.map((paragraph) =>
    paragraph.map((run) => run.text).join(""),
  );
  const list = item.list?.length ? ` ${item.list.join(" ")}` : "";
  return `${paragraphs.join(" ")}${list}`.trim();
}

/** Plain question/answer pairs, for schema and for the /faq page. */
export function landingFaqPairs(): { question: string; answer: string }[] {
  return LANDING_FAQ.map((item) => ({
    question: item.question,
    answer: faqAnswerText(item),
  }));
}
