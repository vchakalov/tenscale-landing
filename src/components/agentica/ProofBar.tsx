const METRICS = [
  "3× conversion rate on message-matched pages",
  "24/7 ad automation",
  "50+ angles per product",
  "€ live spend managed",
];

export function ProofBar() {
  return (
    <section className="section-full border-y border-border">
      <div className="container-default py-10">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-xs text-sm leading-relaxed text-foreground-secondary">
            Built for performance teams scaling past{" "}
            <span className="font-semibold text-foreground">€100k / month</span>.
          </p>

          <ul className="flex flex-wrap items-center gap-y-3">
            {METRICS.map((metric, i) => (
              <li key={metric} className="flex items-center">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="mx-6 hidden h-3.5 w-px bg-border-strong sm:block"
                  />
                )}
                <span className="mono text-xs tracking-tight text-foreground-tertiary">
                  {metric}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
