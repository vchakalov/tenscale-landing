import { cn } from "@/lib/utils";

type Feature = {
  kicker: string;
  heading: string;
  paragraphs: [string, string];
  checks: [string, string, string];
  image: string;
  alt: string;
};

const FEATURES: Feature[] = [
  {
    kicker: "PERSONALIZED LANDING PAGES",
    heading: "Message-match, at scale.",
    paragraphs: [
      "Each angle gets its own landing variation that mirrors the ad's exact promise: hero, benefits and CTA rewritten, while facts, prices and structure stay untouched.",
      "Install is one line of code and it works with Shopify, Webflow and GTM. Matching the page to the ad can lift the conversion rate up to 3×.",
    ],
    checks: [
      "One-line install",
      "Rewrites copy, never facts or prices",
      "A variation per angle, automatically",
    ],
    image: "register-lp.png",
    alt: "Register a landing page modal with a one-line install snippet for Shopify, Webflow and GTM",
  },
  {
    kicker: "ANGLE & PERSONA ENGINE",
    heading: "Scale with angles, not budget.",
    paragraphs: [
      "Agentica proposes new angles, tests them, and sorts them into Winning, Testing and Losers by real ROAS, then auto-generates fresh angles as the pool thins.",
      "This is horizontal scaling: 50 angles in 50 funnels beats pouring budget into one. You expand reach by variety, not by spending more on the same message.",
    ],
    checks: [
      "Winning / Testing / Losers buckets",
      "Auto-refills the angle pool",
      "Promotes winners, kills losers",
    ],
    image: "angle-evaluator.png",
    alt: "Angle evaluator kanban with Winning, Testing and Losers columns showing ROAS, CPA, spend and purchases",
  },
  {
    kicker: "WINNING CREATIVES, GENERATED",
    heading: "A creative for every angle.",
    paragraphs: [
      "The engine starts from proven winning ad structures and produces fresh creatives for each angle and audience, keeping the message specific while the format stays reliable.",
      "Volume × diversity is exactly what Meta's Andromeda rewards, so more angle-matched creatives means more of the right buyers reached.",
    ],
    checks: [
      "Built on proven structures",
      "Per-angle, per-audience",
      "Feeds the algorithm fresh creative",
    ],
    image: "creative-library.png",
    alt: "Creative library dashboard with winning creatives, lead-gen tools and live stats",
  },
  {
    kicker: "24/7 AD AUTOMATION",
    heading: "An operator that never sleeps.",
    paragraphs: [
      "Set the rules once: when spend passes a cap with no results, or cost-per-result climbs, Agentica pauses, scales or recreates the ad automatically.",
      "That means constant freshness without anyone sitting in Ads Manager, which is exactly the kind of consistent activity Meta rewards.",
    ],
    checks: [
      "If-this-then-that on live metrics",
      "Pause / scale / recreate",
      "No sitting in Ads Manager",
    ],
    image: "workflows.png",
    alt: "Automatic-rules builder with conditions for spend, results and cost-per-result",
  },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]"
    >
      <path
        d="M4.5 10.5 8 14l7.5-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Features() {
  return (
    <section id="features" className="section-full py-24 sm:py-32">
      <div className="container-default">
        {/* Section header */}
        <header className="max-w-2xl">
          <p className="eyebrow mb-4">The engine</p>
          <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-[2.5rem]">
            Everything a growth team does, run by one engine.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-foreground-secondary">
            Angles, creatives, message-matched pages and round-the-clock optimization:
            the four jobs it usually takes a whole team to run, working together as a
            single system.
          </p>
        </header>

        {/* Alternating feature blocks */}
        <div className="mt-20 flex flex-col gap-20 sm:gap-24">
          {FEATURES.map((feature, i) => {
            const flipped = i % 2 === 1;
            return (
              <div
                key={feature.kicker}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Text column */}
                <div className={cn(flipped && "lg:order-2")}>
                  <p className="mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                    {feature.kicker}
                  </p>
                  <h3 className="mt-4 text-balance text-2xl font-bold leading-[1.12] tracking-[-0.03em] text-foreground sm:text-[1.9rem]">
                    {feature.heading}
                  </h3>
                  <div className="mt-5 space-y-4 text-pretty text-base leading-relaxed text-foreground-secondary">
                    <p>{feature.paragraphs[0]}</p>
                    <p>{feature.paragraphs[1]}</p>
                  </div>
                  <ul className="mt-7 space-y-3">
                    {feature.checks.map((check) => (
                      <li
                        key={check}
                        className="flex items-start gap-3 text-[15px] font-medium text-foreground"
                      >
                        <CheckIcon />
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image column */}
                <div className={cn(flipped && "lg:order-1")}>
                  <div className="device-frame lift">
                    <img
                      src={`/images/agentica/${feature.image}`}
                      alt={feature.alt}
                      width={2752}
                      height={1536}
                      className="block h-auto w-full"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
