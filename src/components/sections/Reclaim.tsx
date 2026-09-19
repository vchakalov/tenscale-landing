export function Reclaim() {
  return (
    <section className="section-full pt-14 pb-24 md:pt-16 md:pb-28">
      <div className="container-default flex flex-col items-stretch gap-16">
        <div className="flex flex-col lg:items-start lg:justify-between gap-6">
          <p className="text-black sm:text-5xl sm:leading-5xl text-4xl leading-4xl font-serif">
            One system that replaces your media-buying team.
          </p>
          <div className="w-full flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
            <p className="text-neutral-dark leading-[1.55] sm:max-w-[416px]">
              Agentica turns your offer into many personalized funnels, then runs and optimizes them.
            </p>
            <div className="grid grid-cols-1 max-sm:w-full">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-neutral-lightest bg-gradient-to-b from-[#071B3D] from-10% to-[#000000] hover:from-100% h-11 px-6 rounded-full">
                Book a call
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-4 w-full">
          <div className="flex flex-col items-start gap-6 w-full">
            <div className="flex flex-col items-start gap-6 w-full">
              <div className="flex flex-col items-start gap-4 pl-2 pr-0 py-0 w-full">
                <h3 className="font-[family-name:var(--font-pt-serif)] text-[20px] sm:text-[24px] leading-[24px] sm:leading-[40px] w-full font-light">
                  Describe your offer
                </h3>
                <p className="w-full text-foreground-tertiary leading-[160%] tracking-tight">
                  Describe your offer once. Agentica maps it into dozens of angles and sorts them into losing, testing and winning branches.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/images/agentica/reclaim-describe.png"
                  alt=""
                  className="rounded-3xl border border-solid border-[#071B3D0d] w-full h-auto"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-6 w-full">
            <div className="flex flex-col items-start gap-6 w-full">
              <div className="flex flex-col items-start gap-4 pl-2 pr-0 py-0 w-full">
                <h3 className="font-[family-name:var(--font-pt-serif)] text-[20px] sm:text-[24px] leading-[24px] sm:leading-[40px] w-full font-light">
                  Generate angles &amp; creatives
                </h3>
                <p className="w-full text-foreground-tertiary leading-[160%] tracking-tight">
                  It automatically generates new angles and winning-structured creatives for each one.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/images/agentica/reclaim-creatives.png"
                  alt=""
                  className="rounded-3xl border border-solid border-[#071B3D0d] w-full h-auto"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-6 w-full">
            <div className="flex flex-col items-start gap-6 w-full">
              <div className="flex flex-col items-start gap-4 pl-2 pr-0 py-0 w-full">
                <h3 className="font-[family-name:var(--font-pt-serif)] text-[20px] sm:text-[24px] leading-[24px] sm:leading-[40px] w-full font-light">
                  Launch personalized funnels
                </h3>
                <p className="w-full text-foreground-tertiary leading-[160%] tracking-tight">
                  Each angle gets a message-matched landing page and goes live, optimized 24/7.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/images/agentica/reclaim-funnels.png"
                  alt=""
                  className="rounded-3xl border border-solid border-[#071B3D0d] w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
