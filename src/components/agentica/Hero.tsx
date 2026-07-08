import { BookCallButton, WhatsAppButton } from "@/components/agentica/CtaButtons";

export function Hero() {
  return (
    <section id="top" className="section-full relative overflow-hidden pt-16 sm:pt-24">
      {/* soft red ambient wash behind the hero device */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-70 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(229,72,77,0.14), transparent)" }}
      />

      <div className="container-default flex flex-col items-center text-center">
        <p className="eyebrow mb-5">Personalized AI funnels for Meta</p>

        <h1 className="max-w-4xl text-balance text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-foreground sm:text-6xl">
          A different funnel for every buyer.{" "}
          <span className="text-foreground-tertiary">Automatically.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-foreground-secondary">
          Agentica writes your angles, generates the winning creatives, and builds a
          message-matched landing page for each one, then runs the ads 24/7. You scale with
          more angles, not more budget.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <BookCallButton size="lg" />
          <WhatsAppButton size="lg" variant="outline" />
        </div>

        {/* Hero product device */}
        <div className="device-frame mt-14 w-full max-w-[1120px]">
          <img
            src="/images/agentica/funnel-builder.png"
            alt="Agentica funnel builder: an ad, a personalized landing page and an instant form, with live funnel performance"
            width={2752}
            height={1536}
            className="block h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
