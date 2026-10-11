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
  ...landingMetadata("/landing-bl/"),
  // Paid traffic only, like /landing.
  robots: { index: false, follow: false },
};

/**
 * /landing in the Tenscale brand: the lime mark on near-black.
 *
 * Same sections, copy and tracking as /landing; only the theme class and the
 * mark differ, so the two can run side by side against the same traffic.
 */
export default function Page() {
  return (
    <div className="ec-landing ec-theme-black min-h-screen w-full overflow-x-hidden">
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
