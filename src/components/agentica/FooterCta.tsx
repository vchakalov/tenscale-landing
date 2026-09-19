import { BookCallButton } from "@/components/agentica/CtaButtons";

const footerLinks: { label: string; href: string }[] = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
  { label: "Privacy", href: "#" },
];

export function FooterCta() {
  return (
    <section className="section-full bg-[var(--color-ink)] pt-24 text-white sm:pt-32">
      <div className="container-default">
        {/* Final CTA card */}
        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] px-6 py-16 text-center sm:px-16 sm:py-20">
          {/* soft red ambient wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
            style={{ background: "radial-gradient(closest-side, rgba(17,17,17,0.20), transparent)" }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl sm:leading-[1.05]">
              Give every buyer their own funnel.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-zinc-300">
              Angles, creatives, message-matched pages and 24/7 automation: one engine,
              set up on your own Meta account.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BookCallButton size="lg" />
            </div>
          </div>
        </div>

        {/* Slim footer */}
        <footer className="mt-20 border-t border-white/10 py-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-sm">
              <span className="text-lg font-extrabold tracking-[-0.02em] text-white">
                Agentica
              </span>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                A different funnel for every buyer: personalized AI funnels for Meta.
              </p>
            </div>

            <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-3">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <p className="mono mt-8 text-xs text-zinc-600">© 2026 Agentica</p>
        </footer>
      </div>
    </section>
  );
}
