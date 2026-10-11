import type { Metadata } from "next";
import { Benefits } from "@/components/ec/Benefits";
import { BookingModal } from "@/components/ec/BookingModal";
import { CtaBlock } from "@/components/ec/CtaBlock";
import { HeroFold } from "@/components/ec/HeroFold";
import { Objections } from "@/components/ec/Objections";
import { SiteFooter } from "@/components/ec/SiteFooter";
import { StickyCta } from "@/components/ec/StickyCta";
import { landingMetadata } from "@/lib/landing-metadata";

export const metadata: Metadata = {
  ...landingMetadata("/landing/"),
  // Paid traffic only for now. Remove this line the day the page should also
  // be findable in search; leaving it in place silently keeps it out.
  robots: { index: false, follow: false },
};

/**
 * The new Tenscale landing, in the brand's light theme: white, black and the
 * lime. The original cream-and-blue version is /landing-blue.
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
    <div className="ec-landing ec-theme-light min-h-screen w-full overflow-x-hidden">
      <HeroFold brandMark />
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
