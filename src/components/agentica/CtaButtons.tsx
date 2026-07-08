"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

// ── Real links ────────────────────────────────────────────────
export const BOOK_CALL_URL = "https://zcal.co/venelin/agentica";
export const WHATSAPP_URL = "https://wa.me/359877895554";
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

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Modal that embeds the zcal booking page (works on mobile + desktop). */
function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Book a call"
      onClick={onClose}
    >
      <div
        className="relative flex h-[88vh] max-h-[760px] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <span className="text-sm font-semibold text-foreground">Book a call</span>
          <div className="flex items-center gap-1">
            <a
              href={BOOK_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-2 py-1 text-xs font-medium text-foreground-tertiary transition-colors hover:text-foreground"
            >
              Open in new tab ↗
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid h-8 w-8 place-items-center rounded-md text-foreground-secondary transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
        <iframe
          src={BOOK_CALL_URL}
          title="Book a call with Agentica"
          className="h-full w-full flex-1 border-0"
          allow="camera; microphone; fullscreen"
        />
      </div>
    </div>,
    document.body,
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
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
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
      </button>
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
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
