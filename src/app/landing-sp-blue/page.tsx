import type { Metadata } from "next";
import { Benefits } from "@/components/ec/Benefits";
import { BookingModal } from "@/components/ec/BookingModal";
import { CtaBlock } from "@/components/ec/CtaBlock";
import { HeroFold } from "@/components/ec/HeroFold";
import { Objections } from "@/components/ec/Objections";
import { ResultShots } from "@/components/ec/ResultShots";
import { SiteFooter } from "@/components/ec/SiteFooter";
import { StickyCta } from "@/components/ec/StickyCta";
import { landingMetadata } from "@/lib/landing-metadata";
import { landingFonts } from "../landing-fonts";

export const metadata: Metadata = {
  ...landingMetadata("/landing-sp-blue/"),
  // Paid traffic only, like /landing-sp.
  robots: { index: false, follow: false },
};

/**
 * /landing-sp in the original palette: cream, navy and blue, without the mark.
 *
 * Same sections, copy and tracking as /landing-sp; only the theme differs, so
 * the two can run side by side against the same traffic.
 */
export default function Page() {
  return (
    <div className={`${landingFonts} ec-landing min-h-screen w-full overflow-x-hidden bg-[#f4f1ea]`}>
      <HeroFold callout="lead-gen" />
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
      <StickyCta />
      <BookingModal />
    </div>
  );
}
