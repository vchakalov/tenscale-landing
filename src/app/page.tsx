import type { Metadata } from "next";
import { BookingModal } from "@/components/ec/BookingModal";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Logos } from "@/components/sections/Logos";
import { Reclaim } from "@/components/sections/Reclaim";
import { Features } from "@/components/sections/Features";
import { Demo } from "@/components/sections/Demo";
import { Testimonial } from "@/components/sections/Testimonial";
import { Pricing } from "@/components/sections/Pricing";
import { Comparison } from "@/components/sections/Comparison";
import { Security } from "@/components/sections/Security";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

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
      <Header />
      <main>
        <Hero />
        <div className="bg-[#FAF9F7] w-full flex flex-col items-start">
          <Logos />
          <Reclaim />
          <Features />
          <Demo />
          <Testimonial />
          <Pricing />
          <Comparison />
          <Security />
          <Faq />
        </div>
      </main>
      <Footer />
      {/* Same dialog, same calendar, as the offer page. */}
      <BookingModal />
    </>
  );
}
