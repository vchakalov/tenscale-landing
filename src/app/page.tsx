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

export default function Home() {
  return (
    <>
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
