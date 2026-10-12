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
        <div className="font-[family-name:var(--font-inter)] font-normal text-[14px] sm:text-[16px] leading-[1.5] text-center text-[rgba(var(--ec-ink-rgb),0.7)]">
          Built for performance teams scaling past €30k / month.
        </div>
        {/* The ink ground shows through the gaps as the rules between the cells. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1.5px] w-full rounded-[20px] border-[1.5px] border-(--ec-ink) overflow-hidden bg-(--ec-ink) shadow-[0_8px_0_0_var(--ec-shadow)]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 bg-(--ec-bg) px-4 sm:px-6 py-8 sm:py-10 text-center"
            >
              <span className="font-[family-name:var(--font-libre-baskerville)] font-bold tracking-tight text-[36px] sm:text-[52px] leading-none text-(--ec-ink)">
                {stat.value}
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[13px] sm:text-[15px] leading-[1.45] text-[rgba(var(--ec-ink-rgb),0.7)] max-w-[200px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
