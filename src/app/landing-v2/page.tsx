import type { Metadata } from "next";
import { Benefits } from "@/components/ec/Benefits";
import { BookingModal } from "@/components/ec/BookingModal";
import { CtaBlock } from "@/components/ec/CtaBlock";
import { HeroFold } from "@/components/ec/HeroFold";
import { Objections } from "@/components/ec/Objections";
import { SiteFooter } from "@/components/ec/SiteFooter";
import { StickyCta } from "@/components/ec/StickyCta";

export const metadata: Metadata = {
  title: "Agentica v2: We Automate Your Client Fulfillment In 30 Days",
  description:
    "For owners of $1M to $4M marketing lead gen agencies. We install a Meta Ads Automation Engine that handles creative production, campaign setup, testing, optimization and scaling.",
  // Paid traffic only for now. Remove this line the day the page should also
  // be findable in search; leaving it in place silently keeps it out.
  robots: { index: false, follow: false },
};

/**
 * The same landing on the Ramp system from DESIGN.md.
 *
 * It exists beside /landing rather than replacing it so the two palettes can be
 * held against each other. When one wins, the loser's component set and its
 * route go, and this comment goes with them.
 *
 *
 * The fold sells; everything below catches whoever did not watch. The ask is
 * repeated after each of those blocks rather than saved for a closing panel,
 * because a visitor convinced by the benefits should not have to scroll past
 * four objections to find the button.
 *
 * The header is off for now: the page opens straight on the callout. The
 * component is untouched in `src/components/ec/SiteHeader.tsx`.
 *
 * The Eleven Cloud sections this page was ported from, Hero, ArrowDivider,
 * HowWeWork, Results, Team, Testimonial, Pricing, Faq, are still in
 * `src/components/ec/` and are simply not rendered. Nothing was deleted, so any
 * of them can come back into this list.
 */
export default function Page() {
  return (
    <div className="ec-landing min-h-screen w-full overflow-x-hidden bg-[#f4f2f0]">
      <HeroFold />
      <Benefits />
      <CtaBlock />
      <Objections />
      <CtaBlock />
      <SiteFooter />
      {/* The bar is fixed, so the last section needs room to clear it. */}
      <div aria-hidden="true" className="h-[76px] min-[801px]:hidden" />
      <StickyCta />
      <BookingModal />
    </div>
  );
}
