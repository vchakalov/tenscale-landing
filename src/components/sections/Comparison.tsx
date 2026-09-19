export function Comparison() {
  return (
    <section className="section-full py-28">
      <div className="container-small flex flex-col items-center gap-12 lg:gap-20">
        <div className="space-y-6">
          <p className="text-center text-black sm:text-5xl sm:leading-5xl text-4xl leading-4xl font-serif max-w-xl mx-auto">
            One engine instead of a whole team.
          </p>
          <p className="text-center text-neutral-dark max-w-xl mx-auto leading-[1.55]">
            Stop juggling a media buyer, a designer, a CRO specialist and a
            landing-page tool. Agentica is one engine.
          </p>
        </div>
        <div className="w-full rounded-3xl border border-solid border-[#2d2d2d0d] bg-linear-to-b from-white via-white to-[#F4F2EE] p-6 sm:px-16 sm:py-10">
          <div className="max-w-2xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-center flex-1">
                <img
                  src="/images/agentica/comparison-stack.png"
                  alt="Without Agentica - a whole stack of tools and specialists"
                  className="w-full h-auto rounded-2xl border border-[#2d2d2d0d]"
                />
              </div>
              <div className="border-dotted-top pt-4 w-full text-center">
                <span className="font-serif text-[22px] sm:text-[26px] font-medium">
                  A whole stack
                </span>
              </div>
            </div>
            <div className="shrink-0">
              <span className="text-[48px] font-serif font-medium">vs</span>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-center flex-1">
                <img
                  src="/images/agentica/comparison-engine.png"
                  alt="With Agentica - one engine, end to end"
                  className="w-full h-auto rounded-2xl border border-[#2d2d2d0d]"
                />
              </div>
              <div className="border-dotted-top pt-4 w-full text-center">
                <span className="relative inline-block font-serif text-[22px] sm:text-[26px] font-medium">
                  One engine
                  <svg
                    className="absolute w-16 sm:w-20 -bottom-1 left-1/2 -translate-x-1/2 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 58 14"
                    fill="none"
                  >
                    <g filter="url(#filter_underline)">
                      <rect x="4" y="4" width="50" height="6" rx="3" fill="url(#gradient_underline)" />
                    </g>
                    <defs>
                      <filter
                        id="filter_underline"
                        x="0"
                        y="0"
                        width="58"
                        height="14"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur" />
                      </filter>
                      <linearGradient
                        id="gradient_underline"
                        x1="-17"
                        y1="2"
                        x2="-15.3561"
                        y2="16.5272"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#8B1120" />
                        <stop offset="0.55" stopColor="#8B1120" />
                        <stop offset="1" stopColor="#8B1120" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
