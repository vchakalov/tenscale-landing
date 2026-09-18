import { CallDetails } from "./CallDetails";
import { GmailNotice } from "./GmailNotice";
import { Logo } from "./Logo";
import { Vsl } from "./Vsl";

/**
 * The confirmation fold: headline, one instruction, the video, the calendar.
 *
 * Video first, the way the reference page does it. The visitor has already
 * converted, so nothing here has to sell the call; the job is to start the
 * relationship before it and to get the event into a calendar. The video does
 * the first and the card does the second, and the card's top edge sits just
 * under the video so the scroll to it is one short move.
 *
 * The video is wider here than on the landing. There is no button, no proof row
 * and no eyebrow competing with it, so the fold can spend its width on the one
 * thing it wants watched. The card is set to the same width, which makes the
 * two read as a single column instead of two stacked blocks.
 */

function Headline({ className }: { className: string }) {
  return (
    <h1 className={className}>
      Your Call Is <span className="text-[#0158ff]">Booked.</span>
    </h1>
  );
}

function SubheadCopy() {
  return (
    <>
      Watch the video below before we speak. It shows exactly what we install,
      so the call starts where the video ends.
    </>
  );
}

export function ThankYouFold() {
  return (
    <>
      {/* Desktop */}
      <section className="hidden bg-[#f4f1ea] px-[40px] pt-[38px] pb-[26px] min-[801px]:block">
        <div className="relative mx-auto w-full max-w-[1560px] text-center">
          <Logo size={28} className="absolute top-0 left-0" />

          <div className="h-[74px]" />

          <Headline className="mx-auto text-balance font-[family-name:var(--font-libre-baskerville)] text-[clamp(32px,3.1vw,58px)] leading-[1.18] font-bold text-[#001232]" />

          <p className="mx-auto mt-[24px] max-w-[min(900px,72vw)] text-pretty font-[family-name:var(--font-poppins)] text-[clamp(16px,1.1vw,21px)] leading-[1.55] font-normal text-[#001232]">
            <SubheadCopy />
          </p>

          <Vsl className="mx-auto mt-[40px] w-full max-w-[clamp(560px,40vw,820px)] text-left" />

          <CallDetails className="mx-auto mt-[34px] w-full max-w-[clamp(560px,40vw,820px)]" />

          <GmailNotice className="mx-auto mt-[26px] w-full max-w-[clamp(560px,40vw,820px)]" />
        </div>
      </section>

      {/* Mobile */}
      <section className="flex flex-col items-center bg-[#f4f1ea] px-[14px] pt-[40px] pb-[12px] text-center min-[801px]:hidden">
        <Logo size={20} className="mb-[26px]" />

        <Headline className="text-balance font-[family-name:var(--font-pt-serif)] text-[33px] leading-[1.22] font-bold text-[#001232]" />

        <p className="mt-[18px] text-pretty font-[family-name:var(--font-inter)] text-[17px] leading-[26px] font-normal text-[#001232]">
          <SubheadCopy />
        </p>

        <Vsl className="mt-[24px] w-full text-left" />

        <CallDetails className="mt-[24px] w-full" />

        <GmailNotice className="mt-[20px] w-full" />
      </section>
    </>
  );
}
