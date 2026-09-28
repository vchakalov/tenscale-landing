/**
 * Where every number in Ben's video comes from.
 *
 * Closed by default: most visitors never open it, and the ones who do are the
 * ones about to go and check. Handing them the primary pages keeps that
 * research on sources we chose rather than on whatever a search turns up.
 * Only claims verified on the primary page are listed; the full table, with
 * the ones left out and why, is in the confirmation page plan.
 */
const SOURCES = [
  { claim: "Meta rebuilt ad retrieval (Andromeda) for a large rise in creative volume", source: "Meta Engineering, Dec 2024", href: "https://engineering.fb.com/2024/12/02/production-engineering/meta-andromeda-advantage-automation-next-gen-personalized-ads-retrieval-engine/" },
  { claim: "Advantage+ end-to-end products at a $75B+ annual run-rate", source: "Meta Q2 2026 earnings call", href: "https://s21.q4cdn.com/399680738/files/doc_financials/2026/q2/META-Q2-2026-Earnings-Call-Transcript.pdf" },
  { claim: "Meta aims to fully automate ad creation and targeting by end of 2026", source: "WSJ, via Marketing Dive, Jun 2025", href: "https://www.marketingdive.com/news/meta-plans-to-enable-fully-ai-automated-ads-by-2026/749613/" },
  { claim: "Average price per ad up 12% year on year in Q2 2026", source: "Meta 10-Q, Q2 2026", href: "https://www.sec.gov/Archives/edgar/data/0001326801/000162828026050705/meta-20260630.htm" },
  { claim: "Average price per ad up 10% in 2024 and 9% in 2025", source: "Meta 10-K, FY2025", href: "https://www.sec.gov/Archives/edgar/data/1326801/000162828026003942/meta-20251231.htm" },
  { claim: "About 5% of creatives become winners, and winners take 55% of spend", source: "Motion Creative Benchmarks 2026", href: "https://motionapp.com/library/research/creative-benchmarks-2026/" },
  { claim: "Digital agency net margin at 13%, below the 15% long-run average", source: "Promethean Research, 2026", href: "https://prometheanresearch.com/2026-state-of-digital-services-digital-agency-industry-research/" },
  { claim: "52% of agencies with AI wins hold or raise prices; 61% still implementing are unsure", source: "Productive.io, Jun 2026", href: "https://productive.io/reports/agencies-in-the-ai-era-pulse-report/" },
  { claim: "Agencies naming AI as a top challenge rose from 11% to 38%", source: "Digiday+ Research, 2026", href: "https://digiday.com/media-buying/digiday-research-agencies-punt-budget-growth-expectations-to-2027-while-ai-worries-intensify/" },
  { claim: "82% of ad executives think consumers like AI ads; 45% of consumers do", source: "IAB, 2026", href: "https://www.iab.com/insights/the-ai-gap-widens/" },
] as const;

export function VideoSources() {
  return (
    <section className="bg-[#f4f1ea] px-[40px] pt-[90px] pb-[40px] max-[800px]:px-[14px] max-[800px]:pt-[56px]">
      <details className="group mx-auto w-full max-w-[900px] rounded-[16px] border-[1.5px] border-[rgba(0,18,50,0.22)] px-[clamp(20px,2.4vw,36px)] py-[18px] text-left">
        <summary className="flex cursor-pointer list-none items-baseline gap-[10px] font-[family-name:var(--font-pt-serif)] text-[clamp(18px,1.4vw,22px)] leading-[1.3] font-bold text-[#001232] [&::-webkit-details-marker]:hidden">
          <span className="inline-block shrink-0 text-[#0158ff] transition-transform duration-200 group-open:rotate-90">
            &rsaquo;
          </span>
          <span>Sources for every number in the video</span>
        </summary>
        <ul className="mt-[18px] flex flex-col gap-[14px] border-t border-[rgba(0,18,50,0.14)] pt-[18px]">
          {SOURCES.map((item) => (
            <li
              key={item.href + item.claim}
              className="font-[family-name:var(--font-inter)] text-[17px] leading-[26px] text-[rgba(0,18,50,0.75)]"
            >
              {item.claim}.{" "}
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#001232] underline decoration-[rgba(0,18,50,0.3)] underline-offset-[4px] hover:decoration-[#001232]"
              >
                {item.source}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
