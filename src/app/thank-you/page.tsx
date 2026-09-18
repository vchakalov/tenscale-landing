import type { Metadata } from "next";
import { CallPrep } from "@/components/ec/CallPrep";
import { ResultShots } from "@/components/ec/ResultShots";
import { SiteFooter } from "@/components/ec/SiteFooter";
import { ThankYouFold } from "@/components/ec/ThankYouFold";

export const metadata: Metadata = {
  title: "Agentica: your call is booked",
  description: "Your demo call is booked. Watch the video before we speak.",
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
 * There is no CTA and no booking modal here on purpose. The visitor already did
 * the thing the button asks for, and a second "Book Free Demo" after a booking
 * reads as a page that was not built for them.
 */
export default function Page() {
  return (
    <div className="ec-landing min-h-screen w-full overflow-x-hidden bg-[#f4f1ea]">
      <ThankYouFold />
      <ResultShots />
      <CallPrep />
      <SiteFooter />
    </div>
  );
}
