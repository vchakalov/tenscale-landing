import { cn } from "@/lib/utils";

/** The heavy headline the direct-response pages are built from, in title case. */
export function Shout({ children, className, as: Tag = "h2" }: { children: React.ReactNode; className?: string; as?: "h1" | "h2" }) {
  return (
    <Tag className={cn("font-black tracking-[-0.025em] text-balance", className)}>
      {children}
    </Tag>
  );
}

/**
 * The label on every "See proof" link. A magnifier rather than ↗: the link
 * opens the screenshot over the page, and an arrow reads as "leaves the page".
 */
export function SeeProof() {
  return (
    <span className="inline-flex items-center gap-1">
      <svg viewBox="0 0 24 24" fill="none" className="h-[1em] w-[1em]" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2.2" />
        <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      See proof
    </span>
  );
}

/** A filled tick in a disc, the mark every list on the page uses. */
export function Tick({ className }: { className?: string }) {
  return (
    <span className={cn("grid shrink-0 place-items-center rounded-full", className)} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" className="h-[55%] w-[55%]">
        <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
