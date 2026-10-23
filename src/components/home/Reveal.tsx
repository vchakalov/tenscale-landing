"use client";

import { useEffect, useRef } from "react";

/**
 * Fades a block up as it scrolls into view.
 *
 * The hidden starting state lives in CSS behind `@media (scripting: enabled)`,
 * so a browser without JavaScript, or a crawler, gets the content at rest and
 * never a blank section waiting for an observer. Nothing above the fold uses
 * this: the first screen paints as it is.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  /** Milliseconds, to stagger siblings. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.setAttribute("data-in", "");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`home-reveal ${className ?? ""}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
