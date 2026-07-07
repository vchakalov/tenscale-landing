import { cn } from "@/lib/utils";

const OLD_WAY = [
  "A media buyer",
  "A designer",
  "A CRO specialist",
  "A landing-page tool",
  "Hours in Ads Manager",
  "One funnel for everyone",
];

const WITH_AGENTICA = [
  "Angles that pull the right buyer",
  "Winning creatives, generated",
  "A personalized page per angle",
  "24/7 automation on live metrics",
];

function DashIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 8h8" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3.5 8.5l3 3 6-6.5" />
    </svg>
  );
}

export function Comparison() {
  return (
    <section className="section-full py-24 sm:py-32">
      <div className="container-default">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Why Agentica</p>
          <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-[2.5rem]">
            One engine instead of a whole stack.
          </h2>
        </div>

        <div className="relative mt-14 flex flex-col items-stretch gap-4 md:flex-row md:gap-6">
          {/* The old way */}
          <div className="lift flex flex-1 flex-col rounded-[14px] border border-border bg-surface-muted p-7">
            <p className="mono text-[0.68rem] uppercase tracking-[0.14em] text-foreground-tertiary">
              The old way
            </p>
            <h3 className="mt-2 text-xl font-bold tracking-[-0.01em] text-foreground-secondary">
              A stack of tools and people
            </h3>
            <ul className="mt-6 flex-1 space-y-3">
              {OLD_WAY.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border-strong text-foreground-tertiary">
                    <DashIcon className="h-3 w-3" />
                  </span>
                  <span className="text-sm text-foreground-secondary">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-border pt-5 text-sm font-medium text-foreground-tertiary">
              Spend climbs, scaling stalls.
            </p>
          </div>

          {/* vs divider */}
          <div className="flex items-center justify-center md:absolute md:left-1/2 md:top-1/2 md:z-10 md:-translate-x-1/2 md:-translate-y-1/2">
            <span className="mono inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-surface text-xs font-semibold uppercase tracking-widest text-foreground-tertiary shadow-[var(--shadow-sm)]">
              vs
            </span>
          </div>

          {/* With Agentica */}
          <div
            className={cn(
              "lift flex flex-1 flex-col rounded-[14px] border border-border bg-surface p-7",
              "ring-1 ring-[var(--color-accent-ring)]",
              "shadow-[var(--shadow-md)]",
            )}
          >
            <p className="mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--color-accent)]">
              With Agentica
            </p>
            <h3 className="mt-2 text-xl font-bold tracking-[-0.01em] text-foreground">
              One engine, end to end
            </h3>
            <ul className="mt-6 flex-1 space-y-3">
              {WITH_AGENTICA.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-border pt-5 text-sm font-semibold text-foreground">
              Scale with angles, not budget.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
