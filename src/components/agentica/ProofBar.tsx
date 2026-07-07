const METRICS = [
  "3× conversion rate on message-matched pages",
  "24/7 ad automation",
  "50+ angles per product",
  "€ live spend managed",
];

export function ProofBar() {
  return (
    <section className="section-full border-y border-border bg-surface-muted">
      <div className="container-default py-10">
        <p className="text-center text-sm leading-relaxed text-foreground-secondary">
          Built for performance teams scaling past{" "}
          <span className="font-semibold text-foreground">€100k / month</span>.
        </p>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-0">
          {METRICS.map((metric, i) => (
            <li key={metric} className="flex items-center">
              {i > 0 && (
                <span
                  aria-hidden
                  className="mx-5 hidden h-3.5 w-px bg-border-strong sm:block"
                />
              )}
              <span className="mono text-xs tracking-tight text-foreground-tertiary">
                {metric}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
