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
  ...landingMetadata("/landing-sp/"),
  // Paid traffic only for now. Remove this line the day the page should also
  // be findable in search; leaving it in place silently keeps it out.
  robots: { index: false, follow: false },
};

/**
 * The same landing, with the proof moved above the argument. In the brand's
 * light theme like /landing; the cream-and-blue version is /landing-sp-blue.
 *
 * Everything else on the two pages is identical, which is the point: when one
 * of them converts better, the difference is that one section and nothing
 * else.
 *
 * The fold sells; everything below catches whoever did not watch. The ask is
 * repeated after each of those blocks rather than saved for a closing panel,
 * because a visitor convinced by the benefits should not have to scroll past
 * four objections to find the button.
 *
 * There is no header: the page opens straight on the callout.
 */
export default function Page() {
  return (
    <div className={`${landingFonts} ec-landing ec-theme-light min-h-screen w-full overflow-x-hidden`}>
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
