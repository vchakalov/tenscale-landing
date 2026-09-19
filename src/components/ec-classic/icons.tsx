import type { SVGProps } from "react";

/**
 * The source page draws these two glyphs with Font Awesome 6 **Pro**
 * (`far fa-long-arrow-right`, `fal fa-chevron-down`). Font Awesome Pro is a
 * licensed font, so these are visually-equivalent redraws rather than copies
 * of the Pro outlines, matched to the measured rendered size and stroke weight.
 */

/** Long thin right arrow. Rendered at 16px inside CTA buttons, `margin-left: 15px`. */
export function LongArrowRightIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M1 8h17" />
      <path d="M12.5 2.5 18 8l-5.5 5.5" />
    </svg>
  );
}

/** Light-weight chevron. Rendered at 30px in the FAQ, rotates 180deg when open. */
export function ChevronDownIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 26 30"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M3 11.5 13 20.5 23 11.5" />
    </svg>
  );
}
