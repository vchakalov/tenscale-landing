import { cn } from "@/lib/utils";

type TrustPoint = {
  title: string;
  body: string;
  icon: (props: { className?: string }) => React.ReactElement;
};

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3 5 6v5c0 4.2 2.9 7.6 7 8.8 4.1-1.2 7-4.6 7-8.8V6l-7-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m9.2 12 1.9 1.9 3.7-3.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function KeyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m11 11 7.5 7.5M16 13.5l2 2M14 15.5l1.6 1.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckPersonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="9" cy="7.5" r="3.3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 19.5a5.5 5.5 0 0 1 11 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="m15.8 9.6 2 2 3.2-3.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DeployIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3c2.8 2.3 4.2 5.3 4.2 9S14.8 18.7 12 21c-2.8-2.3-4.2-5.3-4.2-9S9.2 5.3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M3.2 12h17.6M12 3v18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const points: TrustPoint[] = [
  {
    title: "Never rewrites facts, prices or claims",
    body: "Only persuasion copy changes per angle. Numbers, structure and trust signals stay exactly as you wrote them.",
    icon: ShieldIcon,
  },
  {
    title: "Your Meta account, your data",
    body: "Everything runs in your own ad account through the official Meta API. Nothing is siloed away from you.",
    icon: KeyIcon,
  },
  {
    title: "Human-approved before anything sends",
    body: "You review and sign off on angles, creatives and pages. The engine proposes; you stay in control.",
    icon: CheckPersonIcon,
  },
  {
    title: "Deploys to Shopify, Webflow & more",
    body: "One line of install lets Agentica publish message-matched pages straight into the tools you already use.",
    icon: DeployIcon,
  },
];

export function Trust() {
  return (
    <section className="section-full bg-[var(--color-ink)] py-24 text-white sm:py-32">
      <div className="container-default">
        {/* red hairline accent above the heading */}
        <div className="mb-8 h-px w-16 bg-[var(--color-accent)]" aria-hidden />

        <div className="max-w-3xl">
          <p className="eyebrow mb-5 text-zinc-500">The science, and the safety</p>
          <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.5rem]">
            Powered by Andromeda.{" "}
            <span className="text-zinc-500">Governed by your rules.</span>
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-zinc-300">
            Meta&rsquo;s Andromeda decides who sees each creative — you don&rsquo;t hand-pick
            audiences anymore. The job is to feed it{" "}
            <span className="font-semibold text-white">volume × diversity</span> and match the
            landing page to whatever the ad promised. That&rsquo;s the whole engine Agentica
            automates: many angles, many creatives, a page rewritten for each one.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:mt-16 sm:grid-cols-2">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="flex gap-4 bg-[var(--color-ink)] p-7 sm:p-8"
              >
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px]",
                    "border border-white/10 bg-white/[0.03] text-[var(--color-accent)]",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{point.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
