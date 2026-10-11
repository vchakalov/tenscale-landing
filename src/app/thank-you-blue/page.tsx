import type { Metadata } from "next";
import { BreakoutVideos } from "@/components/ec/BreakoutVideos";
import { CallPrep } from "@/components/ec/CallPrep";
import { CaseStudy } from "@/components/ec/CaseStudy";
import { NextSteps } from "@/components/ec/NextSteps";
import { ResultShots } from "@/components/ec/ResultShots";
import { SiteFooter } from "@/components/ec/SiteFooter";
import { ThankYouFold } from "@/components/ec/ThankYouFold";

export const metadata: Metadata = {
  title: "Tenscale: your call is booked",
  description: "Your call is booked. Put it in your calendar, save Ben's number, and watch the video before we speak.",
  // Out of search, like /thank-you.
  robots: { index: false, follow: false },
};

/**
 * /thank-you in the original palette: cream, navy and blue, without the mark.
 *
 * Same sections, copy and tracking as /thank-you. Nothing links here: a
 * booking lands on whichever page the scheduler's redirect names, so this page
 * is reached only once that redirect is pointed at it.
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
      <SiteFooter />
    </div>
  );
}
