import { cn } from "@/lib/utils";

type IconProps = { className?: string };

function LeadsIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" />
      <circle cx="9.5" cy="8" r="3.2" />
      <path d="M20 20v-1.5a3.5 3.5 0 0 0-2.6-3.38" />
      <path d="M15.2 4.9a3.2 3.2 0 0 1 0 6.2" />
    </svg>
  );
}

function LandingIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M3.5 8.5h17" />
      <path d="M7 12h6" />
      <path d="M7 15.5h9" />
    </svg>
  );
}

function CheckoutIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1.2" />
      <circle cx="17" cy="20" r="1.2" />
      <path d="M3 4h2l2.2 11.2a1.2 1.2 0 0 0 1.18.96h8.24a1.2 1.2 0 0 0 1.18-.96L20 8H6" />
    </svg>
  );
}

function ConvertIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9A1.5 1.5 0 0 1 18.5 16H9l-4 4V5.5Z" />
      <path d="M9 10l2 2 4-4" />
    </svg>
  );
}

function NurtureIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 12a8 8 0 0 1 13.5-5.8L20 8" />
      <path d="M20 4v4h-4" />
      <path d="M20 12a8 8 0 0 1-13.5 5.8L4 16" />
      <path d="M4 20v-4h4" />
    </svg>
  );
}

type Stage = {
  name: string;
  caption: string;
  Icon: (props: IconProps) => React.JSX.Element;
};

const STAGES: Stage[] = [
  {
    name: "Leads",
    caption: "Angles + creatives that pull the right buyer",
    Icon: LeadsIcon,
  },
  {
    name: "Landing",
    caption: "A page rewritten to match each angle",
    Icon: LandingIcon,
  },
  {
    name: "Checkout",
    caption: "Fewer fields, higher completion",
    Icon: CheckoutIcon,
  },
  {
    name: "Convert",
    caption: "A Messenger agent that closes & books",
    Icon: ConvertIcon,
  },
  {
    name: "Nurture",
    caption: "Automatic follow-up that brings them back",
    Icon: NurtureIcon,
  },
];

function Connector() {
  return (
    <div
      aria-hidden
      className="flex shrink-0 items-center justify-center py-1 md:py-0"
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        className="h-4 w-4 rotate-90 text-[var(--color-accent)] md:rotate-0"
      >
        <path
          d="M4 10h11m0 0-4-4m4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="section-full py-24 sm:py-28">
      <div className="container-default">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">How it works</p>
          <h2 className="text-balance text-3xl font-extrabold tracking-[-0.03em] text-foreground sm:text-4xl">
            One engine, from first impression to repurchase.
          </h2>
        </div>

        <div className="mt-14 flex flex-col gap-4 md:flex-row md:items-stretch md:gap-3">
          {STAGES.map(({ name, caption, Icon }, i) => (
            <div key={name} className={cn("flex flex-col md:contents")}>
              {i > 0 && <Connector />}
              <div className="flex flex-1 flex-col rounded-[14px] border border-border bg-surface p-5 shadow-[var(--shadow-xs)] md:min-w-0">
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-muted text-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  Stage {i + 1}
                </span>
                <h3 className="mt-1 text-lg font-bold tracking-[-0.01em] text-foreground">
                  {name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                  {caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-foreground-tertiary">
          Five stages. One engine. Every buyer gets their own path.
        </p>
      </div>
    </section>
  );
}
