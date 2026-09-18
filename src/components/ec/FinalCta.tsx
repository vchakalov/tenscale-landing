import { CtaButton } from "./CtaButton";

/**
 * The close.
 *
 * The dark card is the source's "Book a Call TODAY" panel, unchanged in shape:
 * notice pill, serif headline with one underlined word, body, one button,
 * microcopy. What is new is the proof wrapped around it, a line of numbers
 * above it. The logo strip that used to sit below is gone: it was the design
 * source's logos, it wrapped to three rows on a phone, and the page already
 * carries its proof in the fold.
 *
 * Copy and numbers are placeholder.
 */

/**
 * Three numbers, all of them ours to keep rather than the client's to hit.
 * The offer deliberately guarantees the installation, never the ROAS, so the
 * proof row above the card says what gets installed and by when.
 */
const PROOF_STATS = [
  { value: "30", label: "days from kickoff to a live engine" },
  { value: "5", label: "priority accounts installed, you pick them" },
  { value: "1", label: "operator running what took a team of three" },
] as const;

function NoticePill() {
  return (
    <div className="ec-notice-box">
      <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#ff3b30]" />
      <span className="font-[family-name:var(--font-inter)] text-[16px] leading-normal font-normal tracking-[-0.32px] text-[#000000]">
        Installing <strong className="font-semibold">4 agencies this month</strong>
      </span>
    </div>
  );
}

function ProofStats() {
  return (
    <div className="mx-auto grid max-w-[900px] grid-cols-3 gap-[24px] max-[800px]:gap-[14px]">
      {PROOF_STATS.map((stat) => (
        <div key={stat.value} className="text-center">
          <p className="font-[family-name:var(--font-libre-baskerville)] text-[44px] leading-[52px] font-bold text-[#001232] max-[800px]:text-[26px] max-[800px]:leading-[32px]">
            {stat.value}
          </p>
          <p className="mt-[6px] font-[family-name:var(--font-inter)] text-[14px] leading-[21px] text-[rgba(0,18,50,0.7)] max-[800px]:text-[12px] max-[800px]:leading-[17px]">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function FinalCta() {
  return (
    <section
      id="demo"
      className="mt-[150px] px-[40px] max-[800px]:mt-[70px] max-[800px]:px-[20px]"
    >
      <div className="mx-auto w-full max-w-[1120px]">
        <ProofStats />

        <div className="mt-[56px] rounded-[20px] bg-[#001232] px-[80px] py-[72px] max-[800px]:mt-[40px] max-[800px]:px-[24px] max-[800px]:py-[40px]">
          <NoticePill />

          <h2 className="mt-[28px] font-[family-name:var(--font-libre-baskerville)] text-[46px] leading-[58px] font-bold text-[#f4f1ea] max-[800px]:text-[30px] max-[800px]:leading-[38px]">
            See It Run On <span className="underline">Your Own</span> Accounts
          </h2>

          <p className="mt-[20px] max-w-[640px] font-[family-name:var(--font-poppins)] text-[19px] leading-[30px] font-normal text-[rgba(244,241,234,0.6)] max-[800px]:text-[18px] max-[800px]:leading-[28px]">
            Bring one of your own client accounts. We build the angles, the
            creatives and the matching page on it, live, so you are judging the
            engine on your book rather than on a demo account.
          </p>

          <p className="mt-[24px] max-w-[640px] border-l-[3px] border-[#0158ff] pl-[18px] font-[family-name:var(--font-pt-serif)] text-[18px] leading-[28px] font-bold text-[#f4f1ea] max-[800px]:text-[18px] max-[800px]:leading-[28px]">
            If the complete system is not live across at least three priority
            accounts after the 30-day install and 30 days of operation, you get
            $12,000 back and you keep everything we built.
          </p>

          <div className="mt-[40px]">
            <CtaButton variant="cream">Book Free Demo</CtaButton>
            <p className="mt-[14px] font-[family-name:var(--font-inter)] text-[13px] leading-[19px] font-bold text-[rgba(244,241,234,0.6)]">
              30 minutes. Built on your account, not a canned deck.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
