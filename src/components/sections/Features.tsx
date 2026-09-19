import type { ReactNode } from "react";

interface Feature {
  title: string;
  subtitle: string;
  paragraphs: [string, string];
  tagBgClass: string;
  tagLabel: string;
  image: string;
  icon: ReactNode;
}

const ClockIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-clock w-4 h-4"
    aria-hidden="true"
  >
    <path d="M12 6v6l4 2" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const MailIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-mail w-4 h-4"
    aria-hidden="true"
  >
    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
    <rect x="2" y="4" width="20" height="16" rx="2" />
  </svg>
);

const LockIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-lock w-4 h-4"
    aria-hidden="true"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-eye w-4 h-4"
    aria-hidden="true"
  >
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const BrainIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-brain w-4 h-4"
    aria-hidden="true"
  >
    <path d="M12 18V5" />
    <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />
    <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />
    <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
    <path d="M18 18a4 4 0 0 0 2-7.464" />
    <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
    <path d="M6 18a4 4 0 0 1-2-7.464" />
    <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
  </svg>
);

const features: Feature[] = [
  {
    title: "Personalized landing pages",
    subtitle: "Message-match, at scale.",
    paragraphs: [
      "Each angle gets its own landing variation that mirrors the ad's exact promise. The hero, benefits and CTA are rewritten while facts, prices and structure stay untouched.",
      "Install is one line of code and works with any website. Message-matched pages can lift conversion up to 3× the rate.",
    ],
    tagBgClass: "bg-[#E7EDFB]",
    tagLabel: "Angle-matched landing variation, one line of code.",
    image: "/images/agentica/features-lp.png",
    icon: ClockIcon,
  },
  {
    title: "Angle & persona engine",
    subtitle: "Optimize and scale, angle by angle.",
    paragraphs: [
      "Agentica proposes new angles, tests them, and sorts them into Winning, Testing and Losers by real KPIs. As the pool thins, it auto-generates fresh angles.",
      "You grow on more winning angles, not just more spend on one. And because the engine reacts the second a metric slips, you scale with far less risk.",
    ],
    tagBgClass: "bg-[#E7EDFB]",
    tagLabel: "Constantly scanning for new angles to test.",
    image: "/images/agentica/features-angles.png",
    icon: MailIcon,
  },
  {
    title: "Winning creatives, automated",
    subtitle: "Creative volume no team can match.",
    paragraphs: [
      "The engine starts from proven winning ad structures and produces a fresh creative for every angle and audience, at a volume no human team could keep up with.",
      "Volume × diversity is exactly what Meta's Andromeda rewards.",
    ],
    tagBgClass: "bg-[#E7EDFB]",
    tagLabel: "Built on proven structures, per angle and audience.",
    image: "/images/agentica/features-creatives.png",
    icon: LockIcon,
  },
  {
    title: "24/7 ad automation",
    subtitle: "An operator that never sleeps.",
    paragraphs: [
      "Set rules once. When spend passes a cap with no results, or cost-per-result climbs, Agentica pauses, scales or recreates the ad automatically.",
      "Constant freshness, which Meta rewards, with no sitting in Ads Manager.",
    ],
    tagBgClass: "bg-[#E7EDFB]",
    tagLabel: "If-this-then-that on your live metrics.",
    image: "/images/agentica/features-workflows.png",
    icon: EyeIcon,
  },
  {
    title: "Messenger sales agent",
    subtitle: "An AI that chats leads and books the call.",
    paragraphs: [
      "An AI agent chats with leads the moment they land, answers questions and handles objections in their language.",
      "It qualifies interest and books the call straight into your calendar, so no warm lead goes cold.",
    ],
    tagBgClass: "bg-[#E7EDFB]",
    tagLabel: "Chats leads, handles objections and books calls.",
    image: "/images/agentica/features-messenger.png",
    icon: BrainIcon,
  },
];

export function Features() {
  return (
    <section className="section-full overflow-hidden" id="features">
      <div className="container-default">
        <div className="flex flex-col items-start w-full bg-[#f4f1ea] rounded-3xl border border-solid border-[#071B3D0d] overflow-hidden">
          <div className="flex flex-col gap-12 lg:gap-20 pt-12 lg:pt-28 pb-0 px-4 lg:px-16 items-center w-full">
            <div className="flex flex-col w-full max-w-[864px] items-center gap-6">
              <h2 className="font-serif text-[32px] sm:text-[56px] leading-[105%] text-center">
                Everything a media-buying team does, run by our system.
              </h2>
            </div>
          </div>
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col h-auto items-start gap-12 lg:gap-20 px-4 lg:px-16 py-10 lg:py-20 w-full overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 w-full min-w-0">
                <div className="flex flex-col items-start gap-8 lg:gap-12 flex-1 min-w-0">
                  <div className="flex flex-col items-start gap-6 lg:gap-8 w-full min-w-0">
                    <div className="flex flex-col items-start gap-4 lg:gap-6 w-full min-w-0">
                      <h3 className="font-serif text-[28px] sm:text-[48px] leading-[110%]">
                        {feature.title}
                      </h3>
                      <div className="flex flex-col items-start gap-4 w-full min-w-0">
                        <div className="inline-flex items-center w-full">
                          <p className="font-medium text-[18px] sm:text-[24px] leading-[125%]">
                            {feature.subtitle}
                          </p>
                        </div>
                        <div className="flex flex-col items-start gap-4 w-full min-w-0">
                          <div className="font-[family-name:var(--font-inter)] font-normal text-[14px] sm:text-[16px] leading-[18px] sm:leading-[26px] text-foreground-secondary break-words">
                            {feature.paragraphs[0]}
                          </div>
                          <div className="font-[family-name:var(--font-inter)] font-normal text-[14px] sm:text-[16px] leading-[18px] sm:leading-[26px] text-foreground-secondary break-words">
                            {feature.paragraphs[1]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-full min-w-0">
                    <div className="inline-flex items-center gap-2 border-dotted-vertical py-4 min-w-0 max-w-full">
                      <div
                        className={`inline-flex items-center gap-[5.82px] p-[2.91px] ${feature.tagBgClass} rounded-lg flex-shrink-0`}
                      >
                        <div className="w-[26.18px] h-[26.18px] flex items-center justify-center text-[#0158ff]">
                          {feature.icon}
                        </div>
                      </div>
                      <p className="font-medium text-[14px] leading-[150%]">
                        {feature.tagLabel}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-[960px] lg:max-w-[64%] shrink-0">
                  <img src={feature.image} className="rounded-2xl w-full h-auto" alt={feature.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
