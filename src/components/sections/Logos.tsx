const stats = [
  { value: "3×", label: "conversion rate on personalized landing pages" },
  { value: "50+", label: "angles live per product" },
  { value: "100s", label: "of fresh creatives every day" },
  { value: "24/7", label: "automated optimization" },
];

export function Logos() {
  return (
    <section className="section-full sm:pb-12 pt-15 sm:pt-16">
      <div className="container-default flex flex-col items-center gap-8 sm:gap-12">
        <div className="font-[family-name:var(--font-inter)] font-normal text-[14px] sm:text-[16px] leading-[18px] sm:leading-[26px] text-center text-foreground-secondary">
          Built for performance teams scaling past €30k / month.
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px w-full rounded-3xl border border-solid border-[#071B3D0d] overflow-hidden bg-[#071B3D0d]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 bg-white px-6 py-8 sm:py-10 text-center"
            >
              <span className="font-serif text-[40px] sm:text-[56px] leading-none font-light text-[#001232]">
                {stat.value}
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[13px] sm:text-[15px] leading-[18px] sm:leading-[22px] text-foreground-tertiary max-w-[200px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
