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
  title: "Agentica: We Automate Your Client Fulfillment In 30 Days",
  description:
    "For owners of $1M to $4M marketing lead gen agencies. We install a Meta Ads Automation Engine that handles creative production, campaign setup, testing, optimization and scaling.",
  // Paid traffic only for now. Remove this line the day the page should also
  // be findable in search; leaving it in place silently keeps it out.
  robots: { index: false, follow: false },
};

/**
 * The same landing, with the proof moved above the argument.
 *
 * /landing makes its case and then asks to be believed. This one puts the wall
 * of client accounts directly under the player, so a visitor reads the
 * benefits and the objections having already seen the evidence. Everything
 * else on the two pages is identical, which is the point: when one of them
 * converts better, the difference is that one section and nothing else.
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
    <div className="ec-landing min-h-screen w-full overflow-x-hidden bg-[#f4f1ea]">
      <HeroFold />
      {/*
        Proof before the argument.

        On /landing the page earns the benefits and then hopes they are
        believed. Here the evidence arrives first, straight off the player, so
        every claim underneath is read by someone who has already seen the
        accounts. It is the only structural difference between the two.
      */}
      <ResultShots
        tone="navy"
        columns={3}
        title={
          <>
            Some Of What The Engine
            <br />
            Has Been Doing Lately.
          </>
        }
        note="Screenshots straight out of client accounts. Click any one to read it full size."
      />
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
