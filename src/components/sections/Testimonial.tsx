'use client';

import { useState } from 'react';

interface Social {
  type: 'x' | 'linkedin';
  href: string;
}

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  image: string;
  socials: Social[];
}

const testimonials: TestimonialItem[] = [
  {
    quote:
      'We stopped scaling budget and started scaling angles. Agentica shipped 30+ personalized funnels and our blended CPA dropped by a third.',
    name: 'Marta K.',
    role: 'Performance Lead, DTC skincare',
    image: '/images/stacey-helbig.webp',
    socials: [],
  },
  {
    quote:
      'The message-matched pages are the unlock. Same traffic, roughly triple the landing-to-checkout rate.',
    name: 'David R.',
    role: 'Growth, subscription brand',
    image: '/images/josh-graham.webp',
    socials: [],
  },
  {
    quote:
      "It runs the ad account 24/7, kills losers, relaunches fresh creative. It's like a media buyer that never sleeps.",
    name: 'Ivan P.',
    role: 'Founder, supplements',
    image: '/images/darius-foroux.webp',
    socials: [],
  },
  {
    quote:
      'We finally scaled past €100k/month without the funnel falling apart. Every angle gets its own path.',
    name: 'Elena S.',
    role: 'Head of Acquisition',
    image: '/images/carsten-falborg.webp',
    socials: [],
  },
];

function QuoteMark({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="32"
      fill="none"
      className={className}
    >
      <path
        fill="url(#quote_svg__a)"
        d="M13.24 0c1.173 0 2.027.747 2.027 1.707 0 1.813-4.854 4.853-4.854 10.293 0 4.533 6.187 5.173 6.187 11.68 0 5.12-3.947 8.32-7.84 8.32-4.8 0-8.587-3.04-8.587-10.187C.173 10.027 8.653 0 13.24 0m21.227 0c1.173 0 2.026.747 2.026 1.707C36.493 3.52 31.64 6.56 31.64 12c0 4.533 6.187 5.173 6.187 11.68 0 5.12-3.947 8.32-7.84 8.32-4.8 0-8.587-3.04-8.587-10.187C21.4 10.027 29.88 0 34.467 0"
      />
      <defs>
        <linearGradient
          id="quote_svg__a"
          x1="0.173"
          x2="25.625"
          y1="16"
          y2="43.136"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8B1120" />
          <stop offset="0.55" stopColor="#8B1120" />
          <stop offset="1" stopColor="#E7E3DC" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="inline-block flex-grow-0 flex-shrink-0 text-inherit w-icon-md h-icon-md"
    >
      <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="inline-block flex-grow-0 flex-shrink-0 text-inherit w-icon-md h-icon-md"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Testimonial() {
  const [active, setActive] = useState(0);

  const goTo = (index: number) => {
    setActive((index + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-full py-12 md:py-16 lg:py-20">
      <div className="container-small">
        <div className="flex flex-col gap-8 lg:gap-12 relative w-full border-dotted-vertical py-12 md:py-16 lg:py-20">
          <p className="text-black sm:text-5xl sm:leading-5xl text-4xl leading-4xl font-serif max-w-xl">
            Built to convert.
          </p>
          <div className="grid w-full">
            {testimonials.map((item, index) => (
              <div
                key={item.name}
                className={`col-start-1 row-start-1 flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-16 transition-opacity duration-300 ${
                  index === active
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden={index !== active}
              >
                <div className="relative shrink-0">
                  <span className="flex shrink-0 relative w-20 h-20 lg:w-64 lg:h-64 rounded-xl lg:rounded-3xl overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  </span>
                  <QuoteMark className="inline-block flex-grow-0 flex-shrink-0 text-inherit absolute -bottom-3 -left-3 lg:hidden" />
                </div>
                <div className="flex flex-col items-center lg:items-start gap-6 lg:gap-8 flex-1">
                  <div className="flex items-start gap-4 lg:gap-6">
                    <QuoteMark className="flex-grow-0 flex-shrink-0 text-inherit shrink-0 hidden lg:block" />
                    <p className="font-[family-name:var(--font-gelica)] text-[24px] sm:text-[32px] leading-[32px] sm:leading-[40px] text-center lg:text-left font-light">
                      {item.quote}
                    </p>
                  </div>
                  <div className="flex flex-col items-center lg:items-start lg:pl-14">
                    <div className="font-[family-name:var(--font-geist-sans)] text-[14px] sm:text-[16px] leading-[18px] sm:leading-[26px] font-medium text-center lg:text-left">
                      {item.name}
                    </div>
                    <div className="font-[family-name:var(--font-geist-sans)] font-normal sm:text-[16px] sm:leading-[26px] border-dotted-bottom pb-3 mb-3 text-foreground-tertiary text-sm text-center lg:text-left">
                      {item.role}
                    </div>
                    <div className="inline-flex items-center gap-2 min-h-6">
                      {item.socials.map((social) => (
                        <a
                          key={social.type}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-neutral-lightest/10 p-0 h-auto w-auto text-foreground-tertiary"
                        >
                          {social.type === 'x' ? <XIcon /> : <LinkedInIcon />}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative flex items-center justify-center w-full">
            <div className="inline-flex items-center gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => goTo(index)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    index === active
                      ? 'w-7 bg-[#8B1120]'
                      : 'w-2 bg-[#2d2d2d33] hover:bg-[#2d2d2d66]'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <div className="absolute right-0 inline-flex items-center gap-4">
              <button
                onClick={() => goTo(active - 1)}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-neutral-lightest/10 p-0 h-auto w-auto"
                aria-label="Previous testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="inline-block flex-grow-0 flex-shrink-0 text-inherit w-icon-md h-icon-md w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </button>
              <button
                onClick={() => goTo(active + 1)}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-neutral-lightest/10 p-0 h-auto w-auto"
                aria-label="Next testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="inline-block flex-grow-0 flex-shrink-0 text-inherit w-icon-md h-icon-md w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
