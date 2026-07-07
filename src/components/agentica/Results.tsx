import { cn } from "@/lib/utils";

type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  {
    value: "Up to 3×",
    label: "conversion rate on message-matched pages",
  },
  {
    value: "50+",
    label: "angles live per product",
  },
  {
    value: "24/7",
    label: "automated optimization",
  },
];

function QuoteMark() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="h-8 w-8 text-[var(--color-accent)]"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17 10c-5.5 2-9 6.4-9 12.6 0 4.6 2.7 7.4 6.3 7.4 3.2 0 5.7-2.4 5.7-5.7 0-3.2-2.2-5.4-5.1-5.4-.6 0-1.3.1-1.6.2.5-2.8 3-5.3 6.1-6.6L17 10Zm16 0c-5.5 2-9 6.4-9 12.6 0 4.6 2.7 7.4 6.3 7.4 3.2 0 5.7-2.4 5.7-5.7 0-3.2-2.2-5.4-5.1-5.4-.6 0-1.3.1-1.6.2.5-2.8 3-5.3 6.1-6.6L33 10Z" />
    </svg>
  );
}

export function Results() {
  return (
    <section id="results" className="section-full py-24 sm:py-32">
      <div className="container-default">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Results</p>
          <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-[2.5rem]">
            Built to move the metric that matters.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-foreground-secondary">
            Not vanity numbers — the conversion rate on the page and the cost of
            every result. When the funnel is built for the buyer, both move in
            the right direction.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Featured testimonial */}
          <figure
            className={cn(
              "flex flex-col justify-between rounded-[14px] border border-border bg-surface-muted p-8 sm:p-10 lg:col-span-3",
              "shadow-[var(--shadow-sm)]",
            )}
          >
            <div>
              <QuoteMark />
              <blockquote className="mt-6 text-balance text-xl font-semibold leading-[1.4] tracking-[-0.01em] text-foreground sm:text-2xl">
                “We stopped pouring budget into one funnel and started shipping a
                page for every angle. Landing-to-checkout roughly tripled on our
                best segments, and we finally scaled past €100k a month without
                the cost per result running away from us.”
              </blockquote>
            </div>
            <figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-6">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent-soft)] font-mono text-sm font-semibold text-[var(--color-accent)]"
              >
                PL
              </span>
              <span className="text-sm leading-tight">
                <span className="block font-semibold text-foreground">
                  Performance lead
                </span>
                <span className="block text-foreground-tertiary">
                  DTC skincare brand
                </span>
              </span>
            </figcaption>
          </figure>

          {/* Stat cards */}
          <div className="grid gap-6 lg:col-span-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col justify-center rounded-[14px] border border-border bg-surface p-7 shadow-[var(--shadow-sm)]"
              >
                <p className="mono text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
