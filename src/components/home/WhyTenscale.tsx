import { Reveal } from "@/components/home/Reveal";

/**
 * Hyros closes its argument with two short lists, "Why" and "How do I know
 * it works?", each ending on a blunt line. Same here: three reasons, three
 * kinds of evidence, and a last line that points back at the screenshots.
 */

const WHY = [
  { title: "More angles", body: "Andromeda finds more buyers when every ad is different." },
  { title: "Matched pages", body: "More of the clicks you pay for turn into leads." },
  { title: "Rules that never sleep", body: "Losers paused, winners scaled, nobody in Ads Manager at 3am." },
];

const HOW = [
  { title: "Real accounts", body: "Every number on this page opens the screenshot it came from." },
  { title: "300+ accounts, $3M+ a month", body: "That much Meta spend runs through it. One agency went from 12 to 24 clients with the same team." },
  { title: "Guaranteed", body: "Not happy after 30 days? Your money back, no questions asked." },
];

export function WhyTenscale() {
  return (
    <section className="w-full px-4 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto grid w-full max-w-[1240px] gap-3 sm:gap-4 lg:grid-cols-2">
        <Column title="Why Tenscale?" items={WHY} closing="The result: more leads for less ad spend." />
        <Column
          title="How do I know it works?"
          items={HOW}
          closing="To be blunt: you just scrolled past the screenshots."
          delay={120}
        />
      </div>
    </section>
  );
}

function Column({
  title,
  items,
  closing,
  delay = 0,
}: {
  title: string;
  items: { title: string; body: string }[];
  closing: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full min-w-0">
      <div className="h-full rounded-[2rem] bg-black/[0.03] p-1.5 ring-1 ring-black/[0.06]">
        <div className="flex h-full flex-col rounded-[calc(2rem-0.375rem)] bg-white p-7 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_24px_60px_-44px_rgba(14,14,15,0.35)] sm:p-10">
          <h2 className="font-[family-name:var(--font-gelica)] text-[32px] leading-[1.1] font-light text-[#0e0e0f] sm:text-[40px]">
            {title}
          </h2>
          <ul className="mt-8 flex flex-col divide-y divide-black/[0.06] border-y border-black/[0.06]">
            {items.map((item) => (
              <li key={item.title} className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-6">
                <span className="w-[190px] shrink-0 text-[16px] font-semibold text-[#0e0e0f]">{item.title}</span>
                <span className="text-[16px] leading-[25px] text-[#3a3a3d]">{item.body}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-[family-name:var(--font-gelica)] text-[22px] leading-[30px] font-light text-[#0b0b0c] lg:mt-auto lg:pt-8">
            <span className="home-mark">{closing}</span>
          </p>
        </div>
      </div>
    </Reveal>
  );
}
