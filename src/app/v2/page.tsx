import type { Metadata } from "next";
import { BookingModal } from "@/components/ec/BookingModal";
import { Header } from "@/components/v2/Header";
import { Hero } from "@/components/v2/Hero";
import { Logos } from "@/components/v2/Logos";
import { Reclaim } from "@/components/v2/Reclaim";
import { Features } from "@/components/v2/Features";
import { Demo } from "@/components/v2/Demo";
import { Testimonial } from "@/components/v2/Testimonial";
import { Pricing } from "@/components/v2/Pricing";
import { Comparison } from "@/components/v2/Comparison";
import { Security } from "@/components/v2/Security";
import { Faq } from "@/components/v2/Faq";
import { Footer } from "@/components/v2/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/v2/" },
  // A redesign under review. Remove this line when it replaces the home page;
  // until then it must not compete with / in search.
  robots: { index: false, follow: false },
};

/**
 * The home page redrawn in the brand of /landing: white, ink and the lime,
 * Libre Baskerville headlines and the blue button. Same sections and the same
 * copy as /, which stays as it is until this one is approved.
 */
export default function Page() {
  return (
    <div className="ec-landing ec-theme-light v2-home min-h-screen w-full overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Logos />
        <Reclaim />
        <Features />
        <Demo />
        <Testimonial />
        <Pricing />
        <Comparison />
        <Security />
        <Faq />
      </main>
      <Footer />
      <BookingModal />
    </div>
  );
}
