import type { Metadata } from "next";
import { BookingModal } from "@/components/ec/BookingModal";
import { SectionViews } from "@/components/home/SectionViews";
import { Bonuses } from "@/components/offer/Bonuses";
import { BookYourCall, OfferFooter } from "@/components/offer/BookYourCall";
import { Core } from "@/components/offer/Core";
import { Means } from "@/components/offer/Means";
import { OfferGuarantee } from "@/components/offer/OfferGuarantee";
import { OfferHero } from "@/components/offer/OfferHero";
import { Team } from "@/components/offer/Team";
import { siteFonts } from "../site-fonts";

export const metadata: Metadata = {
  title: "Tenscale: We Automate Your Meta Ads With Our AI Engine",
  description:
    "Personalized funnels, automated ad creatives and rule-based automation, installed in your Meta ad account. Book a free 30-minute call.",
  // Paid traffic only, like /landing-sp.
  robots: { index: false, follow: false },
};

/**
 * The offer page: a short direct-response page in the shape of Russell
 * Brunson's and Gymlaunch's. What Tenscale is in two sentences, the ask,
 * the three parts of the engine, what they mean for an agency, the ask, the
 * bonus stack, the guarantee, the team, and the last ask with what the call
 * covers. Big type, big buttons, one column, few words.
 *
 * Drawn in the home page's Geist, at its heaviest weights, and the brand's
 * chartreuse and violet.
 */
export default function OfferPage() {
  return (
    <div className={`${siteFonts} site-fonts home w-full overflow-x-hidden`}>
      <main className="w-full">
        <div data-section="hero"><OfferHero /></div>
        <div data-section="core"><Core /></div>
        <div data-section="means"><Means /></div>
        <div data-section="bonuses"><Bonuses /></div>
        <div data-section="guarantee"><OfferGuarantee /></div>
        <div data-section="team"><Team /></div>
        <div data-section="book"><BookYourCall /></div>
      </main>
      <OfferFooter />
      <SectionViews />
      <BookingModal />
    </div>
  );
}
