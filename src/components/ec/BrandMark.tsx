/**
 * The Tenscale "TS" mark, traced from the brand logo files (2048px masters in
 * the Drive "Branding" folder) and cropped to the shape. Fills with the page
 * accent, so it is lime on the black theme.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="257 542 1464 1081"
      className={className}
      role="img"
      aria-label="Tenscale"
    >
      <path
        fill="var(--ec-accent)"
        d="M257 542H882L703 893H945L692 1310ZM973 542H1721L1605 760H1359L868 1623L723 1383L1089 760H851Z"
      />
    </svg>
  );
}
