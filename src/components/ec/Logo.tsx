import { cn } from "@/lib/utils";

/**
 * The mark.
 *
 * Geometry is still the design source's, recoloured only by its props. Replace
 * the shapes when the real Agentica mark is ready; the wordmark below is the
 * part that already reads as ours.
 *
 * Inline SVG rather than an <img> so it stays crisp at any size, inherits no
 * network request, and can be recoloured for dark surfaces. Geometry matches
 * public/brand/logo-mark.svg exactly; change one and change the other.
 */
export function LogoMark({
  className,
  style,
  /** Colour of the shallower slot. Matches whatever the mark sits on. */
  slotColor = "#f4f2f0",
  blockColor = "#0c0a08",
}: {
  className?: string;
  style?: React.CSSProperties;
  slotColor?: string;
  blockColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="100" height="100" fill={blockColor} />
      <rect x="33" y="0" width="11" height="49" fill={slotColor} />
      <rect x="53" y="0" width="17" height="64" fill="#0c0a08" />
    </svg>
  );
}

/**
 * Wordmark, with the mark optional. The name is set in one weight because
 * "Agentica" is a single word; the source split its two words across bold and
 * regular, which has nothing to split here.
 *
 * `mark={false}` drops the square and leaves the wordmark alone. Kept for
 * surfaces where a graphic would compete with nearby type; the header uses the
 * full lockup.
 */
export function Logo({
  size = 28,
  className,
  slotColor,
  mark = true,
}: {
  /** Cap height of the wordmark in px; the mark is drawn square to match. */
  size?: number;
  className?: string;
  slotColor?: string;
  /** Draw the square mark before the wordmark. */
  mark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      {mark && (
        <LogoMark
          slotColor={slotColor}
          className="shrink-0"
          style={{ width: size, height: size }}
        />
      )}
      <span
        className={cn(
          "font-[family-name:var(--font-pt-serif)] text-[#0c0a08]",
          mark && "ml-[0.42em]",
        )}
        style={{ fontSize: size, lineHeight: 1.15 }}
      >
        <span className="font-bold">Agentica</span>
      </span>
    </span>
  );
}
