import type { Metadata } from "next";
import Link from "next/link";
import { BookingModal } from "@/components/ec/BookingModal";
import { HomeHeader } from "@/components/home/HomeHeader";
import { AiBrainHero } from "@/components/resources/AiBrainHero";
import { siteFonts } from "../../site-fonts";

const TITLE = "AI Brain: a free Notion template for agencies";
const DESCRIPTION =
  "The template from the video: one page that maps your whole agency, an index in every folder, an inbox and a log, so Claude finds the right page and keeps it up to date.";

export const metadata: Metadata = {
  title: `${TITLE} | Tenscale`,
  description: DESCRIPTION,
  alternates: { canonical: "/resources/ai-brain/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://tenscale.ai/resources/ai-brain/",
    siteName: "Tenscale",
    type: "website",
    images: [{ url: "/og.png?v=2", width: 1200, height: 630, alt: "Tenscale" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.png?v=2"] },
};

/** The lead magnet from the AI Brain video: one section, one button, the template at work. */
export default function AiBrainPage() {
  return (
    <div className={`${siteFonts} site-fonts home w-full`}>
      <HomeHeader links={[]} />
      <main className="w-full">
        <AiBrainHero />
      </main>
      <footer className="w-full px-4 pb-10 sm:px-8">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center justify-between gap-3 border-t border-black/[0.06] pt-6 text-[13px] text-[#6b6b70] sm:flex-row">
          <span>© 2026 Tenscale</span>
          <nav className="flex gap-5">
            <Link href="/" className="transition-colors duration-300 hover:text-[#0e0e0f]">
              tenscale.ai
            </Link>
            <Link href="/privacy/" className="transition-colors duration-300 hover:text-[#0e0e0f]">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
      {/* The header's button opens the same calendar as the home page. */}
      <BookingModal />
    </div>
  );
}
