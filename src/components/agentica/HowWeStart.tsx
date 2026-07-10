import { BookCallButton, WhatsAppButton } from "@/components/agentica/CtaButtons";

type Step = {
  no: string;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    no: "01",
    title: "Book a call",
    body: "We look at your offer, your angles and your current funnel, and where buyers are dropping off.",
  },
  {
    no: "02",
    title: "We build your engine",
    body: "Angles, creatives, personalized landing pages and automation, set up for your Meta account.",
  },
  {
    no: "03",
    title: "We scale horizontally",
    body: "New angles and funnels compound while the automation quietly trims the losers.",
  },
];

export function HowWeStart() {
  return (
    <section id="get-started" className="section-full py-24 sm:py-28">
      <div className="container-default">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Get started</p>
          <h2 className="text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
            How we start working together.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-foreground-secondary">
            No long onboarding and no rebuild. We plug into your account, ship
            your first funnels, and let the angles compound from there.
          </p>
        </div>

        {/* 3-step process */}
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.no}
              className="lift flex flex-col rounded-[14px] border border-border bg-surface p-8 shadow-[var(--shadow-sm)]"
            >
              <span className="mono text-sm font-semibold text-[var(--color-accent)]">
                {step.no}
              </span>
              <h3 className="mt-4 text-lg font-bold tracking-[-0.01em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        {/* Book-a-call band (light), so Trust stays the one dark moment */}
        <div className="relative mt-14 overflow-hidden rounded-[20px] border border-[var(--color-accent-soft)] bg-surface-muted px-8 py-14 text-center sm:px-16 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-64 w-[560px] rounded-full opacity-80 blur-[110px]"
            style={{ background: "radial-gradient(closest-side, rgba(17,17,17,0.12), transparent)" }}
          />
          <div className="relative">
            <h3 className="mx-auto max-w-2xl text-balance text-2xl font-extrabold leading-[1.12] tracking-[-0.03em] text-foreground sm:text-4xl">
              Ready to give every buyer their own funnel?
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-foreground-secondary">
              Book a call and we&rsquo;ll map your offer, angles and first funnels,
              or message us on WhatsApp.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BookCallButton size="lg" />
              <WhatsAppButton size="lg" variant="outline" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
