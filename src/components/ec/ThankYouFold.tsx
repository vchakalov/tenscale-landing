import { AppointmentCard } from "./AppointmentCard";
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
 *
 * The gaps between the three blocks are wide on purpose. Each one is a bordered
 * card, and stacked tight they read as one striped object rather than as a
 * video, a booking and a warning. The space is what separates them, so it is
 * larger than the space inside any of them.
 */

/**
 * Two lines, one element.
 *
 * The congratulation leads, because the visitor just did the thing we asked
 * and the page should say so before it asks for anything else. The fact
 * follows in the accent, which is the job the reference page gives a
 * highlighted strip: it is the line that answers "did it work?".
 *
 * Kept as one heading rather than a heading plus a second line, because a
 * third stacked block above the player costs the fold more than the emphasis
 * is worth.
 */
function Headline({ className }: { className: string }) {
  return (
    <h1 className={className}>
      Congratulations.
      <br />
      <span className="text-[#0158ff]">Your Call Is Booked.</span>
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

          <Headline className="mx-auto text-balance font-[family-name:var(--font-libre-baskerville)] text-[clamp(29px,2.7vw,50px)] leading-[1.16] font-bold text-[#001232]" />

          <p className="mx-auto mt-[24px] max-w-[min(900px,72vw)] text-pretty font-[family-name:var(--font-poppins)] text-[clamp(16px,1.1vw,21px)] leading-[1.55] font-normal text-[#001232]">
            <SubheadCopy />
          </p>

          <Vsl className="mx-auto mt-[40px] w-full max-w-[clamp(560px,40vw,820px)] text-left" />

          <AppointmentCard className="mx-auto mt-[54px] w-full max-w-[clamp(560px,40vw,820px)]" />

          <GmailNotice className="mx-auto mt-[46px] w-full max-w-[clamp(560px,40vw,820px)]" />
        </div>
      </section>

      {/* Mobile */}
      <section className="flex flex-col items-center bg-[#f4f1ea] px-[14px] pt-[40px] pb-[12px] text-center min-[801px]:hidden">
        <Logo size={20} className="mb-[26px]" />

        <Headline className="text-balance font-[family-name:var(--font-pt-serif)] text-[30px] leading-[1.2] font-bold text-[#001232]" />

        <p className="mt-[18px] text-pretty font-[family-name:var(--font-inter)] text-[17px] leading-[26px] font-normal text-[#001232]">
          <SubheadCopy />
        </p>

        <Vsl className="mt-[24px] w-full text-left" />

        <AppointmentCard className="mt-[36px] w-full" />

        <GmailNotice className="mt-[32px] w-full" />
      </section>
    </>
  );
}
