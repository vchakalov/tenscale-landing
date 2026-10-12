export function Comparison() {
  return (
    <section className="section-full py-28 bg-(--ec-bg)">
      <div className="container-small flex flex-col items-center gap-12 lg:gap-20">
        <div className="space-y-6">
          <p className="text-balance text-center font-[family-name:var(--font-libre-baskerville)] font-bold text-[32px] sm:text-[48px] leading-[1.15] tracking-tight text-(--ec-ink) max-w-xl mx-auto">
            <span className="ec-mark">One engine</span> instead of a whole team.
          </p>
          <p className="text-center font-[family-name:var(--font-inter)] text-[16px] sm:text-[17px] text-[rgba(var(--ec-ink-rgb),0.7)] max-w-xl mx-auto leading-[1.6]">
            Stop juggling a media buyer, a designer, a CRO specialist and a
            landing-page tool. Tenscale is one engine.
          </p>
        </div>
        <div className="v2-card w-full p-6 sm:px-16 sm:py-10">
          <div className="max-w-2xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-center flex-1">
                <img
                  src="/images/tenscale/comparison-stack.png"
                  alt="Without Tenscale - a whole stack of tools and specialists"
                  className="v2-frame w-full h-auto"
                />
              </div>
              <div className="border-dotted-top pt-4 w-full text-center">
                <span className="font-[family-name:var(--font-libre-baskerville)] font-bold text-[20px] sm:text-[24px] text-(--ec-ink)">
                  A whole stack
                </span>
              </div>
            </div>
            <div className="shrink-0">
              <span className="font-[family-name:var(--font-libre-baskerville)] font-bold text-[40px] sm:text-[48px] text-(--ec-ink)">
                vs
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-center flex-1">
                <img
                  src="/images/tenscale/comparison-engine.png"
                  alt="With Tenscale - one engine, end to end"
                  className="v2-frame w-full h-auto"
                />
              </div>
              <div className="border-dotted-top pt-4 w-full text-center">
                <span className="relative inline-block font-[family-name:var(--font-libre-baskerville)] font-bold text-[20px] sm:text-[24px] text-(--ec-ink)">
                  {/* A flat lime bar behind the words instead of the old blurred crimson
                      underline, so it reads as the same highlighter as .ec-mark. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-2 w-16 sm:w-20 rounded-full bg-(--ec-accent) pointer-events-none"
                  />
                  <span className="relative">One engine</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
