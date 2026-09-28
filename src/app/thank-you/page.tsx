import type { Metadata } from "next";
import { BreakoutVideos } from "@/components/ec/BreakoutVideos";
import { CallPrep } from "@/components/ec/CallPrep";
import { CaseStudy } from "@/components/ec/CaseStudy";
import { NextSteps } from "@/components/ec/NextSteps";
import { ResultShots } from "@/components/ec/ResultShots";
import { SiteFooter } from "@/components/ec/SiteFooter";
import { ThankYouFold } from "@/components/ec/ThankYouFold";
import { VideoSources } from "@/components/ec/VideoSources";

export const metadata: Metadata = {
  title: "Tenscale: your call is booked",
  description: "Your call is booked. Put it in your calendar, save Ben's number, and watch the video before we speak.",
  // Stays out of search permanently. A confirmation page reached from a search
  // result has no booking behind it and would show an empty card.
  robots: { index: false, follow: false },
};

/**
 * The page the scheduler sends people to after they book.
 *
 * Same design system as the landing, opposite job. The landing asks for the
 * booking; this page protects it. Its only measurable outcome is the calendar
 * entry, and everything else on it exists to make the slot feel worth keeping.
 *
 * Order follows the confirmation-page plan
 * (docs/superpowers/specs/2026-09-27-confirmation-page-plan.md): Ben's video
 * and the two actions that keep the call alive, then short answers, proof in
 * volume, one account up close, what to prepare, what happens next with the
 * guarantee, and the sources behind the video.
 *
 * There is no CTA and no booking modal here on purpose. The visitor already did
 * the thing the button asks for, and a second "Book Free Demo" after a booking
 * reads as a page that was not built for them.
 */
export default function Page() {
  return (
    <div className="ec-landing min-h-screen w-full overflow-x-hidden bg-[#f4f1ea]">
      <ThankYouFold />
      <BreakoutVideos />
      <ResultShots title="Some Of Our Recent Successes." />
      <CaseStudy />
      <CallPrep />
      <NextSteps />
      <VideoSources />
      <SiteFooter />
    </div>
  );
}
