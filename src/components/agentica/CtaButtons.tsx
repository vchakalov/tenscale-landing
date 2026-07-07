import { cn } from "@/lib/utils";

// ── Swap these for the real links ─────────────────────────────
export const BOOK_CALL_URL = "https://cal.com/agentica/intro"; // TODO: real Calendly/cal.com
export const WHATSAPP_URL = "https://wa.me/00000000000"; // TODO: real wa.me number
// ──────────────────────────────────────────────────────────────

type Size = "sm" | "md" | "lg";

const sizeCls: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base",
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M4.167 10h11.666m0 0L10 4.167M15.833 10 10 15.833"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.94 1.34-.5.04-.98.22-3.3-.7-2.78-1.1-4.56-3.94-4.7-4.12-.14-.18-1.12-1.5-1.12-2.86 0-1.36.72-2.02.97-2.3.24-.28.54-.34.72-.34.18 0 .36 0 .52.01.16.01.4-.06.62.48.24.56.82 1.94.9 2.08.08.14.12.3.02.48-.1.18-.16.3-.3.46-.14.16-.3.36-.42.48-.14.14-.28.3-.12.58.16.28.72 1.18 1.54 1.92 1.06.94 1.94 1.24 2.22 1.38.28.14.44.12.6-.08.16-.18.7-.82.88-1.1.18-.28.36-.24.62-.14.26.1 1.64.78 1.92.92.28.14.46.2.54.32.08.12.08.68-.16 1.36Z" />
    </svg>
  );
}

export function BookCallButton({
  size = "md",
  className,
  children = "Book a call",
}: {
  size?: Size;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={BOOK_CALL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--color-accent)] font-semibold text-white transition-all",
        "shadow-[0_1px_2px_rgba(16,24,40,0.10),0_0_0_1px_rgba(229,72,77,0.12)] hover:bg-[var(--color-accent-hover)] hover:shadow-[0_6px_20px_-6px_var(--color-accent-ring)]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent-ring)]",
        sizeCls[size],
        className,
      )}
    >
      {children}
      <ArrowIcon />
    </a>
  );
}

export function WhatsAppButton({
  size = "md",
  variant = "outline",
  className,
  children = "WhatsApp",
}: {
  size?: Size;
  variant?: "outline" | "ghost";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-foreground transition-colors",
        variant === "outline"
          ? "border border-border-strong bg-white hover:bg-surface-muted"
          : "hover:bg-surface-muted",
        sizeCls[size],
        className,
      )}
    >
      <WhatsAppIcon />
      {children}
    </a>
  );
}
