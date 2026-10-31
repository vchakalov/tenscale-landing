import { cn } from "@/lib/utils";

/** The heavy headline the direct-response pages are built from, in title case. */
export function Shout({ children, className, as: Tag = "h2" }: { children: React.ReactNode; className?: string; as?: "h1" | "h2" }) {
  return (
    <Tag className={cn("font-black tracking-[-0.025em] text-balance", className)}>
      {children}
    </Tag>
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
