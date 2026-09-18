/**
 * Content types for the the design source clone.
 * Eleven Cloud landing
 */

/** One FAQ entry. `answer` holds rich text, so it is rendered as JSX, not a string. */
export interface FaqItem {
  question: string;
  /** Paragraphs; each is a list of runs so the source's <strong> spans survive. */
  answer: FaqParagraph[];
  /** Optional numbered list under the answer paragraphs. */
  list?: string[];
  /** Optional trailing link (e.g. "view all"). */
  footerLink?: { href: string; label: string };
}

export type FaqParagraph = FaqRun[];

export interface FaqRun {
  text: string;
  bold?: boolean;
}

/** A testimonial body paragraph on the dark card. */
export interface TestimonialParagraph {
  text: string;
}
