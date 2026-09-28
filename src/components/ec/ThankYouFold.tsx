import type { ReactNode } from "react";
import { AppointmentCard } from "./AppointmentCard";
import { ContactCard } from "./ContactCard";
import { GmailNotice } from "./GmailNotice";
import { type Chapter, Vsl } from "./Vsl";

/**
 * The confirmation fold: headline, Ben's video, then the two actions that keep
 * the call alive.
 *
 * The video leads because the visitor is in research mode the moment they
 * book: they are about to look the company up, and the page would rather they
 * did that research here. It is not the landing VSL. That one sold the call,
 * and showing it again to someone who already booked reads as a page that was
 * not built for them.
 *
 * The two actions sit directly under the video as numbered steps rather than
 * as two more cards in a stack. A call that is not in a calendar does not
 * happen, and a text from an unknown number gets ignored, so they are the only
 * things on the page with a step number and a heading of their own.
 *
 * The gaps between blocks are wide on purpose. Each one is a bordered card, and
 * stacked tight they read as one striped object rather than as a video, a
 * booking and a warning.
 */

/**
 * Ben's video. Fill these in when the cut is ready; an empty `src` renders the
 * placeholder. Chapter times follow the script plan in
 * docs/superpowers/specs/2026-09-27-confirmation-page-plan.md and should be
 * moved to match the final edit.
 */
export const THANK_YOU_VIDEO = { src: "", poster: "" };

const THANK_YOU_CHAPTERS: readonly Chapter[] = [
  { at: 0, label: "Who I am" },
  { at: 30, label: "Meta changed the job" },
  { at: 120, label: "Volume finds winners" },
  { at: 195, label: "Being wrong costs more" },
  { at: 255, label: "The squeeze on your P&L" },
  { at: 345, label: "The gap is forming" },
  { at: 420, label: "Who wins, and our call" },
];

const VIDEO_PLACEHOLDER =
  "Ben's video goes here. Set THANK_YOU_VIDEO.src in ThankYouFold.tsx.";

function Headline({ className }: { className: string }) {
  return (
    <h1 className={className}>
      Congratulations.
      <br />
      <span className="text-[#0158ff]">Your Call Is Booked.</span>
    </h1>
  );
}

/**
 * The headline already confirms the booking, so the subhead does not say it
 * again. Its job is to make the rest of the page feel like part of the call:
 * everything below is prep, and the visitor is told where to start and what
 * comes after. The first line carries weight; the second is the instruction,
 * lighter, so the pair reads as one statement and one step.
 */
function SubheadCopy() {
  return (
    <>
      <span className="block font-medium text-[#001232]">
        Everything on this page is prep for our call.
      </span>
      <span className="mt-[4px] block text-[rgba(0,18,50,0.7)]">
        Start with the 7-minute video, then the two quick steps under it.
      </span>
    </>
  );
}

/**
 * One numbered action: a filled accent disc, a heading, and the block that
 * does it. The disc is the only filled accent circle on the page, so the two
 * steps read as the page's to-do list at a glance.
 */
function Step({
  index,
  title,
  children,
  className,
}: {
  index: number;
  title: string;
  children: ReactNode;
  className: string;
}) {
  return (
    <div className={`text-left ${className}`}>
      <div className="flex items-center gap-[14px]">
        <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#0158ff] font-[family-name:var(--font-pt-serif)] text-[20px] leading-none font-bold text-[#f4f1ea] max-[800px]:h-[34px] max-[800px]:w-[34px] max-[800px]:text-[17px]">
          {index}
        </span>
        <h2 className="font-[family-name:var(--font-pt-serif)] text-[clamp(22px,1.8vw,32px)] leading-[1.2] font-bold text-[#001232]">
          {title}
        </h2>
      </div>
      <div className="mt-[18px]">{children}</div>
    </div>
  );
}

/**
 * The column width, shared by the player, the steps and the notice.
 *
 * The player is sized by the height left over rather than by a share of the
 * width, so it is as large as the viewport allows. The video is the fold; step
 * 1 starts just under the scroll line, and its top edge is what makes anyone
 * scroll to the calendar button. The chapters live inside the
 * frame, so the reserve only covers the two lines of type above it.
 */
const COLUMN = "max-w-[min(1080px,94vw,calc((100vh-235px-7.8vw)*16/9))]";

export function ThankYouFold() {
  return (
    <>
      {/* Desktop */}
      <section className="hidden bg-[#f4f1ea] px-[40px] pt-[22px] pb-[26px] min-[801px]:block">
        <div className="relative mx-auto w-full max-w-[1560px] text-center">
          <Headline className="mx-auto text-balance font-[family-name:var(--font-libre-baskerville)] text-[clamp(36px,3.4vw,64px)] leading-[1.12] font-bold text-[#001232]" />

          <p className="mx-auto mt-[24px] max-w-[min(900px,72vw)] text-pretty font-[family-name:var(--font-poppins)] text-[clamp(21px,1.5vw,26px)] leading-[1.45] font-normal text-[#001232]">
            <SubheadCopy />
          </p>

          <Vsl
            className={`mx-auto mt-[30px] w-full text-left ${COLUMN}`}
            source={THANK_YOU_VIDEO}
            chapters={THANK_YOU_CHAPTERS}
            estimatedDuration={480}
            placeholder={VIDEO_PLACEHOLDER}
          />

          <Step
            index={1}
            title="Put the call in your calendar."
            className={`mx-auto mt-[40px] w-full ${COLUMN}`}
          >
            <AppointmentCard className="w-full" />
          </Step>

          <Step
            index={2}
            title="Save my number. I'll text you from it."
            className={`mx-auto mt-[54px] w-full ${COLUMN}`}
          >
            <ContactCard className="w-full" />
          </Step>

          <GmailNotice className={`mx-auto mt-[54px] w-full ${COLUMN}`} />
        </div>
      </section>

      {/* Mobile */}
      <section className="flex flex-col items-center bg-[#f4f1ea] px-[14px] pt-[24px] pb-[12px] text-center min-[801px]:hidden">
        <Headline className="text-balance font-[family-name:var(--font-pt-serif)] text-[35px] leading-[1.15] font-bold text-[#001232]" />

        <p className="mt-[16px] text-pretty font-[family-name:var(--font-inter)] text-[20px] leading-[29px] font-normal text-[#001232]">
          <SubheadCopy />
        </p>

        <Vsl
          className="mt-[20px] w-full text-left"
          source={THANK_YOU_VIDEO}
          chapters={THANK_YOU_CHAPTERS}
            estimatedDuration={480}
          placeholder={VIDEO_PLACEHOLDER}
        />

        <Step
          index={1}
          title="Put the call in your calendar."
          className="mt-[44px] w-full"
        >
          <AppointmentCard className="w-full" />
        </Step>

        <Step
          index={2}
          title="Save my number. I'll text you from it."
          className="mt-[40px] w-full"
        >
          <ContactCard className="w-full" />
        </Step>

        <GmailNotice className="mt-[32px] w-full" />
      </section>
    </>
  );
}
