import type { Metadata } from "next";
import { BookingModal } from "@/components/ec/BookingModal";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeHero } from "@/components/home/HomeHero";
import { Mechanism } from "@/components/home/Mechanism";
import { ProblemFix } from "@/components/home/ProblemFix";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Guarantee } from "@/components/home/Guarantee";
import { ProofBand } from "@/components/home/ProofBand";
import { ResultsWall } from "@/components/home/ResultsWall";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { WhyTenscale } from "@/components/home/WhyTenscale";
import { Andromeda } from "@/components/home/Andromeda";
import { HomeFaq } from "@/components/home/HomeFaq";
import { SectionViews } from "@/components/home/SectionViews";
import { siteFonts } from "./site-fonts";
import { HomeFooter } from "@/components/home/HomeFooter";

/** The one address for this page, whichever host or query reached it. */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Who Tenscale is, in the form search engines and AI assistants read. Google
 * documents these Organization fields; they add no ranking by themselves, but
 * they tie the name, the logo and the founder to one entity. Add each public
 * profile (LinkedIn, YouTube, Clutch, G2) to `sameAs` as it goes live.
 */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tenscale.ai/#organization",
      name: "Tenscale",
      url: "https://tenscale.ai/",
      logo: { "@type": "ImageObject", url: "https://tenscale.ai/icon.png", width: 512, height: 512 },
      email: "team@tenscale.ai",
      description:
        "Tenscale installs a Meta ads automation system inside marketing agencies: creative production, campaign setup, testing, optimization and scaling, with a message-matched landing page for every angle and audience.",
      founder: { "@type": "Person", name: "Ben", jobTitle: "Founder" },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://tenscale.ai/#website",
      url: "https://tenscale.ai/",
      name: "Tenscale",
      publisher: { "@id": "https://tenscale.ai/#organization" },
      inLanguage: "en",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, "\\u003c") }}
      />
      <div className={`${siteFonts} site-fonts home w-full`}>
        <HomeHeader />
        {/*
          Hyros' order: the offer and the product, the mechanism with a name,
          the problem and the fix, the process step by step with a message
          after each step, the guarantee, then an unreasonable amount of proof,
          the two closing lists, the safeguards and the FAQ.
        */}
        <main className="w-full">
          <div data-section="hero"><HomeHero /></div>
          <div data-section="mechanism"><Mechanism /></div>
          <div data-section="problem"><ProblemFix /></div>
          <div data-section="how"><HowItWorks /></div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div data-section="guarantee"><Guarantee /></div>
            <div data-section="proof"><ProofBand /></div>
          </div>
          <div data-section="wall"><ResultsWall /></div>
          <div data-section="before-after"><BeforeAfter /></div>
          <div data-section="why"><WhyTenscale /></div>
          <div data-section="andromeda"><Andromeda /></div>
          <div data-section="faq"><HomeFaq /></div>
        </main>
        <HomeFooter />
        <SectionViews />
        {/* Same dialog, same calendar, as the offer page, drawn in this page's fonts. */}
        <BookingModal />
      </div>
    </>
  );
}
