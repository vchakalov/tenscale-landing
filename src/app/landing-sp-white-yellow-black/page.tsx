import type { Metadata } from "next";
import { Benefits } from "@/components/ec/Benefits";
import { BookingModal } from "@/components/ec/BookingModal";
import { CtaBlock } from "@/components/ec/CtaBlock";
import { HeroFold } from "@/components/ec/HeroFold";
import { Objections } from "@/components/ec/Objections";
import { ResultShots } from "@/components/ec/ResultShots";
import { SiteFooter } from "@/components/ec/SiteFooter";
import { StickyCta } from "@/components/ec/StickyCta";

export const metadata: Metadata = {
  title: "Tenscale: We Automate Your Client Fulfillment In 30 Days",
  description:
    "For owners of $1M to $4M marketing lead gen agencies. We install a Meta Ads Automation Engine that handles creative production, campaign setup, testing, optimization and scaling.",
  // Paid traffic only, like /landing-sp.
  robots: { index: false, follow: false },
};

/**
 * /landing-sp in the Tenscale brand, light: white, black and the lime.
 *
 * Same sections, copy and tracking as /landing-sp; only the theme class and
 * the mark differ, so the two can run side by side against the same traffic.
 */
export default function Page() {
  return (
    <div className="ec-landing ec-theme-light min-h-screen w-full overflow-x-hidden">
      <HeroFold brandMark />
      {/*
        The same wall the thank-you page carries, in navy rather than blue and
        under its own label. On /landing the page earns the benefits and then hopes
        they are believed; here the evidence arrives straight off the player, so
        every claim underneath is read by someone who has already seen the
        accounts. That placement is the only difference between the two pages.
      */}
      <ResultShots
        eyebrow="Wall of success"
        tone="navy"
        title={
          <>
            What People Are Saying
            <br />
            About Us.
          </>
        }
        note="Messages and screenshots, straight out of client accounts. Click any one to read it full size."
      />
      <Benefits />
      <CtaBlock trackId="after_benefits" />
      <Objections />
      <CtaBlock trackId="after_objections" />
      <SiteFooter />
      {/* The bar is fixed, so the last section needs room to clear it. */}
      <div aria-hidden="true" className="h-[76px] min-[801px]:hidden" />
      <StickyCta brandMark />
      <BookingModal />
    </div>
  );
}
